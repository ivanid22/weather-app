import moment from 'moment';
import { getAggregatorInstance } from '@ivanid22/js-event-aggregator';
import stateManager from './state';
import theming from './theming';
import Icons from './weather-images';
import { createIconElement } from './weather-images';

const displayController = (() => {
  const state = stateManager();
  const themeSwitcher = theming();
  const events = getAggregatorInstance();

  const updateTempDisplay = (temp, unit) => {
    const tempElement = document.querySelector('.main-temperature-container');
    tempElement.innerText = `${Math.floor(temp)}°${unit}`;
  }

  const initTheme = () => {
    document.querySelectorAll('div').forEach((elem) => {
        themeSwitcher.addElement(elem);
    });
    themeSwitcher.addElement(document.querySelector('.change-theme-button'));
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
    themeSwitchButton.onclick = () => {
      events.publish('CHANGE_THEME_CLICK');
    }
  }

  const init = () => {
    initTheme();
    initListeners();
  }
  
  return {
    displayWeatherData,
    updateTempDisplay,
    updateThemeButton,
    init,
  }
})();

export default displayController;