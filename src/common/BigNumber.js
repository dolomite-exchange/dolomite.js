import BN from 'bn.js';
import * as Web3 from 'web3-utils';
const ZERO_RAW = { amount: 0, currency: { precision: 0, display_precision: 0 }};

/*
 * Used for numbers provided by the API in the format:
 * {
 *   amount: <int>
 *   currency: {
 *     ticker: <string>,
 *     precision: <int>,
 *     display_precision: <int>
 *   }
 * }
 */
export default class BigNumber {
  constructor(input) {
    let { amount, currency } = input || ZERO_RAW;

    const localeStringOptions = {
      useGrouping: false,
    }
    amount = typeof amount === 'string' ? amount : amount.toLocaleString('en-US', localeStringOptions)

    this.raw = { amount, currency };
    this.valueBN = !!amount ? new BN(amount) : new BN('0');
    this.value = typeof amount === 'string' ? Number.parseFloat(amount) : amount;
    this.valueString = typeof amount === 'number' ? amount.toLocaleString('en-US', localeStringOptions) : amount;
    this.currency = {
      ticker: currency.ticker,
      precision: currency.precision,
      displayPrecision: currency.display_precision
    };
    this.precision = this.currency.precision;
    this.amount = this.value / Math.pow(10, this.precision);
  }

  get dup() {
    return new BigNumber(this.raw);
  }

  modify(callback) {
    this.value = callback(this.value);
    this.amount = this.value / Math.pow(10, this.precision);
    return this;
  }

  calc(callback) {
    const dup = this.dup;
    dup.modify(callback);
    return dup;
  }

  static build(value, precision, ticker = null) {
    return new BigNumber({
      amount: value,
      currency: {
        precision: precision,
        display_precision: precision,
        ticker: ticker
      }
    });
  }

  static fromFloat(number, precision = null, ticker = null) {
    precision = precision || 18;
    const amountBN = new BN(Web3.toWei(number.toLocaleString('en-US', {useGrouping: false})));
    return BigNumber.build(amountBN.div(new BN(10).pow(new BN(18 - precision))).toString(10), precision, ticker);
  }

  static mapped(rawMap) {
    const map = {};
    Object.entries(rawMap).forEach(([key, val]) => { map[key] = new BigNumber(val) });
    return map;
  }
}
