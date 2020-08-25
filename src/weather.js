import axios from 'axios';

const WEATHER_API_KEY = '97c94feb17a879afad3f559073cb4200';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const weather = (() => {
  const getWeatherData = async ({ latitude, longitude, city }) => {
    try {
      let request;
      if (latitude && longitude) {
        request = await axios.get(WEATHER_API_URL, {
          params: {
            appid: WEATHER_API_KEY,
            lat: latitude,
            lon: longitude,
          },
        });
      } else {
        request = await axios.get(WEATHER_API_URL, { params: { appid: WEATHER_API_KEY, q: city } });
      }
      return (request.data);
    } catch (error) {
      return (error);
    }
  }

  return {
    getWeatherData,
  };
})();

export default weather;