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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    console.log(this.data);
    const { index } = e;
    const product = this.data.products[index];

    this.setData({
      product,
      index,
    });
  },

  onBuy() {
    const { index } = this.data;

    dispatch((state) => {
      const { products } = state;
      const product = products[index];
      product.num -= 1;
      return { ...state, products: [...products] };
    });
  },
}));
