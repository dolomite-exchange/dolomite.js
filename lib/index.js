"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.slate = exports.exchange = void 0;

var _Exchange = _interopRequireDefault(require("./Exchange/Exchange"));

var _Slate = _interopRequireDefault(require("./Slate/Slate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var exchange = _Exchange["default"];
exports.exchange = exchange;
var slate = _Slate["default"];
exports.slate = slate;
var _default = {
  exchange: exchange,
  slate: slate
};
exports["default"] = _default;