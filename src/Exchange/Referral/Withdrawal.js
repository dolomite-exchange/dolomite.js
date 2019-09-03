import BigNumber from "../../common/BigNumber";

export default class Withdrawal {
  constructor({wallet_address, withdrawal_amount, withdrawal_fee_amount, withdrawal_timestamp, 
    transaction_hash, block_number, withdrawal_status}) {
    this.walletAddress = wallet_address;
    this.withdrawalAmount = new BigNumber(withdrawal_amount);
    this.withdrawalFeeAmount = new BigNumber(withdrawal_fee_amount);
    this.withdrawalTimestamp = withdrawal_timestamp;
    this.transactionHash = transaction_hash;
    this.blockNumber = block_number;
    this.withdrawalStatus = withdrawal_status;
  }

  static build(withdrawalJsonArray) {
    return withdrawalJsonArray.map(withdrawalJson => new Withdrawal(withdrawalJson));
  }
}
