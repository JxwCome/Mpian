var app = getApp();
var constract = require('../../../utils/constract.js');
Page({
  data: {
    
  },
  onLoad: function (options) {
      console.log(options);
      if (options.state==0){
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
        });
        return
      };
      console.log(23);
      var gender = options.gender;
      var that = this;
      app.Verification(function (token) {
        wx.request({
          url: constract.allMyImpression,
          header: { token: token },
          success: function (res) {
            var MyImpression = res.data.data;
            
            that.setData({
              MyImpression: MyImpression
            });
            if (!MyImpression.length) {
              wx.request({
                url: constract.label,
                header: { token: token },
                success:function(res){
                  var label=res.data.data;
                  for(var i=0;i<label.length;i++){
                    label.checked=false;
                  }
                  that.setData({
                    label: label,
                    gender:gender
                  });
                }
              })
            }
          }
        });
      });
  },
  check: function(e){
    var that=this;
    var index=e.target.dataset.index;
    var label=this.data.label;
    var num=0;
    label[index].checked = !label[index].checked;
    that.setData({
      label:label
    });
    for (var i = 0; i < label.length; i++) {
      if (label[i].checked) {
        num++;
      }
    };
    console.log(num);
    if (num > 5) {
      wx.showModal({
        title: '提示',
        content: '最多添加五个印象',
        showCancel: false
      });
      label[index].checked = !label[index].checked;
      that.setData({
        label: label
      });
    }
  },
  save:function(){
    var label=this.data.label;
    var impression = '';
    for (var i = 0; i < label.length; i++) {
      if (label[i].checked) {
        impression += label[i].name;
        impression += ',';
      }
    }
    var impression = impression.substring(0, impression.length - 1);
    if (!impression) {
      wx.showModal({
        title: '提示',
        content: '请选择印象',
        showCancel: false
      });
      return;
    }
    console.log(impression);
    if (wx.showLoading) {
      wx.showLoading({
        title: '保存中'
      });
    }
    app.Verification(function (token) {
      wx.request({
        url: constract.impressionAddOrEdit,
        header: { token: token },
        data: { impression_name: impression},
        success: function (res) {
          if (wx.hideLoading) {
            wx.hideLoading();
          };
          wx.navigateBack();
        }
      });
    })
  }
})