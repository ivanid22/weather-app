import 'bootstrap';
import { getAggregatorInstance } from '@ivanid22/js-event-aggregator';
import geolocation from './geolocation';
import weather, { toCelsius, toFahrenheit } from './weather';
import theming from './theming';
import stateManager from './state';
import displayController from './display';

const themeSwitcher = theming();
const state = stateManager();
const events = getAggregatorInstance();

const fetchAppData = async (city) => {
  let weatherData;
  const units = state.getValue('temperatureUnits');
  if (city) {
    weatherData = await weather.getWeatherData({ city, units });
  } else {
    const ip = await geolocation.getClientIpAddress();
    const locData = await geolocation.getLocation(ip);
    if ((locData.latitude) && (locData.longitude)) {
      weatherData = await weather.getWeatherData({ ...locData, units });
    } else {
      weatherData = await weather.getWeatherData({ city: 'Buenos Aires', units });
    }
  }
  events.publish('WEATHER_DATA_LOADED', weatherData);
};

events.subscribe('LOCATION_NAME_SUBMITTED', (cityName) => {
  fetchAppData(cityName);
});

events.subscribe('WEATHER_DATA_LOADED', (data) => {
  displayController.displayWeatherData(data);
  displayController.displayAdditionalWeatherData(data);
});

events.subscribe('MAIN_TEMP_CLICKED', () => {
  const currentTemp = displayController.currentlyDisplayedTemp();
  if (state.getValue('temperatureUnits') === 'metric') {
    state.setValue('temperatureUnits', 'imperial');
    displayController.updateTempDisplay(toFahrenheit(currentTemp), 'F');
  } else {
    state.setValue('temperatureUnits', 'metric');
    displayController.updateTempDisplay(toCelsius(currentTemp), 'C');
  }
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
});

window.onload = () => {
  state.setValue('temperatureUnits', 'metric');
  state.setValue('theme', 'light');
  displayController.init();
  fetchAppData();
};