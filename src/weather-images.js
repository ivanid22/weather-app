import snow from './img/christmas-snow.svg';
import cloudFog from './img/cloud-fog.svg';
import dayStorm from './img/day-cloud-lightning.svg';
import dayRain from './img/day-cloud-rain.svg';
import moon from './img/moon-line.svg';
import nightStorm from './img/night-cloud-lightning.svg';
import nightCloud from './img/night-cloud-wind.svg';

const weatherIcons = {
  snow,
  cloudFog,
  dayStorm,
  dayRain,
  moon,
  nightStorm,
  nightCloud,
};

export const createIconElement = (icon) => {
  const element = document.createElement('img');
  element.classList = 'img-fluid weather-icon-img';
  element.setAttribute('src', icon);
  element.setAttribute('alt', 'current weather icon');
  return element;
}

export default weatherIcons;