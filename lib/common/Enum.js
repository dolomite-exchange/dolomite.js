"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Usage:
 * export const MyEnum = Enum.create('ONE', 'TWO')
 */
var Enum = /*#__PURE__*/function () {
  function Enum() {
    _classCallCheck(this, Enum);
  }

  _createClass(Enum, null, [{
    key: "create",
    value: function create() {
      var enumMapping = {};

      for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
      }

      values.forEach(function (value) {
        return enumMapping[value] = value;
      });
      return enumMapping;
    }
  }]);

  return Enum;
}();

exports["default"] = Enum;