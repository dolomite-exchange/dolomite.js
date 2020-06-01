"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _BigNumber = _interopRequireDefault(require("../../common/BigNumber"));

var _TokenSummary = _interopRequireDefault(require("./TokenSummary"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TokenSiteInfo = function TokenSiteInfo(_ref) {
  var discord_url = _ref.discord_url,
      git_hub_url = _ref.git_hub_url,
      facebook_url = _ref.facebook_url,
      medium_url = _ref.medium_url,
      reddit_url = _ref.reddit_url,
      telegram_url = _ref.telegram_url,
      twitter_url = _ref.twitter_url,
      website_url = _ref.website_url;

  _classCallCheck(this, TokenSiteInfo);

  this.discord = discord_url;
  this.github = git_hub_url;
  this.facebook = facebook_url;
  this.medium = medium_url;
  this.reddit = reddit_url;
  this.telegram = telegram_url;
  this.twitter = twitter_url;
  this.website = website_url;
};

var TokenIssuanceInfo = function TokenIssuanceInfo(_ref2) {
  var price_crypto = _ref2.price_crypto,
      price_usd = _ref2.price_usd,
      start_date = _ref2.start_date,
      end_date = _ref2.end_date,
      had_pre_sale = _ref2.had_pre_sale;

  _classCallCheck(this, TokenIssuanceInfo);

  this.price = new _BigNumber["default"](price_crypto);
  this.priceUsd = new _BigNumber["default"](price_usd);
  this.start = start_date && new Date(start_date);
  this.end = end_date && new Date(end_date);
  this.hadPreSale = had_pre_sale;
};

var TokenMarketInfo = function TokenMarketInfo(_ref3) {
  var one_day_high_usd = _ref3.one_day_high_usd,
      one_day_low_usd = _ref3.one_day_low_usd,
      one_day_volume_usd = _ref3.one_day_volume_usd,
      one_day_percentage_change = _ref3.one_day_percentage_change,
      one_month_average_volume_usd = _ref3.one_month_average_volume_usd,
      market_capitalization_usd = _ref3.market_capitalization_usd,
      circulating_supply = _ref3.circulating_supply,
      max_supply = _ref3.max_supply;

  _classCallCheck(this, TokenMarketInfo);

  this.oneDayHighUsd = new _BigNumber["default"](one_day_high_usd);
  this.oneDayLowUsd = new _BigNumber["default"](one_day_low_usd);
  this.oneDayVolumeUsd = new _BigNumber["default"](one_day_volume_usd);
  this.oneDayPercentageChange = one_day_percentage_change;
  this.oneMonthAverageVolumeUsd = new _BigNumber["default"](one_month_average_volume_usd);
  this.marketCapitalizationUsd = new _BigNumber["default"](market_capitalization_usd);
  this.circulatingSupply = new _BigNumber["default"](circulating_supply);
  this.maxSupply = new _BigNumber["default"](max_supply);
};
/*
 * Token Details object. All fields are optional.
 */


var TokenDetails =
/*#__PURE__*/
function () {
  function TokenDetails(_ref4) {
    var token_summary = _ref4.token_summary,
        token_external_site_info = _ref4.token_external_site_info,
        token_description = _ref4.token_description,
        token_issuance_info = _ref4.token_issuance_info,
        token_market_info = _ref4.token_market_info;

    _classCallCheck(this, TokenDetails);

    this.summary = token_summary && new _TokenSummary["default"](token_summary);
    this.siteInfo = token_external_site_info && new TokenSiteInfo(token_external_site_info);
    this.description = token_description;
    this.issuanceInfo = token_issuance_info && new TokenIssuanceInfo(token_issuance_info);
    this.marketInfo = token_market_info && new TokenMarketInfo(token_market_info);
  }

  _createClass(TokenDetails, null, [{
    key: "build",
    value: function build(tokensAsJson) {
      return tokensAsJson.map(function (tokenJson) {
        return new TokenDetails(tokenJson);
      });
    }
  }]);

  return TokenDetails;
}();

exports["default"] = TokenDetails;