  
var app = getApp();
var constract = require('../../../utils/constract.js');
Page({

  data: {
  },
  onShow: function () {
    var that=this;
    app.Verification(function (token) {
      wx.request({
        url: constract.sysMessage,
        header: { token: token },
        success: function (res) {
          console.log(res);
          var news = res.data.data;
          that.setData({
            news: news
          });
        }
      });
    })
  },
  delete: function (e) {
    var that = this;
    var id = e.target.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定要删除这条消息么？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: constract.deleteMsg,
            data:{id:id},
            success:function(res){
              app.Verification(function (token) {
                wx.request({
                  url: constract.sysMessage,
                  header: { token: token },
                  success: function (res) {
                    var news = res.data.data;
                    that.setData({
                      news: news
                    });
                  }
                });
              })
            }
          })
          
        }
      }
    })
  },
  edit:function(e){
    var id = e.currentTarget.dataset.id;
    wx.request({
      url: constract.noticEedit,
      data:{id:id}
    })

  },
  touchstart: function (e) {
    var list = this.data.news;
    var index = e.currentTarget.dataset.index;
    if (e.touches.length == 1) {
      for (var i = 0; i < list.length; i++) {
        if (i != index) {
          console.log(i);
          list[i].txtStyle = "left:0px";
        }
      };
      this.setData({
        startX: e.touches[0].clientX,
        news:list
      })
    }
  },
  touchmove: function (e) {
    var that = this;
    if (e.touches.length == 1) {
      var moveX = e.touches[0].clientX;
      var disX = that.data.startX - moveX;

      var txtStyle = '';
      if (disX == 0 || disX < 0) {
        txtStyle = "left:0px";
      } else if (disX > 0 && disX < 50) {
        txtStyle = "left:-" + disX + "px";
      } else {
        txtStyle = "left:-120rpx";
      }
      var index = e.currentTarget.dataset.index;
      var list = this.data.news;
      list[index].txtStyle = txtStyle;
      this.setData({
        news: list
      })
    };
  },
  touchend: function (e) {
    if (e.changedTouches.length == 1) {
      var endX = e.changedTouches[0].clientX;
      var disX = this.data.startX - endX;
      var txtStyle = disX > 50 ? "left:-120rpx" : "left:0px";
      var index = e.currentTarget.dataset.index;
      var list = this.data.news;
      list[index].txtStyle = txtStyle;
      this.setData({
        news: list
      })
    }
  }
})