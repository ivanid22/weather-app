import 'bootstrap';
import 'swiper/swiper-bundle.css';
import './styles/style.scss';
import geolocation from './geolocation';
import weather from './weather';


const testGeoloc = async () => {
  const ip = await geolocation.getClientIpAddress();
  const locData = await geolocation.getLocation(ip);
  const weatherData = await weather.getWeatherData(locData);
  console.log(weatherData);
};

window.onload = () => {
  testGeoloc();
};