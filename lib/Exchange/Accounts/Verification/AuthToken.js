"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AuthToken =
/*#__PURE__*/
function () {
  function AuthToken(token) {
    _classCallCheck(this, AuthToken);

    this.token = token;
    this.decoded = _jsonwebtoken["default"].decode(token);
  }

  _createClass(AuthToken, [{
    key: "isExpired",
    value: function isExpired() {
      return Date.now() > this.expiration * 1000;
    }
  }, {
    key: "accountId",
    get: function get() {
      return this.decoded.sub;
    }
  }, {
    key: "expiration",
    get: function get() {
      return this.decoded.exp;
    }
  }, {
    key: "hasWyreSession",
    get: function get() {
      return this.decoded.encrypted_session && Date.now() <= this.decoded.session_expiration;
    }
  }]);

  return AuthToken;
}();

var _default = AuthToken;
exports["default"] = _default;