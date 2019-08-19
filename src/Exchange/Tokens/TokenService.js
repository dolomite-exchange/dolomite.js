import Service from '../../common/Service';
import Token from './Token';

export default class TokenService extends Service {

  static routes = {
    tokens: {
      get: '/v1/tokens'
    },
    token: { 
      get: '/v1/tokens/:ticker'
    }
  };

  static exports = {
    Token
  };

  /////////////////////////

  getAll() {
    return this.pageable('tokens')
      .build((data) => Token.build(data))
      .get();
  }

  getInfo(tokenTicker) {
    return this.get('token', { ticker: tokenTicker })
      .then(body => new Token(body.data));
  }
}
