import createStore, { persist } from './index';

const initialState = {
  products: [],

  shoppingCart: [],
};

const createPersistStore = persist(createStore);
const { connect, dispatch } = createPersistStore(['shoppingCart', 'products'])(initialState);

export {
  connect,
  dispatch,
};
