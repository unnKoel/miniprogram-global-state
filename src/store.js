const createStore = (reducer) => {
  let state = reducer();
  const subscriber = [];

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
