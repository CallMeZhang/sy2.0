<template>
  <div class="register-content">
    <div class="register-success" v-if="rSucceed">
      <div class="r-img-s"><img :src="successInfo.imgSrc" alt="success"></div>
      <div class="r-title">{{successInfo.title}}</div>
      <div class="r-btn">返回</div>
    </div>
    <div class="register-defeated" v-if="rDefeated">
      <div class="r-img-d"><img :src="failureInfo.imgSrc" alt="failure"></div>
      <div class="r-title">{{failureInfo.title}}</div>
      <div class="r-descr">{{failureInfo.description}}</div>
      <div class="r-btn r-d-margin-top">重新报名</div>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'registration',
    data (){
      return {
        rSucceed: true,
        rDefeated: false,
        successInfo: {
          title: '报名成功',
          imgSrc: '/static/images/campaign/r_succeed2x.png',
          description: '信息异常，请重新报名',
        },
        failureInfo: {
          title: '报名失败',
          imgSrc: '/static/images/campaign/r_defeated2x.png',
          description: '信息异常，请重新报名',
        },
      }
    },
    created (){},
    mounted (){},
    methods:{
      jumpLink (touchurl){
        this.appjs.syJsbLaunchWebview(touchurl)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .register-content{
    width: 7.5rem;
    height: 100%;
    margin: 0 auto;
    background-image: url("/static/images/campaign/v2/bg00.jpg");
    background-size: 100% 100%;
    .r-img-s{
      width: 1.5rem;
      height: 1.2rem;
      margin: 0 auto;
      padding-top: 1rem;
      img{
        width:100%;
        height:100%;
      }
    }
    .r-img-d{
      width: 1.21rem;
      height: 1.2rem;
      margin: 0 auto;
      padding-top: 1rem;
      img{
        width:100%;
        height:100%;
      }
    }
    .r-title{
      margin-top: 0.38rem;
      width:7.5rem;
      padding:0 0.3rem;
      font-size: 0.4rem;
      line-height: 0.56rem;
      color: #9AAB0C;
      text-align:center;
      box-sizing:border-box;
    }
    .r-descr{
      margin-top: 0.03rem;
      width:7.5rem;
      line-height: 0.39rem;
      text-align: center;
      font-size: 0.28rem;
      color: #5F5F5F;
    }
    .r-btn{
      width: 5rem;
      height: 0.88rem;
      line-height: 0.88rem;
      margin:1.37rem auto 0;
      text-align: center;
      font-size: 0.32rem;
      color: #FFFFFF;
      background-image: linear-gradient(-90deg, #8D8D42 2%, #AEBB61 99%);
      border: 0.03rem solid #FFFFFF;
      border-radius: 1rem;
    }
    .r-d-margin-top{
      margin-top: 0.95rem;
    }
  }
</style>
