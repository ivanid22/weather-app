const theming = () => {
  const elements = [];
  let currentTheme = 'light';

  const clearElement = (element) => {
    element.classList.remove('light', 'dark');
  };

  const addElement = (element) => {
    clearElement(element);
    element.classList.add(currentTheme);
    elements.push(element);
  };

  const applyTheme = (currentTheme) => {
    elements.forEach(element => {
      clearElement(element);
      element.classList.add(currentTheme);
    });
  };

  const switchTheme = () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme);
  };

  const getCurrentTheme = () => currentTheme;

  return {
    addElement,
    switchTheme,
    applyTheme,
    getCurrentTheme,
  };
};

let instance;

export default () => {
  if (!instance) instance = theming();
  return instance;
};