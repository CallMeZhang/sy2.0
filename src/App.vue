<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  html {
    width: 100%;
    height: 100%;
  }

  body {
    width: 100%;
    height: 100%;
  }

  #app {
    width: 100%;
    height: 100%;
  }

  * {
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
  }

  body, h1, h2, h3, h4, h5, h6, dl, dt, dd, ul, ol, li, th, td, p, blockquote, pre, form, fieldset, legend, input, button, textarea, hr {
    margin: 0;
    padding: 0;
  }

  body, button, input, select, textarea p span {
    font: 12px/1.5 MicrosoftYaHei, arial, verdana, sans-serif;
  }

  input, button, select, textarea {
    outline: none;
    -webkit-appearance: none;
    border-radius: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: 100%;
    font-weight: normal
  }

  body, input, textarea, a {
    outline: none;
  }

  li {
    list-style: none
  }

  fieldset, img {
    border: 0
  }

  table {
    border-collapse: collapse;
    border-spacing: 0
  }

  q:before, q:after {
    content: ''
  }

  button, input, select, textarea {
    font-size: 100%;
    border-width: 0px;
  }

  legend {
    color: #000
  }

  small {
    font-size: 12px
  }

  hr {
    border: none;
    height: 1px
  }

  a {
    text-decoration: none;
    color: #666;
  }

  a:hover {
    text-decoration: none
  }

  a:focus {
    text-decoration: none;
  }

  i {
    display: inline-block;
  }

  /*适配*/
  @media only screen and (max-width: 320px) {
    html {
      font-size: 42.66px;
    }
  }

  @media only screen and (min-width: 321px) and (max-width: 352px) {
    html {
      font-size: 46px;
    }
  }

  @media only screen and (min-width: 353px) and (max-width: 370px) {
    html {
      font-size: 48px;
    }
  }

  @media only screen and (min-width: 371px) and (max-width: 380px) {
    html {
      font-size: 50px;
    }
  }

  @media only screen and (min-width: 381px) and (max-width: 390px) {
    html {
      font-size: 52px;
    }
  }

  @media only screen and (min-width: 391px) and (max-width: 400px) {
    html {
      font-size: 53px;
    }
  }

  @media only screen and (min-width: 401px) and (max-width: 410px) {
    html {
      font-size: 54px;
    }
  }

  @media only screen and (min-width: 411px) and (max-width: 413px) {
    html {
      font-size: 54.8px;
    }
  }

  @media only screen and (min-width: 414px) and (max-width: 420px) {
    html {
      font-size: 55.2px;
    }
  }

  @media only screen and ( min-width: 421px) and ( max-width: 440px) {
    html {
      font-size: 58px;
    }
  }

  @media only screen and ( min-width: 441px) and ( max-width: 699px) {
    html {
      font-size: 58px;
    }
  }

  @media only screen and ( min-width: 700px) and (max-width: 768px) {
    html {
      font-size: 102.4px;
    }
  }

  @media only screen and ( min-width: 769px) and (max-width: 800px) {
    html {
      font-size: 106.667px;
    }
  }

  @media only screen and ( min-width: 801px) and (max-width: 1024px) {
    html {
      font-size: 136.533px;
    }
  }

  @media only screen and ( min-width: 1024px) {
    html {
      font-size: 136.533px;
      width: 1024px;
      margin: auto;
    }

    #app {
      height: auto;
      border-left: 1px solid #e1e1e1;
      border-right: 1px solid #e1e1e1;
    }
  }
  /*iphoneX-footer-fixed 适配*/
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
    .iphonex-padding-bottom{padding-bottom:0.68rem;}
    .iphonex-margin-bottom{margin-bottom:0.68rem;}
    .iphonex-bottom-line{height:1.88rem!important;}
    .iphonex-bottom-blank{height:1.68rem!important;}
    .iphonex-goods-list-con{width: 7.5rem;height: calc(100% - 3.52rem) !important;overflow-x: hidden;}
    .iphonex-bottom-div{padding-bottom:0.68rem;}
    .iphonex-bottom-div:after{display:block;content:"";width:100%;height:0.68rem;background:#fff;}
    .iphonex-bottom-after:after{content:"";display:block;height:0.68rem;background:#fff;}
  }
  .sy-blue {
    color: #4A90E2;
  }
  .sy-blue-bg {
    background-color: #4A90E2;
  }

  .sy-blue-border {
    border: 1px solid #4A90E2;
  }

  .text-more {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .text-more-line {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .line-2 {
    width: 100%;
    height: 0.2rem;
    background: #F7F9FA;
  }

  .line-3 {
    width: 100%;
    height: 0.3rem;
    background: #F7F9FA;
  }

  .line-9 {
    width: 100%;
    height: 0.9rem;
    background: #F7F9FA;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }

  .popup-enter-active, .popup-leave-active {
    transition: all 1s
  }

  .popup-enter, .popup-leave-to {
    transform: translate(0, 100%);
  }

  img[lazy='error'] {
    background: #eee url(../static/images/common/default.svg) no-repeat center center;
    background-size: 50%;
  }

  img[lazy='loading'] {
    background: #eee url(../static/images/common/default.svg) no-repeat center center;
    background-size: 50%;
  }

  .swiper-pagination-bullet-active {
    background: #4A90E2 !important;
    opacity: 1;
  }

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
