import BigNumber from '../../common/BigNumber';
import Period from './Period';

const toPercent = (p) => parseFloat(((p || 0) * 100).toFixed(2));

/*
 * Portfolio Info object
 */
export default class Portfolio {
  constructor({ owner_address, portfolio_period, currency, current_value, amount_change_value, percent_change }) {
    this.address = owner_address;
    this.period = portfolio_period;
    this.currentValue = new BigNumber(current_value);
    this.amountChange = new BigNumber(amount_change_value);
    this.percentChange = toPercent(percent_change);
  }
}

Portfolio.Period = Period;
Portfolio.Periods = Object.values(Period);
