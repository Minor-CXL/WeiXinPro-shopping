import {request} from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
      //轮播图数组
    swiperList:[],
      //导航数组
    catesList:[],
      //楼层数组
    floorList:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getSwiperList()
      this.getCateList()
      this.getFloorList()

  },
  getCateList(){
    request({url:"/home/catitems"})
        .then(result =>{
          this.setData({
            catesList: result.data.message
              })
        })
  },
    getSwiperList(){
        request({url:'/home/swiperdata'})
            .then(result =>{
                this.setData({
                    swiperList:result.data.message
                })
            })
    },
    getFloorList(){
        request({url:'/home/floordata'})
            .then(result =>{
                this.setData({
                    floorList:result.data.message
                })
            })
    }
})