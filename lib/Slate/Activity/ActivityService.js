"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Service2 = _interopRequireDefault(require("../../common/Service"));

var _Transfer = _interopRequireDefault(require("./Transfer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var asString = function asString(o, grab) {
  return !o || typeof o === 'string' || o instanceof String ? o : grab(o);
};

var ActivityService = /*#__PURE__*/function (_Service) {
  _inherits(ActivityService, _Service);

  var _super = _createSuper(ActivityService);

  function ActivityService() {
    _classCallCheck(this, ActivityService);

    return _super.apply(this, arguments);
  }

  _createClass(ActivityService, [{
    key: "getTransfers",
    /////////////////////////
    value: function getTransfers(address) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var token = asString(options.token, function (t) {
        return t.contractAddress || t.ticker;
      });
      return this.pageable('transfers').build(function (data) {
        return _Transfer["default"].build(data, address);
      }).get(options, {
        address: address,
        token: token
      });
    }
  }, {
    key: "getTokenTransfers",
    value: function getTokenTransfers(address) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var token = asString(options.token, function (t) {
        return t.contractAddress || t.ticker;
      });
      return this.pageable('tokenTransfers').build(function (data) {
        return _Transfer["default"].build(data, address);
      }).get(options, {
        address: address,
        token: token
      });
    }
  }, {
    key: "watchTransfers",
    value: function watchTransfers(address) {
      this.watchedTransferAddress = address;
      return this.send('/v1/wallets/-address-/events', 'subscribe', {
        address: address
      });
    }
  }, {
    key: "onTransferUpdate",
    value: function onTransferUpdate(callback) {
      var _this = this;

      this.on('/v1/wallets/-address-/events', 'insert').build(function (data) {
        return _Transfer["default"].build(data, _this.watchedTransferAddress);
      }).then(callback);
    }
  }]);

  return ActivityService;
}(_Service2["default"]);

exports["default"] = ActivityService;

_defineProperty(ActivityService, "routes", {
  transfers: {
    get: '/v1/wallets/:address/events'
  },
  tokenTransfers: {
    get: '/v1/wallets/:address/events/:token'
  }
});

_defineProperty(ActivityService, "exports", {
  Transfer: _Transfer["default"]
});