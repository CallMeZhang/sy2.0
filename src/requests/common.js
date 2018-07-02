import siteInfo from '../global'
import ls from '../modules/_ls'
import request_base from './base'
import appjs from '@/modules/_appjs/index'


let get_mcode_url = siteInfo.api_host_j + '/rs-auth/getmcode'

let login_url = siteInfo.api_host_j + '/rs-auth/login'

let crephse_url = siteInfo.api_host_p + '/api/index.php?act=v_common&op=crephse'

let getMsgCode = siteInfo.api_host_j + '/rs-auth/slidegetmcode'

export const get_mcode = (mobile_num,vcode) => request_base.$httpGet(get_mcode_url + '?mobile=' + mobile_num+"&vcode="+vcode)
export const get_message_code = (mobile_num,sessionId,sig,stoken,scene) => request_base.$httpGet(getMsgCode + '?mobile=' + mobile_num+"&sessionId="+sessionId+"&sig="+sig+"&stoken="+stoken+"&scene="+scene)


export const login = (data) => {
  return appjs.syJsbGetClientInfo().then((res)=> {
    if(res['platform'] === 'web') {
      return request_base.$httpPost(login_url, data)
    } else {
      return new Promise(function (r, s) {
        appjs.syJsbGetAppInfo(function (appInfo) {
          var device_id = appInfo.split("|")[2]
          data.did = device_id
          r(data)
        })
      }).then((data) => {
        return request_base.$httpPost(login_url, data)
      })
    }
  })
}

export const crephse = (uuid) => request_base.$httpGet(crephse_url+'&uuid='+uuid)
//图形验证码
const verifyCodeUrl =siteInfo.api_host_j + '/rs-auth/get-vcode'
export const verifyCode = (mobile) => request_base.$httpGet(verifyCodeUrl+"?mobile="+mobile)
