"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Package2 = _interopRequireDefault(require("../common/Package"));

var _MarketService = _interopRequireDefault(require("./Markets/MarketService"));

var _AddressService = _interopRequireDefault(require("./Addresses/AddressService"));

var _ExchangeService = _interopRequireDefault(require("./Exchange/ExchangeService"));

var _TokenService = _interopRequireDefault(require("./Tokens/TokenService"));

var _OrderService = _interopRequireDefault(require("./Orders/OrderService"));

var _AccountService = _interopRequireDefault(require("./Accounts/AccountService"));

var _ReferralService = _interopRequireDefault(require("./Referral/ReferralService"));

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

var EXCHANGE_API_URL = 'https://exchange-api.dolomite.io';
var EXCHANGE_WEBSOCKET_URL = 'wss://exchange-api.dolomite.io/ws-connect';
/*
 * 
 */

var Exchange =
/*#__PURE__*/
function (_Package) {
  _inherits(Exchange, _Package);

  function Exchange() {
    _classCallCheck(this, Exchange);

    return _possibleConstructorReturn(this, _getPrototypeOf(Exchange).call(this, {
      url: EXCHANGE_API_URL,
      websocketUrl: EXCHANGE_WEBSOCKET_URL,
      services: {
        markets: _MarketService["default"],
        addresses: _AddressService["default"],
        exchange: _ExchangeService["default"],
        tokens: _TokenService["default"],
        orders: _OrderService["default"],
        accounts: _AccountService["default"],
        referral: _ReferralService["default"]
      }
    }));
  } // ----------------------------------------------
  // Higher Level API Endpoints
  // - Avoids `exchange.exchange.getRates`, `exchange.getRates` is much cleaner :)


  _createClass(Exchange, [{
    key: "watchRates",
    value: function watchRates() {
      return this.exchange.watchRates();
    }
  }, {
    key: "onRatesChange",
    value: function onRatesChange(callback) {
      return this.exchange.onRatesChange(callback);
    }
  }, {
    key: "watchGasPrice",
    value: function watchGasPrice() {
      return this.exchange.watchGasPrice();
    }
  }, {
    key: "onGasPriceUpdate",
    value: function onGasPriceUpdate(callback) {
      return this.exchange.onGasPriceUpdate(callback);
    }
  }, {
    key: "getInfo",
    value: function getInfo(address) {
      return this.exchange.getInfo(address);
    }
  }, {
    key: "onUpdateInfo",
    value: function onUpdateInfo(callback) {
      return this.exchange.onUpdateInfo(callback);
    }
  }, {
    key: "isUnsupportedRegion",
    value: function isUnsupportedRegion() {
      return this.exchange.isUnsupportedRegion();
    }
  }, {
    key: "getRates",
    value: function getRates() {
      return this.exchange.getRates();
    }
  }, {
    key: "getCurrentGasPrice",
    value: function getCurrentGasPrice() {
      return this.exchange.getCurrentGasPrice();
    }
  }]);

  return Exchange;
}(_Package2["default"]);

var exchange = new Exchange();
var _default = exchange;
exports["default"] = _default;