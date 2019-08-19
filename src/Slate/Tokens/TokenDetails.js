import BigNumber from '../../common/BigNumber';
import TokenSummary from './TokenSummary';

class TokenSiteInfo {
  constructor({ discord_url, git_hub_url, facebook_url, medium_url, reddit_url,
    telegram_url, twitter_url, website_url }) {

    this.discord = discord_url;
    this.github = git_hub_url;
    this.facebook = facebook_url;
    this.medium = medium_url;
    this.reddit = reddit_url;
    this.telegram = telegram_url;
    this.twitter = twitter_url;
    this.website = website_url;
  }
}

class TokenIssuanceInfo {
  constructor({ price_crypto, price_usd, start_date, end_date, had_pre_sale }) {
    this.price = new BigNumber(price_crypto);
    this.priceUsd = new BigNumber(price_usd);
    this.start = start_date && new Date(start_date);
    this.end = end_date && new Date(end_date);
    this.hadPreSale = had_pre_sale;
  }
}

class TokenMarketInfo {
  constructor({ one_day_high_usd, one_day_low_usd, one_day_volume_usd, one_day_percentage_change, 
    one_month_average_volume_usd, market_capitalization_usd, circulating_supply, max_supply }) {

    this.oneDayHighUsd = new BigNumber(one_day_high_usd);
    this.oneDayLowUsd = new BigNumber(one_day_low_usd);
    this.oneDayVolumeUsd = new BigNumber(one_day_volume_usd);
    this.oneDayPercentageChange = one_day_percentage_change;
    this.oneMonthAverageVolumeUsd = new BigNumber(one_month_average_volume_usd);
    this.marketCapitalizationUsd = new BigNumber(market_capitalization_usd);
    this.circulatingSupply = new BigNumber(circulating_supply);
    this.maxSupply = new BigNumber(max_supply);
  }
}

/*
 * Token Details object. All fields are optional.
 */
export default class TokenDetails {
  constructor({ token_summary, token_external_site_info, token_description,
    token_issuance_info, token_market_info }) {

    this.summary = token_summary && new TokenSummary(token_summary);
    this.siteInfo = token_external_site_info && new TokenSiteInfo(token_external_site_info);
    this.description = token_description;
    this.issuanceInfo = token_issuance_info && new TokenIssuanceInfo(token_issuance_info);
    this.marketInfo = token_market_info && new TokenMarketInfo(token_market_info);
  }

  static build(tokensAsJson) {
    return tokensAsJson.map(tokenJson => new TokenDetails(tokenJson));
  }
}

