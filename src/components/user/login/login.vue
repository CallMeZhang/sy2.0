<template>
  <div class="contianer">
    <sy-header titleText="登录/注册"></sy-header>
    <sy-loading :show="isLoading"></sy-loading>
    <transition name="fade">
      <div v-show="!isLoading">
        <div class="wrapper">
          <div class="logo">
            <img
              :src="siteInfo.cdn_host + '/static/images/login/' + (siteInfo.test ? 'icon-logo-no-china.png' : 'icon-logo.png')"
              alt="logo">
          </div>
          <div class="loginInfo">
            <div class="tel cle">
              <div class="telIcon"></div>
              <div class="telNum">
                <input type="tel" placeholder="请输入您的手机号码" v-model="member_name" maxlength="11">
              </div>
            </div>
          </div>
          <div class="loginInfo">
            <div class="tel cle">
              <div class="telIcon yzIcon"></div>
              <div class="telNum yz cle">
                <input type="tel" placeholder="请输入验证码" v-model="mcode">
                <span v-show="can_send_mcode" @click="picCode='';aliCheck()">{{send_text}}</span>
                <span v-show="!can_send_mcode">{{count_down}}s</span>
              </div>
            </div>
          </div>
          <div class="btn" @click="login()">确定</div>
          <div class="reg">
            <div>*注册代表您已同意</div>
            <div>
              <a @click="appjs.syJsbLaunchWebview(siteInfo.host_old+'/boc/index.php?act=login&op=user_protocol_pwcn')">《“一起善源”平台用户协议》</a>
              <a
                @click="appjs.syJsbLaunchWebview(siteInfo.host_old+'/boc/index.php?act=login&op=user_privacy_agreement')">《“一起善源”平台用户隐私保护规则》</a>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!--图形验证码弹层-->
    <!--<transition name="fade">-->
      <div v-show="verifyC" class="verify-code" @touchmove.prevent>

        <!-- <div class="content-div">
          <img :src="siteInfo.cdn_host + '/static/images/common/close-btn.png'" alt="" class="close-img"
               @click="verifyC=false">
          <p class="content-title">请输入图片验证码</p>
          <div class="verify-div">
            <input class='verify-input' type="text" placeholder="请输入" v-model="picCode"
                   :class="{'border-color':!!picCode}">
            <img class='verify-img' :src="verifyUrl" alt="" @click="changeImg">
            <span>换一张</span>
          </div>
          <div class="btn-div" @click="checkVerifyCode()">确定</div>
        </div> -->
        <div style="padding-top:200px;">
          <div id="__nc" style="margin-left:auto;margin-right:auto;width:80%;height:100px;padding-top:100px;position: relative;background: #fff;border-radius:8px;">
            <div class="verify-title">请拖动滑块验证</div>
            <div id="nc"></div>
          </div>
        </div>
      </div>
    <!--</transition>-->
  </div>
</template>

<script>
  import {get_mcode, login, crephse, verifyCode,get_message_code} from '@/requests/common'

  export default {
    data() {
      return {
        isLoading: true,
        member_name: '',
        mcode: '',
        can_send_mcode: true,
        count_down: 60,
        showToolBar: false,
        client: 'web',
        send_text: '发送验证码',
        verifyC: false,
        picCode: '',
        verifyUrl: '',
        token:'',
        from:''
      }
    },

    created() {
      this.appjs.syJsbShowTitleBar('true')
      this.from = this.$route.query.from
    },
    mounted() {
      this.isLoading = false
      this.appjs.syJsbSetTitleText('登录/注册');
//      require('../../../../static/js/verify.js')
      let t = new Date();
      let a = '' + t.getFullYear() + (1+t.getMonth()) + t.getDate() + t.getHours()
      let url = 'https://g.alicdn.com/sd/nch5/index.js?'+a
      this.getData(url)
    },
    methods: {
      getData(src){
        return new Promise((resolve, reject) => {
          var head= document.getElementsByTagName('head')[0];
          var script= document.createElement('script');
          script.type= 'text/javascript';
          script.src= src;
          head.appendChild(script);
          script.onload = script.onreadystatechange = function() {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) {
              script.onload = script.onreadystatechange = null;
              resolve()
            }else{
              reject()
            }
          };

        });
      },
//      changeImg() {
//        verifyCode(this.member_name).then((res) => {
//          if (res.data == '') {
//            this.$toast('验证码获取失败，请重试')
//          } else if (res.data != '') {
//            this.verifyUrl = 'data:image/png;base64,' + res.data
//            this.verifyC = true;
//          }
//        })
//      },
//      checkVerifyCode() {
//        this.send_mcode()
//      },
//      获取token
      getCookie(c_name) {
        if (document.cookie.length > 0) {
          let c_start = document.cookie.indexOf(c_name + "=");
          if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            let c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
          }
        }
        return "";
      },
      login() {
        if (!/^1[0-9]\d{9}$/.test(this.member_name)) {
          this.appjs.syJsbAlert('请输入正确的手机号码')
          return
        }
        if (!/\d{6}$/.test(this.mcode)) {
          this.appjs.syJsbAlert('请输入验证码')
          return
        }
        let invite_code
        if ('invite_code' in this.$route.query) {
          invite_code = this.$route.query.invite_code
        } else {
          invite_code = 0
        }
        let request_data = {
          'mobile': this.member_name,
          'mcode': this.mcode,
          'loginType': 'code_login'
        }
        if (invite_code !== 0) {
          request_data.inviteCode = invite_code
        }
        login(request_data).then((res) => {
          if (res.data.code === 200) {
            let sessionRedisKey = res.data.data.sessionRedisKey
            crephse(sessionRedisKey).then((resource) => {
              this.appjs.syJsbStoreToken(resource.data.content.token, resource.data.content.member_info.member_id)
              if (resource.data.content.member_info.channel !== null) {
                this.appjs.saveChannel(resource.data.content.member_info.channel)
              }
              this.token = this.getCookie('token');
              let callback = decodeURIComponent(this.$route.query.callback)
              if (callback === "undefined") {
                callback = this.siteInfo.host_old + '/bocm/index.php?act=home'
              }
              if(this.from){
                window.location.href = callback+'&token='+this.token
              }else{
                window.location.href = callback
              }

            })
          } else {
            console.log(res.data.message)
            this.appjs.syJsbAlert('账户或验证码错误')
          }
        })
      },
      /*send_mcode() {
        if (!/^1[0-9]\d{9}$/.test(this.member_name)) {
          this.appjs.syJsbAlert('请输入正确的手机号码')
          return
        }
        let count_down = 60

        get_mcode(this.member_name, this.picCode).then((res) => {
          if (res.data.code === 200) {
            this.can_send_mcode = false
            this.count_down = count_down
            let intval = setInterval(() => {
              if (this.count_down == 1) {
                this.count_down = count_down
                this.can_send_mcode = true
                this.send_text = '重新获取'
                clearInterval(intval)
              } else {
                this.count_down--
              }
            }, 1000)
            this.verifyC = false;
            this.picCode = ''
          } else if (res.data.code === 402) {
            this.can_send_mcode = true
            this.verifyC = true;
            if (res.data.message == 1) {
              this.$toast('图形验证码有误')
            }
            verifyCode(this.member_name).then((res) => {
              if (res.data == '') {
                this.$toast('验证码获取失败，请重试')
              } else if (res.data != '') {
                this.verifyUrl = 'data:image/png;base64,' + res.data
                this.picCode = ''
              }
            })
          } else {
            this.can_send_mcode = true
            this.appjs.syJsbAlert('请求验证码次数过多，请稍后再试')
          }
        })
      },*/
      // 阿里验证
      aliCheck(){
        if (!/^1[0-9]\d{9}$/.test(this.member_name)) {
          this.appjs.syJsbAlert('请输入正确的手机号码')
          return
        }
        this.verifyC = true;
        const _this = this;
        var nc_token = ["FFFF0N00000000005BCF", (new Date()).getTime(), Math.random()].join(':');
        var scene = 'nc_message_h5'
        var nc=NoCaptcha.init({
          renderTo: '#nc',
          appkey: 'FFFF0N00000000005BCF',
          scene: scene,
          token: nc_token,
          trans: {"key1": "code200"},
          elementID: ["usernameID"],
          is_Opt: 0,
          language: "cn",
          timeout: 10000,
          retryTimes: 5,
          errorTimes: 5,
          inline:false,
          apimap: {
            // 'analyze': '//a.com/nocaptcha/analyze.jsonp',
            // 'uab_Url': '//aeu.alicdn.com/js/uac/909.js',
          },
          bannerHidden:false,
          initHidden:false,
          callback: function (data) {
            _this.verifyC = false
//            setTimeout(function(){
//              _this.verifyC = false
//              console.log('验证成功')
//            },600)
            _this.can_send_mcode = false
            let count_down = 60;
            get_message_code(_this.member_name,data.csessionid,data.sig,nc_token,scene).then(res=>{
              if (res.data.code === 200) {
                _this.count_down = count_down
                let intval = setInterval(() => {
                  if (_this.count_down == 1) {
                    _this.count_down = count_down
                    _this.can_send_mcode = true
                    _this.send_text = '重新获取'
                    clearInterval(intval)
                  } else {
                    _this.count_down--
                  }
                }, 1000)
                _this.verifyC = false;
                _this.picCode = ''
              } else {
                _this.appjs.syJsbAlert(res && res.data && res.data.message)
              }
            })
          },
          error: function (s) {
          }
        });
        NoCaptcha.setEnabled(true);
        nc.reset();//请务必确保这里调用一次reset()方法

        NoCaptcha.upLang('cn', {
          'LOADING':"加载中...",//加载
          'SLIDER_LABEL': "请向右滑动验证",//等待滑动
          'CHECK_Y':"验证通过",//通过
          'ERROR_TITLE':"非常抱歉，这出错了...",//拦截
          'CHECK_N':"验证未通过", //准备唤醒二次验证
          'OVERLAY_INFORM':"经检测你当前操作环境存在风险，请输入验证码",//二次验证
          'TIPS_TITLE':"验证码错误，请重新输入"//验证码输错时的提示
        });
      }
    }

  }
</script>

<style scoped lang="scss">
  .verify-code {
    position: fixed;
    height: 100%;
    width: 100%;
    background: rgba(58, 58, 58, 0.80);
    top: 0;
    bottom: 0;

    .verify-title{
      position: absolute;
      left:50%;
      top:50px;
      font-size: 20px;
      transform: translate(-50%,-50%);
    }

  }

  .content-div {
    width: 6.6rem;
    height: 4.8rem;
    background-color: #fff;
    padding: 0.54rem 0.4rem 0;
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -2.4rem 0 0 -3.3rem;
    border-radius: .08rem;
  }

  .content-title {
    text-align: center;
    font-size: .40rem;
    color: #4B4F63;
    letter-spacing: 0;
  }

  .close-img {
    position: absolute;
    top: -1rem;
    height: 0.6rem;
    width: 0.6rem;
    right: 0.3rem;
  }

  .verify-div {
    height: 0.8rem;
    width: 100%;
    margin-top: 0.62rem;
    position: relative;
  }

  .verify-input {
    width: 2.5rem;
    display: inline-block;
    height: 100%;
    border-bottom: 1px solid #B1B8C4;
    font-size: .30rem;
    color: #F33E53;
    letter-spacing: 0;
    padding-left: 0.4rem;
    box-sizing: border-box;
    float: left;
    margin-left: 0.1rem;

  }
  .verify-div span{
    height:0.42rem;
    font-size:0.3rem;
    float: left;
    color:rgba(0,122,255,1);
    line-height:0.42rem;
    margin-top: 0.2rem;
  }
  .verify-input::placeholder {
    color: #B1B8C4;
  }

  .verify-img {
    width: 2.06rem;
    height: 100%;
    display: inline-block;
    border: 0;
    background: #DADEE4;
    float: left;
    margin-left: 0.09rem;
  }

  .btn-div {
    margin: 0 auto;
    width: 5.8rem;
    height: 0.88rem;
    background: #F33E53;
    border-radius: 1rem;
    text-align: center;
    line-height: 0.88rem;
    font-size: .32rem;
    color: #FFFFFF;
    letter-spacing: 0;
    margin-top: 0.7rem;
  }

  .border-color {
    border-bottom: 1px solid #F33E53;
  }

  .contianer {
    margin: 0 auto;
    background: url("/static/images/login/zh231.jpg") no-repeat center;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
  }

  .logo {
    width: 100%;
    height: 3.2rem;
    text-align: center;
  }

  .logo img {
    width: 1.4rem;
    height: 1.4rem;
    margin: 0.8rem auto 1rem;
    border-radius: 0.3rem;
    box-shadow: 0 2px 2px rgba(188, 188, 188, .25)
  }

  .loginInfo {
    padding: 0 0.9rem;
    margin-bottom: 0.4rem;
  }

  .loginInfo .tel {
    font-size: .3rem;
  }

  .tel .telIcon {
    width: 0.33rem;
    margin-right: .24rem;
    height: .72rem;
    float: left;
    line-height: .72rem;
    background: url("/static/images/login/zh229.png") no-repeat center;
    -webkit-background-size: 0.33rem 0.44rem;
    background-size: 0.33rem 0.44rem;
  }

  .tel .telNum {
    width: 5.1rem;
    height: .72rem;
    float: left;
    line-height: .72rem;
    text-align: right;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    padding-top: .1rem;
  }

  .tel .telNum input {
    float: left;
    width: 5.1rem;
    height: .52rem;
    line-height: .52rem;
    font-size: .3rem;
    background: 0;
    border: none;
  }

  .tel .yz input {
    width: 3rem;
  }

  .tel .yz span {
    display: inline-block;
    width: 1.6rem;
    height: .52rem;
    line-height: .52rem;
    text-align: right;
    color: #406fbd;
    float: right;
  }

  .tel .yzIcon {
    background: url("/static/images/login/zh230.png") no-repeat center;
    -webkit-background-size: 0.33rem 0.44rem;
    background-size: 0.33rem 0.44rem;
  }

  .btn {
    width: 6rem;
    height: .88rem;
    line-height: .88rem;
    text-align: center;
    color: #fff;
    background: #f31e37;
    border-radius: .44rem;
    margin: .8rem 0.7rem .4rem;
    box-shadow: 0 0.1rem 0.16rem rgba(182, 0, 42, .25);
    font-size: 0.3rem;
  }

  .reg {
    width: 7.5rem;
    padding: 0 0.2rem 0;
    box-sizing: border-box;
    text-align: center;
    font-size: 0.24rem;
  }

  .reg a {
    color: #2854ad;
  }

  .cle:after {
    content: " ";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden
  }

  .cle {
    display: inline-block
  }

  .cle {
    display: block
  }

  .clear {
    clear: both;
  }

</style>
<style>
  /*#nc_1-stage-2{*/
    /*transform: translateY(-120%);*/
  /*}*/
</style>
