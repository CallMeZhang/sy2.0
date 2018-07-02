<template>
  <div>
    <sy-loading :show="isLoading"></sy-loading>
    <transition name="fade">
      <div v-show="!isLoading">
        <div ref="wraper" class="top-content">
          <div id='list-wrapper'>
            <!--<div @click="$router.push('/campaign')">455566</div>-->
            <div class="search-w">
              <div class="search-bd">
                <input type="text" placeholder="搜索" v-model="key">
                <div class="search-icon" @click="searchGoods"></div>
              </div>
            </div>
            <ul class="condition border-b">
              <li @click="activityType='comprehensive';searchquery='overall_sort';goTop();comprehensiveGoodes()"
                  :class="{'blue-text':activityType==='comprehensive'}">综合
              </li>
              <li @click="activityType='sales';goTop();salesGoods()" :class="{'blue-text':activityType==='sales'}">
                销量

              </li>
              <li @click="activityType='price';price=!price;goTop();priceGoodes()"
                  :class="{'blue-text':activityType==='price'}">
                价格
                <div class="triangle-all" :class="priceUp===''?'':priceUp?'order-by-up':'order-by-down'">
                </div>
              </li>
              <li @click="activityType='newGoodes';searchquery='time_asc';goTop();comprehensiveGoodes()"
                  :class="{'blue-text':activityType==='newGoodes'}">新品优先
              </li>
            </ul>
            <ul class="condition2 border-b">
              <li>
                <div :class="activity==='area'?'sel':'nosel'">
                  <div @click="activity='area';open('area')" size="large">{{supportArea}} </div>
                </div>
              </li>
              <li>
                <div :class="activity==='production'?'sel':'nosel'">
                  <div @click="activity='production';open('production')" size="large">{{goodsClass}} </div>
                </div>
              </li>
              <li>
                <div :class="activity==='identify'?'sel':'nosel'">
                  <div @click="activity='identify';open('identify')" size="large">{{certs}} </div>
                </div>
              </li>
              <li>
                <div :class="activity==='ownerType'?'sel':'nosel'">
                  <div @click="activity='ownerType';open('ownerType')" size="large">{{ownerType}} </div>
                </div>
              </li>
            </ul>
            <ul v-if="dataList.length!==0" class="product-wrap">
              <li class="product-list" v-for="(item,index) in dataList"
                  @click="goUrl(item.goodsUrl)">
                <img src="../../../static/images/bizbuy/youp.png" class="youxuan" alt="" v-if="item.isQualityGoods===1">
                <img class="list-img" v-lazy="item.goodsImage"/>
                <div class="dd" :class="{'not-border':isDone&&index===dataList.length-1}">
                  <p class="p1"><span v-if="item.ownerType=='poor'" class="poor"></span> {{item.goodsName}}</p>
                  <p class="p2">{{item.goodsDesc}}</p>
                  <span class="span1"><span class="coin">￥</span>&nbsp;{{item.goodsPrice.substr(1)}}</span>
                  <span class="span1 span3" v-if="item.ownerType==='bizbuy'">码</span>
                  <!--3月14号迭代1003，隐藏运费-->
                  <!--<span class="span2">{{item.hasTransportFee === 'N' ? '免运费' : item.shippingFee}}</span>-->
                </div>
              </li>
            </ul>
            <div v-if="dataList.length===0&&unInfo&&currentpage===1" class='not-goods-info'>
              <img :src="siteInfo.cdn_host + '/static/images/common/ap42.png'" alt="">
              <p>暂无记录！</p>
            </div>
          </div>
          <div class="list-footer" v-if="isDone&&false">一起善源 · 用爱连接故乡</div>
          <div @touchmove.prevent>
            <sy-popup-picker ref="area"
                             :value="slots"
                             :dataArea="areaData"
                             @confirm="handleChange">
            </sy-popup-picker>
            <sy-popup-picker ref="production"
                             :value="addressSlots"
                             :dataGoods="address"
                             @confirm="onAddressChange">
            </sy-popup-picker>
            <sy-popup-picker ref="identify"
                             :value="identifySlots"
                             @confirm="onIdentifyChange">
            </sy-popup-picker>
            <sy-popup-picker ref="ownerType"
                             :value="ownerTypeSlots"
                             @confirm="ownerTypeChange">
            </sy-popup-picker>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import * as type from '../../requests/lovemarket'

  export default {
    data() {
      return {
        isLoading: true,
        dataList: [],
        supportArea: '区域',
        goodsClass: '分类',
        certs: '产品认证',
        ownerType: '产品经营范围',
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'right'
          }, {
            divider: false,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          }, {
            divider: false,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'left'
          }
        ],
        addressSlots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            defaultIndex: 0,
            textAlign: 'center'
          }, {
            divider: false,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            defaultIndex: 0,
            className: 'slot3',
            textAlign: 'center'
          }
        ],
        identifySlots: [{
          flex: 1,
          defaultIndex: 0,
          values: [],
          className: 'slot1'
        }],
        ownerTypeSlots: [{
          flex: 1,
          defaultIndex: 0,
          values: [],
          className: 'slot1'
        }],
        address: {},
        key: '',
        searchquery: 'overall_sort',
        currentpage: 1,
        getDataDone: true,
        sales: true,
        price: true,
        activity: '',
        sendData: {
          supportArea: '',
          goodsClass: '',
          certs: '',
          ownerType: '',
          unionItemId: '',
          unionId: ''
        },
        getdata: {},
        returnGoodsClass: [],
        returnGoodsarea: [],
        isDone: false,
        activityType: 'comprehensive',
        priceUp: '',
        channel: 'boc',
        areaData: [],
        unInfo: true
      }
    },
    created() {
      if (this.$route.query.channel) {
        this.channel = this.$route.query.channel
      }
      if (this.$route.query.areaid) {
        this.sendData.supportArea = this.$route.query.areaid
      }
      if (this.$route.query.searchquery) {
        this.key = this.$route.query.searchquery
      }
      if (this.$route.query.goodstype) {
        this.sendData.goodsClass = this.$route.query.goodstype
      }
      if (this.$route.query.ownertype) {
        this.sendData.ownerType = this.$route.query.ownertype
        this.ownerType = this.sendData.ownerType
      }
      if (this.$route.query.goodscert) {
        this.sendData.certs = this.$route.query.goodscert
        this.certs = this.sendData.certs
      }
      if (this.$route.query.unionItemId) {
        this.sendData.unionItemId = this.$route.query.unionItemId
      }
      if (this.$route.query.unionId) {
        this.sendData.unionId = this.$route.query.unionId
      }
      if (this.$route.query.path === 'union') {
        this.getSupportAreaUnToken(this.$route.query.union_channel)
      } else {
        this.getSupportArea()
      }
      this.getOwnerType()
      this.getCerts()
      this.getGoodsClass()
      this.getUnionName()
      this.getLoveMarketList()
//      this.$layertoast({
//        duration: -1,
//        message: "该商品仅可配送至人大机关单位，不可修改收货地址",
//        title:"提示"
//      })
    },
    mounted() {
      var elTag = document.getElementById('list-wrapper')
      window.addEventListener('scroll', this.handleScroll)
    },
    computed: {},
    methods: {
      goUrl(goodsUrl){
//        if(bizbuy==="bizbuy"){
          this.appjs.syJsbLaunchWebview(this.siteInfo.host_old +goodsUrl)
//        }else{
//          this.appjs.syJsbLaunchWebview(this.siteInfo.host_old+'/bocm/index.php?act=project&op=project_detail&gc_id='+goodsCommonid)
//        }
      },
      getSupportAreaUnToken(p) {
        var parms = p || this.channel
        type.getSupportAreaUnToken(parms).then((res) => {
          if (res.data.code === 200) {
            this.areaData = res.data.data.result
            this.getdata['SupportArea'] = res.data.data.result
            this.diguiAreaNameFn(res.data.data.result, 0, this.sendData.supportArea)
            var data = res.data.data.result
            this.slots[0].values = this.getHandleData(data, 'supportAreaName')
            this.slots[2].values = this.getHandleData(data[0].childrenList, 'supportAreaName')
            this.slots[4].values = this.getHandleData(data[0].childrenList[0].childrenList, 'supportAreaName')
          }
        })
      },
      goTop() {
        //document.getElementById('list-wrapper').scrollTop = 0
      },
      getUnionName() {
        type.getUnionName().then((res) => {
          if (res.data.code === 200) {
            for (var i = 0; i < res.data.data.unions.allUnion.length; i++) {
              if (res.data.data.unions.allUnion[i].unionId == this.sendData.unionId) {
                this.appjs.syJsbSetTitleText(res.data.data.unions.allUnion[i].unionName + "大爱超市")
              }
            }
          }
        })
      },
      searchIdName(value, endId) {
        for (var i = 0; i < value.length; i++) {
          if (value[i].childClass) {
            var data = this.searchIdName(value[i].childClass, endId)
            if (data) {
              return data
            }
          }
          if (value[i].gcId == endId) {
            return value[i].gcName
          }
        }
      },
      isHow() {
        var wH = document.body.clientHeight
        var rect = this.$refs.wraper.getBoundingClientRect();
        if (rect.bottom < wH) {
          this.isDone = false
        } else {
          this.isDone = true
        }

      },
      open(picker) {
        this.$refs[picker].open();
      },
      handleChange(value) {
        this.returnGoodsarea = value
        this.supportArea = value[2]
        this.initData()
      },
      onIdentifyChange(value) {
        this.certs = value[0]
        this.initData()
      },
      onAddressChange(value) {
        this.returnGoodsClass = value
        var length = value.length
        while (!value[length--]) {
          this.goodsClass = value[length]
        }
        this.initData()
      },
      ownerTypeChange(value) {
        this.ownerType = value[0]
        this.initData()
      },
      getSupportArea() {
        type.getSupportArea(this.channel).then((res) => {
          if (res.data.code === 200) {
            this.areaData = res.data.data.result
            this.getdata['SupportArea'] = res.data.data.result
            this.diguiAreaNameFn(res.data.data.result, 0, this.sendData.supportArea)
            var data = res.data.data.result
            this.slots[0].values = this.getHandleData(data, 'supportAreaName')
            this.slots[2].values = this.getHandleData(data[0].childrenList, 'supportAreaName')
            this.slots[4].values = this.getHandleData(data[0].childrenList[0].childrenList, 'supportAreaName')
          }
        })
      },
      getHandleData(value, key) {
        return value.filter(value => true).map(child => child[key]);
      },
      getOwnerType() {
        type.getOwnerType().then((res) => {
          if (res.data.code === 200) {
            this.getdata['OwnerType'] = res.data.data
            var obj = res.data.data
            for (var key in obj) {
              this.ownerTypeSlots[0].values.push(obj[key])
            }
          }
        })
      },
      getCerts() {
        type.getCerts().then((res) => {
          if (res.data.code === 200) {
            this.getdata['Certs'] = res.data.data
            var obj = res.data.data
            for (var key in obj) {
              this.identifySlots[0].values.push(obj[key])
            }
          }
        })
      },
      getGoodsClass() {
        type.getGoodsClass().then((res) => {
          if (res.data.code === 200) {
            this.getdata['GoodsClass'] = res.data.data.result
            var data = res.data.data.result
            var searchIdName = this.searchIdName(data, this.sendData.goodsClass)
            if (searchIdName) {
              this.goodsClass = this.searchIdName(data, this.sendData.goodsClass)
            }
            var obj = this.getHandleGoodsClass(data)
            this.address = obj
            this.addressSlots[0].values = Object.keys(obj)
            this.addressSlots[2].values = ['母婴用品']
          }
        })
      },
      getHandleGoodsClass(value) {
        var obj = {}
        for (var i = 0; i < value.length; i++) {
          obj[value[i].syGoodsClass.gcName] = this.getHandleData(value[i].childClass, 'gcName')
        }
        return obj
      },
      getLoveMarketList() {
        this.initSend()
        type.getLoveMarketList(this.currentpage, this.key, this.searchquery, this.sendData['supportArea'], this.sendData['goodsClass'], this.sendData['certs'], this.sendData['ownerType'], this.sendData['unionItemId'], this.sendData['unionId']).then((res) => {
          if (res.data.code === 200) {
            this.isLoading = false
            if (this.currentpage === 1) {
              this.dataList = res.data.data.goodsList
              if (this.dataList.length === 0) {
                this.unInfo = true;
              } else {
                this.unInfo = false;
              }
            } else {
              this.dataList = this.dataList.concat(res.data.data.goodsList)
            }

            if (res.data.data.hasNext === 'Y') {
              this.getDataDone = true
            } else {
              this.getDataDone = false
              this.$nextTick(function () {
                this.isHow()
              })
            }
          }
        })
      },
      searchGoods() {
        this.currentpage = 1;
        this.dataList = [];
        this.getLoveMarketList()
      },
      comprehensiveGoodes() {
        this.currentpage = 1
        this.getLoveMarketList()
      },
      salesGoods() {
        this.currentpage = 1
        if (this.sales) {
          this.searchquery = 'sale_asc'
        } else {
          this.searchquery = 'sale_desc'
        }
        this.getLoveMarketList()
      },
      priceGoodes() {
        this.currentpage = 1
        if (this.price) {
          this.searchquery = 'price_asc'
          this.priceUp = true;
        } else {
          this.searchquery = 'price_desc'
          this.priceUp = false;
        }
        this.getLoveMarketList()
      },
      handleScroll() {
        var offsetHeight = document.body.scrollHeight
        var clientHeight = document.body.clientHeight
        var scrollTop = 0
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop
        } else if (document.body) {
          scrollTop = document.body.scrollTop
        }
        if (offsetHeight - clientHeight - scrollTop <= 50 && this.getDataDone) {
          this.getDataDone = false
          this.currentpage++
          this.getLoveMarketList()
        }
      },
      diguiAreaNameFn(value, index, id) {
        for (var i = 0; i < value.length; i++) {
          if (value[i].supportAreaId == id) {
            this.supportArea = value[i].supportAreaName
            return;
          } else {
            if (value[i].childrenList.length !== 0) {
              this.diguiAreaNameFn(value[i].childrenList, index, id)
            } else {
            }
            if (value[i].supportAreaId == id) {
              this.supportArea = value[i].supportAreaName
              return;
            }
          }
        }
      },
      diguiFn(value, index) {
        for (var i = 0; i < value.length; i++) {
          if (value[i].supportAreaName === this.returnGoodsarea[index]) {
            this.sendData['supportArea'] = value[i].supportAreaId
            index++
            if (value[i].childrenList.length !== 0) {
              this.diguiFn(value[i].childrenList, index)
            } else {
              this.sendData['supportArea'] = value[i].supportAreaId
              return;
            }
          }
        }
      },
      initSend() {
        for (var key in this.getdata) {
          if (key === 'SupportArea') {
            this.diguiFn(this.getdata[key], 0)
          } else if (key === 'GoodsClass') {
            for (var i = 0; i < this.getdata[key].length; i++) {
              if (this.getdata[key][i].syGoodsClass.gcName === this.returnGoodsClass[0]) {
                for (var k = 0; k < this.getdata[key][i].childClass.length; k++) {
                  if (this.returnGoodsClass[1] === this.getdata[key][i].childClass[k].gcName) {
                    this.sendData['goodsClass'] = this.getdata[key][i].childClass[k].gcId
                  }
                }
              }
            }
          } else if (key === 'Certs') {
            for (var k in this.getdata[key]) {
              if (this.getdata[key][k] === this.certs) {
                this.sendData['certs'] = k
              }
            }
          } else if (key === 'OwnerType') {
            for (var k in this.getdata[key]) {
              if (this.getdata[key][k] === this.ownerType) {
                this.sendData['ownerType'] = k
              }
            }
          }
        }
      },
      initData() {
        this.currentpage = 1
        this.dataList = []
        this.getLoveMarketList()
      },
    },
    components: {}
  }
</script>
<style lang="less">
  .add {
    background: #00f
  }

  .top-content {
    overflow: hidden;
    height: 100%;
    overflow-y: scroll;
  }

  .border-b {
    border-bottom: 1px solid rgba(218, 222, 228, 0.6);
  }

  .search-w {
    width: 7.5rem;
    height: 1rem;
    background: #f7f9fa;
    display: inline-block;
    position: relative;
    .search-bd {
      width: 6.9rem;
      height: 0.7rem;
      margin: 0.15rem auto;
      padding: 0.16rem 0.2rem;
      border: 1px solid #DADEE4;
      border-radius: 0.08rem;
      box-sizing: border-box;
      background: #fff;
      position: relative;

      input {
        width: 90%;
        color: #4B4F63;
        font-size: 0.28rem;
      }
      input::-webkit-input-placeholder { /* WebKit browsers */
        color: #DADEE4;
      }
      .search-icon {
        float: right;
        width: 0.34rem;
        height: 0.34rem;
        background: url("/static/images/index/icon-ser.png") no-repeat;
        background-size: 0.34rem;
        background-position: 0 -0.3rem;
      }
    }

  }

  .condition {
    width: 7.5rem;
    height: 0.84rem;
    font-size: 0.28rem;
    color: #4B4F63;
    letter-spacing: -0.56px;
    li {
      width: 24%;
      height: 0.84rem;
      line-height: 0.84rem;
      float: left;
      text-align: center;
    }
    .blue-text {
      color: #4A90E2
    }
  }

  .condition2 {
    width: 7.5rem;
    height: 0.82rem;
    font-size: 0.24rem;
    box-sizing: border-box;
    color: #666A7F;
    padding: 0.16rem 0.16rem 0;
    li {
      width: 25%;
      float: left;
      & > div {
        height: 0.5rem;
        border-radius: 0.08rem;
        text-align: center;
        width: 1.54rem;
        margin: 0 auto;
        overflow: hidden;
        box-sizing: border-box;
      }
      .nosel {
        background: #EBF4FF;
        div {
          max-width: 1.16rem;
          line-height: 0.5rem;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: inline-block;
          padding-right: 0.2rem;
          background: url("/static/images/common/black_down.png") no-repeat center right;
          background-size: 0.1rem 0.07rem;
        }
      }
      .sel {
        border: 1px solid #4A90E2;
        background: #FFF;
        div {
          max-width: 1.16rem;
          line-height: 0.5rem;
          text-align: center;
          color: #4A90E2;
          display: inline-block;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
  }

  .product-wrap {
    margin: 0.3rem 0.3rem 0;
    .product-list {
      text-align: left;
      padding: 0.2rem 0 0 0;
      overflow: hidden;
      position: relative;
      .youxuan{
        position: absolute;
        top:0.2rem;
        left: 0.2rem;
        width: 0.4rem;

      }
      .list-img {
        width: 2.26rem;
        height: 1.6rem;
        border-radius: 0.04rem;
        float: left;
      }
      .dd {
        display: inline-block;
        width: 4.34rem;
        border-bottom: 0.01rem solid #DADEE4;
        vertical-align: top;
        margin-left: 0.3rem;
        padding-bottom: 0.29rem;
        float: left;
        .p1 {
          font-size: .32rem;
          color: #4B4F63;
          letter-spacing: 0;
          line-height: 0.45rem;
          height: 0.45rem;
          font-weight: 300;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          position: relative;
          .poor {
            width: 1.28rem;
            height: .45rem;
            position: relative;
            vertical-align: middle;
            background: url(../../../static/images/symarket/zichan.png) no-repeat center 0.04rem;
            display: inline-block;
            background-size: contain;
          }
        }
        .p2 {
          font-size: .24rem;
          color: #B1B8C4;
          letter-spacing: -0.0048rem;
          padding: 0.08rem 0 0.3rem 0;
          line-height: 0.33rem;
          height: 0.33rem;
          font-weight: 300;
        }
        .span1 {
          font-size: .30rem;
          color: #4A90E2;
          letter-spacing: -0.0056rem;
          height: 0.4rem;
          line-height: 0.4rem;
          .coin {
            font-size: 0.24rem;
          }
        }
        .span3{
          background-color: #4a90e2;
          color: #fff;
          display: inline-block;
          height: .32rem;
          width: .32rem;
          border-radius: 4px;
          font-size: .24rem;
          text-align: center;
          line-height: .32rem;
          margin-left: .11rem;
        }
        .span2 {
          font-size: .24rem;
          color: #B1B8C4;
          letter-spacing: -0.0056rem;
          margin-right: 0;
          float: right;
        }
      }
      .not-border {
        border: 0;
      }
    }
  }

  .list-footer {
    font-size: .24rem;
    color: #DADEE4;
    background: #F7F9FA;
    line-height: 0.5rem;
    height: 0.5rem;
    text-align: center;
  }

  .not-goods-info {
    padding-bottom: 20px;
    margin-top: 30%;
    img {
      width: 1.56rem;
      display: block;
      margin: 0 auto 0.1rem;
    }
    p {
      text-align: center;
      font-size: .30rem;
      margin-bottom: .20rem;
    }
  }

  .triangle-all {
    display: inline-block;
    width: 0.1rem;
    height: 0.16rem;
    background: url("/static/images/icon/ap89.png") no-repeat center;
    background-size: cover;
  }

  .order-by-up {
    background: url("/static/images/icon/ap89_up.png") no-repeat center;
    background-size: cover;
  }

  .order-by-down {
    background: url("/static/images/icon/ap89_down.png") no-repeat center;
    background-size: cover;
  }
</style>
