<template>
  <div class="content">
    <sy-loading :show="isLoading"></sy-loading>
    <div class="blank" :class="{'un-info':scrollTap}">
      <span v-if="scrollTap">当地物流不及发达城市，产品到您的手中可能需要5-10天，请多多理解。</span>
    </div>
    <div class="info">
      <div class="img">
        <img v-lazy='dataInfo.goodsImage' alt="" @click="dataInfo.goodsNum>1?show=!show:''">
        <span>共{{dataInfo.goodsNum}}种</span>
      </div>
      <ul>
        <li><span class="light-color">物流状态：</span>{{dataInfo.packageState}}</li>
        <li><span class="light-color">物流公司：</span>{{dataInfo.expressName}}</li>
        <li><span class="light-color">运单编号：</span>{{dataInfo.shippingCode}}</li>
        <li v-if="dataInfo.expressTel">
          <span class="light-color">官方电话：</span>
          <span class="light-blue" @click="callPhone(dataInfo.expressTel)"><a
            class="light-blue">{{dataInfo.expressTel}}</a>
          </span>
        </li>
      </ul>
    </div>
    <div class="address">
      <p class="addressP" :class="filterClassName(dataInfo.logisticsList[0].flowStatus)"><span class="weight500">[收货地址] &nbsp;</span><span
        v-html="dataInfo.buyerAddress"></span></p>
      <div class="hun" :class="{'progress-wrapper':dataInfo.logisticsList[0].flowStatus==4&hideDiv}" >
        <div class="p-info" :class="filterClassName(item.flowStatus,index)"
             v-for="(item,index) in dataInfo.logisticsList">
          <div class="left-info">
            <p class="p-one">{{item.time.split(' ')[0].substr(5)}}</p>
            <p class="p-two">{{item.time.split(' ')[1].substr(0, 5)}}</p>
          </div>
          <div class="bg-img-parent">
            <span></span>
            <p class="bg-img" v-if="index!=dataInfo.logisticsList.length-1" :index="index"></p>
          </div>
          <div class="right-info ">
            <p class="info-status">{{item.flowStatus | filterStatus}}</p>
            <p class="info-text" v-html="item.desc" @click="callPhone(item.tel)"></p>
          </div>
        </div>
      </div>
      <p v-if="dataInfo.logisticsList[0].flowStatus==4" @click="hideDiv=!hideDiv" class="more">查看详细物流详情&nbsp; <img
        :class='{"rote180":!hideDiv}'
        :src="hideDiv?'../../../../static/images/icon/more.png':'../../../../static/images/icon/more.png'" alt="">
      </p>
      <div class="offer" v-if="dataInfo.logisticsList.length>1">
        本次查询由寄递纵横提供服务，获取更多快递信息可下载寄递纵横APP或关注“寄递纵横”公众号
      </div>
      <div class="pack" v-if="dataInfo.logisticsList.length<=1&&!dataInfo.overTime">
        您的爱心包裹已发货，但偏远地区物流揽件较慢，请您耐心等待，如有任何疑问可联系{{person}}
        <a @click="callPhone(phone)" class="light-blue">{{phone}}</a>
      </div>
      <div class="pack" v-if="dataInfo.logisticsList.length<=1&&dataInfo.overTime">
        您的爱心包裹已发货，{{plat}}地处偏远山区，使用当地物流公司发货，目前暂不能提供物流信息查询，敬请谅解，如有任何疑问可联系{{person}}
        <a @click="callPhone(phone)" class="light-blue">{{phone}}</a>
      </div>
    </div>
    <div class="hot">
      <p><span class="blank">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        热销商品
        <span class="blank">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p>
      <ul>
        <li class="list-li" v-for="item in dataHot.DaGoodsList" @click="goUrl(item.touchUrl)">
          <img v-lazy='item.realGoodsImage' alt="">
          <p class="title">{{item.goodsName}}</p>
          <p class="pay"><span>￥</span>{{item.goodsPrice}}</p>
        </li>
        <li class="list-li" v-for="item in dataHot.ZxGoodsList" @click="goUrl(item.touchUrl)">
          <img v-lazy='item.realGoodsImage' alt="">
          <p class="title">{{item.goodsName}}</p>
          <p class="pay"><span>￥</span>{{item.goodsPrice}}</p>
        </li>
        <li class="list-li" v-for="item in dataHot.SyGoodsList" @click="goUrl(item.touchUrl)">
          <img v-lazy='item.realGoodsImage' alt="">
          <p class="title">{{item.goodsName}}</p>
          <p class="pay"><span>￥</span>{{item.goodsPrice}}</p>
        </li>
      </ul>
    </div>
    <div class="footer">
      已经到底啦！
    </div>
    <transition name="fade">
      <div class="mask" v-show="show" @click="show=false" @touchmove.prevent>
      </div>
    </transition>
    <transition name="fade">
      <div class="footer-info" v-if="show">
        <p>商品明细</p>
        <div class="parent-goods-info">
          <div class="goods-info" :style="'width:'+(2.1*(buyGoodesInfo.length+0)+0.3)+'rem'">
            <img v-lazy='item.realGoodsImage' alt="" v-for="item in buyGoodesInfo">
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import * as type from '../../../requests/logistics'

  export default {
    data() {
      return {
        isLoading: true,
        dataHot: '',
        show: false,
        buyGoodesInfo: "",
        orderNumber: '',
        hideDiv: true,
        dataInfo: {
          logisticsList: [{flowStatus: '0', time: "9999-99-99 99:99:99"}]
        },
        person: '',
        phone: '',
        plat: '',
        scrollTap:false,
      }
    },
    created() {
      this.orderNumber = this.$route.query.orderNumber
      this.orderId = this.$route.query.orderId
      this.getData()
      this.getPackageGoodsList(this.orderId, this.orderNumber)
      this.logisticsInfo(this.orderId, this.orderNumber)
    },
    filters: {
      filterText(text) {
        switch (text) {
          case '':
            break;
        }
      },
      filterStatus(txt) {
        let className = '已发货'
        switch (txt) {
          case'0':
            className = '已发货';
            break;
          case'1':
            className = '揽件';
            break;
          case'2':
            className = '运输中';
            break;
          case'3':
            className = '派送中';
            break;
          case'4':
            className = '已签收';
            break;
          case'5':
            className = '揽收失败';
            break;
          case'6':
            className = '签收失败';
            break;
          case'7':
            className = '退件';
            break;
          case'8':
            className = '问题件';
            break;
          case'9':
            className = '滞留';
            break;
          case'10':
            className = '暂无数据';
            break;
        }
        return className;
      }
    },
    methods: {
      callPhone(tel) {
        if(!tel)return;
        this.appjs.syJsbCallPhone(tel)
      },
      filterClassName(txt, index) {
        if (parseInt(index) >=1) return;
        let className = 'done'
        switch (txt) {
          case'4':
            className = 'activity';
            break;
          case'2': ;
          case'0':
            className = 'doing';
            break;
        }
        return className;
      },
      getData() {
        type.getPopularGoodsList().then((res) => {
          this.isLoading = false
          if (res.data.code === 200) {
            this.dataHot = res.data.data

          }
        })
      },
      goUrl(url) {
        this.appjs.syJsbLaunchWebview(this.siteInfo.host_old + url)
      },
      getPackageGoodsList(orderId, shippingCode) {
        type.getPackageGoodsList(orderId, shippingCode).then((res) => {
          if (res.data.code === 200) {
            this.buyGoodesInfo = res.data.data.packageGoodsList
          }
        })
      },
      timeIsTrue(time1,time2){
        var time1Arr,time2Arr;
        var time1 = time1.replace(/-/g,"/");
        var time2 = time2.replace(/-/g,"/");
        time1Arr = new Date(time1).getTime();
        time2Arr = new Date(time2).getTime();
       if(time1Arr<time2Arr)return true;
       return false;
      },
      logisticsInfo(orderId, shippingCode) {
        type.logisticsInfo(orderId, shippingCode).then((res) => {
          if (res.data.code === 200) {
            this.scrollTap=res.data.data.isPoorGoods
            var obj={}
            if(res.data.data.logisticsInfo.logisticsList.length!=0&&this.timeIsTrue(res.data.data.logisticsInfo.logisticsList[res.data.data.logisticsInfo.logisticsList.length-1].time,res.data.data.logisticsInfo.sendTime)){
              obj = {
                desc: '正在等待快递小哥揽件',
                flowStatus: '0',
                time: res.data.data.logisticsInfo.logisticsList[res.data.data.logisticsInfo.logisticsList.length-1].time//res.data.data.logisticsInfo.time
              }
            }else{
              obj = {
                desc: '正在等待快递小哥揽件',
                flowStatus: '0',
                time: res.data.data.logisticsInfo.sendTime//res.data.data.logisticsInfo.time
              }
            }

            res.data.data.logisticsInfo.logisticsList.push(obj)
            this.dataInfo = res.data.data.logisticsInfo
            if (this.dataInfo.overTime) {
              this.phone = this.dataInfo.sellerTel;
              switch (this.dataInfo.sellerType) {
                case "platform_self":
                  this.plat = '善源甄选运营仓';
                  this.person = '平台客服';
                  break;
                case "poor":
                  this.plat = this.dataInfo.sellerName;
                  this.person = '平台客服';
                  break;
                case "company":
                  this.plat = this.dataInfo.sellerName;
                  this.person = this.dataInfo.sellerName;
                  break;
                case "agent":
                  this.plat = this.dataInfo.sellerName;
                  this.person = this.dataInfo.sellerName;
                  break;
              }
            } else {
              this.phone = this.dataInfo.sellerTel;
              switch (this.dataInfo.sellerType) {
                case "platform_self":
                  this.plat = '善源甄选运营仓';
                  this.person = '平台客服';
                  break;
                case "poor":
                  this.plat = this.dataInfo.sellerName;
                  this.person = '平台客服';
                  break;
                case "company":
                  this.plat = this.dataInfo.sellerName;
                  this.person = this.dataInfo.sellerName;
                  break;
                case "agent":
                  this.plat = this.dataInfo.sellerName;
                  this.person = this.dataInfo.sellerName;
                  break;
              }
            }
          }
        })
      }
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  .light-color {
    color: #818C9E;
  }

  .light-blue {
    color: #4A90E2;
  }

  .blank {
    height: 0.2rem;
  }

  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 98;
  }

  .un-info {
    height: 0.94rem;
    font-weight: 300;
    font-size: .24rem;
    color: #F25B4B;
    line-height: .34rem;
    box-sizing: border-box;
    padding: 0.13rem 0.18rem 0 0.58rem;
    background: #FFF59B url(../../../../static/images/icon/error.png) no-repeat 0.18rem 0.18rem;
    background-size: 0.26rem;
  }

  .bg-img:nth-last-of-type(0) {
    height: 0;
  }

  .content {
    width: 100%;
    background: #F7F9FA;
    overflow: hidden;
    .info {
      font-weight: 300;
      font-size: 0.28rem;
      color: #000029;
      line-height: 0.4rem;
      background: #fff;
      margin-bottom: 0.2rem;
      height: 2.48rem;
      box-sizing: border-box;
      padding-top: 0.34rem;
      .img, ul {
        float: left;
      }
      .img {
        position: relative;
        width: 2.58rem;
        height: 1.8rem;
        border-radius: 0.08rem;
        margin: 0rem 0.2rem 0 0.3rem;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
        span {
          background: rgba(0, 0, 0, 0.40);
          height: 0.5rem;
          display: inline-block;
          position: absolute;
          bottom: 0;
          width: 100%;
          color: #FFFFFF;
          line-height: 0.5rem;
          text-align: center;
        }
      }
      ul {
        clear: right;
        li {
          margin-bottom: 0.07rem;
        }
      }
    }
    .address {
      background: #fff;
      overflow: hidden;
      margin-bottom: 0.2rem;
      padding-top: 0.33rem;
      padding-bottom: 0.5rem;
      p.addressP {
        font-size: .28rem;
        color: #4B4F63;
        padding: 0 0.32rem 0 0.86rem;
        background: url('../../../../static/images/icon/location-gry.png') no-repeat 0.3rem 0.06rem;
        background-size: 0.26rem 0.32rem;
        margin-bottom: 0.5rem;
        span.weight500 {
          font-weight: 500;
        }
        span {
          font-weight: 300;
        }
      }
      p.activity {
        color: #4A90E2;
        background: url('../../../../static/images/icon/location-blue.png') no-repeat 0.3rem 0.06rem;
        background-size: 0.26rem 0.32rem;
      }
      div.progress-wrapper {
        height: 1.6rem;
        overflow: hidden;
      }
      .hun{
        padding-bottom: 0.2rem;
      }
      .more {
        text-align: center;
        font-size: 0.24rem;
        color: #818C9E;
        letter-spacing: 0;
        font-weight: 300;
        padding: 0.3rem 0;
        position: relative;
        img {
          width: 0.22rem;
          height: 0.22rem;
          border: 0;
          display: inline-block;
          position: absolute;
          top: 0.36rem;
        }
        img.rote180 {
          transform: rotate(180deg);
        }
      }
      .p-info {
        overflow: hidden;
        position: relative;
        color: #818C9E;
        padding-bottom: 0.8rem;
        > div {
          float: left;
        }
        .left-info {
          width: 1.92rem;
          font-weight: 500;
          > p {
            width: 1.13rem;
            text-align: right;
          }
          .p-one {
            font-size: .3rem;
            line-height: 0.32rem;
          }
          .p-two {
            font-size: .20rem;
          }
        }
        .bg-img-parent {
          position: absolute;
          left: 1.47rem;
          top: 0;
          bottom: 0;
          height: 100%;
          span {
            position: absolute;
            top: 0rem;
            width: 0.2rem;
            margin-left: -0.1rem;
            height: 0.2rem;
            border-radius: 50%;
            background: #B1B8C4;
          }
          .bg-img {
            height: 100%;
            width: 1px;
            background: rgba(218, 222, 228, 0.6);
          }

        }
        .right-info {
          width: 5.38rem;
          .info-status {
            font-size: .28rem;
            margin-bottom: 0.1rem;
            font-weight: normal;
            line-height: 0.34rem;
          }
          .info-text {
            font-size: .24rem;
            font-weight: 300;
          }
        }
      }
      .p-info:nth-last-of-type(1) {
        padding-bottom: 0rem;
      }
      .activity {
        color: #4A90E2;
        .bg-img-parent {
          position: absolute;
          left: 1.47rem;
          top: 0;
          bottom: 0;
          height: 100%;
          span {
            width: 0.28rem;
            height: 0.28rem;
            background: url('../../../../static/images/icon/choose-blue.png');
            background-size: 0.28rem;
            margin-left: -0.14rem;
          }
          .bg-img {
            height: 100%;
            width: 0.02rem;
            background: rgba(218, 222, 228, 0.6);
          }
        }
      }
      .doing {
        color: #818C9E;
        .right-info {
          color: #4B4F63;
        }
        .bg-img-parent {
          position: absolute;
          left: 1.47rem;
          top: 0;
          bottom: 0;
          height: 100%;
          span {
            width: 0.28rem;
            height: 0.28rem;
            background: url('../../../../static/images/icon/cr-bule.png');
            background-size: 0.28rem;
            margin-left: -0.14rem;
          }
          .bg-img {
            height: 100%;
            width: 0.02rem;
            background: rgba(218, 222, 228, 0.6);
          }
        }
      }
      .offer {
        font-size: .24rem;
        color: #B1B8C4;
        line-height: .38rem;
        text-align: center;
        width: 6.9rem;
        margin: 0 auto;
      }
      .pack {
        width: 6.3rem;
        margin: 0 auto;
        padding: 0.3rem;
        font-size: .28rem;
        color: #666A7F;
        line-height: .48rem;
        background: #F6FAFF;
        margin-top: 0.3rem;
        border: 1px dashed #C8DDF5;
        border-radius: .08rem;
      }

      .paddingB0 {
        padding-bottom: 0;
      }
    }
    .hot {
      background: #fff;
      overflow: hidden;
      span.blank {
        color: #E9EBEF;
        text-decoration: line-through
      }
      > p {
        text-align: center;
        font-size: .30rem;
        font-weight: 300;
        color: #7E8CA0;
        padding: 0.24rem 0 0.2rem;

      }
      ul {
        padding: 0 0.3rem;
        box-sizing: border-box;
        overflow: hidden;
        li > p {
          text-align: left;

        }
        li.list-li {
          height: 4.12rem;
          width: 50%;
          float: left;
          overflow: hidden;
          img {
            display: block;
            width: 3.4rem;
            border-radius: 0.08rem;
            height: 2.38rem;
            margin: 0 auto 0.32rem;
          }
          .title {
            text-align: left;
            font-weight: 300;
            font-size: .28rem;
            color: #4B4F63;
            line-height: .38rem;
            width: 3.13rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
          .pay {
            font-weight: normal;
            font-size: .30rem;
            line-height: .37rem;
            padding: 0.2rem 0 0.26rem;
            color: #4A90E2;
            span {
              font-size: 0.24rem;
            }
          }
        }
      }
    }
    .footer {
      font-size: .22rem;
      color: #DADEE4;
      letter-spacing: 0.03rem;
      height: 0.5rem;
      background: #F7F9FA;
      line-height: 0.5rem;
      text-align: center;
    }
    .footer-info {
      z-index: 99;
      position: fixed;
      background: #fff;
      width: 100%;
      font-weight: 300;
      font-size: .30rem;
      color: #4B4F63;
      bottom: 0;
      height: 3rem;
      p {
        text-align: center;
        padding-top: 0.36rem;
      }
      .parent-goods-info {
        overflow: hidden;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
        .goods-info {
          padding: 0.4rem 0.15rem 0;
          padding-bottom: 1rem;
          img {
            border: 1px solid #E9EBEF;
            border-radius: 0.06rem;
            width: 1.8rem;
            height: 1.26rem;
            margin: 0 0.15rem;
          }
        }
      }
    }
  }
</style>
