"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _WSManager = _interopRequireDefault(require("./websockets/WSManager"));

var _WSConnection = _interopRequireDefault(require("./websockets/WSConnection"));

var _Service2 = _interopRequireDefault(require("./Service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PackageService =
/*#__PURE__*/
function (_Service) {
  _inherits(PackageService, _Service);

  function PackageService() {
    _classCallCheck(this, PackageService);

    return _possibleConstructorReturn(this, _getPrototypeOf(PackageService).apply(this, arguments));
  }

  _createClass(PackageService, [{
    key: "get",
    value: function get(route) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      route = this.calculateRoute(route, _objectSpread({
        hydrate_all: true
      }, params));
      return this.request('get', route.url, route.params, headers);
    }
  }, {
    key: "post",
    value: function post(resource) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      route = this.calculateRoute(route, _objectSpread({
        hydrate_all: true
      }, params));
      return this.request('post', route.url, route.params, headers);
    }
  }, {
    key: "put",
    value: function put(resource) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      route = this.calculateRoute(route, _objectSpread({
        hydrate_all: true
      }, params));
      return this.request('put', route.url, route.params, headers);
    }
  }, {
    key: "delete",
    value: function _delete(resource) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      route = this.calculateRoute(route, _objectSpread({
        hydrate_all: true
      }, params));
      return this.request('delete', route.url, route.params, headers);
    }
  }]);

  return PackageService;
}(_Service2["default"]); // --------------------------------


var Package =
/*#__PURE__*/
function (_PackageService) {
  _inherits(Package, _PackageService);

  function Package(_ref) {
    var _this;

    var url = _ref.url,
        websocketUrl = _ref.websocketUrl,
        services = _ref.services;

    _classCallCheck(this, Package);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Package).call(this, url, function () {
      return _this.wsManager;
    }, {}));
    _this.url = url;
    _this.wsUrl = websocketUrl;
    _this.wsManager = new _WSManager["default"]();
    _this.services = _this.setupServicesFor(function (k, v) {
      return _this[k] = v;
    }, services);
    _this.serviceTypes = Object.keys(services).map(function (name) {
      return services[name];
    });
    return _this;
  }

  _createClass(Package, [{
    key: "setupServicesFor",
    value: function setupServicesFor(setParent, services) {
      var _this2 = this;

      var allServices = [];
      Object.keys(services).forEach(function (serviceName) {
        var ServiceType = services[serviceName];
        var service = new ServiceType(_this2.url, function () {
          return _this2.wsManager;
        }, ServiceType.routes);
        var subServices = ServiceType.services || [];

        _this2.setupServicesFor(function (k, v) {
          return service[k] = v;
        }, subServices).forEach(function (s) {
          return allServices.push(s);
        });

        setParent(serviceName, service);
        allServices.push(service);
      });
      return allServices;
    }
  }, {
    key: "configure",
    value: function configure(_ref2) {
      var _this3 = this;

      var apiKey = _ref2.apiKey,
          getAuthToken = _ref2.getAuthToken;

      this.getAuthToken = getAuthToken || function () {
        return Promise.reject('getAuthToken not defined on package');
      };

      this.configureService(apiKey);
      this.services.forEach(function (service) {
        service.configureService(apiKey);
        service.getAuthToken = _this3.getAuthToken;
      });
    }
  }, {
    key: "connectToWebsocket",
    value: function connectToWebsocket() {
      var _this4 = this;

      var connection = new _WSConnection["default"](this.wsUrl);
      return connection.establish().then(function (data) {
        _this4.wsManager.setConnection(connection);

        return data;
      })["catch"](function (error) {
        _this4.wsManager.disconnect();

        throw error;
      });
    }
  }, {
    key: "onReconnect",
    value: function onReconnect(callback) {
      this.wsManager && this.wsManager.onReconnect(callback);
    }
  }, {
    key: "isConnected",
    get: function get() {
      return this.wsManager ? this.wsManager.isConnected() : false;
    }
  }, {
    key: "exports",
    get: function get() {
      var classes = {};
      this.serviceTypes.forEach(function (ServiceType) {
        classes = _objectSpread({}, classes, ServiceType.exports || {});
      });
      return classes;
    }
  }]);

  return Package;
}(PackageService);

exports["default"] = Package;