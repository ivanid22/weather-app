"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _jquery = _interopRequireDefault(require("jquery"));

var _jsEventAggregator = require("@ivanid22/js-event-aggregator");

var _state = _interopRequireDefault(require("./state"));

var _theming = _interopRequireDefault(require("./theming"));

var _weatherImages = _interopRequireWildcard(require("./weather-images"));

var _mapsBlack = _interopRequireDefault(require("./img/maps-black.svg"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var displayController = function () {
  var state = (0, _state["default"])();
  var themeSwitcher = (0, _theming["default"])();
  var events = (0, _jsEventAggregator.getAggregatorInstance)();
  events.subscribe('SELECT_LOCATION_CLICKED', function () {
    (0, _jquery["default"])('#select-city-modal').modal();
  });
  events.subscribe('LOCATION_NAME_SUBMITTED', function (name) {
    console.log(name);
  });

  var updateTempDisplay = function updateTempDisplay(temp, unit) {
    var tempElement = document.querySelector('.main-temperature-container');
    tempElement.innerText = "".concat(Math.floor(temp), "\xB0").concat(unit);
  };

  var initTheme = function initTheme() {
    var mapButton = document.querySelector('.location-button-img');
    mapButton.setAttribute('src', _mapsBlack["default"]);
    themeSwitcher.addElement(mapButton);
    document.querySelectorAll('div, button, input').forEach(function (elem) {
      themeSwitcher.addElement(elem);
    });
  };

  var updateThemeButton = function updateThemeButton() {
    var btn = document.querySelector('.change-theme-button');
    btn.innerText = state.getValue('theme') === 'light' ? 'dark' : 'light';
  };

  var displayWeatherData = function displayWeatherData(data) {
    console.log(data.weather[0].main);
    document.querySelector('.main-temperature-container').innerText = "".concat(Math.floor(data.main.temp), "\xB0C");
    var mainTempDisplay = document.querySelector('.current-weather-splash');
    mainTempDisplay.innerHTML = '';
    var weatherIcon = (0, _weatherImages.createIconElement)(_weatherImages["default"][data.weather[0].icon]);
    mainTempDisplay.appendChild(weatherIcon);
    events.publish('WEATHER_ICON_CHANGED', weatherIcon);
    var locationInfoContainer = document.querySelector('.location-info-container');
    locationInfoContainer.innerText = "".concat(data.name, "/\n").concat(data.weather[0].main, "/\n").concat((0, _moment["default"])().format('hh:mm a'), "/");
  };

  var initListeners = function initListeners() {
    var themeSwitchButton = document.querySelector('.change-theme-button');
    var locationButton = document.querySelector('.location-button-img');

    themeSwitchButton.onclick = function () {
      events.publish('CHANGE_THEME_CLICK');
    };

    locationButton.onclick = function () {
      events.publish('SELECT_LOCATION_CLICKED');
    };

    var modalOk = document.querySelector('.modal-ok-button');

    modalOk.onclick = function () {
      events.publish('LOCATION_NAME_SUBMITTED', document.querySelector('#city-field-id').value);
      document.querySelector('#city-field-id').value = '';
      (0, _jquery["default"])('#select-city-modal').modal('hide');
    };
  };

  var init = function init() {
    initTheme();
    initListeners();
  };

  return {
    displayWeatherData: displayWeatherData,
    updateTempDisplay: updateTempDisplay,
    updateThemeButton: updateThemeButton,
    init: init
  };
}();

var _default = displayController;
exports["default"] = _default;