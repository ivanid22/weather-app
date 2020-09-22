"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var stateManager = function stateManager() {
  var state = {};

  var setValue = function setValue(key, value) {
    state[key] = value;
  };

  var getValue = function getValue(key) {
    if (state[key]) return state[key];
    return null;
  };

  return {
    setValue: setValue,
    getValue: getValue
  };
};

var instance = null;

var _default = function _default() {
  if (!instance) instance = stateManager();
  return instance;
};

exports["default"] = _default;