var app = getApp();
var constract = require('../../utils/constract.js');
var app = getApp();
Page({
  data: {
    erm:false
  },
  onLoad: function (options) {
    var that=this;
    var id = options.id;
    wx.request({
      url: constract.popilarity,
      data: { uid: id}
    });
    app.Verification(function (token) {
      wx.request({
        url: constract.other,
        header:{token:token},
        data: { passiveUid: id},
        success: function (res) {
          if (!res.data.data.state) {
            console.log(res.data.data.state);
            wx.showModal({
              title: '提示',
              content: '对方还没有创建名片！',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.switchTab({
                    url: '/pages/index/index'
                  })
                }
              }
            })   
            return;
          }
          wx.setNavigationBarTitle({
            title: res.data.data.name+"的名片",
          })
          that.setData({
            userInfo: res.data.data
          })
        }
      })
    })
  },

  praised: function () {
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
              if (likeState != 0) {
                that.setData({
                  userInfo: res.data.data,
                  flag: true
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
  },
  collect: function () {
    var that = this;
    var id = this.data.userInfo.id;
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
              that.setData({
                userInfo: res.data.data
              })
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