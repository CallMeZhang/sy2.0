<template>
  <div class="adopt-wraper">
    <div class="t">
      <p class="title">
        团体认养
      </p>
      <p class="des">
        约12000元/10棵
      </p>
      <p class="content">
        以企业、单位、组织等团体形式认养（10棵树起）
      </p>
      <img class='adopt-img' src="../../../static/images/campaign/p1.png" alt="">
    </div>
    <div class="t">
      <p class="title">
        单人认养
      </p>
      <p class="des">
        约1200元/棵
      </p>
      <p class="content">
        以个人名义认养独一无二的苹果树（1棵树起）
      </p>
      <img class='adopt-img' src="../../../static/images/campaign/p2.png" alt="">
    </div>
    <div class="t">
      <p class="title">
        拼团认养
      </p>
      <p class="des">
        约1200元/棵
      </p>
      <p class="content">
        与亲人同事、闺蜜好友一起熟人拼团（1棵树起）
      </p>
      <img class='adopt-img' src="../../../static/images/campaign/p3.png" alt="">
    </div>
    <div class="t">
      <p class="title">
        苹果认领
      </p>
      <p class="des">
        约100元/箱
      </p>
      <p class="content">
        认领爱心果实、相信小的力量（1箱起）
      </p>
      <img class='adopt-img' src="../../../static/images/campaign/p4.png" alt="">
    </div>
    <div class="bottom">
      <img src="" alt="">预估价格仅供参考，实际价格以认养支付的价格为准
    </div>
    <button class="btn">确定</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dataSource: [{url: '1'}, {url: '2'}, {url: '3'}, {url: '4'}, {url: '5'}],
        activity: "two",
        screenW: 0
      }
    },
    created() {
      this.screenW = window.screen.width;
    },
    computed: {
      classNameFn() {
      }
    },
    mounted() {
    },
    methods: {
      goUrl(url) {
        console.log(url)
      },
      changeTab(p) {
      }
    },
    components: {}
  }
</script>

<style scoped>
  .adopt-wraper {
    overflow: hidden;
    background: #e1e1e1;
  }

  .t {
    position: relative;
    margin: 0.3rem;
    padding: 0.3rem;
    height: 2.9rem;
    background: #fff;
    border-radius: 0.08rem;
    overflow: hidden;
  }

  .title {
    color: #4a90e2;
    font-size: 0.3rem;
  }

  .des {
    margin-top: 0.06rem;
    font-size: 0.28rem;
  }

  .content {
    position: absolute;
    bottom: 0.3rem;
    width: 3.6rem;
    color: #666a7f;
    font-weight: 300;
    font-size: 0.3rem;
  }

  .adopt-img {
    position: absolute;
    right: 0rem;
    top: 0rem;
    width: 3.2rem;
  }

  .bottom {
    background: #fff;
    margin-bottom: 1rem;
    padding: 0 0.3rem;
    height: 1.2rem;
    line-height: 1.2rem;
    font-size: 0.22rem;
    color: #4a90e2;
    text-align: center;
  }

  .btn {
    text-align: center;
    position: fixed;
    bottom: 0;
    font-size: 0.32rem;
    color: #fff;
    background: #979b4b;
    height: 1rem;
    line-height: 1rem;
    width: 100%;
  }
</style>
