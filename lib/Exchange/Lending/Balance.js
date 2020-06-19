"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Info for deposited balances for an address in the Dolomite margin protocol
 */
var Balance = /*#__PURE__*/function () {
  function Balance(_ref, token_info) {
    var ticker = _ref.ticker,
        dydx_token_id = _ref.dydx_token_id,
        margin_supply_interest_rate = _ref.margin_supply_interest_rate,
        margin_borrow_interest_rate = _ref.margin_borrow_interest_rate,
        token = _ref.token;

    _classCallCheck(this, Balance);

    this.ticker = ticker;
    this.dydxTokenId = dydx_token_id;
    this.supplyInterestRate = margin_supply_interest_rate;
    this.borrowInterestRate = margin_borrow_interest_rate;
    this.token = token;
    this.tokenInfo = token_info;
  }

  _createClass(Balance, null, [{
    key: "build",
    value: function build(balancesAsJson, tokens) {
      return balancesAsJson.map(function (balanceJson) {
        return new Balance(balanceJson, tokens[balanceJson.asset.ticker]);
      });
    }
  }, {
    key: "hydrate",
    value: function hydrate(balanceJsonObject, globals) {
      var tokens = globals.tokens || {};
      /*const balances = balanceJsonArray.map(balance => {
        balance.token = tokens[balance.ticker];
        return balance;
      });*/

      return Balance.build(balanceJsonObject, tokens);
    }
  }]);

  return Balance;
}();

exports["default"] = Balance;