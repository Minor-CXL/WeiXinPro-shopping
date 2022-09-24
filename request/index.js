//异步请求的总次数
let ajaxTimes=0;
export const request=(params)=>{
    ajaxTimes++;
    wx.showLoading({
        title:"加载中",
        mask:true
    })

    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            url:baseUrl+params.url,
            success(result) {
                resolve(result);
            },
            fail(err) {
                reject(err);
            },
            complete(res) {
                ajaxTimes--;
                if(ajaxTimes===0){
                    //关闭正在等待的图标
                    wx.hideLoading();
                }
            }
        })
        }
    )
}