<template>
  <div style="left:0;top:0;width:100%;height:0.7rem;font-size:.28rem;z-index: 9999999">
    <div id="gongao">
      <div class="hide">
        <div class="gonggao-left"></div>
        <div id="scroll_div" class="scroll_div">
          <div style="width:30000px">
            <div id="scroll_begin" style="min-width:6.5rem;text-align: left;">
              {{hscrollText}}
            </div>
            <div id="scroll_end">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      'hscrollText'
    ]
  }
</script>

<style scoped>
  #gongao {
    height: 0.7rem;
    top: 0;
    left: 0;
    background: #ffeddb;
    padding: 0 0.24rem;
    box-sizing: border-box;
  }

  .gonggao-left {
    height: 0.7rem;
    width: 0.62rem;
    float: left;
    background:url(/static/images/common/detail-inform.png) no-repeat left center; background-size:0.3rem 0.31rem;
  }

  .scroll_div {
    width: 6.4rem;
    height: 0.7rem;
    float: left;
    white-space: nowrap;
    overflow: hidden;
  }

  #scroll_begin, #scroll_end {
    line-height: 0.7rem;
    color: #f37120;
    float: left;
    /*transform: translateX(100%);*/
  }
  #scroll_begin{
    -webkit-animation: delay_scroll 20s linear 0s infinite normal;
    animation: delay_scroll 20s linear 0s infinite normal;
  }

  @-webkit-keyframes delay_scroll {
    0%{
      -webkit-transform: translateX(6.5rem);
      transform: translateX(6.5rem);
    }
    100%{
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
    }
  }
  @keyframes delay_scroll {
    0%{
      -webkit-transform: translateX(6.5rem);
      transform: translateX(6.5rem);
    }
    100%{
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
    }
  }
</style>
