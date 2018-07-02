import siteInfo from '../global'
import ls from '../modules/_ls'
import request_base from './base'
//api url
let indexFirstLs_url = siteInfo.api_host_p + '/api/index.php?act=v_index&op=index_first_ls_W'
let indexFirst_url = siteInfo.api_host_p + '/api/index.php?act=v_index&op=index_first_W'
let indexSecond_url = siteInfo.api_host_p + '/api/index.php?act=v_index&op=index_second_W'
let indexThird_url = siteInfo.api_host_p + '/api/index.php?act=v_index&op=index_third_W'
let getUnion_url = siteInfo.api_host_p + '/api/index.php?act=v_index&op=select_union_W'
let getUnionByType_url = siteInfo.api_host_p + '/api/index.php?act=v_index&op=select_union_step2_W'

//ls key
let indexFirstKey = 'indexFirstLs'
let localUnionKey = 'localUnion'

export const indexFirstLs = (lskey = indexFirstKey) => {
  let expire = ls.getExpiresKey(lskey)
  let data = ls.getLsItem(lskey+'D')
  if (!expire || !data) {
    return request_base.$httpGetWithLs(indexFirstLs_url, lskey)
  } else {
    return data
  }
}
export const indexFirst = () => request_base.$httpGetNoLs(indexFirst_url)

export const indexSecond = () => request_base.$httpGetNoLs(indexSecond_url)

export const indexThird = () => request_base.$httpGetNoLs(indexThird_url)

export const getUnion = () => request_base.$httpGetNoLs(getUnion_url)

export const getUnionByType = (unionType) => request_base.$httpGetNoLs(getUnionByType_url+'&type='+unionType)

export const getLocalUnion = () => {
  return ls.getLsItem(localUnionKey)
}

export const saveUnion = (union) => {
  ls.setLsItem(localUnionKey, union)
}
