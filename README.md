This is a library that management global state in Wechat Miniprogram, like redux for react.

The API might be changed any one day, Don't use it in production.

### create store

```js
import createStore from 'miniprogram-global-state';

// initialized state
const initialState = {
  products: [],

  shoppingCart: [],
};

// create store instance,
// get `connect` that connect with miniprogram page or 
// component which subsribe global state from store.
// and `dispatch` that is used to change the global state.
const {connect, dispatch} = createStore(initialState);

export {connect, dispatch};
```

### connection

make store connecting with component or page.

##### connect with page

```js
Page(
  connect((state) => ({products: state.products}))({
    async onLoad() {
      const products = await requestProducts();
      dispatch((state) => ({...state, products}));
    },

    onBuy(e) {
      const {index} = e.currentTarget.dataset;
      // utilize `dispatch` to modify the value
      // of products in immutable way.
      dispatch((state) => {
        const {products, shoppingCart} = state;
        const product = products[index];
        product.num -= 1;
        const newShoppingCart = [...shoppingCart, product];
        return {
          ...state,
          products: [...products],
          shoppingCart: newShoppingCart,
        };
      });
    },
  })
);
```

#### persist store
persist state of store to localstorage when state was changed. and initialize state
when seting out.

``` js
import createStore, { persist } from './index';

const initialState = {
  products: [],

  shoppingCart: [],
};

// attach persistant ability to createStore function.
const createPersistStore = persist(createStore);
// instantiate persistant store with keys which are necessary
// to be persisted and initial state
const { connect, dispatch } = createPersistStore(['shoppingCart', 'products'])(initialState);

export {
  connect,
  dispatch,
};

```
