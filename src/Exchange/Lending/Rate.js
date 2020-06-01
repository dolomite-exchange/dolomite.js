
/*
 * Info for Lending Interest Rates
 */

export default class Rate {
  constructor({ticker, dydx_token_id, margin_supply_interest_rate, margin_borrow_interest_rate}) {

    this.ticker = ticker;
    this.dydxTokenId = dydx_token_id;
    this.supplyInterestRate = margin_supply_interest_rate;
    this.borrowInterestRate = margin_borrow_interest_rate;
  }

  static build(ratesAsJson) {
    return ratesAsJson.map(rateJson => new Rate(rateJson));
  }

  static hydrate(rateJsonArray, globals) {
    const tokens = globals.tokens || {};

    const rates = rateJsonArray.map(rate => {
      rate.token = tokens[rate.ticker];
      return rate;
    });

    return Rate.build(rates);
  }
}