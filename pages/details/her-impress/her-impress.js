// her-impress.js
var app = getApp();
var constract = require('../../../utils/constract.js');
Page({
  data: {
    labelElse: []
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
    var id=this.data.id;
    wx.request({
      url: constract.otherImpress,
      data: { uid: id },
      success: function (res) {
        that.setData({
          labelElse: res.data.data
        })
      }
    })
  },
  spot:function(e){
    var that=this;
    var id = this.data.id;
    var name = e.currentTarget.dataset.name;
    app.Verification(function (token) {
      wx.request({
        url: constract.impressionAddOrEdit,
        header: { token: token },
        data: { impression_uid: id, impression_name:name},
        success: function (res) {
          if (res.data.code == 14000) {
            wx.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel: false
            });
            return;
          };
          wx.request({
            url: constract.otherImpress,
            data: { uid: id },
            success: function (res) {
              that.setData({
                labelElse: res.data.data
              })
            }
          })
        }
      })
    })

  }


})