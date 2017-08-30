var constract = require('../../../utils/constract.js');
var app = getApp();
Page({
  data: {
    flag:true
  },

  onLoad: function (options) {
    var that=this;
    if (options.perstate!=1){
      wx.showModal({
        title: '您还没有名片',
        content: '创建自己的名片，让大家认识你',
        success: function (res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '/pages/add-card/add-card?avatar=' + options.avatar + '&name=' + options.name
            })
          } else if (res.cancel) {
            wx.navigateBack();
          }
        }
      })
      return;
    };
    app.Verification(function (token) {
      wx.request({
        url: constract.userCertification,
        header: { token: token },
        success: function (res) {
          var user=res.data.data;
          if (!user) {
            user = { state: options.state};
          }
          that.setData({
            user:user,
          })
        }
      })
    })
  },
  upload: function(e) {
    var that=this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        var tempFilePaths = res.tempFilePaths[0];
        var type = e.currentTarget.dataset.type;
        var user = that.data.user;
        user.img = tempFilePaths;
        user.type = type;
        that.setData({
          user:user,
          flag:false
        })

      }
    })
  },
  submit:function(){
    var that=this;
    var type=this.data.user.type;
    var img = this.data.user.img;
    console.log(img);
    app.Verification(function (token) {
      wx.uploadFile({
        url: constract.certification,
        header: { token: token },
        filePath: img,
        name: "img",
        formData: { type: type },
        success: function (res) {
          wx.request({
            url: constract.userCertification,
            header: { token: token },
            success: function (res) {
              that.setData({
                user: res.data.data
              })
            }
          })
        }
      })
      
    }) 
  },
  resubmit:function(){
    var user=this.data.user;
    user.state=0;
    this.setData({
      user:user,
      flag:true
    })
  }
})