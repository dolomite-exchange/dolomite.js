import BigNumber from '../../common/BigNumber';
import TokenSummary from '../Tokens/TokenSummary';

const toSide = (_from, _to, owner) => {
  if (owner === _to) return Transfer.Side.RECEIVED;
  if (owner === _from) return Transfer.Side.SENT;
  return Transfer.Side.UNKNOWN;
}

export default class Transfer {
  constructor({ dolomite_token_id, token_summary, primary_wallet_address, event_type, transaction_cost_crypto, 
    transaction_cost_value, transaction_amount_token, is_transaction_successful, dolomite_transaction_id, ethereum_log_index, 
    transaction_hash, timestamp, block_height, secondary_wallet_address, transaction_amount_value, is_contract_address }, ownerAddress) {

    this.id = dolomite_transaction_id;
    this.transactionHash = transaction_hash;
    this.fromAddress = primary_wallet_address;
    this.toAddress = secondary_wallet_address;
    this.side = toSide(this.fromAddress, this.toAddress, ownerAddress);
    this.timestamp = new Date(parseInt(timestamp));
    this.block = block_height;
    this.type = event_type;
    this.fee = new BigNumber(transaction_cost_crypto);
    this.feeFiat = new BigNumber(transaction_cost_value);
    this.value = new BigNumber(transaction_amount_token);
    this.valueFiat = new BigNumber(transaction_amount_value);
    this.isSuccessful = is_transaction_successful;
    this.ethereumLogIndex = ethereum_log_index;
    this.isContractAddress = is_contract_address
    this.tokenId = dolomite_token_id;
    this.token = new TokenSummary(token_summary);
  }

  static build(transferArratJson, ownerAddress) {
    return transferArratJson.map(transferJson => new Transfer(transferJson, ownerAddress));
  }
}

Transfer.Type = {
  ETHER: 'ETHER-TRANSFER',
  CONTRACT: 'CONTRACT-CALLED',
  CONTRACT_CREATED: 'CONTRACT-CREATED',
  TOKEN: 'TOKEN-TRANSFER',
  TOKEN_APPROVAL: 'TOKEN-APPROVAL',
  TOKEN_APPROVAL_RESET: 'TOKEN-APPROVAL-RESET',
  WETH_DEPOSIT: 'WETH-DEPOSIT',
  WETH_WITHDRAWAL: 'WETH-WITHDRAWAL',
  BLOCK_MINED: 'BLOCK-MINED',
  UNCLE_BLOCK_MINED: 'UNCLE-MINED',
  TRANSACTION_CANCELLED: 'TRANSACTION-CANCELLED'
};

Transfer.Side = {
  SENT: 'SENT',
  RECEIVED: 'RECEIVED',
  UNKNOWN: 'UNKNOWN'
};

Transfer.Types = Object.values(Transfer.Type);
Transfer.Sides = Object.values(Transfer.Side);
