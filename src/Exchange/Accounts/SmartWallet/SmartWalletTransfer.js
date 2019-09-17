import BigNumber from '../../../common/BigNumber';

export default class SmartWalletTransfer {
  constructor({ transfer_id, transaction_hash, sender_address, receiver_address, amount, block_timestamp }, isPending) {
    this.id = transfer_id;
    this.transactionHash = transaction_hash;
    this.sender = sender_address;
    this.recipient = receiver_address;
    this.amount = new BigNumber(amount);
    this.isPending = isPending;
    this.timestamp = block_timestamp;
  }

  static build(transferArray, isPending) {
    return transferArray.map(transferJson => new SmartWalletTransfer(transferJson, isPending));
  }
}
