"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var WEATHER_API_KEY = process.env.WEATHER_API_KEY;
var WEATHER_API_URL = process.env.WEATHER_API_URL;

var weather = function () {
  var getWeatherData = function getWeatherData(_ref) {
    var latitude, longitude, city, request;
    return regeneratorRuntime.async(function getWeatherData$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            latitude = _ref.latitude, longitude = _ref.longitude, city = _ref.city;
            _context.prev = 1;

            if (!(latitude && longitude)) {
              _context.next = 8;
              break;
            }

            _context.next = 5;
            return regeneratorRuntime.awrap(_axios["default"].get(WEATHER_API_URL, {
              params: {
                appid: WEATHER_API_KEY,
                units: 'metric',
                lat: latitude,
                lon: longitude
              }
            }));

          case 5:
            request = _context.sent;
            _context.next = 11;
            break;

          case 8:
            _context.next = 10;
            return regeneratorRuntime.awrap(_axios["default"].get(WEATHER_API_URL, {
              params: {
                appid: WEATHER_API_KEY,
                q: city
              }
            }));

          case 10:
            request = _context.sent;

          case 11:
            return _context.abrupt("return", request.data);

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", _context.t0);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 14]]);
  };

  return {
    getWeatherData: getWeatherData
  };
}();

var _default = weather;
exports["default"] = _default;