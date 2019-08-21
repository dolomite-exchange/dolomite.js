"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Service2 = _interopRequireDefault(require("../../common/Service"));

var _Referral = _interopRequireDefault(require("./Referral"));

var _Friend = _interopRequireDefault(require("./Friend"));

var _Withdrawal = _interopRequireDefault(require("./Withdrawal"));

var _Commission = _interopRequireDefault(require("./Commission"));

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

var ReferralService =
/*#__PURE__*/
function (_Service) {
  _inherits(ReferralService, _Service);

  function ReferralService() {
    _classCallCheck(this, ReferralService);

    return _possibleConstructorReturn(this, _getPrototypeOf(ReferralService).apply(this, arguments));
  }

  _createClass(ReferralService, [{
    key: "getInfo",
    value: function getInfo(address) {
      return this.get('info', {
        address: address
      }).then(function (body) {
        return new _Referral["default"](body.data);
      })["catch"](function (error) {
        console.log(error);
      });
    }
  }, {
    key: "getFriends",
    value: function getFriends(address) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.pageable('friends').build(function (data) {
        return _Friend["default"].build(data);
      }).get(options, {
        address: address
      });
    }
  }, {
    key: "getWithdrawals",
    value: function getWithdrawals(address) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.pageable('withdrawals').build(function (data) {
        return _Withdrawal["default"].build(data);
      }).get(options, {
        address: address
      });
    }
  }, {
    key: "getCommissionsByAddress",
    value: function getCommissionsByAddress(address) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.pageable('commissionsByAddress').build(function (data) {
        return _Withdrawal["default"].build(data);
      }).get(options, {
        address: address
      });
    }
  }, {
    key: "getCommissionsByID",
    value: function getCommissionsByID(address) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.pageable('commissionsByID').build(function (data) {
        return _Withdrawal["default"].build(data);
      }).get(options, {
        address: address
      });
    }
  }, {
    key: "withdraw",
    value: function withdraw(address) {
      return this.post('withdraw', {
        address: address
      });
    }
  }, {
    key: "watch",
    value: function watch(address) {
      return this.send('/v1/referrals/withdraw/-address-', 'subscribe', {
        address: address
      });
    }
  }, {
    key: "onWithdrawalsUpdate",
    value: function onWithdrawalsUpdate(callback) {
      this.on('/v1/referrals/withdraw/-address-', 'update').build(function (data) {
        return _Withdrawal["default"].build(data);
      }).then(callback);
    }
  }]);

  return ReferralService;
}(_Service2["default"]);

exports["default"] = ReferralService;

_defineProperty(ReferralService, "routes", {
  info: {
    get: '/v1/referrals/:address/info'
  },
  friends: {
    get: '/v1/referrals/:address/referred-accounts'
  },
  withdrawals: {
    get: '/v1/referrals/withdrawals'
  },
  withdraw: {
    post: '/v1/referrals/withdraw/:address'
  },
  commissionsByAddress: {
    get: '/v1/referrals/referrer-addresses/:address/commissions'
  },
  commissionsByID: {
    get: '/v1/referrals/referrer-accounts/:accountId/commissions'
  }
});

_defineProperty(ReferralService, "exports", {
  Referral: _Referral["default"],
  Friend: _Friend["default"]
});