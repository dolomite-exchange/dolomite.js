"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _BigNumber = _interopRequireDefault(require("../../common/BigNumber"));

var _TokenSummary = _interopRequireDefault(require("../Tokens/TokenSummary"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var toPercent = function toPercent(p) {
  return parseFloat(((p || 0) * 100).toFixed(2));
};
/*
 * Holding object
 */


var Holding = /*#__PURE__*/function () {
  function Holding(_ref) {
    var owner_address = _ref.owner_address,
        token_summary = _ref.token_summary,
        balance = _ref.balance,
        current_value = _ref.current_value,
        amount_change_value = _ref.amount_change_value,
        percent_change = _ref.percent_change;

    _classCallCheck(this, Holding);

    this.address = owner_address;
    this.token = new _TokenSummary["default"](token_summary);
    this.balance = new _BigNumber["default"](balance);
    this.currentValue = new _BigNumber["default"](current_value);
    this.amountChange = new _BigNumber["default"](amount_change_value);
    this.percentChange = toPercent(percent_change);
  }

  _createClass(Holding, null, [{
    key: "build",
    value: function build(holdingJsonArray) {
      return holdingJsonArray.map(function (holdingJson) {
        return new Holding(holdingJson);
      });
    }
  }]);

  return Holding;
}();

exports["default"] = Holding;