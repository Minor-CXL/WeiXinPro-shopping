import {request} from "../../request/index.js";
Page({


  data: {
    //左侧的菜单数据
    leftMenuList:[],
    //右侧的商品数据
    rightMenuList:[],
    //被点击的左侧菜单
    currentIndex:0,
    //右侧滚动条距离顶部的距离
    scrollTop:0

  },
  //接口的返回数据
  Cates:[],


  onLoad(options) {
       const Cates = wx.getStorageSync("cates");

      if(!Cates) {
          this.getCates()
      }
      else
      {
          if(Date.now()-Cates.time>1000*10)
          {
              this.getCates()
          }
          else {
              this.Cates = Cates.data;
              let leftMenuList = this.Cates.map(v=>v.cat_name);
              let rightMenuList = this.Cates[0].children;
              this.setData({
                  leftMenuList,
                  rightMenuList
              })
          }
      }
  },
  getCates(){
    request({url:"/categories"})
        .then(result=>{
            this.Cates=result.data.message;
          //把接口的数据存入到本地存储中
            wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});
          // 构造左侧的大菜单数据
          let leftMenuList = this.Cates.map(v=>v.cat_name);
          // 构造右侧的商品数据
          let rightMenuList = this.Cates[0].children;
          this.setData({
            leftMenuList,
            rightMenuList
          })
        })
  },

  handleItemTap(e){
      const {index} = e.currentTarget.dataset
      let rightMenuList = this.Cates[index].children;
      this.setData({
          currentIndex:index,
          rightMenuList,
          //触发点击事件的时候让滚动条回到顶部
          scrollTop:0,
      })
  }
})