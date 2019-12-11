"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PrepareMessage = function PrepareMessage(_ref) {
  var prepare_message = _ref.prepare_message,
      prepare_id = _ref.prepare_id;

  _classCallCheck(this, PrepareMessage);

  this.message = prepare_message;
  this.id = prepare_id;
};

var _default = PrepareMessage;
exports["default"] = _default;