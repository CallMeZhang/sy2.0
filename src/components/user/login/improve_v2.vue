<template>
  <div class="container">
    <sy-header titleText="完善信息"></sy-header>
    <div class="welcome-wrapper">
      <div class="welcome-text sy-blue">
        Hi，请完善您的信息
      </div>
      <div class="avatar-wrapper">
        <img :src="siteInfo.cdn_host+'/static/images/common/avatar_complete.png'"><span class="sy-blue">上传头像</span>
      </div>
    </div>
    <!--手机号-->
    <div class="phone-container">
      <div class="phone-wrapper">
        <span class="sy-blue">姓名：</span><input type="tel" name="mobile" maxlength="11" placeholder="请输入您的姓名"/>
      </div>
    </div>
    <!--验证码-->
    <div class="code-container">
      <div class="code-wrapper">
        <span class="sy-blue">性别：</span>
        <b class="select male"></b><span class="male-text">男</span>
        <b class="unselect female"></b><span class="female-text">女</span>
      </div>
    </div>
    <!--按钮-->
    <div class="btn-container">
      <div class="btn-wrapper sy-blue-bg" @click="$router.push('complete_page')">
        下一步
      </div>
    </div>

    <div class="jump-wrapper">
      <a class="jump-text sy-blue">跳过</a>
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
    width: 6.88rem;
    height: 2.77rem;
    padding-top: 0.8rem;
    padding-left: 0.62rem;
  }

  .welcome-text {
    font-size: 0.6rem;
    font-weight: normal;
    height: 0.84rem;
  }

  .avatar-wrapper {
    margin-top: 0.55rem;
  }

  .avatar-wrapper img {
    height: 1rem;
    width: 1rem;
    vertical-align: middle;
  }

  .avatar-wrapper span {
    font-size: 0.28rem;
    margin-left: 0.88rem;
  }

  .phone-container {
    height: 0.94rem;
    width: 100%;
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
    font-size: 0.38rem;
    margin-top: 0.2rem;
    margin-left: 0.6rem;
  }

  input::-webkit-input-placeholder {
    color: #B1B8C4;
  }

  .code-container {
    height: 1.2rem;
    width: 100%;
  }

  .code-wrapper {
    width: 6.26rem;
    height: 1.19rem;
    margin: auto;
    border-bottom: 1px solid #A1C5EF;
  }

  .code-wrapper span {
    height: 0.45rem;
    display: inline-block;
    font-size: 0.32rem;
    line-height: 0.45rem;
    margin-top: 0.51rem;
  }

  .code-wrapper b {
    height: 0.5rem;
    width: 0.5rem;
  }

  .male {
    margin-left: 0.92rem;
    vertical-align: bottom;
    display: inline-block;
  }

  .male-text {
    margin-left: 0.49rem;
  }

  .female {
    margin-left: 0.98rem;
    vertical-align: bottom;
    display: inline-block;
  }

  .female-text {
    margin-left: 0.49rem;
  }

  .select {
    background: url("/static/images/common/select.png");
    background-size: 100% 100%;
  }

  .unselect {
    background: url("/static/images/common/unselected_2x.png");
    background-size: 100% 100%;
  }

  .btn-container {
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

  .jump-wrapper {
    margin-top: 3.57rem;
    text-align: center;
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
