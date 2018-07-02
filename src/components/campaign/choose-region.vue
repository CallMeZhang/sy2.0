<template>
  <div class="region">
    <sy-loading :show="isLoading"></sy-loading>
    <transition name="fade">
      <div v-show="!isLoading" class="region-con">
        <div v-for="(item, index) in regionList">
          <div class="region-item" :class="{'region-item-selected':item.flag}" @click="chooseRegion(index)">
            <img :src="item.areaUrl" onerror="this.src='/static/images/campaign/trees_naming_default2.jpg'" alt="area">
            <div class="region-word">
              <h3 class="region-name">{{item.areaName}}</h3>
              <p class="region-txt">已认养<span>{{item.treeNum ? item.treeNum : 0}}</span>棵</p>
            </div>
            <div class="mask-layer" :class="{'mask-layer-none':item.flag}"></div>
            <div class="confirm-btn " v-if="item.flag" @click="jumpLink()">确定</div>
          </div>
        </div>

      </div>
    </transition>
  </div>
</template>
<script>
  import {chooseAdoption} from '@/requests/campaign'
  export default{
    data (){
      return {
        isLoading: true,
        layerHide: false,
        regionToken:'',
        areaId: '',//版块名称
        showBtn: false,
        regionList:[
          /*{
            "name":"许愿林",
            "quantity": "1650",
            "selected": false,
          },{
            "name":"结义园",
            "quantity": "217",
            "selected": false,
          },{
            "name":"情人坡",
            "quantity": "120",
            "selected": false,
          },{
            "name":"亲子邦",
            "quantity": "1683",
            "selected": false,
          }*/
        ],
        postRegion:{},
      }
    },
    created (){
      this.regionData()
    },
    mounted (){},
    methods: {
      chooseRegion (index){
        this.regionList.forEach((list) =>{
          list.flag = false;
        })
        this.regionList[index].flag = true;
        this.postRegion = this.regionList[index];
        this.areaId = this.regionList[index].areaId;
        console.log(this.postRegion);
      },
      regionData(){
//        console.log('regionData 执行')
        chooseAdoption().then((res) =>{
          this.isLoading = false;
          let content = res.data;
          console.log(content)
          if(content.code === 200){
            this.regionList = content.data.appleTreeMap;
          }else if(content.code == 301){
            this.jumpToLogin()
          }else{
            console.log(content.message);
          }
        },(err) =>{
          console.log(err);
        })
      },
      jumpLink(){
        this.$router.push('/trees/naming?areaId='+this.areaId);
        // let regionUrl = this.siteInfo.host + '/trees/naming?areaId='+this.areaId;
        // this.appjs.syJsbLaunchWebview(regionUrl);
      },
      jumpToLogin() {
        let callbackUrl = encodeURIComponent(this.siteInfo.host + '/choose/region');
        window.location.href = this.siteInfo.host_old + '/api/index.php?act=login&callback=' + callbackUrl;
      },
    },
  }
</script>
<style lang="scss" scoped>
  $region-bg: #fff;
  $white-color: #fff;
  img{display:block;border:0;}
  .region{
    width: 100%;
    height: 100%;
  }
  .region-con{
    position: relative;
    margin-top: 0.2rem;
    padding-top: 0.2rem;
    width: 7.5rem;
    background: $region-bg;
    padding-bottom: 1.5rem;
    .region-item{
      position: relative;
      margin: 0 auto 0.3rem;
      width: 6.9rem;
      height: 3.73rem;
      background: rgba(0,0,0,0.44);
      img{
        width: 100%;
        height: 100%;
      }
      .region-word{
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 2;
        transform: translate(-50%, -50%);
        color: $white-color;
      }
      .region-name{
        margin: 0 auto 0.1rem;
        width: 6.6rem;
        text-align: center;
        font-size: 0.42rem;
        line-height: 0.59rem;
      }
      .region-txt{
        width: 6.6rem;
        margin: 0 auto;
        text-align: center;
        font-size:0.28rem;
        line-height: 0.4rem;
      }
    }
    .region-item-selected{
      box-shadow: 0 2px 8px 0 rgba(0,0,0,0.50);
    }
    .mask-layer{
      position: absolute;
      left:0;
      top:0;
      z-index: 1;
      width: 6.9rem;
      height: 3.73rem;
      background: rgba(0,0,0,0.44);
    }
    .mask-layer-none{
      z-index: -1;
    }
    .confirm-btn{
      position: fixed;
      bottom: 0.53rem;
      left: 50%;
      z-index: 3;
      transform: translateX(-50%);
      width: 5.61rem;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      font-size: 0.38rem;
      color: #fff;
      border-radius: 0.08rem;
      background: #4A90E2;
    }
  }
</style>
