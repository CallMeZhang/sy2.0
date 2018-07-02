<template>
  <div class="top-address">
    <div v-title="'管理地址'"></div>
    <sy-loading :show="isLoading"></sy-loading>
    <transition name="fade">
      <div v-show="!isLoading">
        <ul v-if='dataList.length!=0' class="ul-wraper">
          <li v-for="item in dataList" class="li-wrapper" @click="chooseAddresss(item)">
            <div class="div-wrepper-first">
              <span class="name">{{item.trueName}}</span>
              <span class="phone">{{item.mobPhone}}</span>
              <img :src="siteInfo.cdn_host + '/static/images/order/edit.png'" alt="" class="edit"
                   @click.stop="goEdit(item.addressId)">
            </div>
            <div class="address">
              <span class="is-default"
                    :class="item.isDefault==1||'un-default'">{{item.isDefault == 1 ? '默认' : ''}}</span>
              <span class="address-txt">{{item.areaInfo + item.address}}</span>
            </div>
          </li>
          <li class="blank iphonex-bottom-blank"></li>
        </ul>
        <div v-if='dataList.length==0' class="no-address">
          <img src="../../../../static/images/common/noaddress.png" alt="">
          <p>暂无地址</p>
        </div>
        <div class="address-footer iphonex-bottom-after">
          <div class="address-btn" @click="newAddress">新增地址</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import * as type from '../../../requests/address'

  export default {
    data() {
      return {
        isLoading:true,
        dataList: [],
        curpage: 1,
        storage: null,
        callback:""
      }
    },
    created() {
      window.goBack=function () {
        window.history.go(-1)
      }
      if(!!this.$route.query.callback){
        this.callback=decodeURIComponent(this.$route.query.callback)
        window.localStorage.setItem('callback', this.callback)
      }
      this.getData()
    },
    mounted() {
      let addressGoUrl = window.localStorage.getItem('address_go_url')
      if (addressGoUrl) {
        for (var i = 0; i < document.getElementsByTagName('iframe').length; i++) {
          if (document.getElementsByTagName('iframe')[i].getAttribute('storage') === 'storage') {
            var el = document.getElementsByTagName('iframe')[i];
            el.parentNode.removeChild(el);
          }
        }
        this.storage = document.createElement('iframe');
        this.storage.setAttribute('storage', 'storage')
        this.storage.style.display = 'none';
        this.storage.src = addressGoUrl
        document.body.appendChild(this.storage);
      }

      function receiveMessage(event) {
        var message = JSON.parse(event.data);
        if (message.type === 'setGoUrl') {
          window.localStorage.setItem('address_go_url', message.address_go_url)
          var message = JSON.stringify({type: 'setGoUrl'})
          event.source.postMessage(message, event.origin);
          //console.log('setGoUrl is ok')
        } else if (message.type === 'setAddress') {
          //console.log('setAddress is ok')
          window.localStorage.setItem('address_go_url', '')
          window.location.href = addressGoUrl + "&address_store_id=" + message.address_store_id;
        }
      }

      window.addEventListener("message", receiveMessage, false);
//      var that = this
//      setTimeout(function () {
//        var message = JSON.stringify({address_store: 123, 'address_store_id': 456,type:'setAddress'})
//        that.storage.contentWindow.postMessage(message, addressGoUrl);
//      }, 5000)
    },
    methods: {
      goEdit(id) {
        this.$router.replace({path: '/address/editAddress', query: {address_id: id}});
      },
      newAddress() {
        this.$router.replace({path: '/address/editAddress'});
      },
      getData() {
        type.getAddressList().then((res) => {
          this.isLoading=false
          if (res.data.code === 200) {
            this.dataList = res.data.data.addressList
          }
        })
      },
      chooseAddresss(address) {
        if(!this.callback){
          this.callback = window.localStorage.getItem('callback')
          if(!this.callback){
            this.$toast('路径有误!')
            return;
          }
          window.localStorage.setItem('callback', '')
        }
        window.location.href = this.callback+"&addressId="+address.addressId
        return;
        let addressGoUrl = window.localStorage.getItem('address_go_url')
        window.localStorage.setItem('address_store', JSON.stringify(address))
        window.localStorage.setItem('address_store_id', address.addressId)
        var message = JSON.stringify({
          address_store: JSON.stringify(address),
          'address_store_id': address.addressId,
          type: 'setAddress'
        })
        this.storage.contentWindow.postMessage(message, addressGoUrl);
        if (addressGoUrl) {
        } else {
          this.$toast('方法路径有误')
        }
      }
    }
    ,
    components: {}
  }
</script>

<style lang="scss" scoped>
  .blank {
    height: 1rem;
  }

  .top-address {
    height: 100%;
    background: #f4f5f6;
    .ul-wraper {
      width: 100%;
      overflow: hidden;
      background: #f4f5f6;
      .li-wrapper {
        overflow: hidden;
        text-align: left;
        padding-left: 0.5rem;
        background: #fff;
        margin-top: 0.2rem;
        padding-bottom: 0.22rem;
        .div-wrepper-first {
          padding: 0.24rem 0 0.1rem 0;
          overflow: hidden;
        }
        .edit {
          width: 0.28rem;
          height: 0.27rem;
          float: right;
          margin-right: 0.3rem;
        }
        .name, .phone {
          font-size: .30rem;
          float: left;
          color: #4B4F63;
        }
        .name {
          margin-right: 0.3rem;
          width: 1.1rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .address {
          .is-default, .address-txt {
            float: left;
          }
          .is-default {
            width: 0.66rem;
            height: 0.34rem;
            text-align: center;
            line-height: 0.34rem;
            display: inline-block;
            box-sizing: border-box;
            font-weight: 300;
            font-size: .24rem;
            color: #4A90E2;
            border: 1px solid #4A90E2;
            border-radius: 0.08rem;
          }
          .un-default {
            border: 0;
            width: 0.66rem;
          }
          .address-txt {
            font-size: .26rem;
            color: #4B4F63;
            line-height: .40rem;
            width: 4.6rem;
            display: inline-block;
            margin-left: 0.74rem;
            font-weight: 300;
          }
        }
      }
    }

    .li-wrapper:nth-last-child(2) {
      margin-bottom: 0;
    }
    .no-address {
      width: 100%;
      overflow: hidden;
      img {
        width: 2.12rem;
        height: 2.23rem;
        display: block;
        margin: 0 auto;
        margin-top: 3.81rem;
      }
      p {
        padding-top: 0.65rem;
        text-align: center;
        font-size: .32rem;
        color: #DADEE4;
      }
    }

    .address-footer {
      position: fixed;
      bottom: 0rem;
      width: 100%;
      background: #f4f6f5;
      .address-btn {
        text-align: center;
        height: 1rem;
        width: 100%;
        left: 0.3rem;
        line-height: 1rem;
        font-size: .32rem;
        color: #FFFFFF;
        background: #4A90E2;
      }
    }

  }
</style>
