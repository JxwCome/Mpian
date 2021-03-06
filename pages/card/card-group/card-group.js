// card-group.js
var app = getApp();
var constract = require('../../../utils/constract.js');
Page({
  data: {
    list:[]
  },
  onShow: function () {
    var that = this;
    app.Verification(function (token) {
      wx.request({
        url: constract.findGroup,
        header: {token: token},
        success: function(res){
          that.setData({
            list: res.data.data
          })
        }
      })
    })
  },
  delete:function(e){
    var that=this;
    var id=e.target.dataset.id;
    var items = this.data.list;
    for(var i = 0; i < items.length; i++){
      if(items[i].id == id){
        var count = items[i].count;
      }
    }
    wx.showModal({
      title: '提示',
      content: '确定要删除这个分组？',
      success: function (res) {
        app.Verification(function (token) {
          wx.request({
            url: constract.deleteGroup,
            header: { token: token},
            data: { group_id: id,count: count},
            success: function(res){
              wx.request({
                url: constract.findGroup,
                header: { token: token },
                success: function (res) {
                  that.setData({
                    list: res.data.data
                  })
                }
              })
            }
          })
        })
      }
    })
  },
  touchstart:function(e){
    var list = this.data.list;
    var index = e.currentTarget.dataset.index;
    console.log(index);
    if(e.touches.length==1){
      for (var i = 0; i < list.length; i++) {
        if (i != index) {
          console.log(i);
          list[i].txtStyle = "left:0px";
        }
      };
      this.setData({
        startX: e.touches[0].clientX,
        list:list
      })
    }
  },
  touchmove: function (e) {
    var that=this;
    if(e.touches.length==1){
      var moveX=e.touches[0].clientX;
      var disX=that.data.startX - moveX;

      var txtStyle='';
      if(disX==0||disX<0){
        txtStyle="left:0px";
      } else if (disX > 0 && disX < 60){
        txtStyle="left:-"+disX+"px";
      }else{
        txtStyle = "left:-222rpx";
      }
      var index = e.currentTarget.dataset.index;
      var list=this.data.list;
      list[index].txtStyle=txtStyle;
      this.setData({
        list:list
      })
    };
  },
  touchend: function (e) {
    if(e.changedTouches.length==1){
      var endX=e.changedTouches[0].clientX;
      var disX=this.data.startX-endX;
      var txtStyle = disX > 60 ?"left:-222rpx":"left:0px";
      var index = e.currentTarget.dataset.index;
      var list = this.data.list;
      list[index].txtStyle = txtStyle;
      this.setData({
        list: list
      }) 
    }
  }
})