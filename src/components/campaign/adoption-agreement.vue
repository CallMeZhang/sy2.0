<template>
  <div >
    <!--<div v-title="'认养协议'"></div>-->
    <sy-loading :show="isLoading"></sy-loading>
   <div class="agreement">
     <transition name="fade">
       <div v-show="!isLoading">
         <div class="agreement-con">
           <h2 class="agreement-title">「我的苹果树」公益认养协议</h2>
           <p>本协议是一起善源平台（以下简称“平台”）认养者参与平台的苹果树认养项目时与平台签订的具有法律约束力的协议文本，认养者在仔细阅读并勾选“我同意「我的苹果树」公益认养协议”后进入后续的果树认养环节，待认养者选择好自己需要的认养类型（包括但不限于多颗树认养、单棵数认养、定制苹果认养等形式）并完成相应认养费用的支付后，该协议即签订生效并对认养者和平台产生法律约束力。</p>
           <p>1.认养者在平台认养一定数量的苹果树/苹果，支付相应费用后，平台向认养者提供果树生长信息，定期举办认养福利系列活动（详见平台中苹果树认养首页「进展播报」版块），认养者自愿选择参加。</p>
           <p>2.认养基地向已完成支付的认养者无限次免费开放游览，如需前往当地采摘，必须提前与客服预约（联系电话：4006667308）统一安排。认养者只可采摘个人挂牌果树的苹果，由认养基地工作人员免费提供指定纸箱装箱（不同规格共18个箱子），多余纸箱需求请额外付费。</p>
           <p>3.在基地参观游览时，应服从当地活动组织方的相应要求，不得发生任何有损果树生长的行为，如有故意损坏果树生长的行为，将在协商后等额折损赔付予农户。</p>
           <p>4.此次扶贫认养的果树均按照当地园主的种植、养护标准进行测土配方、施有机肥料，浇水、除草、剪枝、除虫、疏果、套袋等正常人工管理方式，不接受特殊种植要求。</p>
           <p>5.认养一棵苹果树，可获得该树当季的所有苹果产量，经过正常疏果和人工拣选后约达100-120斤（平均约270个）优质苹果，共18箱，平均净重约110斤【其中90mm以上苹果1箱，85-90mm苹果4箱，80-85 mm苹果5箱，75-80 mm苹果6箱，75mm以下苹果2箱】。认养苹果树当季产量不足100斤的由平台按同等标准补足100斤，超过120斤的部分全部归认养者所有（超出部分邮寄费用由认养者承担）。</p>
           <p>6.平台会根据认养者需求，将苹果进行合理化包装后，通过快递方式寄送至认养者指定的收货地址，每棵树可享受8次包邮，超过8次的邮寄费用由认养者承担。</p>
           <p>7.认养者应认可苹果树因种植条件、气候原因等因素影响，结出的苹果可能会有颜色、形状、体积、重量、口感、甜度等方面的细微不同，均属正常情况，平台不对此做任何形式的保证和承诺。</p>
           <p>8.苹果在邮寄时，如因物流原因导致苹果受损，请及时联系客服：4006667308并拍照记录，我们将在24小时内核实情况并等量给认养者给予补偿。</p>
           <p>9.认养者认养支付成功7日后，将根据认养者需求挂牌、专人管理，支付成功7日内可无条件申请退款，7日后将不予退款。</p>
           <p>10.若由于不可抗拒的因素导致果树/苹果灭失，平台会及时通知认养者，由双方友好协商处理，但平台不承担任何赔偿责任，仅承诺在开展下期果树认养项目时，该认养者受损的先期认养行为继续有效。</p>
           <p>11.平台中与苹果树认养项目相关的规则、告知和活动通知等文本是本协议不可分割的组成部分，与本协议具有同等法律效力。</p>
           <p>12.若因本认养协议发生争议，双方应协商解决，协商不能解决的，双方均可向平台所在地有管辖权的人民法院提起诉讼。</p>
           <div class="agreement-date">
             <p class="date-con">一起善源平台·中益善源（北京）科技有限公司</p>
             <span>二〇一八年四月</span>
           </div>
           <div class="agreement-btn sy-blue-bg iphonex-bottom-div" @click="skipUrl()">我已阅读并同意以上协议</div>
           <div style="width: 100%;height: 0.1rem;background: #fff;"></div>
         </div>
       </div>
     </transition>
   </div>
  </div>
</template>
<script>
  import ss from '@/modules/_ss/index'
  import * as req from '@/requests/campaign'
  export default{
    data(){
      return {
        isLoading:true,
        goToType: '',
        orderSn:"",//订单编号
      }
    },
    created (){
     this.goToType = this.$route.query.type;
//       this.goToType = decodeURIComponent(this.getSearchString('type'));
    },
    mounted (){
      this.$nextTick(()=>{
        this.isLoading =false;
      })
    },
    methods: {
      skipUrl (){
        var testUrl = window.location.href;
        console.log(testUrl)
        console.log(this.goToType);
        // if (this.goToType == '苹果树') {
        if (this.goToType == 'tree') {
           /*let appleTreePayUrl = this.siteInfo.host + '/choose/region';
           this.appjs.syJsbLaunchWebview(appleTreePayUrl);*/
         this.$router.push('/choose/region');
        }
        // if (this.goToType == '苹果') {
        if (this.goToType == 'apple') {
          var productsData = ss.getSsItem('selectedProducts');
          console.log('协议')
//          console.log(productsData);
          req.placeOrderPostMethod(productsData).then((res) => {
            console.log(res.data)
            if(res.data.code == 200){
              this.orderSn = res.data.data.orderSn;
              ss.setSsItem('submitSuccessOrderSn',res.data.data.orderSn);
               /*let applePayUrl = this.siteInfo.host + '/appleTreePay?orderSn='+ res.data.data.orderSn
               this.appjs.syJsbLaunchWebview(applePayUrl);*/
              this.$router.push('/appleTreePay?orderSn='+ res.data.data.orderSn);
            }else{
              console.log(res.data.message)
            }
          },(error) =>{
            console.log(error)
          })
        }
      },
      getSearchString(key) {
        // 获取URL中?之后的字符
        var str = window.location.search;
        str = str.substring(1,str.length);
        // 以&分隔字符串，获得类似name=123这样的元素数组
        var arr = str.split("&");
        var obj = new Object();
        // 将每一个数组元素以=分隔并赋给obj对象
        for(var i = 0; i < arr.length; i++) {
          var tmp_arr = arr[i].split("=");
          obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
        }
        return obj[key];
      }
    },
  }
</script>
<style lang="scss" scoped>
  $black-c: #333;
  .agreement-con {
    width: 7.5rem;
    margin: 0.2rem auto 0;
    .agreement-title {
      width: 6.9rem;
      padding: 0 0.3rem;
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.36rem;
      text-align: center;
    }
    p {
      margin-top: 0.24rem;
      width: 6.9rem;
      padding: 0 0.3rem;
      text-align: justify;
      text-indent: 2em;
      font-size: 0.26rem;
      line-height: 0.4rem;
    }
    .agreement-btn {
      margin: 0.6rem auto 0.53rem;
      width: 5.7rem;
      height: 1rem;
      font-size: 0.32rem;
      line-height: 1rem;
      text-align: center;
      color: #fff;
      border-radius: 0.08rem;
    }
    .agreement-date{
      text-align:center;
      .date-con{
        text-align: right;
      }
      span{
        padding-left:1.89rem;
        text-align:center;
      }
    }
  }
</style>
