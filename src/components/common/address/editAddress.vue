<template>
  <div class="top-wrapper">
    <sy-loading :show="isLoading"></sy-loading>
    <transition name="fade">
      <div v-show="!isLoading">
        <div style="height: 0.2rem;background: #f4f6f5;"></div>
        <div class="normal">
          <label for="name">
            <span>收货人</span>
            <input class="info-txt" type="text" v-model="userAddress.trueName" id="name" placeholder="请输入收货人姓名">
          </label>
        </div>
        <div class="normal">
          <label for="phone">
            <span>手机号</span>
            <input class="info-txt" type="tel" v-model="userAddress.telPhone" id="phone" placeholder="请输入收货人手机号"
                   oninput="if(value.length>11)value=value.slice(0,11)">
          </label>
        </div>
        <div class="normal" @click="setProvince('picker1')">
          <span>省市区</span>
          <span class="info-txt unmargin" v-if="addressData">{{''}}&nbsp;{{''}}&nbsp;{{''}}</span>
          <span class="info-txt unmargin"
                v-if="!addressData">{{provinceName || '省'}}&nbsp;{{cityName || '市'}}&nbsp;{{countyName || '区'}}</span>
          <img :src="siteInfo.cdn_host + '/static/images/common/ap41.png'" alt="" class="address-arrow">
        </div>
        <div class="normal big">
          <textarea v-model="userAddress.address" placeholder="请填写详细地址，不少于5个字"></textarea>
        </div>
        <div class="set-address"
             @click="userAddress.isDefault=='0'?userAddress.isDefault='1':userAddress.isDefault='0'">
          <span class="cr" :class="userAddress.isDefault=='0'||'activity'"></span>
          <span class="default_text">设为默认地址</span>
        </div>
        <div class="footer-btns">
          <button class="save-msg" @click="saveMsg">保存</button>
          <button class="del-msg" @click="delMsg" v-if="delIsShow">删除</button>
        </div>
        <sy-popup ref='picker1' position="bottom">
          <div class="pop-wrapper iphonex-padding-bottom" @click.stop>
            <div class="header-top">
              <div :class="isActivity=='province'||'is-activity'" @click="isActivity='province'" id="pr">
                {{provinceName || '省'}}
              </div>
              <div :class="isActivity=='city'||'is-activity'" v-if='cityFlag' @click="isActivity='city'" id="ci">
                {{cityName || '市'}}
              </div>
              <div :class="isActivity=='county'||'is-activity'" v-if='countyFlag' @click="isActivity='county'" id="co">
                {{countyName || '区'}}
              </div>
              <div class="confirm" :class="!isOk||'isDone'" @click="isDone">确定</div>
            </div>
            <div class="content-address">
              <sy-tab-container v-model="isActivity" swipeable>
                <sy-tab-container-item id="province">
                  <div class="content-province">
                    <div v-for="item in provinceData" @click="provinceFn(item,$event)">{{item.areaName}}</div>
                  </div>
                </sy-tab-container-item>
                <sy-tab-container-item id="city" v-if='cityFlag'>
                  <div class="content-province">
                    <div v-for="item in cityData" @click="cityFn(item,$event)">{{item.areaName}}</div>
                  </div>
                </sy-tab-container-item>
                <sy-tab-container-item id="county" v-if='countyFlag'>
                  <div class="content-province">
                    <div v-for="item in countyData" @click="countryFn(item,$event)">{{item.areaName}}</div>
                  </div>
                </sy-tab-container-item>
              </sy-tab-container>
            </div>
          </div>
        </sy-popup>
      </div>
    </transition>
  </div>
</template>

<script>
  import * as type from '../../../requests/address'
  import * as utils from '../../../packages/utils/extension'
  import {trim} from '../../../packages/utils/dom.js'

  export default {
    data() {
      return {
        isLoading:true,
        userAddress: {
          isDefault: '0'
        },
        addressData: '',
        delIsShow: false,
        isActivity: 'province',
        cityFlag: false,
        countyFlag: false,
        isOk: false,
        provinceData: [],
        cityData: [],
        addressId: '',
        provinceName: '',
        cityName: '',
        countyName: ''
      }
    },
    created() {
      if (this.$route.query.address_id) {
        this.addressId = this.$route.query.address_id
        document.title = '编辑地址'
        this.getAddress()
        this.delIsShow = true
      } else {
        this.addressId = ''
        document.title = '新增地址'
        this.delIsShow = false
      }
      this.getProvince()

    },
    methods: {
      getAddress() {
        type.getAddressInfo(this.addressId).then((res) => {
          this.isLoading=false
          if (res.data.code === 200) {
            this.userAddress = res.data.data.addressInfo
            let arr = res.data.data.addressInfo.areaInfo.split(' ')
            this.provinceName = arr[0]
            this.cityName = arr[1]
            this.countyName = arr[2]
          }
        })
      },
      getProvince() {
        type.getAddressProvince(0).then((res) => {
          this.isLoading=false
          if (res.data.code === 200) {
            this.provinceData = res.data.data.areaList
          }
        })
      },
      saveMsg() {
        if (trim(this.userAddress.trueName) === '') {
          this.$toast('请输入收货人姓名')
          return
        }
        if (trim(this.userAddress.telPhone) === '') {
          this.$toast('请输入手机号码')
          return
        }
        if (!utils.checkPhone(this.userAddress.telPhone)) {
          this.$toast('手机号码格式有误')
          return
        }
        if (trim(this.provinceName) === '') {
          this.$toast('请选择省')
          return
        }
        if (trim(this.cityName) === '') {
          this.$toast('请选择市')
          return
        }
        if (trim(this.countyName) === '') {
          this.$toast('请选择区')
          return
        }
        if (this.userAddress.areaId === '') {
          this.$toast('地址填写有误')
          return
        }
        if (trim(this.userAddress.address) === '') {
          this.$toast('请填写详细地址')
          return
        }
        if (trim(this.userAddress.address).length<5) {
          this.$toast('详细地址不少于五个字')
          return
        }
        type.editAddressInfo({
          areaId: this.userAddress.areaId,
          addressId: this.userAddress.addressId,
          address: this.userAddress.address,
          trueName: this.userAddress.trueName,
          telPhone: this.userAddress.telPhone,
          isDefault: this.userAddress.isDefault,
          type: this.addressId ? 'edit' : 'add'
        }).then((res) => {
          if (res.data.code === 200) {
            this.$toast('编辑成功')
            this.$router.replace({path: '/address/chooseAddress'});
          } else {
            this.$toast('保存失败')
          }
        })
      },
      delMsg() {
        type.edlAddressInfo({
          addressId: this.userAddress.addressId,
        }).then((res) => {
          if (res.data.code === 200) {
            this.$toast('删除成功')
            this.$router.replace({path: '/address/chooseAddress'});
          }
        })
      },
      setProvince(picker) {
        this.$refs[picker].open()
        this.isActivity = 'province'
        //this.isOk = false
      },
      setBlue(e) {
        var elParent = e.target.parentNode
        for (var i = 0; i < elParent.childNodes.length; i++) {
          elParent.childNodes[i].style.color = '#4b4f63'
        }
        e.target.style.color = '#4A90E2'
      },
      provinceFn(item, e) {
        this.setBlue(e)
        document.getElementById('pr').style.color = ' #4B4F63'
        this.provinceName = item.areaName
        this.cityName = ''
        this.countyName = ''
        this.isOk = false
        this.cityFlag = false
        this.countyFlag = false
        this.userAddress.areaId = ''
        type.getAddressProvince(item.areaId).then((res) => {
          if (res.data.code === 200) {
            this.cityData = res.data.data.areaList
            this.isActivity = 'city'
            this.cityFlag = true
            this.countyFlag = false
          }
        })

      },
      cityFn(item, e) {
        this.setBlue(e)
        document.getElementById('ci').style.color = ' #4B4F63'
        this.cityName = item.areaName
        this.countyName = ''
        this.countyFlag = false
        this.isOk = false
        this.userAddress.areaId = ''
        type.getAddressProvince(item.areaId).then((res) => {
          if (res.data.code === 200) {
            this.countyData = res.data.data.areaList
            this.isActivity = 'county'
            this.countyFlag = true
          }
        })
      },
      countryFn(item, e) {
        this.setBlue(e)
        this.isOk = true
        document.getElementById('co').style.color = ' #4B4F63'
        this.countyName = item.areaName
        this.userAddress.areaId = item.areaId
      },
      isDone() {
        if (trim(this.provinceName) === '' || trim(this.cityName) === '' || trim(this.countyName) === '') {
          this.$toast('省市区不能为空')
          return
        }
        if (!this.isOk) return;
        this.$refs['picker1'].close()
      }
    }
  }
</script>

<style lang="scss" scoped>
  $height: 0.88rem;
  $bigHeight: 1.75rem;
  $width_height: 0.32rem;
  $paddingLeft: 0.3rem;
  $fontSize: 0.28rem;
  $textColor: #4B4F63;
  .top-wrapper {
    height: 100%;
    position: relative;
    background: #fafafa;
    .normal {
      height: $height;
      background: #fff;
      border-bottom: 1px solid rgba(218, 222, 228, 0.60);
      line-height: $height;
      text-align: left;
      padding: 0 $paddingLeft 0 $paddingLeft;
      font-size: $fontSize;
      overflow: hidden;
      color: $textColor;
      box-sizing: border-box;
      span, input {
        float: left;
        font-size: $fontSize;
      }
      input {
        font-weight: 300;
      }
      .info-txt {
        font-size: $fontSize;
        color: #818C9E;
        width: 4rem;
        margin-top: 0.24rem;
      }
      .unmargin {
        margin: 0;
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
      }
      input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        font-size: $fontSize;
        color: #DADEE4;
        font-weight: 300;
      }
      input:-moz-placeholder, textarea::-webkit-input-placeholder {
        font-size: $fontSize;
        color: #DADEE4;
        font-weight: 300;
      }
      input::-moz-placeholder, textarea::-webkit-input-placeholder {
        font-size: $fontSize;
        color: #DADEE4;
        font-weight: 300;
      }
      input:-ms-input-placeholder, textarea::-webkit-input-placeholder {
        font-size: $fontSize;
        color: #DADEE4;
        font-weight: 300;
      }
      span {
        display: inline-block;
        font-weight: 300;
        font-size: $fontSize;
        color: #4B4F63;
        margin-right: 1.1rem;
      }
      .address-arrow {
        width: 0.12rem;
        height: 0.24rem;
        float: right;
        margin: 0.32rem 0rem 0 0;
      }
    }
    .big {
      height: $bigHeight;
      line-height: $bigHeight;
      position: relative;
      border: 0;
      span {
        line-height: 0.7rem;
        position: absolute;
      }
      textarea {
        width: 100%;
        height: 83%;
        border: 0;
        resize: none;
        line-height: 0.5rem;
        font-size: $fontSize;
        color: #818C9E;
      }
    }
    div.set-address {
      padding-top: 0.22rem;
      font-size: $fontSize;
      overflow: hidden;
      position: relative;
      margin: 0 auto;
      .cr {
        margin-left: 2.79rem;
        display: inline-block;
        width: $width_height;
        height: $width_height;
        border-radius: 50%;
        border: 2px solid #DADEE4;
        margin-right: 0.1rem;
        box-sizing: border-box;
        float: left;
      }
      .activity {
        border: 0;
        background: url(../../../../static/images/common/select.png);
        background-size: cover;
      }
      .default_text {
        display: inline-block;
        font-weight: 300;
        float: left;
        font-size: .24rem;
        color: #666A7F;
        line-height: 0.32rem;
      }
    }
    .footer-btns {
      width: 100%;
      position: absolute;
      bottom: 0.9rem;
      .del-msg, .save-msg {
        width: 6.9rem;
        text-align: center;
        height: 0.88rem;
        line-height: 0.88rem;
        border: 0;
        border-radius: 0.08rem;
        padding: 0;
        margin-left: 0.3rem;
        font-size: .32rem;
      }
      .save-msg {
        background: #4A90E2;
        color: #FFFFFF;
      }
      .del-msg {
        background: #fafafa;;
        color: #4B4F63;
        border: 1px solid #DADEE4;
        margin-top: 0.4rem;
      }
    }
  }

  .pop-wrapper {
    width: 100%;
    background: #fff;
    height: 8rem;
  }

  .header-top {
    border-bottom: 1px solid #DADEE4;
    width: 100%;
    height: 1.04rem;
    box-sizing: border-box;
    > div {
      float: left;
      border-bottom: 0.04rem solid #4A90E2;
      margin-right: 0.5rem;
      font-size: .30rem;
      color: #818C9E;
      height: 1rem;
      line-height: 1rem;
      font-weight: 300;
      max-width: 1.3rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .is-activity {
      border-bottom: 0;
    }
    div:nth-of-type(1) {
      margin-left: 0.5rem;
    }
    .confirm {
      float: right;
      margin-right: 0.5rem;
      font-size: .30rem;
      color: #DADEE4;
      border: 0;
      font-weight: 300;
    }
    .isDone {
      font-size: .30rem;
      color: #4A90E2;
    }
  }

  .content-address {
    overflow: hidden;
    width: 100%;
    .content-province {
      width: 104%;
      max-height: 7.04rem;
      padding-left: 0.5rem;
      overflow: scroll;
      overflow-x: hidden;
      > div {
        line-height: 0.88rem;
        text-align: left;
        height: 0.88rem;
        font-size: .30rem;
        font-weight: 300;
        color: #4B4F63;
      }
    }
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
  {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
