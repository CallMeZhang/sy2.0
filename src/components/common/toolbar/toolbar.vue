<template>
  <mt-tabbar v-model="selected" :fixed="fixed">
    <mt-tab-item id="1">
      <img slot="icon" src="./assets/images/index.png" @click="itemClick(1)">
      首页
    </mt-tab-item>
    <mt-tab-item id="2">
      <img slot="icon" src="./assets/images/syweal.png" @click="itemClick(2)">
      善源公益
    </mt-tab-item>
    <mt-tab-item id="3">
      <img slot="icon" src="./assets/images/syshop.png" @click="itemClick(3)">
      善源商场
    </mt-tab-item>
    <mt-tab-item id="4">
      <img slot="icon" src="./assets/images/cart.png" @click="itemClick(4)">
      心愿单
    </mt-tab-item>
    <mt-tab-item id="5">
      <img slot="icon" src="./assets/images/user.png" @click="itemClick(5)">
      我的
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
  export default {
    data () {
      return {
        index: './assets/images/index_red.png',
        syweal: './assets/images/syweal.png',
        syshop: './assets/images/syshop.png',
        cart: './assets/images/cart.png',
        user: './assets/images/user.png',
        selected: '1',
        fixed: true
      }
    },
    methods: {
      itemClick: function (id) {
        this.setGray();
        switch (id) {
          case 1:
            this.index = './assets/images/index_red.png';break;
          case 2:
            this.syweal = './assets/images/syweal_red.png';break;
          case 3:
            this.syshop = './assets/images/syshop_red.png';break;
          case 4:
            this.cart = './assets/images/cart_red.png';break;
          case 5:
            this.user = './assets/images/user_red.png';break;
          default:
            break;
        }
      },
      setGray: function () {
        this.index = './assets/images/index.png'
        this.syweal = './assets/images/syweal.png'
        this.syshop = './assets/images/syshop.png'
        this.cart = './assets/images/cart.png'
        this.user = './assets/images/user.png'
      }
    }
  }
</script>

<style scoped>
  .mint-tabbar > .mint-tab-item.is-selected {
    background-color: #FFFFFF;
    color: #000000;
  }
  .mint-tabbar {
    background-color: #FFFFFF;
  }
</style>
