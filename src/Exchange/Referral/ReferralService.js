import AuthService from '../../common/AuthService';

import Referral from './Referral';
import Friend from './Friend';
import Withdrawal from './Withdrawal';
import Commission from './Commission';

export default class ReferralService extends AuthService {

  static routes = {
    info: {
      get: '/v1/referrals/:address/info'
    },
    friends: {
      get: '/v1/referrals/referrer-addresses/:address/referred-accounts'
    },
    withdrawalsByID: {
      get: '/v1/referrals/:accountId/withdrawals'
    },
    withdraw: {
      post: '/v1/referrals/withdraw/:address'
    },
    commissionsByAddress: {
      get: '/v1/referrals/referrer-addresses/:address/commissions'
    },
    commissionsByID: {
      get: '/v1/referrals/referrer-accounts/:accountId/commissions'
    }
  };

  static exports = {
    Referral,
    Friend
  };

  getInfo(address) {
    return this.get('info', { address })
      .then(body => new Referral(body.data))
  }

  getFriends(address, options = {}) {
    return this.pageable('friends')
      .build(data => Friend.build(data))
      .get(options, { address });
  }

  getWithdrawalsByID(accountId, options = {}) {
    return this.pageable('withdrawalsByID')
      .build(data => Withdrawal.build(data))
      .get(options, { accountId });
  }

  getCommissionsByAddress(address, options = {}) {
    return this.pageable('commissionsByAddress')
      .build(data => Commission.build(data))
      .get(options, { address });
  }

  getCommissionsByID(accountId, options = {}) {
    return this.pageable('commissionsByID')
      .build(data => Commission.build(data))
      .get(options, { accountId });
  }

  withdraw(address) {
    return this.requiresAuth.post('withdraw', { address });
  }

  async watch(address) {
    if (this.watchAddress && this.watchAddress !== address) {
      await this.send('/v1/referrals/withdraw/-address-', 'unsubscribe', {
        address: this.watchAddress
      });
    }

    this.watchAddress = address;
    return this.send('/v1/referrals/withdraw/-address-', 'subscribe', {
      address: address
    });
  }

  onWithdrawalsUpdate(callback) {
    this.on('/v1/referrals/withdraw/-address-', 'update')
      .build(data => Withdrawal.build(data))
      .then(callback);
  }
}
