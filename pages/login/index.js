// pages/login/index.js
Page({

  handleGetUserInfo(){
   wx.getUserProfile({
      desc: '获取您的微信个人信息',
      success: (res) => {
        const {userInfo}=res;
        wx.setStorageSync("userInfo",userInfo);
        console.log(userInfo)
        wx.navigateBack({
          delta:1
        })
      },
      fail: function (e) {
        wx.showToast({
          title: '已取消获取信息',
          icon: "error",
          duration: 1500,
          mask: true
        })
      }
    })
  }
})