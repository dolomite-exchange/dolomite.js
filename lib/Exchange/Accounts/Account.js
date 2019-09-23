"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginRequest = exports["default"] = exports.FiatProvider = exports.VerificationState = void 0;

var _BigNumber = _interopRequireDefault(require("../../common/BigNumber"));

var _Enum = _interopRequireDefault(require("../../common/Enum"));

var _AuthToken = _interopRequireDefault(require("./Verification/AuthToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var VerificationState = _Enum["default"].create('VERIFY_EMAIL', 'UPGRADE_TO_TIER_2', 'UPGRADE_TO_TIER_3_WYRE_NATIVE', 'UPGRADE_TO_TIER_3_WYRE_EXTERNAL', 'FAILED_UPGRADE_TO_TIER_3_WYRE_EXTERNAL', 'UPGRADE_TO_TIER_3_BLOCKED', 'UPGRADE_AWAITING_EXTERNAL_WYRE_ACTION', 'UPGRADING_TO_TIER_3', 'UPGRADE_TO_TIER_4', 'UPGRADING_TO_TIER_4', 'ACCOUNT_REJECTED', 'FINISHED');

exports.VerificationState = VerificationState;

var FiatProvider = _Enum["default"].create('NATIVE_WYRE', 'EXTERNAL_WYRE');

exports.FiatProvider = FiatProvider;

var hasNonNullValue = function hasNonNullValue(mapping) {
  return Object.values(mapping).some(function (val) {
    return !!val;
  });
};
/*
 * Details of an account
 */


var Account =
/*#__PURE__*/
function () {
  function Account(_ref) {
    var _this$fiatProviderHas;

    var dolomite_account_id = _ref.dolomite_account_id,
        wallet = _ref.wallet,
        limits = _ref.limits,
        account_metadata = _ref.account_metadata,
        current_verification_tier_number = _ref.current_verification_tier_number,
        upgrading_to_verification_tier_number = _ref.upgrading_to_verification_tier_number,
        account_gateway_status = _ref.account_gateway_status,
        failed_upgrading_to_verification_tier_number = _ref.failed_upgrading_to_verification_tier_number,
        supported_fiat_providers = _ref.supported_fiat_providers,
        linked_fiat_providers = _ref.linked_fiat_providers;

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
        wallet_type = _ref2.wallet_type,
        broker_address = _ref2.broker_address;

    this.id = dolomite_account_id;
    this.address = wallet_address;
    this.addresses = [wallet_address];
    this.metadata = account_metadata || {};
    this.isSmartWallet = is_smart_wallet_address;
    this.depositAddress = deposit_wallet_address;
    this.isDepositContractCreated = is_deposit_contract_created;
    this.brokerAddress = broker_address;
    this.walletType = wallet_type;
    this.isManaged = wallet_type === 'MANAGED';
    this.approvalStatus = account_gateway_status;
    this.isResidenceSupported = true;
    this.supportedFiatProviders = supported_fiat_providers || [];
    this.linkedFiatProviders = linked_fiat_providers || [];
    this.fiatProviderHasError = (_this$fiatProviderHas = {}, _defineProperty(_this$fiatProviderHas, FiatProvider.NATIVE_WYRE, this.metadata.native_wyre && hasNonNullValue(this.metadata.native_wyre)), _defineProperty(_this$fiatProviderHas, FiatProvider.EXTERNAL_WYRE, this.metadata.external_wyre && hasNonNullValue(this.metadata.external_wyre)), _this$fiatProviderHas);
    this.isVerified = current_verification_tier_number > 0;
    this.tier = current_verification_tier_number;
    this.isUpgradingTier = !!upgrading_to_verification_tier_number;
    this.upgradingToTier = upgrading_to_verification_tier_number;
    this.failedUpgradingToTier = failed_upgrading_to_verification_tier_number;
    this.didFailUpgradingTier = !!failed_upgrading_to_verification_tier_number;
    this.dailyLimit = new _BigNumber["default"](daily_max_trade_amount_usd).amount;
    this.dailyUsage = new _BigNumber["default"](daily_used_trade_amount_usd).amount;
  }

  _createClass(Account, [{
    key: "verificationState",
    get: function get() {
      if (!this.isVerified && this.upgradingToTier === 1) {
        return VerificationState.VERIFY_EMAIL;
      } else if (this.tier === 1) {
        return VerificationState.UPGRADE_TO_TIER_2;
      } else if (this.tier === 2) {
        if (this.upgradingToTier === 3) {
          return VerificationState.UPGRADING_TO_TIER_3;
        }

        if (this.linkedFiatProviders.includes(FiatProvider.EXTERNAL_WYRE)) {
          return VerificationState.UPGRADE_AWAITING_EXTERNAL_WYRE_ACTION;
        }

        var isExternalWyreSupported = this.supportedFiatProviders.includes(FiatProvider.EXTERNAL_WYRE);
        var isNativeWyreSupported = this.supportedFiatProviders.includes(FiatProvider.NATIVE_WYRE);
        var externalWyreFailed = this.fiatProviderHasError[FiatProvider.EXTERNAL_WYRE];
        var nativeWyreFailed = this.fiatProviderHasError[FiatProvider.NATIVE_WYRE];

        if (isExternalWyreSupported && isNativeWyreSupported) {
          if (nativeWyreFailed) {
            if (externalWyreFailed) {
              return VerificationState.FAILED_UPGRADE_TO_TIER_3_WYRE_EXTERNAL;
            } else {
              return VerificationState.UPGRADE_TO_TIER_3_WYRE_EXTERNAL;
            }
          } else {
            return VerificationState.UPGRADE_TO_TIER_3_WYRE_NATIVE;
          }
        } // If only external is supported...


        if (isExternalWyreSupported) {
          if (externalWyreFailed) {
            return VerificationState.FAILED_UPGRADE_TO_TIER_3_WYRE_EXTERNAL;
          } else {
            return VerificationState.UPGRADE_TO_TIER_3_WYRE_EXTERNAL;
          }
        } // Otherwise only native is supported...


        if (isNativeWyreSupported && !nativeWyreFailed) {
          return VerificationState.UPGRADE_TO_TIER_3_WYRE_NATIVE;
        } // Or none of them are supported (or other conditions are not met)


        return VerificationState.UPGRADE_TO_TIER_3_BLOCKED;
      } else if (this.tier === 3) {
        if (this.upgradingToTier === 4) {
          return VerificationState.UPGRADING_TO_TIER_4;
        } else if (this.approvalStatus === 'REJECTED') {
          return VerificationState.ACCOUNT_REJECTED;
        } else if (this.linkedFiatProviders.includes(FiatProvider.EXTERNAL_WYRE)) {
          return VerificationState.UPGRADE_AWAITING_EXTERNAL_WYRE_ACTION;
        }

        return VerificationState.UPGRADE_TO_TIER_4;
      }

      return VerificationState.FINISHED;
    }
  }]);

  return Account;
}();

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