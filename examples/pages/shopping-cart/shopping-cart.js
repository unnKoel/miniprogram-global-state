// pages/shopping-cart/shopping-cart.js
import { connect, dispatch } from '../../store/index';

Page(connect((state) => ({ shoppingCart: state.shoppingCart }))({
}));
