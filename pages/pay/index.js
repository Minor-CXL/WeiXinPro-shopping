

Page({
  data:{
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0,
    order_number:"",
  },


  onShow(){
    // 1 获取缓存中的收货地址
    const address=wx.getStorageSync("address")

    // 2 获取缓存中的购物车数据
    let cart=wx.getStorageSync("cart")||[]

    // 过滤后的购物车数组
    cart=cart.filter(v=>v.checked);

    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v=>{
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num;
      })
    //判断数组是否为空

    this.setData({
      cart,
      totalPrice, totalNum,
      address
    })
  },
  //收货地址
  handleChooseAddress(){
    wx.chooseAddress({
      success(res) {
        res.all=res.provinceName+res.cityName+res.countyName+res.detailInfo
        wx.setStorageSync("address",res)
      }
    })
  },

  // 点击 支付(都是模拟)
  handleOrderPay() {
    // 1 判断缓存中有没有token
    const token = wx.getStorageSync("token");

    // 2 判断是否有token
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      })
      return;
    }

    // // 3 创建订单
    // // 3.1 准备请求头参数
    //   const header={Authorization:token}
    //   // 3.2 准备请求体参数
    //   const order_price=this.data.totalPrice;
    //   const consignee_addr=this.data.address.all;
    //   const cart=this.data.cart;
    //   let goods=[];
    //   cart.forEach(v=>goods.push({
    //     goods_id:v.goods_id,
    //     goods_number:v.num,
    //     goods_price:v.goods_price
    //   }))
    //
    //   const orderParams={order_price,consignee_addr,goods};
    //   // 4 准备发送请求 创建订单 获取订单编号
    //   request({url: "/my/orders/create",method:"post",data:orderParams,header})
    //       .then(result =>{
    //         this.setData({
    //           order_number:result.data.message
    //         })
    //       })

      wx.showToast({
        title:"支付成功",
        icon:"success",
        duration:2000
      })

    wx.setStorageSync("cart","");

    setTimeout(function () {
      wx.navigateBack({
        delta:1
      })
    }, 2000)

  }


})