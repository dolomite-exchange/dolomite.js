
/*
 * Info for Token Summaries
 */
export default class TokenSummary {
  constructor({ticker, name, precision, display_precision, token_type, identifier, 
    image_url, thumbnail_url, date_added, dolomite_token_id }) {

    this.id = dolomite_token_id;
    this.ticker = ticker;
    this.name = (name || {}).singular;
    this.namePlural = (name || {}).plural;
    this.precision = precision;
    this.displayPrecision = display_precision;
    this.type = token_type;
    this.imageUrl = image_url;
    this.thumbnailUrl = thumbnail_url;
    this.dateAdded = date_added;

    // Deprecated
    this.decimals = precision;
    this.contractAddress = identifier;
    this.dateAddedToDolomite = date_added;
  }

  static build(tokensAsJson) {
    return tokensAsJson.map(tokenJson => new TokenSummary(tokenJson));
  }
}

TokenSummary.Type = {
  ERC20: 'ERC20'
}

TokenSummary.SortType = {
    ALPHABETICAL: 'ALPHABETICAL',
    HIGHEST_HOLDINGS: 'HIGHEST_HOLDINGS',
    LOWEST_HOLDINGS: 'LOWEST_HOLDINGS',
    HIGHEST_MARKET_CAP: 'HIGHEST_MARKET_CAP',
    LOWEST_MARKET_CAP: 'LOWEST_MARKET_CAP',
    HIGHEST_PRICE: 'HIGHEST_PRICE',
    LOWEST_PRICE: 'LOWEST_PRICE',
    BIGGEST_GAINER: 'BIGGEST_GAINER',
    BIGGEST_LOSER: 'BIGGEST_LOSER',
}

TokenSummary.Types = Object.values(TokenSummary.Type);
TokenSummary.SortTypes = Object.values(TokenSummary.SortType);
