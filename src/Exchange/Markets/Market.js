import BigNumber from '../../common/BigNumber';
import Token from '../Tokens/Token';

const isObject = (o) => o !== null && typeof o === "object";
const toToken = (t) => isObject(t) ? new Token(t) : t;

/*
 * Details of a token-pair/market
 */
export default class Market {
  constructor({market, primary_token, secondary_token, metric_period, period_high, 
    period_low, period_amount, period_volume, period_change, current_price, last_price_traded,
    current_high, current_low, is_margin_trading_enabled, margin_trading_details, period_volume_usd }) {
    
    this.market = market;
    this.primaryToken = toToken(primary_token);
    this.secondaryToken = toToken(secondary_token);
    this.metricPeriod = metric_period;
    this.lastPrice = new BigNumber(last_price_traded);
    this.currentPrice = new BigNumber(current_price);
    this.highestBid = new BigNumber(current_high);
    this.lowestAsk = new BigNumber(current_low);
    this.volumePrimaryToken = new BigNumber(period_amount);
    this.volumeSecondaryToken = new BigNumber(period_volume);
    this.volumeUsd = new BigNumber(period_volume_usd);
    this.changePeriod = {
      highPrice: new BigNumber(period_high),
      lowPrice: new BigNumber(period_low),
      percentDifference: BigNumber.fromFloat(period_change)
    };
    
    this.isMarginTradingEnabled = is_margin_trading_enabled;
    this.marginTradingDetails = {
      primaryMarketId: margin_trading_details.primary_market_id,
      secondaryMarketId: margin_trading_details.secondary_market_id
    };

    // Deprecated
    this.pair = market;
  }

  static build(marketJsonArray) {
    return marketJsonArray.map(marketJson => new Market(marketJson));
  }

  static hydrate(marketJsonArray, globals) {
    const tokens = globals.tokens || {};

    const markets = marketJsonArray.map(market => {
      market.primary_token = tokens[market.primary_token];
      market.secondary_token = tokens[market.secondary_token];
      return market;
    });

    return Market.build(markets);
  }
}

/*
 * Different periods for basic market data
 */
Market.Period = {
  ONE_HOUR: 'ONE_HOUR',
  ONE_DAY: 'ONE_DAY',
  ONE_WEEK: 'ONE_WEEK',
  ONE_MONTH: 'ONE_MONTH'
};

Market.Periods = Object.values(Market.Period);
