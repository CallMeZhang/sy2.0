<template>
  <div class="container">
    <sy-header titleText="完善信息"></sy-header>
    <div class="welcome-wrapper">
      <div class="welcome-text sy-blue">
        欢迎加入益客俱乐部
      </div>
      <div class="avatar-wrapper">
        <img :src="siteInfo.cdn_host+'/static/images/common/avatar_complete.png'">
      </div>
    </div>
    <!--按钮-->
    <div class="btn-container">
      <div class="btn-wrapper sy-blue-bg" @click="$router.push('invite_code_page')">
        下一步
      </div>
    </div>

    <div class="jump-wrapper">
      您有邀请码？<a class="jump-text sy-blue">点此输入</a>
    </div>

    <div class="bottom-line"></div>
  </div>
</template>

<script>

</script>

<style scoped>

  .container {
    height: 100%;
    width: 100%;
  }

  .welcome-wrapper {
    width: 100%;
    height: 3rem;
    padding-top: 0.8rem;
  }

  .welcome-text {
    font-size: 0.6rem;
    font-weight: normal;
    height: 0.84rem;
    text-align: center;
  }

  .avatar-wrapper {
    text-align: center;
    margin-top: 0.66rem;
  }

  .avatar-wrapper img {
    height: 1.5rem;
    width: 1.5rem;
    vertical-align: middle;
  }

  .avatar-wrapper span {
    font-size: 0.28rem;
    margin-left: 0.88rem;
  }

  .btn-container {
    margin-top: 2.6rem;
    height: 0.88rem;
    width: 100%;
    overflow: hidden;
  }

  .btn-wrapper {
    margin: 0 auto 0;
    height: 0.88rem;
    width: 6.5rem;
    line-height: 0.88rem;
    font-size: 0.32rem;
    text-align: center;
    border-radius: 50px;
    color: #ffffff;
  }

  .jump-wrapper {
    margin-top: 3.58rem;
    text-align: center;
    font-size: 0.26rem;
  }

  .jump-text {
    font-size: 0.26rem;
    text-decoration: underline;
  }

  .bottom-line {
    height: 0.84rem;
    width: 100%;
  }
</style>
