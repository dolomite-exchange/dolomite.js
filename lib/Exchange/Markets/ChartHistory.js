"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ChartingBar = void 0;

var _BigNumber = _interopRequireDefault(require("../../common/BigNumber"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Details of a market graph bar
 */
var ChartingBar =
/*#__PURE__*/
function () {
  function ChartingBar(_ref) {
    var timestamp = _ref.timestamp,
        close_price = _ref.close_price,
        open_price = _ref.open_price,
        period_high = _ref.period_high,
        period_low = _ref.period_low,
        volume = _ref.volume;

    _classCallCheck(this, ChartingBar);

    this.timestamp = parseFloat(timestamp);
    this.closePrice = new _BigNumber["default"](close_price);
    this.openPrice = new _BigNumber["default"](open_price);
    this.highPrice = new _BigNumber["default"](period_high);
    this.lowPrice = new _BigNumber["default"](period_low);
    this.volume = new _BigNumber["default"](volume);
  }

  _createClass(ChartingBar, null, [{
    key: "build",
    value: function build(barArray) {
      return (barArray || []).map(function (barJson) {
        return new ChartingBar(barJson);
      });
    }
  }]);

  return ChartingBar;
}();

exports.ChartingBar = ChartingBar;
ChartingBar.Interval = {
  _1m: '1m',
  _5m: '5m',
  _15m: '15m',
  _30m: '30m',
  _1h: '1h',
  _4h: '4h',
  _1d: '1d'
};
ChartingBar.Intervals = Object.values(ChartingBar.Interval);
/*
 * Chart History for market graph
 */

var ChartHistory =
/*#__PURE__*/
function (_Array) {
  _inherits(ChartHistory, _Array);

  function ChartHistory(_ref2) {
    var _this2;

    var _this;

    var trading_view_params = _ref2.trading_view_params,
        chart_objects = _ref2.chart_objects;

    _classCallCheck(this, ChartHistory);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ChartHistory).call(this));
    var data = ChartingBar.build(chart_objects);
    _this.params = trading_view_params;

    (_this2 = _this).push.apply(_this2, _toConsumableArray(data));

    return _this;
  }

  return ChartHistory;
}(_wrapNativeSuper(Array));

exports["default"] = ChartHistory;