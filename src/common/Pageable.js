/*
 * Errors
 */
const Errors = {
  Pageable: {
    CANNOT_GET_NEXT_PAGE: 'Cannot load the next page',
  },
  PageableRequest: {
    NO_REQUEST: 'PageableRequest requires you set callback with `request`',
    NO_BUILD: 'PageableRequest requires you set callback with `build`',
  }
}

/*
 * Pagable responses can be constructed using pagable.
 *
 * Example Usage:
 * const response = // ... JSON Response
 * const paged = new Pageable(response, Tokens.build);
 *
 * Suggested Usage (Usage in route function):
 * return Pageable.request((params) => this.get('route', params))
 *   .build((data, global) => Resource.hydrate(data, global))
 *   .get(<params>)
 */
export default class Pageable extends Array {
  constructor({ paging_metadata, data, global_objects }, buildCallbackOrRequest = () => []) {
    super();
    paging_metadata = paging_metadata || {};
    
    this.cursor = paging_metadata.cursor;
    this.pageNumber = paging_metadata.page_number;
    this.pageSize = paging_metadata.page_size;
    this.sortOrder = paging_metadata.sort_order;

    if (buildCallbackOrRequest.isPageableRequest) {
      this.request = buildCallbackOrRequest;
      this.buildData = this.request.buildData;
    } else {
      this.buildData = buildCallbackOrRequest;
    }

    const responseData = data || [];
    const responseGlobals = global_objects || {};
    const list = this.buildData(responseData, responseGlobals);
    this.push(...list);

    this.hasNextPage = this.pageSize === this.length;
  }

  /*
   * Update this page's fields with another page's fields
   */
  updatePageFields(nextPage) {
    this.cursor = nextPage.cursor;
    this.pageNumber = nextPage.page_number;
    this.pageSize = nextPage.page_size;
    this.sortOrder = nextPage.sort_order;
    this.hasNextPage = nextPage.hasNextPage;
  }

  /*
   * Build a request. This enables the `getNextPage` functionality
   * automatically
   */
  static request(requestCallback) {
    return new PageableRequest().request(requestCallback);
  }

  /*
   * Returns a Promise that resolves with the same instance of
   * page that `getNextPage` was called on (now with updated data
   * and paging related fields)
   */
  getNextPage() {
    if (!this.canGetNextPage) return new Promise((res, rej) => 
      rej(Errors.Pageable.CANNOT_GET_NEXT_PAGE));

    return this.request.get({
      ...this.request.options,
      page_number: this.pageNumber + 1,
      page_size: this.pageSize,
    }, null, this).then((page) => {
      if (this.onNextPageLoaded) this.onNextPageLoaded(page);
      return page;
    });
  }

  update(arrayOrSingle) {
    const array = (arrayOrSingle instanceof Array) ? arrayOrSingle : [arrayOrSingle];
    this.unshift(...array);
  }

  get canGetNextPage() {
    return !!this.request && this.hasNextPage;
  }

  toJSON() {
    return [...this];
  }

  /*
   * returns an array of unique items given a map callback
   * Usage: array.unique(item => item.id)
   */
  unique(on) {
    return this.filter((item, i, array) => 
      array.findIndex((check) => on(check) == on(item)) == i);
  }

  get isPaged() {
    return true;
  }
}

/*
 * Usage:
 * const params = withPageableParams(options, {
 *   address: address,
 *   sort: sort 
 * });
 */
export const withPageableParams = (allOptions = {}, actualParams = {}) => {
  const params = {
    page_number: allOptions.page || 0,
    page_size: allOptions.pageSize || 50,
    ...actualParams
  };

  delete params.pageSize;
  delete params.page;

  const cleaned = (obj) => Object.keys(obj).filter(key => obj[key]).reduce(
    (newObj, key) => {
      newObj[key] = obj[key]
      return newObj
    }, {});

  return cleaned(params);
};

/*
 * Handles a Pageable request. Add a request function, a build function
 * and options... it handles the rest.
 */
class PageableRequest {
  constructor() {
    this.makeRequest = () => new Promise((res, rej) => rej(Errors.PageableRequest.NO_REQUEST));
    this.buildData = () => new Promise((res, rej) => rej(Errors.PageableRequest.NO_BUILD));
  }

  request(requestCallback) {
    this.makeRequest = requestCallback;
    return this;
  }

  build(buildCallback) {
    this.buildData = buildCallback;
    return this;
  }

  get(options, optionsActual, previousPage) {
    const params = withPageableParams(options, optionsActual || options);

    if (!this.options)
      this.options = params;

    return this.makeRequest({ ...this.options, ...params })
      .then(body => new Pageable(body, this))
      .then(nextPage => {
        let page = nextPage;

        if (previousPage) {
          previousPage.updatePageFields(nextPage);
          previousPage.push(...nextPage);
          page = previousPage;
        }

        return page;
      });
  }

  get isPageableRequest() { return  true }
}
