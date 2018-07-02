<template>
  <div class="wrapper">
    <sy-loading :show="isLoading"></sy-loading>
    <!--<sy-video></sy-video>-->
    <p>{{title}}</p>
    <div class="list" v-for="item in dataInfo" @click="goUrl(item.packageNo,item.expressCode,item)">
      <p>{{item.expressName}}：{{item.shippingCode}}</p>
      <div class="info" >
        <div class="img">
          <img v-lazy='item.goodsImage' alt="" @click="">
          <span v-if="item.goodsNum>1">共{{item.goodsNum}}种</span>
        </div>
        <ul>
          <li class="li-one">{{item.goodsName}}</li>
          <li class="li-two">{{item.packageState}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import * as type from '../../../requests/logistics'
//  import syVideo from '../videoPlay/indexVideo.vue'
  export default {
    data() {
      return {
        isLoading:true,
        orderId:'',
        dataInfo:'',
        title:""
      }
    },
    created() {
      this.orderId= this.$route.query.orderId
      this.logisticsInfo(this.orderId,'')
    },
    mounted: function () {
    },
    methods: {
      logisticsInfo(orderId,shippingCode){
        type.logisticsInfo(orderId,shippingCode).then((res) => {
          this.isLoading=false
          if (res.data.code === 200) {
            if(res.data.data.singlePackage){
              this.dataInfo=res.data.data.logisticsInfo
            }else{
              this.dataInfo=res.data.data.packages
              this.title=res.data.data.title
            }
          }
        })
      },
      goUrl(shippingCode,homeDelivery,code){
        if(homeDelivery!='benxian'){
          if(code.expressCode==='jd'){
            this.$router.push({ name: 'logisticsInfo', query: {orderId:this.orderId, orderNumber: shippingCode }})
          }else if(code.expressCode==='tiantian'){
            this.appjs.syJsbLaunchWebview(this.siteInfo.host_old+'/bocm/index.php?act=home&op=search_express&postid='+code.shippingCode)
          }else{
            this.$router.push({ name: 'logisticsInfo', query: {orderId:this.orderId, orderNumber: shippingCode }})
          }
        }else{
          this.$router.push({ name: 'sendGoodes', query: {orderId:this.orderId, orderNumber: shippingCode }})
        }
      }
    },
    components: {
//      syVideo
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    overflow: hidden;
    width: 100%;
    position: relative;
    background: #F7F9FA;
    font-size: .24rem;
    font-weight: 300;
    color: #4B4F63;
    > p {
      height: 0.64rem;
      line-height: 0.64rem;
      background: #F7F9FA;
      padding: 0 0.3rem;
    }
    div.list {
      background: #fff;
      padding: 0 0.3rem;
      > p {
        padding: 0.3rem 0 0.2rem 0;
      }
      .info {
        font-weight: 300;
        color: #000029;
        line-height: 0.4rem;
        background: #fff;
        margin-bottom: 0.2rem;
        height: 1.56rem;
        box-sizing: border-box;
        .img, ul {
          float: left;
        }
        .img {
          position: relative;
          width: 1.8rem;
          height: 1.26rem;
          border-radius: 0.08rem;
          margin: 0rem 0.2rem 0 0rem;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
          span {
            background: rgba(0, 0, 0, 0.40);
            height: 0.36rem;
            display: inline-block;
            position: absolute;
            bottom: 0;
            width: 100%;
            color: #FFFFFF;
            line-height: 0.36rem;
            text-align: center;
            font-size: 0.2rem;
          }
        }
        ul {
          clear: right;
          li {
            margin-bottom: 0.07rem;
          }
          .li-one {
            width: 4.9rem;
            font-size: 0.28rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .li-two {
            color: #4A90E2;
            margin-top: 0.5rem;
          }
        }
      }
    }
  }
</style>
