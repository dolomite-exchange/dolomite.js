"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Service2 = _interopRequireDefault(require("../../common/Service"));

var _Order = _interopRequireDefault(require("./Order"));

var _DepthChart = _interopRequireDefault(require("./DepthChart"));

var _OrderFill = _interopRequireDefault(require("./OrderFill"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var OrderService =
/*#__PURE__*/
function (_Service) {
  _inherits(OrderService, _Service);

  function OrderService() {
    _classCallCheck(this, OrderService);

    return _possibleConstructorReturn(this, _getPrototypeOf(OrderService).apply(this, arguments));
  }

  _createClass(OrderService, [{
    key: "prepareOrder",
    /////////////////////////
    // ----------------------------------------------
    // Order Management
    value: function prepareOrder(order) {
      return this.post('prepareOrders', order);
    }
  }, {
    key: "createOrder",
    value: function createOrder(order) {
      return this.post('orders', order);
    } // Send up transaction hash which the order depends on
    // - Order won't be submitted until transaction is confirmed

  }, {
    key: "createDependentOrder",
    value: function createDependentOrder(order) {
      return this.post('dependentOrders', order);
    }
  }, {
    key: "cancelOrder",
    value: function cancelOrder(_ref) {
      var orderHash = _ref.orderHash,
          dolomiteOrderId = _ref.dolomiteOrderId,
          owner = _ref.owner,
          v = _ref.v,
          r = _ref.r,
          s = _ref.s,
          timestamp = _ref.timestamp;
      return this.post('cancelOrders', {
        dolomite_order_id_param: dolomiteOrderId,
        owner_address: owner,
        ecdsa_signature: {
          v: v,
          r: r,
          s: s
        },
        cancellation_timestamp: timestamp
      });
    } // ----------------------------------------------
    // Market Depth Chart

  }, {
    key: "getDepthChart",
    value: function getDepthChart(primaryTicker, secondaryTicker) {
      var pair = "".concat(primaryTicker, "-").concat(secondaryTicker);
      return this.get('depth', {
        pair: pair
      }).then(function (body) {
        return _DepthChart["default"].buildUnmerged(body.data);
      });
    }
  }, {
    key: "watchDepthChart",
    value: function watchDepthChart(market) {
      return this.send('/v1/orders/markets/-market-/depth/unmerged', 'subscribe', {
        market: market
      });
    }
  }, {
    key: "onDepthChartUpdate",
    value: function onDepthChartUpdate(callback) {
      this.on('/v1/orders/markets/-market-/depth/unmerged', 'update').build(function (data) {
        return _DepthChart["default"].buildUnmerged(data);
      }).then(callback);
    } // ----------------------------------------------
    // Order Fills

  }, {
    key: "getFills",
    value: function getFills(primaryTicker, secondaryTicker, _ref2) {
      var status = _ref2.status,
          side = _ref2.side,
          type = _ref2.type,
          page = _ref2.page,
          pageSize = _ref2.pageSize;
      return this.get('orderFills', {
        pair: "".concat(primaryTicker, "-").concat(secondaryTicker),
        status: status,
        side: side,
        type: type,
        page: page,
        page_size: pageSize
      }).then(function (body) {
        return _OrderFill["default"].build(body.data);
      });
    }
  }, {
    key: "watchFills",
    value: function watchFills(market) {
      return this.send('/v1/orders/markets/-market-/fills', 'subscribe', {
        market: market
      });
    }
  }, {
    key: "onFillsUpdate",
    value: function onFillsUpdate(callback) {
      this.on('/v1/orders/markets/-market-/fills', 'insert').build(function (data) {
        return _OrderFill["default"].build(data);
      }).then(callback);
    }
  }]);

  return OrderService;
}(_Service2["default"]);

exports["default"] = OrderService;

_defineProperty(OrderService, "routes", {
  orders: {
    get: '/v1/orders/markets/:pair',
    post: '/v1/orders/create'
  },
  orderFills: {
    get: '/v1/orders/markets/:pair/fills'
  },
  depth: {
    get: '/v1/orders/markets/:pair/depth/unmerged'
  },
  dependentOrders: {
    post: '/v1/orders/create/after-tx'
  },
  cancelOrders: {
    post: '/v1/orders/:dolomite_order_id_param/cancel'
  },
  prepareOrders: {
    post: '/v1/orders/prepare'
  }
});

_defineProperty(OrderService, "exports", {
  Order: _Order["default"],
  OrderDepthChart: _DepthChart["default"],
  OrderFill: _OrderFill["default"]
});