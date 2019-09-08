"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _BigNumber = _interopRequireDefault(require("../../common/BigNumber"));

var _Token = _interopRequireDefault(require("../Tokens/Token"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isObject = function isObject(o) {
  return o !== null && _typeof(o) === "object";
};

var toToken = function toToken(t) {
  return isObject(t) ? new _Token["default"](t) : t;
};
/*
 * Details of a token-pair/market
 */


var Market =
/*#__PURE__*/
function () {
  function Market(_ref) {
    var market = _ref.market,
        primary_token = _ref.primary_token,
        secondary_token = _ref.secondary_token,
        metric_period = _ref.metric_period,
        period_high = _ref.period_high,
        period_low = _ref.period_low,
        period_amount = _ref.period_amount,
        period_volume = _ref.period_volume,
        period_change = _ref.period_change,
        current_price = _ref.current_price,
        last_price_traded = _ref.last_price_traded,
        current_high = _ref.current_high,
        current_low = _ref.current_low,
        is_margin_trading_enabled = _ref.is_margin_trading_enabled,
        margin_trading_details = _ref.margin_trading_details,
        period_volume_usd = _ref.period_volume_usd;

    _classCallCheck(this, Market);

    this.market = market;
    this.primaryToken = toToken(primary_token);
    this.secondaryToken = toToken(secondary_token);
    this.metricPeriod = metric_period;
    this.lastPrice = new _BigNumber["default"](last_price_traded);
    this.currentPrice = new _BigNumber["default"](current_price);
    this.highestBid = new _BigNumber["default"](current_high);
    this.lowestAsk = new _BigNumber["default"](current_low);
    this.volumePrimaryToken = new _BigNumber["default"](period_amount);
    this.volumeSecondaryToken = new _BigNumber["default"](period_volume);
    this.volumeUsd = new _BigNumber["default"](period_volume_usd);
    this.changePeriod = {
      highPrice: new _BigNumber["default"](period_high),
      lowPrice: new _BigNumber["default"](period_low),
      percentDifference: _BigNumber["default"].fromFloat(period_change)
    };
    this.isMarginTradingEnabled = is_margin_trading_enabled;
    this.marginTradingDetails = {
      primaryMarketId: margin_trading_details.primary_market_id,
      secondaryMarketId: margin_trading_details.secondary_market_id
    }; // Deprecated

    this.pair = market;
  }

  _createClass(Market, null, [{
    key: "build",
    value: function build(marketJsonArray) {
      return marketJsonArray.map(function (marketJson) {
        return new Market(marketJson);
      });
    }
  }, {
    key: "hydrate",
    value: function hydrate(marketJsonArray, globals) {
      var tokens = globals.tokens || {};
      var markets = marketJsonArray.map(function (market) {
        market.primary_token = tokens[market.primary_token];
        market.secondary_token = tokens[market.secondary_token];
        return market;
      });
      return Market.build(markets);
    }
  }]);

  return Market;
}();
/*
 * Different periods for basic market data
 */


exports["default"] = Market;
Market.Period = {
  ONE_HOUR: 'ONE_HOUR',
  ONE_DAY: 'ONE_DAY',
  ONE_WEEK: 'ONE_WEEK',
  ONE_MONTH: 'ONE_MONTH'
};
Market.Periods = Object.values(Market.Period);