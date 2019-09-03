import jwt from 'jsonwebtoken';

class AuthToken {
  constructor(token) {
    this.token = token;
    this.decoded = jwt.decode(token);
  }

  get accountId() {
    return this.decoded.sub;
  }

  get expiration() {
    return this.decoded.exp;
  }

  isExpired() {
    return Date.now() > (this.expiration * 1000);
  }

  get hasWyreSession() {
    return this.decoded.encrypted_session && (Date.now() <= this.decoded.session_expiration);
  }
}

export default AuthToken;
