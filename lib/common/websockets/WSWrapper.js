"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Wrap a conventional HTTP/S get request into
 * a websocket esque interface.
 */
var WSWrapper = /*#__PURE__*/function () {
  function WSWrapper(requestCallback) {
    var _this = this;

    var interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

    _classCallCheck(this, WSWrapper);

    this.requestCallback = requestCallback;
    this.subscribers = [];

    if (interval > 0) {
      this.intervalId = setInterval(function () {
        return _this.trigger();
      }, interval * 1000);
    }
  }

  _createClass(WSWrapper, [{
    key: "trigger",
    value: function trigger() {
      var response = this.requestCallback();
      if (response) this.resolve(response);
    }
  }, {
    key: "subscribe",
    value: function subscribe(callback) {
      this.subscribers.push(callback);
    }
  }, {
    key: "resolve",
    value: function resolve(promise) {
      var _this2 = this;

      promise.then(function (data) {
        _this2.subscribers.forEach(function (callback) {
          return callback(data);
        });
      })["catch"](function (e) {});
    }
  }, {
    key: "kill",
    value: function kill() {
      this.subscribers = [];
      clearInterval(this.intervalId);
    }
  }]);

  return WSWrapper;
}();

exports["default"] = WSWrapper;