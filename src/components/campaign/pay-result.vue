<template>
  <div>
    <!--<div v-title="'支付结果'"></div>-->
    <sy-loading :show="isLoading"></sy-loading>
    <transition name="fade">
      <div v-show="!isLoading" class="pay-failure"></div>
    </transition>
  </div>
</template>
<script>
  import * as req from '@/requests/campaign'
  import ss from '@/modules/_ss/index'
  export default{
    data (){
      return {
        isLoading: true,
        order_sn:'',//订单号
        pay_Status: false,
        pay_Result_Url: '',
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
      this.applePayResultStatus(this.order_sn);//
    },
    mounted (){
      /*this.$nextTick(()=>{
        this.isLoading = false;
      })*/

    },
    methods:{
      applePayResultStatus(orderSn){
        console.log('applePayStatus methods')
        let _that = this;
        req.appleTreePayStatus(orderSn).then((res) =>{
          if(res.data.code !== 200){
            console.log('接口错误')
            return false;
          }
          this.isLoading = false;
          _that.pay_Status = res.data.data.state;
          window.location.replace(res.data.data.resultUrl);//重定向页面
          /*if(!_that.pay_Status){
            window.location.replace(res.data.data.resultUrl);
          }else{
            window.location.href =res.data.data.resultUrl;
          }*/
        })
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
