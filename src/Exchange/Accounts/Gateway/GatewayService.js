import AuthService from '../../../common/AuthService';
import PrepareMessage from '../Verification/PrepareMessage';

import PaymentMethod from './PaymentMethod';
import FiatTransfer from './FiatTransfer';
import FiatTransferLimit from './FiatTransferLimit';
import SRN from './SRN';

export default class VerificationService extends AuthService {

  static routes = {
    paymentMethods: {
      get: '/v1/accounts/:account_id/payment-methods'
    },
    transferHistory: {
      get: '/v1/accounts/:account_id/transfers'
    },
    depositPreview: {
      post: '/v1/accounts/:account_id/transfers/deposits/preview'
    },
    withdrawalPreview: {
      post: '/v1/accounts/:account_id/transfers/withdrawals/preview'
    },
    createDeposit: {
      post: '/v1/accounts/:account_id/transfers/deposits/create',
      prepare: '/v1/accounts/:account_id/transfers/deposits/create/prepare/:address'
    },
    watchWithdrawal: {
      post: '/v1/accounts/:account_id/transfers/withdrawals/watch'
    }
  };

  static exports = {
    PaymentMethod,
    FiatTransfer,
    FiatTransferLimit,
    SRN,
  };

  /////////////////////////

  getPaymentMethods(accountId) {
    return this.requiresAuth.get('paymentMethods', { account_id: accountId })
      .then(body => PaymentMethod.build(body.data));
  }

  getLimits(accountId) {
    // TODO: replace with actual network call
    return new Promise((resolve, _) => {
      resolve(FiatTransferLimit.HARD_CODED);
    });
  }

  getTransferHistory(accountId) {
    return this.requiresAuth.get('transferHistory', { account_id: accountId })
      .then(body => FiatTransfer.build(body.data));
  }

  // ----------------------------------------------
  // Deposit

  getDepositPreview({ accountId, address, amount, paymentMethodId, depositTicker }) {
    return this.requiresAuth.post('depositPreview', {
      account_id: accountId,
      amount: amount,
      amount_ticker: 'USD',
      wallet_address: address,
      payment_method_id: paymentMethodId,
      deposit_asset_ticker: depositTicker
    }).then(body => new FiatTransfer(body.data));
  }

  prepareDeposit({ address, accountId }) {
    return this.requiresAuth.prepare('createDeposit', { address, account_id: accountId })
      .then(body => new PrepareMessage(body.data));
  }

  deposit({ accountId, address, amount, paymentMethodId, depositTicker, signature, prepareId }) {
    return this.requiresAuth.post('createDeposit', {
      account_id: accountId,
      amount: amount,
      amount_ticker: 'USD',
      wallet_address: address,
      payment_method_id: paymentMethodId,
      deposit_asset_ticker: depositTicker,
      auth_signature: signature,
      prepare_id: prepareId
    }).then(body => new FiatTransfer(body.data));
  }

  // ----------------------------------------------
  // Withdrawal

  getWithdrawalPreview({ accountId, address, amount, paymentMethodId, withdrawalTicker }) {
    return this.requiresAuth.post('withdrawalPreview', {
      account_id: accountId,
      amount_ticker: withdrawalTicker,
      amount: amount,
      wallet_address: address,
      payment_method_id: paymentMethodId,
      destination_ticker: 'USD'
    }).then(body => new FiatTransfer(body.data));
  }

  watchWithdrawal({ accountId, address, amount, paymentMethodId, withdrawalTicker, blockchainTransaction }) {
    return this.requiresAuth.post('watchWithdrawal', {
      account_id: accountId,
      amount_ticker: withdrawalTicker,
      amount: amount,
      wallet_address: address,
      payment_method_id: paymentMethodId,
      destination_ticker: 'USD',
      blockchain_transaction: blockchainTransaction,
      creation_timestamp: Date.now()
    }).then(body => new FiatTransfer(body.data));
  }
}








