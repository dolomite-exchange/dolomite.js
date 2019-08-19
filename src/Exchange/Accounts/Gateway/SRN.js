
class SRN {
  constructor({ type, sub_type, identifier }) {
    this.type = type;
    this.subType = sub_type;
    this.identifier = identifier;
  }
}

SRN.Type = {
  PAYMENT_METHOD: 'PAYMENT_METHOD',
  ETHEREUM_ADDRESS: 'ETHEREUM_ADDRESS',
};

SRN.SubType = {
  ACH: 'ach',
  WIRE: 'wire'
};

export default SRN;
