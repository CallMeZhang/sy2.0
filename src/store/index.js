import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const user = {

}

const goods = {

}

const order = {

}

const syshop = {

}

const syweal = {

}

const common = {

}

export default new Vuex.Store({
  modules: {
    user: user,
    goods: goods,
    order: order,
    syshop: syshop,
    syweal: syweal,
    common: common
  },
  getters,
  actions,
  mutations,
})
