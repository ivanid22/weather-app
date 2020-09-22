"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.toCelsius = exports.toFahrenheit = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var WEATHER_API_KEY = process.env.WEATHER_API_KEY;
var WEATHER_API_URL = process.env.WEATHER_API_URL;

var weather = function () {
  var getWeatherData = function getWeatherData(_ref) {
    var latitude, longitude, city, units, request;
    return regeneratorRuntime.async(function getWeatherData$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            latitude = _ref.latitude, longitude = _ref.longitude, city = _ref.city, units = _ref.units;
            _context.prev = 1;

            if (!(latitude && longitude)) {
              _context.next = 8;
              break;
            }

            _context.next = 5;
            return regeneratorRuntime.awrap(_axios["default"].get(WEATHER_API_URL, {
              params: {
                appid: WEATHER_API_KEY,
                units: units,
                lat: latitude,
                lon: longitude
              }
            }));

          case 5:
            request = _context.sent;
            _context.next = 12;
            break;

          case 8:
            _context.next = 10;
            return regeneratorRuntime.awrap(_axios["default"].get(WEATHER_API_URL, {
              params: {
                appid: WEATHER_API_KEY,
                q: city,
                units: units
              }
            }));

          case 10:
            request = _context.sent;
            console.log(request.data);

          case 12:
            return _context.abrupt("return", request.data);

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", _context.t0);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 15]]);
  };

  return {
    getWeatherData: getWeatherData
  };
}();

var toFahrenheit = function toFahrenheit(temp) {
  return Math.round(temp * (9 / 5) + 32);
};

exports.toFahrenheit = toFahrenheit;

var toCelsius = function toCelsius(temp) {
  return Math.round((temp - 32) * (5 / 9));
};

exports.toCelsius = toCelsius;
var _default = weather;
exports["default"] = _default;