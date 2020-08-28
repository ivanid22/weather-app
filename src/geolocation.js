import axios from 'axios';

const IP_FIELD_REGEX = /(\d+\.\d+\.\d+\.\d+)/;
const geoApiUrl = process.env.GEOLOCATION_API_URL;
const fetchIpApiUrl = process.env.FETCH_IP_API_URL;

const geolocation = (() => {
  const getLocation = async (ipAddress) => {
    try {
      const result = await axios.get(`${geoApiUrl}${ipAddress}`);
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
      const result = await axios.get(fetchIpApiUrl);
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