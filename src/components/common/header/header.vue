<template>
  <div>
    <div v-title="titleText"></div>
    <div v-if="isShow">
      <div class="header">
        <div class="ios-addition" v-if="isIos">
        </div>
        <div class="sy-header">
          <b class="go-back" @click="goBack()"><span></span></b><span class="title-text">
      {{titleText}}
    </span><b class="more"><span></span></b>
        </div>
      </div>
      <div class="top_line"></div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['titleText'],
    data() {
      return {
        isIos: false,
        isShow: false
      }
    },
    created() {
      this.appjs.syJsbGetClientInfo().then((res)=> {
        if(res['platform'] === 'web') {
          this.isShow = true
          this.appjs.syJsbShowTitleBar('false')
          this.appjs.syJsbGetClientInfo().then((res)=> {
            if(res['platform'] === 'ios') {
              this.isIos = true
            }
          })
        } else {
          this.isShow = false
          this.appjs.syJsbSetTitleText(this.titleText)
        }
      })

    },
    methods: {
      goBack() {
        this.appjs.syJsbGetClientInfo().then((res)=> {
          if(res['platform'] === 'web') {
            this.$router.go(-1)
          } else {
            this.appjs.syJsbCloseAppPage()
          }
        })

      }
    }
  }
</script>
<style scoped>
  .header {
    position: fixed;
    background-color: #ffffff;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.32);
    z-index: 100;
  }
  .ios-addition {
    width: 100%;
    height: 0.4rem;
  }

  .sy-header {
    width: 100%;
    height: 0.88rem;
  }

  .go-back {
    width: 0.88rem;
    height: 100%;
    display: inline-block;
    float: left;
  }

  .go-back span {
    display: inline-block;
    height: 0.35rem;
    width: 0.2rem;
    margin: 0.27rem 0.47rem 0.26rem 0.21rem;
    background: url("/static/images/common/go_back.png") no-repeat;
    background-size: 100% 100%;
  }

  .title-text {
    height: 100%;
    width: 3.74rem;
    display: inline-block;
    float: left;
    line-height: 0.88rem;
    text-align: center;
    padding: 0 1rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    font-size: 0.36rem;
  }

  .more {
    width: 0.88rem;
    height: 100%;
    display: inline-block;
    float: right;
  }

  .more span {
    display: inline-block;
    height: 0.1rem;
    width: 0.43rem;
    margin: 0.39rem 0.2rem 0.39rem 0.25rem;
    /*background: url("/static/images/common/more.png") no-repeat;*/
    /*background-size: 100% 100%;*/
  }
  .top_line {
    height: 0.88rem;
    width: 100%;
  }
</style>
