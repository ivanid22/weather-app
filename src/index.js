import 'bootstrap';
import 'swiper/swiper-bundle.css';
import './styles/style.scss';
import Swiper, { Navigation, Pagination } from 'swiper';
import geolocation from './geolocation';
import weather from './weather';
import theming from './theming';
import Icons, { createIconElement } from './weather-images';

Swiper.use([Navigation, Pagination]);

const themeSwitcher = theming();
let swiper;

const testGeoloc = async () => {
  const ip = await geolocation.getClientIpAddress();
  const locData = await geolocation.getLocation(ip);
  const weatherData = await weather.getWeatherData(locData);
  console.log(weatherData);
};

window.onload = () => {
  //testGeoloc();
  document.querySelectorAll('div').forEach((elem) => {
    themeSwitcher.addElement(elem);
  });
  window.switchTheme = themeSwitcher.switchTheme;
  swiper = new Swiper('.swiper-container', {
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
      init: false,
    }
  });
  swiper.init();
  const splash = document.querySelector('.current-weather-splash');
  const splashImg = createIconElement(Icons.dayRain)
  splash.appendChild(splashImg);
  themeSwitcher.addElement(splashImg);
  console.log(process.env.TEST_ENV);
};