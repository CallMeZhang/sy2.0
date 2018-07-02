import siteInfo from '../global'
import ls from '../modules/_ls'
import request_base from './base'
import appjs from '@/modules/_appjs/index'

/**
 * 获取大爱商品检索列表
 * @type {null}
 * parmas:{...}
 */
let help_goods_search = siteInfo.api_host_j + '/rs-goods/goods/help-goods-search'
export const getLoveMarketList = (currentpage,searchquery,sortorder,areaid,goodstype,goodscert,ownertype,unionItemId,unionId,villageid,townid,cityid,provinceid) => {
  var currentpage=currentpage||'';
  var searchquery=searchquery||'';
  var sortorder=sortorder||'';
  var villageid=villageid||'';
  var townid=townid||'';
  var areaid=areaid||'';
  var cityid=cityid||'';
  var provinceid=provinceid||'';
  var goodstype=goodstype||'';
  var ownertype=ownertype||'';
  var goodscert=goodscert||'';
  var unionItemId=unionItemId||'';
  var unionId=unionId||'';
  return appjs.syJsbGetClientInfo().then((res)=> {
    return request_base.$httpGetWithToken(help_goods_search+'?currentpage='+currentpage+'&searchquery='+searchquery+'&sortorder='+sortorder+'&villageid='+villageid+'&townid='+townid+'&areaid='+areaid+'&cityid='+cityid+'&provinceid='+provinceid+'&goodstype='+goodstype+'&ownertype='+ownertype+'&goodscert='+goodscert+'&unionItemId='+unionItemId+'&unionId='+unionId)
  })
}
/**
 * 大爱超市首页区域筛选条件
 * @type {null}
 * parmas:{...}
 */
let get_support_area = siteInfo.api_host_j + '/rs-goods/goods/getSupportArea'
export const getSupportArea = (channel) => {
  var channel=channel||'';
  return appjs.syJsbGetClientInfo().then((res)=> {
    return request_base.$httpGetWithToken(get_support_area+'?channel='+channel)
  })
}
/**
 * 大爱超市首页区域筛选无token条件
 * @type {null}
 * parmas:{...}
 */
let get_support_area_unToken = siteInfo.api_host_j + '/rs-goods/goods/getSupportArea'
export const getSupportAreaUnToken = (channel) => {
  var channel=channel||'';
  return appjs.syJsbGetClientInfo().then((res)=> {
    return request_base.$httpGet(get_support_area_unToken+'?channel='+channel)
  })
}
/**
 * 大爱超市首页拥有者筛选条件
 * @type {null}
 * parmas:{...}
 */
let get_owner_type = siteInfo.api_host_j + '/rs-goods/goods/getOwnerType'
export const getOwnerType = () => {
  return appjs.syJsbGetClientInfo().then((res)=> {
    return request_base.$httpGet(get_owner_type)
  })
}
/**
 * 大爱超市首页认证筛选条件
 * @type {null}
 * parmas:{...}
 */
let get_certs = siteInfo.api_host_j + '/rs-goods/goods/getCerts'
export const getCerts = () => {
  return appjs.syJsbGetClientInfo().then((res)=> {
    return request_base.$httpGet(get_certs)
  })
}
/**
 * 大爱超市首页分类筛选条件
 * @type {null}
 * parmas:{...}
 */
let get_goods_class = siteInfo.api_host_j + '/rs-goods/goods/getGoodsClass'
export const getGoodsClass = () => {
  return appjs.syJsbGetClientInfo().then((res)=> {
    return request_base.$httpGet(get_goods_class)
  })
}
/**
 * 大爱超市首页联盟名称
 * @type {null}
 * parmas:{...}
 */
let get_union_name = siteInfo.api_host_j + '/rs-auth/get-all-union'
export const getUnionName = () => {
  return appjs.syJsbGetClientInfo().then((res)=> {
    return request_base.$httpGet(get_union_name)
  })
}

