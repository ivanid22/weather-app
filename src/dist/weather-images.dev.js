"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _christmasSnow = _interopRequireDefault(require("./img/christmas-snow.svg"));

var _cloudFog = _interopRequireDefault(require("./img/cloud-fog.svg"));

var _dayCloudLightning = _interopRequireDefault(require("./img/day-cloud-lightning.svg"));

var _dayCloudRain = _interopRequireDefault(require("./img/day-cloud-rain.svg"));

var _moonLine = _interopRequireDefault(require("./img/moon-line.svg"));

var _nightCloudLightning = _interopRequireDefault(require("./img/night-cloud-lightning.svg"));

var _nightCloudWind = _interopRequireDefault(require("./img/night-cloud-wind.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var weatherIcons = {
  snow: _christmasSnow["default"],
  cloudFog: _cloudFog["default"],
  dayStorm: _dayCloudLightning["default"],
  dayRain: _dayCloudRain["default"],
  moon: _moonLine["default"],
  nightStorm: _nightCloudLightning["default"],
  nightCloud: _nightCloudWind["default"]
};
var _default = weatherIcons;
exports["default"] = _default;