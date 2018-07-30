// pages/mine/mine.js
var app = getApp();
Page({
  data:{
    list:[],
    hasData: false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    var storage = app.getFav();
    var offerList = Object.keys(storage).map(key => storage[key]);
    this.setData({
      list: offerList,
      hasData: offerList.length?true:false
    });
    storage = null;
    offerList = null;
  }, 
  /*
  onShow: function () {
   // 页面初始化 options为页面跳转所带来的参数 
        if (app.globalData.needReq || this.cache.length < 1) {
          app.globalData.needReq = false;
          //查询URL
          this.getInfo([app.globalData.domain, 'webapi', this.data.kind, ''].join('/'), {}, true);
        }
  },

  getInfo: function (urltext, pastData = {}, cache = false) {
    var _this = this;
    wx.showToast({
      title: 'loading',
      icon: 'loading',
      duration: 10000
    });
    app.getAjaxData({
      url: urltext,
      data: pastData,
      success: function (res) {
        // success
        var list = res.data.info;
        if (list.length < 1) {
          wx.showToast({
            title: '无结果',
            icon: 'loading',
            duration: 1000
          });
        }
        else {
          wx.hideToast();
        }
        // wx.hideToast();            
        _this.setData({
          list: list,
          hasData: list.length ? true : false
        });
      },
      fail: function (res) {
        // fail
        wx.showToast({
          title: 'failed',
          icon: 'loading',
          duration: 10000
        });
      },
      complete: function (res) {
        // complete
      }
    });
  },*/
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
});