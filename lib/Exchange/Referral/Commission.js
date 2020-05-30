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

var Commission =
/*#__PURE__*/
function () {
  function Commission(_ref) {
    var referrer_address = _ref.referrer_address,
        dolomite_order_fill_id = _ref.dolomite_order_fill_id,
        commission_amount = _ref.commission_amount,
        block_number = _ref.block_number,
        block_timestamp = _ref.block_timestamp,
        transaction_hash = _ref.transaction_hash,
        eth_commission_amount = _ref.eth_commission_amount;

    _classCallCheck(this, Commission);

    this.referrerAddress = referrer_address;
    this.dolomiteOrderFillId = dolomite_order_fill_id;
    this.commissionAmount = new _BigNumber["default"](commission_amount);
    this.blockNumber = block_number;
    this.blockTimestamp = block_timestamp;
    this.transactionHash = transaction_hash;
    this.ethCommissionAmount = new _BigNumber["default"](eth_commission_amount);
  }

  _createClass(Commission, null, [{
    key: "build",
    value: function build(commissionJsonArray) {
      return commissionJsonArray.map(function (commissionJson) {
        return new Commission(commissionJson);
      });
    }
  }]);

  return Commission;
}();

exports["default"] = Commission;