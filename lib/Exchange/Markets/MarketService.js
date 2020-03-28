"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Service2 = _interopRequireDefault(require("../../common/Service"));

var _WSWrapper = _interopRequireDefault(require("../../common/websockets/WSWrapper"));

var _Market = _interopRequireDefault(require("./Market"));

var _ChartHistory = _interopRequireWildcard(require("./ChartHistory"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MarketService = /*#__PURE__*/function (_Service) {
  _inherits(MarketService, _Service);

  var _super = _createSuper(MarketService);

  function MarketService() {
    _classCallCheck(this, MarketService);

    return _super.apply(this, arguments);
  }

  _createClass(MarketService, [{
    key: "getAll",
    /////////////////////////
    // ----------------------------------------------
    // Markets
    value: function getAll() {
      var period = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _Market["default"].Period.ONE_DAY;
      return this.get('markets', {
        period: period
      }).then(function (body) {
        return _Market["default"].hydrate(body.data, body.global_objects);
      });
    }
  }, {
    key: "watch",
    value: function watch() {
      return this.send('/v1/markets', 'subscribe');
    }
  }, {
    key: "onUpdate",
    value: function onUpdate(callback) {
      this.on('/v1/markets', 'update') // .build(data => Market.build(data)) // TODO: Implement this correctly when updated
      .then(callback);
    }
  }, {
    key: "onUpdateAll",
    value: function onUpdateAll(callback) {
      var _this = this;

      this.on('/v1/markets', 'update').then(function () {
        return _this.getAll().then(function (markets) {
          return callback(markets);
        });
      });
    } // ----------------------------------------------
    // Market Chart

  }, {
    key: "watchChart",
    value: function () {
      var _watchChart = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(market, interval) {
        var base,
            isDifferent,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                base = _args.length > 2 && _args[2] !== undefined ? _args[2] : 'CRYPTO';
                isDifferent = this.watchedMarket && this.watchedMarket !== market || this.watchedInterval && this.watchedInterval !== interval || this.watchedBase && this.watchedBase !== base;

                if (!isDifferent) {
                  _context.next = 5;
                  break;
                }

                _context.next = 5;
                return this.send('/v1/candlesticks/-market-', 'unsubscribe', {
                  market: this.watchedMarket,
                  interval: this.watchedInterval,
                  base_symbol: this.watchedBase
                });

              case 5:
                this.watchedMarket = market;
                this.watchedInterval = interval;
                this.watchedBase = base;
                return _context.abrupt("return", this.send('/v1/candlesticks/-market-', 'subscribe', {
                  market: market,
                  interval: interval,
                  base_symbol: base
                }));

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function watchChart(_x, _x2) {
        return _watchChart.apply(this, arguments);
      }

      return watchChart;
    }()
  }, {
    key: "requestChartHistory",
    value: function requestChartHistory(_ref) {
      var interval = _ref.interval,
          market = _ref.market,
          fromTimestamp = _ref.fromTimestamp,
          toTimestamp = _ref.toTimestamp,
          _ref$baseCurrency = _ref.baseCurrency,
          baseCurrency = _ref$baseCurrency === void 0 ? 'CRYPTO' : _ref$baseCurrency;
      return this.send('/v1/candlesticks/-market-', 'get_history_request', {
        market: market,
        interval: interval,
        from_timestamp: fromTimestamp,
        to_timestamp: toTimestamp,
        base_symbol: baseCurrency
      });
    }
  }, {
    key: "onChartHistoryResponse",
    value: function onChartHistoryResponse(callback) {
      this.on('/v1/candlesticks/-market-', 'get_history_response').build(function (data) {
        return new _ChartHistory["default"](data);
      }).then(callback);
    }
  }, {
    key: "onChartUpdate",
    value: function onChartUpdate(callback) {
      this.on('/v1/candlesticks/-market-', 'update').build(function (data) {
        return _ChartHistory.ChartingBar.build(data);
      }).then(callback);
    }
  }]);

  return MarketService;
}(_Service2["default"]);

exports["default"] = MarketService;

_defineProperty(MarketService, "routes", {
  markets: {
    get: '/v1/markets'
  }
});

_defineProperty(MarketService, "exports", {
  Market: _Market["default"],
  ChartHistory: _ChartHistory["default"],
  ChartingBar: _ChartHistory.ChartingBar
});