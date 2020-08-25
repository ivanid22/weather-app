import 'bootstrap';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import './styles/style.scss';
import { geolocation } from './geolocation';

const testGeoloc = async () => {
  const ip = await geolocation.getClientIpAddress();
  const data = await geolocation.getLocation(ip);
  console.log(data);
}

window.onload = () => {
  testGeoloc();
}