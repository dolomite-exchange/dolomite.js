"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _BigNumber = _interopRequireDefault(require("../../common/BigNumber"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Referral = function Referral(_ref) {
  var referral_code = _ref.referral_code,
      total_earned_amount = _ref.total_earned_amount,
      total_available_amount = _ref.total_available_amount,
      is_withdrawal_in_progress = _ref.is_withdrawal_in_progress;

  _classCallCheck(this, Referral);

  this.referralCode = referral_code;
  this.totalEarnedAmount = new _BigNumber["default"](total_earned_amount);
  this.totalAvailableAmount = new _BigNumber["default"](total_available_amount);
  this.isWithdrawalInProgress = is_withdrawal_in_progress;
};

exports["default"] = Referral;