import createStore from './create-store';

const initialState = {
  products: [],

  shoppingCart: [],
};

const { connect, dispatch } = createStore(initialState);

export {
  connect,
  dispatch,
};
