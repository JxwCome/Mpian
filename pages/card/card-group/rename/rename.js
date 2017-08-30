// rename.js
var app = getApp();
var constract = require('../../../../utils/constract.js');
Page({
  data: {
    
  },

  onLoad: function (options) {
    if (!options.name){
      wx.setNavigationBarTitle({
        title: '新建分组'
      })
      return;
    }else{
      wx.setNavigationBarTitle({
        title: '重命名分组'
      })
    }
    var name = options.name;
    var id = options.id;
    this.setData({
      name:name,
      id:id
    })
  },
  submit:function(e){
    var name = e.detail.value.name;
    var id=this.data.id;
    if(name==''){
      wx.showModal({
        title: '提示',
        content: '分组名称不能为空!',
        showCancel:false
      });
      return;
    }
    if (wx.showLoading) {
      wx.showLoading({
        title: '保存中'
      });
    };
    app.Verification(function (token) {
      if (id) {
        wx.request({
          url: constract.addOrEdit,
          header: { token: token },
          data: { group_name: name, groupid:id },
          success: function (res) {
            if (wx.hideLoading) {
              wx.hideLoading();
            };
            wx.navigateBack();
          }
        })
      }else {
        wx.request({
          url: constract.addOrEdit,
          header: { token: token },
          data: { group_name: name },
          success: function (res) {
            if (wx.hideLoading) {
              wx.hideLoading();
            };
            wx.navigateBack();
          }
        })
      }
    });
  }
})