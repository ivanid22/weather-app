"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("swiper/swiper-bundle.css");

require("./styles/style.scss");

var _moment = _interopRequireDefault(require("moment"));

var _swiper = _interopRequireWildcard(require("swiper"));

var _jquery = _interopRequireDefault(require("jquery"));

var _jsEventAggregator = require("@ivanid22/js-event-aggregator");

var _state = _interopRequireDefault(require("./state"));

var _theming = _interopRequireDefault(require("./theming"));

var _weatherImages = _interopRequireWildcard(require("./weather-images"));

var _mapsBlack = _interopRequireDefault(require("./img/maps-black.svg"));

var _dropHumidity = _interopRequireDefault(require("./img/drop-humidity.svg"));

var _thermometer = _interopRequireDefault(require("./img/thermometer.svg"));

var _wind = _interopRequireDefault(require("./img/wind.svg"));

var _manometer = _interopRequireDefault(require("./img/manometer.svg"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var displayController = function () {
  var state = (0, _state["default"])();
  var themeSwitcher = (0, _theming["default"])();
  var events = (0, _jsEventAggregator.getAggregatorInstance)();

  var currentlyDisplayedTemp = function currentlyDisplayedTemp() {
    var val = document.querySelector('.main-temperature-container').innerText;
    return parseInt(val, 10);
  };

  events.subscribe('SELECT_LOCATION_CLICKED', function () {
    (0, _jquery["default"])('#select-city-modal').modal();
  });

  var updateTempDisplay = function updateTempDisplay(temp, unit) {
    var tempElement = document.querySelector('.main-temperature-container');
    tempElement.innerText = "".concat(Math.floor(temp), "\xB0").concat(unit);
  };

  var initTheme = function initTheme() {
    var mapButton = document.querySelector('.location-button-img');
    mapButton.setAttribute('src', _mapsBlack["default"]);
    themeSwitcher.addElement(mapButton);
    document.querySelectorAll('div, button, input, span').forEach(function (elem) {
      themeSwitcher.addElement(elem);
    });
  };

  var updateThemeButton = function updateThemeButton() {
    var btn = document.querySelector('.change-theme-button');
    btn.innerText = state.getValue('theme') === 'light' ? 'dark' : 'light';
  };

  var createAdditionalInfoItem = function createAdditionalInfoItem(icon, data) {
    var element = document.createElement('div');
    var iconElement = document.createElement('img');
    var dataItem = document.createElement('div');
    element.classList.add('addition-info-item');
    dataItem.classList.add('additional-info-item-data');
    iconElement.setAttribute('src', icon);
    iconElement.setAttribute('alt', 'info icon');
    iconElement.classList.add('additional-info-item-icon');
    dataItem.innerText = data;
    element.append(iconElement, dataItem);
    themeSwitcher.addElement(iconElement);
    return element;
  };

  var displayAdditionalWeatherData = function displayAdditionalWeatherData(data) {
    var tempUnit = state.getValue('temperatureUnits') === 'metric' ? 'C' : 'F';
    var container = document.querySelector('.additional-info-pane');
    container.innerHTML = '';
    var feelsLike = createAdditionalInfoItem(_thermometer["default"], "".concat(data.main.feels_like, " ").concat(tempUnit));
    var wind = createAdditionalInfoItem(_wind["default"], "".concat(data.wind.speed, " km/h"));
    var humidity = createAdditionalInfoItem(_dropHumidity["default"], "".concat(data.main.humidity, "%"));
    var pressure = createAdditionalInfoItem(_manometer["default"], "".concat(data.main.pressure, " hPa"));
    container.append(feelsLike, wind, humidity, pressure);
  };

  var displayWeatherData = function displayWeatherData(data) {
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

    document.querySelector('.main-temperature-container').onclick = function () {
      events.publish('MAIN_TEMP_CLICKED');
    };
  };

  var init = function init() {
    _swiper["default"].use([_swiper.Navigation, _swiper.Pagination]);

    var swiper = new _swiper["default"]('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: false,
        init: false
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });
    swiper.on('init', function () {
      initTheme();
    });
    swiper.init();
    initTheme();
    initListeners();
  };

  return {
    displayWeatherData: displayWeatherData,
    updateTempDisplay: updateTempDisplay,
    updateThemeButton: updateThemeButton,
    init: init,
    currentlyDisplayedTemp: currentlyDisplayedTemp,
    displayAdditionalWeatherData: displayAdditionalWeatherData
  };
}();

var _default = displayController;
exports["default"] = _default;