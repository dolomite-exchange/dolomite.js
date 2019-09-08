import Service from '../../common/Service';
import WSWrapper from '../../common/websockets/WSWrapper';

import Account from '../Accounts/Account';
import Balance, { BalanceInfo } from './Balance';
import Order from '../Orders/Order';

export default class AddressService extends Service {

  static routes = {
    portfolio: {
      get: '/v1/addresses/:address/portfolio'
    },
    info: { 
      get: '/v1/addresses/:address/info'
    },
    orders: {
      get: '/v1/orders/addresses/:address'
    },
  };

  static exports = {
    Balance
  };

  /////////////////////////

  async watch(ownerAddress, brokerAddress) {
    if (this.watched && this.watched.ownerAddress !== ownerAddress) {
      await Promise.all([
        this.send('/v1/addresses/-address-/info', 'unsubscribe', { address: this.watched.ownerAddress }),
        this.send('/v1/orders/addresses/-address-', 'unsubscribe', { address: this.watched.ownerAddress }),
        this.send('/v1/orders/addresses/-address-/fills', 'unsubscribe', { address: this.watched.ownerAddress }),
        this.send('/v1/addresses/-address-/portfolio', 'unsubscribe', { 
          address: this.watched.ownerAddress,
          broker_address: this.watched.brokerAddress 
        })
      ]);
    }

    this.watched = { ownerAddress, brokerAddress };

    if (!ownerAddress) return new Promise((resolve) => resolve());
    
    return Promise.all([
      this.send('/v1/addresses/-address-/info', 'subscribe', { address: ownerAddress }),
      this.send('/v1/orders/addresses/-address-', 'subscribe', { address: ownerAddress }),
      this.send('/v1/orders/addresses/-address-/fills', 'subscribe', { address: ownerAddress }),
      this.send('/v1/addresses/-address-/portfolio', 'subscribe', { 
        address: ownerAddress,
        broker_address: brokerAddress 
      })
    ]);
  }

  // ----------------------------------------------
  // Portfolio

  getPortfolio(ownerAddress, brokerAddress) {
    return this.get('portfolio', { address: ownerAddress, broker_address: brokerAddress })
      .then(body => Balance.hydrate(body.data, body.global_objects));
  }

  onPortfolioUpdate(callback) {
    this.on('/v1/addresses/-address-/portfolio', 'update')
      .then(() => {
        this.getPortfolio(this.watched.ownerAddress, this.watched.brokerAddress)
          .then(portfolio => callback(portfolio))
      });

    // TODO: remove this when portfolio ws is more stable
    if (!this.portfolioWS) this.portfolioWS = new WSWrapper(() => {
      if (!this.watched.ownerAddress) return null;
      return this.getPortfolio(this.watched.ownerAddress, this.watched.brokerAddress); 
    }, 15); // update balances every 15s

    this.portfolioWS.subscribe(callback);
  }

  // ----------------------------------------------
  // Account

  getAccount(address) {
    return this.get('info', { address })
      .then(body => new Account(body.data));
  }

  onAccountUpdate(callback) {
    return this.on('/v1/addresses/-address-/info', 'update')
      .build(data => new Account(data))
      .then(callback)
  }

  // ----------------------------------------------
  // Orders

  getOrders(address, options = {}) {
    return this.get('orders', { address, ...options })
      .then(body => Order.hydrate(body.data, body.global_objects));
  }

  onOrdersUpdate(callback) {
    this.on('/v1/orders/addresses/-address-', 'update')
      .build(data => Order.build(data))
      .then(callback);
  }

  onOrdersFillingUpdate(callback) {
    this.on('/v1/orders/addresses/-address-/fills', 'update')
      .build(data => Order.build(data))
      .then(callback);
  }
}
