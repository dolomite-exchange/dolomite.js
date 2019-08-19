import BigNumber from '../../common/BigNumber';

/*
 * Details of a market graph bar
 */
export class ChartingBar {
  constructor({timestamp, close_price, open_price, period_high, period_low, volume}) {
    this.timestamp = parseFloat(timestamp);
    this.closePrice = new BigNumber(close_price);
    this.openPrice = new BigNumber(open_price);
    this.highPrice = new BigNumber(period_high);
    this.lowPrice = new BigNumber(period_low);
    this.volume = new BigNumber(volume);
  }

  static build(barArray) {
    return (barArray || []).map(barJson => new ChartingBar(barJson));
  }
}

ChartingBar.Interval = {
  _1m: '1m',
  _5m: '5m',
  _15m: '15m',
  _30m: '30m',
  _1h: '1h',
  _4h: '4h',
  _1d: '1d'
};

ChartingBar.Intervals = Object.values(ChartingBar.Interval);

/*
 * Chart History for market graph
 */
export default class ChartHistory extends Array {
  constructor({ trading_view_params, chart_objects }) {
    super();

    const data = ChartingBar.build(chart_objects);

    this.params = trading_view_params;
    this.push(...data);
  }
}
