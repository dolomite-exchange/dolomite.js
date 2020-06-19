"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AuthService2 = _interopRequireDefault(require("../../../common/AuthService"));

var _PrepareMessage = _interopRequireDefault(require("../Verification/PrepareMessage"));

var _PaymentMethod = _interopRequireDefault(require("./PaymentMethod"));

var _FiatTransfer = _interopRequireDefault(require("./FiatTransfer"));

var _FiatTransferLimit = _interopRequireDefault(require("./FiatTransferLimit"));

var _SRN = _interopRequireDefault(require("./SRN"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VerificationService = /*#__PURE__*/function (_AuthService) {
  _inherits(VerificationService, _AuthService);

  var _super = _createSuper(VerificationService);

  function VerificationService() {
    _classCallCheck(this, VerificationService);

    return _super.apply(this, arguments);
  }

  _createClass(VerificationService, [{
    key: "getPaymentMethods",
    /////////////////////////
    value: function getPaymentMethods(accountId) {
      return this.requiresAuth.get('paymentMethods', {
        account_id: accountId
      }).then(function (body) {
        return _PaymentMethod["default"].build(body.data);
      });
    }
  }, {
    key: "getLimits",
    value: function getLimits(accountId) {
      // TODO: replace with actual network call
      return new Promise(function (resolve, _) {
        resolve(_FiatTransferLimit["default"].HARD_CODED);
      });
    }
  }, {
    key: "getTransferHistory",
    value: function getTransferHistory(accountId) {
      return this.requiresAuth.get('transferHistory', {
        account_id: accountId
      }).then(function (body) {
        return _FiatTransfer["default"].build(body.data);
      });
    } // ----------------------------------------------
    // Deposit

  }, {
    key: "getDepositPreview",
    value: function getDepositPreview(_ref) {
      var accountId = _ref.accountId,
          address = _ref.address,
          amount = _ref.amount,
          paymentMethodId = _ref.paymentMethodId,
          depositTicker = _ref.depositTicker;
      return this.requiresAuth.post('depositPreview', {
        account_id: accountId,
        amount: amount,
        amount_ticker: 'USD',
        wallet_address: address,
        payment_method_id: paymentMethodId,
        deposit_asset_ticker: depositTicker
      }).then(function (body) {
        return new _FiatTransfer["default"](body.data);
      });
    }
  }, {
    key: "prepareDeposit",
    value: function prepareDeposit(_ref2) {
      var address = _ref2.address,
          accountId = _ref2.accountId;
      return this.requiresAuth.prepare('createDeposit', {
        address: address,
        account_id: accountId
      }).then(function (body) {
        return new _PrepareMessage["default"](body.data);
      });
    }
  }, {
    key: "deposit",
    value: function deposit(_ref3) {
      var accountId = _ref3.accountId,
          address = _ref3.address,
          amount = _ref3.amount,
          paymentMethodId = _ref3.paymentMethodId,
          depositTicker = _ref3.depositTicker,
          signature = _ref3.signature,
          prepareId = _ref3.prepareId;
      return this.requiresAuth.post('createDeposit', {
        account_id: accountId,
        amount: amount,
        amount_ticker: 'USD',
        wallet_address: address,
        payment_method_id: paymentMethodId,
        deposit_asset_ticker: depositTicker,
        auth_signature: signature,
        prepare_id: prepareId
      }).then(function (body) {
        return new _FiatTransfer["default"](body.data);
      });
    } // ----------------------------------------------
    // Withdrawal

  }, {
    key: "getWithdrawalPreview",
    value: function getWithdrawalPreview(_ref4) {
      var accountId = _ref4.accountId,
          address = _ref4.address,
          amount = _ref4.amount,
          paymentMethodId = _ref4.paymentMethodId,
          withdrawalTicker = _ref4.withdrawalTicker;
      return this.requiresAuth.post('withdrawalPreview', {
        account_id: accountId,
        amount_ticker: withdrawalTicker,
        amount: amount,
        wallet_address: address,
        payment_method_id: paymentMethodId,
        destination_ticker: 'USD'
      }).then(function (body) {
        return new _FiatTransfer["default"](body.data);
      });
    }
  }, {
    key: "watchWithdrawal",
    value: function watchWithdrawal(_ref5) {
      var accountId = _ref5.accountId,
          address = _ref5.address,
          amount = _ref5.amount,
          paymentMethodId = _ref5.paymentMethodId,
          withdrawalTicker = _ref5.withdrawalTicker,
          blockchainTransaction = _ref5.blockchainTransaction;
      return this.requiresAuth.post('watchWithdrawal', {
        account_id: accountId,
        amount_ticker: withdrawalTicker,
        amount: amount,
        wallet_address: address,
        payment_method_id: paymentMethodId,
        destination_ticker: 'USD',
        blockchain_transaction: blockchainTransaction,
        creation_timestamp: Date.now()
      }).then(function (body) {
        return new _FiatTransfer["default"](body.data);
      });
    }
  }]);

  return VerificationService;
}(_AuthService2["default"]);

exports["default"] = VerificationService;

_defineProperty(VerificationService, "routes", {
  paymentMethods: {
    get: '/v1/accounts/:account_id/payment-methods'
  },
  transferHistory: {
    get: '/v1/accounts/:account_id/transfers'
  },
  depositPreview: {
    post: '/v1/accounts/:account_id/transfers/deposits/preview'
  },
  withdrawalPreview: {
    post: '/v1/accounts/:account_id/transfers/withdrawals/preview'
  },
  createDeposit: {
    post: '/v1/accounts/:account_id/transfers/deposits/create',
    prepare: '/v1/accounts/:account_id/transfers/deposits/create/prepare/:address'
  },
  watchWithdrawal: {
    post: '/v1/accounts/:account_id/transfers/withdrawals/watch'
  }
});

_defineProperty(VerificationService, "exports", {
  PaymentMethod: _PaymentMethod["default"],
  FiatTransfer: _FiatTransfer["default"],
  FiatTransferLimit: _FiatTransferLimit["default"],
  SRN: _SRN["default"]
});