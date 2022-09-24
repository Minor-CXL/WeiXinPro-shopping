// pages/auth/index.js
import {request} from "../../request/index.js";

Page({

  // 获取用户信息
  handleGetUserInfo(e) {
    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
    wx.setStorageSync("token", token);
    wx.showToast({
      title:"获取信息成功",
      icon:"success",
      mask:true

    })
    setTimeout(function () {
      wx.navigateBack({
        delta:1
      })
    }, 2000)
  }


})