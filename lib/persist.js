"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _debounce = _interopRequireDefault(require("./utils/debounce"));

var _initialAction = _interopRequireDefault(require("./initialAction"));

var _set = _interopRequireDefault(require("./utils/set"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PERSISTENCE_KEY = '_global_state';
const PERSISTENCE__MILLISECONDS = 200;

const getValueByPath = (path = '', value = {}) => path.split('.').reduce((res, key) => {
  res = res[key];
  return res;
}, value);

const compareWithPrevPersisValues = (prev, curr) => Object.keys(curr).some(key => prev[key] !== curr[key]);

const getPersistentValues = (state = {}, paths = []) => {
  const persistentValues = {};
  paths.forEach(path => {
    const value = getValueByPath(path, state);
    persistentValues[path] = value;
  });

  if (compareWithPrevPersisValues(getPersistentValues.persistentValues || {}, persistentValues)) {
    getPersistentValues.persistentValues = persistentValues;
    return persistentValues;
  }

  return {};
};

const persistValues = (0, _debounce.default)((values = {}) => {
  if (!Object.keys(values).length) return;
  wx.setStorageSync(PERSISTENCE_KEY, JSON.stringify(values));
}, PERSISTENCE__MILLISECONDS);

const initializeState = initialState => {
  const persistantValues = JSON.parse(wx.getStorageSync(PERSISTENCE_KEY) || '{}');
  Object.keys(persistantValues).forEach(key => {
    (0, _set.default)(initialState, key, persistantValues[key] || getValueByPath(key, initialState));
  });
  return initialState;
};

const persist = createStore => (paths = []) => reducer => {
  const initialState = reducer(undefined, _initialAction.default);
  const {
    subscribe,
    ...remaining
  } = createStore(reducer, initializeState(initialState));
  subscribe(state => {
    persistValues(getPersistentValues(state, paths));
  });
  return remaining;
};

var _default = persist;
exports.default = _default;