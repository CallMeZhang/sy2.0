<template>
  <div>
    <sy-header titleText="善源商场"></sy-header>
    <sy-loading :show="isLoading"></sy-loading>
    <transition name="fade">
      <div v-show="!isLoading">
        <div class="contianer">
          <p class="headJf">{{dataType.title}}</p>
          <div class="headNav">
            <ul class="li-wrapper">
              <li v-for="(item,index) in dataType.syShopClassList" :class="{'margin0':(index+1)%4==0&&index!==0}"
                  @click="goShanYanMarket(item.gcId)">
                <img v-lazy="item.gcImage">
                <p>{{item.gcName}}</p>
              </li>

            </ul>
          </div>
          <div class="blank"></div>
          <div class="love-goods" v-if="dataList.result[0].goodsList.length!==0">
            <p class="love-title">{{dataList.result[0].topType}}</p>
            <p class="descript">{{dataList.result[0].topTypeDesc}}</p>
            <div class="goods-wraper">
              <ul class="scoll-wrapper"
                  :style="'width:'+(dataList.result[0].goodsList.length*2.9+(dataList.result[0].goodsList.length-1)*0.15+0.23*2)+'rem'">
                <li v-for="item in dataList.result[0].goodsList"
                    @click="goDetail(item.goodsUrl,item.freemarkUrl)">
                  <div class="img-list">
                    <img v-lazy="item.goodsImage" alt="">
                    <span>{{item.goodsStorageDesc}}</span>
                  </div>
                  <p class="goods-name">{{item.goodsName}}</p>
                  <p class="jifen "><span class="money-color">{{item.bocPointsPay}} </span><span>积分</span></p>
                  <p class="pay">原价：
                    <del>{{item.goodsMarketprice}}</del>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div class="blank"></div>
          <div class="rechange rechange-one">
            <p class="rechange-title">{{dataList.result[1].topType}}</p>
            <ul class="rechange-wrapper big-one">
              <li v-for="item in dataList.result[1].goodsList"
                  @click="goDetail(item.goodsUrl,item.freemarkUrl)">
                <img v-lazy="item.goodsImage" alt="">
                <p class="goods-name">{{item.goodsName}}</p>
                <p class="jifen">
                  <span
                    class="money-color">{{item.bocPointsPay}} </span><span>积分 + ￥ {{item.goodsPrice.substr(1)}}</span>

                </p>
              </li>
            </ul>
            <p class="more"
               @click="appjs.syJsbLaunchWebview(siteInfo.host_old+'/bocm/index.php?act=goods&op=syshop_goods_list&sort_order=price_asc')">
              查看更多</p>
          </div>
          <div class="blank"></div>
          <div class="rechange big">
            <p class="rechange-title">{{dataList.result[2].topType}}</p>
            <ul class="rechange-wrapper marginB40">
              <li v-for="item in dataList.result[2].goodsList"
                  @click="goDetail(item.goodsUrl,item.freemarkUrl)">
                <img class='new-img' v-lazy="item.goodsImage" alt="">
                <p class="goods-name big-text">{{item.goodsName}}</p>
                <p class="jifen"><span
                  class="money-color">{{item.bocPointsPay}} </span><span>积分 + ￥ {{item.goodsPrice.substr(1)}}</span></p>
              </li>
            </ul>
            <p class="more"
               @click="appjs.syJsbLaunchWebview(siteInfo.host_old+'/bocm/index.php?act=goods&op=syshop_goods_list&sort_order=time_desc')">
              查看更多</p>
          </div>
          <div class="blank"></div>
          <div class="rechange">
            <p class="rechange-title">{{dataList.result[3].topType}}</p>
            <p class="sale-descript">{{dataList.result[3].topTypeDesc}}</p>
            <ul class="sale-wrapper most-goods">
              <li v-for="(item,index) in dataList.result[3].goodsList"
                  @click="goDetail(item.goodsUrl,item.freemarkUrl)">
                <!--item.goodsCommonid,item.goUrl-->
                <img v-lazy="item.goodsImage" alt="">
                <div class="txt" :class="{'not-border':dataList.result[3].goodsList.length-1===index}">
                  <p class="goods-name">{{item.goodsName}}</p>
                  <p class="jifen"><span
                    class="money-color">{{item.bocPointsPay}} </span><span>积分 + ￥ {{item.goodsPrice.substr(1)}}</span>
                  </p>
                </div>
              </li>
            </ul>
            <p class="more"
               @click="appjs.syJsbLaunchWebview(siteInfo.host_old+'/bocm/index.php?act=goods&op=syshop_goods_list&sort_order=sale_desc')">
              查看更多 </p>
          </div>
          <div class="blank"></div>
          <div class="rechange">
            <p class="rechange-title">{{dataAreaList.title}}</p>
            <p class="sale-descript">{{dataAreaList.desc}}</p>
            <div class="footer">
              <div class="footer-item" v-for="item in dataAreaList.areaList">
                <img v-lazy="item.areaImgUrl" :alt="item.areaName"
                     @click="goCompany()">
                <ul class="exhibit">
                  <li v-for="iem in item.eList">
                    <div
                      @click="appjs.syJsbLaunchWebview(siteInfo.host_old+'/bocm/index.php?act=goods&op=syshop_store&member_id='+iem.memberId)">
                      <img :src="iem.companyLogoUrl" alt="">
                      <p>{{iem.companyName}}</p>
                    </div>
                  </li>
                  <li v-for="n in (3-item.eList.length)">
                    <div class="un-info">
                      虚位以待
                    </div>
                  </li>
                </ul>
              </div>
              <p class="more" @click="goCompany()">查看更多</p>
            </div>
          </div>
          <div class="blank"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import * as type from '../../requests/market'

  export default {
    data() {
      return {
        isLoading: true,
        dataList: {
          result: [
            {
              topType: "",
              topTypeDesc: '',
              goodsList: []
            },
            {
              topType: "",
              topTypeDesc: '',
              goodsList: []
            },
            {
              topType: "",
              topTypeDesc: '',
              goodsList: []
            },
            {
              topType: "",
              topTypeDesc: '',
              goodsList: []
            }]
        },
        dataType: [],
        dataAreaList: []
      }
    },
    created() {
      this.getMarketList()
      this.getMarketType()
      this.areaList()
      this.appjs.syJsbShowTitleBar('true')
    },
    methods: {
      goDetail(touchurl,freemarkUrl) {
          if(!!freemarkUrl){
            this.appjs.syJsbLaunchWebview(freemarkUrl)
          }else{
            this.appjs.syJsbLaunchWebview(this.siteInfo.host_old + touchurl)
          }
        //this.appjs.syJsbLaunchWebview(url)
       // this.appjs.syJsbLaunchWebview(this.siteInfo.host_old + '/bocm/index.php?act=project&op=project_detail&gc_id=' + goodsCommonid)
//        this.appjs.syJsbLaunchWebview(this.siteInfo.api_host_j + '/rs-goods/redirect/redirect-goods-detail?goodsCommonid=' + memberId)
      },
      goCompany() {
        this.appjs.syJsbLaunchWebview(this.siteInfo.host_old + '/bocm/index.php?act=syshop&op=sycompany')
      },
      goShanYanMarket(gc_id) {
        if (gc_id === -1) {
          this.appjs.syJsbLaunchWebview(this.siteInfo.host + '/syshop/category')
//          this.appjs.syJsbLaunchWebview(this.siteInfo.host_old + '/bocm/index.php?act=goods&op=syshop_goods_list&')
        } else {
          this.appjs.syJsbLaunchWebview(this.siteInfo.host + '/syshop/goods_list?cate_id=' + gc_id)
//          this.appjs.syJsbLaunchWebview(this.siteInfo.host_old + '/bocm/index.php?act=goods&op=syshop_goods_list&goods_type=' + parms)
        }
      },
      getMarketList() {
        type.getMarketList().then((res) => {
          if (res.data.code === 200) {
            this.isLoading = false
            this.dataList = res.data.data
          }
        })
      },
      getMarketType() {
        type.getMarketType('3').then((res) => {
          if (res.data.code === 200) {
            this.dataType = res.data.data
          }
        })
      },
      areaList() {
        type.areaList(5, 3).then((res) => {
          if (res.data.code === 200) {
            this.dataAreaList = res.data.data
          }
        })
      }
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
  .money-color {
    color: #4A90E2;
    font-size: 0.30rem;
  }

  .contianer {
    .headJf {
      width: 100%;
      height: 0.56rem;
      line-height: 0.56rem;
      text-align: center;
      color: #999999;
      font-size: 0.24rem;
      background: #f4f5f6;
    }
    .headNav {
      .li-wrapper {
        padding: 0 0.3rem;
        padding-top: 0.4rem;
        overflow: hidden;
        li {
          float: left;
          overflow: hidden;
          margin-right: 0.82rem;
          img {
            width: 1.1rem;
            height: 1.1rem;

          }
          p {
            margin-top: 0.13rem;
            margin-bottom: 0.39rem;
            color: #666666;
            text-align: center;
            font-size: 0.26rem;
          }
        }
        .margin0 {
          margin-right: 0rem;
        }
      }
    }
    .blank {
      background: #f4f5f6;
      height: 0.2rem;
    }
    .love-goods {
      padding-top: 0.07rem;
      height: 5.96rem;
      overflow: hidden;
      .love-title {
        color: #333333;
        font-size: 0.3rem;
        text-align: center;
        padding: 0.28rem 0 0.20rem 0;
        background: url(../../../static/images/symarket/syshop_tit.png) no-repeat center center;
        background-size: 5.92rem .5rem;
      }
      .descript {
        color: #999999;
        text-align: center;
        font-size: 0.24rem;
        margin-bottom: 0.24rem;
      }
      .goods-wraper {
        width: 100%;
        overflow-x: scroll;
        height: 4.68rem;
        padding-bottom: 0.2rem;
        -webkit-overflow-scrolling: touch;
        .scoll-wrapper {
          overflow: hidden;
          li {
            width: 2.9rem;
            float: left;
            margin-right: 0.15rem;
            .img-list {
              width: 2.9rem;
              height: 2.03rem;
              position: relative;
              img {
                width: 100%;
                height: 100%;
                display: block;
              }
              span {
                width: 100%;
                position: absolute;
                bottom: 0;
                display: block;
                height: 0.34rem;
                text-align: left;
                padding: 0.04rem 0;
                padding-left: 0.19rem;
                font-size: 0.24rem;
                color: #fff;
                background-image: -webkit-linear-gradient(to left, #fff, #f8aa79);
                background-image: linear-gradient(to left, #fff, #f8aa79);

              }
            }
            p {
              text-align: left;
              width: 2.34rem;
              margin-left: 0.28rem;
              font-size: 0.26rem;
              overflow: hidden;
            }
            .goods-name {
              color: #333333;
              margin-top: 0.32rem;
              margin-bottom: 0.19rem;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }

            .jifen {
              color: #4A90E2;
              margin-top: 0;
              margin-bottom: 0.13rem;
              font-size: 0.32rem;
              span {
                color: #333333;
              }
              .money-color {
                color: #4A90E2;
              }
            }
            .pay {
              margin-top: 0;
              color: #999999;
              margin-bottom: 0.39rem;
              font-size: 0.24rem;
            }
          }
          li:first-child {
            margin-left: 0.23rem;
          }
          li:nth-last-of-type(1) {
            margin-right: 0.23rem;
          }
        }
      }
    }
    .big {
      .big-text {
        font-size: 0.28rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .jifen {
        font-size: 0.26rem
      }
    }

    .rechange {
      width: 100%;
      overflow: hidden;
      .rechange-title {
        color: #333333;
        font-size: 0.3rem;
        text-align: center;
        padding: 0.28rem 0 0.2rem 0;
        background: url(../../../static/images/symarket/syshop_tit.png) no-repeat center center;
        background-size: 5.92rem .5rem;
      }
      .rechange-wrapper {
        width: 100%;
        overflow: hidden;
        li {
          margin: 0 0.155rem;
          overflow: hidden;
          float: left;
          width: 3.44rem;
          height: 3.8rem;
          margin-bottom: 0.1rem;
          img {
            display: block;
            border: 0;
            height: 2.36rem;
            margin-bottom: 0.26rem;
            width: 100%;
          }
          .new-img {
            width: 3.44rem;
            margin-bottom: 0.26rem;
          }
        }
      }

      .big-one {
        .goods-name {
          font-size: 0.28rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .jifen {
          font-size: 0.26rem;
        }
        .money-color {
          font-size: 0.30rem;
          color: #4A90E2;
        }
        li {
          height: 3.8rem;
        }
      }
      .marginB40 {
        margin-bottom: 0.4rem;
        li {
          margin-bottom: 0.1rem;
        }
      }
      .sale-descript {
        color: #999999;
        text-align: center;
        font-size: 0.24rem;
        margin-bottom: 0.24rem;
      }
      .sale-wrapper {
        li {
          height: 2.4rem;
          overflow: hidden;
          img {
            float: left;
            width: 2.17rem;
            margin-left: 0.33rem;
            margin-top: 0.3rem;
          }
          .txt {
            float: right;
            width: 3.83rem;
            margin-right: 0.21rem;
            border-bottom: 1px solid #e9e9e9;
            height: 2.4rem;
            box-sizing: border-box;
            .goods-name {
              margin-top: 0.3rem;
              width: 3.67rem;
              font-size: .28rem;
              color: #333333;
              margin-bottom: 0.31rem;
            }
            .big-text {
              font-size: 0.28rem;
            }
            .jifen {
              color: #4A90E2;
              font-size: 0.28rem;
              .money-color {
                font-size: 0.30rem;
                color: #4A90E2;
              }
              span {
                color: #333333;
              }
            }
          }
          .not-border {
            border: 0;
          }
        }
      }
      .most-goods {
        li {
          img {
            width: 2.40rem;
            height: 1.68rem;
          }
        }
      }
      .more {
        border-top: 1px solid #e9e9e9;
        height: 0.88rem;
        line-height: 0.96rem;
        color: #B1B8C4;
        font-size: 0.24rem;
        text-align: center;
        background: url(../../../static/images/common/ap41.png) no-repeat 4.34rem 0.38rem;
        background-size: 0.1rem;
      }
    }
    .rechange-one {
      .rechange-wrapper {
        li {
          margin-bottom: 0.2rem;
        }
      }
    }
    .footer {
      .footer-item {
        height: 1.6rem;
        border-bottom: 1px solid #e9e9e9;
        margin: 0 0.24rem;
        position: relative;
      }
      .footer-item:nth-last-of-type(1) {
        border: 0;
      }
      img {
        float: left;
        width: 1.76rem;
        height: 1.4rem;
        margin-top: 0.08rem;
        display: inline-block;
        border: 0;
        background: #e1e1e1;
      }
      .exhibit {
        display: inline-block;
        float: left;
        overflow: hidden;
        li {
          box-sizing: border-box;
          width: 1.74rem;
          height: 1.58rem;
          float: left;
          img {
            margin-top: 0.08rem;
            width: 1.22rem;
            height: 1rem;
            display: block;
            background: #e1e1e1;
            margin-left: 0.26rem;
            clear: both;
            border: 0;
          }
          p {
            text-align: center;
            font-size: 0.24rem;
            color: #666666;
            width: 76px;
            margin: 0 auto;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

          }
          div.un-info {
            color: #999999;
            text-align: center;
            margin-top: 0.68rem;
          }
        }
        li:nth-of-type(2) {
          border-left: 1px solid #e9e9e9;
          border-right: 1px solid #e9e9e9;
        }
      }
    }
  }

</style>
