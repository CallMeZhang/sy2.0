<template>
  <div class="container">
    <sy-header titleText="登录"></sy-header>
    <div class="welcome-wrapper">
      <div class="welcome-text sy-blue">
        欢迎来到一起善源...
      </div>
    </div>
    <!--手机号-->
    <div class="phone-container">
      <div class="phone-wrapper">
        <span class="sy-blue">手机号：</span><input type="tel" name="mobile" maxlength="11" placeholder="请输入手机号"/>
      </div>
    </div>
    <!--验证码-->
    <div class="code-container">
      <div class="code-wrapper">
        <span class="sy-blue">验证码：</span><input
        type="text" name="mcode" maxlength="6" placeholder="请输入验证码"/><b
      ></b><a class="sy-blue"
      >获取验证码</a>
      </div>
    </div>
    <!--按钮-->
    <div class="btn-container">
      <div class="btn-wrapper sy-blue-bg" @click="$router.push('register_page')">
        快捷登录
      </div>
    </div>
    <!--协议-->
    <div class="protocol-container">
      <p class="protocol-text sy-blue">
        *已同意<span>《用户协议》</span>和<span>《用户隐私保护规则》</span>
      </p>
    </div>

    <div class="bottom-line"></div>
  </div>
</template>

<script>
import header from '@/components/common/header/header.vue'
  export default {
    data() {
      return {

      }
    },

//    components: {
//      'sy-header': header
//    }
  }
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
    width: 3rem;
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

  .code-wrapper input {
    height: 0.53rem;
    width: 2.28rem;
    display: inline-block;
    font-size: 0.38rem;
    line-height: 0.53rem;
    margin-top: 0.47rem;
    margin-left: 0.6rem;
  }

  .code-wrapper b {
    height: 0.3rem;
    border-left: 1px solid #A1C5EF;
    display: inline-block;
    margin-top: 0.59rem;
    margin-left: 0.5rem;
  }

  .code-wrapper a {
    height: 0.4rem;
    display: inline-block;
    font-size: 0.28rem;
    line-height: 0.4rem;
    margin-top: 0.54rem;
    margin-left: 0.1rem;
    float: right;
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

  .protocol-container{
    width: 100%;
    height: 0.63rem;
    overflow: hidden;
  }

  .protocol-text {
    text-align: left;
    height: 0.33rem;
    width: 6.13rem;
    font-size: 0.24rem;
    line-height: 0.33rem;
    margin: 0.3rem auto 0;
  }

  .bottom-line {
    height: 4.15rem;
    width: 100%;
  }
</style>
