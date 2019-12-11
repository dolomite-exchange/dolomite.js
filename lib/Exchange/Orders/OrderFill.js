"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _BigNumber = _interopRequireDefault(require("../../common/BigNumber"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * 
 */
var OrderFill =
/*#__PURE__*/
function () {
  function OrderFill(_ref) {
    var creation_timestamp = _ref.creation_timestamp,
        dolomite_order_fill_id = _ref.dolomite_order_fill_id,
        fee_amount = _ref.fee_amount,
        fee_amount_usd = _ref.fee_amount_usd,
        market = _ref.market,
        order_hash = _ref.order_hash,
        order_side = _ref.order_side,
        is_taker = _ref.is_taker,
        owner_address = _ref.owner_address,
        primary_amount = _ref.primary_amount,
        primary_margin_split_amount = _ref.primary_margin_split_amount,
        ring_hash = _ref.ring_hash,
        ring_id = _ref.ring_id,
        ring_position_index = _ref.ring_position_index,
        secondary_amount = _ref.secondary_amount,
        secondary_margin_split_amount = _ref.secondary_margin_split_amount,
        transaction_hash = _ref.transaction_hash,
        usd_amount = _ref.usd_amount;

    _classCallCheck(this, OrderFill);

    this.id = dolomite_order_fill_id;
    this.side = order_side;
    this.isTaker = is_taker;
    this.transactionHash = transaction_hash;
    this.ringHash = ring_hash;
    this.orderHash = order_hash;
    this.owner = owner_address;
    this.market = market;
    this.creationTime = new Date(parseInt(creation_timestamp));
    this.amount = new _BigNumber["default"](primary_amount);
    this.volume = new _BigNumber["default"](secondary_amount);
    this.primaryTickerAmount = new _BigNumber["default"](primary_amount);
    this.secondaryTickerAmount = new _BigNumber["default"](secondary_amount);
    this.amountUsd = usd_amount && new _BigNumber["default"](usd_amount);
    this.primaryMarginSplitAmount = new _BigNumber["default"](primary_margin_split_amount);
    this.secondaryMarginSplitAmount = new _BigNumber["default"](secondary_margin_split_amount);
    this.feeAmountUsd = fee_amount_usd && new _BigNumber["default"](fee_amount_usd);
    this.ringPositionIndex = ring_position_index;
    this.ringId = ring_id;
    this.ringHash = ring_hash;
  }

  _createClass(OrderFill, null, [{
    key: "build",
    value: function build(fillsJsonArray) {
      return fillsJsonArray.map(function (fill) {
        return new OrderFill(fill);
      });
    }
  }]);

  return OrderFill;
}();

exports["default"] = OrderFill;