<template>
  <div>
    <transition :name="currentTransition">
      <div v-show="currentValue" class="sy-popup" @click="close()">
        <div :class="[position ? 'sy-popup-' + position : '']">
          <slot></slot>
        </div>
      </div>
    </transition>
    <transition name="popup-fade">
      <div v-show="currentValue" class="bg-modal"></div>
    </transition>
  </div>

</template>

<style lang="scss">
  .bg-modal{
    position: absolute;
    background: rgba(0,0,0,0.3);
    top:0;
    bottom:0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transition: .2s ease-out;
    z-index: 998;
  }
  .sy-popup {
    z-index: 999;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    backface-visibility: hidden;
    transition: .2s ease-out;
    width: 100%;
    height: 100%;
    .sy-popup-top {
      width: 100%;
      position: fixed;
      top: 0;
      right: auto;
      bottom: auto;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
    }
    .sy-popup-bottom {
      width: 100%;
      position: fixed;
      top: auto;
      right: auto;
      bottom: 0;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
    }
  }
  .popup-slide-top-enter,
  .popup-slide-top-leave-active {
    transform: translate3d(-50%, -100%, 0);
  }
  .popup-slide-right-enter,
  .popup-slide-right-leave-active {
    transform: translate3d(100%, -50%, 0);
  }
  .popup-slide-bottom-enter,
  .popup-slide-bottom-leave-active {
    transform: translate3d(-50%, 100%, 0);
  }
  .popup-slide-left-enter,
  .popup-slide-left-leave-active {
    transform: translate3d(-100%, -50%, 0);
  }
  .popup-fade-enter,
  .popup-fade-leave-active {
    opacity: 0;
  }
</style>

<script type="text/babel">

  export default {
    name: 'sy-popup',

    props: {
      modal: {
        default: true
      },
      modalFade: {
        default: false
      },

      lockScroll: {
        default: false
      },

      closeOnClickModal: {
        default: true
      },

      popupTransition: {
        type: String,
        default: 'popup-slide'
      },

      position: {
        type: String,
        default: ''
      }
    },

    data() {
      return {
        currentValue: false,
        currentTransition: this.popupTransition
      };
    },

    watch: {
      currentValue(val) {
        this.$emit('input', val);
      },

      value(val) {
        this.currentValue = val;
      }
    },

    beforeMount() {
      if (this.popupTransition !== 'popup-fade') {
        this.currentTransition = `popup-slide-${ this.position }`;
      }
    },

    mounted() {
      if (this.value) {
        this.rendered = true;
        this.currentValue = true;
        this.open();
      }
    },
    methods:{
      open(){
        this.currentValue = true;
      },
      close(){
        this.currentValue = false;
      }
    }
  };
</script>
