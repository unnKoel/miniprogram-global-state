"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "persist", {
  enumerable: true,
  get: function () {
    return _persist.default;
  }
});
exports.default = void 0;

var _store = _interopRequireDefault(require("./store"));

var _persist = _interopRequireDefault(require("./persist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _store.default;
exports.default = _default;