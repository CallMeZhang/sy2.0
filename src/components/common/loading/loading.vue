<template>
  <div class="loading_container">
    <transition name="loading">
      <div class="box" v-if="show">
        <div class="wai">
        </div>
        <div class="nei">
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default{
    props: [
      'show'
    ],
      data(){
          return{

          }
      }
  }
</script>

<style scoped>

  .loading-enter-active, .loading-leave-active {
    transition: opacity 0.5s
  }
  .loading-enter, .loading-leave-to {
    opacity: 0
  }

  .loading_container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0.7rem;
    height: 0.7rem;
    z-index: 9999999999;
  }

  .box {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .wai {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    animation: rotate 2s linear infinite;
    transform-origin: center center;
    z-index: 12;
    background: url("/static/images/common/icon-xin2.png") no-repeat center;
    background-size: contain;
  }

  .nei {
    width: 30%;
    height: 30%;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    /*margin-top: -15%;
    margin-left: -15%;*/
    background: url("/static/images/common/‭icon-xin1.png") no-repeat center;
    z-index: 11;
    background-size: contain;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg)
    }
    100% {
      transform: rotate(360deg)
    }
  }
</style>
