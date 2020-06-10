import Service from '../../common/Service';
import Rate from './Rate';
import Balance from './Balance';

export default class LendingService extends Service {

  static routes = {
    rates: {
      get: '/v1/margin-positions/interest-rates'
    },
    balances: {
      get: '/v1/margin-positions/addresses/:address/balances'
    }
  };

  static exports = {
    Rate,
    Balance
  };

  /////////////////////////

  getAll() {
    return this.get('rates')
      .then(body => Rate.hydrate(body.data, body.global_objects));
  }

  getBalances(address) {
    return this.get('balances', { address: address}).then(body => body.data);
  }
}
