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

var Withdrawal = /*#__PURE__*/function () {
  function Withdrawal(_ref) {
    var wallet_address = _ref.wallet_address,
        withdrawal_amount = _ref.withdrawal_amount,
        withdrawal_fee_amount = _ref.withdrawal_fee_amount,
        withdrawal_timestamp = _ref.withdrawal_timestamp,
        transaction_hash = _ref.transaction_hash,
        block_number = _ref.block_number,
        withdrawal_status = _ref.withdrawal_status;

    _classCallCheck(this, Withdrawal);

    this.walletAddress = wallet_address;
    this.withdrawalAmount = new _BigNumber["default"](withdrawal_amount);
    this.withdrawalFeeAmount = new _BigNumber["default"](withdrawal_fee_amount);
    this.withdrawalTimestamp = withdrawal_timestamp;
    this.transactionHash = transaction_hash;
    this.blockNumber = block_number;
    this.withdrawalStatus = withdrawal_status;
  }

  _createClass(Withdrawal, null, [{
    key: "build",
    value: function build(withdrawalJsonArray) {
      return withdrawalJsonArray.map(function (withdrawalJson) {
        return new Withdrawal(withdrawalJson);
      });
    }
  }]);

  return Withdrawal;
}();

exports["default"] = Withdrawal;