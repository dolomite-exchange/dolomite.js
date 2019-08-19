import omit from 'object.omit';
import Pageable from './Pageable';
import nativeFetch from 'node-fetch';
import WSManager from './websockets/WSManager';

const getNativeFetch = () => {
  if (window && window.fetch) 
    return window.fetch.bind(window);
  return nativeFetch;
};

export class ServiceError extends Error {
  constructor({ category, code, description, invalid_fields, request_id }) {
    super(`${category}/${code} : ${description}`);

    this.category = category;
    this.code = code;
    this.description = description;
    this.invalidFields = invalid_fields;
    this.requestId = request_id;
  }
}

export class GenericError extends ServiceError {
  constructor() {
    super({
      category: 'GENERIC_ERROR',
      code: 'SOMETHING_WENT_WRONG',
      description: 'Something went wrong',
      invalid_fields: [],
      request_id: -1
    });
  }
}

/*
 * Super class for all services that provides request
 * api key handling, fetch requests with helper
 * functions (get, post, etc.) and routing
 */
export default class Service {
  constructor(url, getWebsocket, routes = {}) {
    this.url = url;
    this.apiKey = null;
    this.routes = routes;
    this.fetch = getNativeFetch();
    
    if (!getWebsocket) {
      const wsManager = new WSManager();
      getWebsocket = (() => wsManager);
    }
    
    this.getWebsocket = getWebsocket;
  }

  /*
   * Configure the service with an API key.
   */
  configureService(apiKey) {
    this.apiKey = apiKey;
  }

  /*
   * Construct a PageableRequest object without having to import Pageable
   *
   * Usage:
   * return this.pageable('route')
   *   .build((data, globals) => Resource.hydrate(data, globals))
   *   .get(params, {
   *     // custom params
   *   });
   */
  pageable(resource, headers = {}) {
    return Pageable.request((params) => this.get(resource, params, headers))
  }

  /*
   * Get for WSManager instance
   */
  get websocket() {
    return this.getWebsocket();
  }

  /*
   * Subscribe to a websocket route with a callback and build function
   *
   * Usage: 
   * on(<route>, <action>)
   *   .build(rawData => new Obj(data))
   *   .then(<callbackFunc>);
   */
  on(route, action) {
    return {
      build: (buildCallback) => ({
        then: (callback) => {
          this.websocket.subscribe(route, action, (data) => {
            callback(buildCallback(data));
          });
        }
      }),
      then: (callback) => {
        this.websocket.subscribe(route, action, (data) => {
          callback(data);
        });
      }
    };
  }

  /*
   * Send data to a websocket route with an action and params
   *
   * Usage:
   * return this.send(<route>, <action>, <params>);
   */
  send(route, action, params) {
    return this.websocket.send(route, action, params);
  }

  /*
   * GET request
   *
   * resource: the name of the resource in the routes object
   * params: object representation of parameters. `:params` will
   *         be replaced with the matching `param` in the params
   * headers: additional headers to add to the request
   */
  get(resource, params = {}, headers = {}) {
    return this.requestRoute('get', resource, { hydrate_all: true, ...params}, headers);
  }

  /*
   * POST Request
   */
  post(resource, params = {}, headers = {}) {
    return this.requestRoute('post', resource, params, headers);
  }

  /*
   * PUT Request
   */
  put(resource, params = {}, headers = {}) {
    return this.requestRoute('put', resource, params, headers);
  }

  /*
   * DELETE Request
   */
  delete(resource, params = {}, headers = {}) {
    return this.requestRoute('delete', resource, params, headers);
  }

  /*
   * POST request to the route at the `prepare` key in a route
   */
  prepare(resource, params = {}, headers = {}) {
    const route = this.getRoute('prepare', resource, params);
    return this.request('post', route.url, route.params, headers);
  }

  ///////////////////////////
  // Helper functions

  getRoute(verb, resource, params = null) {
    const route = this.routes[resource][verb];
    return this.calculateRoute(route, params);
  }

  calculateRoute(route, params = null) {
    let parsedParams = params || {};

    if (params) {
      const inlineParams = (route.match(/:[^\/]*/g) || []).map(param => param.replace(':', ''))

      route = route.replace(/:[^\/]*/g, (param,_) =>
        params[param.replace(':', '')] || param);

      parsedParams = omit(params, inlineParams);
    }

    return {
      url: this.url + route,
      params: parsedParams
    };
  }

  requestRoute(verb, resource, params = null, headers = {}) {
    const route = this.getRoute(verb, resource, params);
    return this.request(verb, route.url, route.params, headers);
  }

  constructGetUrl(route, params) {
    const url = new URL(route);
    url.search = new URLSearchParams(params)
    return url;
  }

  formDataRequest(verb, resource, fieldsOrParams = {}, additionalHeaders = {}) {
    if (!this.apiKey) return Promise.reject('Needs configuration: No API key provided');

    const { url, params: fields } = this.getRoute(verb, resource, fieldsOrParams);
    
    let bodyData = new FormData();
    Object.entries(fields).forEach(([field, value]) => value && bodyData.append(field, value));

    return this.makeRequest(url, {
      method: verb,
      body: bodyData,
      headers: {
        /* FormData handles Accept/Content-Type headers */
        'Access-Control-Allow-Origin':'*',
        'X_DOLOMITE_API_KEY': this.apiKey,
        ...additionalHeaders
      }
    });
  }

  request(verb, route, params = {}, additionalHeaders = {}) {
    if (!this.apiKey) return Promise.reject('Needs configuration: No API key provided');

    let url = route;

    const isUsingUrlParams = verb == 'get';
    if (isUsingUrlParams) {
      let builder = new URL(route);
      builder.search = new URLSearchParams(params);
      url = route + builder.search;
    }

    return this.makeRequest(url, {
      method: verb,
      body: isUsingUrlParams ? null : JSON.stringify(params),
      headers: {
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin':'*',
       'Accept': 'application/json',
       'X_DOLOMITE_API_KEY': this.apiKey,
       ...additionalHeaders
      }
    });
  }

  makeRequest(url, fetchOptions) {
    try {
      return this.fetch(url, fetchOptions)
        .then((response) => {
          try {
            if (response.status >= 200 && response.status < 300) {
              return response.json().then(body => ({ 
                ...body,
                data: body.data,
                globals: body.global_objects,
              }));
            }
          } catch(e) {
            throw new GenericError();
          }

          return response.json().then(body => {
            throw new ServiceError((body || {}).error);
          })
        });
    } catch(e) {
      return Promise.reject(new GenericError())
    }
  }
}
