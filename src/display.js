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

const displayController = (() => {
  const state = stateManager();
  const themeSwitcher = theming();
  const events = getAggregatorInstance();

  const currentlyDisplayedTemp = () => {
    const val = document.querySelector('.main-temperature-container').innerText;
    return parseInt(val, 10);
  }

  events.subscribe('SELECT_LOCATION_CLICKED', () => {
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

  const displayWeatherData = (data) => {
    console.log(data.weather[0].main);
    document.querySelector('.main-temperature-container').innerText = `${Math.floor(data.main.temp)}°C`;
    const mainTempDisplay = document.querySelector('.current-weather-splash');
    mainTempDisplay.innerHTML = '';
    const weatherIcon = createIconElement(Icons[data.weather[0].icon])
    mainTempDisplay.appendChild(weatherIcon);
    events.publish('WEATHER_ICON_CHANGED', weatherIcon);
    const locationInfoContainer = document.querySelector('.location-info-container');
    locationInfoContainer.innerText = `${data.name}/\n${data.weather[0].main}/\n${moment().format('hh:mm a')}/`;
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
  }
})();

export default displayController;