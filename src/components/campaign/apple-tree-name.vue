<template>
  <div class="trees-naming">
    <sy-loading :show="isLoading"></sy-loading>
    <transition name="fade">
      <div v-show="!isLoading" class="naming-con">
        <div class="naming-top"><img :src="getAreaData.image" onerror ="this.src='/static/images/campaign/trees_naming_default2.jpg'" alt=""></div>
        <div class="naming-title">您已入住<span>{{getAreaData.treeName}}</span>板块，快为您的苹果树起个名字吧！</div>
        <div class="naming-list" v-for="(item, index) in treesNaming">
          <!--苹果树为1棵-->
          <div class="list-con" v-if="defaultNums == 1">
            <div class="list-l">果树命名：</div>
            <div class="list-r"><input type="text" placeholder="请输入果树名称" v-model="item.name" maxlength="14" @blur="checkText(item, index)"></div>
          </div>
          <!--大于1个-->
          <div v-if="defaultNums > 1">
            <div class="list-con2">
              <div class="list-con2-top">
                <div class="list-l">果树<span v-if="treesNaming.length != 1">{{index+1}}</span>命名：</div>
                <div class="list-r"><input type="text" placeholder="请输入果树名称" maxlength="14" v-model="item.name" @blur="checkText(item, index)"></div>
              </div>
              <div class="list-con2-bottom" v-if="index+1 == treesNaming.length">
                <button @click="delTreeNames(index)" v-if="item.delBtn">删除</button>
                <button @click="addTreeNames(index)" :class="treesNaming.length == defaultNums ? 'btn-gray' : ''">添加</button>
              </div>
            </div>
          </div>
        </div>
        <p class="naming-note">备注:果树命名确认后将不可修改</p>
        <div class="naming-btn-con iphonex-margin-bottom">
          <div class="btn-con-l" @click="giveUp()">放弃命名</div>
          <div class="btn-con-r" @click="confirmBtn(treesNaming)">确认</div>
        </div>
        <div class="space-between"></div>
      </div>
    </transition>

  </div>
</template>
<script>
  import * as req from '@/requests/campaign'
  import sS from '@/modules/_ss/index'
  import {Toast} from 'mint-ui';
  export default{
    data (){
      return {
        isLoading: true,
        area_id: '',
        treesNaming: [],//存储苹果树名字
        defaultNums: 0,//选中的苹果树数量
        addNum: 0,
        getAreaData: {},
        namesLenth: 0,//多棵苹果树
        isAddBtn: true,//是否点击添加
        postNameArr: [],//已命名的果树
        postAllData:{},//session storage 订单数据
        order_sn: '',//订单号
      }
    },
    created (){
      this.getTreesData();
      this.showDefaultNamingArr();
    },
    mounted (){
    },
    methods: {
      getTreesData(){
        if(this.$route.query.areaId){
          this.area_id = this.$route.query.areaId;
          console.log('id:',this.area_id)
        }else{
          console.log('areaId 不存在');
        }
        req['appleTreeNamingRequest'](this.area_id).then((res) =>{
          this.isLoading = false;
          let con = res.data;
          if(con.code ==200){
            this.getAreaData = con.data;
          }else if(con.code == 301){
            this.jumptoLogin();
          }else{
            console.log(con.message)
          }
        });
      },
      getLocalData(){//获取本地数据
        this.postAllData = sS.getSsItem('selectedProducts');
        this.postAllData.area_Id = parseInt(this.area_id);
        this.defaultNums = this.postAllData.quantity;
        sS.setSsItem('selectedProducts',this.postAllData);
      },
      showDefaultNamingArr(){//默认显示
        this.getLocalData();
        if(this.defaultNums == 1){
          this.treesNaming.push({"name":'',"delBtn":false})
        }else if(this.defaultNums > 1){
          this.treesNaming.push({"name":'',"delBtn":false})
        }
      },
      addTreeNames(index){//添加名称
          if(this.defaultNums > this.treesNaming.length) {
              this.treesNaming.push({"name": '',"delBtn": true})
          }
      },
      delTreeNames(index){//删除名称
        if(this.treesNaming.length > 1){
          this.treesNaming.splice(index,1);
        }
      },
      checkText(item,index){
        if(item.name.trim() ===''){
          Toast({message: '请输入果树'+index+'名字',position: 'center',duration: 2000});
        }
      },
      confirmBtn(obj){
        console.log("confirmBtn")
        this.postNameArr = [];
        var isEmpty= null;//所有的命名不为空
        isEmpty = obj.every((x)=>{
         return x.name !== '';
        })
        console.log("isEmpty: "+isEmpty);
          console.log(obj);
        obj.forEach((list, index, arr) =>{
          let k = index;
          if(list.name === ''){
            Toast({message: '请输入果树'+(k+1)+'名字',position: 'center',duration: 2000});
            return false;
          }else{
            this.postNameArr.push(list.name)
          }
        });
        if(this.postNameArr.length > 0 && isEmpty){
          this.postAllData.treesNames = this.postNameArr.toString();
          req.placeOrderPostMethod(this.postAllData).then((res) =>{
            let code = res.data.code;
            if(code === 200){
              this.order_sn = res.data.data.orderSn;
              sS.setSsItem('submitSuccessOrderSn',res.data.data.orderSn);
              /*let treesUrl = this.siteInfo.host + '/appleTreePay?orderSn='+res.data.data.orderSn;
              this.appjs.syJsbLaunchWebview(treesUrl);*/
              this.$router.push('/appleTreePay?orderSn='+res.data.data.orderSn);
            }else if(code === 301){
              console.log(res.data.message);
              this.jumptoLogin();
            }else{
              console.log(res.data.message);
            }
//            return false;

          });
        }
      },
      giveUp(){
        this.postNameArr = [];
        this.postAllData.treesNames = this.postNameArr;
        console.log('giveUp');
        console.log(this.postAllData);
        req.placeOrderPostMethod(this.postAllData).then((res) =>{
          let code = res.data.code;
          if(code === 200){
            this.order_sn = res.data.data.orderSn;
            sS.setSsItem('submitSuccessOrderSn',res.data.data.orderSn);
           /* let treeUrl = this.siteInfo.host + '/appleTreePay?orderSn='+res.data.data.orderSn;
            this.appjs.syJsbLaunchWebview(treeUrl);*/
            this.$router.push('/appleTreePay?orderSn=' + res.data.data.orderSn);
          }else if(code === 301){
            console.log(res.data.message);
            this.jumptoLogin();
          }else{
            console.log(res.data.message);
          }

        });
      },
      jumptoLogin() {
        let callbackUrl = encodeURIComponent(this.siteInfo.host + '/trees/naming?areaId='+this.area_id);
        window.location.href = this.siteInfo.host_old + '/api/index.php?act=login&callback=' + callbackUrl;
      },
    },
  }
</script>
<style lang="scss" scoped>
  $name-bg: #f7f9fa;
  $red-color: red;
  $name-white: #fff;
  $btn-bg: #4A90E2;
  input,button{background:none;border:none;margin:0;padding:0;}
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {color: #DADEE4;}
  /*input:-moz-placeholder, textarea:-moz-placeholder {color: #DADEE4;}
  input::-moz-placeholder, textarea::-moz-placeholder {color: #DADEE4;}
  input:-ms-input-placeholder, textarea:-ms-input-placeholder {color: #DADEE4;}*/
  .trees-naming{
    width: 100%;
    height: 100%;
  }
  .naming-con{
    width: 7.5rem;
    background: $name-bg;
    margin: 0 auto;
    padding-top: 0.24rem;
    .naming-top{
      width: 6.9rem;
      margin: 0 0.3rem;
      height: 4.76rem;
      box-sizing: border-box;
      background: #fff;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .naming-title{
      display: table-cell;
      vertical-align: middle;
      margin-top: 0.2rem;
      width: 6.9rem;
      padding: 0 0.3rem;
      height: 0.84rem;
      line-height: 0.42rem;
      font-size: 0.3rem;
      color: #4B4F63;
      background: $name-white;
    }
    .naming-list{
      width: 100%;
    }
    .list-con{
      margin-top: 0.2rem;
      display: flex;
      flex-flow: row nowrap;
      width: 100%;
      height: 0.84rem;
      padding: 0 0.3rem;
      font-size: 0.28rem;
      box-sizing: border-box;
      background: $name-white;
      .list-l{
        min-width: 1.57rem;
        height: 0.84rem;
        line-height: 0.84rem;
      }
      .list-r{
        flex: 1;
        height: 0.84rem;
        input{
          width: 100%;
          height: 0.84rem;
          text-align: center;
        }
      }
    }
    .list-con2{
      margin-top: 0.2rem;
      padding: 0 0.3rem;
      font-size: 0.28rem;
      box-sizing: border-box;
      background: $name-white;
      .list-con2-top{
        width: 100%;
        height: 0.84rem;
        display: flex;
        flex-flow: row nowrap;
      }
      .list-l{
        min-width: 1.57rem;
        height: 0.84rem;
        line-height: 0.84rem;
      }
      .list-r{
        flex: 1;
        height: 0.84rem;
        input{
          width: 100%;
          height: 0.84rem;
          text-align: center;
        }
      }
      .list-con2-bottom{
        width: 6.9rem;
        height: 0.74rem;
        line-height: 0.74rem;
        text-align: right;
        border-top: 1px solid rgba(218,222,228,0.60);
        button{
          width: 0.8rem;
          height: 0.4rem;
          line-height: 0.4rem;
          text-align: center;
          font-size: 0.24rem;
          color: #818C9E;
          border: 1px solid #818C9E;
          border-radius: 0.08rem;
          margin-left: 0.3rem;
        }
        .btn-gray{
          border:1px solid #d0d0d0;
          color: #d0d0d0;
        }
      }
    }
    .naming-note{
      margin-top: 0.2rem;
      width: 6.9rem;
      padding: 0 0.3rem;
      line-height: 0.3rem;
      text-align: right;
      font-size: 0.22rem;
      color: #818C9E;

    }
    .naming-btn-con{
      position: fixed;
      bottom: 0;
      display: flex;
      width: 100%;
      padding:0 0.3rem 0.4rem;
      flex-flow: row nowrap;
      justify-content: space-between;
      box-sizing: border-box;
      div{
        width: 3.3rem;
        height: 0.84rem;
        line-height: 0.84rem;
        text-align: center;
        font-size: 0.28rem;
        color: #FFFFFF;
        background: $btn-bg;
        border-radius: 0.08rem;
      }
    }
    .space-between{
      width: 100%;
      height: 5.6rem;
    }
  }
</style>
