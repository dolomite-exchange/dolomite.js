"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ZERO_RAW = {
  amount: 0,
  currency: {
    precision: 0,
    display_precision: 0
  }
};
/*
 * Used for numbers provided by the API in the format:
 * {
 *   amount: <int>
 *   currency: {
 *     ticker: <string>,
 *     precision: <int>,
 *     display_precision: <int>
 *   }
 * }
 */

var BigNumber = /*#__PURE__*/function () {
  function BigNumber(input) {
    _classCallCheck(this, BigNumber);

    var _ref = input || ZERO_RAW,
        amount = _ref.amount,
        currency = _ref.currency;

    var localeStringOptions = {
      useGrouping: false
    };
    amount = typeof amount === 'string' ? amount : amount.toLocaleString('en-US', localeStringOptions);
    this.raw = {
      amount: amount,
      currency: currency
    };
    this.valueBN = !!amount ? new _bn["default"](amount) : new _bn["default"]('0');
    this.value = typeof amount === 'string' ? Number.parseFloat(amount) : amount;
    this.valueString = typeof amount === 'number' ? amount.toLocaleString('en-US', localeStringOptions) : amount;
    this.currency = {
      ticker: currency.ticker,
      precision: currency.precision,
      displayPrecision: currency.display_precision
    };
    this.precision = this.currency.precision;
    this.amount = this.value / Math.pow(10, this.precision);
  }

  _createClass(BigNumber, [{
    key: "modify",
    value: function modify(callback) {
      this.value = callback(this.value);
      this.amount = this.value / Math.pow(10, this.precision);
      return this;
    }
  }, {
    key: "calc",
    value: function calc(callback) {
      var dup = this.dup;
      dup.modify(callback);
      return dup;
    }
  }, {
    key: "dup",
    get: function get() {
      return new BigNumber(this.raw);
    }
  }], [{
    key: "build",
    value: function build(value, precision) {
      var ticker = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return new BigNumber({
        amount: value,
        currency: {
          precision: precision,
          display_precision: precision,
          ticker: ticker
        }
      });
    }
  }, {
    key: "fromFloat",
    value: function fromFloat(number) {
      var ticker = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var num = parseFloat(number);
      var fractional = num.toString().split('.')[1];
      var decimals = fractional ? fractional.length : 0;
      var amount = num * Math.pow(10, decimals);
      return BigNumber.build(amount, decimals, ticker);
    }
  }, {
    key: "mapped",
    value: function mapped(rawMap) {
      var map = {};
      Object.entries(rawMap).forEach(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            key = _ref3[0],
            val = _ref3[1];

        map[key] = new BigNumber(val);
      });
      return map;
    }
  }]);

  return BigNumber;
}();

exports["default"] = BigNumber;