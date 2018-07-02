import siteInfo from '../global'
import ls from '../modules/_ls'
import request_base from './base'

let search = "&"+window.location.search.substr(1)

let getAgentInfo_url = siteInfo.host + '/api/index.php?act=v_agent&op=get_agentinfo_by_memberid_ls_W&member_id='

export const getAgentInfo = (member_id, lskey = 'agentInfo'+member_id) => {
  let expire = ls.getExpiresKey(lskey)
  let data = ls.getLsItem(lskey+'D')
  if (!expire || !data) {
    return request_base.$httpGetWithLs(getAgentInfo_url+member_id, lskey)
  } else {
    return data
  }
}

