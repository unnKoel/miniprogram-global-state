const createStore = (initialState = {}) => {
  let state = initialState;
  const subscriber = [];

  const connect = (mapState) => (Component) => {
    if (mapState && typeof mapState !== 'function') {
      throw new Error('`mapState` parameter must be a function');
    }

    const sliceState = mapState ? state : mapState(state);
    const { data } = Component;

    // combine state of store and data of page or component.
    // it makes state of store is reactable.
    const combinedData = {
      ...data,
      ...sliceState,
    };

    Component.data = combinedData;

    const {
      onLoad,
      attached,
      lifetimes: { attached: lifeTimesAttached } = {},
    } = Component;
    const finalAttached = attached || lifeTimesAttached;

    const subscribe = (instance) => {
      subscriber.push((newState) => {
        const oldSliceState = mapState(state);
        const newSliceState = mapState(newState);

        const changedKeys = Object.keys(newSliceState).filter(
          (key) => newSliceState[key] !== oldSliceState[key],
        );

        if (!changedKeys.length) {
          return;
        }

        // calculate diff state and update them
        const updateState = changedKeys.reduce((cal, key) => {
          cal[key] = newSliceState[key];
          return cal;
        }, {});

        // eslint-disable-next-line no-unused-expressions
        instance && instance.setData && instance.setData(updateState);
      });
    };

    // There is `onLoad` lifetime function, represent that it's a page.
    // eslint-disable-next-line func-names
    Component.onLoad = function (...params) {
      subscribe(this);
      if (typeof onLoad === 'function') {
        onLoad.apply(this, params);
      }
    };

    // There is `attached` lifetime function, represent that it's a component.
    Component.lifetimes = {
      ...(Component.lifetimes || {}),
      attached(...params) {
        subscribe(this);

        // eslint-disable-next-line no-shadow
        const sliceState = mapState(state);
        this.setData(sliceState);

        if (typeof finalAttached === 'function') {
          finalAttached.apply(this, params);
        }
      },
    };

    return Component;
  };

  const dispatch = (modifyFunc) => {
    const newState = modifyFunc(state);
    subscriber.forEach((fn) => fn(newState));
    state = newState;
  };

  return {
    connect,
    dispatch,
  };
};

export default createStore;
