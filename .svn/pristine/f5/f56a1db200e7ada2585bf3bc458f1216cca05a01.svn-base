var proof = require('../../../utils/proof.js');
var constract = require('../../../utils/constract.js');
var app = getApp();
Page({
  data: {
    flag:true,
    mes:'获取验证码'
  },
  onLoad: function (options) {
  
  },
  phone: function(e) {
    console.log(e);
    this.data.phone=e.detail.value;
  },
  code:function(e){
    this.data.code = e.detail.value;
  },
  bindcode: function(){
    var that=this;
    var phone=this.data.phone;
    if (!proof.isMobile(phone)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号',
        showCancel: false
      });
      return;     
    };
    
    wx.request({
      url: constract.sendCode,
      data: { phone: phone },
      success: function (res) {
      }
    })
    proof.settime(that);
  },
  submit:function(e){
    var that=this;
    var data = e.detail.value;
    var phone = data.phone;
    var code = data.code;
    if (!proof.isMobile(phone)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号',
        showCancel: false
      });
      return;
    };
    if (!code) {
      wx.showModal({
        title: '提示',
        content: '请获取验证码',
        showCancel: false
      });
      return;
    };
    app.Verification(function (token) {
      wx.request({
        url: constract.updatePhone,
        header: { token: token },
        data:data,
        success: function (res) {
          if(res.data.msg=="验证码错误"){
            wx.showModal({
              title: '提示',
              content: '验证码错误',
              showCancel: false
            });
            return;
          }
          wx.navigateBack();
        }
      });
    })
    
  }
})