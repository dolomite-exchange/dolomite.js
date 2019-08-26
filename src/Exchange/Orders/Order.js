import BigNumber from '../../common/BigNumber';
import Token from '../Tokens/Token';

const toFillPercent = (dealt, total) => dealt.amount / total.amount;
const toOpenAmount = (dealt, total) => new BigNumber({
  ...total,
  amount: Math.max(total.amount - dealt.amount, 0)
});

/*
 * Order model
 */
export default class Order {
  constructor({ dolomite_order_id, order_hash, market, order_type, order_side, order_status,
    loopring_contract_address, loopring_delegate_address, fee_collecting_wallet_address,
    owner_address, auth_address, primary_amount, secondary_amount, usd_amount_at_creation,
    dealt_amount_primary, dealt_amount_secondary, placement_timestamp, expiration_timestamp, fee_amount,
    fee_usd_at_creation, fee_usd_average, exchange_more_than_amount, exchange_rate, ecdsa_signature,
    margin_split_percentage, proof_of_work_nonce, primary_token, secondary_token, close_timestamp,
    usd_amount_at_close, usd_fee_at_creation, usd_fee_at_close, market_order_effective_price}) {
    
    this.id = dolomite_order_id;
    this.orderHash = order_hash;
    this.loopringContractAddress = loopring_contract_address;
    this.loopringDelegateAddress = loopring_delegate_address;
    this.walletAddress = fee_collecting_wallet_address;
    this.owner = owner_address;
    this.authAddress = auth_address;
    this.type = order_type;
    this.side = order_side;
    this.market = market;
    this.primaryToken = primary_token && new Token(primary_token);
    this.secondaryToken = secondary_token && new Token(secondary_token);
    this.status = order_status;
    this.amount = new BigNumber(primary_amount);
    this.volume = new BigNumber(secondary_amount);
    const marketOrderPrice = market_order_effective_price && new BigNumber(market_order_effective_price);
    this.price = marketOrderPrice ? marketOrderPrice.amount : exchange_rate;
    this.dealtAmountPrimary = new BigNumber(dealt_amount_primary);
    this.dealtAmountSecondary = new BigNumber(dealt_amount_secondary);
    this.openAmountPrimary = toOpenAmount(dealt_amount_primary, primary_amount);
    this.openAmountSecondary = toOpenAmount(dealt_amount_secondary, secondary_amount);
    this.fillPercent = toFillPercent(this.dealtAmountPrimary, this.amount);
    this.fiatPriceTotal = new BigNumber(usd_amount_at_creation);
    this.orderFee = new BigNumber(fee_amount);
    this.orderFeeUSD = fee_usd_at_creation && new BigNumber(fee_usd_at_creation);
    this.orderFeePaidUSD = new BigNumber(fee_usd_average);
    this.exchangeMoreThanAmount = Boolean(exchange_more_than_amount);
    this.marginSplitPercentage = margin_split_percentage;
    this.v = ecdsa_signature.v;
    this.r = ecdsa_signature.r;
    this.S = ecdsa_signature.s;
    this.nonce = proof_of_work_nonce;
    this.creationTime = new Date(parseInt(placement_timestamp));
    this.creationTimestamp = parseInt(placement_timestamp);
    this.expirationTime = expiration_timestamp && new Date(parseInt(expiration_timestamp));
    this.closeTimestamp = close_timestamp && new Date(close_timestamp);
    this.usdAmountAtClose = usd_amount_at_close && new BigNumber(usd_amount_at_close);
    this.usdFeeAtCreation = usd_fee_at_creation && new BigNumber(usd_fee_at_creation);
    this.usdFeeAtClose = usd_fee_at_close && new BigNumber(usd_fee_at_close);

    // Deprecated
    this.dolomiteOrderHash = dolomite_order_id;
    this.loopringOrderHash = order_hash;
    this.protocol = loopring_contract_address;
    this.delegateAddress = loopring_delegate_address;
  }

  static build(orderArray) {
    return orderArray.map(orderJson => new Order(orderJson));
  }

  static hydrate(orderArray, globals) {
    const tokens = globals.tokens || {};

    const ordersWithTokens = orderArray.map(order => {
      const [primaryTicker, secondaryTicker] = order.market.split('-');
      order.primary_token = tokens[primaryTicker] || {};
      order.secondary_token = tokens[secondaryTicker] || {};
      return order;
    });

    return Order.build(ordersWithTokens);
  }
}

Order.Status = {
  OPEN: 'OPEN',
  PROCESSING: 'PROCESSING',
  FILLING: 'FILLING',
  FILLED: 'FILLED',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED',
  CANCELLING: 'CANCELLING',
  REJECTED: 'REJECTED'
};

Order.Type = {
  LIMIT: 'LIMIT',
};

Order.Side = {
  BUY: 'BUY',
  SELL: 'SELL'
};

Order.Statuses = Object.values(Order.Status);
Order.Types = Object.values(Order.Type);
Order.Sides = Object.values(Order.Side);
