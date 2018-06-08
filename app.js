/*App() 函数用来注册一个小程序。接受一个 object 参数，其指定小程序的生命周期函数等
*最外层的整个{ }就是一个object 参数。
*生命周期为Launch方法（app.js）---onShow方法（app.js）---onLoad方法（首页面：offer.js的onLoad方法）*/
//var token = require('/utils/token.js');
App({
  //监听小程序显示，当小程序启动，或从后台进入前台显示，会触发 onShow
  onShow: function(options) {
    //调用API从本地缓存中获取数据
    //这里需要修改
    console.log(options);
    this.globalData.scene = options.scene;
    this.globalData.fromPath = options.path;
  },
  //监听小程序初始化，当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
  onLaunch:function(options){
    //这里需要修改
    //console.log(options);
    //this.globalData.scene = options.scene;
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: function(res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  setFav: function(key, value){
    var obj = wx.getStorageSync('fav') || {};
    obj[key] = value;
    wx.setStorageSync('fav', obj);
  },
  getFav: function(key){
    if (typeof key === 'undefined') {
      return wx.getStorageSync('fav');
    }
    else{
      if (typeof key === 'string') {
        return wx.getStorageSync('fav')[key];
      }
      else{
        return undefined;
      }
    }
    
  },
  delFav: function(key){
    var obj = wx.getStorageSync('fav') || {};
    if (key in obj) {
      delete obj[key];
    }
    wx.setStorageSync('fav', obj);    
  },
  getCache: function(id) {
    return this.cache[id];
  },
  setCache: function(id, value) {
    this.cache[id] = value;
  },

  //接收Ajax数据
  getAjaxData: function(param) {
    var tempObj, textls = [],
      //限制句柄
      _this = this;
    if (param.url === undefined) {
      throw 'url is underfined';
    }
    if (param.data === undefined) {
      throw 'data is underfined';
    }
    if (typeof param.success === 'undefined') {
      throw 'callback is undefined';
    }
    //push往数组里加元素,返回长度,concat连接数组，encodeURIComponent
    //textls.push('access_token'.concat('=', encodeURIComponent(this.globalData.token)));
    for (var i in param.data) {
      textls.push(i.concat('=', encodeURIComponent(param.data[i])));
    }
    //发起请求
    wx.request({
      url: param.url,  //一个后台controller提供的方法
      data: textls.join('&'),  //传入参数
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'Content-Type': 'application/json'  //json数据类型
      }, // 设置请求的 header
      success: function(res) {
        // success
        var sour = {};
        console.log("app get data",res.data);
        param.success(res);
        /*
        if (typeof param.success === 'function' && res.data.r === 1) {
          //后台返回的数据
          //res.data为固定用法，info是json中的info
        
          if (res.data instanceof Array) {
            res.data.forEach((v, i) => {
              _this.setCache(v.id, v);
            });
          }
          param.success(res);
        } else {
          if (res.data.r !== 1) {
            wx.showToast({
              'title': res.data.msg,
              'icon': 'loading',
              'duration': 1000
            });
          }
        }*/
      },
      fail: function(res) {
        // fail
        if (typeof param.fail === 'function') {
          param.fail(res);
        }
      },
      complete: function(res) {
        // complete
        if (typeof param.complete === 'function') {
          param.complete(res);
        }

      }
    });
  },
  cache: {},
  //定义全局变量
  globalData: {
    isiOS: wx.getSystemInfoSync().system.indexOf('iOS') === -1?false:true,
   // token: token.token,
    domain: 'http://localhost:8080/offer',
    userInfo: null,
    scene: 1001,
    fromPath: '',
    needReq: true
  }
});