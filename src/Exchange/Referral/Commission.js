import BigNumber from "../../common/BigNumber";

export default class Commission {
  constructor({referrer_address, dolomite_order_fill_id, commission_amount, block_number, 
    block_timestamp, transaction_hash, eth_commission_amount}) {
    this.referrerAddress = referrer_address;
    this.dolomiteOrderFillId = dolomite_order_fill_id;
    this.commissionAmount = new BigNumber(commission_amount);
    this.blockNumber = block_number;
    this.blockTimestamp = block_timestamp;
    this.transactionHash = transaction_hash;
    this.ethCommissionAmount = new BigNumber(eth_commission_amount);
  }

  static build(commissionJsonArray) {
    return commissionJsonArray.map(commissionJson => new Commission(commissionJson));
  }
}