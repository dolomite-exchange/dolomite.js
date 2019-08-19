import BigNumber from '../../common/BigNumber';

/*
 * Details of an account
 */
export default class Account {
  constructor({ account_gateway_status, current_verification_tier_number, 
    dolomite_account_id, failed_upgrading_to_verification_tier_number, 
    limits, upgrading_to_verification_tier_number, wallet_addresses }) {
    
    const { 
      daily_filled_trade_amount_usd,
      daily_max_trade_amount_usd,
      daily_used_trade_amount_usd,
      open_trade_amount_usd 
    } = limits;

    this.id = dolomite_account_id;
    this.address = wallet_addresses[0];
    this.addresses = wallet_addresses;
    this.isResidenceSupported = true; //is_residence_in_supported_region;
    
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
