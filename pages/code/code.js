var app = getApp();
var constract = require('../../utils/constract.js');
Page({
  data: {

  },
  onLoad: function (options) {
    console.log(options);
    var that=this;
    app.Verification(function (token) {
      wx.request({
        url: constract.qrCode,
        header:{token:token},
        success:function(res){
          if(res.data.code!=12000){
            return;
          };
          that.setData({
            avatar: options.avatar,
            name: options.name,
            dimension: res.data.data.qr_code
          })
        }
      })
    });
    
  }
})