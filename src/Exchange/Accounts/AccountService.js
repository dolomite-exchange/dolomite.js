import Service from '../../common/Service';

import Account, { LoginRequest, VerificationState } from './Account';
import AuthToken from './Verification/AuthToken';
import SignatureData from './Verification/SignatureData';
import PrepareMessage from './Verification/PrepareMessage';

import VerificationService from './Verification/VerificationService';
import GatewayService from './Gateway/GatewayService';
import SmartWalletService from './SmartWallet/SmartWalletService';

export default class AccountService extends Service {

  static routes = {
    create: { 
      post: '/v1/accounts/create',
      prepare: '/v1/accounts/create/prepare/:address',
    },
    createInternational: {
      post: '/v1/accounts/create-international'
    },
    signatureLogin: {
      post: '/v1/accounts/login/signature'
    },
    login: {
      post: '/v1/accounts/login'
    },
    confirmLogin: {
      post:  '/v1/accounts/login/confirm'
    },
    reauth: {
      post: '/v1/accounts/reauth'
    },
  };

  static exports = {
    Account,
    VerificationState,
    ...VerificationService.exports, // sub-services cannot export directly
    ...GatewayService.exports,
    ...SmartWalletService.exports,
  };

  static services = {
    verification: VerificationService,
    gateway: GatewayService,
    smartWallet: SmartWalletService,
  };

  /////////////////////////

  async watch(accountId) {
    this.smartWallet.watch(accountId);
  }

  // ----------------------------------------------
  // Create Account

  prepareCreateAccount(address) {
    return this.prepare('create', { address })
      .then(body => new PrepareMessage(body.data));
  }

  createAccount({ firstName, lastName, email, dateOfBirth, address, signature, 
    prepareId, prepareMessage, passwordHash, encryptedPrivateKey, encryptedMnemonic,
    subscribedToMarketing, referralCode }) {
    return this.post('create', {
      first_name: firstName,
      last_name: lastName,
      email: email,
      date_of_birth: dateOfBirth,
      wallet_address: address,
      password_hash: passwordHash,
      encrypted_private_key: encryptedPrivateKey,
      encrypted_mnemonic: encryptedMnemonic,
      is_subscribed_to_marketing: subscribedToMarketing,
      auth_signature: signature,
      prepare_id: prepareId,
      prepare_message: prepareMessage,
      referral_code: referralCode
    }).then(body => new AuthToken(body.data));
  }
  
  createInternationalUnmanagedAccount({ address, messageHash, signature, referralCode }) {
    return this.post('createInternational', {
      wallet_address: address,
      message_hash: messageHash,
      ecdsa_multi_hash_signature: signature,
      referral_code: referralCode
    }).then(({ headers }) => { console.log(headers); return new AuthToken(headers.Authorization) });
  }

  // ----------------------------------------------
  // Login

  getLoginSignatureMessage() {
    const timestamp = Date.now();
    const message = `Login to Dolomite. Code: ${timestamp}`;
    return { message, timestamp };
  }

  signatureLogin({ accountId, address, signature, timestamp }) {
    return this.post('signatureLogin', {
      account_id: accountId,
      wallet_address: address,
      auth_signature: signature,
      timestamp: timestamp
    }).then(body => new AuthToken(body.data.token));
  }

  reauthWithToken(authToken) {
    return this.post('reauth', {}, {
      Authorization: authToken
    }).then(body => new AuthToken(body.data));
  }

  login(email, passwordHash) {
    return this.post('login', { email, password_hash: passwordHash })
      .then(body => new LoginRequest(body.data));
  }

  confirmLogin(email, passwordHash, verificationMethod, code) {
    return this.post('confirmLogin', { 
      email, 
      password_hash: passwordHash ,
      verification_method: verificationMethod,
      verification_code: code
    }).then(body => new LoginRequest(body.data));
  }
}
