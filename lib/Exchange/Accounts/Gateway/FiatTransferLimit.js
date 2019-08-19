"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _FiatTransfer = _interopRequireDefault(require("./FiatTransfer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Temporary
var HARD_CODED_LIMITS = [{
  asset_ticker: 'ETH',
  transfer_type: 'WITHDRAWAL',
  time_period: 86400000,
  // 1d in milliseconds
  limit_amount: 50,
  consumed_amount: 0,
  limit_ticker: 'ETH'
}, {
  asset_ticker: 'WETH',
  transfer_type: 'WITHDRAWAL',
  time_period: 86400000,
  // 1d in milliseconds
  limit_amount: 20000,
  consumed_amount: 0,
  limit_ticker: 'USD'
}, {
  asset_ticker: 'DAI',
  transfer_type: 'WITHDRAWAL',
  time_period: 86400000,
  // 1d in milliseconds
  limit_amount: 20000,
  consumed_amount: 0,
  limit_ticker: 'USD'
}, {
  asset_ticker: 'USD',
  transfer_type: 'DEPOSIT',
  time_period: 604800000,
  // 7d in milliseconds
  limit_amount: 2500,
  consumed_amount: 0,
  limit_ticker: 'USD'
}, {
  asset_ticker: 'USD',
  transfer_type: 'DEPOSIT',
  time_period: 2592000000,
  // 30d in milliseconds
  limit_amount: 10000,
  consumed_amount: 0,
  limit_ticker: 'USD'
}, {
  asset_ticker: 'USD',
  transfer_type: 'DEPOSIT',
  time_period: 5184000000,
  // 60d in milliseconds
  limit_amount: 20000,
  consumed_amount: 0,
  limit_ticker: 'USD'
}];

var FiatTransferLimit =
/*#__PURE__*/
function () {
  function FiatTransferLimit(_ref) {
    var asset_ticker = _ref.asset_ticker,
        transfer_type = _ref.transfer_type,
        time_period = _ref.time_period,
        limit_amount = _ref.limit_amount,
        consumed_amount = _ref.consumed_amount,
        limit_ticker = _ref.limit_ticker;

    _classCallCheck(this, FiatTransferLimit);

    this.ticker = asset_ticker;
    this.transferType = transfer_type;
    this.timePeriod = time_period;
    this.limit = limit_amount;
    this.consumed = consumed_amount;
    this.remaining = Math.max(limit_amount - consumed_amount, 0);
    this.limitTicker = limit_ticker;
  }

  _createClass(FiatTransferLimit, null, [{
    key: "build",
    value: function build(limitsJson) {
      return limitsJson.map(function (limit) {
        return new FiatTransferLimit(limit);
      });
    }
  }]);

  return FiatTransferLimit;
}();

FiatTransferLimit.HARD_CODED = FiatTransferLimit.build(HARD_CODED_LIMITS);
var _default = FiatTransferLimit;
exports["default"] = _default;