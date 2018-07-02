/**
 * localStorage
 *
 */

/** ----------------------------------------------- **/
/**
 * ls过期时间
 * @type {number}
 */
const expires = 10

/**
 * 设置ls参数key
 * @param key
 */
function setExpiresKey(key) {
  var curTime = new Date().getTime()
  localStorage.setItem(key, curTime)
}

/**
 * 判断ls参数key是否过期
 * @param key
 * @returns {boolean}
 */
function getExpiresKey(key) {
  var lastTime = localStorage.getItem(key)
  if(!lastTime) {
    return false
  }
  var curTime = new Date().getTime()
  if(curTime - lastTime > expires * 60000) {
    return false
  }
  return true
}

/**
 * 设置ls实体数据
 * @param key
 * @param value
 */
function setLsItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

/**
 * 获取ls实体数据
 * @param key
 */
function getLsItem(key) {
  return JSON.parse(localStorage.getItem(key))
}

function removeLsItem(key) {
  localStorage.removeItem(key)
}
export default {
  setExpiresKey,
  getExpiresKey,
  setLsItem,
  getLsItem,
  removeLsItem
}
