<template>
  <transition name="fade">
    <div class="sy-toast" v-if="visible" @touchmove.prevent>
      <div class="android is-placemiddle" v-if="platform==='android'">
        <p class="sy-toast-text" v-if="title">{{title}}</p>
        <div class="sy-toast-content" v-if="message">
          {{message}}
        </div>
        <div class="btns">
          <button @click="close('cancel')" class="close" v-if="layerType==='layer2'">
            取消
          </button>
          <button @click="close('confirm')">
            确定
          </button>
        </div>
      </div>
      <div class="ios is-placemiddle" v-if="platform==='ios'">
        <p class="sy-toast-text" v-if="title">{{title}}</p>
        <div class="sy-toast-content" v-if="message">
          {{message}}
        </div>
        <div class="btns">
          <button @click="close('cancel')" class="close" v-if="layerType==='layer2'">
            取消
          </button>
          <button @click="close('confirm')">
            确定
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="less" scoped>
  .android {
    background: #fff;
    overflow: hidden;
    position: absolute;
    text-align: left;
    padding: 0.46rem 0.48rem 0;
    width: 5.6rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .sy-toast-text {
      padding-bottom: 0.17rem;
      font-size: .36rem;
      color: #4B4F63;
    }
    .sy-toast-content {
      font-size: .32rem;
      color: #666A7F;
      line-height: .44rem;
      margin-bottom: 0.36rem;
    }
    .btns {
      display: flex;
      flex-direction: row;
      flex: 1;
      height: 1.04rem;
      position: relative;
      justify-content: flex-end;
      button {
        float: right;
        font-size: .28rem;
        color: #4A90E2;
        margin-right: 0.31rem;
        background: #fff;
      }
      button.close {
        margin-right: 1.08rem;
      }
    }
  }

  .ios {
    text-align: center;
    position: absolute;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: .12rem;
    width: 5.4rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .sy-toast-text {
      font-size: .34rem;
      color: #4B4F63;
      margin-bottom: 0.34rem;
      padding: 0.37rem 0.69rem 0;
    }
    .sy-toast-content {
      font-size: .26rem;
      color: #666A7F;
      padding: 0 0.3rem 0.34rem;
    }
    .btns {
      display: flex;
      flex-direction: row;
      flex: 1;
      height: 0.87rem;
      border-top: 1px solid #eee;
      button {
        font-size: .34rem;
        color: #4A90E2;
        background: #fff;
        height: 100%;
        flex: 1
      }
      button.close {
        border-right: 1px solid #eee;
      }
    }

  }

  .sy-toast {
    background: rgba(100, 100, 100, .4);
    position: fixed;
    z-index: 100000;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .is-placetop {
    top: 4%;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .is-placebottom {
    top: 46%;
    left: 50%;
    transform: translate(-50%, 100%);
  }

  .is-placemiddle {
    left: 50%;
    top: 50%;
    /* transform: translate(-50%, -50%); */
    margin-left:-2.7rem;
    margin-top:-1.4rem;

  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

<script type="text/babel">
  import * as type from '../../../../../packages/utils/extension'

  export default {
    name: 'toast',
    props: {
      message: String,
      title: String,
      className: String
    },

    data() {
      return {
        visible: false,
        platform: 'android',
        callback: null
      };
    },
    created() {
      this.platform = type['checkPlatform']().android ? 'android' : 'ios'
    },
    computed: {
      layerType: function () {
        var className = 'layer1'
        switch (this.className) {
          case "layer1":
            className = "layer1";
            break;
          case "layer2":
            className = "layer2";
            break;
          case "layer3":
            className = "layer3";
            break;
        }
        return className
      }
    },
    methods: {
      close(action) {
        this.visible = false;
        this.closed = true;
        var callback = this.callback;
        callback(action);
      },
//      confirm(action) {
//        this.visible = false
//        var callback = this.callback;
//        callback(action);
//      }
    }
  };
</script>
