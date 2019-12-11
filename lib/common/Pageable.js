"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withPageableParams = exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/*
 * Errors
 */
var Errors = {
  Pageable: {
    CANNOT_GET_NEXT_PAGE: 'Cannot load the next page'
  },
  PageableRequest: {
    NO_REQUEST: 'PageableRequest requires you set callback with `request`',
    NO_BUILD: 'PageableRequest requires you set callback with `build`'
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

};

var Pageable =
/*#__PURE__*/
function (_Array) {
  _inherits(Pageable, _Array);

  function Pageable(_ref) {
    var _this2;

    var _this;

    var paging_metadata = _ref.paging_metadata,
        data = _ref.data,
        global_objects = _ref.global_objects;
    var buildCallbackOrRequest = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
      return [];
    };

    _classCallCheck(this, Pageable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Pageable).call(this));
    paging_metadata = paging_metadata || {};
    _this.cursor = paging_metadata.cursor;
    _this.pageNumber = paging_metadata.page_number;
    _this.pageSize = paging_metadata.page_size;
    _this.sortOrder = paging_metadata.sort_order;

    if (buildCallbackOrRequest.isPageableRequest) {
      _this.request = buildCallbackOrRequest;
      _this.buildData = _this.request.buildData;
    } else {
      _this.buildData = buildCallbackOrRequest;
    }

    var responseData = data || [];
    var responseGlobals = global_objects || {};

    var list = _this.buildData(responseData, responseGlobals);

    (_this2 = _this).push.apply(_this2, _toConsumableArray(list));

    _this.hasNextPage = _this.pageSize === _this.length;
    return _this;
  }
  /*
   * Update this page's fields with another page's fields
   */


  _createClass(Pageable, [{
    key: "updatePageFields",
    value: function updatePageFields(nextPage) {
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

  }, {
    key: "getNextPage",

    /*
     * Returns a Promise that resolves with the same instance of
     * page that `getNextPage` was called on (now with updated data
     * and paging related fields)
     */
    value: function getNextPage() {
      var _this3 = this;

      if (!this.canGetNextPage) return new Promise(function (res, rej) {
        return rej(Errors.Pageable.CANNOT_GET_NEXT_PAGE);
      });
      return this.request.get(_objectSpread({}, this.request.options, {
        page_number: this.pageNumber + 1,
        page_size: this.pageSize
      }), null, this).then(function (page) {
        if (_this3.onNextPageLoaded) _this3.onNextPageLoaded(page);
        return page;
      });
    }
  }, {
    key: "update",
    value: function update(arrayOrSingle) {
      var array = arrayOrSingle instanceof Array ? arrayOrSingle : [arrayOrSingle];
      this.unshift.apply(this, _toConsumableArray(array));
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return _toConsumableArray(this);
    }
    /*
     * returns an array of unique items given a map callback
     * Usage: array.unique(item => item.id)
     */

  }, {
    key: "unique",
    value: function unique(on) {
      return this.filter(function (item, i, array) {
        return array.findIndex(function (check) {
          return on(check) == on(item);
        }) == i;
      });
    }
  }, {
    key: "canGetNextPage",
    get: function get() {
      return !!this.request && this.hasNextPage;
    }
  }, {
    key: "isPaged",
    get: function get() {
      return true;
    }
  }], [{
    key: "request",
    value: function request(requestCallback) {
      return new PageableRequest().request(requestCallback);
    }
  }]);

  return Pageable;
}(_wrapNativeSuper(Array));
/*
 * Usage:
 * const params = withPageableParams(options, {
 *   address: address,
 *   sort: sort 
 * });
 */


exports["default"] = Pageable;

var withPageableParams = function withPageableParams() {
  var allOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var actualParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var params = _objectSpread({
    page_number: allOptions.page || 0,
    page_size: allOptions.pageSize || 50
  }, actualParams);

  delete params.pageSize;
  delete params.page;

  var cleaned = function cleaned(obj) {
    return Object.keys(obj).filter(function (key) {
      return obj[key];
    }).reduce(function (newObj, key) {
      newObj[key] = obj[key];
      return newObj;
    }, {});
  };

  return cleaned(params);
};
/*
 * Handles a Pageable request. Add a request function, a build function
 * and options... it handles the rest.
 */


exports.withPageableParams = withPageableParams;

var PageableRequest =
/*#__PURE__*/
function () {
  function PageableRequest() {
    _classCallCheck(this, PageableRequest);

    this.makeRequest = function () {
      return new Promise(function (res, rej) {
        return rej(Errors.PageableRequest.NO_REQUEST);
      });
    };

    this.buildData = function () {
      return new Promise(function (res, rej) {
        return rej(Errors.PageableRequest.NO_BUILD);
      });
    };
  }

  _createClass(PageableRequest, [{
    key: "request",
    value: function request(requestCallback) {
      this.makeRequest = requestCallback;
      return this;
    }
  }, {
    key: "build",
    value: function build(buildCallback) {
      this.buildData = buildCallback;
      return this;
    }
  }, {
    key: "get",
    value: function get(options, optionsActual, previousPage) {
      var _this4 = this;

      var params = withPageableParams(options, optionsActual || options);
      if (!this.options) this.options = params;
      return this.makeRequest(_objectSpread({}, this.options, params)).then(function (body) {
        return new Pageable(body, _this4);
      }).then(function (nextPage) {
        var page = nextPage;

        if (previousPage) {
          previousPage.updatePageFields(nextPage);
          previousPage.push.apply(previousPage, _toConsumableArray(nextPage));
          page = previousPage;
        }

        return page;
      });
    }
  }, {
    key: "isPageableRequest",
    get: function get() {
      return true;
    }
  }]);

  return PageableRequest;
}();