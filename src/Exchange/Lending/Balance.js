
/*
 * Info for deposited balances for an address in the Dolomite margin protocol
 */

export default class Balance {
  constructor({ticker, dydx_token_id, margin_supply_interest_rate, margin_borrow_interest_rate, token}) {

    this.ticker = ticker;
    this.dydxTokenId = dydx_token_id;
    this.supplyInterestRate = margin_supply_interest_rate;
    this.borrowInterestRate = margin_borrow_interest_rate;
    this.token = token;
  }

  static build(balancesAsJson) {
    return balancesAsJson.map(balanceJson => new Balance(balanceJson));
  }

  /*static hydrate(balanceJsonObject, globals) {
    const tokens = globals.tokens || {};

    const balances = balanceJsonArray.map(balance => {
      balance.token = tokens[balance.ticker];
      return balance;
    });

    return Balance.build(balances);
  }*/
}