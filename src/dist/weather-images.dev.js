"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.createIconElement = void 0;

var _d = _interopRequireDefault(require("./img/01d.svg"));

var _n = _interopRequireDefault(require("./img/01n.svg"));

var _d2 = _interopRequireDefault(require("./img/02d.svg"));

var _n2 = _interopRequireDefault(require("./img/02n.svg"));

var _d3 = _interopRequireDefault(require("./img/03d.svg"));

var _n3 = _interopRequireDefault(require("./img/03n.svg"));

var _d4 = _interopRequireDefault(require("./img/04d.svg"));

var _n4 = _interopRequireDefault(require("./img/04n.svg"));

var _d5 = _interopRequireDefault(require("./img/09d.svg"));

var _n5 = _interopRequireDefault(require("./img/09n.svg"));

var _d6 = _interopRequireDefault(require("./img/10d.svg"));

var _n6 = _interopRequireDefault(require("./img/10n.svg"));

var _d7 = _interopRequireDefault(require("./img/11d.svg"));

var _n7 = _interopRequireDefault(require("./img/11n.svg"));

var _d8 = _interopRequireDefault(require("./img/13d.svg"));

var _n8 = _interopRequireDefault(require("./img/13n.svg"));

var _d9 = _interopRequireDefault(require("./img/50d.svg"));

var _n9 = _interopRequireDefault(require("./img/50n.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var weatherIcons = {
  '01d': _d["default"],
  '01n': _n["default"],
  '02d': _d2["default"],
  '02n': _n2["default"],
  '03d': _d3["default"],
  '03n': _n3["default"],
  '04d': _d4["default"],
  '04n': _n4["default"],
  '09d': _d5["default"],
  '09n': _n5["default"],
  '10d': _d6["default"],
  '10n': _n6["default"],
  '11d': _d7["default"],
  '11n': _n7["default"],
  '13d': _d8["default"],
  '13n': _n8["default"],
  '50d': _d9["default"],
  '50n': _n9["default"]
};

var createIconElement = function createIconElement(icon) {
  var element = document.createElement('img');
  element.classList = 'img-fluid weather-icon-img';
  element.setAttribute('src', icon);
  element.setAttribute('alt', 'current weather icon');
  return element;
};

exports.createIconElement = createIconElement;
var _default = weatherIcons;
exports["default"] = _default;