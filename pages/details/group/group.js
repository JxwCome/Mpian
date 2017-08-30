var app = getApp();
var constract = require('../../../utils/constract.js');
Page({
  data: {
    items: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var group_name = options.group_name;
    var collection_uid = options.id;
    that.setData({
      collection_uid: collection_uid
    })
    app.Verification(function (token) {
      wx.request({
        url: constract.findGroup,
        header: { token: token},
        success: function(res){
          var items = res.data.data;
          for(var i = 0; i < items.length; i++){
            if(items[i].group_name == group_name){
              items[i].checked = true;
            }
          }
          that.setData({
            items: items
          })
        }
      })
    })
  },
  radioChange: function(e){
    var group_id = null;
    var value = e.detail.value;
    var items = this.data.items;
    for(var i = 0; i < items.length; i++){
      if(items[i].checked){
        items[i].checked = false;
      }
      if(items[i].group_name==value){
        items[i].checked = true;
        group_id = items[i].id;
      }
    }
    this.setData({
      items: items,
      group_id: group_id
    })
    
  },
  sure: function(){
    var collection_uid = this.data.collection_uid;
    var group_id = this.data.group_id;
    app.Verification(function (token) {
      wx.request({
        url: constract.distribution,
        header: { token: token },
        data: { collection_uid: collection_uid, group_id: group_id },
        success: function (res) {
          wx.navigateBack()
        }
      })
    })
  }
})