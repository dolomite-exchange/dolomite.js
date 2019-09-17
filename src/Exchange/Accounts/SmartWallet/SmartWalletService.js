import Service from '../../../common/Service';

import SmartWalletTransfer from './SmartWalletTransfer';

export default class SmartWalletService extends Service {

  static routes = {
    nonces: {
      get: '/v1/accounts/addresses/:address/smart-wallet/nonces'
    },
    deployDepositContract: {
      post: '/v1/accounts/:account_id/smart-wallet/deposit-contracts'
    },
    transfers: {
      post: '/v1/accounts/:account_id/smart-wallet/transfers',
      get: '/v1/accounts/:account_id/smart-wallet/transfers'
    },
    pendingTransfers: {
      get: '/v1/accounts/:account_id/smart-wallet/transfers/pending'
    }
  };

  static exports = {
    SmartWalletTransfer
  };

  /////////////////////////

  getNonces(ownerAddress) {
    return this.get('nonces', { address: ownerAddress })
      .then(body => body.data)
      .then(data => ({ 
        dolomiteDirectV1: data.dolomite_direct_v1_nonce, 
        registry: data.deposit_contract_registry_nonce 
      }));
  }

  createDepositContract({ accountId, ownerAddress, targetAddress, versionAddress, additionalData, 
    nonce, feeRecipientAddress, feeTokenAddress, feePaddedAmount, signature, requestHash }) {

    return this.post('deployDepositContract', {
      account_id: accountId,
      owner_address: ownerAddress,
      target_address: targetAddress,
      version_address: versionAddress,
      additional_data: additionalData,
      request_type: 'CREATE',
      nonce: nonce,
      fee_recipient_address: feeRecipientAddress,
      fee_token_address: feeTokenAddress,
      fee_padded_amount: feePaddedAmount,
      ecdsa_signature: signature,
      request_hash: requestHash
    }).then(body => body.data.transaction_hash);
  }

  executeTransfer({ accountId, ownerAddress, targetAddress, tokenAddress, recipient, amount, shouldUnwrap,
    nonce, feeRecipientAddress, feeTokenAddress, feePaddedAmount, signature, requestHash }) {

    return this.post('transfers', {
      account_id: accountId,
      owner_address: ownerAddress,
      target_address: targetAddress,
      transfer_token_address: tokenAddress,
      transfer_recipient_address: recipient,
      transfer_padded_amount: amount,
      should_unwrap: shouldUnwrap,
      request_type: 'TRANSFER',
      nonce: nonce,
      fee_recipient_address: feeRecipientAddress,
      fee_token_address: feeTokenAddress,
      fee_padded_amount: feePaddedAmount,
      ecdsa_signature: signature,
      request_hash: requestHash
    }).then(body => body.data.transaction_hash);
  }

  getTransfers(accountId) {
    return this.get('transfers', { account_id: accountId }).then(body => SmartWalletTransfer.build(body.data));
  }

  getPendingTransfers(accountId) {
    return this.get('pendingTransfers', { account_id: accountId }).then(body => SmartWalletTransfer.build(body.data, true));
  }

  async watch(accountId) {
    if (this.watchedAccountId && this.watchedAccountId !== accountId) {
      await this.send('/v1/accounts/-account-id-/smart-wallet/transfers', 'unsubscribe', { dolomite_account_id: this.watchedAccountId })
    }

    this.watchedAccountId = accountId;
    if (!accountId) return new Promise((resolve) => resolve());
    
    await this.send('/v1/accounts/-account-id-/smart-wallet/transfers', 'subscribe', { dolomite_account_id: this.accountId })
  }

  onTransferUpdate(callback) {
    this.on('/v1/accounts/-account-id-/smart-wallet/transfers', 'update')
      .then(callback)
  }
}
