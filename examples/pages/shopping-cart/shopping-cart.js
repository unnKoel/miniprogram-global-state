// pages/shopping-cart/shopping-cart.js
import { connect } from '../../store/demo';

Page(connect((state) => ({ shoppingCart: state.shoppingCart }))({
}));
