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

  onBuy() {
    console.log('hello world');
  },

  onTapProduct(e) {
    const { dataset: { index } } = e.currentTarget;
    wx.navigateTo({
      url: `/pages/detail/detail?index=${index}`,
    });
  },
}));
