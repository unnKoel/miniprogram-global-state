"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const combineReducer = (reducers = {}) => {
  const finalReducers = Object.keys(reducers).filter(key => typeof reducers[key] === 'function').reduce((calReducers, key) => {
    calReducers[key] = reducers[key];
    return calReducers;
  }, {});
  const finalReducerkeys = Object.keys(finalReducers);
  return (state = {}, action) => {
    const nextState = {};
    let changed = false; // eslint-disable-next-line no-plusplus

    for (let i = 0; i < finalReducerkeys.length; i++) {
      const reducerKey = finalReducerkeys[i];
      const reducerForKey = finalReducers[reducerKey];
      const prevStateForKey = state[reducerKey];
      const nextStateForKey = reducerForKey(prevStateForKey, action);
      nextState[reducerKey] = nextStateForKey;

      if (prevStateForKey !== nextStateForKey) {
        changed = true;
      }
    }

    return changed ? nextState : state;
  };
};

var _default = combineReducer;
exports.default = _default;