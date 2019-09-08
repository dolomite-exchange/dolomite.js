import BigNumber from '../../common/BigNumber';
import AuthToken from './Verification/AuthToken';

/*
 * Details of an account
 */
export default class Account {
  constructor({ account_gateway_status, current_verification_tier_number, 
    dolomite_account_id, failed_upgrading_to_verification_tier_number, 
    limits, upgrading_to_verification_tier_number, is_fiat_gateway_available, wallet,
    is_native_tier_3_supported, is_external_account_linked, is_external_account_tier_3_supported }) {
    
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
    this.depositAddress = deposit_wallet_address;
    this.isDepositContractCreated = is_deposit_contract_created;
    this.addresses = [wallet_address];
    this.isSmartWallet = is_smart_wallet_address;
    this.brokerAddress = broker_address;
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
    this.dailyLimit = (new BigNumber(daily_max_trade_amount_usd)).amount;
    this.dailyUsage = (new BigNumber(daily_used_trade_amount_usd)).amount;
  }
}

export class LoginRequest {
  constructor({ token, is_2fa_required, verification_method }) {
    this.token = token && new AuthToken(token);
    this.verificationMethod = verification_method;
    this.is2FARequired = is_2fa_required;
  }
}
