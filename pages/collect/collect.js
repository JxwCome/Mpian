var app = getApp();
var constract = require('../../utils/constract.js');
Page({
  data: {
    flag:true,
    collect: []
  },
  onLoad:function (options){
    var that = this;
    var type=options.type;
    var id = options.id;
    this.setData({
      type: type
    });
    if (wx.showLoading) {
      wx.showLoading({
        title: '加载中'
      });
    };
    if(type==1){
      wx.setNavigationBarTitle({
        title: '点赞我的'
      });
      app.Verification(function (token) {
        wx.request({
          url: constract.findLikeme,
          header: {token:token},
          success: function (res) {
            if (wx.hideLoading) {
              wx.hideLoading();
            };
            that.setData({
              collect: res.data.data
            })
          }
        })
      })
      
    };
    if (type == 2) {
      wx.setNavigationBarTitle({
        title: '收藏我的'
      });
      app.Verification(function (token) {
        wx.request({
          url: constract.findCollectme,
          header: { token: token },
          success: function (res) {
            if (wx.hideLoading) {
              wx.hideLoading();
            };
            that.setData({
              collect: res.data.data
            })
          }
        })
      })
    };
    if (type == 3){
      wx.setNavigationBarTitle({
        title: 'Ta添加了该印象'
      });
      app.Verification(function(token){
        wx.request({
          url: constract.findImpressMeUser,
          header: { token: token },
          data: { impression_name:options.name},
          success: function(res){
            if (wx.hideLoading) {
              wx.hideLoading();
            };
            that.setData({
              collect: res.data.data
            })
          }
        })
      })
    };
    if (type == 4) {
      wx.setNavigationBarTitle({
        title: '分组联系人'
      });
      app.Verification(function (token) {
        wx.request({
          url: constract.findGroupUser,
          header: { token: token },
          data: { group_id: id },
          success: function (res) {
            if (wx.hideLoading) {
              wx.hideLoading();
            };
            that.setData({
              collect: res.data.data
            })
          }
        })
      })
    }
    
  }
  
})