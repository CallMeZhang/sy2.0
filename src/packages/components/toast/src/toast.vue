<template>
  <transition name="sy-toast-pop">
    <div class="sy-toast" v-show="visible" :class="customClass"
         :style="{ 'padding': iconClass === '' ? '0.27rem 0.6rem' : '20px' }">
      <i class="sy-toast-icon" :class="iconClass" v-if="iconClass !== ''"></i>
      <span class="sy-toast-text" :style="{ 'padding-top': iconClass === '' ? '0' : '10px' }">{{ message }}</span>
    </div>
  </transition>
</template>

<style lang="less" scoped>
  .sy-toast {
    position: fixed;
    max-width: 80%;
    border-radius: .08rem;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    box-sizing: border-box;
    text-align: center;
    z-index: 1000;
    transition: opacity .3s linear;
    .sy-toast-icon {
      display: block;
      text-align: center;
      font-size: .56rem;
    }
    .sy-toast-text {
      font-size: 0.36rem;
      display: block;
      text-align: center;
      color: #FFFFFF;
    }
    .sy-toast-pop-enter, .sy-toast-pop-leave-active {
      opacity: 0;
    }
  }
  .is-placetop {
    top: 50px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .is-placebottom {
    top: 50px;
    left: 50%;
    transform: translate(-50%, 100%);
  }
  .is-placemiddle {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>

<script type="text/babel">
  export default {
    name:'toast',
    props: {
      message: String,
      className: {
        type: String,
        default: ''
      },
      position: {
        type: String,
        default: 'middle'
      },
      iconClass: {
        type: String,
        default: ''
      }
    },

    data() {
      return {
        visible: false
      };
    },

    computed: {
      customClass() {
        var classes = [];
        switch (this.position) {
          case 'top':
            classes.push('is-placetop');
            break;
          case 'bottom':
            classes.push('is-placebottom');
            break;
          default:
            classes.push('is-placemiddle');
        }
        classes.push(this.className);

        return classes.join(' ');
      }
    }
  };
</script>
