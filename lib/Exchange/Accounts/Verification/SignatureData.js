"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DOMAIN_SCHEME = [{
  name: "name",
  type: "string"
}, {
  name: "version",
  type: "string"
}];
var DOMAIN_DATA = {
  name: 'Dolomite',
  version: '1.0'
};

var _default = function _default(typeName, scheme, message) {
  return {
    types: _defineProperty({
      EIP712Domain: DOMAIN_SCHEME
    }, typeName, scheme),
    domain: DOMAIN_DATA,
    primaryType: typeName,
    message: message
  };
};

exports["default"] = _default;