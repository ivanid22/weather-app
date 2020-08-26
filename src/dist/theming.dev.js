"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var theming = function theming() {
  var elements = [];
  var currentTheme = 'light';

  var clearElement = function clearElement(element) {
    element.classList.remove('light', 'dark');
  };

  var addElement = function addElement(element) {
    clearElement(element);
    element.classList.add(currentTheme);
    elements.push(element);
  };

  var switchTheme = function switchTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    elements.forEach(function (element) {
      if (element.tagName.toLowerCase() === 'img') element.classList.toggle('invert-img');else {
        console.log(element.tagName.toLowerCase());
        clearElement(element);
        element.classList.add(currentTheme);
      }
    });
  };

  var getCurrentTheme = function getCurrentTheme() {
    return currentTheme;
  };

  return {
    addElement: addElement,
    switchTheme: switchTheme,
    getCurrentTheme: getCurrentTheme
  };
};

var instance;

var _default = function _default() {
  if (!instance) instance = theming();
  return instance;
};

exports["default"] = _default;