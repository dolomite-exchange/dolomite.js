import Service from '../../common/Service';

import Account from './Account';
import AuthToken from './Verification/AuthToken';
import SignatureData from './Verification/SignatureData';
import PrepareMessage from './Verification/PrepareMessage';

import VerificationService from './Verification/VerificationService';
import GatewayService from './Gateway/GatewayService';

export default class AccountService extends Service {

  static routes = {
    create: { 
      post: '/v1/accounts/create',
      prepare: '/v1/accounts/create/prepare/:address',
    },
    login: {
      post: '/v1/accounts/:account_id/login'
    },
  };

  static exports = {
    Account,
    ...VerificationService.exports, // sub-services cannot export directly
    ...GatewayService.exports,
  };

  static services = {
    verification: VerificationService,
    gateway: GatewayService
  };

  /////////////////////////

  // ----------------------------------------------
  // Login

  getLoginSignatureData() {
    const AccountLogin = [{ name: "verificationCode", type: "string" }]; // the timestamp in milli
    const timestamp = Date.now();
    const data = SignatureData('AccountLogin', AccountLogin, {
      verificationCode: `${timestamp}`
    });
    data.timestamp = timestamp;
    return data;
  }

  login({ accountId, address, signature, timestamp }) {
    return this.post('login', {
      account_id: accountId,
      wallet_address: address,
      auth_signature: signature,
      timestamp: timestamp
    }).then(body => new AuthToken(body.data));
  }

  // ----------------------------------------------
  // Create Account

  prepareCreateAccount({ address }) {
    return this.prepare('create', { address })
      .then(body => new PrepareMessage(body.data));
  }

  createAccount({ firstName, lastName, email, dateOfBirth, address, signature, prepareId, subscribedToMarketing }) {
    return this.post('create', {
      first_name: firstName,
      last_name: lastName,
      email: email,
      date_of_birth: dateOfBirth,
      wallet_address: address,
      auth_signature: signature,
      prepare_id: prepareId,
      is_subscribed_to_marketing: subscribedToMarketing
    }).then(body => new AuthToken(body.data));
  }
}
