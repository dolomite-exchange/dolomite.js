"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Service2 = _interopRequireDefault(require("../../common/Service"));

var _WSWrapper = _interopRequireDefault(require("../../common/websockets/WSWrapper"));

var _Market = _interopRequireDefault(require("./Market"));

var _ChartHistory = _interopRequireWildcard(require("./ChartHistory"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

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

var MarketService =
/*#__PURE__*/
function (_Service) {
  _inherits(MarketService, _Service);

  function MarketService() {
    _classCallCheck(this, MarketService);

    return _possibleConstructorReturn(this, _getPrototypeOf(MarketService).apply(this, arguments));
  }

  _createClass(MarketService, [{
    key: "getAll",
    /////////////////////////
    // ----------------------------------------------
    // Markets
    value: function getAll() {
      var period = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _Market["default"].Period.ONE_DAY;
      return this.get('markets', {
        period: period
      }).then(function (body) {
        return _Market["default"].hydrate(body.data, body.global_objects);
      });
    }
  }, {
    key: "watch",
    value: function watch() {
      return this.send('/v1/markets', 'subscribe');
    }
  }, {
    key: "onUpdate",
    value: function onUpdate(callback) {
      this.on('/v1/markets', 'update') // .build(data => Market.build(data)) // TODO: Implement this correctly when updated
      .then(callback);
    }
  }, {
    key: "onUpdateAll",
    value: function onUpdateAll(callback) {
      var _this = this;

      this.on('/v1/markets', 'update').then(function () {
        return _this.getAll().then(function (markets) {
          return callback(markets);
        });
      });
    } // ----------------------------------------------
    // Market Chart

  }, {
    key: "watchChart",
    value: function watchChart(market, interval) {
      var base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'CRYPTO';
      return this.send('/v1/candlesticks/-market-', 'subscribe', {
        market: market,
        interval: interval,
        base_symbol: base
      });
    }
  }, {
    key: "requestChartHistory",
    value: function requestChartHistory(_ref) {
      var interval = _ref.interval,
          market = _ref.market,
          fromTimestamp = _ref.fromTimestamp,
          toTimestamp = _ref.toTimestamp,
          _ref$baseCurrency = _ref.baseCurrency,
          baseCurrency = _ref$baseCurrency === void 0 ? 'CRYPTO' : _ref$baseCurrency;
      return this.send('/v1/candlesticks/-market-', 'get_history_request', {
        market: market,
        interval: interval,
        from_timestamp: fromTimestamp,
        to_timestamp: toTimestamp,
        base_symbol: baseCurrency
      });
    }
  }, {
    key: "onChartHistoryResponse",
    value: function onChartHistoryResponse(callback) {
      this.on('/v1/candlesticks/-market-', 'get_history_response').build(function (data) {
        return new _ChartHistory["default"](data);
      }).then(callback);
    }
  }, {
    key: "onChartUpdate",
    value: function onChartUpdate(callback) {
      this.on('/v1/candlesticks/-market-', 'update').build(function (data) {
        return _ChartHistory.ChartingBar.build(data);
      }).then(callback);
    }
  }]);

  return MarketService;
}(_Service2["default"]);

exports["default"] = MarketService;

_defineProperty(MarketService, "routes", {
  markets: {
    get: '/v1/markets'
  }
});

_defineProperty(MarketService, "exports", {
  Market: _Market["default"],
  ChartHistory: _ChartHistory["default"],
  ChartingBar: _ChartHistory.ChartingBar
});