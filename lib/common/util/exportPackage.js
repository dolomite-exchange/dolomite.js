"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/*
 * export a Package instance from a `/packageName` directory
 */
var _default = function _default(registry, packageInstance) {
  Object.defineProperty(registry, '__esModule', {
    value: true
  });
  Object.keys(packageInstance.exports || {}).forEach(function (exportName) {
    registry[exportName] = (packageInstance.exports || {})[exportName];
  });
  registry['default'] = packageInstance;
};

exports["default"] = _default;