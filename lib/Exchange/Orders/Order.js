"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _BigNumber = _interopRequireDefault(require("../../common/BigNumber"));

var _Token = _interopRequireDefault(require("../Tokens/Token"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var toFillPercent = function toFillPercent(dealt, total) {
  return dealt.amount / total.amount;
};

var toOpenAmount = function toOpenAmount(dealt, total) {
  return new _BigNumber["default"](_objectSpread({}, total, {
    amount: Math.max(total.amount - dealt.amount, 0)
  }));
};
/*
 * Order model
 */


var Order =
/*#__PURE__*/
function () {
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
        fee_usd_at_creation = _ref.fee_usd_at_creation,
        fee_usd_average = _ref.fee_usd_average,
        exchange_more_than_amount = _ref.exchange_more_than_amount,
        exchange_rate = _ref.exchange_rate,
        margin_split_percentage = _ref.margin_split_percentage,
        ecdsa_signature = _ref.ecdsa_signature,
        proof_of_work_nonce = _ref.proof_of_work_nonce,
        primary_token = _ref.primary_token,
        secondary_token = _ref.secondary_token,
        close_timestamp = _ref.close_timestamp,
        usd_amount_at_close = _ref.usd_amount_at_close,
        usd_fee_at_creation = _ref.usd_fee_at_creation,
        usd_fee_at_close = _ref.usd_fee_at_close;

    _classCallCheck(this, Order);

    this.id = dolomite_order_id;
    this.orderHash = order_hash;
    this.loopringContractAddress = loopring_contract_address;
    this.loopringDelegateAddress = loopring_delegate_address;
    this.walletAddress = fee_collecting_wallet_address;
    this.owner = owner_address;
    this.authAddress = auth_address;
    this.type = order_type;
    this.side = order_side;
    this.market = market;
    this.primaryToken = primary_token && new _Token["default"](primary_token);
    this.secondaryToken = secondary_token && new _Token["default"](secondary_token);
    this.status = order_status;
    this.amount = new _BigNumber["default"](primary_amount);
    this.volume = new _BigNumber["default"](secondary_amount);
    this.price = exchange_rate;
    this.dealtAmountPrimary = new _BigNumber["default"](dealt_amount_primary);
    this.dealtAmountSecondary = new _BigNumber["default"](dealt_amount_secondary);
    this.openAmountPrimary = toOpenAmount(dealt_amount_primary, primary_amount);
    this.openAmountSecondary = toOpenAmount(dealt_amount_secondary, secondary_amount);
    this.fillPercent = toFillPercent(this.dealtAmountPrimary, this.amount);
    this.fiatPriceTotal = new _BigNumber["default"](usd_amount_at_creation);
    this.orderFee = new _BigNumber["default"](fee_amount);
    this.orderFeeUSD = fee_usd_at_creation && new _BigNumber["default"](fee_usd_at_creation);
    this.orderFeePaidUSD = new _BigNumber["default"](fee_usd_average);
    this.exchangeMoreThanAmount = Boolean(exchange_more_than_amount);
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
    this.usdFeeAtClose = usd_fee_at_close && new _BigNumber["default"](usd_fee_at_close); // Deprecated

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