"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _BigNumber = _interopRequireDefault(require("../../common/BigNumber"));

var _Token = _interopRequireDefault(require("../Tokens/Token"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Balances, Committed amount & Allowances for different tokens
 */
var Balance =
/*#__PURE__*/
function () {
  function Balance(_ref) {
    var _this = this;

    var asset = _ref.asset,
        token = _ref.token,
        balance = _ref.balance,
        committed = _ref.committed,
        allowance = _ref.allowance;

    _classCallCheck(this, Balance);

    this.balance = new _BigNumber["default"](balance);
    this.committed = new _BigNumber["default"](committed);
    this.allowance = new _BigNumber["default"](allowance);
    this.available = this.balance.dup.calc(function (val) {
      return val - _this.committed.value;
    });
    this.token = new _Token["default"](token);
    this.asset = this.token;
  }

  _createClass(Balance, null, [{
    key: "build",
    value: function build(balancesAsMap) {
      var built = {};
      Object.keys(balancesAsMap).forEach(function (ticker) {
        built[ticker] = new Balance(balancesAsMap[ticker]);
      });
      return built;
    }
  }, {
    key: "hydrate",
    value: function hydrate(balancesAsMap, globals) {
      var tokens = globals.tokens || {};
      var hydrated = {};
      Object.keys(balancesAsMap).forEach(function (ticker) {
        hydrated[ticker] = _objectSpread({}, balancesAsMap[ticker], {
          token: tokens[ticker]
        });
      });
      return Balance.build(hydrated);
    }
  }]);

  return Balance;
}();

exports["default"] = Balance;