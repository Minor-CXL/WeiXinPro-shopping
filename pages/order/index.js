// pages/order/index.js
import {request} from "../../request/index.js";

Page({

  data: {
    tabs:[
      {
        id:0,
        value:"全部",
        isActive:true
      },
      {
        id:1,
        value:"待付款",
        isActive:false
      },
      {
        id:2,
        value:"待收货",
        isActive:false
      },
      {
        id:3,
        value:"退货/退款",
        isActive:false
      }
    ],
    DATA:[
        {
          num:"HDD25134TY14850CC",
          price:"13652",
          date:"2021/9/22 下午2:32:12"
        },
      {
        num:"HDP14852CT89654XX",
        price:"56321",
        date:"2022/9/25 上午8:45:15"
      },
      {
        num:"HED78163PO75214LL",
        price:"54125",
        date:"2022/10/2 中午12:36:25"
      },
      {
        num:"HOD51478UI93201QQ",
        price:"121503",
        date:"2022/12/22 晚上7:52:36"
      },
      {
        num:"HDT59632ER83645WX",
        price:"951243",
        date:"2022/12/27 下午3:36:51"
      },
      {
        num:"HOP86321TI85146OP",
        price:"154380",
        date:"2022/12/31 晚上9:51:33"
      },
        ]
  },
  // 根据标题索引来激活选中 标题数组
  changeTitleByIndex(index){
     // 修改原数组
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    // 赋值到data中
    this.setData({
      tabs
    })
  },
  //标题点击事件 从子组件传递过来
  handleTabsItemChange(e){
     // 获取被点击的标题索引
    const {index}=e.detail;
   this.changeTitleByIndex(index)
  },
  onShow(option){
    const token=wx.getStorageSync("token");
    if(!token){
      wx.navigateTo({
        url:'/pages/auth/index'
      });
      return;
    }
    //1 获取当前的小程序的页面栈-数组 长度最大是10页面
    let pages=getCurrentPages();
    //2 数组中索引最大的页面就是当前页面
    let currentPage=pages[pages.length-1];
    // 3 获取url上的type参数
    const {type}=currentPage.options;
    // 4 激活选中页面的标题 当 type=1 index=0
    this.changeTitleByIndex(type-1)
  },




})