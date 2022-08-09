const createStore = (reducer) => {
  let state = reducer();
  const observers = [];

  const dispatch = (action) => {
    const newState = reducer(state, action);
    observers.forEach((observer) => observer(newState));
    state = newState;
  };

  const getState = () => state;

  const subscribe = (observer) => {
    observers.push(observer);
  };

  return {
    dispatch,
    getState,
    subscribe,
  };
};

export default createStore;
