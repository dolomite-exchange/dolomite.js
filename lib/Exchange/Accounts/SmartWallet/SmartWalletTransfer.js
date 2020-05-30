"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _BigNumber = _interopRequireDefault(require("../../../common/BigNumber"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SmartWalletTransfer =
/*#__PURE__*/
function () {
  function SmartWalletTransfer(_ref, isPending) {
    var transfer_id = _ref.transfer_id,
        transaction_hash = _ref.transaction_hash,
        sender_address = _ref.sender_address,
        receiver_address = _ref.receiver_address,
        amount = _ref.amount,
        block_timestamp = _ref.block_timestamp;

    _classCallCheck(this, SmartWalletTransfer);

    this.id = transfer_id;
    this.transactionHash = transaction_hash;
    this.sender = sender_address;
    this.recipient = receiver_address;
    this.amount = new _BigNumber["default"](amount);
    this.isPending = isPending;
    this.timestamp = block_timestamp;
  }

  _createClass(SmartWalletTransfer, null, [{
    key: "build",
    value: function build(transferArray, isPending) {
      return transferArray.map(function (transferJson) {
        return new SmartWalletTransfer(transferJson, isPending);
      });
    }
  }]);

  return SmartWalletTransfer;
}();

exports["default"] = SmartWalletTransfer;