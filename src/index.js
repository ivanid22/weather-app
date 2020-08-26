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

Swiper.use([Navigation, Pagination]);

const themeSwitcher = theming();
const state = stateManager();
const events = getAggregatorInstance();
let swiper;

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

const fetchAppData = async () => {
  const ip = await geolocation.getClientIpAddress();
  const locData = await geolocation.getLocation(ip);
  let weatherData;
  if (locData) {
    weatherData = await weather.getWeatherData(locData);
  } else {
    weatherData = await weather.getWeatherData({city: 'Buenos Aires'});
  }
  events.publish('WEATHER_DATA_LOADED', weatherData);
};

window.onload = () => {
  displayController.init();
  fetchAppData();
  state.setValue('weatherUnits', 'C')
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