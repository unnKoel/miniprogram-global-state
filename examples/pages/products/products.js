// pages/products/products.js
import { connect, dispatch } from '../../store/index';
import { requestProducts } from '../../api';

Page(connect((state) => ({ products: state.products }))({
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    console.log('products', this.data);
    const products = await requestProducts();
    dispatch((state) => ({ ...state, products }));
  },

  onBuy(e) {
    const { index } = e.currentTarget.dataset;
    dispatch((state) => {
      const { products, shoppingCart } = state;
      const product = products[index];
      product.num -= 1;
      const newShoppingCart = [...shoppingCart, product];
      return { ...state, products: [...products], shoppingCart: newShoppingCart };
    });
  },

  onTapProduct(e) {
    const { dataset: { index } } = e.currentTarget;
    wx.navigateTo({
      url: `/pages/detail/detail?index=${index}`,
    });
  },

  navToCart() {
    wx.navigateTo({
      url: '/pages/shopping-cart/shopping-cart',
    });
  },
}));
