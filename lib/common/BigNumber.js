"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var Web3 = _interopRequireWildcard(require("web3-utils"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
      useGrouping: false,
      maximumFractionDigits: 20
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
      var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var ticker = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      precision = precision || 18;
      var amountBN = new _bn["default"](Web3.toWei(number.toLocaleString('en-US', {
        useGrouping: false,
        maximumFractionDigits: 20
      })));
      return BigNumber.build(amountBN.div(new _bn["default"](10).pow(new _bn["default"](18 - precision))).toString(10), precision, ticker);
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