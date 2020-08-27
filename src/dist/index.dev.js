"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("bootstrap");

var _jsEventAggregator = require("@ivanid22/js-event-aggregator");

var _geolocation = _interopRequireDefault(require("./geolocation"));

var _weather = _interopRequireWildcard(require("./weather"));

var _theming = _interopRequireDefault(require("./theming"));

var _state = _interopRequireDefault(require("./state"));

var _display = _interopRequireDefault(require("./display"));

var _jquery = _interopRequireDefault(require("jquery"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var themeSwitcher = (0, _theming["default"])();
var state = (0, _state["default"])();
var events = (0, _jsEventAggregator.getAggregatorInstance)();

var fetchAppData = function fetchAppData(city) {
  var weatherData, units, ip, locData;
  return regeneratorRuntime.async(function fetchAppData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          units = state.getValue('temperatureUnits');

          if (!city) {
            _context.next = 7;
            break;
          }

          _context.next = 4;
          return regeneratorRuntime.awrap(_weather["default"].getWeatherData({
            city: city,
            units: units
          }));

        case 4:
          weatherData = _context.sent;
          _context.next = 22;
          break;

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(_geolocation["default"].getClientIpAddress());

        case 9:
          ip = _context.sent;
          _context.next = 12;
          return regeneratorRuntime.awrap(_geolocation["default"].getLocation(ip));

        case 12:
          locData = _context.sent;

          if (!locData) {
            _context.next = 19;
            break;
          }

          _context.next = 16;
          return regeneratorRuntime.awrap(_weather["default"].getWeatherData(_objectSpread({}, locData, {
            units: units
          })));

        case 16:
          weatherData = _context.sent;
          _context.next = 22;
          break;

        case 19:
          _context.next = 21;
          return regeneratorRuntime.awrap(_weather["default"].getWeatherData({
            city: 'Buenos Aires',
            units: units
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
events.subscribe('MAIN_TEMP_CLICKED', function () {
  var currentTemp = _display["default"].currentlyDisplayedTemp();

  if (state.getValue('temperatureUnits') === 'metric') {
    state.setValue('temperatureUnits', 'imperial');

    _display["default"].updateTempDisplay((0, _weather.toFahrenheit)(currentTemp), 'F');
  } else {
    state.setValue('temperatureUnits', 'metric');

    _display["default"].updateTempDisplay((0, _weather.toCelsius)(currentTemp), 'C');
  }
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
  state.setValue('temperatureUnits', 'metric');
  state.setValue('theme', 'light');

  _display["default"].init();

  fetchAppData();
};