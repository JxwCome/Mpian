var constract = require('../../utils/constract.js');
var app = getApp();
Page({
  data: {
    allow:false
  },
  onShow: function () {
    var that=this;
    app.Verification(function (token) {
      wx.request({
        url: constract.myData,
        header: { token: token },
        success: function (res) {
          that.setData({
            mydata: res.data.data
          })
        }
      })
    })  
  }
})