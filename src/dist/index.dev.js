"use strict";

require("bootstrap");

require("swiper/swiper-bundle.css");

require("./styles/style.scss");

var _geolocation = _interopRequireDefault(require("./geolocation"));

var _weather = _interopRequireDefault(require("./weather"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var testGeoloc = function testGeoloc() {
  var ip, locData, weatherData;
  return regeneratorRuntime.async(function testGeoloc$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_geolocation["default"].getClientIpAddress());

        case 2:
          ip = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(_geolocation["default"].getLocation(ip));

        case 5:
          locData = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(_weather["default"].getWeatherData(locData));

        case 8:
          weatherData = _context.sent;
          console.log(weatherData);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
};

window.onload = function () {
  testGeoloc();
};