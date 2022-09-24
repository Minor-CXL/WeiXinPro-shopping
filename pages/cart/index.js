// pages/cart/index.js
Page({
  data:{
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },


  onShow(){
    // 1 获取缓存中的收货地址
    const address=wx.getStorageSync("address")

    // 2 获取缓存中的购物车数据
    const cart=wx.getStorageSync("cart")||[]

    this.setData({address})
    this.setCart(cart)

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

  //商品的选中
  handleItemChange(e){
    // 1 获取被修改的商品id
    const goods_id=e.currentTarget.dataset.id;
    // 2 获取购物车数组
    let {cart}=this.data;
    // 3 找到被修改的商品对象
    let index=cart.findIndex(v=>v.goods_id===goods_id);
    // 4 选中状态取反
    cart[index].checked=!cart[index].checked;

    this.setCart(cart)

  },

  // 优化购物车 商品价格，数量等改变
  setCart(cart){
    let allChecked=true;
    // 总价格 总数量
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num;
      }
      else {
        allChecked=false
      }
    })
    //判断数组是否为空
    allChecked=cart.length!=0?allChecked:false;

    this.setData({
      cart,
      totalPrice, totalNum, allChecked
    })
    wx.setStorageSync("cart",cart);
  },

  // 商品全选功能
  handleItemAllCheck(){
    // 1 获取data中的数据
    let{cart,allChecked}=this.data;
    // 2 修改值
    allChecked=!allChecked;
    // 3 循环修改cart数组中的商品选中状态
    cart.forEach(v=>v.checked=allChecked);
    // 4 把修改后的值填充回缓存
    this.setCart(cart)
  },

  //商品数量的增减
  handleItemNumEdit(e){
    // 1 获取传递过来的参数
    const  {operator,id}=e.currentTarget.dataset;
    // 2 获取购物车数组
    let {cart}=this.data;
    // 3 找到需要修改的商品索引
    const  index=cart.findIndex(v=>v.goods_id===id);
    // 4 判断是否要执行删除
    if(cart[index].num===1&&operator===-1){
      wx.showModal({
        title: '提示',
        content: '你是否确定删除',
        success: (res)=> {
          if (res.confirm) {
            cart.splice(index,1)
            this.setCart(cart)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    else {
      cart[index].num+=operator;
      this.setCart(cart)
    }



  },

  //结算
  handlePay(){
    // 1 判断有没有收货地址
    const {address,totalNum}=this.data;
    if(!address.userName){
      wx.showToast({
        title: '您还没有填入收货地址',
        icon: 'none',
      })
      return;
    }
    // 2 判断有没有商品
    if(totalNum===0){
      wx.showToast({
        title: '您的购物车还没有商品',
        icon: 'none',
      })
      return;
    }
    // 3 跳转到 支付页面
    wx.navigateTo({
      url:'/pages/pay/index'
    })
  }
})