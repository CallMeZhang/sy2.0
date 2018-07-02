/**
 * sessionStorage
 *
 */

/**
 * 设置ls实体数据
 * @param key
 * @param value
 */
function setSsItem(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value))
}

/**
 * 获取ls实体数据
 * @param key
 */
function getSsItem(key) {
  return JSON.parse(sessionStorage.getItem(key))
}

function removeItem(key) {
  return sessionStorage.removeItem(key)
}

export default {
  setSsItem,
  getSsItem,
  removeItem
}
