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
      spot_trade_settlement_contract_address = _ref.spot_trade_settlement_contract_address,
      loopring_delegate_address = _ref.loopring_delegate_address,
      maker_fee_percentage = _ref.maker_fee_percentage,
      max_number_of_taker_matches_per_order = _ref.max_number_of_taker_matches_per_order,
      min_usd_maker_trade_amount = _ref.min_usd_maker_trade_amount,
      min_usd_taker_trade_amount = _ref.min_usd_taker_trade_amount,
      server_time = _ref.server_time,
      taker_fee_percentage = _ref.taker_fee_percentage,
      smart_wallet_broker = _ref.smart_wallet_broker,
      time_zone = _ref.time_zone,
      create_deposit_contract_fee_amounts = _ref.create_deposit_contract_fee_amounts,
      margin_trading_fee_premium_amounts = _ref.margin_trading_fee_premium_amounts,
      deposit_contract_registry_address = _ref.deposit_contract_registry_address,
      spot_trading_fee_premium_amounts = _ref.spot_trading_fee_premium_amounts,
      smart_wallet_transfer_fee_amounts = _ref.smart_wallet_transfer_fee_amounts,
      dydx_solo_contract_address = _ref.dydx_solo_contract_address,
      margin_trade_settlement_contract_address = _ref.margin_trade_settlement_contract_address,
      dydx_payable_proxy_contract_address = _ref.dydx_payable_proxy_contract_address,
      lower_taker_fee_percentage = _ref.lower_taker_fee_percentage,
      lower_taker_fee_percentage_threshold_usd = _ref.lower_taker_fee_percentage_threshold_usd;

  _classCallCheck(this, ExchangeInfo);

  this.spotTradingContractAddress = spot_trade_settlement_contract_address;
  this.loopringDelegateAddress = loopring_delegate_address;
  this.feeCollectingWalletAddress = fee_collecting_wallet_address;
  this.smartWalletBrokerAddress = smart_wallet_broker;
  this.depositContractRegistryAddress = deposit_contract_registry_address;
  this.dydxSoloContractAddress = dydx_solo_contract_address;
  this.dydxPayableProxyContractAddress = dydx_payable_proxy_contract_address;
  this.marginTradingContractAddress = margin_trade_settlement_contract_address;
  this.serverTime = server_time;
  this.timeZone = time_zone;
  this.minMakerTradeSizeUsd = new _BigNumber["default"](min_usd_maker_trade_amount);
  this.minTakerTradeSizeUsd = new _BigNumber["default"](min_usd_taker_trade_amount);
  this.makerFee = maker_fee_percentage;
  this.takerFee = taker_fee_percentage;
  this.lowerTakerFee = lower_taker_fee_percentage;
  this.lowerTakerFeePercentageUsd = new _BigNumber["default"](lower_taker_fee_percentage_threshold_usd);
  this.maxFillCount = max_number_of_taker_matches_per_order;
  this.feePerFill = _BigNumber["default"].mapped(base_spot_trading_fee_amounts);
  this.feePerFillEth = this.feePerFill.WETH;
  this.feeForDepositContractCreation = _BigNumber["default"].mapped(create_deposit_contract_fee_amounts);
  this.feeForSmartWalletTransfer = _BigNumber["default"].mapped(smart_wallet_transfer_fee_amounts);
  this.premiumForMarginTrade = _BigNumber["default"].mapped(margin_trading_fee_premium_amounts);
  this.premiumForSpotTrade = _BigNumber["default"].mapped(spot_trading_fee_premium_amounts);
};

exports["default"] = ExchangeInfo;