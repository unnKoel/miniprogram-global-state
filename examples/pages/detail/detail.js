// pages/detail/detail.js
import { connect, dispatch } from '../../store/index';

Page(connect((state) => ({ products: state.products }))({
  /**
   * 页面的初始数据
   */
  data: {
    product: {},
    index: 0,
  },

  derived() {
    const { index, products } = this.data;
    this.setData({
      product: products[index],
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    const { index } = e;

    this.setData({
      index,
    });
  },

  onBuy() {
    const { index } = this.data;

    dispatch((state) => {
      const { products, shoppingCart } = state;
      const product = products[index];
      product.num -= 1;
      const newShoppingCart = [...shoppingCart, product];
      return { ...state, products: [...products], shoppingCart: newShoppingCart };
    });
  },

  navToCart() {
    wx.navigateTo({
      url: '/pages/shopping-cart/shopping-cart',
    });
  },
}));
