<template>
  <div class="container">
    <sy-header titleText="善源甄选"></sy-header>
    <sy-loading :show="isLoading"></sy-loading>
    <transition name="fade">
      <div v-show="!isLoading">
        <div class="enter-wrapper">
          <img class="enter-left" :src="biz_recommend.bizBuyImgUrl" @click="$router.push('/bizbuy/category')"><img
          class="enter-right" :src="biz_recommend.couponImgUrl" @click="appjs.syJsbLaunchWebview(siteInfo.host_old + biz_recommend.couponTouchUrl)">
        </div>
        <!--推荐位-->
        <!--<div class="ad-wrapper">-->
        <!--<img class="ad-img" src="https://cdn.17shanyuan.com/goods/284566/284566_05573371898595045.jpg?x-oss-process=style/thumb_240">-->
        <!--</div>-->

        <!--个人选购-->
        <div class="new-goods-wrapper" v-if="xinpin.length > 0">
          <div class="line-2"></div>
          <div class="title-wrapper">
            <div class="b-title">
              个人选购
            </div>
            <div class="s-title">
              扶贫码可用
            </div>
          </div>
          <div style="position: relative" class="new-goods-item" v-for="(item, index) in xinpin" @click="appjs.syJsbLaunchWebview(siteInfo.host_old + item.touchUrl)">
            <img src="../../../../static/images/bizbuy/youp.png" style="width: 0.4rem;position: absolute;top: 0;left: 0.5rem" v-if="item.isQualityGoods==1" >
            <img class="new-goods-img" v-lazy="item.realImageurl">
            <div class="line-2" style="background-color: transparent;"></div>
          </div>
          <div class="gerenxuangou-wrapper" @click="$router.push('/bizbuy/category')">
            全部甄选 <b class="message-more"></b>
          </div>
        </div>
        <!--生鲜-->
        <div class="block-wrapper" v-if="shengxian.length > 0">
          <div class="line-2"></div>
          <div class="title-wrapper">
            <div class="b-title">
              生鲜
            </div>
            <div class="s-title">
              生鲜农产品&emsp;现采现发
            </div>
          </div>
          <div class="block-item-wrapper" v-for="(item, index) in shengxian" @click="appjs.syJsbLaunchWebview(siteInfo.host_old + item.touchUrl)">
            <img class="block-item-img" v-lazy="item.realImageurl"/>
            <span class="block-item-title text-more-line">
          {{item.goodsName}}
        </span>
            <div class="block-item-price sy-blue">
              ￥{{item.goodsPrice}}
            </div>
          </div>
          <div class="line-3" style="background-color: transparent;"></div>
        </div>
        <!--食品-->
        <div class="block-wrapper" v-if="shipin.length > 0">
          <div class="line-2"></div>
          <div class="title-wrapper">
            <div class="b-title">
              食品
            </div>
            <div class="s-title">
              办公零食&emsp;解忧小吃
            </div>
          </div>
          <div style="position: relative" class="block-item-wrapper" v-for="(item, index) in shipin" @click="appjs.syJsbLaunchWebview(siteInfo.host_old + item.touchUrl)">
            <img src="../../../../static/images/bizbuy/youp.png" style="width: 0.4rem;position: absolute;top: 0;left: 0.3rem" v-if="item.isQualityGoods==1" >
            <img class="block-item-img" v-lazy="item.realImageurl"/>
            <span class="block-item-title text-more-line">
          {{item.goodsName}}
        </span>
            <div class="block-item-price sy-blue">
              ￥{{item.goodsPrice}}
            </div>
          </div>
          <div class="line-3" style="background-color: transparent;"></div>
        </div>
        <!--工艺品-->
        <div class="block-wrapper" v-if="gongyipin.length > 0">
          <div class="line-2"></div>
          <div class="title-wrapper">
            <div class="b-title">
              工艺品
            </div>
            <div class="s-title">
              地方特产&emsp;礼品心意
            </div>
          </div>
          <div class="block-item-wrapper" v-for="(item, index) in shipin" @click="appjs.syJsbLaunchWebview(siteInfo.host_old + item.touchUrl)">
            <img class="block-item-img" v-lazy="item.realImageurl"/>
            <span class="block-item-title text-more-line">
          {{item.goodsName}}
        </span>
            <div class="block-item-price sy-blue">
              ￥{{item.goodsPrice}}
            </div>
          </div>
          <div class="line-3" style="background-color: transparent;"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {bizbuy_index} from '@/requests/bizbuy'
  export default {
    data () {
      return {
        isLoading: true,
        biz_recommend: {},
        xinpin: {},
        shengxian: {},
        shipin: {},
        gongyipin: {}
      }
    },
    created: function () {
      this.getData()
    },
    mounted: function () {

    },
    methods: {
      getData () {
        bizbuy_index().then((res) => {
          if(res.data.code === 200) {
            let content = res.data.data
            this.biz_recommend = content
            this.xinpin = content.bizBuyRecomGoods[0].recommendGoods
            this.shengxian = content.bizBuyRecomGoods[1].recommendGoods
            this.isLoading = false
            this.shipin = content.bizBuyRecomGoods[2].recommendGoods
            this.gongyipin = content.bizBuyRecomGoods[3].recommendGoods

          }
        })
      }
    }
  }
</script>

<style scoped>
  .enter-wrapper {
    padding: 0.44rem 0;
  }
  .enter-left {
    width: 3.38rem;
    height: 2.4rem;
    margin: 0 0.24rem;
  }
  .enter-right {
    width: 3.38rem;
    height: 2.4rem;
  }
  .ad-img {
    width: 100%;
    height: 3rem;
  }
  .title-wrapper {
    box-sizing: border-box;
    height: 1.4rem;
    width: 100%;
    padding: 0.36rem 0 0.15rem;
  }
  .b-title {
    text-align: center;
    font-size: 0.34rem;
    color: #4B4F63;
    line-height: 0.48rem;
  }
  .s-title {
    text-align: center;
    font-size: 0.28rem;
    color: #B1B8C4;
    line-height: 0.4rem;
  }
  .new-goods-item {
    text-align: center;
  }
  .new-goods-img {
    width: 7.02rem;
    height: 3.4rem;
    border-radius: 8px;
  }
  .go-more {
    border-top: 1px solid #DADEE4;
    height: 0.88rem;
    text-align: center;
    line-height: 0.88rem;
    font-size: 0.24rem;
    color: #B1B8C4;
  }
  .go-more-text {

  }
  .go-more-icon {
    display: inline-block;
    width: 0.09rem;
    height: 0.16rem;
    background: url("/static/images/order/arrow-more.png") no-repeat;
    background-size: 100% 100%;
    margin-left: 0.1rem;
  }
  .block-item-wrapper {
    width: 3.36rem;
    height: 4rem;
    margin-left: 0.24rem;
    margin-bottom: 0.26rem;
    display: inline-block;
    border-radius: 8px;
    border: 1px solid #DDDDDD;
    font-size: 0.28rem;
    overflow: hidden;
  }

  .block-item-img {
    width: 3.36rem;
    height: 2.36rem;
  }

  .block-item-title {
    height: 0.8rem;
    width: 3.02rem;
    margin: 0.13rem 0.16rem 0 0.2rem;
    color: #666A7F;
  }

  .block-item-price {
    margin-left: 0.2rem;
    margin-top: 0.04rem;
    line-height: 0.48rem;
  }

  .gerenxuangou-wrapper {
    height: 0.88rem;
    font-size: 0.24rem;
    color: #B1B8C4;
    line-height: 0.88rem;
    text-align: center;
    border-top: 1px solid #DADEE4;
  }

  .message-more {
    display: inline-block;
    height: 0.16rem;
    width: 0.09rem;
    background: url("/static/images/order/arrow-more.png") no-repeat;
    background-size: 100% 100%;
  }
</style>
