// pages/products/products.js
import { connect, dispatch } from '../../store/demo';
import { requestProducts } from '../../api';

Page(connect((state) => ({ products: state.products }))({
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    const { products } = this.data;
    if (products && products.length > 0) return;
    const productsFromRequest = await requestProducts();
    dispatch({ type: 'initializeProducts', payload: productsFromRequest });
  },

  onBuy(e) {
    const { index } = e.currentTarget.dataset;
    dispatch({ type: 'buyProduct', payload: index });
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
