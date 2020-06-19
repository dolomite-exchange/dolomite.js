"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * 
 */
var WSConnection = /*#__PURE__*/function () {
  function WSConnection(url) {
    _classCallCheck(this, WSConnection);

    this.url = url;
    this.subscribers = {};
  }

  _createClass(WSConnection, [{
    key: "setupStream",
    value: function setupStream(stream) {
      var _this = this;

      this.connected = true;
      this.stream = stream;

      this.stream.onmessage = function (message) {
        var event = JSON.parse(message.data);
        var route = event.route,
            action = event.action,
            data = event.data;

        _this.trigger(route, action, data);
      };

      this.stream.onclose = function () {
        _this.reestablish();
      };

      if (!this.pingInterval) this.pingInterval = setInterval(function () {
        _this.stream && _this.send(null, 'ping');

        if (_this.stream.readyState === WebSocket.CLOSED) {
          _this.reestablish();
        }
      }, 15000);
    }
  }, {
    key: "trigger",
    value: function trigger(route, action, data) {
      if (this.subscribers[route] && this.subscribers[route][action] && !!data) this.subscribers[route][action].forEach(function (callback) {
        setTimeout(function () {
          return callback(data);
        }, 0);
      });
    } //////////////////////
    // Interface Implementation

    /*
     * Establish a connection
     */

  }, {
    key: "establish",
    value: function establish() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var stream = new WebSocket(_this2.url);

        stream.onerror = function (error) {
          return reject({
            status: 'error'
          });
        };

        stream.onopen = function (open) {
          _this2.setupStream(stream);

          resolve({
            status: 'connected'
          });
        };
      });
    }
  }, {
    key: "reestablish",
    value: function reestablish() {
      var _this3 = this;

      console.log('Disconnected to webscoket');
      this.establish().then(function () {
        console.log('Reconnected to webscoket');
        var callbacks = _this3.subscribers['reconnect'] || [];
        callbacks.forEach(function (cb) {
          try {
            cb();
          } catch (e) {}
        });
      })["catch"](function (e) {
        console.error('Failed to reconnect to websocket: ' + e);
      });
    }
  }, {
    key: "isConnected",
    value: function isConnected() {
      return this.connected || false;
    }
  }, {
    key: "disconnect",
    value: function disconnect() {} // TODO: Implement

    /*
     * Add subscribtions 
     * Mainly used to prime subscriptions from a previous connection
     */

  }, {
    key: "addSubscriptions",
    value: function addSubscriptions(subscribers) {
      this.subscribers = _objectSpread({}, this.subscribers, {}, subscribers);
    }
    /*
     * Get the current subscriptions
     */

  }, {
    key: "getSubscriptions",
    value: function getSubscriptions() {
      return this.subscribers;
    }
    /*
     * Send an upstream request up to the websocket
     */

  }, {
    key: "send",
    value: function send(route, action, payload) {
      var _this4 = this;

      var attempt = function attempt() {
        return new Promise(function (resolve, reject) {
          try {
            var success = _this4.stream.send(JSON.stringify({
              route: route,
              action: action,
              data: payload
            }));

            resolve({
              status: 'sent'
            });
          } catch (e) {
            reject(e);
          }
        });
      };

      return attempt()["catch"](function () {
        return _this4.establish().then(function () {
          return attempt();
        });
      });
    }
    /*
     * Subscribe to a downstream event from the websocket
     */

  }, {
    key: "subscribe",
    value: function subscribe(route, action, callback) {
      if (!this.subscribers[route]) this.subscribers[route] = {};
      if (!this.subscribers[route][action]) this.subscribers[route][action] = [];
      this.subscribers[route][action].push(callback);
    }
    /*
     * Register callback for reconnection
     */

  }, {
    key: "onReconnect",
    value: function onReconnect(callback) {
      var key = 'reconnect';
      if (!this.subscribers[key]) this.subscribers[key] = [];
      this.subscribers[key].push(callback);
    }
  }], [{
    key: "none",
    get: function get() {
      return new WSConnection();
    }
  }]);

  return WSConnection;
}();

exports["default"] = WSConnection;
WSConnection["interface"] = {
  addSubscriptions: function addSubscriptions() {},
  getSubscriptions: function getSubscriptions() {
    return {};
  },
  establish: function establish(url) {
    return new Promise(function (res, rej) {
      return rej();
    });
  },
  disconnect: function disconnect() {},
  send: function send(route, action, payload) {
    return new Promise(function (res, rej) {
      return rej();
    });
  },
  subscribe: function subscribe(route, action, callback) {},
  isConnected: function isConnected() {
    return false;
  }
};