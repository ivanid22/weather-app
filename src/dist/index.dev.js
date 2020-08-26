"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("bootstrap");

require("swiper/swiper-bundle.css");

require("./styles/style.scss");

var _swiper = _interopRequireWildcard(require("swiper"));

var _geolocation = _interopRequireDefault(require("./geolocation"));

var _weather = _interopRequireDefault(require("./weather"));

var _theming = _interopRequireDefault(require("./theming"));

var _weatherImages = _interopRequireWildcard(require("./weather-images"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_swiper["default"].use([_swiper.Navigation, _swiper.Pagination]);

var themeSwitcher = (0, _theming["default"])();
var swiper;

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
  //testGeoloc();
  document.querySelectorAll('div').forEach(function (elem) {
    themeSwitcher.addElement(elem);
  });
  window.switchTheme = themeSwitcher.switchTheme;
  swiper = new _swiper["default"]('.swiper-container', {
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
      init: false
    }
  });
  swiper.init();
  var splash = document.querySelector('.current-weather-splash');
  var splashImg = (0, _weatherImages.createIconElement)(_weatherImages["default"].dayRain);
  splash.appendChild(splashImg);
  themeSwitcher.addElement(splashImg);
  console.log(process.env.TEST_ENV);
};