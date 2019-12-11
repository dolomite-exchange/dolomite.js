"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Package2 = _interopRequireDefault(require("../common/Package"));

var _WalletService = _interopRequireDefault(require("./Wallets/WalletService"));

var _ActivityService = _interopRequireDefault(require("./Activity/ActivityService"));

var _TokenService = _interopRequireDefault(require("./Tokens/TokenService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SLATE_API_URL = 'https://slate-api.dolomite.io';
var SLATE_WEBSOCKET_URL = 'wss://slate-api.dolomite.io/ws-connect';
/*
 * 
 */

var Slate =
/*#__PURE__*/
function (_Package) {
  _inherits(Slate, _Package);

  function Slate() {
    _classCallCheck(this, Slate);

    return _possibleConstructorReturn(this, _getPrototypeOf(Slate).call(this, {
      url: SLATE_API_URL,
      websocketUrl: SLATE_WEBSOCKET_URL,
      services: {
        wallets: _WalletService["default"],
        activity: _ActivityService["default"],
        tokens: _TokenService["default"]
      }
    }));
  }

  return Slate;
}(_Package2["default"]);

var slate = new Slate();
var _default = slate;
exports["default"] = _default;