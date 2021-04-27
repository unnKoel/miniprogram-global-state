const createStore = (initialState = {}) => {
  let state = initialState;
  const subscriber = [];

  const connect = (mapState) => (Component) => {
    if (mapState && typeof mapState !== 'function') {
      throw new Error('`mapState` parameter must be a function');
    }

    // eslint-disable-next-line no-shadow
    const getSliceState = (state) => (!mapState ? state : mapState(state));

    const sliceState = getSliceState(state);
    const { data = {}, derived } = Component;

    const invokeDerived = (instance) => {
      let derivedData = {};
      if (derived && typeof derived === 'function') {
        derivedData = derived.bind(instance)();
      }

      // eslint-disable-next-line no-unused-expressions
      Object.keys(derivedData).length && instance.setData(derivedData);
    };

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
        const oldSliceState = getSliceState(state);
        const newSliceState = getSliceState(newState);

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
        // eslint-disable-next-line no-unused-expressions
        invokeDerived(instance);
      });
    };

    // There is `onLoad` lifetime function, represent that it's a page.
    // eslint-disable-next-line func-names
    Component.onLoad = function (...params) {
      subscribe(this);

      // eslint-disable-next-line no-shadow
      const sliceState = getSliceState(state);
      this.setData(sliceState);

      if (typeof onLoad === 'function') {
        onLoad.apply(this, params);
      }

      invokeDerived(this);
    };

    // There is `attached` lifetime function, represent that it's a component.
    Component.lifetimes = {
      ...(Component.lifetimes || {}),
      attached(...params) {
        subscribe(this);

        // eslint-disable-next-line no-shadow
        const sliceState = getSliceState(state);
        this.setData(sliceState);

        if (typeof finalAttached === 'function') {
          finalAttached.apply(this, params);
        }

        invokeDerived(this);
      },
    };

    return Component;
  };

  const dispatch = (modifyFunc) => {
    const newState = modifyFunc(state);
    subscriber.forEach((fn) => fn(newState));
    state = newState;
  };

  const getState = () => state;

  const subscribe = (fn) => {
    subscriber.push(fn);
  };

  return {
    connect,
    dispatch,
    getState,
    subscribe,
  };
};

export default createStore;
