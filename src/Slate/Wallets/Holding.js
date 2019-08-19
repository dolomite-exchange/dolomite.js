import BigNumber from '../../common/BigNumber';
import TokenSummary from '../Tokens/TokenSummary';

const toPercent = (p) => parseFloat(((p || 0) * 100).toFixed(2));

/*
 * Holding object
 */
export default class Holding {
  constructor({ owner_address, token_summary, balance, current_value, 
    amount_change_value, percent_change }) {

    this.address = owner_address;
    this.token = new TokenSummary(token_summary);
    this.balance = new BigNumber(balance);
    this.currentValue = new BigNumber(current_value);
    this.amountChange = new BigNumber(amount_change_value);
    this.percentChange = toPercent(percent_change);
  }

  static build(holdingJsonArray) {
    return holdingJsonArray.map(holdingJson => new Holding(holdingJson));
  }
}
