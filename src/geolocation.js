import axios from 'axios';

const IP_FIELD_REGEX = /(\d+\.\d+\.\d+\.\d+)/;
const GEOLOCATION_API_KEY = '0932341d8f24cc327204178330f17f39';
const GEOLOCATION_API_URL = 'http://api.ipstack.com/'
const FETCH_IP_API_URL = 'https://www.cloudflare.com/cdn-cgi/trace';

const geolocation = (() => {

  const getLocation = async (ipAddress) => {
    try {
      const result = await axios.get(`${GEOLOCATION_API_URL}${ipAddress}?access_key=${GEOLOCATION_API_KEY}`);
      const { city, latitude, longitude } = result.data;
      return {
        city,
        latitude,
        longitude,
        countryName: result.data.country_name,
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