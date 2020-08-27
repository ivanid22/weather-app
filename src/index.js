import 'bootstrap';
import 'swiper/swiper-bundle.css';
import './styles/style.scss';
import { getAggregatorInstance } from '@ivanid22/js-event-aggregator';
import Swiper, { Navigation, Pagination } from 'swiper';
import geolocation from './geolocation';
import weather from './weather';
import theming from './theming';
import stateManager from './state';
import displayController from './display';
import $ from 'jquery';

Swiper.use([Navigation, Pagination]);

const themeSwitcher = theming();
const state = stateManager();
const events = getAggregatorInstance();
let swiper;

const fetchAppData = async (city) => {
  let weatherData;
  if(city) {
    weatherData = await weather.getWeatherData({city});
  }
  else {
    const ip = await geolocation.getClientIpAddress();
    const locData = await geolocation.getLocation(ip);
    if (locData) {
      console.log('calling with' + city);
      weatherData = await weather.getWeatherData(locData);
    } else {
      weatherData = await weather.getWeatherData({city: 'Buenos Aires'});
    }
  }
  events.publish('WEATHER_DATA_LOADED', weatherData);
};

events.subscribe('LOCATION_NAME_SUBMITTED', (cityName) => {
  fetchAppData(cityName);
});

events.subscribe('WEATHER_DATA_LOADED', (data) => {
  displayController.displayWeatherData(data);
});

events.subscribe('CHANGE_THEME_CLICK', () => {
  const currentTheme = state.getValue('theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  state.setValue('theme', newTheme);
  themeSwitcher.switchTheme();
  displayController.updateThemeButton();
});

events.subscribe('WEATHER_ICON_CHANGED', (icon) => {
  themeSwitcher.addElement(icon);
})

window.onload = () => {
  displayController.init();
  fetchAppData();
  state.setValue('weatherUnits', 'C');
  state.setValue('theme', 'light');
  
  swiper = new Swiper('.swiper-container', {
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: false,
      init: false,
    }
  });
  swiper.init();
};