import axios from 'axios';

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_URL = process.env.WEATHER_API_URL;

const weather = (() => {
  const getWeatherData = async ({ latitude, longitude, city }) => {
    try {
      let request;
      if (latitude && longitude) {
        request = await axios.get(WEATHER_API_URL, {
          params: {
            appid: WEATHER_API_KEY,
            units: 'metric',
            lat: latitude,
            lon: longitude,
          },
        });
      } else {
        request = await axios.get(WEATHER_API_URL, { 
          params: { 
            appid: WEATHER_API_KEY, 
            q: city,
            units: 'metric',
          }
        });
        console.log(request.data);
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