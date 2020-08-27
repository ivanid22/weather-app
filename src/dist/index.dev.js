"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("bootstrap");

require("swiper/swiper-bundle.css");

require("./styles/style.scss");

var _jsEventAggregator = require("@ivanid22/js-event-aggregator");

var _swiper = _interopRequireWildcard(require("swiper"));

var _geolocation = _interopRequireDefault(require("./geolocation"));

var _weather = _interopRequireDefault(require("./weather"));

var _theming = _interopRequireDefault(require("./theming"));

var _state = _interopRequireDefault(require("./state"));

var _display = _interopRequireDefault(require("./display"));

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_swiper["default"].use([_swiper.Navigation, _swiper.Pagination]);

var themeSwitcher = (0, _theming["default"])();
var state = (0, _state["default"])();
var events = (0, _jsEventAggregator.getAggregatorInstance)();
var swiper;

var fetchAppData = function fetchAppData(city) {
  var weatherData, ip, locData;
  return regeneratorRuntime.async(function fetchAppData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!city) {
            _context.next = 6;
            break;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(_weather["default"].getWeatherData({
            city: city
          }));

        case 3:
          weatherData = _context.sent;
          _context.next = 22;
          break;

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(_geolocation["default"].getClientIpAddress());

        case 8:
          ip = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(_geolocation["default"].getLocation(ip));

        case 11:
          locData = _context.sent;

          if (!locData) {
            _context.next = 19;
            break;
          }

          console.log('calling with' + city);
          _context.next = 16;
          return regeneratorRuntime.awrap(_weather["default"].getWeatherData(locData));

        case 16:
          weatherData = _context.sent;
          _context.next = 22;
          break;

        case 19:
          _context.next = 21;
          return regeneratorRuntime.awrap(_weather["default"].getWeatherData({
            city: 'Buenos Aires'
          }));

        case 21:
          weatherData = _context.sent;

        case 22:
          events.publish('WEATHER_DATA_LOADED', weatherData);

        case 23:
        case "end":
          return _context.stop();
      }
    }
  });
};

events.subscribe('LOCATION_NAME_SUBMITTED', function (cityName) {
  fetchAppData(cityName);
});
events.subscribe('WEATHER_DATA_LOADED', function (data) {
  _display["default"].displayWeatherData(data);
});
events.subscribe('CHANGE_THEME_CLICK', function () {
  var currentTheme = state.getValue('theme');
  var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  state.setValue('theme', newTheme);
  themeSwitcher.switchTheme();

  _display["default"].updateThemeButton();
});
events.subscribe('WEATHER_ICON_CHANGED', function (icon) {
  themeSwitcher.addElement(icon);
});

window.onload = function () {
  _display["default"].init();

  fetchAppData();
  state.setValue('weatherUnits', 'C');
  state.setValue('theme', 'light');
  swiper = new _swiper["default"]('.swiper-container', {
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: false,
      init: false
    }
  });
  swiper.init();
};