
const isWithdrawalSupported = (method) => 
  method.status === 'ACTIVE' &&
  !method.isDisabled &&
  method.supportsWithdrawals &&
  method.withdrawableTickers.includes('USD') &&
  method.withdrawalAddresses.ETH !==  null;

class PaymentMethod {
  constructor({ trade_account_payment_method_id, created_at, name, nickname, default_ticker,
    status, type, method_name, last_four_digits, brand, country_code, is_disabled,
    is_deposits_supported, is_payments_supported, chargeable_currency_tickers, depositable_currency_tickers,
    blockchain_deposit_addresses, min_charge_amount, max_charge_amount, min_deposit_amount, max_deposit_amount, 
    method_expiration_display }) {
    
    this.id = trade_account_payment_method_id;
    this.transferType = type;
    this.countryCode = country_code;
    
    this.status = status;
    this.isDisabled = is_disabled;
    this.supportsWithdrawals = is_deposits_supported; // Withdrawal from crypto to bank
    this.supportsDeposits = is_payments_supported; // Deposit from bank to crypto
    
    this.defaultTicker = default_ticker;
    this.depositableTickers = chargeable_currency_tickers || []; // Withdrawal from crypto to bank
    this.withdrawableTickers = depositable_currency_tickers || []; // Deposit from bank to crypto
    this.withdrawalAddresses = blockchain_deposit_addresses || {};

    this.minWithdrawalAmount = min_charge_amount;
    this.maxWithdrawalAmount = max_charge_amount;
    this.minDepositAmount = min_deposit_amount;
    this.maxDepositAmount = max_deposit_amount;

    this.name = name;
    this.nickname = nickname;
    this.lastFourDigits = last_four_digits;

    this.methodBrand = brand;
    this.methodName = method_name;
    this.methodExpirationDisplay = method_expiration_display;

    this.createdAt = new Date(created_at);

    // Custom fields
    this.isDirectCryptoWithdrawalSupported = isWithdrawalSupported(this);
    this.cryptoWithdrawalAddress = this.withdrawalAddresses.ETH;
  }

  static build(paymentMethodsJson) {
    return paymentMethodsJson.map(paymentMethod => new PaymentMethod(paymentMethod));
  }
}

export default PaymentMethod;
