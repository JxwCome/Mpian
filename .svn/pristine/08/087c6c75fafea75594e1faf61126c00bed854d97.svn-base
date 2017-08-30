// new-impress.js
var app = getApp();
var constract = require('../../../../utils/constract.js');
var proof = require('../../../../utils/proof.js');
Page({

  data: {
  
  },

  onLoad: function (options) {
    console.log(options);
    var id = options.id;
    this.setData({
      id:id
    })
  },
  submit: function(e){
    var name = e.detail.value.impression_name;
    if(!proof.trim(name)){
      wx.showModal({
        title: '提示',
        content: '印象不能为空',
        showCancel: false
      });
      return
    }
    if (wx.showLoading) {
      wx.showLoading({
        title: '保存中'
      });
    };
    var id=this.data.id;
    app.Verification(function (token) {
      wx.request({
        url: constract.impressionAddOrEdit,
        header:{token:token},
        data: { impression_uid: id, impression_name:name},
        success:function(res){
          console.log(res);
          if (res.data.code==14000){
            if (wx.hideLoading) {
              wx.hideLoading();
            };
            wx.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel: false
            });
            return;
          }
          if (wx.hideLoading) {
            wx.hideLoading();
          };
          wx.navigateBack();
        }
      })
    })
  }
})