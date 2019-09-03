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

  get wallet() {
    return (this.decoded.wallets || [])[0];
  }

  isExpired() {
    return Date.now() > (this.expiration * 1000);
  }

  get hasWyreSession() {
    return this.decoded.encrypted_session && (Date.now() <= this.decoded.session_expiration);
  }

  get accountDetails() {
    return {
      firstName: this.decoded.first_name,
      lastName: this.decoded.last_name,
      email: this.decoded.email,
      phoneNumber: this.decoded.phone_number,
      phoneExtension: this.decoded.extension_number,
    };
  }
}

export default AuthToken;
