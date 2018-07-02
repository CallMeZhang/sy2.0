<template>
    <div id="download_app" v-if="isDownload">
      <div>
        <div class="fixed" style="z-index: 1999999;background: rgba(0,0,0,.7);width:100%;height:1.2rem;left:0;top:0">
          <ul class="clearfix" @click="linkToDownload">
            <li class="fl" @click.stop="isDownload = false">
              <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/CombinedShapeClose.png'" alt=""
                   style="width:.44rem;height:.44rem;vertical-align: middle;margin:0.38rem 0.12rem;">
            </li>
            <li class="fl">
              <img :src="siteInfo.cdn_host+'/bocm/platformjs/static/image/detail/Group2_2x.png'"
                   style="width:0.9rem;height:0.92rem;margin:0.14rem 0.12rem 0;">
            </li>
            <li class="fl">
              <p style="color:#fff;font-size:.28rem;line-height: 0.4rem;margin-top:0.21rem;">一起善源</p>
              <p style="color:#B7B7B7;font-size:.24rem;line-height:0.34rem;margin-top:0.03rem;">用爱连接故乡</p>
            </li>
            <li class="fr">
              <a :href="siteInfo.host+'/boc/index.php'"
                 style="display:inline-block;height:0.72rem;width:2.13rem;font-size:.32rem;line-height:0.72rem;text-align: center;color:#fff;background: #4A90E2;border-radius: 0.1rem;margin:0.24rem 0.4rem 0;">立即下载</a>
            </li>
          </ul>
        </div>
        <div style="height:1.2rem;background: #fff;" :style="{background:bgColor}"></div>
      </div>
    </div>
</template>

<script>
  export default {
    props:{
        bgColor:{
          type: String,
          default: '#fff'
        }
    },
    data(){
        return {
          isDownload:true,

        }
    },
    methods:{
      linkToDownload(){
        window.location.href= this.siteInfo.host+'/boc/index.php'
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
