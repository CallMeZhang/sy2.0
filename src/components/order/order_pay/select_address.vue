<template>
  <div class="container">
    <sy-header titleText="选择收货地址"></sy-header>
    <sy-loading :show="isLoading"></sy-loading>
    <transition name="fade">
      <div v-show="!isLoading">
        <div class="address-wrapper" v-for="(item, index) in addressList" @click="selectIt(index)">
          <div class="line-2"></div>
          <div class="address-info-wrapper">
            <div class="name-phone-wrapper">
              <span class="name text-more">{{item.trueName}}</span><span class="phone text-more">{{item.telPhone || item.mobPhone}}</span><b class="edit" @click.stop="$router.replace('/order/edit_address/'+item.addressId)"></b>
            </div>
            <div class="address-text-wrapper">
              <span class="is-default sy-blue-border sy-blue" v-if="item.isDefault === '1'">默认</span><span class="area">{{item.areaInfo + item.address}}</span>
            </div>
          </div>
        </div>
        <div class="bottom-line iphonex-bottom-line"></div>
        <div class="bottom-wrapper iphonex-margin-bottom sy-blue-bg" @click="$router.replace('/order/add_address')">
          新增地址
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import ss from '@/modules/_ss/index'
  import {get_address_list} from '@/requests/order'
  export default {
    data () {
      return {
        isLoading: true,
        addressList: []
      }
    },

    created () {
      this.getData()
    },

    mounted () {
      this.appjs.syJsbSetGoBackUrl('orderGoBack()')
    },

    methods: {
      getData() {
        get_address_list().then((res) => {
          if(res.data.code === 200) {
            let content = res.data.data
            this.addressList = content.addressList
            if(this.addressList.length === 0) {
              this.$router.replace('/order/add_address')
            }
            this.isLoading = false
          }
        })
      },
      selectIt(address_id) {
        let address_info = this.addressList[address_id]
        ss.setSsItem('order_address', address_info)
        let order_confirm = ss.getSsItem('order_confirm')
        this.$router.replace(order_confirm)
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 100%;
    height: 100%;
    background-color: #F7F9FA;
  }

  .address-wrapper {
    background: #ffffff;
    position: relative;
  }

  .address-info-wrapper {
    position: relative;
  }

  .name-phone-wrapper {
    position: relative;
    top: 0.23rem;
    font-size: 0.3rem;
  }

  .name {
    position: absolute;
    left: 0.3rem;
    width: 3.5em;
    line-height: 0.42rem;
    height: 0.42rem;
    font-size: 0.3rem;
  }

  .phone {
    position: absolute;
    left: 1.5rem;
    width: 3rem;
    line-height: 0.42rem;
    height: 0.42rem;
  }

  .edit {
    position: absolute;
    right: 0.3rem;
    top: 0.08rem;
    width: 0.28rem;
    height: 0.27rem;
    background: url("/static/images/order/edit.png") no-repeat;
    background-size: 100% 100%;
  }

  .is-default {
    display: inline-block;
    width: 0.66rem;
    border-radius: 8px;
    position: absolute;
    top: 0.78rem;
    left: 0.3rem;
    text-align: center;
    padding: 0.02rem;
    font-size: 0.24rem;
  }

  .area {
    display: inline-block;
    width: 4.6rem;
    margin: 0.7rem 1.4rem 0.21rem 1.5rem;
    color: #4B4F63;
    font-size: 0.26rem;
    font-weight: 300;
  }

  .bottom-line {
    height: 1.2rem;
    width: 100%;
    background: #F7F9FA;
  }

  .bottom-wrapper {
    position: fixed;
    width: 100%;
    height: 1rem;
    line-height: 0.89rem;
    font-size: 0.32rem;
    text-align: center;
    color: #ffffff;
    bottom: 0;
    left: 0;
  }
</style>
