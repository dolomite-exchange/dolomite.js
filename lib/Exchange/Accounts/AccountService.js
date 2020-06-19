"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Service2 = _interopRequireDefault(require("../../common/Service"));

var _Account = _interopRequireWildcard(require("./Account"));

var _AuthToken = _interopRequireDefault(require("./Verification/AuthToken"));

var _SignatureData = _interopRequireDefault(require("./Verification/SignatureData"));

var _PrepareMessage = _interopRequireDefault(require("./Verification/PrepareMessage"));

var _VerificationService = _interopRequireDefault(require("./Verification/VerificationService"));

var _GatewayService = _interopRequireDefault(require("./Gateway/GatewayService"));

var _SmartWalletService = _interopRequireDefault(require("./SmartWallet/SmartWalletService"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var AccountService = /*#__PURE__*/function (_Service) {
  _inherits(AccountService, _Service);

  var _super = _createSuper(AccountService);

  function AccountService() {
    _classCallCheck(this, AccountService);

    return _super.apply(this, arguments);
  }

  _createClass(AccountService, [{
    key: "watch",
    /////////////////////////
    value: function () {
      var _watch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(accountId) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.smartWallet.watch(accountId);

              case 1:
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
    }() // ----------------------------------------------
    // Create Account

  }, {
    key: "prepareCreateAccount",
    value: function prepareCreateAccount(address) {
      return this.prepare('create', {
        address: address
      }).then(function (body) {
        return new _PrepareMessage["default"](body.data);
      });
    }
  }, {
    key: "createAccount",
    value: function createAccount(_ref) {
      var firstName = _ref.firstName,
          lastName = _ref.lastName,
          email = _ref.email,
          dateOfBirth = _ref.dateOfBirth,
          address = _ref.address,
          signature = _ref.signature,
          prepareId = _ref.prepareId,
          prepareMessage = _ref.prepareMessage,
          passwordHash = _ref.passwordHash,
          encryptedPrivateKey = _ref.encryptedPrivateKey,
          encryptedMnemonic = _ref.encryptedMnemonic,
          subscribedToMarketing = _ref.subscribedToMarketing,
          referralCode = _ref.referralCode;
      return this.post('create', {
        first_name: firstName,
        last_name: lastName,
        email: email,
        date_of_birth: dateOfBirth,
        wallet_address: address,
        password_hash: passwordHash,
        encrypted_private_key: encryptedPrivateKey,
        encrypted_mnemonic: encryptedMnemonic,
        is_subscribed_to_marketing: subscribedToMarketing,
        auth_signature: signature,
        prepare_id: prepareId,
        prepare_message: prepareMessage,
        referral_code: referralCode
      }).then(function (body) {
        return new _AuthToken["default"](body.data);
      });
    }
  }, {
    key: "createInternationalUnmanagedAccount",
    value: function createInternationalUnmanagedAccount(_ref2) {
      var address = _ref2.address,
          messageHash = _ref2.messageHash,
          signature = _ref2.signature,
          referralCode = _ref2.referralCode;
      return this.post('createInternational', {
        wallet_address: address,
        message_hash: messageHash,
        ecdsa_multi_hash_signature: signature,
        referral_code: referralCode
      }).then(function (body) {
        return new _AuthToken["default"](body.data);
      });
    } // ----------------------------------------------
    // Login

  }, {
    key: "getLoginSignatureMessage",
    value: function getLoginSignatureMessage() {
      var timestamp = Date.now();
      var message = "Login to Dolomite. Code: ".concat(timestamp);
      return {
        message: message,
        timestamp: timestamp
      };
    }
  }, {
    key: "signatureLogin",
    value: function signatureLogin(_ref3) {
      var accountId = _ref3.accountId,
          address = _ref3.address,
          signature = _ref3.signature,
          timestamp = _ref3.timestamp;
      return this.post('signatureLogin', {
        account_id: accountId,
        wallet_address: address,
        auth_signature: signature,
        timestamp: timestamp
      }).then(function (body) {
        return new _AuthToken["default"](body.data.token);
      });
    }
  }, {
    key: "reauthWithToken",
    value: function reauthWithToken(authToken) {
      return this.post('reauth', {}, {
        Authorization: authToken
      }).then(function (body) {
        return new _AuthToken["default"](body.data);
      });
    }
  }, {
    key: "login",
    value: function login(email, passwordHash) {
      return this.post('login', {
        email: email,
        password_hash: passwordHash
      }).then(function (body) {
        return new _Account.LoginRequest(body.data);
      });
    }
  }, {
    key: "confirmLogin",
    value: function confirmLogin(email, passwordHash, verificationMethod, code) {
      return this.post('confirmLogin', {
        email: email,
        password_hash: passwordHash,
        verification_method: verificationMethod,
        verification_code: code
      }).then(function (body) {
        return new _Account.LoginRequest(body.data);
      });
    }
  }]);

  return AccountService;
}(_Service2["default"]);

exports["default"] = AccountService;

_defineProperty(AccountService, "routes", {
  create: {
    post: '/v1/accounts/create',
    prepare: '/v1/accounts/create/prepare/:address'
  },
  createInternational: {
    post: '/v1/accounts/create-international'
  },
  signatureLogin: {
    post: '/v1/accounts/login/signature'
  },
  login: {
    post: '/v1/accounts/login'
  },
  confirmLogin: {
    post: '/v1/accounts/login/confirm'
  },
  reauth: {
    post: '/v1/accounts/reauth'
  }
});

_defineProperty(AccountService, "exports", _objectSpread({
  Account: _Account["default"],
  VerificationState: _Account.VerificationState
}, _VerificationService["default"].exports, {}, _GatewayService["default"].exports, {}, _SmartWalletService["default"].exports));

_defineProperty(AccountService, "services", {
  verification: _VerificationService["default"],
  gateway: _GatewayService["default"],
  smartWallet: _SmartWalletService["default"]
});