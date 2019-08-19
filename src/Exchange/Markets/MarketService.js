import Service from '../../common/Service';
import WSWrapper from '../../common/websockets/WSWrapper';

import Market from './Market';
import ChartHistory, { ChartingBar } from './ChartHistory';

export default class MarketService extends Service {

  static routes = {
    markets: {
      get: '/v1/markets'
    }
  };

  static exports = {
    Market,
    ChartHistory,
    ChartingBar
  };

  /////////////////////////

  // ----------------------------------------------
  // Markets

  getAll(period = Market.Period.ONE_DAY) {
    return this.get('markets', { period })
      .then(body => Market.hydrate(body.data, body.global_objects));
  }

  watch() {
    return this.send('/v1/markets', 'subscribe');
  }

  onUpdate(callback) {
    this.on('/v1/markets', 'update')
      // .build(data => Market.build(data)) // TODO: Implement this correctly when updated
      .then(callback);
  }

  onUpdateAll(callback) {
    this.on('/v1/markets', 'update')
      .then(() => this.getAll().then(markets => callback(markets)));
  }

  // ----------------------------------------------
  // Market Chart

  watchChart(market, interval, base = 'CRYPTO') {
    return this.send('/v1/candlesticks/-market-', 'subscribe', {
      market: market,
      interval: interval,
      base_symbol: base
    });
  }

  requestChartHistory({ interval, market, fromTimestamp, toTimestamp, baseCurrency = 'CRYPTO' }) {
    return this.send('/v1/candlesticks/-market-', 'get_history_request', {
      market: market,
      interval: interval,
      from_timestamp: fromTimestamp,
      to_timestamp: toTimestamp,
      base_symbol: baseCurrency
    });
  }

  onChartHistoryResponse(callback) {
    this.on('/v1/candlesticks/-market-', 'get_history_response')
      .build(data => new ChartHistory(data))
      .then(callback);
  }

  onChartUpdate(callback) {
    this.on('/v1/candlesticks/-market-', 'update')
      .build(data => ChartingBar.build(data))
      .then(callback);
  }
}
