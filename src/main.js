import Vue from 'vue'
import App from './App'
import store from './store/'
import router from './router'
import MintUI from 'mint-ui'
// import {Swipe, SwipeItem,Lazyload } from 'mint-ui';
import appjs from './modules/_appjs/index'
import 'mint-ui/lib/style.css'
import siteInfo from './global'
import 'babel-polyfill'
import header from './components/common/header/header.vue'
import loading from './components/common/loading/loading.vue'
import Packages from './packages'
let VueCookie = require('vue-cookie');

Vue.use(MintUI)
Vue.use(VueCookie)
Vue.use(Packages)
Vue.config.productionTip = false
Vue.prototype.appjs = appjs
Vue.prototype.siteInfo = siteInfo
/* eslint-disable no-new */

Vue.component("sy-header", header)
Vue.component("sy-loading", loading)

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = binding.value
  }
})
Vue.use(MintUI.Lazyload, {
  preLoad: 1.3,
  error: siteInfo.host_old +'/static/images/default/detail_default.png',
  loading: siteInfo.host_old +'/static/images/default/detail_default.png',
  attempt: 1
})
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
