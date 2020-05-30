"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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

var BigNumber =
/*#__PURE__*/
function () {
  function BigNumber(input) {
    _classCallCheck(this, BigNumber);

    var _ref = input || ZERO_RAW,
        amount = _ref.amount,
        currency = _ref.currency;

    this.raw = {
      amount: amount,
      currency: currency
    };
    this.value = amount;
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