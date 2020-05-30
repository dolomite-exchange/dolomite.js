"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _WSConnection = _interopRequireDefault(require("./WSConnection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * 
 */
var WSManager =
/*#__PURE__*/
function () {
  function WSManager() {
    _classCallCheck(this, WSManager);

    this.mocks = {};
    this.connection = _WSConnection["default"].none;
  }

  _createClass(WSManager, [{
    key: "onReconnect",
    value: function onReconnect(callback) {
      this.connection.onReconnect(callback);
    }
  }, {
    key: "subscribe",
    value: function subscribe(route, action, callback) {
      this.connection.subscribe(route, action, callback);
    }
  }, {
    key: "send",
    value: function send(route, action, payload) {
      return this.connection.send(route, action, payload);
    }
  }, {
    key: "setConnection",
    value: function setConnection(connection) {
      var previousConnection = this.connection;
      previousConnection.disconnect();
      connection.addSubscriptions(previousConnection.getSubscriptions());
      this.connection = connection;
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      this.connection.disconnect();
      this.connection = _WSConnection["default"].none;
    }
  }, {
    key: "isConnected",
    value: function isConnected() {
      var conn = this.connection || {
        isConnected: function isConnected() {
          return false;
        }
      };
      return conn.isConnected() || false;
    }
  }]);

  return WSManager;
}();

exports["default"] = WSManager;