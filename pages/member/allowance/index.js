var e = getApp(),
  t = e.requirejs("core"),
  a = e.requirejs("jquery");

Page({
  data: {
    disabled: !0,
    coupon: {
      count: 0
    },
    money: 0,
    sindex: '',
    nickname: '',
    openid: ''
  },
  onLoad: function(t) {
    e.url(t), this.get_list();
  },
  get_list: function() {
    var e = this;
    t.get("member/allowance", {}, function(t) {
      console.log(t)
      e.setData(t);
    });
  },
  bindKeyInput: function(e) {
    var index = e.detail.value;
    var openid = this.data.list[index];
    this.setData({
      nickname: openid.nickname,
      openid: openid.openid,
    })
  },
  money: function(e) {
    var money = e.detail.value;
    this.setData({
      money: money,
    })
  },
  submit: function() {
    var openids = this.data.openid;
    var money = this.data.money;
    var credit = this.data.credit;
    if(!wx.requestSubscribeMessage){
      wx.requestSubscribeMessage({
        tmplIds: ['cOm4GWNW8iPA1cDQWiJWwklAG5rNLSivEtoxxjH6v5I'],
        success () { 
          console.log(11)
        }
      })
    } 
    
    wx.showModal({
      title: '提示',
      content: '确认转发抵用金',
      success(res) {
        if (res.confirm) {
          if (openids == '' || !money) {
            wx.showToast({
              title: '请完整填写信息',
              icon:'none',
              duration: 2000
            })
            return false;
          }
          t.get("member/allowance/submit", {
            openids: openids,
            money: money,
            credit: credit
          }, function(t) {
            wx.showToast({
              title: t.result.message,
              icon:'none',
              duration: 2000
            })
          });
          setTimeout(function(){
            wx.navigateBack({
              delta: 1,
            })
          },2000)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
});