<template>
  <div class="container">
    <sy-header titleText="善源商场"></sy-header>
    <sy-loading :show="isLoading"></sy-loading>
    <transition name="fade">
      <div v-show="!isLoading" :style="{height: isApp ? '100%' : 'calc(100% - 0.88rem)', width: '100%'}">
        <div class="search-wrapper">
          <div class="search-input-wrapper">
            <b class="search-icon"></b>
            <input v-model="key" class="search-input" ref="search_input" type="text" name="key" placeholder="搜索"/>
            <b class="search-del-icon" @click="searchDel()"></b>
          </div>
          <div class="search-text" @click="search()">
            搜索
          </div>
        </div>
        <div class="content-wrapper">
          <div class="category-wrapper">
            <ul>
              <li v-for="(item, index) in category_list" :class="'category-text-wrapper ' + (index === cur_category_index ? 'select' : '')" @click="clickCategory(index)">
                <div class="category-text">{{item.gcName}}</div>
              </li>
            </ul>
          </div><div class="category-content-wrapper">
          <div class="ad" @click="goTo(cur_category.imgTouchUrl)">
            <img class="ad-wrapper" :src="cur_category.img" />
          </div>

          <div class="item-wrapper" v-for="(item, index) in cur_category_sub">
            <div class="item-title">{{item.gcName}}</div>
            <div class="item-content-wrapper">
              <div class="line"></div>
              <div style="overflow: hidden;">
                <div class="item-content" v-for="(v, k) in item.subGoodsClassList" @click="appjs.syJsbLaunchWebview(siteInfo.host + '/syshop/goods_list?cate_id='+v.gcId)">
                  <div class="item-content-img-wrapper" :style="{background: 'url('+ v.gcImage + ') center center / contain no-repeat'}">
                  </div>
                  <div class="item-content-title">
                    {{v.gcName}}
                  </div>
                </div>
              </div>
              <div class="line"></div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {bizbuy_category} from '@/requests/bizbuy'
  import Swiper from '../../../../static/js/plugins/swiper/swiper-3.4.2.min'
  import ls from '@/modules/_ls/index.js'
  export default {
    data () {
      return {
        isLoading: true,
        category_list: {},
        cur_category_index: 0,
        cur_category: {},
        cur_category_sub: {},
        key: '',
        isApp: true,
        showTip: false,
        showDg: false
      }
    },
    created: function () {
      let showTipSwiper = ls.getLsItem('showTips')
      if(showTipSwiper === null) {
        this.showTip = true
        this.$nextTick(() => {
          this.swiper = new Swiper(this.$refs.swiper, {
            direction: 'horizontal',
            loop: false,
            pagination: '.swiper-pagination',
            paginationType: 'bullets'
          })
        })
      }
    },
    mounted: function () {
      this.initData()
      this.appjs.syJsbGetClientInfo().then((res)=> {
        if(res['platform'] === 'web') {
          this.isApp = false
        } else {
          this.isApp = true
        }
      })
    },
    methods: {
      initData () {
        bizbuy_category('syshop').then((res) => {
          if(res.data.code === 200) {
            let content = res.data.data.bizClassList
            this.category_list = content
            this.cur_category = this.category_list[this.cur_category_index]
            this.cur_category_sub = this.category_list[this.cur_category_index].subGoodsClassList
            this.isLoading = false
          }
        })
      },
      clickCategory(index) {
        this.cur_category_index = index
        this.cur_category_sub = this.category_list[this.cur_category_index].subGoodsClassList
        this.cur_category = this.category_list[this.cur_category_index]
      },
      goTo(url) {
        if(url === null || url.length === 0) {
          return false
        }
        this.appjs.syJsbLaunchWebview(url)
      },
      searchDel() {
        this.key = ''
        this.$refs.search_input.focus()
      },
      search() {
        this.$router.push('/syshop/goods_list?key=' + this.key)
      },
      getAgree(){
        this.showDg = !this.showDg
        if (this.showDg === true) {
          ls.setLsItem('showTips', 1)
        } else {
          ls.removeLsItem('showTips')
        }
      },
    }
  }
</script>

<style scoped>
  @import "/static/css/plugins/swiper/swiper-3.4.2.min.css";
  .container {
    font-size: 0.28rem;
    background: #F7F9FA;
    height: 100%;
  }
  .search-wrapper {
    height: 0.98rem;
    width: 100%;
    background: #ffffff;
    position: relative;
  }
  .search-bg {
    height: 0.98rem;
  }
  .search-input-wrapper {
    display: inline-block;
    height: 0.6rem;
    width: 5.86rem;
    border-radius: 60px;
    background: #f6f6f6;
    margin-top: 0.19rem;
    margin-left: 0.3rem;
    overflow: hidden;
    position: relative;
  }
  .search-icon {
    display: inline-block;
    height: 0.24rem;
    width: 0.24rem;
    background: url("/static/images/common/icon-ser.png") no-repeat;
    background-size: 100% 100%;
    margin-left: 0.22rem;
    margin-top: 0.18rem;
    vertical-align: top;
  }
  .search-input {
    display: inline-block;
    height: 0.4rem;
    width: 4rem;
    background: transparent;
    font-weight: 400;
    margin-left: 0.24rem;
    margin-top: 0.1rem;
    vertical-align: top;
  }
  .search-del-icon {
    display: inline-block;
    height: 0.28rem;
    width: 0.28rem;
    background: red;
    position: absolute;
    top: 0.16rem;
    right: 0.2rem;
    background: url("/static/images/common/icon-close.png") no-repeat;
    background-size: 100% 100%;
  }
  .search-text {
    display: inline-block;
    font-size: 0.32rem;
    line-height: 0.6rem;
    color: #666a7f;
    margin-left: 0.28rem;
    overflow: hidden;
    vertical-align: top;
    margin-top: 0.18rem;
  }
  .content-wrapper {
    width: 100%;
    height: calc(100% - 0.98rem);
    position: relative;
    overflow-x: hidden;
  }
  .category-wrapper {
    width: 1.8rem;
    background: #ffffff;
    display: inline-block;
    position: relative;
    max-height: 99%;
    box-sizing: border-box;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .category-text-wrapper {
    width: 100%;
    height: 1.02rem;
    border-top: 1px solid #F7F9FA;
  }
  .category-text {
    height: 0.42rem;
    text-align: center;
    vertical-align: middle;
    margin-top: 0.3rem;
    color: #828D9F;
  }
  .select {
    background-color: #F7F9FA;
  }

  .select .category-text {
    border-left: 0.08rem solid #4A90E2;
    color: #4A90E2;
  }
  .category-content-wrapper {
    width: calc(5.7rem + 10px);
    padding: 0.2rem 0.18rem 0.2rem 0.2rem;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: top;
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    position: absolute;
    top: 0;
    left: 1.8rem;
  }
  .ad {
    width: 5.32rem;
    height: 1.84rem;
    overflow: hidden;
  }
  .ad-wrapper {
    width: 5.32rem;
  }
  .item-wrapper {

  }
  .item-title {
    color: #666A7F;
    height: 0.76rem;
    line-height: 0.76rem;
  }
  .item-content-wrapper {
    display: inline-block;
    overflow: hidden;
    background: #ffffff;
    width: 5.32rem;
  }
  .line {
    background: #ffffff;
    height: 0.14rem;
  }
  .item-content {
    height: 2.29rem;
    width: 1.76rem;
    float: left;
    background: #ffffff;
  }
  .item-content-img-wrapper {
    width: 1.16rem;
    height: 1.24rem;
    background-size: 100% 100%;
    margin-left: 0.3rem;
    margin-top: 0.28rem;
  }
  .item-content-title {
    line-height: 0.33rem;
    margin-top: 0.16rem;
    margin-bottom: 0.28rem;
    text-align: center;
    color: #818C9E;
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
</style>
