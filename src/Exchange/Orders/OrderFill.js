import BigNumber from '../../common/BigNumber';

/*
 * 
 */
export default class OrderFill {
  constructor({ creation_timestamp, dolomite_order_fill_id, fee_amount, fee_amount_usd,
    market, order_hash, order_side, is_taker, owner_address, primary_amount, primary_margin_split_amount,
    ring_hash, ring_id, ring_position_index, secondary_amount, secondary_margin_split_amount,
    transaction_hash, usd_amount }) {
    
    this.id = dolomite_order_fill_id;
    this.side = order_side;
    this.isTaker = is_taker;
    this.transactionHash = transaction_hash;
    this.ringHash = ring_hash;
    this.orderHash = order_hash;
    this.owner = owner_address;
    this.market = market;
    this.creationTime = new Date(parseInt(creation_timestamp));
    this.amount = new BigNumber(primary_amount);
    this.volume = new BigNumber(secondary_amount);
    this.primaryTickerAmount = new BigNumber(primary_amount);
    this.secondaryTickerAmount = new BigNumber(secondary_amount);
    this.amountUsd = usd_amount && new BigNumber(usd_amount);
    this.primaryMarginSplitAmount = new BigNumber(primary_margin_split_amount);
    this.secondaryMarginSplitAmount = new BigNumber(secondary_margin_split_amount);
    this.feeAmountUsd = fee_amount_usd && new BigNumber(fee_amount_usd);
    this.ringPositionIndex = ring_position_index;
    this.ringId = ring_id;
    this.ringHash = ring_hash
  }

  static build(fillsJsonArray) {
    return fillsJsonArray.map(fill => new OrderFill(fill));
  }
}


