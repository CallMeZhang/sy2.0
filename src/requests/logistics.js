import siteInfo from '../global'
import request_base from './base'


/**
 * 获取物流商品info接口
 * @type {string}
 */
let get_popular_goods_list = siteInfo.api_host_j + '/rs-logistics/logistics/getPopularGoodsList'
// let get_popular_goods_list = 'http://192.168.1.187:9090' + '/logistics/getPopularGoodsList'
export const getPopularGoodsList = () => {
  // return request_base.$httpGetWithToken(get_popular_goods_list + '?')
  return request_base.$httpGet(get_popular_goods_list)
}

/**
 * 获取运单商品信息接口
 * @type {string}
 */
let get_package_goods_list = siteInfo.api_host_j + '/rs-logistics/logistics/getPackageGoodsList'
// let get_package_goods_list = 'http://192.168.1.187:9090' + '/logistics/getPackageGoodsList'
export const getPackageGoodsList = (orderId,shippingCode) => {
  return request_base.$httpGetWithToken(get_package_goods_list + "?orderId="+orderId+"&packageNo="+shippingCode)
  // return request_base.$httpGet(get_package_goods_list+"?token=fffff9794c548227ecc829e407c5640e&orderId="+orderId+'&packageNo='+shippingCode)
}
/**
 * 获取运单信息接口
 * @type {string}
 */
let logistics_info = siteInfo.api_host_j + '/rs-logistics/logistics/logisticsInfo'
// let logistics_info = 'http://192.168.1.220:9090' + '/logistics/logisticsInfo'
export const logisticsInfo = (orderId,shippingCode) => {
  return request_base.$httpGetWithToken(logistics_info + "?orderId="+orderId+"&packageNo="+shippingCode)
  // return request_base.$httpGet(logistics_info+"?token=e9f15b71490368acf3fc19d79f81d8c4&orderId="+orderId+'&packageNo='+shippingCode)
}

