"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Friend = /*#__PURE__*/function () {
  function Friend(_ref) {
    var wallet_address = _ref.wallet_address,
        creation_timestamp = _ref.creation_timestamp;

    _classCallCheck(this, Friend);

    this.address = wallet_address;
    this.creationTimestamp = creation_timestamp;
  }

  _createClass(Friend, null, [{
    key: "build",
    value: function build(friendJsonArray) {
      return friendJsonArray.map(function (friendJson) {
        return new Friend(friendJson);
      });
    }
  }]);

  return Friend;
}();

exports["default"] = Friend;