import BigNumber from '../../common/BigNumber';

/*
 * Basic information about the Exchange
 */
export default class ExchangeInfo {
  constructor({ base_spot_trading_fee_amounts, black_listed_email_domains, 
    fee_collecting_wallet_address, loopring_contract_address, loopring_delegate_address, 
    maker_fee_percentage, max_number_of_taker_matches_per_order, min_usd_maker_trade_amount, 
    min_usd_taker_trade_amount, server_time, taker_fee_percentage, time_zone }) {
    
    this.loopringContractAddress = loopring_contract_address;
    this.loopringDelegateAddress = loopring_delegate_address;
    this.feeCollectingWalletAddress = fee_collecting_wallet_address;
    this.serverTime = server_time;
    this.timeZone = time_zone;
    this.minMakerTradeSizeUsd = new BigNumber(min_usd_maker_trade_amount);
    this.minTakerTradeSizeUsd = new BigNumber(min_usd_taker_trade_amount);
    this.makerFee = maker_fee_percentage;
    this.takerFee = taker_fee_percentage;
    this.maxFillCount = max_number_of_taker_matches_per_order;
    this.feePerFill = BigNumber.mapped(base_spot_trading_fee_amounts);
    this.feePerFillEth = this.feePerFill.WETH
  }
}
