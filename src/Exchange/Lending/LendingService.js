import Service from '../../common/Service';
import Rate from './Rate';

export default class LendingService extends Service {

  static routes = {
    rates: {
      get: '/v1/margin-positions/interest-rates'
    }
  };

  static exports = {
    Rate
  };

  /////////////////////////

  getAll() {
    return this.get('rates')
      .then(body => Rate.hydrate(body.data, body.global_objects));
  }
}
