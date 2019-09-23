import BigNumber from '../../common/BigNumber';
import Enum from '../../common/Enum';
import AuthToken from './Verification/AuthToken';

export const VerificationState = Enum.create(
  'VERIFY_EMAIL',
  'UPGRADE_TO_TIER_2',
  'UPGRADE_TO_TIER_3_WYRE_NATIVE',
  'UPGRADE_TO_TIER_3_WYRE_EXTERNAL',
  'FAILED_UPGRADE_TO_TIER_3_WYRE_EXTERNAL',
  'UPGRADE_TO_TIER_3_BLOCKED',
  'UPGRADE_AWAITING_EXTERNAL_WYRE_ACTION',
  'UPGRADING_TO_TIER_3',
  'UPGRADE_TO_TIER_4',
  'UPGRADING_TO_TIER_4',
  'ACCOUNT_REJECTED',
  'FINISHED'
);

export const FiatProvider = Enum.create('NATIVE_WYRE', 'EXTERNAL_WYRE');

const hasNonNullValue = (mapping) => Object.values(mapping).some(val => !!val);

/*
 * Details of an account
 */
export default class Account {
  
  constructor({ dolomite_account_id, wallet, limits, account_metadata,
    current_verification_tier_number, upgrading_to_verification_tier_number,
    account_gateway_status, failed_upgrading_to_verification_tier_number,
    supported_fiat_providers, linked_fiat_providers }) {
    
    const { 
      daily_filled_trade_amount_usd,
      daily_max_trade_amount_usd,
      daily_used_trade_amount_usd,
      open_trade_amount_usd 
    } = limits;

    const {
      deposit_wallet_address,
      is_smart_wallet_address,
      is_deposit_contract_created,
      wallet_address,
      wallet_type,
      broker_address
    } = wallet || {};

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
    this.fiatProviderHasError = {
      [FiatProvider.NATIVE_WYRE]: this.metadata.native_wyre && hasNonNullValue(this.metadata.native_wyre),
      [FiatProvider.EXTERNAL_WYRE]: this.metadata.external_wyre && hasNonNullValue(this.metadata.external_wyre),
    };

    this.isVerified = current_verification_tier_number > 0;
    this.tier = current_verification_tier_number;
    this.isUpgradingTier = !!upgrading_to_verification_tier_number;
    this.upgradingToTier = upgrading_to_verification_tier_number;
    this.failedUpgradingToTier = failed_upgrading_to_verification_tier_number;
    this.didFailUpgradingTier = !!failed_upgrading_to_verification_tier_number;
   
    this.dailyLimit = (new BigNumber(daily_max_trade_amount_usd)).amount;
    this.dailyUsage = (new BigNumber(daily_used_trade_amount_usd)).amount;
  }

  get verificationState() {
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

      const isExternalWyreSupported = this.supportedFiatProviders.includes(FiatProvider.EXTERNAL_WYRE);
      const isNativeWyreSupported = this.supportedFiatProviders.includes(FiatProvider.NATIVE_WYRE);
      const externalWyreFailed = this.fiatProviderHasError[FiatProvider.EXTERNAL_WYRE];
      const nativeWyreFailed = this.fiatProviderHasError[FiatProvider.NATIVE_WYRE];
      
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
      }

      // If only external is supported...
      if (isExternalWyreSupported) {
        if (externalWyreFailed) {
          return VerificationState.FAILED_UPGRADE_TO_TIER_3_WYRE_EXTERNAL;
        } else {
          return VerificationState.UPGRADE_TO_TIER_3_WYRE_EXTERNAL;
        }
      }

      // Otherwise only native is supported...
      if (isNativeWyreSupported && !nativeWyreFailed) {
        return VerificationState.UPGRADE_TO_TIER_3_WYRE_NATIVE;
      }

      // Or none of them are supported (or other conditions are not met)
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
}

export class LoginRequest {
  constructor({ token, is_2fa_required, verification_method }) {
    this.token = token && new AuthToken(token);
    this.verificationMethod = verification_method;
    this.is2FARequired = is_2fa_required;
  }
}














