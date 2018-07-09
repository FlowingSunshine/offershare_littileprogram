// pages/main/main.js
var app = getApp();
Page({
  data: {
    list: [],
    kind: 'select/heat',
    keyword: '',
    anim: {},
    page:0,
    history:[],
    offerlimit:10,
  },
  onShareAppMessage: function () {
    return {
      title: '校招薪水交流平台',
      path: 'pages/hot/hot',
      success: function(res) {
        wx.showToast({
          'title':'分享成功',
          'icon':'success',
          'duration': 1000
        });
      },
      fail: function(res) {
        // 分享失败
      }
    }
  },     
  getInfo: function (urltext, pastData = []) {
    var _this = this;
    wx.showToast({
      title: 'loading',
      icon: 'loading',
      duration: 10000
    });
    app.getAjaxData({
      url: urltext,
      data: pastData,
      success: function(res) {
        // success
        var list = res.data;
        console.log("hot get list:",list);
          // select unique corperation
          var hash = {};
          var filted = [];
          var temp = {
            'company': list.companyName,
            'number': 0,
            'positions': []
          };
          /*
          var ii = 0;
          list.forEach((v, i) => {
            if (hash.hasOwnProperty(v.company)) {
              hash[v.company].number += v.number;
              if(hash[v.company].positions.length < 3){
                hash[v.company].positions.push(v.position.slice(0,5));
              }
            } else {
              hash[v.company] = {
                'company': v.company,
                'number': v.number,
                'positions': [v.position.slice(0,5)]
              }
            }
          });
          filted = Object.keys(hash).map(key => hash[key]);

          filted.sort((a, b)=>{
            return b.number - a.number;
          });*/
          _this.setData({
            list: _this.data.history.concat(list),
            corpMode: true
          });
          _this.data.history=_this.data.list;
          console.log(_this.data.history);
      },
      fail: function(res) {
        // fail
        wx.showToast({
          title: 'failed',
          icon: 'success',
          duration: 10000
        });
      },
      complete: function(res) {
        // complete
        wx.hideToast();
      }
    });
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getInfo([app.globalData.domain, 'offer', this.data.kind, ''].join('/'));
  },
  onReady: function() {
    // 页面渲染完成
  },
  // onShow: function() {
  //   // 页面显示
  //   var animation = wx.createAnimation({
  //     duration: 300,
  //     timingFunction: "ease",
  //     delay: 0
  //   });
  //   animation.translate(0, -20).step();
  //   animation.translate(0, 0).step();
  //   this.setData({
  //     anim: animation.export()
  //   });        
  // },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  /** 
   * 页面下拉刷新事件的处理函数 
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    // 隐藏导航栏加载框  
    // app.globalData.offerpagehistory = app.globalData.offerpagehistorycache;
    this.data.offerlimit = this.data.history.length;
    this.data.history= [];

    this.getInfo([app.globalData.domain, 'offer', this.data.kind, '?limit=' + this.data.offerlimit].join('/'), {}, true);
    wx.hideNavigationBarLoading();
    // 停止下拉动作  
    wx.stopPullDownRefresh();

  },

    /** 
   * 页面上拉触底事件的处理函数 
   */
  onReachBottom: function () {
    //var that = this;  
    //var history = that.data.list;

    console.log("history:", history);
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1  

    this.data.page = this.data.page + 1;
    console.log("pagetime:", this.data.page);
    offset = this.data.page * 10;
    this.getInfo([app.globalData.domain, 'offer', this.data.kind, '?offset=' + offset].join('/'), {}, true);

  }, 

  
  tapAbout: function() {
    wx.navigateTo({
      url: '../about/about'
    });
  }
});
