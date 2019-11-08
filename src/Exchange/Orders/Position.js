import BigNumber from '../../common/BigNumber';
import Token from '../Tokens/Token';

const bigToFloat = (b) => b && (new BigNumber(b)).amount;

/*
 * Position model
 */
export default class Position {
  constructor({ dolomite_position_id, blockchain_position_id, owner_address, market, 
    margin_position_type, margin_position_status, held_token, actual_held_amount, 
    actual_borrow_amount, target_held_amount, target_borrow_amount, borrow_token, 
    expiration_timestamp, liquidated_withdrawable_amount, open_order_id, close_order_id, 
    open_price, open_timestamp, close_timestamp, creation_timestamp, open_transaction_hash, 
    close_transaction_hash, collateralization, position_value_usd_amount, position_value_change, 
    withdrawable_amount, actual_liquidation_price_amount, actual_leverage, actual_deposit_amount, 
    target_deposit_amount, deposit_token, target_liquidation_price_amount, target_leverage }) {

    this.id = dolomite_position_id;
    this.blockchainId = blockchain_position_id;
    this.owner = owner_address;
    this.market = market;
    this.type = margin_position_type;
    this.status = margin_position_status;
    this.heldToken = held_token && new Token(held_token);
    this.borrowToken = borrow_token && new Token(borrow_token);
    this.depositToken = deposit_token && new Token(deposit_token);
    this.heldAmount = new BigNumber(actual_held_amount);
    this.targetHeldAmount = new BigNumber(target_held_amount);
    this.borrowAmount = new BigNumber(actual_borrow_amount);
    this.targetBorrowAmount = new BigNumber(target_borrow_amount);
    this.depositAmount = new BigNumber(actual_deposit_amount);
    this.targetDepositAmount = new BigNumber(target_deposit_amount);

    const [primaryTicker, secondaryTicker] = this.market.split('-');
    this.primaryTicker = primaryTicker;
    this.secondaryTicker = secondaryTicker;

    this.positionTicker = this.type === 'LONG' ? primaryTicker : secondaryTicker;
    this.heldTicker = this.positionTicker;
    this.borrowTicker = this.type === 'LONG' ? secondaryTicker : primaryTicker;;

    this.targetPositionSize = this.type === 'LONG' 
      ? this.targetHeldAmount 
      : this.targetHeldAmount.calc(a => a - this.targetDepositAmount.value);
    this.actualPositionSize = this.type === 'LONG' 
      ? this.heldAmount 
      : this.heldAmount.calc(a => a - this.depositAmount.value);

    this.fillPercentage = (this.actualPositionSize.amount / this.targetPositionSize.amount) * 100;
    this.isPartial = this.actualPositionSize.amount > 0 && this.fillPercentage < 95;

    this.openPrice = bigToFloat(open_price);
    this.liquidationPrice = bigToFloat(actual_liquidation_price_amount);
    this.targetLiquidationPrice = bigToFloat(target_liquidation_price_amount);
   
    this.openTimestamp = open_timestamp;
    this.closeTimestamp = close_timestamp;
    this.expirationTimestamp = expiration_timestamp;
    this.remainingDays = Math.max(0, Math.ceil((expiration_timestamp - Date.now()) / 1000 / 60 / 60 / 24));
    this.lastActionTimestamp = close_timestamp || open_timestamp || creation_timestamp;

    this.collateralization = (collateralization || 0) * 100;
    
    this.leverage = parseFloat((Math.round((actual_leverage || target_leverage) * 4) / 4).toFixed(2));
    this.actualLeverage = actual_leverage;
    this.targetLeverage = target_leverage;

    this.withdrawableAmount = withdrawable_amount && new BigNumber(withdrawable_amount);
    this.positionValueUsd = position_value_usd_amount && new BigNumber(position_value_usd_amount);
    this.percentChange = isNaN(position_value_change) ? 0 : position_value_change * 100;

    this.openOrderId = open_order_id;
    this.closeOrderId = close_order_id;
    this.openTransactionHash = open_transaction_hash;
    this.closeTransactionHash = close_transaction_hash;
  }

  static build(positionArray) {
    return positionArray.map(orderJson => new Position(orderJson));
  }

  static hydrate(positionArray, globals) {
    const tokens = globals.tokens || {};

    const positionsWithTokens = positionArray.map(position => {
      const { held_token, borrow_token, deposit_token } = position;
      position.held_token = tokens[held_token] || {};
      position.borrow_token = tokens[borrow_token] || {};
      position.deposit_token = tokens[deposit_token] || {};
      return position;
    });

    return Position.build(positionsWithTokens);
  }
}

Position.Status = {
  PENDING: 'PENDING ',
  REJECTED: 'REJECTED',
  OPEN: 'OPEN',
  OPENING: 'OPENING',
  CLOSED: 'CLOSED',
  CLOSING: 'CLOSING',
  DOLOMITE_LIQUIDATED: 'DOLOMITE_LIQUIDATED',
  LIQUIDATED: 'LIQUIDATED',
  INVALIDATED: 'INVALIDATED'
};

Position.Type = {
  LONG: 'LONG',
  SHORT: 'SHORT'
};
