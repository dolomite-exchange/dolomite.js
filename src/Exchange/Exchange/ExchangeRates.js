
class Rate {
  constructor({ quote }) {
    Object.keys(quote).forEach(baseTicker => {
      this[baseTicker] = quote[baseTicker].exchange_rate;
    })
  }
}

export default class ExchangeRates {
  constructor(rates) {
    Object.keys(rates).forEach(ticker => {
      this[ticker] = new Rate(rates[ticker]);;
    });
  }

  from(amount, ticker) {
    const to = (baseTicker) => {
      const token = this[ticker] || {};
      const rate = token[baseTicker];
      if (!rate) return null;
      return rate * amount;
    };

    const toBaseThenTo = (baseTicker, ticker) => {
      const baseAmount = to(baseTicker);
      return this.fromBase(baseAmount, baseTicker).to(ticker);
    }

    return { to, toBaseThenTo };
  }

  fromBase(amount, baseTicker) {
    const to = (ticker) => {
      const token = this[ticker] || {};
      const rate = token[baseTicker];
      if (!rate) return null;
      return amount / rate;
    };

    return { to };
  }
}
