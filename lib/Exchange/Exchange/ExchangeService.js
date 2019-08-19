"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Service2 = _interopRequireDefault(require("../../common/Service"));

var _BigNumber = _interopRequireDefault(require("../../common/BigNumber"));

var _ExchangeInfo = _interopRequireDefault(require("./ExchangeInfo"));

var _ExchangeRates = _interopRequireDefault(require("./ExchangeRates"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ExchangeService =
/*#__PURE__*/
function (_Service) {
  _inherits(ExchangeService, _Service);

  function ExchangeService() {
    _classCallCheck(this, ExchangeService);

    return _possibleConstructorReturn(this, _getPrototypeOf(ExchangeService).apply(this, arguments));
  }

  _createClass(ExchangeService, [{
    key: "getInfo",
    /////////////////////////
    value: function getInfo() {
      return this.get('info').then(function (body) {
        return new _ExchangeInfo["default"](body.data);
      });
    }
  }, {
    key: "isUnsupportedRegion",
    value: function isUnsupportedRegion() {
      return this.get('unsupportedRegion').then(function (body) {
        return body.data;
      });
    } // ----------------------------------------------
    // Exchange Rates

  }, {
    key: "getRates",
    value: function getRates() {
      return this.get('rates').then(function (body) {
        return new _ExchangeRates["default"](body.data);
      });
    }
  }, {
    key: "watchRates",
    value: function watchRates() {
      return this.send('/v1/tokens/rates/latest', 'subscribe');
    }
  }, {
    key: "onRatesChange",
    value: function onRatesChange(callback) {
      return this.on('/v1/tokens/rates/latest', 'update').build(function (data) {
        return new _ExchangeRates["default"](data);
      }).then(callback);
    } // ----------------------------------------------
    // Gas Price Estimates

  }, {
    key: "getCurrentGasPrice",
    value: function getCurrentGasPrice() {
      return this.get('gasPrice').then(function (body) {
        return _BigNumber["default"].build(body.data.fast.amount, body.data.fast.unit.precision);
      });
    }
  }, {
    key: "watchGasPrice",
    value: function watchGasPrice() {
      return this.send('/v1/estimate-gas', 'subscribe');
    }
  }, {
    key: "onGasPriceUpdate",
    value: function onGasPriceUpdate(callback) {
      this.on('/v1/estimate-gas', 'update').build(function (data) {
        return _BigNumber["default"].build(data.fast.amount, data.fast.unit.precision);
      }).then(callback);
    }
  }]);

  return ExchangeService;
}(_Service2["default"]);

exports["default"] = ExchangeService;

_defineProperty(ExchangeService, "routes", {
  info: {
    get: '/v1/info'
  },
  rates: {
    get: '/v1/tokens/rates/latest'
  },
  metrics: {
    get: '/exchange/metrics'
  },
  gasPrice: {
    get: '/v1/estimate-gas'
  },
  unsupportedRegion: {
    get: '/v1/kyc/is-unsupported-region'
  }
});

_defineProperty(ExchangeService, "exports", {
  ExchangeInfo: _ExchangeInfo["default"],
  ExchangeRates: _ExchangeRates["default"]
});