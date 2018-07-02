import axios from 'axios'
import appjs from '@/modules/_appjs/index'

axios.defaults.withCredentials = true

/**
 * get请求请求该url数据
 * @param url
 * @returns {Promise.<T>|*}
 */
function $httpGet (url) {
  // console.log(url)
  return axios.get(url).catch(error => {
    //window.location.href = '/500'
  });
}

function $httpGetWithToken(url) {
  return appjs.syJsbGetClientInfo().then((res)=> {
    if(res['platform'] === 'web') {
      var Cookie = require('tiny-cookie');
      let token = Cookie.get('token')
      url += '&token=' + token
      return $httpGet(url)
    } else {
      return new Promise(function (r, s) {
        appjs.syJsbGetAppInfo(function (appInfo) {
          var token = appInfo.split("|")[4]
          var device_id = appInfo.split("|")[2]
          if(!token) {
            var Cookie = require('tiny-cookie');
            token = Cookie.get('token')
          }
          url += '&token=' + token + '&did=' + device_id
          r(url)
        })
      }).then((url) => {
        return $httpGet(url)
      })
    }
  })
}

let qs = require("qs")
function $httpPost(url, data) {
  return axios.post(url, qs.stringify(data)).catch(error => {
    // window.location.href = '/500'
  });
}


function $applePost(url, data){
  return axios.post(url, JSON.stringify(data)).catch(error => {
    // window.location.href = '/500'
  })
}

function $httpPostWithToken(url, data) {
  return appjs.syJsbGetClientInfo().then((res)=> {
    if(res['platform'] === 'web') {
      var Cookie = require('tiny-cookie');
      let token = Cookie.get('token')
      let request_data = data
      request_data['token'] = token
      return $httpPost(url, request_data)
    } else {
      return new Promise(function (r, s) {
        appjs.syJsbGetAppInfo(function (appInfo) {
          var token=appInfo.split("|")[4]
          var device_id = appInfo.split("|")[2]
          if(!token) {
            var Cookie = require('tiny-cookie');
            token = Cookie.get('token')
          }
          let request_data = data
          request_data['token'] = token
          request_data['did'] = device_id
          r(request_data)
        })
      }).then((request_data) => {
        return $httpPost(url, request_data)
      })
    }
  })
}
function $applePostWithToken(url, data) {
  return appjs.syJsbGetClientInfo().then((res)=> {
    if(res['platform'] === 'web') {
      var Cookie = require('tiny-cookie');
      let token = Cookie.get('token')
      let request_data = data
      request_data['token'] = token
      return $applePost(url, request_data)
    } else {
      return new Promise(function (r, s) {
        appjs.syJsbGetAppInfo(function (appInfo) {
          var token=appInfo.split("|")[4]
          var device_id = appInfo.split("|")[2]
          if(!token) {
            var Cookie = require('tiny-cookie');
            token = Cookie.get('token')
          }
          let request_data = data
          request_data['token'] = token
          request_data['did'] = device_id
          r(request_data)
        })
      }).then((request_data) => {
        return $applePost(url, request_data)
      })
    }
  })
}

export default {
  $httpGet,
  $httpGetWithToken,
  $httpPost,
  $httpPostWithToken,
  $applePost,
  $applePostWithToken
}
