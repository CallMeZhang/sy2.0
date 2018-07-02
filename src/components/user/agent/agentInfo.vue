<template>
  <div>
    <transition name="fade">
      <sy-loading v-show="isLoading"></sy-loading>
    </transition>
    <transition name="fade">
      <div class="agent" v-show="!isLoading">
        <div class="contianer">
          <div class="wrapper">
            <sy-head :title-text="agentInfo.member_truename"></sy-head>
            <!--助理人信息-->
            <div class="assistant">
              <div class="assCon cle">
                <div class="assImg">
                  <img :src="agentInfo.real_avatar_url" alt="用户头像">
                </div>
                <div class="assInfo">
                  <h2>助理人：{{agentInfo.member_truename}}</h2>
                  <div class="assDes">
                    <p>描述：<span class="red">{{evaScoInfo.goods_score}}</span></p>
                    <p>物流：<span class="red">{{evaScoInfo.deliverycredit_score}}</span></p>
                    <p>服务：<span class="red">{{evaScoInfo.servicecredit_score}}</span></p>
                  </div>
                  <div class="assAvg">平均发货：{{agentInfo.latest_send_speed}}</div>
                  <div class="assHelp fontRes">已帮助贫困户：{{agent_poor_num}}户</div>
                  <div class="assFin fontRes">完成的公益销售配额：￥{{finishMoney}}</div>
                </div>
              </div>
            </div>

            <!--服务质量-->
            <div class="lately">
              <div class="latelyCon cle">
                <div class="latelyLeft">
                  <h2>最近30天服务质量：</h2>
                  <p>退款率：<span>{{agentInfo.latest_refund_rate | f}}%</span></p>
                  <p>投诉率：<span>{{agentInfo.latest_complain_rate | f}}%</span></p>
                </div>
                <div class="latelyRight">
                  <h2>平台最近30天均值：</h2>
                  <p>退款率：<span>{{agentInfo.platest_refund_rate | f}}%</span></p>
                  <p>投诉率：<span>{{agentInfo.platest_complain_rate | f}}%</span></p>
                </div>
              </div>
            </div>

            <!--助理人简介-->
            <div class="profile">
              <div class="haveProfile" v-if="agentInfo.member_intro">
                <h2>助理人简介：</h2>
                <p>{{agentInfo.member_intro}}</p>
              </div>
              <div class="noProfile" v-if="!agentInfo.member_intro">
                <h2>助理人简介：<span>TA还没有填写简介</span></h2>
              </div>
            </div>

            <!--助理人产品-->
            <div class="product">
              <div class="productCon">
                <h2>助理人产品：</h2>
                <ul>
                  <li class="cle">
                    <div class="proImg">
                      <img src="" alt="产品图片">
                    </div>
                    <div class="proInfo">
                      <div class="proTit fontRes">小麦粉</div>
                      <div class="proCon fontRes">已获得韩红，崔向阳等33人次的帮扶</div>
                      <div class="proPrice cle">
                        <span class="red">￥<span class="red fs">33.00</span></span>
                        <span class="gray red">免运费</span>
                      </div>
                    </div>
                  </li>
                  <li class="cle">
                    <div class="proImg">
                      <img src="" alt="产品图片">
                    </div>
                    <div class="proInfo">
                      <div class="proTit fontRes">小麦粉</div>
                      <div class="proCon">还未获得帮扶</div>
                      <div class="proPrice cle">
                        <span class="red">￥<span class="red fs">33.00</span></span>
                        <span class="gray red">免运费</span>
                      </div>
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
  import {getAgentInfo} from '@/requests/agent'
  import header from '@/components/common/header/header.vue'
  import loading from '@/components/common/loading/loading.vue'

  export default {
    data() {
      return {
        isLoading: true,
        agentInfo: {},
        evaScoInfo: {},
        finishMoney: '',
        agent_poor_num: ''
      }
    },
    created: function () {

    },
    mounted: function () {
      this.initData()
    },
    methods: {
      async initData() {
        let member_id = this.$route.params.member_id
        let a = await getAgentInfo(member_id)
        this.agentInfo = a.ai.agent_info
        this.evaScoInfo = a.ai.evaluate_score_info
        this.finishMoney = a.ai.finished_money
        this.agent_poor_num = a.ai.agent_poor_num
        this.isLoading = false
      }
    },
    filters: {
      f: function (value) {
        if (!value) return '-'
        value = value * 100
        return Number(value.toString().match(/^\d+(?:\.\d{0,2})?/))
      }
    },
    components: {
      'sy-head': header,
      'sy-loading': loading,
    }
  }
</script>

<style scoped>
  .contianer {
    max-width: 1024px;
    margin: 0 auto;
  }

  .wrapper {
    background-color: #f4f6f5;
  }

  /*公共头部*/
  .red {
    color: #f33e53;
  }

  .fontRes {
    white-space: nowrap;
    word-break: break-all;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    overflow: hidden;
  }

  /*用户信息*/
  .assistant {
    border-bottom: 1px solid #e1e1e1;
    background-color: #fff;
    position: relative;
  }

  .assCon {
    padding: 0.34rem 0.24rem;
  }

  .assCon .assImg {
    float: left;
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    width: 1.2rem;
    height: 1.2rem;
    margin-right: 0.37rem;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    background-color: #e1e1e1;
  }

  .assCon .assImg img {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 1.26rem;
    min-height: 1.26rem;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  .assCon .assInfo {
    float: right;
    width: 75%;
    font-size: 0.26rem;
    color: #666;
  }

  .assCon .assInfo h2 {
    font-size: 0.28rem;
    color: #333;
  }

  .assCon .assInfo > div {
    line-height: 0.5rem;
  }

  .assCon .assInfo .assDes p {
    display: inline-block;
    margin-right: 0.26rem;
  }

  /*服务质量*/
  .lately {
    padding: 0.28rem 0.24rem;
    background-color: #fff;
  }

  .latelyCon > div {
    float: left;
    width: 50%;
  }

  .lately .latelyRight {
    float: right;
  }

  .lately h2 {
    font-size: 0.3rem;
    color: #333;
  }

  .lately p {
    font-size: 0.24rem;
    color: #333;
    line-height: 0.6rem;
  }

  /*助理人简介*/
  .profile {
    padding: 0.24rem 0.3rem;
    background-color: #fff;
    margin-top: 0.2rem;
    font-size: 0.24rem;
  }

  .profile h2 {
    font-size: 0.26rem;
    color: #333;
  }

  .profile p {
    color: #999;
    line-height: 0.5rem;
  }

  .profile h2 span {
    font-size: 0.24rem;
    color: #999;
  }

  /*助理人产品*/
  .product {
    padding: 0.3rem 0.24rem;
    background-color: #fff;
    margin-top: 0.2rem;
  }

  .product .proImg {
    float: left;
    width: 2.24rem;
    height: 1.56rem;
    background-color: #e1e1e1;
    position: relative;
    margin-right: 0.34rem;
  }

  .product .proImg img {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 100%;
    min-height: 1.56rem;
  }

  .product ul li {
    margin-top: 0.3rem;
  }

  .product .proInfo {
    float: left;
    width: 63%;
    border-bottom: 1px solid #e1e1e1;
  }

  .product h2, .product .proTit {
    font-size: 0.3rem;
    color: #333;
  }

  .product .proInfo .proCon {
    font-size: 0.22rem;
    color: #999;
  }

  .product .proInfo .proPrice {
    margin-top: 0.42rem;
    font-size: 0.22rem;
    margin-bottom: 0.1rem;
  }

  .product .proInfo .proPrice .fs {
    font-size: 0.28rem;
  }

  /*.product .proInfo .proPrice>span{*/
  /*float: left;*/
  /*}*/
  .product .proInfo .proPrice .gray {
    float: right;
  }
</style>
