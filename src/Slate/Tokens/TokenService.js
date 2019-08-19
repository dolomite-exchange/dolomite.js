import Service from '../../common/Service';
import TokenSummary from './TokenSummary';
import TokenDetails from './TokenDetails';
import ExchangeRates from './ExchangeRates';

/*
 * Service for the Token resource in the
 * Market API.
 */
export default class TokenService extends Service {

  static routes = {
    currencies: {
      get: '/currencies'
    },
    rates: {
      get: '/v1/assets/rates/latest'
    },
    search: {
      get: '/v1/assets/search?token_types=ERC20&token_types=ETH'
    },
    details: {
      get: '/v1/assets/:identifier'
    },
  };

  static exports = {
    Token: TokenSummary
  };

  /////////////////////////

  getAll(term = '', sort = 'HIGHEST_MARKET_CAP', options = {}) {
    return this.pageable('search')
      .build((data) => TokenDetails.build(data))
      .get(options, {
        sort_order: sort,
        search_term: term
      });
  }

  getDetails(identifier) {
    return this.get('details', { identifier: identifier })
      .then(body => new TokenDetails(body.data));
  }

  getExchangeRates() {
    return this.get('rates')
      .then(body => new ExchangeRates(body.data));
  }

  watchExchangeRates() {
    return this.send('/v1/assets/rates/latest', 'subscribe');
  }

  onExchangeRatesUpdate(callback) {
    this.on('/v1/assets/rates/latest', 'update')
      .build(data => new ExchangeRates(data))
      .then(callback);
  }
}
