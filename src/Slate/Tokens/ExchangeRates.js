
class Rate {
  constructor({ quote }) {
    Object.keys(quote).forEach(baseTicker => {
      this[baseTicker] = quote[baseTicker].exchange_rate;
    })
  }
}

export default class ExchangeRates {
  constructor(rates) {
    Object.keys(rates).forEach(dolomiteId => {
      this[dolomiteId] = new Rate(rates[dolomiteId]);;
    });
  }

  from(amount, dolomiteId) {
    const to = (baseTicker) => {
      const token = this[dolomiteId] || {};
      const rate = token[baseTicker];
      if (!rate) return null;
      return rate * amount;
    };

    return { to };
  }

  fromBase(amount, baseTicker) {
    const to = (dolomiteId) => {
      const token = this[dolomiteId] || {};
      const rate = token[baseTicker];
      if (!rate) return null;
      return amount / rate;
    };

    return { to };
  }
}
