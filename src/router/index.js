import Vue from 'vue'
import Router from 'vue-router'
//路由数组初始化（首页及选择联盟）
import index from '@/components/index.vue'
import selectunionA from '@/components/common/selectunion/selectunionA.vue'
import selectunionB from '@/components/common/selectunion/selectunionB.vue'

let $routes = [{
  path: '/',
  redirect: '/index'
}, {
  path: '/index',
  name: 'index',
  component: index
}, {
  path: '/selectunionA',
  name: 'selectunionA',
  component: selectunionA
}, {
  path: '/selectunionB/:unionType',
  name: 'selectunionB',
  component: selectunionB
}]

//error
import page_500 from '@/components/common/error/500.vue'

$routes.push({
  path: '/500',
  name: 'error',
  component: page_500
})
//通用组件
import loading from '@/components/common/loading/loading.vue'

$routes.push({
  path: '/loading',
  name: 'loading',
  component: loading
})

//form通用组件
import textarea from '@/components/common/formPlugin/textarea.vue'

$routes.push({
  path: '/textarea',
  name: 'textarea',
  component: textarea,
  props: true
})

//登录注册
import login_page from '@/components/user/login/login.vue'
import register_page from '@/components/user/login/register_v2.vue'
import improve_page from '@/components/user/login/improve_v2.vue'
import complete_page from '@/components/user/login/complete_v2.vue'
import invite_code_page from '@/components/user/login/invite_code_v2.vue'
import verify from '@/components/user/login/verify.vue'

$routes.push({
  path: '/login_page',
  name: 'login_page',
  component: login_page
}, {
  path: '/register_page',
  name: 'register_page',
  component: register_page
}, {
  path: '/improve_page',
  name: 'improve_page',
  component: improve_page
}, {
  path: '/complete_page',
  name: 'complete_page',
  component: complete_page
}, {
  path: '/invite_code_page',
  name: 'invite_code_page',
  component: invite_code_page
}, {
  path: '/verify',
  name: 'verify',
  component: verify
})

//订单相关
import confirm from '@/components/order/order_pay/confirm.vue'
import select_address from '@/components/order/order_pay/select_address.vue'
import add_address from '@/components/order/order_pay/add_address.vue'
import edit_address from '@/components/order/order_pay/edit_address.vue'

$routes.push(
  {
    path: '/order/confirm',
    name: 'confirm',
    component: confirm
  }, {
    path: '/order/select_address',
    name: 'select_address',
    component: select_address
  }, {
    path: '/order/add_address',
    name: 'add_address',
    component: add_address
  }, {
    path: '/order/edit_address/:address_id',
    name: 'edit_address',
    component: edit_address
  })


//集采相关
const bizbuy_index = r => require.ensure([], () => r(require('@/components/goods/bizbuy/index.vue')), 'bizbuy')
const bizbuy_category = r => require.ensure([], () => r(require('@/components/goods/bizbuy/category.vue')), 'bizbuy')
const bizbuy_list = r => require.ensure([], () => r(require('@/components/goods/bizbuy/goods_list.vue')), 'bizbuy')
$routes.push({
  path: '/bizbuy/index',
  name: 'bizbuy_index',
  component: bizbuy_index
}, {
  path: '/bizbuy/category',
  name: 'bizbuy_category',
  component: bizbuy_category
}, {
  path: '/bizbuy/goods_list',
  name: 'goods_list',
  component: bizbuy_list
})

//善缘商场首页
const symarket = r => require.ensure([], () => r(require('@/components/syshop/index.vue')), 'syshop')
const syshop_category = r => require.ensure([], () => r(require('@/components/syshop/goods/category.vue')), 'syshop')
const syshop_list = r => require.ensure([], () => r(require('@/components/syshop/goods/goods_list.vue')), 'syshop')
$routes.push({
  path: '/syshop/category',
  name: 'syshop_category',
  component: syshop_category
}, {
  path: '/syshop/goods_list',
  name: 'goods_list',
  component: syshop_list
})
$routes.push({
  path: '/syshop/index',
  name: 'symarket',
  component: symarket,
  meta: {
    requiresAuth: false,//需不需要登录检测  可以不写
    title: '善源商场'
  }
})
//大爱超市
const lovemarket = r => require.ensure([], () => r(require('@/components/daaimarket/market_goods_list.vue')), 'daai')
$routes.push({
  path: '/daaimarket/market_goods_list',
  name: 'lovemarket',
  component: lovemarket,
  meta: {
    requiresAuth: false,//需不需要登录检测  可以不写
    title: '大爱超市'
  }
})
//地址通用模块
const chooseAddress = r => require.ensure([], () => r(require('@/components/common/address/chooseAddress.vue')), 'address')
const editAddress = r => require.ensure([], () => r(require('@/components/common/address/editAddress.vue')), 'address')
$routes.push({
  path: '/address/chooseAddress',
  name: 'chooseAddress',
  component: chooseAddress,
  meta: {
    requiresAuth: false,//需不需要登录检测  可以不写
    title: '管理地址'
  }
}, {
  path: '/address/editAddress',
  name: 'editAddress',
  component: editAddress,
  meta: {
    requiresAuth: false,//需不需要登录检测  可以不写
    title: '编辑地址'
  }
})
//物流信息模块
const logisticsInfo = r => require.ensure([], () => r(require('@/components/common/logisticsInfo/index.vue')), 'logisticsInfo')
const sendGoodes = r => require.ensure([], () => r(require('@/components/common/logisticsInfo/sendGoodes.vue')), 'logisticsInfo')
const checkInfo = r => require.ensure([], () => r(require('@/components/common/logisticsInfo/checkInfo.vue')), 'logisticsInfo')

const maintenance = r => require.ensure([], () => r(require('@/components/common/maintenance.vue')), 'logisticsInfo')

$routes.push(
  {
    path: '/maintenance',
    name: 'maintenance',
    component: maintenance
  },
  {
    path: '/logisticsInfo/index',
    name: 'logisticsInfo',
    component: logisticsInfo,
    meta: {
      requiresAuth: false,//需不需要登录检测  可以不写
      title: '查看物流'
    }
  }, {
    path: '/logisticsInfo/sendGoodes',
    name: 'sendGoodes',
    component: sendGoodes,
    meta: {
      requiresAuth: false,//需不需要登录检测  可以不写
      title: '查看物流'
    }
  }, {
    path: '/logisticsInfo/checkInfo',
    name: 'checkInfo',
    component: checkInfo,
    meta: {
      requiresAuth: false,//需不需要登录检测  可以不写
      title: '查看物流'
    }
  })
//苹果树认养活动
const campaign = r => require.ensure([], () => r(require('@/components/campaign/index.vue')), 'campaign')
// const appletreeDetail = r => require.ensure([], () => r(require('@/components/campaign/appletree-detail.vue')), 'campaign')
import appletreeDetail from '@/components/campaign/appletree-detail.vue'
const appleTreeApply = r => require.ensure([], () => r(require('@/components/campaign/apply.vue')), 'campaign')
const registrationResults = r => require.ensure([], () => r(require('@/components/campaign/registration-results.vue')), 'campaign')
const fAQ = r => require.ensure([], () => r(require('@/components/campaign/frequently-asked-question.vue')), 'campaign')
const progressReport = r => require.ensure([], () => r(require('@/components/campaign/progress-report.vue')), 'campaign')
const reportDetail = r => require.ensure([], () => r(require('@/components/campaign/progress-report-detail.vue')), 'campaign')
const appleTreePay = r => require.ensure([], () => r(require('@/components/campaign/pay.vue')), 'campaign')
const appleTreePayS = r => require.ensure([], () => r(require('@/components/campaign/pay-apple-tree-success.vue')), 'campaign')
const applePayS = r => require.ensure([], () => r(require('@/components/campaign/pay-apple-success.vue')), 'campaign')
const applePayResult = r => require.ensure([], () => r(require('@/components/campaign/pay-result.vue')), 'campaign')
const appleTreePayF = r => require.ensure([], () => r(require('@/components/campaign/pay-failure.vue')), 'campaign')
const adoptionProof = r => require.ensure([], () => r(require('@/components/campaign/adoption-proof.vue')), 'campaign')

const recordMap = r => require.ensure([], () => r(require('@/components/campaign/record-map.vue')), 'campaign')
const chooseAdoption = r => require.ensure([], () => r(require('@/components/campaign/choose-adoption-v2.vue')), 'campaign')
const adoptionAgreement = r => require.ensure([], () => r(require('@/components/campaign/adoption-agreement.vue')), 'campaign')
const chooseRegion = r => require.ensure([], () => r(require('@/components/campaign/choose-region.vue')), 'campaign')
const appleTreeName = r => require.ensure([], () => r(require('@/components/campaign/apple-tree-name.vue')), 'campaign')
const adoptionRecords = r => require.ensure([], () => r(require('@/components/campaign/adoption-records.vue')), 'campaign')
const teamAdoption = r => require.ensure([], () => r(require('@/components/campaign/team-adoption.vue')),'campaign')
const baseAttestation = r => require.ensure([], () => r(require('@/components/campaign/base-attestation.vue')),'campaign');
//const evolve = r => require.ensure([], () => r(require('@/components/campaign/evolve.vue')),'campaign')
$routes.push(
  {
    path: '/adoptMap',
    name: 'adoptMap',
    component: recordMap,
    meta: {
      // requiresAuth: true,//需不需要登录检测  可以不写
      title: '认养地图'
    }
  }, {
    path: '/campaign',
    name: 'campaign',
    component: campaign,
    meta: {
     // requiresAuth: true,//需不需要登录检测  可以不写
      title: '「我的苹果树」扶贫认养'
    }
  }, {
    path: '/appletreeDetail',
    name: 'appletreeDetail',
    query: {'is_share': ''},
    component: appletreeDetail,
    meta: {
      title: '我的苹果树'
    },
  }, {
    path: '/appletreeDetail/fAQ',
    name: 'fAQ',
    component: fAQ,
    meta: {
      title: '常见问题'
    },
  }, {
    path: '/appleTreeApply',
    name: 'appleTreeApply',
    component: appleTreeApply,
    meta: {
      title: '认养报名'
    }
  }, {
    path: '/registrationResults',
    name: 'registrationResult',
    component: registrationResults,
    meta: {
      title: '报名结果'
    }
  },{
    path: '/adoption/agreement',
    name: 'adoptionAgreement',
    component: adoptionAgreement ,
    meta: {
      // requiresAuth: true,
      title: '认养协议'
    }
  },{
    path: '/choose/region',
    name: 'chooseRegion',
    component: chooseRegion ,
    meta: {
      // requiresAuth: true,
      title: '选择苹果树板块'
    }
  },{
    path: '/report',
    name: 'progressReport',
    component: progressReport,
    meta: {
      title: '进展播报'
    }
  },{
    path: '/report/detail',
    name: 'reportDetail',
    component: reportDetail,
    meta: {
      title: '进展播报详情'
    }
  },{
    path: '/choose/adoption',
    name: 'chooseAdoption',
    component: chooseAdoption,
    meta: {
      // requiresAuth: true,
      title: '认养方式'
    }
  },{
    path: '/trees/naming',
    name: 'appleTreeName',
    component: appleTreeName,
    meta: {
      title: '我的苹果树命名'
    }
  },{
    path: '/appleTreePay',
    name: 'appleTreePay',
    component: appleTreePay,
    meta: {
      title: '确认支付'
    }
  },{
    path: '/appleTreePay/success',
    name: 'appleTreePaySuccess',
    component: appleTreePayS,
    meta: {
      title: '支付结果'
    }
  },{
    path: '/applePay/success',
    name: 'applePaySuccess',
    component: applePayS,
    meta: {
      title: '支付结果'
    }
  },{
    path: '/appleTreePay/failure',
    name: 'appleTreePayFailure',
    component: appleTreePayF,
    meta: {
      title: '支付结果'
    }
  },{
    path: '/appleTreePay/consequence',
    name: 'applePayResult',
    component: applePayResult,
    meta: {
      title: '支付结果'
    }
  },{
    path: '/adoption/proof',
    name: 'adoptionProof',
    component: adoptionProof,
    meta: {
      title: '认养证书'
    }
  },{
      path: '/adoptionRecords',
      name: 'adoptionRecords',
      component:adoptionRecords ,
      meta: {
          //requiresAuth: true,
          title: '我的认养记录'
      }
    },{
        path: '/teamAdoption',
        name: 'teamAdoption',
        component:teamAdoption ,
        meta: {
            title: '团体认养'
        }
    },{
        path: '/baseAttestation',
        name: 'baseAttestation',
        component:baseAttestation ,
        meta: {
            title: '基地认证'
        }
    }
)

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: $routes
})

import {getCookie} from '../packages/utils/extension'

router.beforeEach((to, from, next) => {
if(/maintenance/ig.test(window.location.href)){
  next()
  return;
}else{
  window.location.href=window.location.origin+'/maintenance'
  // next()
  return;
}
  next()
  window.scrollTo(0, 0)
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    // requiresAuth字段 需不需要登录检测 重定向到登录
    let token = getCookie("token")
    if (!token) {
      var loginUrl = window.location.origin
      var goUrl = encodeURIComponent(loginUrl + to.fullPath)
      next({
        path: '/login_page',
        query: {callback: goUrl}
      })
    } else {

      next()
    }

  } else {
    next() // 确保一定要调用 next()
  }
})
router.afterEach((to, from) => {

})

export default router
