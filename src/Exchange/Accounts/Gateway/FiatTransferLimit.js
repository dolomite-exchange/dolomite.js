import FiatTransfer from './FiatTransfer';

// Temporary
const HARD_CODED_LIMITS = [
  {
    asset_ticker: 'ETH',
    transfer_type: 'WITHDRAWAL',
    time_period: 86400000, // 1d in milliseconds
    limit_amount: 50,
    consumed_amount: 0,
    limit_ticker: 'ETH'
  },
  {
    asset_ticker: 'WETH',
    transfer_type: 'WITHDRAWAL',
    time_period: 86400000, // 1d in milliseconds
    limit_amount: 20000,
    consumed_amount: 0,
    limit_ticker: 'USD'
  },
  {
    asset_ticker: 'DAI',
    transfer_type: 'WITHDRAWAL',
    time_period: 86400000, // 1d in milliseconds
    limit_amount: 20000,
    consumed_amount: 0,
    limit_ticker: 'USD'
  },
  {
    asset_ticker: 'USD',
    transfer_type: 'DEPOSIT',
    time_period: 604800000, // 7d in milliseconds
    limit_amount: 2500,
    consumed_amount: 0,
    limit_ticker: 'USD',
  },
  {
    asset_ticker: 'USD',
    transfer_type: 'DEPOSIT',
    time_period: 2592000000, // 30d in milliseconds
    limit_amount: 10000,
    consumed_amount: 0,
    limit_ticker: 'USD',
  },
  {
    asset_ticker: 'USD',
    transfer_type: 'DEPOSIT',
    time_period: 5184000000, // 60d in milliseconds
    limit_amount: 20000,
    consumed_amount: 0,
    limit_ticker: 'USD',
  },
];


class FiatTransferLimit {
  constructor({ asset_ticker, transfer_type, time_period, limit_amount,
    consumed_amount, limit_ticker }) {

    this.ticker = asset_ticker;
    this.transferType = transfer_type;
    this.timePeriod = time_period;
    this.limit = limit_amount;
    this.consumed = consumed_amount;
    this.remaining = Math.max(limit_amount - consumed_amount, 0);
    this.limitTicker = limit_ticker;
  }

  static build(limitsJson) {
    return limitsJson.map(limit => new FiatTransferLimit(limit));
  }
}

FiatTransferLimit.HARD_CODED = FiatTransferLimit.build(HARD_CODED_LIMITS);

export default FiatTransferLimit;
