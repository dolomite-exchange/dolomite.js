"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _BigNumber = _interopRequireDefault(require("../../common/BigNumber"));

var _Token = _interopRequireDefault(require("../Tokens/Token"));

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

var bigToFloat = function bigToFloat(b) {
  return b && new _BigNumber["default"](b).amount;
};
/*
 * Position model
 */


var Position = /*#__PURE__*/function () {
  function Position(_ref) {
    var _this = this;

    var dolomite_position_id = _ref.dolomite_position_id,
        blockchain_position_id = _ref.blockchain_position_id,
        owner_address = _ref.owner_address,
        market = _ref.market,
        margin_position_type = _ref.margin_position_type,
        margin_position_status = _ref.margin_position_status,
        held_token = _ref.held_token,
        actual_held_amount = _ref.actual_held_amount,
        actual_borrow_amount = _ref.actual_borrow_amount,
        target_held_amount = _ref.target_held_amount,
        target_borrow_amount = _ref.target_borrow_amount,
        borrow_token = _ref.borrow_token,
        expiration_timestamp = _ref.expiration_timestamp,
        liquidated_withdrawable_amount = _ref.liquidated_withdrawable_amount,
        open_order_id = _ref.open_order_id,
        close_order_id = _ref.close_order_id,
        open_price = _ref.open_price,
        close_price = _ref.close_price,
        open_timestamp = _ref.open_timestamp,
        close_timestamp = _ref.close_timestamp,
        creation_timestamp = _ref.creation_timestamp,
        open_transaction_hash = _ref.open_transaction_hash,
        close_transaction_hash = _ref.close_transaction_hash,
        collateralization = _ref.collateralization,
        position_value_usd_amount = _ref.position_value_usd_amount,
        position_value_change = _ref.position_value_change,
        withdrawable_amount = _ref.withdrawable_amount,
        actual_liquidation_price_amount = _ref.actual_liquidation_price_amount,
        actual_leverage = _ref.actual_leverage,
        actual_deposit_amount = _ref.actual_deposit_amount,
        target_deposit_amount = _ref.target_deposit_amount,
        deposit_token = _ref.deposit_token,
        target_liquidation_price_amount = _ref.target_liquidation_price_amount,
        target_leverage = _ref.target_leverage,
        is_liquidated_collateral_withdrawn = _ref.is_liquidated_collateral_withdrawn;

    _classCallCheck(this, Position);

    this.id = dolomite_position_id;
    this.blockchainId = blockchain_position_id;
    this.owner = owner_address;
    this.market = market;
    this.type = margin_position_type;
    this.status = margin_position_status;
    this.heldToken = held_token && new _Token["default"](held_token);
    this.borrowToken = borrow_token && new _Token["default"](borrow_token);
    this.depositToken = deposit_token && new _Token["default"](deposit_token);
    this.heldAmount = new _BigNumber["default"](actual_held_amount);
    this.targetHeldAmount = new _BigNumber["default"](target_held_amount);
    this.borrowAmount = new _BigNumber["default"](actual_borrow_amount);
    this.targetBorrowAmount = new _BigNumber["default"](target_borrow_amount);
    this.depositAmount = new _BigNumber["default"](actual_deposit_amount);
    this.targetDepositAmount = new _BigNumber["default"](target_deposit_amount);

    var _this$market$split = this.market.split('-'),
        _this$market$split2 = _slicedToArray(_this$market$split, 2),
        primaryTicker = _this$market$split2[0],
        secondaryTicker = _this$market$split2[1];

    this.primaryTicker = primaryTicker;
    this.secondaryTicker = secondaryTicker;
    this.positionTicker = this.type === 'LONG' ? primaryTicker : secondaryTicker;
    this.heldTicker = this.positionTicker;
    this.borrowTicker = this.type === 'LONG' ? secondaryTicker : primaryTicker;
    ;
    this.targetPositionSize = this.type === 'LONG' ? this.targetHeldAmount : this.targetHeldAmount.calc(function (a) {
      return a - _this.targetDepositAmount.value;
    });
    this.actualPositionSize = this.type === 'LONG' ? this.heldAmount : this.heldAmount.calc(function (a) {
      return a - _this.depositAmount.value;
    });
    this.fillPercentage = this.actualPositionSize.amount / this.targetPositionSize.amount * 100;
    this.isPartial = this.actualPositionSize.amount > 0 && this.fillPercentage < 95;
    this.openPrice = bigToFloat(open_price);
    this.closePrice = bigToFloat(close_price);
    this.liquidationPrice = bigToFloat(actual_liquidation_price_amount);
    this.targetLiquidationPrice = bigToFloat(target_liquidation_price_amount);
    this.openTimestamp = open_timestamp;
    this.closeTimestamp = close_timestamp;
    this.expirationTimestamp = expiration_timestamp;
    this.remainingDays = Math.max(0, Math.ceil((expiration_timestamp - Date.now()) / 1000 / 60 / 60 / 24));
    this.lastActionTimestamp = close_timestamp || open_timestamp || creation_timestamp;
    this.collateralization = (collateralization || 0) * 100;
    this.leverage = parseFloat((Math.round((actual_leverage || target_leverage) * 4) / 4).toFixed(2));
    this.actualLeverage = actual_leverage;
    this.targetLeverage = target_leverage;
    this.withdrawableAmount = withdrawable_amount && new _BigNumber["default"](withdrawable_amount);
    this.positionValueUsd = position_value_usd_amount && new _BigNumber["default"](position_value_usd_amount);
    this.percentChange = isNaN(position_value_change) ? 0 : position_value_change * 100;
    this.openOrderId = open_order_id;
    this.closeOrderId = close_order_id;
    this.openTransactionHash = open_transaction_hash;
    this.closeTransactionHash = close_transaction_hash;
    this.isLiquidatedCollateralWithdrawn = is_liquidated_collateral_withdrawn;
  }

  _createClass(Position, null, [{
    key: "build",
    value: function build(positionArray) {
      return positionArray.map(function (orderJson) {
        return new Position(orderJson);
      });
    }
  }, {
    key: "hydrate",
    value: function hydrate(positionArray, globals) {
      var tokens = globals.tokens || {};
      var positionsWithTokens = positionArray.map(function (position) {
        var held_token = position.held_token,
            borrow_token = position.borrow_token,
            deposit_token = position.deposit_token;
        position.held_token = tokens[held_token] || {};
        position.borrow_token = tokens[borrow_token] || {};
        position.deposit_token = tokens[deposit_token] || {};
        return position;
      });
      return Position.build(positionsWithTokens);
    }
  }]);

  return Position;
}();

exports["default"] = Position;
Position.Status = {
  PENDING: 'PENDING ',
  REJECTED: 'REJECTED',
  OPEN: 'OPEN',
  OPENING: 'OPENING',
  CLOSED: 'CLOSED',
  CLOSING: 'CLOSING',
  DOLOMITE_LIQUIDATED: 'DOLOMITE_LIQUIDATED',
  LIQUIDATED: 'LIQUIDATED',
  INVALIDATED: 'INVALIDATED'
};
Position.Type = {
  LONG: 'LONG',
  SHORT: 'SHORT'
};