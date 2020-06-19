"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rate = function Rate(_ref) {
  var _this = this;

  var quote = _ref.quote;

  _classCallCheck(this, Rate);

  Object.keys(quote).forEach(function (baseTicker) {
    _this[baseTicker] = quote[baseTicker].exchange_rate;
  });
};

var ExchangeRates = /*#__PURE__*/function () {
  function ExchangeRates(rates) {
    var _this2 = this;

    _classCallCheck(this, ExchangeRates);

    Object.keys(rates).forEach(function (dolomiteId) {
      _this2[dolomiteId] = new Rate(rates[dolomiteId]);
      ;
    });
  }

  _createClass(ExchangeRates, [{
    key: "from",
    value: function from(amount, dolomiteId) {
      var _this3 = this;

      var to = function to(baseTicker) {
        var token = _this3[dolomiteId] || {};
        var rate = token[baseTicker];
        if (!rate) return null;
        return rate * amount;
      };

      return {
        to: to
      };
    }
  }, {
    key: "fromBase",
    value: function fromBase(amount, baseTicker) {
      var _this4 = this;

      var to = function to(dolomiteId) {
        var token = _this4[dolomiteId] || {};
        var rate = token[baseTicker];
        if (!rate) return null;
        return amount / rate;
      };

      return {
        to: to
      };
    }
  }]);

  return ExchangeRates;
}();

exports["default"] = ExchangeRates;