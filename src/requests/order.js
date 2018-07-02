import siteInfo from '../global'
import request_base from './base'

/**
 * 订单预提交页面接口
 * @type {string}
 */
let order_confirm_url = siteInfo.api_host_j + '/rs-order/order/order-pre-submit'
export const order_confirm = (ifcart, goods_id, goods_num, address_id) => {
  let url = order_confirm_url + '?ifcart=' + ifcart + '&goodsid=' + goods_id + '&goodsnum=' + goods_num
  if(address_id != 0) {
    url += '&addressid=' + address_id
  }
  return request_base.$httpGetWithToken(url)
  // return request_base.$httpGet(url+"&token=fffff9794c548227ecc829e407c5640e")

}

/**
 * 提交订单接口
 * @type {string}
 */
let order_submit_url = siteInfo.api_host_j + '/rs-order/order/submit-order'
export const go_pay = (data) => {
  return request_base.$httpPostWithToken(order_submit_url, data)
}

/**
 * 收获地址列表接口
 * @type {string}
 */
let get_address_list_url = siteInfo.api_host_j + '/rs-order/address/receiver-address-list'
export const get_address_list = () => {
  return request_base.$httpGetWithToken(get_address_list_url + '?')
}

/**
 * 获取单个收货地址信息接口
 * @type {string}
 */
let get_address_info_url = siteInfo.api_host_j + '/rs-order/address/select-one-address'
export const get_address_info = (address_id) => {
  return request_base.$httpGetWithToken(get_address_info_url + '?addressId=' + address_id)

}

/**
 * 编辑或添加地址(详情见接口文档)
 * data 格式
 * token	是	string	用户登录令牌
 * addressId	否	number	编辑的时候必传 地址id
 * areaId	是	number	县id
 * trueName	是	string	收货人姓名
 * telPhone	是	string	收货人电话
 * address	是	string	收货人详细地址
 * type	是	string	add :表示添加 ；edit：表示编辑
 * @type {string}
 */
let edit_or_add_address_url = siteInfo.api_host_j + '/rs-order/address/add-edit-address'
export const edit_or_add_address = (data) => {
  return request_base.$httpPostWithToken(edit_or_add_address_url, data)
}

/**
 * 删除或设置默认地址接口(详情见接口文档)
 * data 格式
 * token	是	string	用户登录令牌
 * addressId	是	number	地址id
 * @type {string}
 */
let delete_or_setdefault_address_url = siteInfo.api_host_j + '/rs-order/address/del-address'
export const delete_or_setdefault_address = (data) => {
  return request_base.$httpPostWithToken(delete_or_setdefault_address_url, data)
}

let get_children_list_by_id_url = siteInfo.api_host_j + '/rs-order/address/select-area-tree'
export const getChildrenAddressById = (id) => {
  return new Promise((r, s) => {
    request_base.$httpGetWithToken(get_children_list_by_id_url + '?parentid=' + id).then((res) => {
      r(res.data.data.areaList)
    })
  })
}

