
const DOMAIN_SCHEME = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
]

const DOMAIN_DATA = {
  name: 'Dolomite',
  version: '1.0'
} 

export default (typeName, scheme, message) => ({
  types: {
    EIP712Domain: DOMAIN_SCHEME,
    [typeName]: scheme,
  },
  domain: DOMAIN_DATA,
  primaryType: typeName,
  message: message
});
