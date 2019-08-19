import Package from '../common/Package';

import MarketService from './Markets/MarketService';
import AddressService from './Addresses/AddressService';
import ExchangeService from './Exchange/ExchangeService';
import TokenService from './Tokens/TokenService';
import OrderService from './Orders/OrderService';
import AccountService from './Accounts/AccountService';
import ReferralService from './Referral/ReferralService';

const EXCHANGE_API_URL = 'https://exchange-api.dolomite.io';
const EXCHANGE_WEBSOCKET_URL = 'wss://exchange-api.dolomite.io/ws-connect';

/*
 * 
 */
class Exchange extends Package {
  constructor() {
    super({
      url: EXCHANGE_API_URL,
      websocketUrl: EXCHANGE_WEBSOCKET_URL,
      services: {
        markets: MarketService,
        addresses: AddressService,
        exchange: ExchangeService,
        tokens: TokenService,
        orders: OrderService,
        accounts: AccountService,
        referral: ReferralService
      }
    });
  }

  // ----------------------------------------------
  // Higher Level API Endpoints
  // - Avoids `exchange.exchange.getRates`, `exchange.getRates` is much cleaner :)

  watchRates() {
    return this.exchange.watchRates();
  }

  onRatesChange(callback) {
    return this.exchange.onRatesChange(callback);
  }

  watchGasPrice() {
    return this.exchange.watchGasPrice();
  }

  onGasPriceUpdate(callback) {
    return this.exchange.onGasPriceUpdate(callback);
  }

  getInfo() {
    return this.exchange.getInfo();
  }

  isUnsupportedRegion() {
    return this.exchange.isUnsupportedRegion();
  }

  getRates() {
    return this.exchange.getRates();
  }

  getCurrentGasPrice() {
    return this.exchange.getCurrentGasPrice();
  }
}


const exchange = new Exchange();
export default exchange;
