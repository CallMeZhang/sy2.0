<template>
  <div class="container">
    <sy-header titleText="确认订单"></sy-header>
    <sy-loading :show="isLoading"></sy-loading>

    <transition name="fade">
      <div v-show="!isLoading">
        <div v-if='isSpecial' class="address-wrapper">
          <div class="address-info">
            <div class="address-name-phone">
              <span class="address-name text-more">{{addressInfo.trueName}}</span><span class="address-phone text-more">{{addressInfo.telPhone || addressInfo.mobPhone}}</span>
            </div>
            <div class="address-text-wrapper">
              <b class="address-location"></b><span
              class="address-text">{{addressInfo.areaInfo + ' ' + addressInfo.address}}</span>
            </div>
            <input type="hidden" name="addressId" v-model="addressId"/>
          </div>
          <div class="address-bottom"></div>
        </div>
        <div v-else class="address-wrapper" @click="$router.push('/order/select_address')">
          <div class="address-info">
            <div class="address-name-phone">
              <span class="address-name text-more">{{addressInfo.trueName}}</span><span class="address-phone text-more">{{addressInfo.telPhone || addressInfo.mobPhone}}</span>
            </div>
            <div class="address-text-wrapper">
              <b class="address-location"></b><span
              class="address-text">{{addressInfo.areaInfo + ' ' + addressInfo.address}}</span>
            </div>
            <input type="hidden" name="addressId" v-model="addressId"/>
            <div class="address-more"></div>
          </div>
          <div class="address-bottom"></div>
        </div>
        <!--空行-->
        <div class="line-2"></div>
        <!--购买提示获得多少元-->
        <div class="tip-wrapper" v-if="moneyToPoor !== 0 && youGetPoint !== 0">
          <span class="tip-buy-text">您本次购买</span>
          <span class="tip-poor price">贫困户获得{{moneyToPoor}}元</span>
          <span class="tip-self price">交易后您将获得{{youGetPoint}}积分</span>
        </div>
        <div class="line-2" v-if="moneyToPoor !== 0 && youGetPoint !== 0"></div>
        <!--空行-->
        <!--商品信息-->
        <div class="goods-wrapper" v-for="(item, index) in orderGoodsList">
          <!--small title-->
          <div class="goods-type-title">
            {{item.goodsProjectType == 24 ? '善企让利 回馈爱心人士' : '扶贫特产 爱心捐助'}}
          </div>
          <!--商品信息-->
          <div class="goods-list-wrapper">
            <div class="goods-list" v-for="(v, k) in item.goodsInfoList">
              <img class="goods-image" :src="v.goodsImage" alt="">
              <span class="goods-name" v-html="v.goodsName"></span>
              <span class="goods-price text-more">￥{{parseFloat(v.goodsPrice).toFixed(2)}}</span>
              <span class="goods-point text-more sy-blue" v-if="v.needPoint > 0">+ {{v.needPoint}}积分</span>
              <span class="goods-src text-more">{{v.goodsSpec}}</span>
              <span class="goods-num">x{{v.goodsNum}}</span>
            </div>
          </div>
          <!--配送方式-->
          <div class="box-wrapper">
            <div class="box-inner no-border">
              <span class="item-left">配送方式</span>
              <span class="item-right">{{item.shipFee > 0 ? '￥' + parseFloat(item.shipFee).toFixed(2) : '免费'}}</span>
            </div>
          </div>
          <!--留言-->
          <div class="box-wrapper" @click="$router.push({name: 'textarea',
          params: {titleText: '留言', name: item.disOrderKey, value: getMessage(item.disOrderKey), callback: this.window.location.href}})">
            <div class="box-inner">
              <span class="item-left">留言</span>
              <span class="item-right">
              <span class="message-text">{{getMessage(item.disOrderKey)}}</span>
                <b class="message-more"></b>
              </span>
            </div>
          </div>
          <!--小计-->
          <div class="subtotal-wrapper">
            <div class="box-inner">
        <span class="item-right">共{{item.orderGoodsNum}}件商品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;小计：
          <span class="price">¥ {{parseFloat(item.orderAmount).toFixed(2)}}</span></span>
            </div>
          </div>
          <div class="line-2"></div>
        </div>
        <!--积分抵扣-->
        <div class="box-wrapper" v-if="usedBocPoint != 0">
          <div class="box-inner no-border">
            <span class="item-left">积分抵扣</span>
            <span class="item-right">- {{usedBocPoint}} 积分</span>
          </div>
        </div>
        <div class="line-2" v-if="usedBocPoint != 0"></div>
        <div class="box-wrapper">
          <div class="box-inner no-border">
            <span class="item-left">总计金额</span>
            <span class="item-right">￥ {{parseFloat(totalPrice).toFixed(2)}}</span>
          </div>
        </div>
        <div class="box-wrapper" v-if="couponPay != 0">
          <div class="box-inner">
            <span class="item-left">扶贫电子码</span>
            <span class="item-right">- ￥ {{parseFloat(couponPay).toFixed(2)}}</span>
          </div>
        </div>
        <div class="box-wrapper" @click="showCoupon(true)" v-if="couponList">
          <div class="box-inner">
            <span class="item-left">优惠券</span>
            <span class="item-right">-￥{{parseFloat(discount).toFixed(2)}}</span>
          </div>
        </div>
        <div class="bottom-line iphonex-bottom-line"></div>
        <div class="bottom-wrapper iphonex-padding-bottom">
          <span class="total-num">共计{{totalGoodsNum}}件</span>
          <span class="total-price">实付金额：<span class="price">￥ {{moneyPay}}</span></span>
          <a class="submit sy-blue-bg" @click="confirm()">提交订单</a>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="coupon-wrapper" v-show="coupon_show">
      </div>
    </transition>
    <transition name="popup">
      <div class="coupon-wrapper" style="background: transparent;" v-show="coupon_show">
        <div class="coupon-content-wrapper">
          <div class="coupon-title">优惠券</div>
          <div class="coupon-close" @click="showCoupon(false)">×</div>
          <div class="no-use">
            <div class="no-use-text">不使用优惠券</div>
            <div :class="{'coupon-select':true,'select': no_coupon_use ? false : true}" style="top: 0.12rem;"
                 @click="selectCoupon(-1)"></div>
          </div>
          <div class="coupon-num">您有{{coupon_list.length}}个优惠券可用</div>
          <!--优惠券列表-->
          <div class="coupon-list-wrapper">
            <div class="coupon-list" v-for="(item, index) in coupon_list">
              <div class="coupon">
                <div class="coupon-content">
                  <div class="left-wrapper">
                    <div class="coupon-price">{{item.voucherPrice}}</div>
                    <div class="coupon-use-money">
                      满{{item.voucherLimit}}元可使用
                    </div>
                  </div>
                  <div class="right-content">
                    <div class="coupon-desc text-more">{{item.voucherTtitle}}</div>
                    <div class="coupon-time text-more">{{item.voucherStartDate + '-' + item.voucherEndDate}}</div>
                    <div :class="{'coupon-select': true, 'select': (item.ischeck === 'N' ? false : true)}"
                         @click="selectCoupon(index)"></div>
                  </div>
                </div>
                <div class="coupon-line"></div>
              </div>
            </div>
          </div>

          <div class="coupon-bottom"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {order_confirm, go_pay} from '@/requests/order'
  import ss from '@/modules/_ss/index'
  import * as type from '@/packages/utils/extension'

  export default {
    data() {
      return {
        isSpecial: true,
        isLoading: true,
        coupon_show: false,
        addressInfo: {},
        addressId: null,
        moneyToPoor: 0,
        pointToSelf: 0,
        usedBocPoint: 0,
        allGoodsAmount: 0,
        totalPrice: 0,//总金额
        couponPay: 0,//扶贫码
        discount: 0,//优惠券
        moneyPay: 0,//总支付金额
        totalGoodsNum: 0,
        orderGoodsList: [],
        ifcart: 1,
        goods_id: 0,
        goods_num: 0,
        coupon_list: [],
        no_coupon_use: true,
        used_coupon_id: null,
        couponList: [],
        youGetPoint: 0,
        can_submit: true
      }
    },

    created() {
      ss.setSsItem('order_confirm', window.location.pathname + window.location.search)
      let ifcart = this.$route.query.ifcart === undefined ? 1 : this.$route.query.ifcart,
        goods_id = this.$route.query.goods_id === undefined ? 0 : this.$route.query.goods_id,
        goods_num = this.$route.query.goods_num === undefined ? 0 : this.$route.query.goods_num
      this.ifcart = ifcart
      this.goods_id = goods_id
      this.goods_num = goods_num
       this.getData(ifcart, goods_id, goods_num)
      this.appjs.syJsbGetClientInfo().then((res) => {
        if (res['platform'] === 'web') {
          this.showToolBar = true
        } else {
          this.appjs.syJsbSetTitleText('订单确认')
        }
      })
      this.appjs.syJsbSetGoBackUrl('orderGoBack()')
      let that = this
      window.orderGoBack = function () {
        that.appjs.syJsbGetCurrentPage(function (currentPage) {
          let route_name = that.$route.name
          if (currentPage !== 'main' && currentPage !== 'nonsupport' && route_name === 'confirm') {
            that.appjs.syJsbCloseAppPage()
          } else {
            window.history.go(-1)
          }
        });
      }
    },

    mounted() {
    	
    },

    methods: {
      confirm() {
        if (this.couponPay > 0) {
          this.$layertoast({
            duration: -1,
            title: "将从您账户中扣减扶贫码"+parseFloat(this.couponPay).toFixed(2)+"元",
            className: "layer2"
          }).then((res) => {
            this.submit_order()
          }, (res) => {
          })
        }else{
          this.submit_order()
        }
      },
      getData(ifcart, goods_id, goods_num) {
        let address_info = ss.getSsItem('order_address')
        let address_id = 0
        if (address_info !== null) {
          address_id = address_info.addressId
        }
        order_confirm(ifcart, goods_id, goods_num, address_id).then((res) => {
          if (res.data.code === 200) {
            let content = res.data.data.orderInfo
            this.isSpecial = content.isSpecial
            if (this.isSpecial) {
              this.$layertoast({
                duration: -1,
                message: "该商品仅可配送至人大机关单位，不可修改收货地址",
                title: "提示"
              })
            }
            this.addressInfo = content.syAddress
            this.addressId = this.addressInfo.addressId
            this.moneyToPoor = content.helpFee
            this.youGetPoint = content.buyerGetPoint
            this.usedBocPoint = content.allBocPointsUsed
            this.allGoodsAmount = content.allGoodsAmount
            this.totalPrice = parseFloat(content.allGoodsAmount + content.shipFee).toFixed(2) //总计金额
            this.couponPay = content.couponPay   //扶贫码金额
            this.discount = content.voucherInfo === null ? 0 : content.voucherInfo.voucherPrice  //优惠券金额
            this.couponList = content.voucherInfo === null ? false : true
            this.moneyPay = parseFloat(content.moneyPay).toFixed(2)
            this.orderGoodsList = content.orderShowInfo
            for (let key in content['orderShowInfo']) {
              this.totalGoodsNum += parseInt(content['orderShowInfo'][key]['orderGoodsNum'])
            }
            this.isLoading = false
            this.coupon_list = content.actualVoucherList
          } else if (res.data.code === 301) {
            this.appjs.syJsbAlert(res.data.message)
            this.appjs.syJsbCloseAppPage()
            window.location.href = this.siteInfo.host_old + '/bocm/index.php?act=cart'
          } else if (res.data.code === 302) {
            this.$router.push('/order/select_address')
          } else if (res.data.code === 403) {
            this.appjs.syJsbAlert(res.data.message)
            window.location.href = this.siteInfo.host_old + '/bocm/index.php?act=home'
          } else if (res.data.code === 500) {
            this.appjs.syJsbAlert(res.data.message)
            this.appjs.syJsbCloseAppPage()
          } else if (res.data.code === 501) {
            this.appjs.syJsbAlert(res.data.message)
            this.appjs.syJsbCloseAppPage()
          } else {
            this.appjs.syJsbAlert(res.data.message)
            this.appjs.syJsbCloseAppPage()
          }
        })
      },
      //获取留言
      getMessage(ssKey) {
        return ss.getSsItem(ssKey)
      },
      //提交订单
      submit_order() {
        //防止多次提交
        if (!this.can_submit) {
          return false
        }
        this.can_submit = false
        //提交数据
        let data = {
          'addressId': this.addressId,
          'ifcart': this.ifcart,
          'goodsId': this.goods_id,
          'goodsNum': this.goods_num
        }
        if (this.$route.query.s_m !== undefined && this.$route.query.s_m !== 0) {
          data.sharedMid = this.$route.query.s_m
        }
        if (this.$route.query.s_g !== undefined && this.$route.query.s_g !== 0) {
          data.sharedGoodsCommonid = this.$route.query.s_g
        }
        if (this.used_coupon_id !== null) {
          data.voucherId = this.used_coupon_id
        }
        //留言
        var ss_message_key = ''
        var ss_message_data = {}
        for (var k in this.orderGoodsList) {
          ss_message_key = this.orderGoodsList[k]['disOrderKey']
          ss_message_data[ss_message_key] = ss.getSsItem(ss_message_key)
          ss.removeItem(ss_message_key)
        }
        data.userWords = JSON.stringify(ss_message_data)
        go_pay(data).then((res) => {
          if (res.data.code === 200) {
            let content = res.data.data
            ss.removeItem('order_confirm')
            ss.removeItem('order_address')
            if (content.orderStatus == 1) {
              let pay_sn = content.paySn
              window.location.href = this.siteInfo.host_old + '/bocm/index.php?act=buy&op=pay&pay_sn=' + pay_sn + '&token=' + type['getCookie']('token') + '&iosVersion='
            } else {
              let pay_sn = content.paySn
              window.location.href = this.siteInfo.host_old + '/bocm/index.php?act=project&op=my_support_poor_order_list&token=' + type['getCookie']('token') + '&from_type=pay_return&pay_sn=' + pay_sn
            }
          } else {
            this.appjs.syJsbAlert(res.data.message)
          }
        })
      },
      //显示优惠券
      showCoupon(b) {
        if (b && this.coupon_list.length === 0) {
          this.appjs.syJsbAlert('无可用优惠券')
          return false
        }
        this.coupon_show = b
      },
      selectCoupon(coupon_index) {
        for (var k in this.coupon_list) {
          if (k == coupon_index) {
            if (this.totalPrice < this.coupon_list[k].voucherLimit) {
              return false
            }
            this.coupon_list[k].ischeck = 'Y'
            this.discount = this.coupon_list[k].voucherPrice
            this.moneyPay = parseFloat(parseFloat(this.totalPrice) - parseFloat(this.couponPay) - parseFloat(this.discount)).toFixed(2)
            this.used_coupon_id = this.coupon_list[k].voucherId
          } else {
            this.coupon_list[k].ischeck = 'N'
          }
        }
        this.no_coupon_use = true
        if (coupon_index === -1) {
          this.discount = 0
          this.moneyPay = parseFloat(parseFloat(this.totalPrice) - parseFloat(this.couponPay) - parseFloat(this.discount)).toFixed(2)
          this.no_coupon_use = false
          this.used_coupon_id = -1
        }
        this.youWillGetPoints()
      },
      youWillGetPoints() {
        let point = 0.00
        for (var k in this.orderGoodsList) {
          if (this.orderGoodsList[k].goodsProjectType != 24) {
            point += (parseFloat(this.orderGoodsList[k].allGoodsAmount) + parseFloat(this.orderGoodsList[k].shipFee))
          }
        }

        for (var k in this.coupon_list) {
          if (this.coupon_list[k].ischeck === 'Y' && this.coupon_list[k].voucherStoreType !== 'syshop') {
            point -= parseFloat(this.coupon_list[k].voucherPrice)
          }
        }

        this.youGetPoint = parseInt(parseFloat(point).toFixed(2) * 10)
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 100%;
    min-height: 100%;
    font-size: 0.28rem;
    background: #F7F9FA;
  }

  .address-wrapper {
    position: relative;
    width: 100%;
    min-height: 1.45rem;
    background: #ffffff;
  }

  .address-info {
    width: 100%;
    min-height: 1.35rem;
  }

  .address-name-phone {
    width: 100%;
    height: 0.59rem;
  }

  .address-name {
    display: inline-block;
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.28rem;
    margin-top: 0.19rem;
    margin-left: 0.64rem;
    max-width: 1.3rem;
  }

  .address-phone {
    display: inline-block;
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.28rem;
    margin-top: 0.19rem;
    margin-left: 0.38rem;
    vertical-align: top;
    max-width: 2rem;
  }

  .address-text-wrapper {
    width: 100%;
    min-height: 0.76rem;
  }

  .address-location {
    display: inline-block;
    width: 0.24rem;
    height: 0.29rem;
    margin-top: 0.22rem;
    margin-right: 0.14rem;
    margin-left: 0.26rem;
    background: url("/static/images/order/location.png") no-repeat;
    background-size: 100% 100%;
    vertical-align: top;
  }

  .address-text {
    vertical-align: top;
    display: inline-block;
    line-height: 0.4rem;
    margin-top: 0.16rem;
    font-size: 0.28rem;
    width: 5.82rem;
    margin-bottom: 0.2rem;
  }

  .address-more {
    height: 0.25rem;
    width: 0.14rem;
    position: absolute;
    top: 0.55rem;
    right: 0.3rem;
    background: url("/static/images/order/arrow-more.png") no-repeat;
    background-size: 100% 100%;
  }

  .address-bottom {
    width: 100%;
    height: 0.1rem;
    background: url("/static/images/order/order-confirm-address-bottom.png") no-repeat;
    background-size: 100% 100%;
  }

  .tip-wrapper {
    width: 100%;
    height: 1.86rem;
    background: url("/static/images/order/order-tip.jpg") no-repeat;
    background-size: 100% 100%;
    position: relative;
  }

  .tip-buy-text {
    position: absolute;
    top: 0.4rem;
    left: 0.64rem;
  }

  .tip-poor {
    position: absolute;
    top: 0.4rem;
    left: 2.64rem;
  }

  .tip-self {
    position: absolute;
    top: 0.8rem;
    left: 2.64rem;
  }

  .goods-type-title {
    background: url("/static/images/order/small-title-bg.jpg") no-repeat;
    background-size: 100% 100%;
    height: 0.89rem;
    width: 6.47rem;
    line-height: 0.89rem;
    padding-left: 1.03rem;
    font-size: 0.28rem;
  }

  .box-wrapper {
    height: 0.88rem;
    width: 100%;
    background: #ffffff;
  }

  .box-inner {
    width: 6.9rem;
    height: 0.88rem;
    border-top: 1px solid #E9EBEF;
    position: relative;
    margin: auto;
  }

  .no-border {
    border: none;
  }

  .message-wrapper {
    height: 0.88rem;
    width: 100%;
    border-bottom: 1px solid #E9EBEF;
    position: relative;
  }

  .subtotal-wrapper {
    height: 0.88rem;
    width: 100%;
    background: #ffffff;
  }

  .bottom-wrapper {
    height: 1rem;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    border-top: 1px solid #DADEE4;
    background: #ffffff;
    z-index: 99999;
  }

  .item-left {
    font-size: 0.26rem;
    position: absolute;
    top: 0.26rem;
    left: 0rem;
  }

  .item-right {
    font-size: 0.26rem;
    position: absolute;
    top: 0.26rem;
    right: 0rem;
    text-align: right;
  }

  .message-text {
    width: 3rem;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: text-bottom;
  }

  .message-more {
    display: inline-block;
    height: 0.25rem;
    width: 0.14rem;
    background: url("/static/images/order/arrow-more.png") no-repeat;
    background-size: 100% 100%;
  }

  .total-num {
    height: 1rem;
    line-height: 1rem;
    display: inline-block;
    position: absolute;
    left: 0.3rem;
  }

  .total-price {
    height: 1rem;
    line-height: 1rem;
    display: inline-block;
    position: absolute;
    left: 2.58rem;
  }

  .price {
    color: #f31e37;
  }

  .submit {
    position: absolute;
    height: 1rem;
    width: 2rem;
    font-size: 0.28rem;
    line-height: 1rem;
    text-align: center;
    color: #ffffff;
    right: 0;
  }

  .bottom-line {
    height: 1.2rem;
    width: 100%;
    background: #F7F9FA;
  }

  .goods-list-wrapper {
    background: #FAFAFA;
    padding: 0.09rem 0;
  }

  .goods-list {
    height: 1.76rem;
    position: relative;
  }

  .goods-image {
    height: 1.58rem;
    width: 2.24rem;
    margin-top: 0.09rem;
    margin-bottom: 0.09rem;
    margin-left: 0.3rem;
    vertical-align: middle;
    border-radius: 8px;
  }

  .goods-name {
    line-height: 0.4rem;
    width: 3rem;
    position: absolute;
    top: 0.09rem;
    left: 2.84rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .goods-price {
    line-height: 0.4rem;
    width: 1.2rem;
    text-align: right;
    position: absolute;
    top: 0.09rem;
    right: 0.3rem;
  }

  .goods-point {
    line-height: 0.4rem;
    text-align: right;
    position: absolute;
    top: 0.49rem;
    right: 0.3rem;
    font-size: 0.26rem;
  }

  .goods-src {
    line-height: 0.37rem;
    width: 2.52rem;
    position: absolute;
    top: 1.06rem;
    left: 2.84rem;
    font-size: 0.26rem;
    color: #818C9E;
  }

  .goods-num {
    line-height: 0.37rem;
    text-align: right;
    position: absolute;
    top: 1.06rem;
    right: 0.3rem;
    font-size: 0.26rem;
    color: #818C9E;
  }

  .coupon-wrapper {
    height: 100%;
    width: 100%;
    position: fixed;
    bottom: 1rem;
    background: rgba(148, 149, 150, 0.6);
    overflow: visible;
  }

  .coupon-list {
    max-height: 7.5rem;
    overflow: auto;
  }

  .coupon-content-wrapper {
    width: 100%;
    position: absolute;
    bottom: 0;
    background: #F7F9FA;
    height: 60%;
  }

  .coupon-list-wrapper {
    width: 100%;
    height: 60%;
    overflow: scroll;
  }

  .coupon-title {
    font-size: 0.3rem;
    color: #929292;
    margin-top: 0.3rem;
    text-align: center;
  }

  .coupon-close {
    height: 0.42rem;
    width: 0.42rem;
    position: absolute;
    top: 0.3rem;
    right: 0.24rem;
    line-height: 0.42rem;
    font-size: 0.42rem;
    color: #929292;
  }

  .no-use {
    height: 0.7rem;
    width: 7.06rem;
    background: #ffffff;
    margin: 0.34rem auto 0;
    position: relative;
  }

  .no-use-text {
    height: 0.7rem;
    line-height: 0.7rem;
    margin-left: 0.42rem;
    color: #4B4F63;
  }

  .coupon-num {
    height: 0.66rem;
    width: 7.06rem;
    margin: 0 auto;
    font-size: 0.2rem;
    color: #818C9E;
    line-height: 0.66rem;
  }

  .coupon-bottom {
    height: 0.83rem;
  }

  .coupon {
    height: 2.23rem;
  }

  .coupon-content {
    width: 7.06rem;
    height: 1.99rem;
    margin: auto;
    background: url(/static/images/order/coupon_bg.png) no-repeat;
    background-size: 100% 100%;
  }

  .coupon-line {
    height: 0.24rem;
  }

  .left-wrapper {
    width: 2.5rem;
    height: 1.99rem;
    overflow: hidden;
    color: #ffffff;
    display: inline-block;
  }

  .coupon-price {
    width: 0.78rem;
    height: 0.65rem;
    font-size: 0.65rem;
    line-height: 0.65rem;
    margin: 0.42rem auto 0;
  }

  .coupon-use-money {
    text-align: center;
    margin-top: 0.16rem;
  }

  .right-content {
    display: inline-block;
    width: 4.56rem;
    height: 1.99rem;
    vertical-align: top;
    position: relative;
  }

  .coupon-desc {
    height: 0.33rem;
    line-height: 0.33rem;
    font-size: 0.24rem;
    color: #4B4F63;
    margin-top: 0.34rem;
    margin-left: 0.5rem;
  }

  .coupon-time {
    height: 0.33rem;
    line-height: 0.33rem;
    font-size: 0.18rem;
    color: #818C9E;
    margin-top: 0.73rem;
    margin-left: 0.5rem;
  }

  .coupon-select {
    height: 0.46rem;
    width: 0.46rem;
    background: red;
    position: absolute;
    top: 0.77rem;
    right: 0.54rem;
    background: url(/static/images/order/unselect.png) no-repeat;
    background-size: 100% 100%;
  }

  .select {
    background: url(/static/images/order/select.png) no-repeat;
    background-size: 100% 100%;
  }
</style>
