<template>
  <div class="container">
    <sy-header titleText="添加收货地址"></sy-header>
    <sy-loading :show="isLoading"></sy-loading>
    <transition name="fade">
      <div v-show="!isLoading">
        <div class="line-2"></div>
        <div class="item-wrapper">
          <span class="item-label">收货人</span>
          <input class="item-text" type="text" maxlength="10" name="name" placeholder="请输入收货人姓名" v-model="trueName"/>
        </div>
        <div class="item-wrapper">
          <span class="item-label">手机号</span>
          <input class="item-text" type="tel" maxlength="11" name="phone" placeholder="请输入收货人手机号" v-model="telPhone"/>
        </div>
        <div class="item-wrapper" @click="showPicker(true)">
          <span class="item-label">省市区</span>
          <span class="item-text text-more">{{area_info}}</span>
          <b class="message-more"></b>
        </div>
        <textarea class="item-textarea" v-model="address" placeholder="请填写详细地址，不少于5个字">

    </textarea>

        <div class="is-default-wrapper">
          <div  @click="setDefault()">
            <b :class="'is-default ' + (isSelect ? 'select' : 'unselect')"></b><span>设为默认地址</span>
          </div>
        </div>

        <div class="btn-bottom sy-blue-bg" @click="useIt()">
          保存并使用
        </div>

        <div class="line-9"></div>
        <transition name="popup">
          <div class="pppop" v-show="pickerIsShow" @touchmove.prevent>
            <div class="popup-confirm">
        <span class="popup-confirm-text sy-blue"  @click="showPicker(false)">
          确定
        </span>
            </div>
            <mt-picker :slots="slots" @change="onValuesChange" valueKey="areaName" :itemHeight="picker_height"></mt-picker>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
  import {edit_or_add_address, getChildrenAddressById, get_address_list} from '@/requests/order'
  import ss from '@/modules/_ss/index'
  export  default  {
    data () {
      return {
        isLoading: true,
        trueName: '',
        telPhone: '',
        areaInfo: '',
        address: '',
        isSelect: false,
        pickerIsShow: false,
        area_info:'',
        city_id: 0,
        area_id: 0,
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            defaultIndex: 0,
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            defaultIndex: 0,
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot4'
          }, {
            flex: 1,
            values: [],
            className: 'slot5',
            defaultIndex: 0,
            textAlign: 'center'
          }
        ],
        picker_height: 42
      }
    },

    created () {
      this.getData()
    },

    mounted () {
      this.appjs.syJsbSetGoBackUrl('addressGoBack()')
      let that = this
      window.addressGoBack = function() {
        get_address_list().then((res) => {
          if(res.data.code === 200) {
            let content = res.data.data
            if(content.addressList.length === 0) {
              that.appjs.syJsbGetCurrentPage(function (currentPage){
                let route_name = that.$route.name
                if(currentPage != 'main' && currentPage != 'nonsupport' && route_name === 'add_address'){
                  that.appjs.syJsbCloseAppPage()
                } else {
                  window.history.go(-2)
                }
              });
            } else {
              that.$router.replace('/order/select_address')
            }
          }
        })
      }
    },

    methods : {
      async getData () {
        let province = await getChildrenAddressById(0)
        this.slots[0].values = province
        let city = await getChildrenAddressById(province[0]['areaId'])
        this.slots[2].values = city
        let area = await getChildrenAddressById(city[0]['areaId'])
        this.slots[4].values = area
        this.isLoading = false
      },
      useIt() {
        if(this.trueName.length === 0) {
          this.appjs.syJsbAlert('请输入收货人姓名')
          return
        }
        if(!/^1[0-9]\d{9}$/.test(this.telPhone)) {
          this.appjs.syJsbAlert('手机号格式不正确')
          return
        }
        if(this.address.length < 5) {
          this.appjs.syJsbAlert('收货地址最少5个字哦~')
          return
        }
        let data = {
          'areaId': this.area_id,
          'trueName': this.trueName,
          'telPhone': this.telPhone,
          'address': this.address,
          'isDefault': this.isSelect ? 1 : 0,
          'type': 'add'
        }
        edit_or_add_address(data).then((res) => {
          if(res.data.code === 200) {
            let address_info = res.data.data.addressInfo
            ss.setSsItem('order_address', address_info)
            let order_confirm = ss.getSsItem('order_confirm')
            this.$router.replace(order_confirm)
          } else{
            this.appjs.syJsbAlert(res.data.message)
          }
        })
      },
      setDefault() {
        this.isSelect = !this.isSelect
      },

      async onValuesChange(picker, values) {
        if (typeof(values[0]) === 'undefined') {
          return;
        }
        if (typeof(values[1]) === 'undefined') {
          return;
        }
        if (typeof(values[2]) === 'undefined') {
          return;
        }
        // console.log(picker.getSlotValues(0))
        // console.log(values)
        if(values[1]['areaParentId'] !== values[0]['areaId']) {
          let city = await getChildrenAddressById(values[0]['areaId'])
          // console.log(city)
          // this.slots[2].values = city

          picker.setSlotValues(1,city)
          // console.log(city)
        }
        if(values[2]['areaParentId'] !== values[1]['areaId']) {
          let area = await getChildrenAddressById(values[1]['areaId'])
          // this.slots[4].values = area
          picker.setSlotValues(2,area)
          // console.log(area)
        }
        this.area_info = values[0]['areaName'] + ' ' + values[1]['areaName'] + ' ' + values[2]['areaName']
        // console.log(this.area_info)
        this.city_id = values[1]['areaId']
        this.area_id = values[2]['areaId']
      },

      showPicker(bool) {
        this.pickerIsShow = bool
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 100%;
    height: 100%;
    background-color: #F7F9FA;
    font-size: 0.28rem;
  }

  .item-wrapper {
    height: 0.88rem;
    width: 100%;
    background: #ffffff;
    border-bottom: 1px solid rgba(218,222,228,0.60);;
    position: relative;
  }

  .item-label {
    position: absolute;
    top: 0.23rem;
    left: 0.3rem;
    line-height: 0.4rem;
  }

  .item-text {
    position: absolute;
    top: 0.23rem;
    left: 2.24rem;
    height: 0.4rem;
    width: 3.5rem;
  }

  .message-more {
    display: inline-block;
    height: 0.25rem;
    width: 0.14rem;
    background: url("/static/images/order/arrow-more.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 0.32rem;
    right: 0.3rem;
  }

  .item-textarea {
    min-width: 6.9rem;
    max-width: 6.9rem;
    height: 1.75rem;
    padding: 0.2rem 0.3rem;
  }
  .is-default-wrapper span {
    vertical-align: middle;
  }
  .btn-bottom {
    height: 0.88rem;
    width: 6.9rem;
    color: #ffffff;
    text-align: center;
    line-height: 0.88rem;
    border-radius: 8px;
    margin: auto;
    margin-top: 4rem;
  }

  .is-default-wrapper {
    height: 0.4rem;
    width: 100%;
    margin-top: 0.5rem;
    color: #666A7F;
    text-align: center;
    line-height: 0.4rem;
    font-size: 0.24rem;
  }

  .is-default {
    display: inline-block;
    width: 0.32rem;
    height: 0.32rem;
    vertical-align: middle;
    margin-right: 0.17rem;
  }

  .select {
    background: url("/static/images/common/select.png");
    background-size: 100% 100%;
  }

  .unselect {
    background: url("/static/images/common/unselected_2x.png");
    background-size: 100% 100%;
  }

  .pppop {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    background: #fff;
    z-index: 999;
  }

  .popup-confirm {
    width: 100%;
    height: 1rem;
    position: relative;
    border-bottom: 1px solid #DADEE4;
  }

  .popup-confirm-text {
    position: absolute;
    right: 0.5rem;
    top: 0.31rem;
    font-size: 0.3rem;
    line-height: 0.42rem;
  }
</style>
