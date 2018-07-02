<template>
  <div class="box">
    <div id="__nc">
      <div class="verify-title">请拖动滑块验证</div>
      <div id="nc"></div>
    </div>


  </div>
</template>

<script>
  //import loading from '@/components/'
  import {get_message_code} from '@/requests/common'
  export default {
    components:{},
    data(){
      return {
        member_name:''
      }
    },
    created(){
      this.member_name = this.getQuery('mobile')
//      this.getData()
//      this.appjs.syJsbAlert(this.member_name)
//      this.appjs.syJsbAliPay()
      let t = new Date();
      let a = '' + t.getFullYear() + (1+t.getMonth()) + t.getDate() + t.getHours()
      let url = 'https://g.alicdn.com/sd/nch5/index.js?'+a
      this.getData(url).then(()=>{
        this.$nextTick(()=>{
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
            inline:true,
            apimap: {
              // 'analyze': '//a.com/nocaptcha/analyze.jsonp',
              // 'uab_Url': '//aeu.alicdn.com/js/uac/909.js',
            },
            bannerHidden:false,
            initHidden:false,
            callback: function (data) {
    //          _this.appjs.syJsbAlert('ali')
//          _this.appjs.aliVerify();
//          _this.$emit('success',{sessionId:data.csessionid,sig:data.sig,stoken:nc_token,scene:scene})
          get_message_code(_this.member_name,data.csessionid,data.sig,nc_token,scene).then(res=>{

            if(res && res.data && res.data.code === 200){
              _this.appjs.aliVerify();

            }else{
              _this.appjs.syJsbAlert(res && res.data && res.data.message)
            }
          })
        },
        error: function (s) {
//          _this.$emit('error',s)
//          console.log(s)
          _this.syJsbAlert(s.toString())
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
          })
        },()=>{
          alert('加载验证失败，请刷新')
      })
    },
    mounted(){

    },
    methods:{
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
      getQuery(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null) return unescape(r[2]); return null;
      }
    },


  }
</script>

<style lang="scss" scoped>
.box{
  padding-right:1rem;
  /*position: fixed;*/
  /*height: 100%;*/
  /*width: 100%;*/
  /*top: 0;*/
  /*bottom: 0;*/
}
  #__nc{
    /*width:6.5rem;*/
    padding-top:.7rem;
    position: relative;

    .verify-title{
      /*position: absolute;*/
      /*width:100%;*/
      text-align: center;
      /*left:50%;*/
      /*top:36px;*/
      font-size: 20px;
      padding-bottom:.4rem;
      /*transform: translate(-50%,-50%);*/
    }
  }
</style>
<style>
  #nc_1-stage-2 .tips{
    transform: translateY(-100px);
  }
  ._nc .stage2 .icon.tip {
    left: 5px !important;
  }
  ._nc .stage2 .textbox .input{
    left:42px !important;
  }
  ._nc .stage2 .icon.clear{
    left: 110px !important;
  }
</style>
