import BigNumber from '../../common/BigNumber';

export default class Referral {
  constructor({referral_code, total_earned_amount, total_available_amount, is_withdrawal_in_progress}) {
    this.referralCode = referral_code;
    this.totalEarnedAmount = new BigNumber(total_earned_amount);
    this.totalAvailableAmount = new BigNumber(total_available_amount);
    this.isWithdrawalInProgress = is_withdrawal_in_progress;
  }
}
