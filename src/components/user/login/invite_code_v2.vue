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
    <!--输入邀请码-->
    <div class="phone-container">
      <div class="phone-wrapper">
        <span class="sy-blue">邀请码：</span><input type="tel" name="mobile" maxlength="11" placeholder="请输入邀请码"/>
      </div>
    </div>
    <!--提示-->
    <div class="tip_container">
      <p class="tip_wrapper sy-blue">
        输入邀请码，您的邀请人可获取更多公益积分
      </p>
    </div>
    <!--按钮-->
    <div class="btn-container">
      <div class="btn-wrapper sy-blue-bg" @click="$router.push('login_page')">
        没有邀请码？跳过
      </div>
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

  .phone-container {
    height: 0.94rem;
    width: 100%;
    margin-top: 0.9rem;
  }

  .phone-wrapper {
    width: 6.26rem;
    height: 0.93rem;
    margin: auto;
    border-bottom: 1px solid #A1C5EF;
  }

  .phone-wrapper span {
    display: inline-block;
    height: 0.45rem;
    font-size: 0.32rem;
    margin-top: 0.24rem;
    line-height: 0.45rem;
  }

  .phone-wrapper input {
    height: 0.53rem;
    width: 3rem;
    font-size: 0.38rem;
    margin-top: 0.2rem;
    margin-left: 0.6rem;
  }

  input::-webkit-input-placeholder {
    color: #B1B8C4;
  }

  .tip_container {
    margin-top: 0.06rem;
    width: 100%;
  }

  .tip_wrapper {
    width: 6.26rem;
    text-align: left;
    margin: auto;
  }

  .btn-container {
    margin-top: 0.48rem;
    height: 1.54rem;
    width: 100%;
    overflow: hidden;
  }

  .btn-wrapper {
    margin: 0.66rem auto 0;
    height: 0.88rem;
    width: 6.5rem;
    line-height: 0.88rem;
    font-size: 0.32rem;
    text-align: center;
    border-radius: 50px;
    color: #ffffff;
  }

  .bottom-line {
    height: 4.78rem;
    width: 100%;
  }
</style>
