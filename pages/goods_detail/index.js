// pages/goods_detail/index.js
import {request} from "../../request/index.js";

Page({

  data: {
      goodsObj:{},
      isCollect:false
  },

    GoodsInfo:{},
  onShow(){
    let pages=getCurrentPages();
    let currentPage=pages[pages.length-1];
    let options=currentPage.options;
    const {goods_id} = options
    this.getGoodsDetail(goods_id)

  },

  //获取商品详情数据
  getGoodsDetail(goods_id) {
    request({url: "/goods/detail", data: {goods_id}})
        .then(result => {
          this.GoodsInfo=result.data.message
            //1 获取缓存中的商品收藏的数组
            let collect=wx.getStorageSync("collect")||[];
            //2 判断当前商品是否被收藏
            let isCollect=collect.some(v=>v.goods_id===this.GoodsInfo.goods_id);
          this.setData({
            goodsObj:{
                goods_name:result.data.message.goods_name,
                goods_price:result.data.message.goods_price,
                goods_introduce:result.data.message.goods_introduce.replace(/\.webp/g,'.jpg'),
                pics:result.data.message.pics,
            },
              isCollect
          })
        })
  },

    //点击轮播图 放大预览
    handlePreviewImage(e){
      console.log(e)
      // 1 构造需要预览的图片数组
        const urls=this.GoodsInfo.pics.map(v=>v.pics_mid);
      // 2 接收传递过来的图片url
        const  current = e.currentTarget.dataset.url
        wx.previewImage({
            current,
            urls
        })
    },

    //加入购物车
    handleCarAdd(){
      // 1 获取缓存中的购物车 数组
        let cart=wx.getStorageSync("cart")||[];
      // 2 判断 商品对象是否已经存在与购物车数组中
        let index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
        if(index===-1){
            // 3 不存在 第一次添加
            this.GoodsInfo.num=1;
            this.GoodsInfo.checked=true;
            cart.push(this.GoodsInfo);
        }else {
            //4 已经存在购物车数据 执行num++
            cart[index].num++;
        }
        // 5 把购物车重新添加回缓存中
        wx.setStorageSync("cart",cart);
        //6 弹窗提示
        wx.showToast({
            title:'加入成功',
            icon:'success',
            mask:true
        })
    },

    //收藏
    handleCollect(){
      let isCollect=false;
      // 1 获取缓存中的商品收藏数组
      let collect=wx.getStorageSync("collect")||[];
      // 2 判断该商品是否被收藏过
      let index=collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
      // 3 当index=-1表示已经收藏过了
      if(index!==-1){
          //能找到 已经收藏过了 在数组中删除该商品
          collect.splice(index,1);
          isCollect=false;
          wx.showToast({
              title:'取消收藏',
              icon:"success",
              mask:true
          })
      }else {
          //没有收藏过
          collect.push(this.GoodsInfo);
          isCollect=true;
          wx.showToast({
              title:'收藏成功',
              icon:"success",
              mask:true
          })
      }
      // 4 把数组存入到缓存中
        wx.setStorageSync("collect",collect);
      // 5 修改data
        this.setData({
            isCollect
        })
    }
})