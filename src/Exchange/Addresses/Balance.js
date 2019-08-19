import BigNumber from '../../common/BigNumber';
import Token from '../Tokens/Token';

/*
 * Balances, Committed amount & Allowances for different tokens
 */
export default class Balance {
  constructor({ asset, token, balance, committed, allowance }) {
    this.balance = new BigNumber(balance);
    this.committed = new BigNumber(committed);
    this.allowance = new BigNumber(allowance);
    this.available = this.balance.dup.calc(val => val - this.committed.value);
    this.token = new Token(token);
    this.asset = this.token;
  }

  static build(balancesAsMap) {
    const built = {};

    Object.keys(balancesAsMap).forEach((ticker) => {
      built[ticker] = new Balance(balancesAsMap[ticker]);
    });

    return built;
  }

  static hydrate(balancesAsMap, globals) {
    const tokens = globals.tokens || {};
    const hydrated = {};

    Object.keys(balancesAsMap).forEach((ticker) => {
      hydrated[ticker] = {
        ...balancesAsMap[ticker],
        token: tokens[ticker]
      };
    });

    return Balance.build(hydrated);
  }
}
