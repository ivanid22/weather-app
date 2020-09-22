const stateManager = () => {
  const state = {};

  const setValue = (key, value) => {
    state[key] = value;
  };

  const getValue = (key) => {
    if (state[key]) return state[key];
    return null;
  };

  return {
    setValue,
    getValue,
  };
};

let instance = null;

export default () => {
  if (!instance) instance = stateManager();
  return instance;
};