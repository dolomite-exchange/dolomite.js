"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Service2 = _interopRequireDefault(require("../../../common/Service"));

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

var SmartWalletService =
/*#__PURE__*/
function (_Service) {
  _inherits(SmartWalletService, _Service);

  function SmartWalletService() {
    _classCallCheck(this, SmartWalletService);

    return _possibleConstructorReturn(this, _getPrototypeOf(SmartWalletService).apply(this, arguments));
  }

  _createClass(SmartWalletService, [{
    key: "getNonces",
    /////////////////////////
    value: function getNonces(ownerAddress) {
      return this.get('nonces', {
        address: ownerAddress
      }).then(function (body) {
        return body.data;
      }).then(function (data) {
        return {
          dolomiteDirectV1: data.dolomite_direct_v1_nonce,
          registry: data.deposit_contract_registry_nonce
        };
      });
    }
  }, {
    key: "createDepositContract",
    value: function createDepositContract(_ref) {
      var accountId = _ref.accountId,
          ownerAddress = _ref.ownerAddress,
          targetAddress = _ref.targetAddress,
          versionAddress = _ref.versionAddress,
          additionalData = _ref.additionalData,
          nonce = _ref.nonce,
          feeRecipientAddress = _ref.feeRecipientAddress,
          feeTokenAddress = _ref.feeTokenAddress,
          feePaddedAmount = _ref.feePaddedAmount,
          signature = _ref.signature,
          requestHash = _ref.requestHash;
      return this.post('deployDepositContract', {
        account_id: accountId,
        owner_address: ownerAddress,
        target_address: targetAddress,
        version_address: versionAddress,
        additional_data: additionalData,
        request_type: 'CREATE',
        nonce: nonce,
        fee_recipient_address: feeRecipientAddress,
        fee_token_address: feeTokenAddress,
        fee_padded_amount: feePaddedAmount,
        ecdsa_signature: signature,
        request_hash: requestHash
      }).then(function (body) {
        return body.data.transaction_hash;
      });
    }
  }, {
    key: "executeTransfer",
    value: function executeTransfer(_ref2) {
      var accountId = _ref2.accountId,
          ownerAddress = _ref2.ownerAddress,
          targetAddress = _ref2.targetAddress,
          tokenAddress = _ref2.tokenAddress,
          recipient = _ref2.recipient,
          amount = _ref2.amount,
          shouldUnwrap = _ref2.shouldUnwrap,
          nonce = _ref2.nonce,
          feeRecipientAddress = _ref2.feeRecipientAddress,
          feeTokenAddress = _ref2.feeTokenAddress,
          feePaddedAmount = _ref2.feePaddedAmount,
          signature = _ref2.signature,
          requestHash = _ref2.requestHash;
      return this.post('transfers', {
        account_id: accountId,
        owner_address: ownerAddress,
        target_address: targetAddress,
        transfer_token_address: tokenAddress,
        transfer_recipient_address: recipient,
        transfer_padded_amount: amount,
        should_unwrap: shouldUnwrap,
        request_type: 'TRANSFER',
        nonce: nonce,
        fee_recipient_address: feeRecipientAddress,
        fee_token_address: feeTokenAddress,
        fee_padded_amount: feePaddedAmount,
        ecdsa_signature: signature,
        request_hash: requestHash
      }).then(function (body) {
        return body.data.transaction_hash;
      });
    }
  }]);

  return SmartWalletService;
}(_Service2["default"]);

exports["default"] = SmartWalletService;

_defineProperty(SmartWalletService, "routes", {
  nonces: {
    get: '/v1/accounts/addresses/:address/smart-wallet/nonces'
  },
  deployDepositContract: {
    post: '/v1/accounts/:account_id/smart-wallet/deposit-contracts'
  },
  transfers: {
    post: '/v1/accounts/:account_id/smart-wallet/transfers'
  }
});

_defineProperty(SmartWalletService, "exports", {});