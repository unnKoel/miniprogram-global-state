import createStore, { persist } from './index';

const initialState = {
  products: [],

  shoppingCart: [],
};

const reducer = (state = initialState, action) => {
  const { type } = action;
  if (type === 'initializeProducts') {
    const { payload: productsFromRequest } = action;
    return { ...state, products: productsFromRequest };
  }

  if (type === 'buyProduct') {
    const { payload: index } = action;
    const { products, shoppingCart } = state;
    const product = products[index];
    product.num -= 1;
    const newShoppingCart = [...shoppingCart, product];
    return { ...state, products: [...products], shoppingCart: newShoppingCart };
  }

  return state;
};

const createPersistStore = persist(createStore);
const { connect, dispatch } = createPersistStore(['shoppingCart', 'products'])(reducer);

export {
  connect,
  dispatch,
};
