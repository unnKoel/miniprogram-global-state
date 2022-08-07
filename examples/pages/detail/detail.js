// pages/detail/detail.js
import { connect, dispatch } from '../../store/demo';

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
    return { product: products[index] };
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

    dispatch({ type: 'buyProduct', payload: index });
  },

  navToCart() {
    wx.navigateTo({
      url: '/pages/shopping-cart/shopping-cart',
    });
  },
}));
