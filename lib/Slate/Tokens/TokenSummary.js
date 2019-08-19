"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Info for Token Summaries
 */
var TokenSummary =
/*#__PURE__*/
function () {
  function TokenSummary(_ref) {
    var ticker = _ref.ticker,
        name = _ref.name,
        precision = _ref.precision,
        display_precision = _ref.display_precision,
        token_type = _ref.token_type,
        identifier = _ref.identifier,
        image_url = _ref.image_url,
        thumbnail_url = _ref.thumbnail_url,
        date_added = _ref.date_added,
        dolomite_token_id = _ref.dolomite_token_id;

    _classCallCheck(this, TokenSummary);

    this.id = dolomite_token_id;
    this.ticker = ticker;
    this.name = (name || {}).singular;
    this.namePlural = (name || {}).plural;
    this.precision = precision;
    this.displayPrecision = display_precision;
    this.type = token_type;
    this.imageUrl = image_url;
    this.thumbnailUrl = thumbnail_url;
    this.dateAdded = date_added; // Deprecated

    this.decimals = precision;
    this.contractAddress = identifier;
    this.dateAddedToDolomite = date_added;
  }

  _createClass(TokenSummary, null, [{
    key: "build",
    value: function build(tokensAsJson) {
      return tokensAsJson.map(function (tokenJson) {
        return new TokenSummary(tokenJson);
      });
    }
  }]);

  return TokenSummary;
}();

exports["default"] = TokenSummary;
TokenSummary.Type = {
  ERC20: 'ERC20'
};
TokenSummary.SortType = {
  ALPHABETICAL: 'ALPHABETICAL',
  HIGHEST_HOLDINGS: 'HIGHEST_HOLDINGS',
  LOWEST_HOLDINGS: 'LOWEST_HOLDINGS',
  HIGHEST_MARKET_CAP: 'HIGHEST_MARKET_CAP',
  LOWEST_MARKET_CAP: 'LOWEST_MARKET_CAP',
  HIGHEST_PRICE: 'HIGHEST_PRICE',
  LOWEST_PRICE: 'LOWEST_PRICE',
  BIGGEST_GAINER: 'BIGGEST_GAINER',
  BIGGEST_LOSER: 'BIGGEST_LOSER'
};
TokenSummary.Types = Object.values(TokenSummary.Type);
TokenSummary.SortTypes = Object.values(TokenSummary.SortType);