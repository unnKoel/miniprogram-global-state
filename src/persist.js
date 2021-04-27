import debounce from './utils/debounce';

const PERSISTENCE_KEY = '_global_state';
const PERSISTENCE__MILLISECONDS = 200;

const getValueByPath = (path = '', value = {}) => path.split('.').reduce((res, key) => {
  res = res[key];
  return res;
}, value);

const compareWithPrevPersisValues = (
  prev,
  curr,
) => Object.keys(curr).some((key) => prev[key] !== curr[key]);

const getPersistentValues = (state = {}, paths = []) => {
  const persistentValues = {};

  paths.forEach((path) => {
    const value = getValueByPath(path, state);
    persistentValues[path] = value;
  });

  if (compareWithPrevPersisValues(getPersistentValues.persistentValues || {}, persistentValues)) {
    getPersistentValues.persistentValues = persistentValues;
    return persistentValues;
  }

  return {};
};

const persistValues = debounce((values = {}) => {
  if (!Object.keys(values).length) return;

  // eslint-disable-next-line no-undef
  localStorage.setItem(PERSISTENCE_KEY, JSON.stringify(values));
}, PERSISTENCE__MILLISECONDS);

const persist = (createStore) => (paths = []) => (initialState = {}) => {
  persistValues(getPersistentValues(initialState, paths));

  const { subscribe, ...remaining } = createStore(initialState);

  subscribe((state) => {
    persistValues(getPersistentValues(state, paths));
  });

  return remaining;
};

export default persist;
