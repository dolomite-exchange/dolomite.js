"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.GenericError = exports.ServiceError = void 0;

var _object = _interopRequireDefault(require("object.omit"));

var _Pageable = _interopRequireDefault(require("./Pageable"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _WSManager = _interopRequireDefault(require("./websockets/WSManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var getNativeFetch = function getNativeFetch() {
  if (window && window.fetch) return window.fetch.bind(window);
  return _nodeFetch["default"];
};

var ServiceError =
/*#__PURE__*/
function (_Error) {
  _inherits(ServiceError, _Error);

  function ServiceError(_ref) {
    var _this;

    var category = _ref.category,
        code = _ref.code,
        description = _ref.description,
        invalid_fields = _ref.invalid_fields,
        request_id = _ref.request_id;

    _classCallCheck(this, ServiceError);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ServiceError).call(this, "".concat(category, "/").concat(code, " : ").concat(description)));
    _this.category = category;
    _this.code = code;
    _this.description = description;
    _this.invalidFields = invalid_fields;
    _this.requestId = request_id;
    return _this;
  }

  return ServiceError;
}(_wrapNativeSuper(Error));

exports.ServiceError = ServiceError;

var GenericError =
/*#__PURE__*/
function (_ServiceError) {
  _inherits(GenericError, _ServiceError);

  function GenericError() {
    _classCallCheck(this, GenericError);

    return _possibleConstructorReturn(this, _getPrototypeOf(GenericError).call(this, {
      category: 'GENERIC_ERROR',
      code: 'SOMETHING_WENT_WRONG',
      description: 'Something went wrong',
      invalid_fields: [],
      request_id: -1
    }));
  }

  return GenericError;
}(ServiceError);
/*
 * Super class for all services that provides request
 * api key handling, fetch requests with helper
 * functions (get, post, etc.) and routing
 */


exports.GenericError = GenericError;

var Service =
/*#__PURE__*/
function () {
  function Service(url, getWebsocket) {
    var routes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Service);

    this.url = url;
    this.apiKey = null;
    this.routes = routes;
    this.fetch = getNativeFetch();

    if (!getWebsocket) {
      var wsManager = new _WSManager["default"]();

      getWebsocket = function getWebsocket() {
        return wsManager;
      };
    }

    this.getWebsocket = getWebsocket;
  }
  /*
   * Configure the service with an API key.
   */


  _createClass(Service, [{
    key: "configureService",
    value: function configureService(apiKey) {
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

  }, {
    key: "pageable",
    value: function pageable(resource) {
      var _this2 = this;

      var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _Pageable["default"].request(function (params) {
        return _this2.get(resource, params, headers);
      });
    }
    /*
     * Get for WSManager instance
     */

  }, {
    key: "on",

    /*
     * Subscribe to a websocket route with a callback and build function
     *
     * Usage: 
     * on(<route>, <action>)
     *   .build(rawData => new Obj(data))
     *   .then(<callbackFunc>);
     */
    value: function on(route, action) {
      var _this3 = this;

      return {
        build: function build(buildCallback) {
          return {
            then: function then(callback) {
              _this3.websocket.subscribe(route, action, function (data) {
                callback(buildCallback(data));
              });
            }
          };
        },
        then: function then(callback) {
          _this3.websocket.subscribe(route, action, function (data) {
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

  }, {
    key: "send",
    value: function send(route, action, params) {
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

  }, {
    key: "get",
    value: function get(resource) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.requestRoute('get', resource, _objectSpread({
        hydrate_all: true
      }, params), headers);
    }
    /*
     * POST Request
     */

  }, {
    key: "post",
    value: function post(resource) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.requestRoute('post', resource, params, headers);
    }
    /*
     * PUT Request
     */

  }, {
    key: "put",
    value: function put(resource) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.requestRoute('put', resource, params, headers);
    }
    /*
     * DELETE Request
     */

  }, {
    key: "delete",
    value: function _delete(resource) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.requestRoute('delete', resource, params, headers);
    }
    /*
     * POST request to the route at the `prepare` key in a route
     */

  }, {
    key: "prepare",
    value: function prepare(resource) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var route = this.getRoute('prepare', resource, params);
      return this.request('post', route.url, route.params, headers);
    } ///////////////////////////
    // Helper functions

  }, {
    key: "getRoute",
    value: function getRoute(verb, resource) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var route = this.routes[resource][verb];
      return this.calculateRoute(route, params);
    }
  }, {
    key: "calculateRoute",
    value: function calculateRoute(route) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var parsedParams = params || {};

      if (params) {
        var inlineParams = (route.match(/:[^\/]*/g) || []).map(function (param) {
          return param.replace(':', '');
        });
        route = route.replace(/:[^\/]*/g, function (param, _) {
          return params[param.replace(':', '')] || param;
        });
        parsedParams = (0, _object["default"])(params, inlineParams);
      }

      return {
        url: this.url + route,
        params: parsedParams
      };
    }
  }, {
    key: "requestRoute",
    value: function requestRoute(verb, resource) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var route = this.getRoute(verb, resource, params);
      return this.request(verb, route.url, route.params, headers);
    }
  }, {
    key: "constructGetUrl",
    value: function constructGetUrl(route, params) {
      var url = new URL(route);
      url.search = new URLSearchParams(params);
      return url;
    }
  }, {
    key: "formDataRequest",
    value: function formDataRequest(verb, resource) {
      var fieldsOrParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var additionalHeaders = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      if (!this.apiKey) return Promise.reject('Needs configuration: No API key provided');

      var _this$getRoute = this.getRoute(verb, resource, fieldsOrParams),
          url = _this$getRoute.url,
          fields = _this$getRoute.params;

      var bodyData = new FormData();
      Object.entries(fields).forEach(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            field = _ref3[0],
            value = _ref3[1];

        return value && bodyData.append(field, value);
      });
      return this.makeRequest(url, {
        method: verb,
        body: bodyData,
        headers: _objectSpread({
          /* FormData handles Accept/Content-Type headers */
          'Access-Control-Allow-Origin': '*',
          'X_DOLOMITE_API_KEY': this.apiKey
        }, additionalHeaders)
      });
    }
  }, {
    key: "request",
    value: function request(verb, route) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var additionalHeaders = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      if (!this.apiKey) return Promise.reject('Needs configuration: No API key provided');
      var url = route;
      var isUsingUrlParams = verb == 'get';

      if (isUsingUrlParams) {
        var builder = new URL(route);
        builder.search = new URLSearchParams(params);
        url = route + builder.search;
      }

      return this.makeRequest(url, {
        method: verb,
        body: isUsingUrlParams ? null : JSON.stringify(params),
        headers: _objectSpread({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Accept': 'application/json',
          'X_DOLOMITE_API_KEY': this.apiKey
        }, additionalHeaders)
      });
    }
  }, {
    key: "makeRequest",
    value: function makeRequest(url, fetchOptions) {
      try {
        return this.fetch(url, fetchOptions).then(function (response) {
          try {
            if (response.status >= 200 && response.status < 300) {
              return response.json().then(function (body) {
                return _objectSpread({}, body, {
                  data: body.data,
                  globals: body.global_objects
                });
              });
            }
          } catch (e) {
            throw new GenericError();
          }

          return response.json().then(function (body) {
            throw new ServiceError((body || {}).error);
          });
        });
      } catch (e) {
        return Promise.reject(new GenericError());
      }
    }
  }, {
    key: "websocket",
    get: function get() {
      return this.getWebsocket();
    }
  }]);

  return Service;
}();

exports["default"] = Service;