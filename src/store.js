import initialAction from './initialAction';

const createStore = (reducer, initialState) => {
  let state = initialState || reducer(undefined, initialAction);
  const subscriber = [];

  // const dispatch = (modifyFunc) => {
  //   const newState = modifyFunc(state);
  //   subscriber.forEach((fn) => fn(newState));
  //   state = newState;
  // };

  const dispatch = (action) => {
    const newState = reducer(state, action);
    subscriber.forEach((fn) => fn(newState));
    state = newState;
  };

  const getState = () => state;

  const subscribe = (fn) => {
    subscriber.push(fn);
  };

  return {
    dispatch,
    getState,
    subscribe,
  };
};

export default createStore;
