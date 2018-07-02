<template>
  <div class="pay-con">
    <div v-title="'确认支付'"></div>
    <sy-loading :show="isLoading"></sy-loading>
      <transition name="fade">
        <div v-show="!isLoading" class="apple-tree-pay">
          <div class="tree-pay-con">
            <ul class="pay-info">
              <li class="info-item">
                <div class="pay-info-left">商品名称</div>
                <div class="pay-info-right">{{productsData.goodsName}}</div>
              </li>
              <li class="info-item">
                <div class="pay-info-left">认养方式</div>
                <div class="pay-info-right">{{productsData.adoptWay}}</div>
              </li>
              <li class="info-item">
                <div class="pay-info-left">商品单价</div>
                <div class="pay-info-right">￥{{productsData.goodsPrice}}</div>
              </li>
              <li class="info-item">
                <div class="pay-info-left">商品数量</div>
                <div class="pay-info-right">{{productsData.goodsNum}}</div>
              </li>
              <li class="info-item">
                <div class="pay-info-left">总计金额</div>
                <div class="pay-info-right">{{productsData.orderAmount | formatMoney}}</div>
              </li>
              <li class="info-item" v-if="fpCode >0">
                <div class="pay-info-left">扶贫电子码</div>
                <div class="pay-info-right">-{{productsData.counPay | formatMoney}}</div>
              </li>
            </ul>
            <div v-show="deductionFull > 0">
              <div class="pay-manner-title">选择支付方式</div>
              <ul class="pay-manner">
                <!---->
                <li v-if="objPay.al" class="manner-item" @click="selectionMethod(payManner.mannerId)">
                  <div class="manner-item-left">
                    <img :src="payManner.srcUrl" alt="zy-icon">
                  </div>
                  <div class="manner-item-center">
                    <h3 class="c-title">{{payManner.title}}</h3>
                    <p class="c-descr">{{payManner.description}}</p>
                  </div>
                  <div class="manner-item-right">
                    <span :class="{'check':payManner.checked}"></span>
                  </div>
                </li>
                <li v-if="objPay.wx" class="manner-item" @click="selectionMethod(weChatPay.mannerId)">
                  <div class="manner-item-left">
                    <img :src="weChatPay.srcUrl" alt="zy-icon">
                  </div>
                  <div class="manner-item-center">
                    <h3 class="c-title">{{weChatPay.title}}</h3>
                    <p class="c-descr">{{weChatPay.description}}</p>
                  </div>
                  <div class="manner-item-right">
                    <span :class="{'check':weChatPay.checked}"></span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="pay-btn iphonex-bottom-div" v-if="deductionFull > 0" @click="confirmPayment()">
            {{ payText}}{{productsData.payAmount}}元
          </div>
          <div class="pay-btn iphonex-bottom-div" v-else @click="confirmPayment()">
            确认付款0.00元
          </div>
        </div>

      </transition>
  </div>
</template>
<script>
  import ss from '@/modules/_ss/index'
  import ls from '@/modules/_ls/index'
  import {Toast} from 'mint-ui';
  import {checkPlatform, checkBrowser, getCookie} from '@/packages/utils/extension'
  import * as request from '@/requests/campaign'
  import wxJs from 'weixin-js-sdk'
  export default{
    data (){
      return {
        isLoading: true,
        is_share: false,
        orderSn: '',//正式用的订单号
        order_Id: 0,//扶贫码支付&
        order_Sn:'',//订单编号
        pay_Status:false,//支付状态
        pay_Result_Url:'',//支付url
        goods_id:0,
        coupon_Info: '',//扶贫码支付&
        isApp: true, //app内
        isWeChat: false, //微信浏览器
        wxOpenId:'',//wx openId
        wxFinallyData: {},//微信预支付后参数
        isWeb: false, // web浏览器
        fpCode:"",//扶贫码
        deductionFull: 0,//扶贫码足额抵扣情况下
        productsData: {},
        fpPayData: {},//扶贫码抵扣参数
        objPay: {
          wx: true,
          al: true
        },
        payManner: {
          "mannerId": "zfb",
          "title": "支付宝支付",
          "description": "推荐支付宝用户使用",
          "srcUrl": "/static/images/common/zfb_icon.png",
          "btnText": "支付宝支付",
          "checked": false
        },
        weChatPay: {
          "mannerId": "weixin",
          "title": "微信支付",
          "description": "推荐已安装微信客户端的用户使用",
          "srcUrl": "/static/images/common/weixin_icon.png",
          "btnText": "微信支付",
          "checked": true
        },
        selectionManner: {
//            "btnText":"微信支付",
        },
      }
    },
    filters: {
      formatMoney: (value) => {
        return "￥" + value;
      }
    },
    computed: {
      payText: function () {
        let str = "确认付款"
//        this.isApp
        if (this.isApp) {
          if (this.objPay.wx && this.weChatPay.checked) {
            str = "微信支付"
          } else {
            str = "支付宝支付"
          }
        } else {
          if (new checkPlatform().weixin) {
            str = "微信支付"
          } else {
            str = "支付宝支付"
          }
        }
        return str;
      }
    },
    created (){
      console.log(window.location.href)
      this.is_share = /is_share=yes/ig.test(window.location.href)
      if (this.$route.query.orderSn) {
        this.orderSn = this.$route.query.orderSn
      }
      this.getOrderInfo();//获取订单信息
//      this.payStatus(this.orderSn); //支付状态
      this.platformJudge();//判断平台
    },
    mounted (){
    },
    methods: {
      getOrderInfo ()   {
        request.getOrderInfo(this.orderSn).then((res) => {
          this.isLoading = false;
          let code = res.data.code;
          if (code == 200) {
            this.productsData = res.data.data;
            this.fpCode = parseFloat(res.data.data.counPay);
            this.deductionFull = parseFloat(res.data.data.payAmount);
            this.order_Id = res.data.data.orderId;
            this.coupon_Info = res.data.data.couponInfo;
            this.goods_id = res.data.data.goodsId;
            this.fpPayData = {
              orderSn: this.orderSn,
              couponInfo: res.data.data.couponInfo,
              payMoney: res.data.data.payAmount,
              couponAmount: res.data.data.counPay
            }
          } else if (code == 301) {
            this.jumpTologin();
          } else {
            console.log(res.data.message);
            return false;
          }
        });
      },
      payStatus(orderSn){
        console.log('payStatus methods')
        request.appleTreePayStatus(orderSn).then((res) =>{
          if(res.data.code !== 200){
            console.log('接口错误')
            return false;
          }
          this.pay_Status = res.data.data.state;
          this.pay_Result_Url = res.data.data.resultUrl;
          console.log(res.data.data)
        });
      },
      selectionMethod(p){
        if (p === "zfb") {
          this.weChatPay.checked = false;
          this.payManner.checked = true;
        } else {
          this.weChatPay.checked = true;
          this.payManner.checked = false;
        }
      },
      platformJudge (){
        let _that = this;
        this.appjs.syJsbGetAppInfo(function (appInfo) {
          if (appInfo) {
            _that.isApp = true;
            return;
          } else {
            _that.isApp = false;
            var platform = new checkPlatform();
            console.log(platform.weixin)
            if (platform.weixin) {
              _that.objPay.al = false;
              _that.weChatPay.checked = true;
              _that.payManner.checked = false;
            } else {
              _that.objPay.wx = false;
              _that.weChatPay.checked = false;
              _that.payManner.checked = true;
            }
          }
          console.log("appInfo: "+appInfo)
        });

      },
      confirmPayment(){
        console.log("this.productsData.payAmount: "+this.productsData.payAmount)
        console.log("parseFloat(this.productsData.payAmount) === 0")
        console.log(parseFloat(this.productsData.payAmount) === 0)
        if (parseFloat(this.productsData.payAmount) === 0) {
          this.fpPayMethod()
        } else {
          console.log("this.isApp: " +this.isApp)
          if (this.isApp) {
            if (this.weChatPay.checked) {
              this.wxAppn()
            } else if (this.payManner.checked) {
              this.alPayn()
            }
          } else {
            if (new checkPlatform().weixin) {
              this.wxAppw()
            } else {
              this.alPayw()
            }
          }

        }
      },
      fpPayMethod(){
        console.log('扶贫码足额抵扣');
        let _that = this;
        console.log(this.fpPayData);
        request.appleTreeCouponPay(this.fpPayData).then((res) => {
          console.log(res.data);
          if (res.data.code === 200) {
            if(_that.productsData.adoptWay === "定制苹果"){
              _that.$router.push('/applePay/success?orderSn='+_that.orderSn)
            }else{
              _that.$router.push('/appleTreePay/success?orderSn='+_that.orderSn)
            }
          }else{
            console.log('接口异常')
            _that.$router.push('/appleTreePay/failure?orderSn='+_that.orderSn)
            console.log(res.data.message)
          }
        })
      },
      alPayn(){
        console.log('app内支付宝 支付');
        let that = this;
        //支付宝支付参数
        let alidata = {
          goodsId: this.goods_id,
          orderAmount: this.productsData.orderAmount,
          orderSn: this.orderSn,
          goodsNum: this.productsData.goodsNum,
          payMoney: this.productsData.payAmount,
        }
        if((that.fpCode !== "") &&  that.fpCode> 0){
          console.log('app内支付宝&扶贫码 ：'+that.fpCode);
          request.appleTreeCouponPay(that.fpPayData).then((res) => {
            if (res.data.code == 200) {
              if(res.data.data.state){
                console.log("扶贫码部分抵扣成功");
              }
              console.log("app内 扶贫码&支付宝支付");
              console.log("扶贫码部分抵扣状态：" + res.data.data.state);
              that.alPaynRepeaMethod(alidata);//扶贫码抵扣方法
            } else {
              console.log(res.data.message);
            }
          });
        }else{
          console.log('app内支付宝 无扶贫码支付');
          that.alPaynRepeaMethod(alidata);
        }
      },
      alPaynRepeaMethod(alData){
        request.appleTreeAliAppPay(alData).then((res) => {
          if (res.data.code == 200) {
            let ad = res.data.data
            let d = {
              data: ad.orderStr,
              url_success: ad.success_url,
              alipay_fruit_trees: 'appleTree'
            }
            console.log(res.data);
            console.log(d)
//            window.alipayPay(JSON.stringify(d))
            this.appjs.syJsbAliPay(JSON.stringify(d));
          } else {
            alert("app内支付宝支付失敗！" +res.data.message)
          }
        })
      },
      alPayw(){
        console.log('alPayW 支付')
        let _that = this;
        let aliWaiData = {
          goodsId: this.goods_id,
          orderAmount: this.productsData.orderAmount,
          orderSn: this.orderSn,
          goodsNum: this.productsData.goodsNum,
          payMoney: this.productsData.payAmount,
        }
        console.log('扶贫码部分抵扣');
        if((_that.fpCode !== "") &&  _that.fpCode> 0){
          request.appleTreeCouponPay(_that.fpPayData).then((res) => {
            if (res.data.code == 200) {
              if(res.data.data.state){
                console.log("扶贫码部分抵扣成功！")
              }
              console.log('浏览器支付宝&扶贫码支付');
              console.log("扶贫码部分抵扣状态：" + res.data.data.state);
              _that.alPayWaiRepeaM(aliWaiData, _that);
            } else {
              console.log(res.data.message)
            }
          })
        }else{
          console.log('app外支付宝 无扶贫码支付');
          _that.alPayWaiRepeaM(aliWaiData, _that);
        }
      },
      alPayWaiRepeaM(aliWdata, that){
        request.appleTreeAliPayWai(aliWdata).then((res) => {
          if (res.data.code == 200) {
            console.log(res.data);
            let ad = res.data.data
            let d = {
              data: ad.orderStr,
              url_success: ad.success_url,
            }
            request.appleTreeAliPaySuccess(that.OrderSn).then((res)=>{
              console.log('ali pay success')
              console.log(res.data);
              if(res.data.code !== 200){
                console.log(res.data.message)
                return false;
              }
            });
            window.location.href = d.data;
          } else {
            alert("app外支付宝 支付失敗！" +res.data.message);
          }
        })
      },
      wxAppn(){
        let that = this;
        console.log('wxApp内');
        //扶贫码支付接口参数 that.fpPayData
        //微信支付接口参数
        let wxNdata = {
          orderId: this.order_Id,
          goodsNum: this.productsData.goodsNum,
          orderAmount: this.productsData.orderAmount,
          payAmount: this.productsData.payAmount,
        }
        console.log('app内微信&扶贫码 ：'+that.fpCode);
        if((that.fpCode !== "") && that.fpCode> 0){
          request.appleTreeCouponPay(that.fpPayData).then((res) => {
            if (res.data.code == 200) {
              if(res.data.data.state){
                console.log("扶贫码部分抵扣成功！")
              }
              that.wxAppnPayRepeaMethod(wxNdata,that);
            } else {
              console.log(res.data.message);
            }
          })
        }else{
          //无扶贫码微信支付
          console.log('app内微信 无扶贫码支付');
          that.wxAppnPayRepeaMethod(wxNdata,that);
        }

      },
      wxAppnPayRepeaMethod(wxData,that){
        request.appleTreeAppPay(wxData).then((res) => {
          console.log(that.pay_Result_Url);
          if (res.data.code == 200) {
            let ad = res.data.data.orderStr
            let td = res.data.data
            let d = {
              pay_sign: ad.sign,
              pay_noncestr: ad.noncestr,
              pay_timestamp: ad.timestamp,
              url_success: td.successUrl,
              prepay_id: ad.prepayid,
              mch_id: td.mchId,
              result_code: "SUCCESS",
            }
            console.log(res.data.data);
            that.appjs.syJsbWxPay(JSON.stringify(d))
          } else {
            console.log(res.data.message);
            console.log("app微信接口异常")
          }
        })
      },
      wxAppw(){
        console.log('微信app外支付');
        let that = this;
        let pay_openid = getCookie('payOpenId');
//        let pay_openid = 'oqpZGwB9lXS8QyVHOF4JF1ZzG53I';
        if(pay_openid){
          this.wxOpenId = pay_openid;
        }
        let wxWaiData = {
          orderId: this.order_Id,
          goodsNum: this.productsData.goodsNum,
          orderAmount: this.productsData.orderAmount,
          payAmount: this.productsData.payAmount,
          openID: this.wxOpenId
        }
        console.log(wxWaiData);
        console.log('app外微信&扶贫码 ：'+this.fpCode);
        if((this.fpCode !== "") && this.fpCode> 0){
          request.appleTreeCouponPay(this.fpPayData).then((res) => {
            if (res.data.code === 200) {
              if(res.data.data.state){
                console.log("扶贫码部分抵扣成功！")
              }
              console.log('微信浏览器&扶贫码支付');
              console.log('扶贫码部分抵扣状态：'+ res.data.data.state);
              this.wxAppwPayRepeaM(wxWaiData)
            } else {
              console.log(res.data.message)
            }
          })
        }else{
          console.log('app外微信 无扶贫码支付');
          this.wxAppwPayRepeaM(wxWaiData);
        }
      },
      wxAppwPayRepeaM(wx_data){
        request.appleTreeJsapiPay(wx_data).then((res) => {
          if (res.data.code === 200) {
            this.wxFinallyData = res.data.data.dataMap;
          } else {
            alert("支付失敗！" + res.data.message);
          }
        }).then(() =>{
          if (typeof WeixinJSBridge === "undefined"){
            console.log('weixinjsbridge 不在');
            if( document.addEventListener ){
              document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            }else if (document.attachEvent){
              document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
              document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
          }else{
            console.log('weixinjsbridge 存在');
            console.log(this.wxFinallyData);
            this.onBridgeReady(this.wxFinallyData);
          }
        })
      },
      onBridgeReady(finallyData){
        let that = this;
        console.log(WeixinJSBridge.invoke)
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            "appId":finallyData.appId,     //公众号名称，由商户传入
            "timeStamp":finallyData.timeStamp,         //时间戳，自1970年以来的秒数
            "nonceStr":finallyData.nonceStr, //随机串
            "package":finallyData.package,
            "signType":finallyData.signType,         //微信签名方式：
            "paySign":finallyData.paySign //微信签名
          },
          function(res){
            console.log(res);
            // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            if(res.err_msg == "get_brand_wcpay_request:ok") {
              console.log('信浏览器支付支付成功！');
              if(that.productsData.adoptWay === '定制苹果'){
                window.location.href = that.siteInfo.host +"/applePay/success?orderSn="+that.$route.query.orderSn;
              }else{
                window.location.href = that.siteInfo.host +"/appleTreePay/success?orderSn="+that.$route.query.orderSn;
              }
            } else if(res.err_msg == "get_brand_wcpay_request:cancel"){
              console.log('微信浏览器取消支付！');
            }else if(res.err_msg == "get_brand_wcpay_request:fail"){
              console.log('微信浏览器支付失败！');
              window.location.href = that.siteInfo.host +"/appleTreePay/failure?orderSn="+that.$route.query.orderSn;
            }
          }
        );
      },
      jumpTologin() {
        let callbackUrl = encodeURIComponent(this.siteInfo.host + '/appleTreePay?orderSn='+this.orderSn);
        window.location.href = this.siteInfo.host_old + '/api/index.php?act=login&callback=' + callbackUrl;
      },
    }


  }
</script>
<style lang="scss" scoped>
  $bg: #f7f9fa;
  $white-bg: #fff;
  .pay-con{
    width: 100%;
    height: 100%;
  }
  .apple-tree-pay {
    width: 100%;
    height: calc(100% - 0.2rem);
    padding-top: 0.2rem;
    background: $bg;
    position:relative;
    .tree-pay-con {
      width: 7.5rem;
      margin: 0 auto;
      background: #fff;
      .info-item {
        display: flex;
        width: 6.9rem;
        padding: 0 0.3rem;
        height: 0.88rem;
        line-height: 0.88rem;
        border-bottom: 1px solid rgba(218, 222, 228, 0.60);
        .pay-info-left {
          width: 1.64rem;
          font-size: 0.28rem;
          color: #606060;
        }
        .pay-info-right {
          margin-left: 0.57rem;
          width: 4.69rem;
          font-size: 0.28rem;
          color: #818C9E;
          text-align: right;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      .pay-manner-title {
        width: 6.9rem;
        padding: 0 0.3rem;
        height: 0.7rem;
        font-size: 0.26rem;
        color: #5C6073;
        line-height: 0.7rem;
        background: #F7F9FA;
        border-bottom: 1px solid rgba(218, 222, 228, 0.60);
      }
      .manner-item {
        display: flex;
        align-items: center;
        width: 6.9rem;
        padding: 0 0.3rem;
        height: 1.2rem;
        border-bottom: 1px solid rgba(218, 222, 228, 0.60);
        .manner-item-left {
          width: 0.5rem;
          margin-right: 0.22rem;
          display: flex;
          align-items: center;
          img {
            width: 0.5rem;
            height: 0.5rem;
          }
        }
        .manner-item-center {
          width: 5.7rem;
          .c-title {
            font-size: 0.3rem;
            line-height: 0.42rem;
            color: #4B4F63;
          }
          .c-descr {
            font-size: 0.24rem;
            line-height: 0.33rem;
            color: #B1B8C4;
          }
        }
        .manner-item-right {
          display: flex;
          flex: 1;
          span {
            display: inline-block;
            width: 0.46rem;
            height: 0.46rem;
            border: 1px solid #B1B8C4;
            border-radius: 50%;
          }
          .check {
            display: inline-block;
            width: 0.46rem;
            height: 0.46rem;
            background: url("/static/images/common/select.png") no-repeat center;
            background-size: 100% 100%;
            border: none;
          }
        }
      }
    }
  }
  .pay-btn {
    position: absolute;
    z-index: 2;
    bottom: 0;
    width: 7.5rem;
    height: 1rem;
    font-size: 0.32rem;
    line-height: 1rem;
    text-align: center;
    color: #fff;
    background: #4A90E2;
  }
</style>
