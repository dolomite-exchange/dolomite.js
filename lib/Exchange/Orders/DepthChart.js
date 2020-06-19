"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.OrderDepth = void 0;

var _BigNumber = _interopRequireDefault(require("../../common/BigNumber"));

var _Order = _interopRequireDefault(require("./Order"));

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

var groupBy = function groupBy(arr, match) {
  return arr.reduce(function (obj, item) {
    var key = match(item);
    obj[key] = obj[key] || [];
    obj[key].push(item);
    return obj;
  }, {});
};

var sum = function sum(arr, match) {
  return arr.reduce(function (total, item) {
    return total.add(match(item));
  }, new _bn["default"]('0'));
};

var oldestToYoungest = function oldestToYoungest(a, b) {
  return a.creationTimestamp - b.creationTimestamp;
};
/*
 * Volume (Depth) of sell or buy orders at a price
 */


var OrderDepth = /*#__PURE__*/function () {
  function OrderDepth(_ref) {
    var primary_amount = _ref.primary_amount,
        secondary_amount = _ref.secondary_amount,
        amount_usd = _ref.amount_usd,
        exchange_rate = _ref.exchange_rate,
        ordered_primary_fill_amounts = _ref.ordered_primary_fill_amounts,
        ordered_secondary_fill_amounts = _ref.ordered_secondary_fill_amounts,
        orders = _ref.orders;

    _classCallCheck(this, OrderDepth);

    this.quantity = new _BigNumber["default"](primary_amount);
    this.total = new _BigNumber["default"](secondary_amount);
    this.totalUsd = amount_usd && new _BigNumber["default"](amount_usd);
    this.price = _BigNumber["default"].fromFloat(exchange_rate);
    this.orders = orders || [];
    this.orderedPrimaryFillAmounts = ordered_primary_fill_amounts;
    this.orderedSecondaryFillAmounts = ordered_secondary_fill_amounts;
  }

  _createClass(OrderDepth, null, [{
    key: "build",
    value: function build(depthArray) {
      return depthArray.map(function (depthJson) {
        return new OrderDepth(depthJson);
      });
    }
  }, {
    key: "merge",
    value: function merge(price, orders) {
      var orderedOrders = orders.sort(oldestToYoungest);
      var totalOpenPrimaryBN = sum(orderedOrders, function (order) {
        return order.openAmountPrimary.valueBN;
      });
      var totalOpenSecondaryBN = sum(orderedOrders, function (order) {
        return order.openAmountSecondary.valueBN;
      });
      var primaryCurrency = orders[0].openAmountPrimary.raw.currency;
      var secondaryCurrency = orders[0].openAmountSecondary.raw.currency;
      return new OrderDepth({
        primary_amount: {
          amount: totalOpenPrimaryBN,
          currency: primaryCurrency
        },
        secondary_amount: {
          amount: totalOpenSecondaryBN,
          currency: secondaryCurrency
        },
        exchange_rate: price,
        orders: orderedOrders,
        ordered_primary_fill_amounts: orderedOrders.map(function (order) {
          return order.openAmountPrimary;
        }),
        ordered_secondary_fill_amounts: orderedOrders.map(function (order) {
          return order.openAmountSecondary;
        })
      });
    }
  }]);

  return OrderDepth;
}();
/*
 * Holds the OrderDepths for buy and sell orders
 */


exports.OrderDepth = OrderDepth;

var OrderDepthChart = /*#__PURE__*/function () {
  function OrderDepthChart(pair, buys, sells) {
    _classCallCheck(this, OrderDepthChart);

    this.marketPair = pair;
    this.buyDepths = buys;
    this.sellDepths = sells;
  }

  _createClass(OrderDepthChart, null, [{
    key: "build",
    value: function build(_ref2) {
      var market = _ref2.market,
          buys = _ref2.buys,
          sells = _ref2.sells;
      var buyDepths = OrderDepth.build(buys);
      var sellDepths = OrderDepth.build(sells);
      return new OrderDepthChart(market, buyDepths, sellDepths);
    }
  }, {
    key: "buildUnmerged",
    value: function buildUnmerged(_ref3) {
      var market = _ref3.market,
          buys = _ref3.buys,
          sells = _ref3.sells;

      var buyOrders = _Order["default"].build(buys);

      var sellOrders = _Order["default"].build(sells);

      var buyDepths = OrderDepthChart.mergeOrders(buyOrders);
      var sellDepths = OrderDepthChart.mergeOrders(sellOrders);
      return new OrderDepthChart(market, buyDepths, sellDepths);
    } // ----------------------------------------------

  }, {
    key: "mergeOrders",
    value: function mergeOrders(orders) {
      var grouped = groupBy(orders, function (order) {
        return order.price;
      });
      return Object.entries(grouped).map(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            price = _ref5[0],
            groupedOrders = _ref5[1];

        return OrderDepth.merge(price, groupedOrders);
      });
    }
  }]);

  return OrderDepthChart;
}();

exports["default"] = OrderDepthChart;