"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Service2 = _interopRequireDefault(require("../../common/Service"));

var _WSWrapper = _interopRequireDefault(require("../../common/websockets/WSWrapper"));

var _Portfolio = _interopRequireDefault(require("./Portfolio"));

var _Holding = _interopRequireDefault(require("./Holding"));

var _PortfolioGraph = _interopRequireDefault(require("./PortfolioGraph"));

var _Period = _interopRequireDefault(require("./Period"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var WalletService = /*#__PURE__*/function (_Service) {
  _inherits(WalletService, _Service);

  var _super = _createSuper(WalletService);

  function WalletService() {
    _classCallCheck(this, WalletService);

    return _super.apply(this, arguments);
  }

  _createClass(WalletService, [{
    key: "getPortfolio",
    /////////////////////////
    value: function getPortfolio(address) {
      return this.get('portfolio', {
        address: address
      }).then(function (body) {
        return new _Portfolio["default"](body.data);
      });
    }
  }, {
    key: "getHoldings",
    value: function getHoldings(address, options) {
      return this.get('holdings', {
        address: address,
        options: options
      }).then(function (body) {
        return _Holding["default"].build(body.data);
      });
    }
  }, {
    key: "getPortfolioGraph",
    value: function getPortfolioGraph(address) {
      var period = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Portfolio["default"].Period.ONE_DAY;
      return this.get('graph', {
        address: address,
        period: period
      }).then(function (body) {
        return new _PortfolioGraph["default"](_objectSpread({
          period: period
        }, body.data));
      });
    }
  }, {
    key: "getTokenGraph",
    value: function getTokenGraph(token) {
      var period = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Portfolio["default"].Period.ONE_DAY;
      return this.get('tokenGraph', {
        token: token,
        period: period
      }).then(function (body) {
        return new _PortfolioGraph["default"](_objectSpread({
          period: period
        }, body.data));
      });
    }
  }, {
    key: "watch",
    value: function watch(address) {
      this.watchedAddress = address;
    }
  }, {
    key: "onPortfolioUpdate",
    value: function onPortfolioUpdate(callback) {
      var _this = this;

      if (!this.portfolioWS) {
        var updateInterval = 15; // seconds TODO: change

        this.portfolioWS = new _WSWrapper["default"](function () {
          if (!_this.watchedAddress) return null;
          return _this.getPortfolio(_this.watchedAddress);
        }, updateInterval);
      }

      this.portfolioWS.subscribe(callback);
    }
  }, {
    key: "onHoldingsUpdate",
    value: function onHoldingsUpdate(callback) {
      var _this2 = this;

      if (!this.holdingsWS) {
        var updateInterval = 15; // seconds TODO: change

        this.holdingsWS = new _WSWrapper["default"](function () {
          if (!_this2.watchedAddress) return null;
          return _this2.getHoldings(_this2.watchedAddress);
        }, updateInterval);
      }

      this.holdingsWS.subscribe(callback);
    }
  }]);

  return WalletService;
}(_Service2["default"]);

exports["default"] = WalletService;

_defineProperty(WalletService, "routes", {
  portfolio: {
    get: '/v1/wallets/:address/portfolio-info'
  },
  holdings: {
    get: '/v1/wallets/:address/holding-info'
  },
  graph: {
    get: '/v1/wallets/:address/historical-values'
  },
  tokenGraph: {
    get: '/v1/assets/:token/global-average-series'
  }
});

_defineProperty(WalletService, "exports", {
  Period: _Period["default"]
});