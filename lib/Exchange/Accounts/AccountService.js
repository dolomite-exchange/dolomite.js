"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Service2 = _interopRequireDefault(require("../../common/Service"));

var _Account = _interopRequireDefault(require("./Account"));

var _AuthToken = _interopRequireDefault(require("./Verification/AuthToken"));

var _SignatureData = _interopRequireDefault(require("./Verification/SignatureData"));

var _PrepareMessage = _interopRequireDefault(require("./Verification/PrepareMessage"));

var _VerificationService = _interopRequireDefault(require("./Verification/VerificationService"));

var _GatewayService = _interopRequireDefault(require("./Gateway/GatewayService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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

var AccountService =
/*#__PURE__*/
function (_Service) {
  _inherits(AccountService, _Service);

  function AccountService() {
    _classCallCheck(this, AccountService);

    return _possibleConstructorReturn(this, _getPrototypeOf(AccountService).apply(this, arguments));
  }

  _createClass(AccountService, [{
    key: "getLoginSignatureData",
    /////////////////////////
    // ----------------------------------------------
    // Login
    value: function getLoginSignatureData() {
      var AccountLogin = [{
        name: "verificationCode",
        type: "string"
      }]; // the timestamp in milli

      var timestamp = Date.now();
      var data = (0, _SignatureData["default"])('AccountLogin', AccountLogin, {
        verificationCode: "".concat(timestamp)
      });
      data.timestamp = timestamp;
      return data;
    }
  }, {
    key: "login",
    value: function login(_ref) {
      var accountId = _ref.accountId,
          address = _ref.address,
          signature = _ref.signature,
          timestamp = _ref.timestamp;
      return this.post('login', {
        account_id: accountId,
        wallet_address: address,
        auth_signature: signature,
        timestamp: timestamp
      }).then(function (body) {
        return new _AuthToken["default"](body.data);
      });
    } // ----------------------------------------------
    // Create Account

  }, {
    key: "prepareCreateAccount",
    value: function prepareCreateAccount(_ref2) {
      var address = _ref2.address;
      return this.prepare('create', {
        address: address
      }).then(function (body) {
        return new _PrepareMessage["default"](body.data);
      });
    }
  }, {
    key: "createAccount",
    value: function createAccount(_ref3) {
      var firstName = _ref3.firstName,
          lastName = _ref3.lastName,
          email = _ref3.email,
          dateOfBirth = _ref3.dateOfBirth,
          address = _ref3.address,
          signature = _ref3.signature,
          prepareId = _ref3.prepareId,
          subscribedToMarketing = _ref3.subscribedToMarketing;
      return this.post('create', {
        first_name: firstName,
        last_name: lastName,
        email: email,
        date_of_birth: dateOfBirth,
        wallet_address: address,
        auth_signature: signature,
        prepare_id: prepareId,
        is_subscribed_to_marketing: subscribedToMarketing
      }).then(function (body) {
        return new _AuthToken["default"](body.data);
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
  login: {
    post: '/v1/accounts/:account_id/login'
  }
});

_defineProperty(AccountService, "exports", _objectSpread({
  Account: _Account["default"]
}, _VerificationService["default"].exports, _GatewayService["default"].exports));

_defineProperty(AccountService, "services", {
  verification: _VerificationService["default"],
  gateway: _GatewayService["default"]
});