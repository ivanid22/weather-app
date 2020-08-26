"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var IP_FIELD_REGEX = /(\d+\.\d+\.\d+\.\d+)/;
var GEOLOCATION_API_KEY = process.env.GEOLOCATION_API_KEY;
var GEOLOCATION_API_URL = process.env.GEOLOCATION_API_URL;
var FETCH_IP_API_URL = process.env.FETCH_IP_API_URL;

var geolocation = function () {
  var getLocation = function getLocation(ipAddress) {
    var result, _result$data, city, latitude, longitude;

    return regeneratorRuntime.async(function getLocation$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].get("".concat(GEOLOCATION_API_URL).concat(ipAddress, "?access_key=").concat(GEOLOCATION_API_KEY)));

          case 3:
            result = _context.sent;
            _result$data = result.data, city = _result$data.city, latitude = _result$data.latitude, longitude = _result$data.longitude;
            return _context.abrupt("return", {
              city: city,
              latitude: latitude,
              longitude: longitude,
              countryName: result.data.country_name
            });

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", _context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 8]]);
  };

  var getClientIpAddress = function getClientIpAddress() {
    var result;
    return regeneratorRuntime.async(function getClientIpAddress$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].get(FETCH_IP_API_URL));

          case 3:
            result = _context2.sent;
            return _context2.abrupt("return", result.data.match(IP_FIELD_REGEX)[0]);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", _context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 7]]);
  };

  return {
    getClientIpAddress: getClientIpAddress,
    getLocation: getLocation
  };
}();

var _default = geolocation;
exports["default"] = _default;