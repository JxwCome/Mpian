var proof = require('../../utils/proof.js');
var constract = require('../../utils/constract.js');
var app = getApp();
Page({
  data: {
    flag:false
  },
  onLoad: function (options) {
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        var abc = res.system.substr(0, 3);
        if (abc == "iOS") {
          that.setData({
            flag:true
          })
        }
      },
    });
    app.Verification(function (token) {
      wx.request({
        url: constract.index,
        header: { token: token },
        success: function (res) {
          var userInfo = res.data.data;
          that.setData({
            userInfo: userInfo,
            avatar: userInfo.avatar,
            num: userInfo.introduction.length
          });
        }
      });
    })
  },
  onShow: function () {
    var that=this;
    app.Verification(function (token) {
      wx.request({
        url: constract.index,
        header: { token: token },
        success: function (res) {
          var userInfo = res.data.data;
          that.setData({
            'userInfo.phone':userInfo.phone
          });
        }
      });
    })
  },
  avatar: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res);
        var tempFilePaths = res.tempFilePaths[0];
        console.log(tempFilePaths);
        console.log(that.data.avatar)
        that.setData({
          avatar: tempFilePaths
        })
      }
    })
  },
  bindinput:function(e){
    var txt=e.detail.value;
    console.log(txt.length);
    this.setData({
      num:txt.length
    })
    
  },
  submit:function(e){
    var data = e.detail.value;
    var name = e.detail.value.name;
    var email = e.detail.value.email;
    var avatar = this.data.avatar;
    if (proof.trim(name)==''){
      wx.showModal({
        title: '提示',
        content: '姓名不能为空',
        showCancel: false
      });
      return;
    };
    if (proof.trim(email)!==''){
      if (!proof.isEmail(email)){
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
    }
    app.Verification(function (token) {
      wx.request({
        url: constract.userEdit,
        header:{token:token},
        data:data,
        success:function(res){
          wx.uploadFile({
            url: constract.imgsUpdate,
            header: { token: token },
            filePath: avatar,
            name: "avatar",
            complete: function (res) {
              if (wx.hideLoading) {
                wx.hideLoading();
              };
              wx.navigateBack();
            }

          })
        }

      })
    })
  }
})