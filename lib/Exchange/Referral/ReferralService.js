"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AuthService2 = _interopRequireDefault(require("../../common/AuthService"));

var _Referral = _interopRequireDefault(require("./Referral"));

var _Friend = _interopRequireDefault(require("./Friend"));

var _Withdrawal = _interopRequireDefault(require("./Withdrawal"));

var _Commission = _interopRequireDefault(require("./Commission"));

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

var ReferralService = /*#__PURE__*/function (_AuthService) {
  _inherits(ReferralService, _AuthService);

  var _super = _createSuper(ReferralService);

  function ReferralService() {
    _classCallCheck(this, ReferralService);

    return _super.apply(this, arguments);
  }

  _createClass(ReferralService, [{
    key: "getInfo",
    value: function getInfo(address) {
      return this.get('info', {
        address: address
      }).then(function (body) {
        return new _Referral["default"](body.data);
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
    key: "getWithdrawalsByID",
    value: function getWithdrawalsByID(accountId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.pageable('withdrawalsByID').build(function (data) {
        return _Withdrawal["default"].build(data);
      }).get(options, {
        accountId: accountId
      });
    }
  }, {
    key: "getCommissionsByAddress",
    value: function getCommissionsByAddress(address) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.pageable('commissionsByAddress').build(function (data) {
        return _Commission["default"].build(data);
      }).get(options, {
        address: address
      });
    }
  }, {
    key: "getCommissionsByID",
    value: function getCommissionsByID(accountId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.pageable('commissionsByID').build(function (data) {
        return _Commission["default"].build(data);
      }).get(options, {
        accountId: accountId
      });
    }
  }, {
    key: "withdraw",
    value: function withdraw(address) {
      return this.requiresAuth.post('withdraw', {
        address: address
      });
    }
  }, {
    key: "watch",
    value: function () {
      var _watch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(address) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.watchAddress && this.watchAddress !== address)) {
                  _context.next = 3;
                  break;
                }

                _context.next = 3;
                return this.send('/v1/referrals/withdraw/-address-', 'unsubscribe', {
                  address: this.watchAddress
                });

              case 3:
                this.watchAddress = address;
                return _context.abrupt("return", this.send('/v1/referrals/withdraw/-address-', 'subscribe', {
                  address: address
                }));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function watch(_x) {
        return _watch.apply(this, arguments);
      }

      return watch;
    }()
  }, {
    key: "onWithdrawalsUpdate",
    value: function onWithdrawalsUpdate(callback) {
      this.on('/v1/referrals/withdraw/-address-', 'update').build(function (data) {
        return _Withdrawal["default"].build(data);
      }).then(callback);
    }
  }]);

  return ReferralService;
}(_AuthService2["default"]);

exports["default"] = ReferralService;

_defineProperty(ReferralService, "routes", {
  info: {
    get: '/v1/referrals/:address/info'
  },
  friends: {
    get: '/v1/referrals/referrer-addresses/:address/referred-accounts'
  },
  withdrawalsByID: {
    get: '/v1/referrals/:accountId/withdrawals'
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