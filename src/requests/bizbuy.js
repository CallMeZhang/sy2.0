import siteInfo from '../global'
import request_base from './base'

/**
 * 集采首页
 * @type {string}
 */
let bizbuy_index_url = siteInfo.api_host_j + '/rs-goods/goods/get-biz-recommend-goods'
export const bizbuy_index = () => {
  return request_base.$httpGet(bizbuy_index_url)
}

/**
 * 集采分类
 * @type {string}
 */
let bizbuy_category_url = siteInfo.api_host_j + '/rs-goods/goods/get-goods-class-list'
export const bizbuy_category = (gc_type) => {
  return request_base.$httpGet(bizbuy_category_url + '?gcType=' + gc_type)
}

/**
 * 集采商品列表
 * @type {string}
 */
let bizbuy_goodslist_url = siteInfo.api_host_j + '/rs-goods/goods/searchBizGoods'
export const bizbuy_goodslist = (data) => {
  let params = ''
  for(var key in data) {
    if(data[key] === null) {
      continue
    }
    params += '&' + key + '=' + data[key]
  }
  params = '?' + params.substr(1)
  return request_base.$httpGetWithToken(bizbuy_goodslist_url + params)
}
