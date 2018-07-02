import siteInfo from '../global'
import request_base from './base'


/**
 * 获取地址列表接口
 * @type {string}
 */
let get_address_list_url = siteInfo.api_host_j + '/rs-order/address/receiver-address-list'
export const getAddressList = () => {
  return request_base.$httpGetWithToken(get_address_list_url + '?')
  // return request_base.$httpGet(get_address_list_url + '?token=1b6dcb593ffd8feee0d821bef737d097')
}

/**
 * 获取地址省
 * @type {string}
 */
let get_address_province = siteInfo.api_host_j + '/rs-order/address/select-area-tree'
export const getAddressProvince = (parentid) => {
  return request_base.$httpGetWithToken(get_address_province + '?parentid='+parentid)
  // return request_base.$httpGet(get_address_province + '?token=1b6dcb593ffd8feee0d821bef737d097&parentid='+parentid)
}

/**
 * 查询地址
 * @type {string}
 *
 */
let get_address_info = siteInfo.api_host_j + '/rs-order/address/select-one-address'
export const getAddressInfo = (addressId) => {
  return request_base.$httpGetWithToken(get_address_info + '?addressId='+addressId)
  // return request_base.$httpGet(get_address_info + '?token=1b6dcb593ffd8feee0d821bef737d097&addressId='+addressId)
}

/**
 * 地址修改
 * @type {string}
 *
 */
let edit_address_info = siteInfo.api_host_j + '/rs-order/address/add-edit-address'
export const editAddressInfo = (data) => {
  return request_base.$httpPostWithToken(edit_address_info , data)
  // return request_base.$httpPost(edit_address_info , data)
}

/**
 * 地址删除
 * @type {string}
 *
 */
let del_address_info = siteInfo.api_host_j + '/rs-order/address/del-address'
export const edlAddressInfo = (data) => {
  return request_base.$httpPostWithToken(del_address_info , data)
  // return request_base.$httpPost(del_address_info , data)
}
