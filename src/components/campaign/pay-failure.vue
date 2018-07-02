<template>
  <div>
    <sy-loading :show="isLoading"></sy-loading>
    <transition name="fade">
      <div v-show="!isLoading" class="pay-failure">
        <!--<div v-title="'支付失败'"></div>-->
        <div class="failure-con">
          <div class="failure-img"><img :src="siteInfo.cdn_host +'/static/images/common/pay_failure.png'" alt=""></div>
          <h2 class="failure-title">支付异常</h2>
          <p class="failure-descr">收款会有延迟，若已支付，请等待5分钟后刷新“我的认养记录”，若尚未支付，请点击继续支付</p>
          <div class="pay-btn margin-t06" @click="agreeAndContinue()">继续支付</div>
          <div class="pay-btn margin-t03" @click="goRecords()">我已支付</div>
        </div>
      </div>
    </transition>
  </div>

</template>
<script>
  import ss from '@/modules/_ss/index'
  export default{
    data (){
      return {
        isLoading: true,
        order_sn:'',//订单号
        isOrderSn: false,
        is_share: false,
      }
    },
    created (){
      this.is_share = /is_share=yes/ig.test(window.location.href);
      this.isOrderSn = /orderSn=/ig.test(window.location.href);
      if(this.isOrderSn && this.$route.query.orderSn !=='undefined'){
        this.order_sn = this.$route.query.orderSn;
      }else{
        this.order_sn = ss.getSsItem('submitSuccessOrderSn');
        console.log(this.order_sn)
      }
      console.log(this.order_sn)
    },
    mounted (){
      this.$nextTick(()=>{
        this.isLoading = false;
        this.appjs.syJsbSetGoBackUrl('payFailureGoBack()');
        let that = this;
        window.payFailureGoBack = function() {
          let fUrl = "";
          if(that.is_share){
            fUrl = that.siteInfo.host + '/campaign?is_share=yes';
          }else{
            fUrl = that.siteInfo.host + '/campaign?';
          }
          that.appjs.syJsbLaunchWebview(fUrl);
        };
      });
    },
    methods:{
      jumpToRecords() {
        if (this.is_share) {
          this.$router.push({path: '/adoptionRecords', name: 'adoptionRecords', query: {is_share: 'yes'}})
        } else {
          this.$router.push('/adoptionRecords')
        }
      },
      goRecords() {
        let rUrl = "";
        if (this.is_share) {
          rUrl = this.siteInfo.host + '/adoptionRecords?is_share=yes'
        } else {
          rUrl = this.siteInfo.host + '/adoptionRecords'
        }
        this.appjs.syJsbLaunchWebview(rUrl);
      },
      agreeAndContinue(){
        if (this.is_share) {
          this.$router.push({path: '/appleTreePay', name: 'appleTreePay', query: {orderSn:this.order_sn, is_share: 'yes'}})
        } else {
          this.$router.push('/appleTreePay?orderSn='+this.order_sn);
        }
      },
    }
  }
</script>
<style lang="scss" scoped>
  $bg:#f7f9fa;
  $white-bg:#fff;
  .pay-failure{
    width: 100%;
    background:$white-bg;
  }
  .failure-con{
    width: 7.5rem;
    margin: 0 auto;
    .failure-img{
      margin: 0.86rem auto 0;
      width: 1.6rem;
      height: 1.6rem;
      img{width: 100%;height: 100%;}
    }
    .failure-title{
      margin-top: 0.3rem;
      font-size: 0.4rem;
      line-height: 0.56rem;
      color: #DF6553;
      text-align: center;
    }
    .failure-descr{
      width: 4.86rem;
      margin: 0.3rem auto;
      font-size: 0.26rem;
      line-height: 0.37rem;
      color: #666A7F;
      text-align: center;
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
