// pages/feedback/index.js
Page({

  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品、商家投诉",
        isActive: false
      },
    ],
    chooseImgs: [],
    textVal: ""
  },
  //外网的图片的路径数组
  UpLoadImgs: [],
  //标题点击事件 从子组件传递过来
  handleTabsItemChange(e) {
    // // 获取被点击的标题索引
    const {index} = e.detail;
    // // 修改原数组
    let {tabs} = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 赋值到data中
    this.setData({
      tabs
    })
  },

  //上传图片
  handleChooseImg() {
    wx.chooseImage({
      // 最多同时可以选中的图片数量
      count: 9,
      // 图片格式 原图 压缩
      sizeType: ["original", "compressed"],
      //图片来源 相册 照相机
      sourceType: ["album", "camera"],
      success: (res) => {
        this.setData({
          chooseImgs: [...this.data.chooseImgs, ...res.tempFilePaths]
        })
      }
    })
  },

  //点击 自定义图片组件
  handleRemoveImg(e) {
    // 2 获取被点击的组件索引
    const {index} = e.currentTarget.dataset
    // 3 获取data中的图片数组
    let {chooseImgs} = this.data
    // 4 删除元素
    chooseImgs.splice(index, 1)
    this.setData({chooseImgs})
  },

  // 输入框文字
  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value
    })
  },

  // 提交按钮的点击
  handleFormSubmit() {
    const {textVal, chooseImgs} = this.data
    // 合法性验证
    if (!textVal) {
      wx.showToast({
        title: '输入不合法',
        icon: "error",
        mask: true
      })
      return
    }
    //上传图片功能未做
    wx.showToast({
      title: "意见提交成功",
      icon: "success",
      mask: true,
      duration: 1000
    })
    this.setData({
      textVal: "",
      chooseImgs: []
    })
    // 返回上一个页面

    setTimeout(function () {
      wx.navigateBack({
        delta:1
      })
    }, 1000)
  }
})
