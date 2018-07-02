<template>
  <div>
    <transition name="fade">
      <sy-loading v-show="isLoading"></sy-loading>
    </transition>
    <transition name="fade">
      <div v-show="!isLoading">
        <div class="contianer">
          <div class="wrapper">
            <!--头部-->
            <div class="header">
              <div class="btoHead">
                <div class="headCon">
                  <div class="turnback" @click="$router.go(-1)">
                    <img :src="siteInfo.cdn_host+'/static/images/common/turnback.png'" alt=""></div>
                  <div class="headTit1">选择公益联盟</div>
                  <div class="headGo" onclick="selectUnion('boc')">跳过</div>
                </div>
              </div>
            </div>

            <!--政府联盟-->
            <div class="unit" v-if="type == 'gove'">
              <div class="unitHead">- 政府联盟 -</div>
              <div class="unitCon">
                <ul class="cle">
                  <li v-for="(item, index) in unionList"
                      @click="item.union_free == '1' ? selectUnion(item.union_channel) : showTip()">
                    <div class="itemCon">
                      <div class="try" v-if="item.union_operation == '1'">
                        <img :src="siteInfo.cdn_host+'/static/images/index/test_run_v1.png'">
                      </div>

                      <div class="unitImg">
                        <img :src="item.union_free == '1' ? item.union_image : item.union_dis_image" alt="">
                      </div>
                      <div :class="item.union_free == '1' ? 'unitName' : 'unitName gray'">{{item.union_name}}</div>
                      <div class="unitInfo">{{item.union_desc ? item.union_desc : ''}}</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <!--企业联盟-->
            <div class="company" v-if="type == 'comp'">
              <div class="unitHead">- 政企联盟 -</div>
              <div class="unitCon unitCon2">
                <ul class="cle">
                  <li v-for="(item, index) in unionList"
                      @click="item.union_free == '1' ? selectUnion(item.union_channel) : showTip()">
                    <div class="itemCon">
                      <div class="try" v-if="item.union_operation == '1'">
                        <img :src="siteInfo.cdn_host+'/static/images/index/test_run_v1.png'">
                      </div>

                      <div class="unitImg">
                        <img :src="item.union_free == '1' ? item.union_image : item.union_dis_image" alt="">
                      </div>
                      <div :class="item.union_free == '1' ? 'unitName' : 'unitName gray'">{{item.union_name}}</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {getUnionByType, saveUnion} from '@/requests/index'
  import loading from '@/components/common/loading/loading.vue'

  export default {
    data() {
      return {
        isLoading: true,
        type: '',
        unionList: []
      }
    },
    created: function () {

    },
    mounted: function () {
      this.initData()
    },
    methods: {
      async initData() {
        let unionType = this.$route.params.unionType
        let a = await getUnionByType(unionType)
        this.type = a.type
        this.unionList = a.u
        this.isLoading = false
      },
      selectUnion(union) {
        saveUnion(union)
        this.$router.replace('/index')
      },
      showTip() {
        this.appjs.showToast('即将上线')
      }
    },
    components: {
      'sy-loading': loading,
    }
  }
</script>

<style scoped>
  .contianer {
    max-width: 1024px;
    margin: 0 auto
  }

  .header {
    width: 100%;
    background-color: #F03E53
  }

  .header .topHead {
    width: 100%;
    height: .4rem
  }

  .header .btoHead {
    width: 100%;
    height: .86rem;
    line-height: .86rem;
    color: #fff
  }

  .header .headCon {
    position: relative
  }

  .header .headTit {
    width: 1.8rem;
    font-size: .3rem;
    margin: 0 auto
  }

  .header .headGo {
    position: absolute;
    top: 50%;
    right: .2rem;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    font-size: .26rem
  }

  .unit {
    width: 100%
  }

  .unitHead {
    width: 100%;
    height: .93rem;
    line-height: .93rem;
    font-size: .24rem;
    color: #666;
    text-align: center;
    border-bottom: 1px solid #eee
  }

  .unitCon ul li {
    position: relative;
    padding: 0 .2rem;
    width: 50%;
    height: 2.2rem;
    float: left;
    box-sizing: border-box;
    border-right: 1px solid #eee;
    margin-top: -1px;
    border-bottom: 1px solid #eee
  }

  .unitCon ul li:nth-child(2n) {
    border-right: none;
    padding-left: 0
  }

  .unitCon ul li:nth-child(2n) .itemCon {
    padding-left: .2rem
  }

  .itemCon {
    width: 100%;
    border-top: 1px solid #eee
  }

  .itemCon .unitImg {
    text-align: center;
    margin-top: .29rem;
    margin-bottom: .12rem
  }

  .itemCon .unitImg img {
    width: .74rem;
    height: .66rem
  }

  .itemCon .unitName {
    padding: .03rem 0;
    text-align: center;
    font-size: .3rem;
    color: #333
  }

  .itemCon .gray {
    color: #999
  }

  .itemCon .unitInfo {
    text-align: center;
    font-size: .22rem;
    color: #999;
    margin-bottom: .23rem
  }

  .unitCon .itemCon .try {
    position: absolute;
    top: 0px;
    right: 0;
    width: .62rem;
    height: .64rem
  }

  .unitCon .itemCon .try img {
    width: 100%;
    height: 100%
  }

  .color {
    background-color: #f4f6f5
  }

  .more {
    text-align: center;
    font-size: .28rem;
    color: #999;
    line-height: 2.2rem
  }

  .more img {
    height: .28rem;
    width: .14rem;
    vertical-align: middle
  }

  .line {
    width: 100%;
    height: .23rem;
    background-color: #f4f6f5
  }

  .company ul li {
    height: 1.8rem
  }

  .company .itemCon .unitImg img {
    height: .62rem;
    width: .62rem
  }

  .company .itemCon .unitName {
    margin-bottom: .23rem
  }

  .company .more {
    line-height: 1.8rem
  }

  .itemCon {
    width: 100%;
    border-top: none;
  }

  .header .btoHead {
    width: 100%;
    height: 1.1rem;
    line-height: 1.3rem;
    color: #fff;
  }

  .unitCon ul li {
    height: 2.1rem;
    margin-top: 0;
    margin-bottom: -1px;
  }

  .unitCon ul {
    border-bottom: 1px solid #eee;
  }

  .itemCon .unitImg {
    margin-bottom: 0;
  }

  .itemCon .unitImg img {
    width: 0.66rem;
    height: 0.66rem;
  }

  .itemCon .unitInfo {
    width: 3.36rem;
    height: 0.32rem;
    text-align: center;
    font-size: 0.22rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .unitCon2 ul li {
    height: 1.7rem;
  }

  .more {
    border: none
  }

  .more img {
    width: 0.12rem;
    height: 0.2rem;
    vertical-align: baseline;
  }

  .headTit1 {
    text-align: center;
    width: 3rem;
    font-size: .3rem;
    margin: 0 auto;
  }

  .turnback {
    position: absolute;
    left: 0.3rem;
    top: 0.1rem;
    width: 0.17rem;
    height: 0.34rem;
  }

  .turnback img {
    width: 100%;
    height: 100%;
  }
</style>
