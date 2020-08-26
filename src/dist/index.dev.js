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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_swiper["default"].use([_swiper.Navigation, _swiper.Pagination]);

var themeSwitcher = (0, _theming["default"])();
var state = (0, _state["default"])();
var events = (0, _jsEventAggregator.getAggregatorInstance)();
var swiper;
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

var fetchAppData = function fetchAppData() {
  var ip, locData, weatherData;
  return regeneratorRuntime.async(function fetchAppData$(_context) {
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

          if (!locData) {
            _context.next = 12;
            break;
          }

          _context.next = 9;
          return regeneratorRuntime.awrap(_weather["default"].getWeatherData(locData));

        case 9:
          weatherData = _context.sent;
          _context.next = 15;
          break;

        case 12:
          _context.next = 14;
          return regeneratorRuntime.awrap(_weather["default"].getWeatherData({
            city: 'Buenos Aires'
          }));

        case 14:
          weatherData = _context.sent;

        case 15:
          events.publish('WEATHER_DATA_LOADED', weatherData);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
};

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