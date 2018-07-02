/*
* 测试微信二次分享
* */
import wx from 'weixin-js-sdk'
import axios from 'axios'
import siteInfo from '@/global'
let qs = require('qs')

function request(){
  let url = siteInfo.api_host_p + '/api/index.php?act=wx&op=ajaxGetSignPackage'
  axios.get(url).then((res)=>{
    let data = res.data
    console.log(data)
    wx_config(data.appId, data.timestamp, data.nonceStr, data.signature)
  })
}
function wx_config(appId,timestamp,nonceStr,signature){
  wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: appId, // 必填，企业号的唯一标识，此处填写企业号corpid
    timestamp: timestamp, // 必填，生成签名的时间戳
    nonceStr: nonceStr, // 必填，生成签名的随机串
    signature: signature,// 必填，签名，见附录1
    jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });
}

export default {
  request,
}
