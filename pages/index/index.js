//index.js
//获取应用实例
var app = getApp();
var constract = require('../../utils/constract.js');
Page({
  data:{
    erm:true,
    show: false
  },
  onLoad:function(){
    var that=this;
    
  },
  onShow: function(){
    var that = this;
    app.Verification(function(token){
      wx.request({
        url: constract.index,
        header:{token:token},
        success:function(res){
          var userInfo = res.data.data;
          if (userInfo.state == 0) {
            wx.showModal({
              title: '您还没有名片',
              content: '创建自己的名片，让大家认识你',
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/add-card/add-card?avatar=' + userInfo.avatar + '&name=' + userInfo.name,
                  })
                }
              }
            })
          };
          that.setData({
            userInfo: userInfo
          });
        }
      });
    })
  },
  share:function(){
    if (!wx.canIUse('button.open-type.share')){
      wx.showModal({
        title: '提示',
        content: '点击右上角转发分享',
        showCancel: false
      });
    }
  },
  know:function(){
    this.setData({
      show: false
    })
  },
  generate:function(){
    var certificState = this.data.userInfo.certificState;
    if (certificState==null){
      certificState=0;
    }
    if (wx.showLoading) {
      wx.showLoading({
        title: '保存中'
      });
    }
    app.Verification(function (token){
      wx.request({
        url: constract.generateImg,
        header:{token:token},
        data: { state: certificState},
        success:function(res){
          if (wx.hideLoading) {
            wx.hideLoading();
          };
          var img=res.data.data;
          wx.previewImage({
            urls: [img]
          })
        }
      })

    })
  },
  onShareAppMessage:function(){
    var id = this.data.userInfo.id;
    var state = this.data.userInfo.state;
    var that=this;
      return {
        title: '幸运遇到您！这是我名片请惠存！',
        path: '/pages/partner/partner?id='+id
      }
  }
})
