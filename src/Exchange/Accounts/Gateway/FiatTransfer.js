import SRN from './SRN';

const rounded = (n) => n && parseFloat(n.toFixed(5));
const toHistory = (history = []) => history.map(item => item);

const isValidPaymentMethod = (srn, requireAch = true) => 
  srn.type === SRN.Type.PAYMENT_METHOD && (!requireAch || srn.subType === SRN.SubType.ACH);
const isValidAddress = (srn) => srn.type === SRN.Type.ETHEREUM_ADDRESS;
const isWithdrawal = ({ source, destination }) => isValidAddress(source) && isValidPaymentMethod(destination, false);
const isDeposit = ({ source, destination }) => isValidPaymentMethod(source) && isValidAddress(destination);
const toType = (input) => (isWithdrawal(input) && FiatTransfer.Type.WITHDRAWAL)
  || (isDeposit(input) && FiatTransfer.Type.DEPOSIT) || null;

class FiatTransfer {
  constructor({ identifier, fee_amounts, total_fee_amount, transfer_gateway_status, source,
    destination, creation_timestamp, completed_timestamp, cancelled_timestamp,
    expiration_timestamp, status_history, source_ticker, source_amount,
    destination_ticker, destination_amount, exchange_rate, transaction_hash }) {
    
    this.id = identifier;
    this.fees = fee_amounts || {};
    this.feeTotal = rounded(total_fee_amount);
    this.status = transfer_gateway_status;
    this.source = new SRN(source);
    this.sourceTicker = source_ticker;
    this.sourceAmount = source_amount;
    this.destination = new SRN(destination);
    this.destinationTicker = destination_ticker;
    this.destinationAmount = rounded(destination_amount);
    this.exchangeRate = rounded(exchange_rate);
    this.reverseExchangeRate = rounded(1 / exchange_rate);
    this.blockchainTransaction = transaction_hash;
    this.history = toHistory(status_history);
    this.createdAt = new Date(creation_timestamp);
    this.cancelledAt = cancelled_timestamp && new Date(cancelled_timestamp);
    this.expiredAt = expiration_timestamp && new Date(expiration_timestamp);
    this.completedAt = completed_timestamp && new Date(completed_timestamp);

    // Custom fields
    this.type = toType({ source: this.source, destination: this.destination });
    this.isDolomiteTransfer = !!this.type;
    if (this.status == 'PREVIEW' && this.type === 'WITHDRAWAL') this.status = 'PENDING';
  }

  static build(transfersJson) {
    return transfersJson.map(transfer => new FiatTransfer(transfer));
  }
}

FiatTransfer.Type = {
  DEPOSIT: 'DEPOSIT',
  WITHDRAWAL: 'WITHDRAWAL'
}

export default FiatTransfer;
