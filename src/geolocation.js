import axios from 'axios';

const IP_FIELD_REGEX = /(\d+\.\d+\.\d+\.\d+)/;
const GEOLOCATION_API_URL = process.env.GEOLOCATION_API_URL;
const FETCH_IP_API_URL = process.env.FETCH_IP_API_URL;

const geolocation = (() => {

  const getLocation = async (ipAddress) => {
    try {
      const result = await axios.get(GEOLOCATION_API_URL);
      const { city, latitude, longitude } = result.data;
      return {
        city,
        latitude,
        longitude,
      };
    } catch (error) {
      return error;
    }
  };

  const getClientIpAddress = async () => {
    try {
      const result = await axios.get(FETCH_IP_API_URL);
      return result.data.match(IP_FIELD_REGEX)[0];
    } catch (error) {
      return error;
    }
  };

  return {
    getClientIpAddress,
    getLocation,
  };
})();

export default geolocation;