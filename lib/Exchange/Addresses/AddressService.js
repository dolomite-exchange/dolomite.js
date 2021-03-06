"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Service2 = _interopRequireDefault(require("../../common/Service"));

var _WSWrapper = _interopRequireDefault(require("../../common/websockets/WSWrapper"));

var _Account = _interopRequireDefault(require("../Accounts/Account"));

var _Balance = _interopRequireWildcard(require("./Balance"));

var _Order = _interopRequireDefault(require("../Orders/Order"));

var _Position = _interopRequireDefault(require("../Orders/Position"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var AddressService = /*#__PURE__*/function (_Service) {
  _inherits(AddressService, _Service);

  var _super = _createSuper(AddressService);

  function AddressService() {
    _classCallCheck(this, AddressService);

    return _super.apply(this, arguments);
  }

  _createClass(AddressService, [{
    key: "watch",
    /////////////////////////
    value: function () {
      var _watch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ownerAddress, brokerAddress) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.watched && this.watched.ownerAddress !== ownerAddress)) {
                  _context.next = 3;
                  break;
                }

                _context.next = 3;
                return Promise.all([this.send('/v1/addresses/-address-/info', 'unsubscribe', {
                  address: this.watched.ownerAddress
                }), this.send('/v1/orders/addresses/-address-', 'unsubscribe', {
                  address: this.watched.ownerAddress
                }), this.send('/v1/orders/addresses/-address-/fills', 'unsubscribe', {
                  address: this.watched.ownerAddress
                }), this.send('/v1/margin-positions/addresses/-address-', 'unsubscribe', {
                  address: this.watched.ownerAddress
                }), this.send('/v1/addresses/-address-/portfolio', 'unsubscribe', {
                  address: this.watched.ownerAddress,
                  broker_address: this.watched.brokerAddress
                })]);

              case 3:
                this.watched = {
                  ownerAddress: ownerAddress,
                  brokerAddress: brokerAddress
                };

                if (ownerAddress) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", new Promise(function (resolve) {
                  return resolve();
                }));

              case 6:
                return _context.abrupt("return", Promise.all([this.send('/v1/addresses/-address-/info', 'subscribe', {
                  address: ownerAddress
                }), this.send('/v1/orders/addresses/-address-', 'subscribe', {
                  address: ownerAddress
                }), this.send('/v1/orders/addresses/-address-/fills', 'subscribe', {
                  address: ownerAddress
                }), this.send('/v1/margin-positions/addresses/-address-', 'subscribe', {
                  address: ownerAddress
                }), this.send('/v1/addresses/-address-/portfolio', 'subscribe', {
                  address: ownerAddress,
                  broker_address: brokerAddress
                })]));

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function watch(_x, _x2) {
        return _watch.apply(this, arguments);
      }

      return watch;
    }() // ----------------------------------------------
    // Portfolio

  }, {
    key: "getPortfolio",
    value: function getPortfolio(ownerAddress, brokerAddress) {
      var _this = this;

      return this.get('portfolio', {
        address: ownerAddress,
        broker_address: brokerAddress
      }).then(function (body) {
        _this.portfolioGlobals = body.global_objects;
        return _Balance["default"].hydrate(body.data, body.global_objects);
      });
    }
  }, {
    key: "onPortfolioUpdate",
    value: function onPortfolioUpdate(callback) {
      var _this2 = this;

      this.on('/v1/addresses/-address-/portfolio', 'update').then(function (data) {
        var fetchPortfolio = function fetchPortfolio() {
          var _ref = _this2.watched || {},
              ownerAddress = _ref.ownerAddress,
              brokerAddress = _ref.brokerAddress;

          _this2.getPortfolio(ownerAddress, brokerAddress).then(function (portfolio) {
            return callback(portfolio);
          });
        };

        if (_this2.portfolioGlobals) {
          try {
            callback(_Balance["default"].hydrate(data, _this2.portfolioGlobals));
          } catch (e) {
            fetchPortfolio();
          }
        } else {
          fetchPortfolio();
        }
      }); // TODO: remove this when portfolio ws is more stable

      if (!this.portfolioWS) this.portfolioWS = new _WSWrapper["default"](function () {
        if (!_this2.watched || !_this2.watched.ownerAddress) return null;
        return _this2.getPortfolio(_this2.watched.ownerAddress, _this2.watched.brokerAddress);
      }, 15); // update balances every 15s

      this.portfolioWS.subscribe(callback);
    } // ----------------------------------------------
    // Account

  }, {
    key: "getMarginInfo",
    value: function getMarginInfo(address) {
      return this.get('marginInfo', {
        address: address
      }).then(function (body) {
        return body.data;
      });
    }
  }, {
    key: "getAccount",
    value: function () {
      var _getAccount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(address) {
        var marginInfo, accountInfo;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.getMarginInfo(address);

              case 2:
                marginInfo = _context2.sent;
                _context2.next = 5;
                return this.get('info', {
                  address: address
                }).then(function (body) {
                  return body.data;
                });

              case 5:
                accountInfo = _context2.sent;
                return _context2.abrupt("return", new _Account["default"](_objectSpread({}, accountInfo, {
                  margin_details: marginInfo
                })));

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getAccount(_x3) {
        return _getAccount.apply(this, arguments);
      }

      return getAccount;
    }()
  }, {
    key: "onAccountUpdate",
    value: function onAccountUpdate(callback) {
      var _this3 = this;

      if (!this.accountWS) this.accountWS = new _WSWrapper["default"](function () {
        if (!_this3.watched || !_this3.watched.ownerAddress) return null;
        return _this3.getAccount(_this3.watched.ownerAddress).then(function (acc) {
          if (acc.isMarginTradingEnabled) _this3.accountWS.kill();
          return acc;
        });
      }, 15); // update account every 15s

      this.accountWS.subscribe(callback);
      return this.on('/v1/addresses/-address-/info', 'update').then(function () {
        if (_this3.watched && _this3.watched.ownerAddress) {
          return _this3.getAccount(_this3.watched.ownerAddress).then(function (acc) {
            return callback(acc);
          });
        }
      });
    } // ----------------------------------------------
    // Orders

  }, {
    key: "getOrders",
    value: function getOrders(address) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.get('orders', _objectSpread({
        address: address
      }, options)).then(function (body) {
        return _Order["default"].hydrate(body.data, body.global_objects);
      });
    }
  }, {
    key: "onOrdersUpdate",
    value: function onOrdersUpdate(callback) {
      this.on('/v1/orders/addresses/-address-', 'update').build(function (data) {
        return _Order["default"].build(data);
      }).then(callback);
    }
  }, {
    key: "onOrdersFillingUpdate",
    value: function onOrdersFillingUpdate(callback) {
      this.on('/v1/orders/addresses/-address-/fills', 'update').build(function (data) {
        return _Order["default"].build(data);
      }).then(callback);
    } // ----------------------------------------------
    // Positions

  }, {
    key: "getPositions",
    value: function () {
      var _getPositions = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(address) {
        var open, closed;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.get('openPositions', {
                  address: address
                }).then(function (body) {
                  return _Position["default"].hydrate(body.data, body.global_objects);
                });

              case 2:
                open = _context3.sent;
                _context3.next = 5;
                return this.get('closedPositions', {
                  address: address
                }).then(function (body) {
                  return _Position["default"].hydrate(body.data, body.global_objects);
                });

              case 5:
                closed = _context3.sent;
                return _context3.abrupt("return", [].concat(_toConsumableArray(open), _toConsumableArray(closed)));

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getPositions(_x4) {
        return _getPositions.apply(this, arguments);
      }

      return getPositions;
    }()
  }, {
    key: "onPositionsUpdate",
    value: function onPositionsUpdate(callback) {
      this.on('/v1/margin-positions/addresses/-address-', 'update').build(function (data) {
        return _Position["default"].build(data);
      }).then(callback);
    }
  }]);

  return AddressService;
}(_Service2["default"]);

exports["default"] = AddressService;

_defineProperty(AddressService, "routes", {
  portfolio: {
    get: '/v1/addresses/:address/portfolio'
  },
  info: {
    get: '/v1/addresses/:address/info'
  },
  orders: {
    get: '/v1/orders/addresses/:address'
  },
  marginInfo: {
    get: '/v1/addresses/:address/margin-info'
  },
  openPositions: {
    get: '/v1/margin-positions/addresses/:address/open'
  },
  closedPositions: {
    get: '/v1/margin-positions/addresses/:address/closed'
  }
});

_defineProperty(AddressService, "exports", {
  Balance: _Balance["default"]
});