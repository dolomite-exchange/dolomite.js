import BigNumber from '../../common/BigNumber';

/*
 * Details of an account
 */
export default class Account {
  constructor({ account_gateway_status, current_verification_tier_number, 
    dolomite_account_id, failed_upgrading_to_verification_tier_number, 
    limits, upgrading_to_verification_tier_number, is_fiat_gateway_available, wallet }) {
    
    const { 
      daily_filled_trade_amount_usd,
      daily_max_trade_amount_usd,
      daily_used_trade_amount_usd,
      open_trade_amount_usd 
    } = limits;

    const {
      deposit_wallet_address,
      is_smart_wallet_address,
      wallet_address,
      wallet_type
    } = wallet || {};

    this.id = dolomite_account_id;
    this.address = wallet_address;
    this.depositAddress = deposit_wallet_address;
    this.addresses = [wallet_address];
    this.isSmartWallet = is_smart_wallet_address;
    this.walletType = wallet_type
    this.isResidenceSupported = true; //is_residence_in_supported_region;
    this.isFiatGatewayAvailable = is_fiat_gateway_available;

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
