import siteInfo from '../global'
import request_base from './base'


/**
 * 我的苹果树/助力页.
 * @type {string}
 */
// let my_apple_tree_activity = siteInfo.host_old + '/api/index.php?act=my_apple_tree_activity&op=sign_up_userinfo'
// export const myAppleTreeActivity = () => {
//   return request_base.$httpGetWithToken(my_apple_tree_activity + '?')
//   // return request_base.$httpGet(my_apple_tree_activity + '?token=1b6dcb593ffd8feee0d821bef737d097')
// }

let my_apple_tree_activity = siteInfo.host_old + '/api/index.php?act=my_apple_tree_activity&op=apply_userinfo'
export const myAppleTreeActivity = (data) => {
  return request_base.$httpPostWithToken(my_apple_tree_activity, data)
}
/**
 * 获取信息
 * @type {string}
 */
let my_apple_tree_userinfo = siteInfo.host_old + '/api/index.php?act=my_apple_tree_activity&op=userinfo'
export const myAppleTreeUserinfo = (data) => {
  return request_base.$httpGetWithToken(my_apple_tree_userinfo)
}
/**
 * 获取认养介绍页
 * @type {string}
 */
let my_apple_tree_introduce = siteInfo.api_host_j + '/rs-apple-tree/introduce/page'
// let my_apple_tree_introduce = "http://192.168.1.241:9087/introduce/page"
export const myAppleTreeIntroduce = () => {
  return request_base.$httpGet(my_apple_tree_introduce)
}
/*
* 进展播报 list php
* @type {string}
* params: page 分页
* */
//测试
// let apple_tree_report = "/apiapple/api/broadcast/list?page=";
//正式
let apple_tree_report= "https://applet.17shanyuan.com/api/broadcast/list?page=";
export const progressReportreQuest = (page) => {
  return request_base.$httpGet(apple_tree_report + page)
}
/**
 * 获取个人认养
 * @type {string}
 */
let my_apple_tree_areaMap = siteInfo.api_host_j + '/rs-apple-tree/introduce/areaMap'
// let my_apple_tree_areaMap ="http://192.168.1.241:9087/introduce/areaMap"
export const myAppleTreeAreaMap = () => {
  return request_base.$httpGet(my_apple_tree_areaMap)
}
/**
 * 认养方式 php
 * @type {string}
 */
// let apple_tree_adoptWay = "/apiapple/api/goods/list"
let apple_tree_adoptWay = "https://applet.17shanyuan.com/api/goods/list"
export const myAppleTreeAdoptWay = () => {
  return request_base.$httpGet(apple_tree_adoptWay)
}

/**
 * 选择果树版块 java
 * @type {string}
 * params: token
 */
let apple_tree_region = siteInfo.api_host_j + '/rs-apple-tree/introduce/appleTreeMap?'
// let apple_tree_region = "http://192.168.1.241:9087/introduce/appleTreeMap?token=a2e25131af148bb3ee952ac1fc71943c"
export const chooseAdoption = () =>{
  return request_base.$httpGetWithToken(apple_tree_region)
}
/**
 * 苹果树下单
 *
 * */
// let apple_tree_place_order = 'http://192.168.1.187:9096' + '/order/submitOrder'
let apple_tree_place_order = siteInfo.api_host_j + '/rs-apple-tree/order/submitOrder'
export const placeOrderPostMethod = (data) =>{
  return request_base.$httpPostWithToken(apple_tree_place_order, data)
}
/**
 * 确认支付
 *@type {string}
 * params: orderId
 * */
// let apple_tree_get_order = 'http://192.168.1.241:9096/introduce/orderInfo?orderSn='
let apple_tree_get_order = siteInfo.api_host_j+ '/rs-apple-tree/order/orderInfo?orderSn='
export const getOrderInfo = (orderSn) =>{
  return request_base.$httpGetWithToken(apple_tree_get_order + orderSn)
}

/**
 * 苹果树命名 java
 * @type: {string}
 * params: areaId
 * */
// let apple_tree_naming = 'http://192.168.1.241:9087/introduce/areaName?token=a2e25131af148bb3ee952ac1fc71943c&areaId='
let apple_tree_naming = siteInfo.api_host_j + '/rs-apple-tree/introduce/areaName?areaId='
export const appleTreeNamingRequest = (areaId) =>{
  return request_base.$httpGetWithToken(apple_tree_naming + areaId)
}


/**
 * 认养证书 php
 * @type {string}
 * params: orderId
 * */
//测试
// let apple_tree_adoption_proof = "/apiapple/api/order/proof?orderSn="
let apple_tree_adoption_proof = "https://applet.17shanyuan.com/api/order/proof?orderSn="
export const adoptionProofQuest = (orderSN) =>{
  return request_base.$httpGet(apple_tree_adoption_proof + orderSN)
}

let apple_tree_memberList= siteInfo.api_host_j + '/rs-apple-tree/introduce/memberList'
// let apple_tree_memberList="http://192.168.1.241:9087/introduce/memberList"
export const treeMemberList = (pageNum) =>{
  return request_base.$httpGet(apple_tree_memberList+"?pageNum="+pageNum)
}

let apple_tree_helpMemberList= siteInfo.api_host_j + '/rs-apple-tree/introduce/helpMemberList'
// let apple_tree_helpMemberList="http://192.168.1.241:9087/introduce/helpMemberList"
export const treeHelpMemberList = (pageNum) =>{
  return request_base.$httpGet(apple_tree_helpMemberList+"?pageNum="+pageNum)
}
/*
* 支付寳app内
*
* */
let apple_tree_ali_app_pay = siteInfo.api_host_j + "/rs-apple-tree/order/ali-app-pay";
export const appleTreeAliAppPay = (data) =>{
  return request_base.$httpPostWithToken(apple_tree_ali_app_pay, data)
}
/*
 * 支付寳app外
 *
 * */
let apple_tree_ali_pay = siteInfo.api_host_j + "/rs-apple-tree/order/ali-pay";
export const appleTreeAliPayWai = (data) =>{
  return request_base.$httpPostWithToken(apple_tree_ali_pay, data)
}
/**
 *支付宝成功后起调接口
 *params: orderSn  java
 * */
let apple_tree_ali_wx_result = siteInfo.api_host_j + "/rs-apple-tree/order/alipay-browser-return";
export const appleTreeAliPaySuccess = (data) =>{
  return request_base.$httpPost(apple_tree_ali_wx_result, data)
}
/**
 *微信成功后起调接口
 *params: orderSn  java
 * */
let apple_tree_wx_result = siteInfo.api_host_j + "/rs-apple-tree/introduce/successPage?orderSn=";
export const appleTreeWxPayResult = (order_sn) =>{
  return request_base.$httpGetWithToken(apple_tree_wx_result + order_sn)
}

/*
 * WXapp内
 *
 * */
let apple_tree_app_pay = siteInfo.api_host_j + "/rs-apple-tree/wxPay/app-pay";
export const appleTreeAppPay = (data) =>{
  return request_base.$httpPostWithToken(apple_tree_app_pay, data)
}
/*
 * WXapp外
 *
 * */
let apple_tree_jsapi_pay = siteInfo.api_host_j + "/rs-apple-tree/wxPay/jsapi-pay";
export const appleTreeJsapiPay = (data) =>{
  return request_base.$httpPostWithToken(apple_tree_jsapi_pay, data)
}

/*
* 全部抵扣
* */
let apple_tree_coupon_pay = siteInfo.api_host_j + "/rs-apple-tree/order/coupon-pay";
export const appleTreeCouponPay = (data) =>{
  return request_base.$httpPostWithToken(apple_tree_coupon_pay, data)
}
/**
 * 支付状态
 * params: orderSn java
 * */
let apple_tree_pay_status = siteInfo.api_host_j + "/rs-apple-tree/introduce/payState?orderSn=";
export const appleTreePayStatus = (orderSn) =>{
  return request_base.$httpGet(apple_tree_pay_status + orderSn)
}
