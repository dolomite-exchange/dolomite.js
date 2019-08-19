"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SRN = function SRN(_ref) {
  var type = _ref.type,
      sub_type = _ref.sub_type,
      identifier = _ref.identifier;

  _classCallCheck(this, SRN);

  this.type = type;
  this.subType = sub_type;
  this.identifier = identifier;
};

SRN.Type = {
  PAYMENT_METHOD: 'PAYMENT_METHOD',
  ETHEREUM_ADDRESS: 'ETHEREUM_ADDRESS'
};
SRN.SubType = {
  ACH: 'ach',
  WIRE: 'wire'
};
var _default = SRN;
exports["default"] = _default;