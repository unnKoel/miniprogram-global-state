// logs.js
const util = require('../../utils/util.js');

Page({
  data: {
    logs: [],
  },
  onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map((log) => ({
        date: util.formatTime(new Date(log)),
        timeStamp: log,
      })),
    });
  },
});
