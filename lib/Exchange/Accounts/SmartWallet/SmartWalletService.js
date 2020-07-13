"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Service2 = _interopRequireDefault(require("../../../common/Service"));

var _SmartWalletTransfer = _interopRequireDefault(require("./SmartWalletTransfer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

var SmartWalletService = /*#__PURE__*/function (_Service) {
  _inherits(SmartWalletService, _Service);

  var _super = _createSuper(SmartWalletService);

  function SmartWalletService() {
    _classCallCheck(this, SmartWalletService);

    return _super.apply(this, arguments);
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
    key: "upgradeDepositContract",
    value: function upgradeDepositContract(_ref2) {
      var accountId = _ref2.accountId,
          ownerAddress = _ref2.ownerAddress,
          targetAddress = _ref2.targetAddress,
          versionAddress = _ref2.versionAddress,
          additionalData = _ref2.additionalData,
          nonce = _ref2.nonce,
          feeRecipientAddress = _ref2.feeRecipientAddress,
          feeTokenAddress = _ref2.feeTokenAddress,
          feePaddedAmount = _ref2.feePaddedAmount,
          signature = _ref2.signature,
          requestHash = _ref2.requestHash;
      return this.post('upgradeDepositContract', {
        account_id: accountId,
        owner_address: ownerAddress,
        target_address: targetAddress,
        version_address: versionAddress,
        additional_data: additionalData,
        request_type: 'UPDATE',
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
    value: function executeTransfer(_ref3) {
      var accountId = _ref3.accountId,
          ownerAddress = _ref3.ownerAddress,
          targetAddress = _ref3.targetAddress,
          tokenAddress = _ref3.tokenAddress,
          recipient = _ref3.recipient,
          amount = _ref3.amount,
          shouldUnwrap = _ref3.shouldUnwrap,
          nonce = _ref3.nonce,
          feeRecipientAddress = _ref3.feeRecipientAddress,
          feeTokenAddress = _ref3.feeTokenAddress,
          feePaddedAmount = _ref3.feePaddedAmount,
          signature = _ref3.signature,
          requestHash = _ref3.requestHash;
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
  }, {
    key: "getTransfers",
    value: function getTransfers(accountId) {
      return this.get('transfers', {
        account_id: accountId
      }).then(function (body) {
        return _SmartWalletTransfer["default"].build(body.data);
      });
    }
  }, {
    key: "getPendingTransfers",
    value: function getPendingTransfers(accountId) {
      return this.get('pendingTransfers', {
        account_id: accountId
      }).then(function (body) {
        return _SmartWalletTransfer["default"].build(body.data, true);
      });
    }
  }, {
    key: "watch",
    value: function () {
      var _watch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(accountId) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.watchedAccountId && this.watchedAccountId !== accountId)) {
                  _context.next = 3;
                  break;
                }

                _context.next = 3;
                return this.send('/v1/accounts/-account-id-/smart-wallet/transfers', 'unsubscribe', {
                  dolomite_account_id: this.watchedAccountId
                });

              case 3:
                this.watchedAccountId = accountId;

                if (accountId) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", new Promise(function (resolve) {
                  return resolve();
                }));

              case 6:
                _context.next = 8;
                return this.send('/v1/accounts/-account-id-/smart-wallet/transfers', 'subscribe', {
                  dolomite_account_id: this.accountId
                });

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function watch(_x) {
        return _watch.apply(this, arguments);
      }

      return watch;
    }()
  }, {
    key: "onTransferUpdate",
    value: function onTransferUpdate(callback) {
      this.on('/v1/accounts/-account-id-/smart-wallet/transfers', 'update').then(callback);
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
  upgradeDepositContract: {
    post: '/v1/accounts/:account_id/smart-wallet/upgrade'
  },
  transfers: {
    post: '/v1/accounts/:account_id/smart-wallet/transfers',
    get: '/v1/accounts/:account_id/smart-wallet/transfers'
  },
  pendingTransfers: {
    get: '/v1/accounts/:account_id/smart-wallet/transfers/pending'
  }
});

_defineProperty(SmartWalletService, "exports", {
  SmartWalletTransfer: _SmartWalletTransfer["default"]
});