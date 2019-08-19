"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _BigNumber = _interopRequireDefault(require("../../common/BigNumber"));

var _Period = _interopRequireDefault(require("./Period"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var toPercent = function toPercent(p) {
  return parseFloat(((p || 0) * 100).toFixed(2));
};
/*
 * Portfolio Info object
 */


var Portfolio = function Portfolio(_ref) {
  var owner_address = _ref.owner_address,
      portfolio_period = _ref.portfolio_period,
      currency = _ref.currency,
      current_value = _ref.current_value,
      amount_change_value = _ref.amount_change_value,
      percent_change = _ref.percent_change;

  _classCallCheck(this, Portfolio);

  this.address = owner_address;
  this.period = portfolio_period;
  this.currentValue = new _BigNumber["default"](current_value);
  this.amountChange = new _BigNumber["default"](amount_change_value);
  this.percentChange = toPercent(percent_change);
};

exports["default"] = Portfolio;
Portfolio.Period = _Period["default"];
Portfolio.Periods = Object.values(_Period["default"]);