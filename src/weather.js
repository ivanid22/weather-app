import axios from 'axios';

const weatherApiKey = process.env.WEATHER_API_KEY;
const weatherApiUrl = process.env.WEATHER_API_URL;

const weather = (() => {
  const getWeatherData = async ({
    latitude, longitude, city, units,
  }) => {
    try {
      let request;
      if (latitude && longitude) {
        request = await axios.get(weatherApiUrl, {
          params: {
            appid: weatherApiKey,
            units,
            lat: latitude,
            lon: longitude,
          },
        });
      } else {
        request = await axios.get(weatherApiUrl, {
          params: {
            appid: weatherApiKey,
            q: city,
            units,
          },
        });
      }
      return (request.data);
    } catch (error) {
      return (error);
    }
  };

  return {
    getWeatherData,
  };
})();

export const toFahrenheit = (temp) => Math.round((temp * (9 / 5)) + 32);

export const toCelsius = (temp) => Math.round((temp - 32) * (5 / 9));

export default weather;