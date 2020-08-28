import 'swiper/swiper-bundle.css';
import './styles/style.scss';
import moment from 'moment';
import Swiper, { Navigation, Pagination } from 'swiper';
import $ from 'jquery';
import { getAggregatorInstance } from '@ivanid22/js-event-aggregator';
import stateManager from './state';
import theming from './theming';
import Icons from './weather-images';
import { createIconElement } from './weather-images';
import mapIcon from './img/maps-black.svg';
import humidityIcon from './img/drop-humidity.svg';
import thermometerIcon from './img/thermometer.svg';
import windIcon from './img/wind.svg';
import pressureIcon from './img/manometer.svg';

const displayController = (() => {
  const state = stateManager();
  const themeSwitcher = theming();
  const events = getAggregatorInstance();

  const currentlyDisplayedTemp = () => {
    const val = document.querySelector('.main-temperature-container').innerText;
    return parseInt(val, 10);
  }

  events.subscribe('SELECT_LOCATION_CLICKED', () => {
    document.querySelector('#city-field-id').value = '';
    $('#select-city-modal').modal();
  });

  const updateTempDisplay = (temp, unit) => {
    const tempElement = document.querySelector('.main-temperature-container');
    tempElement.innerText = `${Math.floor(temp)}°${unit}`;
  }

  const initTheme = () => {
    const mapButton = document.querySelector('.location-button-img');
    mapButton.setAttribute('src', mapIcon);
    themeSwitcher.addElement(mapButton);
    document.querySelectorAll('div, button, input, span').forEach((elem) => {
      themeSwitcher.addElement(elem);
    });
  }

  const updateThemeButton = () => {
    const btn = document.querySelector('.change-theme-button');
    btn.innerText = state.getValue('theme') === 'light' ? 'dark' : 'light';
  }

  const createAdditionalInfoItem = (icon, data) => {
    const element = document.createElement('div');
    const iconElement = document.createElement('img');
    const dataItem = document.createElement('div');
    element.classList.add('addition-info-item');
    dataItem.classList.add('additional-info-item-data')
    iconElement.setAttribute('src', icon);
    iconElement.setAttribute('alt', 'info icon');
    iconElement.classList.add('additional-info-item-icon');
    dataItem.innerText = data;
    element.append(iconElement, dataItem);
    themeSwitcher.addElement(iconElement);
    return element;
  }

  const displayAdditionalWeatherData = (data) => {
    const tempUnit = state.getValue('temperatureUnits') === 'metric' ? 'C' : 'F';
    const container = document.querySelector('.additional-info-pane');
    container.innerHTML = '';
    const feelsLike = createAdditionalInfoItem(thermometerIcon, `${data.main.feels_like} ${tempUnit}`)
    const wind = createAdditionalInfoItem(windIcon, `${data.wind.speed} km/h`);
    const humidity = createAdditionalInfoItem(humidityIcon, `${data.main.humidity}%`);
    const pressure = createAdditionalInfoItem(pressureIcon, `${data.main.pressure} hPa`)
    container.append(feelsLike, wind, humidity, pressure);
  }

  const displayWeatherData = (data) => {
    document.querySelector('.main-temperature-container').innerText = `${Math.floor(data.main.temp)}°C`;
    const mainTempDisplay = document.querySelector('.current-weather-splash');
    mainTempDisplay.innerHTML = '';
    const weatherIcon = createIconElement(Icons[data.weather[0].icon])
    mainTempDisplay.appendChild(weatherIcon);
    events.publish('WEATHER_ICON_CHANGED', weatherIcon);
    const locationInfoContainer = document.querySelector('.location-info-container');
    locationInfoContainer.innerText = `${data.name}, ${data.sys.country}/\n${data.weather[0].main}/\n${moment().format('hh:mm a')}/`;
  }

  const initListeners = () => {
    const themeSwitchButton = document.querySelector('.change-theme-button');
    const locationButton = document.querySelector('.location-button-img');
    themeSwitchButton.onclick = () => {
      events.publish('CHANGE_THEME_CLICK');
    }
    locationButton.onclick = () => {
      events.publish('SELECT_LOCATION_CLICKED');
    }
    const modalOk = document.querySelector('.modal-ok-button');
    modalOk.onclick = () => {
      events.publish('LOCATION_NAME_SUBMITTED', document.querySelector('#city-field-id').value);
      document.querySelector('#city-field-id').value = '';
      $('#select-city-modal').modal('hide');
    }
    document.querySelector('.main-temperature-container').onclick = () => {
      events.publish('MAIN_TEMP_CLICKED');
    }
  }

  const init = () => {
    Swiper.use([Navigation, Pagination]);
    let swiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: false,
        init: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });
    swiper.on('init', () => {
      initTheme();
    })
    swiper.init();
    initTheme();
    initListeners();
  }
  
  return {
    displayWeatherData,
    updateTempDisplay,
    updateThemeButton,
    init,
    currentlyDisplayedTemp,
    displayAdditionalWeatherData,
  }
})();

export default displayController;