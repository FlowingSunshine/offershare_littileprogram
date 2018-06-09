/*Page() 函数用来注册一个页面。接受一个 object 参数()里面的就是
其指定页面的初始数据、生命周期函数、事件处理函数等*/
//获取APP实例
var app = getApp();
Page({
    //定义wxml的动态元素,页面初始数据
    data: {
        ads: [],   //？？
        list: [],   //数据list
        isNewest: true,   //最新
        kind: 'date',   //请求数据种类
        inputShowed: false,   //xiansh
        hasData: true,
        anim: {},
        history: [],
        inputval:'',
        keyword: '',            
    },
    cache : [],

    //转发
    onShareAppMessage: function () {
      return {
        title: 'OfferShow-最可信的校招薪水交流平台',
        path: 'pages/offer/offer',
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
      };
    },
     
    /*页面加载，一个页面只会调用一次,接收页面参数   
    可以获取wx.navigateTo和wx.redirectTo及<navigator/>中的 query*/
    onLoad: function(options) {
    
    },
    /*页面显示,每次打开页面都会调用一次。访问后台获取信息 */
    onShow: function(){
    // 页面初始化 
        if (app.globalData.needReq || this.cache.length < 1) {
          app.globalData.needReq = false;
          //调用getInfo，我需要一个后台提供的url,获取list信息(url，pastData,cache)
          this.getInfo([app.globalData.domain, 'offer/select', this.data.kind, ''].join('/'), {}, true);
          //转发小程序函数
          //this.getAds();
          //是最新列表而非搜索页
          this.setData({
            isNewest: true
          })
          this.setData({
            'history':wx.getStorageSync('history') || []
          });      
        }
        /*
        this.getInfo([app.globalData.domain, 'webapi', this.data.kind, ''].join('/'), {});
        this.getAds();
        this.isNewest = true;//是最新列表而非搜索页
        this.setData({
          'history':wx.getStorageSync('history') || []
        });
        */        
    },
    
/*    // 下拉刷新  
    onPullDownRefresh: function () {
      // 显示顶部刷新图标  
      wx.showNavigationBarLoading();
      var that = this;
      wx.request({
        url: 'https://xxx/?page=0',
        method: "GET",
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          that.setData({
            list: list,
            hasData: list.length ? true : false
          });
          // 设置数组元素  
          that.setData({
            list: that.data.moment
          });
          console.log(that.data.moment);
          // 隐藏导航栏加载框  
          wx.hideNavigationBarLoading();
          // 停止下拉动作  
          wx.stopPullDownRefresh();
        }
      })
    },  

    
   // 页面上拉触底事件的处理函数 
   
    onReachBottom: function () {
      var that = this;
      // 显示加载图标  
      wx.showLoading({
        title: '玩命加载中',
      })
      // 页数+1  
      page = page + 1;
      wx.request({
        url: 'https://xxx/?page=' + page,
        method: "GET",
        // 请求头部  
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          // 回调函数  
          var offer_list = that.data.moment;

          for (var i = 0; i < res.data.data.length; i++) {
            offer_list.push(res.data.data[i]);
          }
          // 设置数据  
          that.setData({
            moment: that.data.moment
          })
          // 隐藏加载框  
          wx.hideLoading();
        }
      })
    },  
*/
    //i can't  understand
    /*
    getAds: function() {
      var _this = this;
      app.getAjaxData({
          url: [app.globalData.domain, 'webapi/weixinad', ''].join('/'),
          data: {},
          success: function(res) {
            // success 将获取的数据存放
            var list = res.data.info.map(function(v){
                //assign将{}的值拷贝到v中
              return Object.assign(v, {'res_jumpurl': encodeURIComponent(v.res_jumpurl)});
            });
            // wx.hideToast();            
            _this.setData({
              ads: list
            });
          }
        });
    },
    
    /*获取信息
    */
    
    getInfo: function (urltext, pastData = ["limit = 10", "offset=1"], cache = false) {
        console.log("getInfo start");
        var _this = this;
        //显示消息提示框
        wx.showToast({
          title: 'loading',  //提示的内容
          icon: 'loading',  //图标，有效值 "success", "loading", "none"
          duration: 1000   //提示的延迟时间，单位毫秒，默认：1500
        });
        //调用app.js中getAjaxData函数
        app.getAjaxData({
          url: urltext,
          data: pastData,
          //服务器响应成功的回调
          success: function(res) {
            // 调用成功返回res.data
            var list = res.data;
            if (list.length < 1){
              wx.showToast({
                title: '无结果',
                icon: 'loading',
                duration: 10000
              });
            }
            else{
              
              wx.hideToast(); //隐藏消息提示框
            }
            //更新data的list
            _this.setData({
              list: list,
              hasData: list.length?true:false
            });
            if (cache) {
              _this.cache = list;
            }
          },
          // 接口调用失败的回调
          fail: function(res) {
            // fail
            wx.showToast({
              title: 'failed',
              icon: 'loading',
              duration: 10000
            });
          },
          // 接口调用结束的回调（成功失败都会执行）
          complete: function(res) {
            // complete
          }
        });
    },
    
    //显示输入
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    //隐藏输入
    hideInput: function () {
          this.setData({
              inputShowed: false
          });
    },

    //输入关键词
    inputTyping: function (e) {
      var dataToSet = {};
      this.setData({
        'keyword':e.detail.value          
      });
      if (e.detail.value === '') {
        // this.getInfo([app.globalData.domain, 'webapi', this.data.kind, ''].join('/'), {});
        this.setData({
          isNewest: true
        })
        dataToSet.list = this.cache;
        dataToSet.hasData = this.cache.length?true:false;
        this.setData(dataToSet);
      }
    },

    //点击搜素历史进行搜索
    clickHistory:function(e){
      this.setData({
        'keyword':e.currentTarget.dataset.word
      });
      this.tapSearch();
    },
    //清除搜索历史
    clearHistory: function(e){
        wx.setStorageSync('history', []);
        this.setData({
          'history':[]
        });        
    },   

    //
    tapBackground: function(e){
        if (e.target.id === 'historyBackground'){
          this.hideInput();
        }
    },
    //搜素触发
    tapSearch: function() {
        var history = this.data.history;
        this.hideInput();
        //关键词为空
        if (this.data.keyword.trim() === '') {
          if ( this.data.isNewest) {//是最新列表而非搜索页
            wx.showToast({
              'title': '关键词为空',
              'icon': 'loading',
              'duration': 1000
            });
          }
          else{
            app.globalData.needReq = true;
            this.onShow();
          }
        }
        else{
          //go
          this.setData({
            isNewest: false
          });
          //进行搜索，设置非最新列表
          this.getInfo(
            [app.globalData.domain, 'webapi/jobsearch', ''].join('/'),
            {
              'content': this.data.keyword.trim()
            });
          //如果当前搜索词不在历史中，添加到history中
          if (history.indexOf(this.data.keyword) === -1){
            //保持4个历史,unshift向数组的开头添加一个或更多元素，并返回新的长度
            history.unshift(this.data.keyword.trim());
            while(history.length > 4){
              history.pop();
            }
            wx.setStorageSync('history', history);
            this.setData({
              'history':history
            });
          }
        }
    },
    //跳转About页面
    tapAbout: function() {
        wx.navigateTo({
          url: '../about/about'
        });
    }
});
