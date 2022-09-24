import {request} from "../../request/index.js";
Page({
  data: {
      tabs:[
        {
          id:0,
          value:"综合",
          isActive:true
        },
        {
          id:1,
          value:"销量",
          isActive:false
        },
        {
          id:2,
          value:"价格",
          isActive:false
        },
      ],
    goodsList:[]
  },

  //接口所需参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  totalPages:1,

  onLoad(option) {
   this.QueryParams.cid=option.cid||"";
   this.QueryParams.query=option.query||"";

   this.getGoodsList()
  },

  //获取商品列表数据
  getGoodsList(){
    request({url:"/goods/search",data:this.QueryParams})
        .then(result=>{
          const goods_List=result.data.message.goods
          const total=result.data.message.total
          this.totalPages=Math.ceil(total/this.QueryParams.pagesize)
          this.setData({
            goodsList:[...this.data.goodsList,...goods_List]
          })

          //下拉刷新立马结束刷新显示的加载。。。
          wx.stopPullDownRefresh();

        })
  },

  //标题点击事件 从子组件传递过来
  handleTabsItemChange(e){
    // // 获取被点击的标题索引
    const {index}=e.detail;
    // // 修改原数组
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    // 赋值到data中
    this.setData({
      tabs
    })
  },

  //页面上滑 滚动条触底事件
  onReachBottom(){
    // 判断是否有下一页数据
    if(this.QueryParams.pagenum>=this.totalPages){
       wx.showToast({
         title:'没有更多数据了'
       })
    }else
    {
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  //下拉刷新
  onPullDownRefresh(){
    this.setData({
      goodsList:[]
    })
    this.QueryParams.pagenum=1;
    this.getGoodsList();
  }

})