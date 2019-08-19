import Service from '../../common/Service';
import Transfer from './Transfer';

const asString = (o, grab) => (!o || typeof o === 'string' || o instanceof String) ? o : grab(o);

export default class ActivityService extends Service {

  static routes = {
    transfers: {
      get: '/v1/wallets/:address/events'
    },
    tokenTransfers: {
      get: '/v1/wallets/:address/events/:token'
    }
  };

  static exports = {
    Transfer
  };

  /////////////////////////

  getTransfers(address, options = {}) {    
    const token = asString(options.token, (t) => t.contractAddress || t.ticker);

    return this.pageable('transfers')
      .build(data => Transfer.build(data, address))
      .get(options, { address, token });
  }

  getTokenTransfers(address, options = {}) {
    const token = asString(options.token, (t) => t.contractAddress || t.ticker);

    return this.pageable('tokenTransfers')
      .build(data => Transfer.build(data, address))
      .get(options, { address, token });
  }

  watchTransfers(address) {
    this.watchedTransferAddress = address;

    return this.send('/v1/wallets/-address-/events', 'subscribe', {
      address: address
    });
  }

  onTransferUpdate(callback) {
    this.on('/v1/wallets/-address-/events', 'insert')
      .build(data => Transfer.build(data, this.watchedTransferAddress))
      .then(callback);
  }
}
