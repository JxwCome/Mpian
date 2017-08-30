//index.js
//获取应用实例
var app = getApp();
var constract = require('../../utils/constract.js');
Page({
  data: {
    userInfo:[],
    erm: false,
    label:''
  },
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    that.setData({
      id:id
    })
  },
  onShow:function(){
    var that=this;
    var id=that.data.id;
    app.Verification(function (token) {
      wx.request({
        url: constract.popilarity,
        header: { token: token },
        data: { uid: id },
        success: function (res) {
          console.log(res);
        }
      });
      wx.request({
        url: constract.other,
        header: { token: token },
        data: { passiveUid: id },
        success: function (res) {
          that.setData({
            userInfo: res.data.data
          })

        }
      })
    })
  },
  praised:function(){
    var that = this;
    var id = this.data.userInfo.id;
    var likeState = this.data.userInfo.likeState;
    app.Verification(function (token) {
      wx.request({
        url: constract.likeAddOrEdit,
        header: { token: token },
        data: { like_uid: id },
        success: function (res) {
          wx.request({
            url: constract.other,
            header: { token: token },
            data: { passiveUid: id },
            success: function (res) {
              if (likeState!=0){
                that.setData({
                  userInfo: res.data.data,
                  flag: true
                })
              }else {
                that.setData({
                  userInfo: res.data.data
                })
              }         
            }
          })
        }
      })
    })
  },
  collected: function () {
    var that = this;
    var id = this.data.userInfo.id;
    var collectState = this.data.userInfo.collectState;
    app.Verification(function (token) {
      wx.request({
        url: constract.collectionAddOrEdit,
        header: { token: token },
        data: { collection_uid: id },
        success: function (res) {
          wx.request({
            url: constract.other,
            header: { token: token },
            data: { passiveUid: id },
            success: function (res) {
              if (collectState != 0) {
                that.setData({
                  userInfo: res.data.data,
                  sep: true
                })
              } else {
                that.setData({
                  userInfo: res.data.data
                })
              } 
              
            }
          })
        }
      })
    })
  }
})