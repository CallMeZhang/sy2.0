<template>
  <div class="adoption-proof">
    <sy-loading :show="isLoading"></sy-loading>
    <transition name="fade">
      <div class="proof-con">
        <div class="img-con" >
          <img :src="imgUrl" onerror="this.src='/static/images/campaign/proof2.jpg'" alt="img">
          <p class="img-txt">长按图片保存到手机</p>
        </div>
        <!--<div class="share-btn iphonex-margin-bottom" @click="shareFn()">分享</div>
        <share_img v-if="showMarkLayer" @click.native="showMarkLayer=false"></share_img>-->
      </div>
    </transition>
  </div>
</template>
<script>
  import * as extension from '@/packages/utils/extension'
  import {adoptionProofQuest} from '@/requests/campaign'
  import second_share from '@/modules/_share/share'
  import { Toast } from 'mint-ui';
  import share_img from '@/components/common/share/share_mask_layer.vue'
  export default{
    data (){
      return {
        isLoading: true,
        isShare: false,
        showMarkLayer: false, //显示分享遮罩
        myOrderId:Number,
        orderSn: '',
        defaultImgUrl:this.siteInfo.cdn_host + '/static/images/campaign/proof2.jpg',
        imgUrl: '',
      }
    },
    created (){
      this.$route.query.is_share == 'yes' ? this.isShare = true : this.isShare = false;
      this.orderSn = this.$route.query.orderSn;
      this.firstRequest();
      /*setTimeout(() =>{
        this.secondShareFn();
      },100);*/
    },
    mounted (){
      this.$nextTick(()=>{
        this.isLoading = false;
        this.appjs.syJsbClickImage("");
      })
    },
    methods: {
      firstRequest(){
        console.log(this.orderSn)
        adoptionProofQuest(this.orderSn).then((res) =>{
          console.log(res)
          if(res.data.code === 200){
            this.imgUrl = res.data.data.imageLink
            console.log(this.imgUrl)
          }else{
            console.log(res.data.message)
          }
        })
      },
      /*shareFn (){
        if(this.isShare){
          let weixin = extension.checkBrowser().isWx;
          let qq = extension.checkBrowser().isQQ;
          let qz = extension.checkBrowser().isQZ;
          let safari = extension.checkBrowser().isSafari;
          if(weixin || qq || qz){
            this.showMarkLayer= true;
          }else{
            Toast({
              message: '可以回到app或微信、qq中继续分享',
              position: 'center',
              duration: 2000
            })
          }
        }else{
          let shareUrl = this.siteInfo.host + '/adoption/proof?is_share=yes&orderSn='+this.orderSn;
          let shareText = '认养链接你我，攻克扶贫一战 苟富贵·互相旺';
          let shareTitle = '公益认领证书';
          let shareLogo = this.siteInfo.cdn_host + '/static/images/campaign/v2/shareLogo.jpg';
          let params = {text: shareText, url: shareUrl, title: shareTitle, logo: shareLogo}
          let jsonParam = JSON.stringify(params);
          this.appjs.syJsbShare(jsonParam, shareText, shareUrl);
        }
      },
      secondShareFn(){
        let shareUrl = this.siteInfo.host + '/appletreeDetail?is_share=yes&orderSn='+this.orderSn;
        let shareText = '认养链接你我，攻克扶贫一战 苟富贵·互相旺';
        let shareTitle = '公益认领证书';
        let shareLogo = this.siteInfo.cdn_host + '/static/images/campaign/v2/shareLogo.jpg';
        let params = {text: shareText, url: shareUrl, title: shareTitle, logo: shareLogo}
        second_share(params)
      },*/
      saveImg(img_url){
//        this.appjs.syJsbClickImage(img_url);
      },
    },
    components: {
      "share_img":share_img
    },
  }
</script>
<style lang="scss" scoped>
  $proof-bg:#f7f9fa;
  $btn-bg: #4A90E2;
  .adoption-proof{
    width: 100%;
    height: 100%;
    background: $proof-bg;
    /*display:flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;*/
  }
  .proof-con{
    width: 100%;
    padding-top: 0.2rem;
    box-sizing: border-box;
    margin: 0 auto;
  }
  .img-con{
    width: 6.9rem;
    margin: 0 auto;
    background:#fff;
    img{
      border: none;
      width: 100%;
      /*height: 9.97rem;*/
      display: block;
    }
    .img-txt{
      padding-left: 0.2rem;
      margin-bottom: 0.2rem;
      font-size: 0.24rem;
      line-height: 0.36rem;
      background: #fff;
    }
  }
  .share-btn{
   /* position: fixed;
    left: 50%;
    bottom: 0.44rem;
    transform: translateX(-50%);*/
    margin: 0 auto 0.44rem;
    width: 5.7rem;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.38rem;
    text-align: center;
    color: #fff;
    background: $btn-bg;
    border-radius: 0.08rem;
  }
</style>
