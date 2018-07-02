<template>
  <div name="shared_img">
    <div class="mask" style="z-index: 999999999;background: rgba(0,0,0,0.5);">
      <img style="width:100%" src="/static/images/default/share_img.png" alt="share.png">
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {}
    },
    methods:{

    }
  }
</script>
<style scoped>
  .mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .4);
  }
</style>
