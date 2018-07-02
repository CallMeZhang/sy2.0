<template>
  <div>
    <sy-loading :show="isLoading"></sy-loading>
    <transition name="fade">
      <div v-show="!isLoading" class="pay-success">
        <!--<div v-title="'支付失败'"></div>-->
        <div class="success-con">
          <div class="success-img"><img :src="siteInfo.cdn_host + '/static/images/common/pay_success.png'" alt="success.png"></div>
          <h2 class="success-title">支付成功</h2>
          <div>
            <p class="success-descr"><span>恭喜您{{showData.orderType}}成功，您的苹果树</span><span class="trees-names-con">{{showData.treeName == 'null'? '':showData.treeName}}</span><span>在{{showData.areaName}}板块</span></p>
            <p class="success-descr">待苹果成熟，在“我的认养记录”填写地址领取苹果</p>
          </div>
          <div class="pay-btn margin-t06" @click="toRecords()">查看我的认养记录</div>
          <div class="pay-btn margin-t03" @click="jumpAdoptionProof()">查看认养证书</div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import ss from '@/modules/_ss/index'
  import * as req from '@/requests/campaign'
  export default{
    data (){
      return{
        isLoading: true,
        is_share: false,
        order_sn:'',
        pay_Status: false,
        isOrderSn: false,
        showData: {},
      }
    },
    created (){
      this.is_share = /is_share=yes/ig.test(window.location.href);
      this.isOrderSn = /orderSn=/ig.test(window.location.href);
      if(this.isOrderSn && this.$route.query.orderSn !=='undefined'){
        this.order_sn = this.$route.query.orderSn;
      }else{
        this.order_sn = ss.getSsItem('submitSuccessOrderSn');
      }
      console.log(this.order_sn);
//      this.appleTreePayStatus(this.order_sn);
      this.reqData(this.order_sn);
    },
    mounted (){
      this.$nextTick(()=>{
        let len = window.history.length;
        console.log('history.length: '+ len);
        this.isLoading = false;
        this.appjs.syJsbSetGoBackUrl('payAppleTreeGoBack()');
        let that = this;
        window.payAppleTreeGoBack = function() {
          let appleTreeUrl = "";
          if(that.is_share){
            appleTreeUrl = that.siteInfo.host + '/campaign?is_share=yes';
          }else{
            appleTreeUrl = that.siteInfo.host + '/campaign?';
          }
//          Window.history.go(-6);
          that.appjs.syJsbLaunchWebview(appleTreeUrl);
        }
      })
    },
    methods: {
      jumpRecords() {
        if (this.is_share) {
          this.$router.push({path: '/adoptionRecords', name: 'adoptionRecords', query: {is_share: 'yes'}})
        } else {
          this.$router.push('/adoptionRecords');
        }
      },
      jumpAdoptionProof(){
        /*if (this.is_share) {
          this.$router.push({path: '/adoption/proof', name: 'adoptionProof', query: {is_share: 'yes',orderSn:this.order_sn}})
        } else {
          this.$router.push('/adoption/proof?orderSn='+this.order_sn)
        }*/
        let pUrl = '';
        if (this.is_share) {
          pUrl = this.siteInfo.host + '/adoption/proof?orderSn='+this.order_sn+'&is_share=yes'
        } else {
          pUrl = this.siteInfo.host + '/adoption/proof?orderSn='+this.order_sn
        }
        this.appjs.syJsbLaunchWebview(pUrl);
      },
      reqData(orderSn){
        req.appleTreeWxPayResult(orderSn).then((res) =>{
          console.log(res)
          if(res.data.code !== 200){
            console.log(res.data.data.message);
            return false;
          }
          this.showData = res.data.data;
        })
      },
      toRecords() {
        let rUrl = "";
        if (this.is_share) {
          rUrl = this.siteInfo.host + '/adoptionRecords?is_share=yes'
        } else {
          rUrl = this.siteInfo.host + '/adoptionRecords'
        }
        this.appjs.syJsbLaunchWebview(rUrl);
      },
    }
  }
</script>
<style lang="scss" scoped>
  $bg:#f7f9fa;
  $white-bg:#fff;
  .pay-success{
    width: 100%;
    background:$white-bg;
  }
  .success-con{
    width: 7.5rem;
    margin: 0 auto;
    .success-img{
      margin: 0.86rem auto 0;
      width: 1.6rem;
      height: 1.6rem;
      img{width: 100%;height: 100%;}
    }
    .success-title{
      margin-top: 0.3rem;
      font-size: 0.4rem;
      line-height: 0.56rem;
      color: #4A90E2;
      text-align: center;
    }
    .success-descr{
      width: 4.86rem;
      margin: 0.12rem auto;
      font-size: 0.26rem;
      line-height: 0.37rem;
      height: 0.74rem;
      color: #666A7F;
      text-align: justify;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .pay-btn{
      margin: 0 auto;
      width: 6.9rem;
      height: 0.88rem;
      font-size: .32rem;
      line-height: 0.88rem;
      text-align: center;
      color: #fff;
      background: #4A90E2;
      border-radius: 0.08rem;
    }
    .margin-t06{
      margin-top: 0.6rem;
    }
    .margin-t03{
      margin-top: 0.31rem;
    }
  }
</style>
