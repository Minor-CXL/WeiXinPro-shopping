// pages/search/index.js
import {request} from "../../request/index.js";

Page({

  data: {
      goods:[],
    // 按钮是否隐藏
    isFocus:false,
    // 输入框的值
    inpValue:""
  },
  TimeId:-1,
  handleInput(e){

    const {value}=e.detail;
    // 判断输入框有没有输入搜索的东西名称
    if(!value.trim()){
      this.setData({
        goods:[],
        isFocus:false
      })
      // 不合法直接返回
      return
    }

    this.setData({isFocus:true})
    //请求数据
    //防抖技术
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(()=>{
      this.qsearch(value);
    },1000)
  },
  qsearch(query){
    request({url:"/goods/qsearch",data: {query}}).then(result=>{
      this.setData({goods:result.data.message})
    })
  },

  //取消按钮
  handleCancel(){
    this.setData({
      goods:[],
      isFocus:false,
      inpValue:""
    })
  }

})