var proof = require('../../utils/proof.js');
var constract = require('../../utils/constract.js');
var app = getApp();
Page({
  data: {
    flag: true,
    mes: '获取验证码',
    num:0,
    sex:2,
    seximg:false,
    text:false
  },

  onLoad: function (options) {
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        var abc = res.system.substr(0, 3);
        if (abc == "iOS") {
          that.setData({
            text: true,
            seximg:true
          })
        }
      },
    });
    this.setData({
      userInfo: options,
      avatar: options.avatar
    })
  },
  phone: function (e) {
    this.data.phone = e.detail.value;
  },
  code: function (e) {
    this.data.code = e.detail.value;
  },
  bindinput: function (e) {
    var txt = e.detail.value;
    this.setData({
      num: txt.length
    })
  },
  bindcode: function () {
    var that = this;
    var phone = this.data.phone;
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
      data:{phone:phone},
      success:function(res){
        console.log(res);
      }
    });
    proof.settime(that);
  },
  avatar:function(){
    var that=this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths[0];
        that.setData({
          avatar: tempFilePaths
        })
      }
    })
  },
  sex:function(e) {
    console.log(e);
    this.setData({
      sex:e.detail.value
    })
  },
  submit: function (e) {
    var data = e.detail.value;
    var name = data.name;
    var phone = data.phone;
    var code = data.code;
    var email = data.email;
    var avatar = this.data.avatar;
    if (proof.trim(name) == '') {
      wx.showModal({
        title: '提示',
        content: '姓名不能为空',
        showCancel: false
      });
      return;
    };
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
    if (proof.trim(email) !== '') {
      if (!proof.isEmail(email)) {
        wx.showModal({
          title: '提示',
          content: '请输入正确的邮箱格式',
          showCancel: false
        });
        return;
      }
    };
    
    if (wx.showLoading) {
      wx.showLoading({
        title: '保存中'
      });
    };
    app.Verification(function (token) {
      wx.request({
        url: constract.add,
        header:{token:token},
        data:data,
        success:function(res){
          
          if(res.data.msg=="验证码错误"){
            wx.hideLoading();
            wx.showModal({
              title: '提示',
              content: '验证码错误',
              showCancel: false
            });
          }else {
            wx.uploadFile({
              url: constract.imgsUpdate,
              header: { token: token },
              filePath: avatar,
              name: "avatar",
              complete:function(res){
                if (wx.hideLoading) {
                  wx.hideLoading();
                };
                wx.navigateBack();
              }
            
            })
          }
          
        }
      })
    })
    
  }
})