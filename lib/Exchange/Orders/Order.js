"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _BigNumber = _interopRequireDefault(require("../../common/BigNumber"));

var _Token = _interopRequireDefault(require("../Tokens/Token"));

var _bn = _interopRequireDefault(require("bn.js"));

var Web3 = _interopRequireWildcard(require("web3-utils"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var toFillPercent = function toFillPercent(dealt, total) {
  return dealt.amount / total.amount;
};

var toOpenAmount = function toOpenAmount(dealt, total) {
  var amountBN = new _bn["default"](total.amount).sub(new _bn["default"](dealt.amount));

  var _0 = new _bn["default"]('0');

  return new _BigNumber["default"](_objectSpread({}, total, {
    amount: amountBN.lt(_0) ? '0' : amountBN.toString(10)
  }));
};
/*
 * Order model
 */


var Order = /*#__PURE__*/function () {
  function Order(_ref) {
    var dolomite_order_id = _ref.dolomite_order_id,
        order_hash = _ref.order_hash,
        market = _ref.market,
        order_type = _ref.order_type,
        order_side = _ref.order_side,
        order_status = _ref.order_status,
        loopring_contract_address = _ref.loopring_contract_address,
        loopring_delegate_address = _ref.loopring_delegate_address,
        fee_collecting_wallet_address = _ref.fee_collecting_wallet_address,
        owner_address = _ref.owner_address,
        auth_address = _ref.auth_address,
        primary_amount = _ref.primary_amount,
        secondary_amount = _ref.secondary_amount,
        usd_amount_at_creation = _ref.usd_amount_at_creation,
        dealt_amount_primary = _ref.dealt_amount_primary,
        dealt_amount_secondary = _ref.dealt_amount_secondary,
        placement_timestamp = _ref.placement_timestamp,
        expiration_timestamp = _ref.expiration_timestamp,
        fee_amount = _ref.fee_amount,
        dealt_amount_fee = _ref.dealt_amount_fee,
        fee_usd_at_creation = _ref.fee_usd_at_creation,
        fee_usd_average = _ref.fee_usd_average,
        exchange_more_than_amount = _ref.exchange_more_than_amount,
        exchange_rate = _ref.exchange_rate,
        ecdsa_signature = _ref.ecdsa_signature,
        margin_split_percentage = _ref.margin_split_percentage,
        proof_of_work_nonce = _ref.proof_of_work_nonce,
        primary_token = _ref.primary_token,
        secondary_token = _ref.secondary_token,
        close_timestamp = _ref.close_timestamp,
        usd_amount_at_close = _ref.usd_amount_at_close,
        usd_fee_at_creation = _ref.usd_fee_at_creation,
        usd_fee_at_close = _ref.usd_fee_at_close,
        market_order_effective_price = _ref.market_order_effective_price,
        trade_type = _ref.trade_type,
        margin_order_data = _ref.margin_order_data;

    _classCallCheck(this, Order);

    var priceString = exchange_rate.toLocaleString('en-US', {
      useGrouping: false,
      maximumFractionDigits: 20
    });
    var factor = new _bn["default"](10).pow(new _bn["default"](18 - secondary_amount.currency.precision));
    var rawPriceBN = new _bn["default"](Web3.toWei(priceString)).div(factor);
    this.id = dolomite_order_id;
    this.orderHash = order_hash;
    this.loopringContractAddress = loopring_contract_address;
    this.loopringDelegateAddress = loopring_delegate_address;
    this.walletAddress = fee_collecting_wallet_address;
    this.owner = owner_address;
    this.authAddress = auth_address;
    this.type = order_type;
    this.side = order_side;
    this.tradeType = trade_type;
    this.market = market;
    this.primaryToken = primary_token && new _Token["default"](primary_token);
    this.secondaryToken = secondary_token && new _Token["default"](secondary_token);
    this.tokenB = this.side === 'BUY' ? this.primaryToken : this.secondaryToken;
    this.tokenS = this.side === 'SELL' ? this.primaryToken : this.secondaryToken;
    this.status = order_status;
    this.amount = new _BigNumber["default"](primary_amount);
    this.volume = new _BigNumber["default"](secondary_amount);
    this.amountB = this.side === 'BUY' ? this.amount : this.volume;
    this.amountS = this.side === 'SELL' ? this.amount : this.volume;
    var marketOrderPrice = market_order_effective_price && new _BigNumber["default"](market_order_effective_price);
    this.price = marketOrderPrice ? marketOrderPrice.amount : exchange_rate;
    this.priceBN = marketOrderPrice ? marketOrderPrice.valueBN : rawPriceBN;
    this.dealtAmountPrimary = new _BigNumber["default"](dealt_amount_primary);
    this.dealtAmountSecondary = new _BigNumber["default"](dealt_amount_secondary);
    this.dealtAmountFee = new _BigNumber["default"](dealt_amount_fee);
    this.openAmountPrimary = toOpenAmount(dealt_amount_primary, primary_amount);
    this.openAmountSecondary = toOpenAmount(dealt_amount_secondary, secondary_amount);
    this.fillPercent = toFillPercent(this.dealtAmountPrimary, this.amount);
    this.fiatPriceTotal = new _BigNumber["default"](usd_amount_at_creation);
    this.orderFee = new _BigNumber["default"](fee_amount);
    this.orderFeeUSD = fee_usd_at_creation && new _BigNumber["default"](fee_usd_at_creation);
    this.orderFeePaidUSD = new _BigNumber["default"](fee_usd_average);
    this.marginSplitPercentage = margin_split_percentage;
    this.v = ecdsa_signature.v;
    this.r = ecdsa_signature.r;
    this.S = ecdsa_signature.s;
    this.nonce = proof_of_work_nonce;
    this.creationTime = new Date(parseInt(placement_timestamp));
    this.creationTimestamp = parseInt(placement_timestamp);
    this.expirationTime = expiration_timestamp && new Date(parseInt(expiration_timestamp));
    this.closeTimestamp = close_timestamp && new Date(close_timestamp);
    this.usdAmountAtClose = usd_amount_at_close && new _BigNumber["default"](usd_amount_at_close);
    this.usdFeeAtCreation = usd_fee_at_creation && new _BigNumber["default"](usd_fee_at_creation);
    this.usdFeeAtClose = usd_fee_at_close && new _BigNumber["default"](usd_fee_at_close);
    var primaryTicker = this.market.split('-')[0];

    if (this.tradeType === 'MARGIN') {
      var depositPrecisionedTicker = margin_order_data.deposit_precisioned_ticker;
      this.depositPaddedAmount = _BigNumber["default"].build(margin_order_data.deposit_padded_amount, depositPrecisionedTicker.precision, depositPrecisionedTicker.ticker);
      this.isMarginOpen = this.depositPaddedAmount.amount !== 0;

      if (margin_order_data.deposit_precisioned_ticker.ticker === primaryTicker) {
        // The user is going LONG
        this.marginActionType = this.isMarginOpen ? 'OPEN_LONG' : 'CLOSE_LONG';
        this.leverage = this.isMarginOpen ? Math.round((this.amountB.amount + this.depositPaddedAmount.amount) / this.depositPaddedAmount.amount) : 0;
      } else {
        this.marginActionType = this.isMarginOpen ? 'OPEN_SHORT' : 'CLOSE_SHORT';
        this.leverage = this.isMarginOpen ? Math.round(this.amountB.amount / this.depositPaddedAmount.amount) : 0;
      }

      this.blockchainMarginPositionId = margin_order_data.margin_position_id;
    } else {
      this.depositPaddedAmount = null;
      this.marginActionType = null;
      this.leverage = null;
      this.blockchainMarginPositionId = null;
    } // Deprecated


    this.dolomiteOrderHash = dolomite_order_id;
    this.loopringOrderHash = order_hash;
    this.protocol = loopring_contract_address;
    this.delegateAddress = loopring_delegate_address;
  }

  _createClass(Order, null, [{
    key: "build",
    value: function build(orderArray) {
      return orderArray.map(function (orderJson) {
        return new Order(orderJson);
      });
    }
  }, {
    key: "hydrate",
    value: function hydrate(orderArray, globals) {
      var tokens = globals.tokens || {};
      var ordersWithTokens = orderArray.map(function (order) {
        var _order$market$split = order.market.split('-'),
            _order$market$split2 = _slicedToArray(_order$market$split, 2),
            primaryTicker = _order$market$split2[0],
            secondaryTicker = _order$market$split2[1];

        order.primary_token = tokens[primaryTicker] || {};
        order.secondary_token = tokens[secondaryTicker] || {};
        return order;
      });
      return Order.build(ordersWithTokens);
    }
  }]);

  return Order;
}();

exports["default"] = Order;
Order.Status = {
  OPEN: 'OPEN',
  PROCESSING: 'PROCESSING',
  FILLING: 'FILLING',
  FILLED: 'FILLED',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED',
  CANCELLING: 'CANCELLING',
  REJECTED: 'REJECTED'
};
Order.Type = {
  LIMIT: 'LIMIT'
};
Order.Side = {
  BUY: 'BUY',
  SELL: 'SELL'
};
Order.Statuses = Object.values(Order.Status);
Order.Types = Object.values(Order.Type);
Order.Sides = Object.values(Order.Side);