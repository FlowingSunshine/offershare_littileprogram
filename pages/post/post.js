// pages/post/post.js
var app = getApp();
Page({
  data:{
    category:[
      '销售|客服|市场',
      '财务|人力资源|行政',
      '项目|质量|高级管理',
      'IT|互联网|通信',
      '房产|建筑|物业管理',
      '金融',
      '采购|贸易|交通|物流',
      '生产|制造',
      '传媒|印刷|艺术|设计',
      '咨询|法律|教育|翻译',
      '服务业',
      '能源|环保|农业|科研',
      '服务业',
      '兼职|实习|社工|其他'     
    ],
    title:[
      '博士985',
      '博士211',
      '博士其他',
      '硕士985',
      '硕士211',
      '硕士其他',
      '本科985',
      '本科211',
      '本科其他',
      '大专',
      '其它'  
    ],
    cateIndex:3,
    titleIndex:6,
    isInput:false,
    toViewId:'basic'
  },
  info:{
    company:'',
    position:'',
    city:'',
    salary:'',
    remark:''
  },
  matchreg : {
    'default':/^.{2,12}$/,
    'remark':/.{2,450}/
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  onFocus:function(){
    this.setData({
      isInput:true,
      toViewId:'remark'
    });
  },
  onBlur:function(){
    this.setData({
      isInput:false,
      toViewId:'basic'
    });    
  },
  changeCate:function(e){
    this.setData({
      cateIndex: e.detail.value
    });
  },
  changeTitle:function(e){
    this.setData({
      titleIndex: e.detail.value
    });
  },  
  onInput:function(e){
    var text = e.detail.value.trim();
    var regitem = this.matchreg[e.target.id]|| this.matchreg['default'];
    this.info[e.target.id] = e.detail.value.trim();
    if  (text.length > 1){
      if  (!regitem.test(text)){
        wx.showToast({
          'title':'超出限制',
          'icon':'loading',
          'duration':1000
        });      
      }
    }
  
  },
  tapConfirm:function(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定提交信息？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          that.tapSubmit();
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })
  },
  //跳转到tabBar页面，并关闭其他所有非tabBar页面
  tapAbove:function(){
    wx.switchTab({
      url: '/pages/offer/offer'
    });
    //wx.navigateBack();
  },
  tapCancel:function(){
  },
  tapSubmit:function(){
    var param = {
      'category':this.data.category[this.data.cateIndex],
      'company_name':this.info.company,
      //'position':this.info.position,
      //'city':this.info.city,
      'title':this.info.position,
      'salary_month':this.info.salary,
      'salary_year':"22w",
      "user_id":1,
      'education':this.data.title[this.data.titleIndex]
    };   
    var regitem ;
    /*
    for(var i in param){
      regitem = this.matchreg[i]||this.matchreg['default'];
      if(!regitem.test(param[i])){
        wx.showToast({
          'title':'信息格式不符',
          'icon':'loading',
          'duration':1000
        });
        return;        
      }
    }*/
    param['content'] = this.info.remark;
    wx.showToast({
      'title':'提交中',
      'icon':'loading',
      'duration':10000
    });
    app.getAjaxData({
     // url: [app.globalData.domain,'webapi/jobrecord',''].join('/'),
      url: [app.globalData.domain, 'offer/add'].join('/'),
      data: param,
      success: function(res){
        wx.showToast({
          'title':'成功',
          'icon':'success',
          'duration':2000
        });
        setTimeout(function(){
          app.globalData.needReq = true;
          wx.navigateBack();
        },1500);
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })    
  },  
})