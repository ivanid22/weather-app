const theming = () => {
  const elements = [];
  let currentTheme = 'light';

  const clearElement = (element) => {
    element.classList.remove('light', 'dark')
  };

  const addElement = (element) => {
    clearElement(element);
    if(element.parentElement.classList.contains('swiper-pagination')) {
      console.log('contains');
      element.classList.add((currentTheme === 'light') ? 'dark' : 'light')
    } else {
      element.classList.add(currentTheme);
    }
    elements.push(element);
  };

  const switchTheme = () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    elements.forEach(element => {
      if(element.tagName.toLowerCase() === 'img') element.classList.toggle('invert-img');
      else if (element.parentElement.classList.contains('swiper-pagination')) {
        clearElement(element);
        currentTheme === 'light' ? element.classList.add('dark') : element.classList.add('light');
      }
      else {
        clearElement(element);
        element.classList.add(currentTheme);
      }
    });
  };

  const getCurrentTheme = () => {
    return currentTheme;
  };

  return {
    addElement,
    switchTheme,
    getCurrentTheme,
  };
};

let instance;

export default () => {
  if (!instance) instance = theming();
  return instance;
};