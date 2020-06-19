"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _SRN = _interopRequireDefault(require("./SRN"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var rounded = function rounded(n) {
  return n && parseFloat(n.toFixed(5));
};

var toHistory = function toHistory() {
  var history = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return history.map(function (item) {
    return item;
  });
};

var isValidPaymentMethod = function isValidPaymentMethod(srn) {
  var requireAch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return srn.type === _SRN["default"].Type.PAYMENT_METHOD && (!requireAch || srn.subType === _SRN["default"].SubType.ACH);
};

var isValidAddress = function isValidAddress(srn) {
  return srn.type === _SRN["default"].Type.ETHEREUM_ADDRESS;
};

var isWithdrawal = function isWithdrawal(_ref) {
  var source = _ref.source,
      destination = _ref.destination;
  return isValidAddress(source) && isValidPaymentMethod(destination, false);
};

var isDeposit = function isDeposit(_ref2) {
  var source = _ref2.source,
      destination = _ref2.destination;
  return isValidPaymentMethod(source) && isValidAddress(destination);
};

var toType = function toType(input) {
  return isWithdrawal(input) && FiatTransfer.Type.WITHDRAWAL || isDeposit(input) && FiatTransfer.Type.DEPOSIT || null;
};

var FiatTransfer = /*#__PURE__*/function () {
  function FiatTransfer(_ref3) {
    var identifier = _ref3.identifier,
        fee_amounts = _ref3.fee_amounts,
        total_fee_amount = _ref3.total_fee_amount,
        transfer_gateway_status = _ref3.transfer_gateway_status,
        source = _ref3.source,
        destination = _ref3.destination,
        creation_timestamp = _ref3.creation_timestamp,
        completed_timestamp = _ref3.completed_timestamp,
        cancelled_timestamp = _ref3.cancelled_timestamp,
        expiration_timestamp = _ref3.expiration_timestamp,
        status_history = _ref3.status_history,
        source_ticker = _ref3.source_ticker,
        source_amount = _ref3.source_amount,
        destination_ticker = _ref3.destination_ticker,
        destination_amount = _ref3.destination_amount,
        exchange_rate = _ref3.exchange_rate,
        transaction_hash = _ref3.transaction_hash;

    _classCallCheck(this, FiatTransfer);

    this.id = identifier;
    this.fees = fee_amounts || {};
    this.feeTotal = rounded(total_fee_amount);
    this.status = transfer_gateway_status;
    this.source = new _SRN["default"](source);
    this.sourceTicker = source_ticker;
    this.sourceAmount = source_amount;
    this.destination = new _SRN["default"](destination);
    this.destinationTicker = destination_ticker;
    this.destinationAmount = rounded(destination_amount);
    this.exchangeRate = rounded(exchange_rate);
    this.reverseExchangeRate = rounded(1 / exchange_rate);
    this.blockchainTransaction = transaction_hash;
    this.history = toHistory(status_history);
    this.createdAt = new Date(creation_timestamp);
    this.cancelledAt = cancelled_timestamp && new Date(cancelled_timestamp);
    this.expiredAt = expiration_timestamp && new Date(expiration_timestamp);
    this.completedAt = completed_timestamp && new Date(completed_timestamp); // Custom fields

    this.type = toType({
      source: this.source,
      destination: this.destination
    });
    this.isDolomiteTransfer = !!this.type;
    if (this.status == 'PREVIEW' && this.type === 'WITHDRAWAL') this.status = 'PENDING';
  }

  _createClass(FiatTransfer, null, [{
    key: "build",
    value: function build(transfersJson) {
      return transfersJson.map(function (transfer) {
        return new FiatTransfer(transfer);
      });
    }
  }]);

  return FiatTransfer;
}();

FiatTransfer.Type = {
  DEPOSIT: 'DEPOSIT',
  WITHDRAWAL: 'WITHDRAWAL'
};
var _default = FiatTransfer;
exports["default"] = _default;