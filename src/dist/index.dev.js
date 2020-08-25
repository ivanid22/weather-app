"use strict";

require("bootstrap");

var _swiper = _interopRequireDefault(require("swiper"));

require("swiper/swiper-bundle.css");

require("./styles/style.scss");

var _geolocation = require("./geolocation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var testGeoloc = function testGeoloc() {
  var ip, data;
  return regeneratorRuntime.async(function testGeoloc$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_geolocation.geolocation.getClientIpAddress());

        case 2:
          ip = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(_geolocation.geolocation.getLocation(ip));

        case 5:
          data = _context.sent;
          console.log(data);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

window.onload = function () {
  testGeoloc();
};