"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Info for Lending Interest Rates
 */
var Rate = /*#__PURE__*/function () {
  function Rate(_ref) {
    var ticker = _ref.ticker,
        dydx_token_id = _ref.dydx_token_id,
        margin_supply_interest_rate = _ref.margin_supply_interest_rate,
        margin_borrow_interest_rate = _ref.margin_borrow_interest_rate,
        token = _ref.token;

    _classCallCheck(this, Rate);

    this.ticker = ticker;
    this.dydxTokenId = dydx_token_id;
    this.supplyInterestRate = margin_supply_interest_rate;
    this.borrowInterestRate = margin_borrow_interest_rate;
    this.token = token;
  }

  _createClass(Rate, null, [{
    key: "build",
    value: function build(ratesAsJson) {
      return ratesAsJson.map(function (rateJson) {
        return new Rate(rateJson);
      });
    }
  }, {
    key: "hydrate",
    value: function hydrate(rateJsonArray, globals) {
      var tokens = globals.tokens || {};
      var rates = rateJsonArray.map(function (rate) {
        rate.token = tokens[rate.ticker];
        return rate;
      });
      return Rate.build(rates);
    }
  }]);

  return Rate;
}();

exports["default"] = Rate;