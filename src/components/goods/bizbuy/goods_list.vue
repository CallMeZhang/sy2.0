<template>
  <div class="container">
    <div v-title="'善源甄选'"></div>
    <sy-loading :show="isLoading"></sy-loading>
    <transition name="fade">
      <div v-show="!isLoading" style="height: 100%">
        <div class="search-wrapper">
          <div class="search-content">
            <input v-model="searchquery" class="search-input" type="text" name="key" placeholder="搜索">
            <div class="search-icon" @click="search()">
            </div>
          </div>
        </div>
        <div class="order-wrapper">
          <div :class="{'order-item': true, zonghe: true, 'sy-blue': (sortKey === 'zonghe' ? true : false)}" @click="sortGoods('zonghe')">
            <span>综合</span>
          </div>
          <div :class="{'order-item': true, xiaoliang: true, 'sy-blue': (sortKey === 'xiaoliang' ? true : false)}" @click="sortGoods('xiaoliang')">
            <span>销量</span>
          </div>
          <div :class="{'order-item': true, jiage: true, 'sy-blue': (sortKey === 'jiage' ? true : false)}" @click="sortGoods('jiage')">
            <span>价格</span>
            <span class="order-by-icon">
              <img class="order-by-up" :src="price_sort_up">
              <img class="order-by-down" :src="price_sort_down">
            </span>
          </div>
          <div :class="{'order-item': true, xinpinyouxian: true, 'sy-blue': (sortKey === 'xinpinyouxian' ? true : false)}" @click="sortGoods('xinpinyouxian')">
            <span>新品优先</span>
          </div>
        </div>
        <div class="products-list iphonex-goods-list-con">
          <div class="list-wrapper" id="goods-list">
            <div style="background: #ffffff;height: 0.1rem;"></div>
            <div class="list-item-wrapper" v-show="goodslist.length > 0" v-for="(item, index) in goodslist" @click="appjs.syJsbLaunchWebview(siteInfo.host_old + item.touchUrl)">
              <img src="../../../../static/images/bizbuy/youp.png" class="youxuan" alt="" v-if="item.isQualityGoods==1">
              <img class="goods-img" :src="item.goodsImage">
              <div class="list-text-wrapper">
                <div class="goods-name text-more-line">
                  {{item.goodsName}}
                </div>
                <div class="goods-price">
                  <span class="price sy-blue"><span style="font-size: 0.22rem;">￥</span> {{item.goodsPrice.substr(1)}}</span>
                  <span class="use-con sy-blue-bg">码</span>
                  <!--<span class="no-yunfei">{{item.shippingFee}}</span>-->
                </div>
              </div>
            </div>
            <div class="no-more" v-show="no_goods">
              <img class="no-more-img" :src="siteInfo.cdn_host + '/static/images/common/ap42.png'" alt="">
              <div class="no-more-text">
                暂无产品
              </div>
            </div>
            <div class="line-2 goods-list-bottom-line"></div>
            <!--<div class="bottom-sign">一起善源 · 用爱连接故乡</div>-->
          </div>
        </div>
        <div class="bottom-btn iphonex-bottom-div sy-blue-bg" @click="showSwiper()">查看单位集采下单流程</div>
      </div>
    </transition>
    <div class="selectTip" v-show="showTip">
      <div class="selectTipContent">
        <div class="tipClose" @click="showTip = false">
          <img :src="siteInfo.cdn_host+'/static/images/common/close_x2.png'" alt="">
        </div>
        <div class="swiper-container" ref="swiper" style="height: 100%;">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="tipTitle">
                单位集中采购新流程·步骤1
              </div>
              <div class="tipContent">
                <p>单位集中采购可以在<span>产品详情页</span></p>
                <p>点击“<span>集采清单</span>”按钮加入集采清单</p>
                <div class="tipList">
                  <img :src="siteInfo.cdn_host+'/static/images/bizbuy/icon1.png'" alt="step1">
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="tipTitle">
                单位集中采购新流程·步骤2
              </div>
              <div class="tipContent">
                <p>已添加的产品</p>
                <p>可以在“<span>我的</span>”-“<span>单位集采清单</span>”中找到</p>
                <div class="tipList">
                  <img :src="siteInfo.cdn_host+'/static/images/bizbuy/icon2.png'" alt="step2">
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="tipTitle">
                单位集中采购新流程·步骤3
              </div>
              <div class="tipContent">
                <p>选择<span>单位集采清单</span>中的产品<span>确认采购</span></p>
                <p>并填写订单信息提交订单</p>
                <div class="tipList" style="height: 4.5rem;margin-top: 0.5rem;">
                  <img :src="siteInfo.cdn_host+'/static/images/bizbuy/icon3.png'" alt="step3">
                </div>
              </div>
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {bizbuy_goodslist} from '@/requests/bizbuy'
  import Swiper from '../../../../static/js/plugins/swiper/swiper-3.4.2.min'
  export default {
    data () {
      return {
        isLoading: true,
        goodslist: [],
        currentpage: 1,
        goodstype: '',
        searchquery: '',
        sortorder: '',
        hasNext: true,
        sortKey: 'zonghe',
        priceSortType: '',
        price_sort_up: this.siteInfo.cdn_host + '/static/images/common/black_up.png',
        price_sort_down: this.siteInfo.cdn_host + '/static/images/common/black_down.png',
        showTip: false,
        swiper: null,
        no_goods: false
      }
    },
    created: function () {
      this.initData()
      this.appjs.syJsbSetTitleText("善源甄选")
    },
    mounted: function () {
      document.getElementById("goods-list").addEventListener('scroll', this.handleScroll)
    },
    methods: {
      initData () {
        this.currentpage = this.$route.query.cur_page === undefined ? 1 : this.$route.query.cur_page
        this.goodstype = this.$route.query.cate_id === undefined ? null : this.$route.query.cate_id
        this.searchquery = this.$route.query.key === undefined ? null : this.$route.query.key.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "")
        this.sortorder = this.$route.query.order === undefined ? null : this.$route.query.order
        let data = {
          'currentpage': this.currentpage,
          'goodstype': this.goodstype,
          'searchquery': this.searchquery,
          'sortorder': this.sortorder
        }
        switch (this.sortorder) {
          case 'overall_sort':
            this.sortKey = 'zonghe';break;
          case 'sale_desc':
            this.sortKey = 'xiaoliang';break;
          case 'price_asc':
            this.sortKey = 'jiage';
            this.price_sort_up = this.siteInfo.cdn_host + '/static/images/common/blue_up.png'
            this.price_sort_down = this.siteInfo.cdn_host + '/static/images/common/black_down.png'
            break;
          case 'price_desc':
            this.sortKey = 'jiage';
            this.price_sort_up = this.siteInfo.cdn_host + '/static/images/common/black_up.png'
            this.price_sort_down = this.siteInfo.cdn_host + '/static/images/common/blue_down.png'
            break;
          case 'time_desc':
            this.sortKey = 'xinpinyouxian';break;
          default:
            this.sortKey = 'zonghe';break;
        }
        this.requestData(data)
      },
      search() {
//        if(this.key.length === 0) {
//          return false
//        }
        this.currentpage = 1
        this.goodstype = ''
        this.sortKey = 'zonghe'
        let data = {
          'searchquery': this.searchquery === null ? '' : this.searchquery.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "")
        }
        this.goodslist = []
        this.requestData(data)
      },
      requestData(data) {
        bizbuy_goodslist(data).then((res) => {
          if(res.data.code === 200) {
            let content = res.data.data
            this.goodslist = this.goodslist.concat(content.goodsList)
            this.no_goods = this.goodslist.length === 0 ? true : false
            this.hasNext = (content.hasNext == 'Y' ? true : false)
            this.isLoading = false
          }
        })
      },
      sortGoods (sort) {
        this.hasNext = false
        this.currentpage = 1
        let data = {
          'currentpage': this.currentpage,
          'goodstype': this.goodstype,
          'searchquery': this.searchquery,
          'sortorder' : ''
        }
        this.price_sort_up = this.siteInfo.cdn_host + '/static/images/common/black_up.png'
        this.price_sort_down = this.siteInfo.cdn_host + '/static/images/common/black_down.png'
        switch (sort) {
          case  'zonghe':
            data.sortorder = 'overall_sort'
            this.sortorder = 'overall_sort'
            this.sortKey = 'zonghe'
            break
          case 'xiaoliang':
            data.sortorder = 'sale_desc'
            this.sortorder = 'sale_desc'
            this.sortKey = 'xiaoliang'
            break
          case 'jiage':
            if(this.priceSortType === 'price_asc') {
              this.priceSortType = 'price_desc'
              this.sortorder = 'price_desc'
              this.price_sort_up = this.siteInfo.cdn_host + '/static/images/common/black_up.png'
              this.price_sort_down = this.siteInfo.cdn_host + '/static/images/common/blue_down.png'
            } else {
              this.priceSortType = 'price_asc'
              this.sortorder = 'price_asc'
              this.price_sort_up = this.siteInfo.cdn_host + '/static/images/common/blue_up.png'
              this.price_sort_down = this.siteInfo.cdn_host + '/static/images/common/black_down.png'
            }
            data.sortorder = this.sortorder
            this.sortKey = 'jiage'
            break
          case 'xinpinyouxian':
            data.sortorder = 'time_desc'
            this.sortorder = 'time_desc'
            this.sortKey = 'xinpinyouxian'
            break
          default:
            break
        }
        this.goodslist = []
        this.requestData(data)
      },
      handleScroll() {
        var offsetHeight = document.getElementById("goods-list").scrollHeight
        var clientHeight = document.getElementById("goods-list").clientHeight
        var scrollTop = 0
        if (document.getElementById("goods-list") && document.getElementById("goods-list").scrollTop) {
          scrollTop = document.getElementById("goods-list").scrollTop
        } else if (document.body) {
          scrollTop = document.getElementById("goods-list").scrollTop
        }
        if (offsetHeight - clientHeight - scrollTop <= 50 && this.hasNext) {
          this.hasNext = false
          this.currentpage++
          let data = {
            'currentpage': this.currentpage,
            'goodstype': this.goodstype,
            'searchquery': this.searchquery,
            'sortorder': this.sortorder
          }
          this.requestData(data)
        }
      },
      showSwiper() {
//        this.appjs.syJsbLaunchWebview(this.siteInfo.host_old + '/bocm/index.php?act=bizbuy&op=biz_budget')
        this.showTip = true
        if(this.swiper !== null) {
          return
        }
        this.$nextTick(() => {
          this.swiper = new Swiper(this.$refs.swiper, {
            direction: 'horizontal',
            loop: false,
            pagination: '.swiper-pagination',
            paginationType: 'bullets'
          })
        })
      }
    }
  }
</script>

<style scoped>
  @import "/static/css/plugins/swiper/swiper-3.4.2.min.css";
  .container {
    width: 100%;
    height: 100%;
    background: #F7F9FA;
    font-size: 0.28rem;
    position: relative;
  }
  .search-line {
    height: 1rem;
  }
  .order-line {
    height: 0.84rem;
  }
  .search-wrapper {
    height: 1rem;
    width: 100%;
    padding: 0.15rem 0.3rem;
    box-sizing: border-box;
    position: relative;
    background-color: #F7F9FA;
  }
  .search-content {
    height: 0.7rem;
    width: 6.9rem;
    background: #ffffff;
    border-radius: 8px;
    padding: 0.13rem 0.2rem 0.14rem 0.4rem;
    box-sizing: border-box;
    border: 1px solid rgba(233,235,239,0.6);
  }
  .search-input {
    height: 0.4rem;
    width: 5.07rem;
    line-height: 0.4rem;
    display: inline-block;
  }
  .search-icon {
    display: inline-block;
    height: 0.34rem;
    width: 0.34rem;
    background: url("/static/images/common/icon-ser.png") no-repeat;
    background-size: 100% 100%;
    margin-top: 0.06rem;
    float: right;
  }
  .order-wrapper {
    position: relative;
    background: #ffffff;
    height: 0.84rem;
    width: 100%;
    border-bottom: 1px solid #DADEE4;
  }
  .order-item {
    display: inline-block;
    line-height: 0.84rem;
    height: 0.84rem;
    text-align: center;
  }
  .zonghe {
    margin-left: 0.6rem;
  }
  .xiaoliang {
    margin-left: 1.13rem;
  }
  .jiage {
    margin-left: 1.13rem;
  }
  .xinpinyouxian {
    margin-left: 1.13rem;
  }
  .products-list{
    width: 7.5rem;
    height: calc(100% - 2.72rem);
    overflow-x: hidden;
  }
  .list-item-wrapper {
    height: 2rem;
    position: relative;
  }
  .youxuan{
    position: absolute;
    top:0.2rem;
    left: 0.5rem;
    width: 0.4rem;

  }
  .list-wrapper {
    background: #ffffff;
    height: 100%;
    overflow: scroll;
    width: calc(100% + 10px);
    -webkit-overflow-scrolling: touch;
  }
  .list-item-wrapper:nth-last-child(3) .list-text-wrapper {
    border: none;
  }
  .goods-img {
    height: 1.6rem;
    width: 2.24rem;
    border-radius: 4px;
    margin: 0.2rem 0.3rem;
    border: 1px solid #E9EBEF;
  }
  .list-text-wrapper {
    display: inline-block;
    box-sizing: border-box;
    width: 4.36rem;
    height: 2rem;
    vertical-align: top;
    border-bottom: 1px solid rgba(233,235,239,0.6);
    padding: 0.2rem 0rem 0.2rem;
  }
  .goods-name {
    height: 0.9rem;
    font-size: 0.32rem;
  }
  .goods-price {
    margin-top: 0.4rem;
    height: 0.3rem;
  }
  .price {
    display: inline-block;
    /*height: 0.3rem;*/
    line-height: 0.3rem;
    vertical-align: middle;
    font-size: 0.3rem;
    float: left;
  }
  .no-yunfei {
    color: #B1B8C4;
    font-size: 0.24rem;
    float: right;
  }
  .use-con {
    color: #ffffff;
    display: inline-block;
    height: 0.32rem;
    width: 0.32rem;
    border-radius: 4px;
    font-size: 0.24rem;
    text-align: center;
    line-height: 0.32rem;
    margin-left: 0.11rem;
    float: left;
  }
  .goods-list-bottom-line {
    margin-top: -2px;
    background-color: #ffffff;
  }
  .bottom-sign {
    height: 0.5rem;
    width: 100%;
    font-size: 0.24rem;
    color: #DADEE4;
    text-align: center;
    line-height: 0.5rem;
    background: #F7F9FA;
  }
  .bottom-line {
    height: 1.38rem;
  }
  .bottom-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 1rem;
    width: 100%;
    line-height: 1rem;
    text-align: center;
    color: #ffffff;
    font-size: 0.32rem;
  }
  .order-by-up {
    height: 0.05rem;
    width: 0.1rem;
    position: absolute;
    top: 0.11rem;
  }

  .order-by-down {
    height: 0.05rem;
    width: 0.1rem;
    position: absolute;
    top: 0.24rem;
  }

  .order-by-icon {
    display: inline-block;
    height: 0.4rem;
    width: 0.08rem;
    margin-top: 0.22rem;
    vertical-align: top;
    position: relative;
  }

  .selectTip {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 99999;
  }

  .selectTipContent {
    width: 6.5rem;
    height: 9rem;
    background: #fff;
    border-radius: 16px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    text-align: center;
  }

  .swiper-container {
    width: 100%;
  }

  .selectTipContent .tipTitle {
    width: 6.5rem;
    padding: 0.25rem 0;
    text-align: center;
    font-size: 0.34rem;
    color: #4B4F63;
    border-bottom: 1px solid rgba(218, 222, 228, 0.60);
  }

  .selectTipContent .tipContent {
    width: 6.5rem;
    padding: 0 0.4rem;
    margin-top: 0.5rem;
    box-sizing: border-box;
  }

  .selectTipContent .tipContent p {
    font-size: 0.3rem;
    color: #4B4F63;
    line-height: 0.46rem;
  }

  .selectTipContent .tipContent p span {
    color: #4A90E2;;
  }

  .tipList {
    width: 5.8rem;
    height: 3rem;
    margin-top: 1.21rem;
  }

  .tipList img {
    width: 100%;
    height: 100%;
  }

  .tipAgree {
    width: 2.5rem;
    margin: 0.25rem auto 0;
  }

  .tipAgree div {
    display: inline-block;
    font-size: 0.24rem;
    color: #A1C5EF;
    float: left;
  }

  .tipDg {
    width: 0.3rem;
    height: 0.3rem;
    border: 1px solid #DADEE4;
    margin-right: 0.16rem;
    vertical-align: middle;
  }

  .tipDg img {
    width: 100%;
    height: 100%;
  }

  .tipClose {
    position: absolute;
    top: -0.9rem;
    right: 0.3rem;
    width: 0.6rem;
    height: 0.6rem;
  }

  .tipClose img {
    width: 100%;
    height: 100%;
  }
  .pagination-bullet-active {
    background: #4A90E2 !important;
    opacity: 1;
  }
  .no-more {
    display: flex;
    flex-direction: column;
    height: 50%;
  }

  .no-more-img {
    width: 79px;
    margin: auto;
    margin-bottom: 0;
  }

  .no-more-text {
    margin-top: 0.2rem;
    color: #333;
    text-align: center;
  }
</style>
