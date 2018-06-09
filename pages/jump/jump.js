// pages/about/about.js
var app = getApp();
Page({
  data: {
    isiOS:app.globalData.isiOS,
    anim: {}
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    var animation = wx.createAnimation({
      duration: 1500,
      timingFunction: "ease",
      delay: 0
    });
    animation.opacity(1).step();
    this.setData({
      anim: animation.export()
    });
    console.log(wx.getSystemInfoSync());
  },
  onReady: function() {
    // 页面渲染完成

  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  tapBack: function() {
    wx.navigateToMiniProgram({
      appId: 'wx67fbba6cd94591e4',
      path: '',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'develop',
      success(res) {
        // 打开成功
      }
    })
  }
})