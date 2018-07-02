<template>
  <div class="report">
    <sy-loading :show="isLoading"></sy-loading>
    <transition name="fade">
      <div v-show="!isLoading">
        <div v-title="'进展播报'"></div>
        <ul class="report-list">
          <li class="list-con" v-for="item in dataList" @click="appjs.syJsbLaunchWebview(item.article_url)">
            <div class="left"><img :src="item.icon" onerror="this.src='/static/images/default/detail_default.png'" alt="news.png"></div>
            <div class="right">
              <h3 class="r-title">{{item.title}}</h3>
              <p class="r-date">{{item.add_time}}</p>
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </div>

</template>
<script>
  import {progressReportreQuest} from '@/requests/campaign'
  export default {
    data (){
      return{
        isLoading: true,
        currentPage: 1,
        totalPage: Number,
        getDataDone: true,//加载数据
        dataList: [],
        reportData: {},
      }
    },
    created (){
      this.reportRequest(this.currentPage);
    },
    mounted (){
      window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
      reportRequest(page) {
        progressReportreQuest(page).then((res) => {
          let code = res.data.code;
          if(code !== 200){
            console.log(res.data.message);
            return;
          }
          this.isLoading = false;
          this.currentPage = res.data.data.currPage;
          this.totalPage = res.data.data.totalPage;
          if(this.currentPage === 1){
            this.dataList = res.data.data.list;
          }else{
            this.dataList.concat(res.data.data.list)
          }
          this.currentPage < this.totalPage ? this.getDataDone = true: this.getDataDone = false;

        })
      },
      handleScroll() {
        let _this = this;
        var offsetHeight = document.body.scrollHeight;
        var clientHeight = document.body.clientHeight;
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
          scrollTop = document.body.scrollTop;
        }
        if (offsetHeight - clientHeight - scrollTop <= 50 && _this.getDataDone) {
          _this.getDataDone = false;
          _this.currentPage++;
          _this.reportRequest(_this.currentPage);
        }
      },
    }
  }
</script>
<style lang="scss" scoped>

    $bg:#f7f9fa;
    $white-bg:#fff;
    .report{
      background: $bg;
      width: 100%;
      /*height: 100%;*/
      .report-list{
        width: 7.5rem;
        padding-top: 0.2rem;
        margin: 0 auto;
        .list-con{
          display: flex;
          width: 100%;
          box-sizing: border-box;
          padding: 0.24rem 0.3rem 0.36rem;
          /*border-top: 1px solid rgba(218,222,228,0.60);*/
          background: $white-bg;
          .left{
            width: 1.8rem;
            height: 1.8rem;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .right{
            position:relative;
            width:4.8rem;
            margin-left: 0.3rem;
            .r-title{
              width: 100%;
              height: 1.2rem;
              font-size: 0.28rem;
              color: #666A7F;
              line-height: 0.4rem;
              text-align: justify;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              line-clamp:3;
              -webkit-line-clamp:3;
              -webkit-box-orient: vertical;
            }
            .r-date{
              position:absolute;
              bottom: 0;
              width: 100%;
              font-size: 0.26rem;
              line-height: 0.37rem;
              color: #818C9E;
              text-align: right;
            }
          }
        }
        .list-con:first-of-type{
          border-top: none;
        }
      }
    }
</style>
