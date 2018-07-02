<template>
    <div class="wrapper">
      <sy-loading :show="isLoading"></sy-loading>
      <img src="../../../../static/images/logisticsInfo/lovepackge.png" alt="">
      <p class="text">您的爱心包裹由{{person}}送货上门，请您耐心等待！
      </p>
      <p class="footer">如有任何疑问可电话咨询：<a  @click="callPhone(phone)"><span>{{phone}}</span></a></p>
    </div>
</template>

<script>
  import * as type from '../../../requests/logistics'
	export default {
		data() {
			return {
        isLoading:true,
        person: '',
        phone: '',
      }
		},
		created() {
      this.orderNumber = this.$route.query.orderNumber
      this.orderId = this.$route.query.orderId
      this.logisticsInfo(this.orderId, this.orderNumber)
		},
    mounted: function () {

    },
		methods: {
		  callPhone(tel){
        this.appjs.syJsbCallPhone(tel)
      },
      logisticsInfo(orderId, shippingCode) {
        type.logisticsInfo(orderId, shippingCode).then((res) => {
          this.isLoading=false
          if (res.data.code === 200) {
            this.person = res.data.data.logisticsInfo.sellerName
            this.phone = res.data.data.logisticsInfo.sellerTel
          }
        })
      }
    },
		components: {
    }
	}
</script>

<style lang="scss" scoped>
  video{
    width: 100%;
    margin: 0 auto;
  }
.wrapper{
  overflow: hidden;
  height: 100%;
  width: 100%;
  position: relative;
  background: #fff;
  img{
    width: 4.74rem;
    margin: 1.4rem auto 1rem;
    display: block;
  }
  .text{
    width: 4.82rem;
    font-weight: 300;
    font-size: .32rem;
    color: #666A7F;
    margin: 0 auto;
    text-align: center;
  }
  .footer{
    position: absolute;
    bottom:0.83rem;
    font-size: .26rem;
    color: #818C9E;
    width: 100%;
    text-align: center;
    span{
      color: #4A90E2;
    }
  }
}
</style>
