"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Service2 = _interopRequireDefault(require("../../common/Service"));

var _TokenSummary = _interopRequireDefault(require("./TokenSummary"));

var _TokenDetails = _interopRequireDefault(require("./TokenDetails"));

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

/*
 * Service for the Token resource in the
 * Market API.
 */
var TokenService =
/*#__PURE__*/
function (_Service) {
  _inherits(TokenService, _Service);

  function TokenService() {
    _classCallCheck(this, TokenService);

    return _possibleConstructorReturn(this, _getPrototypeOf(TokenService).apply(this, arguments));
  }

  _createClass(TokenService, [{
    key: "getAll",
    /////////////////////////
    value: function getAll() {
      var term = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var sort = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'HIGHEST_MARKET_CAP';
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.pageable('search').build(function (data) {
        return _TokenDetails["default"].build(data);
      }).get(options, {
        sort_order: sort,
        search_term: term
      });
    }
  }, {
    key: "getDetails",
    value: function getDetails(identifier) {
      return this.get('details', {
        identifier: identifier
      }).then(function (body) {
        return new _TokenDetails["default"](body.data);
      });
    }
  }, {
    key: "getExchangeRates",
    value: function getExchangeRates() {
      return this.get('rates').then(function (body) {
        return new _ExchangeRates["default"](body.data);
      });
    }
  }, {
    key: "watchExchangeRates",
    value: function watchExchangeRates() {
      return this.send('/v1/assets/rates/latest', 'subscribe');
    }
  }, {
    key: "onExchangeRatesUpdate",
    value: function onExchangeRatesUpdate(callback) {
      this.on('/v1/assets/rates/latest', 'update').build(function (data) {
        return new _ExchangeRates["default"](data);
      }).then(callback);
    }
  }]);

  return TokenService;
}(_Service2["default"]);

exports["default"] = TokenService;

_defineProperty(TokenService, "routes", {
  currencies: {
    get: '/currencies'
  },
  rates: {
    get: '/v1/assets/rates/latest'
  },
  search: {
    get: '/v1/assets/search?token_types=ERC20&token_types=ETH'
  },
  details: {
    get: '/v1/assets/:identifier'
  }
});

_defineProperty(TokenService, "exports", {
  Token: _TokenSummary["default"]
});