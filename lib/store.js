"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _initialAction = _interopRequireDefault(require("./initialAction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createStore = (reducer, initialState) => {
  let state = initialState || reducer(undefined, _initialAction.default);
  const subscriber = []; // const dispatch = (modifyFunc) => {
  //   const newState = modifyFunc(state);
  //   subscriber.forEach((fn) => fn(newState));
  //   state = newState;
  // };

  const dispatch = action => {
    const newState = reducer(state, action);
    subscriber.forEach(fn => fn(newState));
    state = newState;
  };

  const getState = () => state;

  const subscribe = fn => {
    subscriber.push(fn);
  };

  return {
    dispatch,
    getState,
    subscribe
  };
};

var _default = createStore;
exports.default = _default;