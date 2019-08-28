import Service from '../../common/Service';
import BigNumber from '../../common/BigNumber';
import WSWrapper from '../../common/websockets/WSWrapper';

import ExchangeInfo from './ExchangeInfo';
import ExchangeRates from './ExchangeRates';

export default class ExchangeService extends Service {

  static routes = {
    info: {
      get: '/v1/info'
    },
    rates: {
      get: '/v1/tokens/rates/latest'
    },
    metrics: {
      get: '/exchange/metrics'
    },
    gasPrice: {
      get: '/v1/estimate-gas'
    },
    unsupportedRegion: {
      get: '/v1/kyc/is-unsupported-region'
    }
  };

  static exports = {
    ExchangeInfo,
    ExchangeRates
  };

  /////////////////////////

  getInfo() {
    return this.get('info')
      .then(body => new ExchangeInfo(body.data));
  }

  onUpdateInfo(callback) {
    if (!this.infoWS) this.infoWS = new WSWrapper(() => {
      return this.getInfo(); 
    }, 30); // update exchange info every 30s

    this.infoWS.subscribe(callback);
  }

  isUnsupportedRegion() {
    return this.get('unsupportedRegion').then(body => body.data);
  }

  // ----------------------------------------------
  // Exchange Rates

  getRates() {
    return this.get('rates')
      .then(body => new ExchangeRates(body.data));
  }

  watchRates() {
    return this.send('/v1/tokens/rates/latest', 'subscribe');
  }

  onRatesChange(callback) {
    return this.on('/v1/tokens/rates/latest', 'update')
      .build(data => new ExchangeRates(data))
      .then(callback);
  }

  // ----------------------------------------------
  // Gas Price Estimates

  getCurrentGasPrice() {
    return this.get('gasPrice')
      .then(body => BigNumber.build(body.data.fast.amount, body.data.fast.unit.precision));
  }

  watchGasPrice() {
    return this.send('/v1/estimate-gas', 'subscribe');
  }

  onGasPriceUpdate(callback) {
    this.on('/v1/estimate-gas', 'update')
      .build(data => BigNumber.build(data.fast.amount, data.fast.unit.precision))
      .then(callback);
  }
}
