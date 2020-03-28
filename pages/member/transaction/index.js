// pages/member/transaction/index.js
var e = getApp(),
  t = e.requirejs("core"),
  a = e.requirejs("jquery");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (t) {
    e.url(t), this.get_list();
  },
  get_list: function() {
    var e = this;
    t.get("member/transaction", {}, function(t) {
      console.log(t)
      e.setData(t);
    });
  }
})