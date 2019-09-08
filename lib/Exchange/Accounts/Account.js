"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginRequest = exports["default"] = void 0;

var _BigNumber = _interopRequireDefault(require("../../common/BigNumber"));

var _AuthToken = _interopRequireDefault(require("./Verification/AuthToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Details of an account
 */
var Account = function Account(_ref) {
  var account_gateway_status = _ref.account_gateway_status,
      current_verification_tier_number = _ref.current_verification_tier_number,
      dolomite_account_id = _ref.dolomite_account_id,
      failed_upgrading_to_verification_tier_number = _ref.failed_upgrading_to_verification_tier_number,
      limits = _ref.limits,
      upgrading_to_verification_tier_number = _ref.upgrading_to_verification_tier_number,
      is_fiat_gateway_available = _ref.is_fiat_gateway_available,
      wallet = _ref.wallet,
      is_native_tier_3_supported = _ref.is_native_tier_3_supported,
      is_external_account_linked = _ref.is_external_account_linked,
      is_external_account_tier_3_supported = _ref.is_external_account_tier_3_supported;

  _classCallCheck(this, Account);

  var daily_filled_trade_amount_usd = limits.daily_filled_trade_amount_usd,
      daily_max_trade_amount_usd = limits.daily_max_trade_amount_usd,
      daily_used_trade_amount_usd = limits.daily_used_trade_amount_usd,
      open_trade_amount_usd = limits.open_trade_amount_usd;

  var _ref2 = wallet || {},
      deposit_wallet_address = _ref2.deposit_wallet_address,
      is_smart_wallet_address = _ref2.is_smart_wallet_address,
      is_deposit_contract_created = _ref2.is_deposit_contract_created,
      wallet_address = _ref2.wallet_address,
      wallet_type = _ref2.wallet_type;

  this.id = dolomite_account_id;
  this.address = wallet_address;
  this.depositAddress = deposit_wallet_address;
  this.isDepositContractCreated = is_deposit_contract_created;
  this.addresses = [wallet_address];
  this.isSmartWallet = is_smart_wallet_address;
  this.walletType = wallet_type;
  this.isManaged = wallet_type === 'MANAGED';
  this.isResidenceSupported = true;
  this.isFiatGatewayAvailable = is_fiat_gateway_available;
  this.isNativeTier3Supported = is_native_tier_3_supported;
  this.isExternalLinkSupported = is_external_account_tier_3_supported;
  this.isWyreLinked = is_external_account_linked;
  this.approvalStatus = account_gateway_status;
  this.tier = current_verification_tier_number;
  this.isVerified = current_verification_tier_number > 0;
  this.isUpgradingTier = !!upgrading_to_verification_tier_number;
  this.upgradingToTier = upgrading_to_verification_tier_number;
  this.failedUpgradingToTier = failed_upgrading_to_verification_tier_number;
  this.didFailUpgradingTier = !!failed_upgrading_to_verification_tier_number;
  this.dailyLimit = new _BigNumber["default"](daily_max_trade_amount_usd).amount;
  this.dailyUsage = new _BigNumber["default"](daily_used_trade_amount_usd).amount;
};

exports["default"] = Account;

var LoginRequest = function LoginRequest(_ref3) {
  var token = _ref3.token,
      is_2fa_required = _ref3.is_2fa_required,
      verification_method = _ref3.verification_method;

  _classCallCheck(this, LoginRequest);

  this.token = token && new _AuthToken["default"](token);
  this.verificationMethod = verification_method;
  this.is2FARequired = is_2fa_required;
};

exports.LoginRequest = LoginRequest;