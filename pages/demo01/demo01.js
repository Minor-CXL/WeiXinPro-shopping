// pages/demo01/demo01.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"路明非",
    nums: 0,
    list:[
      {
        name:"楚子航",
        blood:"A+级"
      },
      {
        name: "凯撒·加图索",
        blood: "A级"
      }
    ],
    people:{
      name:"昂热",
      blood:"S级"
    }
  },
  bindInput(e){
      this.setData({
        nums:e.detail.value
      })
  },
  handleOperation(e){
    console.log(e)
    const changeNum = e.currentTarget.dataset.operation
    this.setData({
      nums:this.data.nums + changeNum
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})