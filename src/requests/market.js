import siteInfo from '../global'
import ls from '../modules/_ls'
import request_base from './base'
import appjs from '@/modules/_appjs/index'

/**
 * 获取善缘商场爱心特惠|最多优惠|最新上架|最多销量
 * @type {null}
 */
let get_sy_goods_top_list = siteInfo.api_host_j + '/rs-goods/goods/get-sy-goods-top-list'
export const getMarketList = () => {
  return appjs.syJsbGetClientInfo().then((res)=> {
    return request_base.$httpGet(get_sy_goods_top_list)
  })
}

/**
 * 获取善缘商场善源商场商品分类
 * @type {string}
 * @parmas{module}
 */
let get_goods_class_list_by_module =siteInfo.api_host_j + '/rs-goods/goods/getGoodsClassListByModule'
export const getMarketType = (module) => {
  return appjs.syJsbGetClientInfo().then((res)=> {
    return request_base.$httpGet(get_goods_class_list_by_module+'?module='+module)
  })
}

/**
 * 获取一起善源善企列表
 * @type {number}
 * @parmas{cols,raws}
 */
let area_list =siteInfo.api_host_j + '/rs-store/store/area-list'
export const areaList = (raws,cols) => {
  var raws = raws||''
  var cols = cols||''
  return appjs.syJsbGetClientInfo().then((res)=> {
    return request_base.$httpGet(area_list+'?cols='+cols+'&raws='+raws)
  })
}

let syshop_goods_list_url = siteInfo.api_host_j + "/rs-goods/goods/sy-goods-search"
export const syshop_goodslist = (data) => {
  let params = ''
  for(var key in data) {
    if(data[key] === null) {
      continue
    }
    params += '&' + key + '=' + data[key]
  }
  params = '?' + params.substr(1)
  return request_base.$httpGet(syshop_goods_list_url + params)
}
