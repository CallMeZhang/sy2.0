import Toast from './components/toast'
import SyPopupPicker from './components/popup-picker'
import Lazyload from './components/lazyload'
import SyTabContainerItem from './components/tab-container-item'
import SyTabContainer from './components/tab-container'
import SyPopup from './components/popup'
import LayerToast from './components/layer/toast'



import merge from './utils/merge';

const version = '2.2.13';
const iview = {
  version,
  Toast,
  SyPopupPicker,
  Lazyload,
  SyTabContainerItem,
  SyTabContainer,
  SyPopup,
  LayerToast
}
const install = (Vue, opts = {}) => {
  if (install.installed) return
  Object.keys(iview).forEach((key) => {
    if (!iview[key].name) return
    Vue.component(iview[key].name, iview[key])
  })
  // Vue.use(Lazyload, merge({
  //   preLoad: 1.3,
  //   error: require('../../static/images/common/default.svg'),
  //   loading: require('../../static/images/common/default.svg'),
  //   attempt: 3,
  //   listenEvents: ['scroll']
  // }, opts.lazyload)); //引入不起作用 郁闷

  Vue.$toast = Vue.prototype.$toast = Toast
  Vue.$layertoast = Vue.prototype.$layertoast = LayerToast

  //Vue.$dialog = Vue.prototype.$dialog = SyDialog
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default Object.assign(iview, {install})

