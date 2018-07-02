<template>
  <div class="top-content">
    <sy-loading :show="isLoading"></sy-loading>
    <transition name="fade">
      <div v-show="!isLoading">
        <div class="banner swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in dataIndex.banner" @click="goUrl(item.bannerUrl)">
              <img :src="item.bannerImg" alt="">
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
        <div class="middle">
          <h3>「我的苹果树」扶贫认养第一期 2018-04-15</h3>
          <div class="text">
            <p class=" one"><span class="red">{{dataIndex.helpNum}}</span>人助力</p>
            <p class=" p-border two"><span class="red">{{dataIndex.peopleNum}}</span>人认养</p>
            <p class=" three"><span class="red">{{dataIndex.treeNum}}</span>&nbsp;/&nbsp;<span class="red">5500</span>棵已认养
            </p>
          </div>
          <div class="record" @click="jumptoRecords">我的认养记录 <span></span></div>
          <div class="text new-report">
            <div class="float-left" @click="jumptoJD">
              <img :src="siteInfo.cdn_host + '/static/images/campaign/jd.png'" alt="">
              <p class="img-text">基地认证</p>
            </div>
            <div class="float-left" @click="jumptoJZ">
              <img :src="siteInfo.cdn_host + '/static/images/campaign/jz.png'" alt="">
              <p class="img-text">进展播报</p>
            </div>
            <div class="float-left" @click="jumptoMAP">
              <img :src="siteInfo.cdn_host + '/static/images/campaign/ry.png'" alt="">
              <p class="img-text">认养地图</p>
            </div>
            <div class="float-left" @click="jumptoFAQ">
              <img :src="siteInfo.cdn_host + '/static/images/campaign/cj.png'" alt="">
              <p class="img-text">常见问题</p>
            </div>
          </div>
        </div>
        <div class="blank"></div>
        <div class="middle">
          <div class="text project-b">
            <p class="float-left padding " :class="{'activity':activity=='one'}" @click="changeTab('one')">项目详情</p>
            <p class="float-left padding " :class="{'activity':activity=='two'}" @click="changeTab('two')">
              认养名单
              <!--<span class="blue">6800+</span>-->
            </p>
            <p class="float-left padding " :class="{'activity':activity=='three'}" @click="changeTab('three')">助力人名单</p>
          </div>
        </div>
        <div class="wrapper">
          <div class="wrapper-content activity-tab" :style="'transform: translate3d('+-classNameFn+'px, 0px, 0px);'">
            <div class="table table1">
              <div class="table-content" v-show="activity==='one'">
                <div class="text padding10">
                  <div class="float-left">
                    <p class="time">2017年8月8日</p>
                    <p class="text-light">开始时间</p>
                  </div>
                  <div class="float-left">
                    <p class="time">2017年8月8日</p>
                    <p class="text-light">截止时间</p>
                  </div>
                </div>
                <div class="middle text-light font30">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin
                </div>
              </div>
            </div>
            <div class="table table2">
              <div class="table-content" v-show="activity==='two'">
                <ul class="table-ul">
                  <li v-for="item in memberList">
                    <img :src="item.photoUrl" alt="">
                    <span class="name">{{item.memberName}}</span>
                    <div class="time">
                      <!--<p>认养{{item.number}}棵苹果树</p>-->
                      <p>{{item.name}}</p>
                      <p class="p-time">{{item.date}}</p>
                    </div>
                  </li>
                </ul>
                <!--<div class="more">-->
                <!--加载更多-->
                <!--</div>-->
              </div>
            </div>
            <div class="table table3">
              <div class="table-content" v-show="activity==='three'">
                <ul class="table-ul">
                  <li v-for="item in helpMemberList">
                    <img :src="item.memberPhoto" onerror="src='/static/images/campaign/head01.png'" alt="">
                    <span class="name">{{item.memberName}}</span>
                    <div class="time">
                      <p>第{{item.number}}位</p>
                      <p class="p-time">{{item.date}}</p>
                    </div>
                  </li>
                </ul>
                <!--<div class="more">-->
                <!--加载更多-->
                <!--</div>-->
              </div>
            </div>
          </div>
        </div>
        <div class="footer iphonex-bottom-div">
          <div class="item" @click="callPhone">
            <img src="https://cdnres.17shanyuan.com/bocm/platformjs/static/image/syShop/icon-bkf.png" alt="">
            <p>咨询</p>
          </div>
          <!--<div class="btn b-one" @click="jumptoTeamAdoption">团队认养</div>-->
          <div class="btn " @click="chooseAdoption()">我要认养</div>
          <div class="ask" v-show="ask">
            <a @click="callPhone">电话联系</a>
            <a class="a-last" @click="callQQ">QQ咨询</a>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Swiper from '../../../static/js/plugins/swiper/swiper-3.4.2.min'
  import * as type from '../../requests/campaign'
  import {getCookie, setCookie} from '../../packages/utils/extension'

  export default {
    data() {
      return {
        activity: "two",
        screenW: 0,
        ask: false,
        isLoading: true,
        dataIndex: {
          "treeNum": 0,
          "helpNum": 0,
          "banner": [],
          "peopleNum": 0
        },
        recordList: "",
        assistancelist: '',
        cur1: 1,
        cur2: 1,
        getDataDone: true,
        memberList: [],
        helpMemberList: [],
        is_share: false,
        payOpenId:'',
        computedTime: "604800000"
      }
    },
    created() {
      this.is_share = /is_share=yes/ig.test(window.location.href)
      this.screenW = window.screen.width;
      this.getData()
      this.getTreeMemberList()
      this.getTreeHelpMemberList()

    },
    computed: {
      classNameFn() {
        if (this.activity === 'one') {
          return 0
        } else if (this.activity === 'two') {
          this.getDataDone = true
          return this.screenW
        } else {
          this.getDataDone = true
          return this.screenW * 2
        }
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
      this.appjs.syJsbSetGoBackUrl('detailGoBack()');
      let that = this;
      window.detailGoBack = function() {
        let iUrl = that.siteInfo.host + '/bocm/index.php?act=index&op=index&appVariant=pwcn';
//        window.location.href = iUrl;
        that.appjs.syJsbLaunchWebview(iUrl);
      };
    },
    methods: {
      initSwiper() {
        this.$nextTick(() => {
          new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            loop: true,
            autoplay: 3000,
            autoplayDisableOnInteraction: false,
          })
          var el = document.getElementsByClassName('swiper-slide')
          el[0].addEventListener('click', () => {
            this.goUrl(this.dataIndex.banner[el.length - 3].bannerUrl)
          })
          el[el.length - 1].addEventListener('click', () => {
            this.goUrl(this.dataIndex.banner[0].bannerUrl)
          })
        })
      },
      getData() {
        var that = this
        type['myAppleTreeIntroduce']().then(function (res) {
          that.isLoading = false
          var res = res.data
          if (res.code === 200) {
            that.dataIndex = res.data;
            that.initSwiper()
          }
        })
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
          switch (this.activity) {
            case "two":
              ++this.cur1
              this.getTreeMemberList()
              break;
            case "three":
              ++this.cur2
              this.getTreeHelpMemberList()
              break;
          }
        }
      },
      getTreeMemberList() {
        var that = this
        type['treeMemberList'](that.cur1).then(function (res) {
          var res = res.data
          if (res.code === 200) {
            that.memberList = that.memberList.concat(res.data.memberList)
            if (res.data.memberList.length != 0) {
              that.getDataDone = true;
            }
          }
        })
      },
      getTreeHelpMemberList() {
        var that = this
        type['treeHelpMemberList'](that.cur2).then(function (res) {
          var res = res.data
          if (res.code === 200) {
            that.helpMemberList = that.helpMemberList.concat(res.data.helpMemberList)
            if (res.data.helpMemberList.length != 0) {
              that.getDataDone = true;
            }
          }
        })
      },
      callPhone() {
        var member_mobile = '400-666-7308'
        if (!!member_mobile) {
          if (this.is_share) {
            window.location.href = 'tel:' + member_mobile
          } else {
            this.appjs.syJsbCallPhone(member_mobile)
          }
        } else {
          this.appjs.syJsbAlert('暂无联系方式')
        }
      },
      callQQ() {

      },
      goUrl(url) {
        window.location.href = url
        console.log(url)
      },
      changeTab(p) {
        this.activity = p
      },
      chooseAdoption() {
        let cAUrl = "";
        this.is_share ? cAUrl = this.siteInfo.host + '/choose/adoption?is_share=yes' : cAUrl = this.siteInfo.host + '/choose/adoption';
        if(this.$route.query.openid){
          this.payOpenId = this.$route.query.openid;
          setCookie("payOpenId",this.payOpenId,1);
        }else{
          let token = getCookie('token');
          if(!token){
            this.jumpToLogin(cAUrl);//登录
          }else{
            this.appjs.syJsbLaunchWebview(cAUrl)
          }
          console.log('token: '+token + ' payOpenId: '+ this.payOpenId + ' url: '+ cAUrl);
        }

      },
      jumpToLogin(url) {
        let callbackUrl = encodeURIComponent(url);
        window.location.href = this.siteInfo.host_old + '/api/index.php?act=login&callback=' + callbackUrl;
      },
      jumptoRecords() {
        let token = getCookie('token');
        let rUrl = "";
        if (this.is_share) {
          rUrl = this.siteInfo.host + '/adoptionRecords?is_share=yes'
        } else {
          rUrl = this.siteInfo.host + '/adoptionRecords'
        }
        if(!token){
          this.jumpToLogin(rUrl);//登录
        }else{
          this.appjs.syJsbLaunchWebview(rUrl);
        }
      },
      jumptoTeamAdoption() {
        if (this.is_share) {
          this.$router.push({path: '/teamAdoption', name: 'teamAdoption', query: {is_share: 'yes'}})
        } else {
          this.$router.push('/teamAdoption')
        }
      },
        jumptoJD(){
            let url = this.siteInfo.host + '/baseAttestation'
            this.appjs.syJsbLaunchWebview(url)
        },
        jumptoJZ(){
            let url = this.siteInfo.host + '/report'
            this.appjs.syJsbLaunchWebview(url)
        },
        jumptoMAP(){
            let url = this.siteInfo.host + '/adoptMap'
            this.appjs.syJsbLaunchWebview(url)
        },
        jumptoFAQ(){
            let url = this.siteInfo.host + '/appletreeDetail/fAQ'
            this.appjs.syJsbLaunchWebview(url)
        },
    },
    components: {}
  }
</script>

<style lang="scss">
  @import url('../../../static/css/plugins/swiper/swiper-3.4.2.min.css');

  .top-content {
    -webkit-overflow-scrolling:touch
  }

  .banner {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 5.25rem;
  }

  .swiper-pagination-bullet {
    width: 0.1rem;
    height: 0.1rem;
  }

  .swiper-pagination-bullet-active {
    width: 0.3rem;
    transition: width .1s;
    border-radius: 0.05rem;
  }

  .middle {
    font-weight: 300;
    padding: 0.22rem 0.3rem 0;
  }

  h3 {
    font-size: .34rem;
    color: #4B4F63;
    line-height: .50rem;
  }

  .text {
    font-size: .26rem;
    color: #666A7F;
    line-height: .26rem;
    overflow: hidden;
    display: flex;
    box-sizing: border-box;
    flex-direction: row;
    margin-top: 0.19rem;
  }

  .float-left {
    text-align: center;
    flex: 1;
  }

  .float-left img {
    width: 1rem;
    margin-bottom: 0.12rem;
  }

  .p-border {
    border-right: 1px solid #DADEE4;
    border-left: 1px solid #DADEE4;
  }

  .red {
    color: #ef4f4f;
  }

  .blue {
    color: #4a90e2;
  }

  .one {
    text-align: center;
    padding: 0.02rem 0;
    width: 1.7rem;
  }

  .two {
    text-align: center;
    padding: 0.04rem 0;
    width: 2.04rem;
  }

  .three {
    text-align: center;
    padding: 0.02rem 0;
    width: 3.25rem;
  }

  .new-report {
    border-top: 1px solid #DADEE4;
    padding: 0.29rem 0;
    margin-top: 0.3rem;
  }

  .img-text {
    margin-top: 0.12rem;
    font-size: .28rem;
    color: #606060;
    letter-spacing: 0;
    font-weight: normal;
  }

  .blank {
    background: #F7F9FA;
    height: 0.2rem;
  }

  .project-b {
    height: 0.9rem;
  }

  .padding {
    font-size: .30rem;
    height: 0.9rem;
    line-height: 0.9rem;
    font-weight: 300;
    border-bottom: 1px solid #DADEE4;
    box-sizing: border-box;
    width: 1.6rem;
    flex: 1;
  }

  .activity {
    font-weight: normal;
    border-bottom: .04rem solid #4A90E2;
  }

  .width16rem {
    flex: 1;
  }

  .wrapper {
    overflow: hidden;
    margin-bottom: 1rem;
  }

  .wrapper-content {
    position: relative;
    z-index: 1;
    display: flex;
    transition-property: transform;
    box-sizing: content-box;
  }

  .activity-tab {
    transition: transform .3s;
  }

  .table {
    width: 100%;
    margin-top: 0.19rem;
    -webkit-flex-shrink: 0;
    -ms-flex: 0 0 auto;
    flex-shrink: 0;
    height: 100%;
    position: relative;
  }

  .table2, .table3 {
    margin-top: 0rem;
  }

  .time {
    font-size: .30rem;
    color: #4B4F63;
    padding-bottom: 0.06rem;
  }

  .text-light {
    font-size: .24rem;
    color: #666A7F;
  }

  .padding10 {
    padding: 0.1rem;
  }

  .font30 {
    font-size: .30rem;
    line-height: .46rem;
  }

  .record {
    margin: 0.3rem 0 0;
    font-size: .28rem;
    color: #676A7E;
    letter-spacing: 0;
    background: url("../../../static/images/order/arrow-more.png") no-repeat right center;
    background-size: 0.14rem;
  }

  .record span {
    float: right;
    padding-right: 0.3rem;
  }

  .table-ul {
    padding: 0 0.3rem;
  }

  .table-ul li {
    height: 1.36rem;
    border-bottom: 1px solid #DADEE4;
  }

  .table-ul li img {
    float: left;
    width: 0.8rem;
    margin: 0.28rem 0.24rem 0 0;
    border-radius: 50%;
  }

  .table-ul .name {
    font-size: .30rem;
    float: left;
    margin-top: 0.49rem;
    color: #4B4F63;
    display: inline-block;
    width: 2rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .table-ul .time {
    float: right;
    margin-top: 0.3rem;
    font-size: .26rem;
    text-align: right;
    color: #4B4F63;
  }

  .p-time {
    color: #818C9E;
    font-weight: 300;
    margin-top: 0.06rem;
  }

  .footer {
    position: fixed;
    z-index: 99;
    bottom: 0;
    background: #fff;
    width: 100%;
    height: 1rem;
    border-top: 1px solid #DADEE4;
  }

  .item {
    float: left;
    width: 1.5rem;
    text-align: center;
    font-size: .20rem;
    color: #666A7F;
    letter-spacing: 0;
  }

  .item img {
    width: 0.42rem;
    margin-top: 0.14rem;
  }

  .btn {
    margin-top: 0.08rem;
    background: #4A90E2;
    border-radius: .08rem;
    width: 4.5rem;
    height: 0.8rem;
    float: left;
    text-align: center;
    font-size: .28rem;
    line-height: 0.8rem;
    color: #FFFFFF;
    letter-spacing: 0;
    margin-left: 0.6rem;
  }

  .b-one {
    margin-right: 0.3rem;
  }

  .ask {
    position: absolute;
    left: .1rem;
    bottom: 1.2rem;
    width: 2.2rem;
    border: 1px solid #dadee4;
    border-radius: .08rem;
    background-color: #fff;
  }

  .ask:before {
    content: "";
    position: absolute;
    left: .5rem;
    bottom: -.34rem;
    border: .16rem solid transparent;
    border-top: .18rem solid #dadee4;
  }

  .ask:after {
    content: "";
    position: absolute;
    left: .5rem;
    bottom: -.33rem;
    border: .16rem solid transparent;
    border-top: .18rem solid #fff;
  }

  .ask a {
    text-align: center;
    display: block;
    font-size: .28rem;
    color: #4b4f63;
    line-height: .92rem;
    border-bottom: 1px solid #dadee4;
  }

  .ask .a-last {
    border-bottom: none;
  }

  .more {
    font-size: .26rem;
    height: 0.93rem;
    line-height: 0.96rem;
    text-align: center;
    color: #818C9E;
    background: url("../../../static/images/order/arrow-more.png") no-repeat 4.4rem center;
    background-size: 0.14rem;
  }

  .swiper-slide img {
    width: 100%;
    height: 100%;
  }
</style>
