var wxSortPickerView = require('../../wxSortPickerView/wxSortPickerView.js');
var constract = require('../../utils/constract.js');
var app=getApp();
Page({
  data: {
    imperfect:false
  },
  onShow: function () {
    var that = this;
    app.Verification(function(token){
      wx.request({
        url: constract.index,
        header: { token: token },
        success: function (res) {
          var userInfo = res.data.data;
          that.setData({
            userInfo: userInfo
          });
        }
      });
      wx.request({
        url: constract.findCollect,
        header:{token:token},
        success:function(res){
          var data=res.data.data;
          that.setData({
            personList:data
          });
          wxSortPickerView.init(data, that);
        }
      })
    })
    
  },
  call:function(e){
    var phone=e.target.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  wxSortPickerViewItemTap: function (e) {
    console.log(e.target.dataset.text);
  }
})