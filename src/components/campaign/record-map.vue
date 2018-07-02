<template xmlns="http://www.w3.org/1999/html">
  <div class="wrapper">
    <sy-loading :show="isLoading"></sy-loading>
    <transition name="fade">
      <div v-show="!isLoading" style="height: 100%;overflow: hidden;">
        <div class="activity-tab" :style="'transform: translate3d('+-classNameFn+'px, 0px, 0px);'" @touchmove.prevent>
          <div class="team-adopt">
            <div class="banner swiper-container2 swiper-no-swiping">
              <div class="swiper-wrapper ">
                <div class="swiper-slide" v-for="item in dataSource">
                  <div class="content-text">
                    {{item.name}}认养：{{item.num}}棵
                  </div>
                </div>
              </div>
            </div>
            <div class="img-list" style="height:100%;">
              <img :src="siteInfo.cdn_host + '/static/images/campaign/team1.png'" alt=""style="height:30.5%;">
              <img :src="siteInfo.cdn_host + '/static/images/campaign/team2.png'" alt=""style="height:31.5%;">
              <img :src="siteInfo.cdn_host + '/static/images/campaign/team3.png'" alt=""style="height:38.5%;">
            </div>
          </div>
          <div class="person-adopt">
            <transition name="fade-up"
                        v-on:enter="enter"
                        v-on:leave="leave">
              <div class="show-text" :class="classText" v-if="antType">
                {{showText}}
              </div>
            </transition>
            <div class="person-img">
              <img class="bg" :src="siteInfo.cdn_host + '/static/images/campaign/bigbg.png'" alt="">
              <div class="textWish">已认养{{allType[3].treeNum}}棵</div>
              <div class="textBecome">已认养{{allType[0].treeNum}}棵</div>
              <div class="textLover">已认养{{allType[1].treeNum}}棵</div>
              <div class="textChildren">已认养{{allType[2].treeNum}}棵</div>
              <div class="textOlder">已认养{{allType[4].treeNum}}棵</div>
            </div>
          </div>
        </div>
        <div class="adopt-btns">
          <!--<div class="person-b" :class="{btnActivity:type==='person'}" @click="type='person'">
            个人</br>
            认养
          </div>-->
          <!--<div class="team-b" :class="{btnActivity:type==='team'}" @click="type='team'">
            团队</br>
            认养
          </div>-->
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Swiper from '../../../static/js/plugins/swiper/swiper-3.4.2.min'
  import * as type from '../../requests/campaign'
  import * as utils from  "../../packages/utils/extension"

  export default {
    data() {
      return {
        isLoading: true,
        dataSource: [
          {name: '中国石油化工集团公司',
          num:23},
          {name: '中国石油天然气集团公司',
            num:22},
          {name: '国家电网公司',
            num:29},
          {name: '中国工商银行股份有限公司',
            num:73},
          {name: '中国建设银行股份有限公司',
            num:60},
          {name: '中国农业银行股份有限公司 ',
            num:98},
          {name: '中国银行股份有限公司',
            num:62},
          {name: '中国移动通信集团公司',
            num:70},
          {name: '中国建筑工程总公司',
            num:34},
          {name: '中国海洋石油总公司',
            num:49},
          {name: '中国铁道建筑总公司',
            num:26},
          {name: '中国中铁股份有限公司',
            num:75},
          {name: '上海汽车集团股份有限公司',
            num:67},
          {name: '中国人寿保险(集团)公司',
            num:38},
          {name: '中国中化集团公司',
            num:86},
          {name: '中国南方电网有限责任公司',
            num:41},
          {name: '中国第一汽车集团公司',
            num:43},
          {name: '东风汽车公司',
            num:93},
          {name: '中国兵器工业集团公司',
            num:79},
          {name: '中国中信集团有限公司',
            num:33},],
        type: 'person',
        screenW: null,
        timer: null,

        allType:[
          {
            "areaName": "结义园",
            "areaUrl": "1.jpg",
            "treeNum": 0,
            "memberLists": [
              {
                "memberName": "",
                "date": "12月29日",
                "photoUrl": null,
                "number": 0,
                "type": "TREE"
              }
            ]
          },
          {
            "areaName": "情人坡",
            "areaUrl": "1.jpg",
            "treeNum": 2,
            "memberLists": [
              {
                "memberName": "",
                "date": "12月29日",
                "photoUrl": null,
                "number": 0,
                "type": "TREE"
              }
            ]
          },
          {
            "areaName": "亲子邦",
            "areaUrl": "1.jpg",
            "treeNum": 3,
            "memberLists": [
              {
                "memberName": "",
                "date": "12月29日",
                "photoUrl": null,
                "number": 0,
                "type": "TREE"
              }
            ]
          },
          {
            "areaName": "许愿林",
            "areaUrl": "1.jpg",
            "treeNum": 0,
            "memberLists": [
              {
                "memberName": "",
                "date": "12月29日",
                "photoUrl": null,
                "number": 0,
                "type": "TREE"
              }
            ]
          },
          {
            "areaName": "福寿苑",
            "areaUrl": "1.jpg",
            "treeNum": 0,
            "memberLists": [
              {
                "memberName": "",
                "date": "12月29日",
                "photoUrl": null,
                "number": 0,
                "type": "TREE"
              }
            ]
          }
        ],
        allTypeC:[
          {
            "areaName": "结义园",
            "areaUrl": "1.jpg",
            "treeNum": 0,
            "memberLists": [
              {
                "memberName": "",
                "date": "12月29日",
                "photoUrl": null,
                "number": 0,
                "type": "TREE"
              }
            ]
          },
          {
            "areaName": "情人坡",
            "areaUrl": "1.jpg",
            "treeNum": 2,
            "memberLists": [
              {
                "memberName": "",
                "date": "12月29日",
                "photoUrl": null,
                "number": 0,
                "type": "TREE"
              }
            ]
          },
          {
            "areaName": "亲子邦",
            "areaUrl": "1.jpg",
            "treeNum": 3,
            "memberLists": [
              {
                "memberName": "",
                "date": "12月29日",
                "photoUrl": null,
                "number": 0,
                "type": "TREE"
              }
            ]
          },
          {
            "areaName": "许愿林",
            "areaUrl": "1.jpg",
            "treeNum": 0,
            "memberLists": [
              {
                "memberName": "",
                "date": "12月29日",
                "photoUrl": null,
                "number": 0,
                "type": "TREE"
              }
            ]
          },
          {
            "areaName": "福寿苑",
            "areaUrl": "1.jpg",
            "treeNum": 0,
            "memberLists": [
              {
                "memberName": "",
                "date": "12月29日",
                "photoUrl": null,
                "number": 0,
                "type": "TREE"
              }
            ]
          }
        ],

        showText: '',
        showType: 0,
        antType:false
      }
    },
    created() {
      this.screenW = window.screen.width;
      this.getData()
      this.allType=utils['deepCopy'](this.allTypeC)
    },
    mounted() {
      this.isLoading = false
      this.$nextTick(() => {
        new Swiper('.swiper-container2', {
          pagination: '.swiper-pagination',
          loop: true,
          speed: 800,
          autoplay: 1000,
          noSwiping: true,
          direction: 'vertical',
          slidesPerView: 3,
          slidesPerGroup: 1,
          spaceBetween: 20
        })
      })
    },
    computed: {
      classNameFn() {
        if (this.type === 'team') {
          return 0
        } else {
          return this.screenW
        }
      },
      classText() {
        var str = "wish"
        switch (this.showType) {
          case 0:
            str = 'become';
            break;
          case 1:
            str = 'lover';
            break;
          case 2:
            str = 'children';
            break;
          case 3:
            str = 'wish';
            break;
          case 4:
            str = 'older';
            break;
        }
        return str
      }
    },
    methods: {
      enter(){
        setTimeout(()=>{
          this.antType=false
        },2000)
      },
      leave(){
      },
      randowShow() {
        clearTimeout(this.timer)
        var timeout = 5000
        var temp = this.showType
        this.showType = parseInt(Math.random() * 5)
        var dataArr = this.allTypeC[this.showType].memberLists.pop()
        if(!dataArr){
          this.allTypeC[this.showType].memberLists=utils['deepCopy'](this.allType[this.showType].memberLists)
          dataArr = this.allTypeC[this.showType].memberLists.pop()
          if(!dataArr){
              this.randowShow()
            return;
          }
        }
        this.showText=dataArr.memberName+"认养"+dataArr.number+'棵'
        //this.showText = this.showType
        this.antType=true;
        this.timer = setTimeout(() => {
          this.antType=true;
          this.randowShow()
        }, timeout)
      },
      getData() {
        type['myAppleTreeAreaMap']().then((res) => {
          var res = res.data
          if (res.code === 200) {
            this.allType=res.data.areaList
            this.allTypeC=utils['deepCopy'](res.data.areaList)
            for(var i=0;i<this.allType.length;i++){
              if(this.allType[i].memberLists.length!=0){
                this.randowShow()
                break;
              }
            }
          }
        })
      },
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
  @import url('../../../static/css/plugins/swiper/swiper-3.4.2.min.css');

  .wrapper {
    overflow: hidden;
    width: 100%;
    height: 100%;

  }

  .team-adopt, .person-adopt {
    width: 100%;
    -webkit-flex-shrink: 0;
    -ms-flex: 0 0 auto;
    flex-shrink: 0;
    height: 100%;
    position: relative;

  }

  .person-adopt {
    position: relative;
    overflow:hidden;
  }

  .banner {
    overflow: hidden;
    position: relative;
    height: 2.4rem;
    margin-top: 0.4rem;
    padding-bottom: 0.2rem
  }

  .swiper-slide {
    position: relative;
    margin-left: 0.3rem;
  }

  .content-text {
    float: left;
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: .24rem;
    color: #666666;
    padding: 0 0.41rem;
    border-radius: 0.3rem;
    background: #fff;
  }

  .swiper-slide-active {
    transition: opacity .8s;
    opacity: 0.2
  }

  .swiper-slide-next {
    transition: opacity .8s;
    opacity: 0.6
  }

  .swiper-slide-prev {
    transition: opacity .8s;
    opacity: 0.1
  }

  .adopt-btns {
    z-index: 99;
    position: absolute;
    right: 0;
    bottom: 1rem;
  }

  .person-b {
    border-radius: .08rem 0 0 0rem;
  }

  .team-b {
    border-radius: 0rem 0 0 0.08rem;
  }

  .person-b, .team-b {
    background: #FFFFFF;
    padding: 0.2rem;
    font-size: .28rem;
    color: #333333;
  }

  .btnActivity {
    background: #A1BBF4;
    color: #fff;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  .fade-up-enter-active, .fade-up-leave-active {
    transition: all 0.5s;
  }

  .fade-up-enter, .fade-up-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    transform: translateY(0.5rem);
    opacity: 0;
  }

  .activity-tab {
    transition: transform .3s;
    position: relative;
    z-index: 1;
    display: flex;
    transition-property: transform;
    box-sizing: content-box;
    height: 100%;
  }

  .show-text {
    height: .62rem;
    line-height: 0.62rem;
    font-size: .24rem;
    color: #666666;
    position: absolute;
    padding: 0 0.41rem;
    border-radius: 0.3rem;
    background: #fff;
    z-index: 99;
  }
  .textWish,.textBecome,.textLover,.textChildren, .textOlder{
    font-weight: 600;
    color: rgb(68,48,25);
    font-size: 0.26rem;
  }
.textWish{
  z-index: 99;
  position: absolute;
  top: 16.5%;
  left: 53%;
}
  .textBecome{
    z-index: 99;
    position: absolute;
    top: 34.2%;
    left: 16%;
  }
  .wish {
    top: 6%;
    right: 28%;
  }

  .become {
    top: 24%;
    left: 6%;
  }

  .textLover{
    z-index: 99;
    position: absolute;
    top: 50.7%;
    left: 65%;
  }
  .lover {
    top: 40%;
    left: 53%;
  }
  .textChildren{
    z-index: 99;
    position: absolute;
    top: 76%;
    left: 57%;
  }
  .children {
    top: 66%;
    left: 45%;
  }
  .textOlder{
    z-index: 99;
    position: absolute;
    top: 93%;
    left: 17%;
  }
  .older {
    top: 82%;
    left: 7%;
  }

  .img-list {
    position: absolute;
    top: 0;
    img {
      display: inline-block;
      float: left;
      width: 100%;
      border: 0;
      margin-top: -1px;
    }
  }
  .person-img{
    position: absolute;
    top:0;
    width: 100%;
    height: 100%;
    img{
      display: inline-block;
      border: 0;
      float: left;
      width: 100%;
      height: 100%;
      margin-top: -1px;
    }
  }
</style>
