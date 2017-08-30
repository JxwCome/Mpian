function isMobile(mobile) {
  var searchStr = /^(1+\d{10})$/;
  if (!searchStr.test(mobile)) {
    return false;
  } else {
    return true;
  }
};

function isEmail(email) {
  var searchStr = /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/;
  if (!searchStr.test(email)) {
    return false;
  }
  return true;
};

function settime(that){
  var countdown=60;
  var t = setInterval(function () {
    if (countdown == 0) {
      that.setData({
        mes: "获取验证码",
        flag: true
      })
      clearInterval(t);
    } else {
      that.setData({
        mes: countdown+'秒后重试',
        flag: false
      })
      countdown--;
    };
  }, 1000)
}

// 去除空格
function trim(str) {
  return str.replace(/(^\s+)|(\s+$)/g, "");
}


module.exports = {
  isMobile: isMobile,
  settime: settime,
  trim: trim,
  isEmail: isEmail
}
