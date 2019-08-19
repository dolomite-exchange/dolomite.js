"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _BigNumber = _interopRequireDefault(require("../../common/BigNumber"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Basic information about the Exchange
 */
var ExchangeInfo = function ExchangeInfo(_ref) {
  var base_spot_trading_fee_amounts = _ref.base_spot_trading_fee_amounts,
      black_listed_email_domains = _ref.black_listed_email_domains,
      fee_collecting_wallet_address = _ref.fee_collecting_wallet_address,
      loopring_contract_address = _ref.loopring_contract_address,
      loopring_delegate_address = _ref.loopring_delegate_address,
      maker_fee_percentage = _ref.maker_fee_percentage,
      max_number_of_taker_matches_per_order = _ref.max_number_of_taker_matches_per_order,
      min_usd_maker_trade_amount = _ref.min_usd_maker_trade_amount,
      min_usd_taker_trade_amount = _ref.min_usd_taker_trade_amount,
      server_time = _ref.server_time,
      taker_fee_percentage = _ref.taker_fee_percentage,
      time_zone = _ref.time_zone;

  _classCallCheck(this, ExchangeInfo);

  this.loopringContractAddress = loopring_contract_address;
  this.loopringDelegateAddress = loopring_delegate_address;
  this.feeCollectingWalletAddress = fee_collecting_wallet_address;
  this.serverTime = server_time;
  this.timeZone = time_zone;
  this.minMakerTradeSizeUsd = new _BigNumber["default"](min_usd_maker_trade_amount);
  this.minTakerTradeSizeUsd = new _BigNumber["default"](min_usd_taker_trade_amount);
  this.makerFee = maker_fee_percentage;
  this.takerFee = taker_fee_percentage;
  this.maxFillCount = max_number_of_taker_matches_per_order;
  this.feePerFill = _BigNumber["default"].mapped(base_spot_trading_fee_amounts);
  this.feePerFillEth = this.feePerFill.WETH;
};

exports["default"] = ExchangeInfo;