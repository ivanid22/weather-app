import icon01d from './img/01d.svg';
import icon01n from './img/01n.svg';
import icon02d from './img/02d.svg';
import icon02n from './img/02n.svg';
import icon03d from './img/03d.svg';
import icon03n from './img/03n.svg';
import icon04d from './img/04d.svg';
import icon04n from './img/04n.svg';
import icon09d from './img/09d.svg';
import icon09n from './img/09n.svg';
import icon10d from './img/10d.svg';
import icon10n from './img/10n.svg';
import icon11d from './img/11d.svg';
import icon11n from './img/11n.svg';
import icon13d from './img/13d.svg';
import icon13n from './img/13n.svg';
import icon50d from './img/50d.svg';
import icon50n from './img/50n.svg';

const weatherIcons = {
  '01d': icon01d,
  '01n': icon01n,
  '02d': icon02d,
  '02n': icon02n,
  '03d': icon03d,
  '03n': icon03n,
  '04d': icon04d,
  '04n': icon04n,
  '09d': icon09d,
  '09n': icon09n,
  '10d': icon10d,
  '10n': icon10n,
  '11d': icon11d,
  '11n': icon11n,
  '13d': icon13d,
  '13n': icon13n,
  '50d': icon50d,
  '50n': icon50n,
};

export const createIconElement = (icon) => {
  const element = document.createElement('img');
  element.classList = 'img-fluid weather-icon-img';
  element.setAttribute('src', icon);
  element.setAttribute('alt', 'current weather icon');
  return element;
};

export default weatherIcons;