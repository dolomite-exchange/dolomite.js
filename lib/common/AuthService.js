"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Service2 = _interopRequireDefault(require("./Service"));

var _PrepareMessage = _interopRequireDefault(require("../Exchange/Accounts/Verification/PrepareMessage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DEFAULT_WYRE_OPTIONS = {
  addressKey: 'address',
  accountIdKey: 'account_id',
  signatureKey: 'auth_signature',
  prepareIdKey: 'prepare_id',
  prepareMessageKey: 'prepare_message',
  flatten: false
};
var activeAuthRequest;

var AuthService =
/*#__PURE__*/
function (_Service) {
  _inherits(AuthService, _Service);

  function AuthService() {
    _classCallCheck(this, AuthService);

    return _possibleConstructorReturn(this, _getPrototypeOf(AuthService).apply(this, arguments));
  }

  _createClass(AuthService, [{
    key: "getAuthToken",
    value: function getAuthToken() {
      return Promise.reject('getAuthToken not defined for service');
    }
  }, {
    key: "withAuth",
    value: function withAuth(method) {
      var _this = this;

      return function (resource, params) {
        var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        var callback = function callback() {
          return _this.getAuthToken().then(function (authToken) {
            activeAuthRequest = null;
            return method(resource, params, _objectSpread({}, headers, {
              Authorization: authToken
            }));
          });
        };

        if (activeAuthRequest) activeAuthRequest.then(callback);else activeAuthRequest = callback();
        return activeAuthRequest;
      };
    }
  }, {
    key: "withWyreAuth",
    value: function withWyreAuth(method, routeName, options, useWyreSession, authSignatureKey) {
      var _this2 = this;

      options = _objectSpread({}, DEFAULT_WYRE_OPTIONS, options);

      var getPrepareMessage = function getPrepareMessage(account_id, address) {
        return _this2.prepare(routeName, {
          account_id: account_id,
          address: address
        }).then(function (body) {
          return new _PrepareMessage["default"](body.data);
        });
      };

      return function (resource, params) {
        var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        var callback = function callback() {
          return _this2.getAuthToken(useWyreSession, getPrepareMessage).then(function (_ref) {
            var _ref2, _objectSpread2;

            var token = _ref.token,
                signature = _ref.signature,
                prepareMessage = _ref.prepareMessage,
                address = _ref.address,
                accountId = _ref.accountId;
            activeAuthRequest = null;
            signature = signature && options.flatten ? signature.signature : signature;
            var authSigParams = token ? {} : (_ref2 = {}, _defineProperty(_ref2, options.signatureKey, signature), _defineProperty(_ref2, options.prepareIdKey, prepareMessage && prepareMessage.id), _defineProperty(_ref2, options.prepareMessageKey, prepareMessage && prepareMessage.message), _ref2);
            var authSignatureObject = authSignatureKey ? {
              authSignatureKey: authSigParams
            } : authSigParams;
            return method(resource, _objectSpread((_objectSpread2 = {}, _defineProperty(_objectSpread2, options.addressKey, address), _defineProperty(_objectSpread2, options.accountIdKey, accountId), _objectSpread2), authSignatureObject, params), _objectSpread({}, headers, {
              Authorization: token
            }));
          });
        };

        if (activeAuthRequest) activeAuthRequest.then(callback);else activeAuthRequest = callback();
        return activeAuthRequest;
      };
    }
  }, {
    key: "requiresWyreSession",
    value: function requiresWyreSession(prepareRouteName) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var useWyreSession = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return {
        get: this.withWyreAuth(this.get.bind(this), prepareRouteName, options, useWyreSession, options.authSignatureKey),
        post: this.withWyreAuth(this.post.bind(this), prepareRouteName, options, useWyreSession, options.authSignatureKey),
        prepare: this.withWyreAuth(this.prepare.bind(this), prepareRouteName, options, useWyreSession, options.authSignatureKey)
      };
    }
  }, {
    key: "requiresAuth",
    get: function get() {
      return {
        get: this.withAuth(this.get.bind(this)),
        post: this.withAuth(this.post.bind(this)),
        prepare: this.withAuth(this.prepare.bind(this))
      };
    }
  }]);

  return AuthService;
}(_Service2["default"]);

var _default = AuthService;
exports["default"] = _default;