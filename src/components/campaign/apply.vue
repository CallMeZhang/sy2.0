<template>
  <div class="bg">
    <div class="addr-c">
      <div class="item">
        <div class="item-l">认养方式</div>
        <div class="item-r">{{typeText}}</div>
      </div>
      <div class="item">
        <div class="item-l">认养数量</div>
        <div class="item-r">
          <div class="circle" @click="type==='t'?treeNum >10 ? treeNum-- :treeNum=10:treeNum >1 ? treeNum-- :treeNum=1">
            <div class="sub"></div>
          </div>
          <span style="margin: 0 0.28rem" v-model="treeNum">{{treeNum}}</span>
          <div class="circle" @click="treeNum ++">+</div>
        </div>
      </div>
      <div class="item" v-if="type==='t'">
        <div class="item-l">团体名称</div>
        <input class="item-input" type="text" v-model="teamName" id="TeamName" placeholder="请输入团体名称">
      </div>
      <div class="item">
        <div class="item-l">联系人姓名</div>
        <input class="item-input" type="text" v-model="applyName" id="name" placeholder="请输入姓名">
      </div>
      <div class="item">
        <div class="item-l">手机号</div>
        <input class="item-input" type="tel" v-model="telPhone" id="phone" placeholder="请输入手机号码" oninput="if(value.length>11)value=value.slice(0,11)">
      </div>
      <div class="item" @click="showPicker(true)">
        <div class="item-l">省市区</div>
        <!--<div class="item-r">北京市 市辖区 东城区</div>-->
        <div class="item-r">{{area_info}}</div>
        <div class="arrows"></div>
      </div>
      <textarea class="addr-de" required placeholder="请填写详细地址，不少于5个字" v-model="addresDetail"></textarea>
    </div>
    <div class="btn" @click="submit()">提交</div>

    <transition name="popup">
      <div class="pppop" v-show="pickerIsShow" @touchmove.prevent>
        <div class="popup-confirm">
          <span class="popup-confirm-text sy-blue" @click="showPicker(false)">
            确定
          </span>
        </div>
        <mt-picker :slots="slots" @change="onValuesChange" valueKey="areaName" :itemHeight="picker_height"></mt-picker>
      </div>
    </transition>
  </div>
</template>

<script>
  import {edit_or_add_address, getChildrenAddressById, get_address_list} from '@/requests/order'
  import ss from '@/modules/_ss/index'
  import * as type from '@/requests/campaign'
  import _appjs  from '@/modules/_appjs/index'
  import {checkPhone,checkPlatform} from '../../packages/utils/extension'

  export default {
    name: "apply",
    data() {
      return {
        falgCity: false,
        type:'p',
        treeNum: 1,
        applyName: '',
        teamName:'',
        telPhone: '',
        addresDetail: '',
        pickerIsShow: false,
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
        picker_height: 42,
        area_info: '',
        city_id: 0,
        area_id: 0,
      }
    },
    created() {
      var that =this
      this.type = this.$route.query.type||'p'
      if(this.type==='t'){
        this.treeNum=10
      }
      this.getData()
      _appjs.syJsbGetAppInfo(function (res) {
        if(res){
          that.getUserInfo();
        }
      })
    },
    mounted() {

    },
    computed:{
      typeText:function(){
        var str ="苹果树单人认养"
        switch(this.type){
          case "p":str="苹果树单人认养";break;
          case "f":str="苹果树拼团认养";break;
          case "l":str="苹果爱心认领";break;
          case "t":str="苹果树团体认养";break;
        }
        return str
      },
    },
    methods: {
      getUserInfo(){
        type.myAppleTreeUserinfo().then((res) => {
          if (res.data.code === 200) {
            this.applyName=res.data.content.true_name
            this.telPhone=res.data.content.mob_phone
            this.area_info=res.data.content.area
            this.addresDetail=res.data.content.address
            this.area_id=res.data.content.area_id
          }
        })
      },
      submit() {
        var that =this
        if(that.type==='t'){
          if(!(that.teamName.length>=4&&that.teamName.length<=12)){
            alert('团体名称为4-12个字符！')
            return;
          }
        }
        if(!checkPhone(that.telPhone)){
          alert('电话号码有误！')
          return;
        }
        type.myAppleTreeActivity({
          "adopt_type": that.type,
          "adopt_num": that.treeNum,
          "adopt_apply_member_name": that.applyName,
          "adopt_apply_team_name": that.teamName,
          "adopt_member_mobile": that.telPhone,
          "area_id": that.area_id,
          "address": that.addresDetail
        }).then((res) => {
          if (res.data.code === 200) {
            console.log(res.data)
          }
        })
        //console.log(this.treeNum, this.applyName, this.telPhone, this.addresDetail)
      },
      showPicker(bool) {
        this.pickerIsShow = bool
      },
      async getData() {
        let province = await getChildrenAddressById(0)
        this.slots[0].values = province
        let city = await getChildrenAddressById(province[0]['areaId'])
        this.slots[2].values = city
        let area = await getChildrenAddressById(city[0]['areaId'])
        this.slots[4].values = area
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
        if (values[1]['areaParentId'] !== values[0]['areaId']) {
          let city = await getChildrenAddressById(values[0]['areaId'])
          this.slots[2].values = city
        }
        if (values[2]['areaParentId'] !== values[1]['areaId']) {
          let area = await getChildrenAddressById(values[1]['areaId'])
          this.slots[4].values = area
        }
        this.area_info = values[0]['areaName'] + ' ' + values[1]['areaName'] + ' ' + values[2]['areaName']
        this.city_id = values[1]['areaId']
        this.area_id = values[2]['areaId']
      },

    }
  }
</script>

<style scoped lang="scss">
  .bg {
    width: 100%;
    height: 100%;
    background: url("/static/images/campaign/v2/bg00.jpg");
    background-size: 100% 100%;
    /*opacity: 0.65;*/
    padding-top: 0.4rem;
    box-sizing: border-box;
  }
  .addr-c {
    width: 6.9rem;
    height: 8rem;
    margin: 0 auto 0;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 0.08rem;
    padding-left: 0.3rem;
    box-sizing: border-box;
  }

  .item {
    width: 100%;
    height: 0.88rem;
    border-bottom: 0.01rem solid rgba(218, 222, 228, 1);
    overflow: hidden;
  }

  .item-l {
    width: 1.4rem;
    height: 0.88rem;
    float: left;
    line-height: 0.88rem;
    font-size: 0.28rem;
    color: #4B4F63;
  }

  .item-r {
    height: 0.88rem;
    margin-left: 0.54rem;
    float: left;
    font-size: 0.28rem;
    color: #818C9E;
    line-height: 0.88rem;
  }

  .item-r-color {
    color: #B1B8C4;
  }

  .item-input {
    height: 0.86rem;
    width: 4rem;
    margin-left: 0.54rem;
    float: left;
    font-size: 0.28rem;
    color: #818C9E;
    line-height: 0.86rem;
    background: rgba(255, 255, 255, 0.2);
  }

  input::placeholder {
    color: #B1B8C4;
  }

  .circle {
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    background: #DADEE4;
    border-radius: 50%;
    line-height: 0.4rem;
    text-align: center;
    font-size: 0.4rem;
    vertical-align: middle;
  }

  .sub {
    width: 0.19rem;
    height: 0.04rem;
    background: #818C9E;
    margin: 0.18rem auto;
  }

  .arrows {
    width: 0.13rem;
    height: 0.22rem;
    background: url(/static/images/order/arrow-more.png) no-repeat center;
    background-size: 0.12rem 0.22rem;
    float: right;
    margin: 0.33rem 0.3rem;
  }

  .addr-de {
    width: 6.3rem;
    height: 3rem;
    margin: 0.22rem auto 0;
    background: rgba(255, 255, 255, 0.1);
    font-size: 0.28rem;
    color: #818C9E;
    line-height: 0.4rem;
  }

  textarea::placeholder {
    color: #B1B8C4;
  }

  .btn {
    width: 6.9rem;
    height: 0.88rem;
    background-image: linear-gradient(90deg, #8D8D42 2%, #AEBB61 99%);
    border: 0.03rem solid #FFFFFF;
    border-radius: 1rem;
    font-size: 0.32rem;
    color: #FFFFFF;
    line-height: 0.88rem;
    text-align: center;
    margin: 1.38rem auto 0;
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
