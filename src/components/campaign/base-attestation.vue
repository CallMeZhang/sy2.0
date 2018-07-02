<template>
    <div>
      <sy-loading :show="isLoading"></sy-loading>
      <transition name="fade">
        <div v-show="!isLoading">
          <div class="flow">
            <div class="title"><span class="yellowbar"><img src="/static/images/icon/yellowbar.png" alt=""></span><span style="margin-left: 0.26rem">农户版主名片</span></div>
            <div class="flowimg"><img src="/static/images/campaign/bg2.jpg" alt=""></div>
            <div class="serves">
              陕西省咸阳市旬邑县张洪镇蒙家村人，与88岁老父亲相依为命，因为小时患有小儿麻痹症、家境贫寒至今没成家。他非常热爱苹果种植，平常最喜欢的事情就是探索学习怎样才能种好苹果树，他崇尚自然养护，让大家吃上健康果是他的本职。
            </div>
            <div class="flowimg"><img src="/static/images/campaign/bg2.jpg" alt=""></div>
            <div class="serves">
              陕西省咸阳市旬邑县张洪镇新昌村人，一家六口，自己患有心脑血管疾病，不能从事过重的苦力活，老伴儿66岁患有脑积液多年。典型因学致贫家庭，孙子孙女在外读大学，所有经济来源为种植果树。
            </div>
            <div class="flowimg"><img src="/static/images/campaign/bg2.jpg" alt=""></div>
            <div class="serves">
              陕西省咸阳市旬邑县张洪镇新昌村人，身为儿子需要承担80岁父母的赡养义务，还要抚养两个儿子。家里房房屋陈旧，孩子的婚事压得张建强夫妇喘不过气，5亩果园是他们唯一的希望，起早贪黑劳作却遭遇连年的冰雹灾害，果市近年不景气，年年滞销，生活艰辛刻在脸上，让他们显得和年龄不般配的苍老。
            </div>
            <div class="flowimg"><img src="/static/images/campaign/bg2.jpg" alt=""></div>
            <div class="serves">
              陕西省咸阳市旬邑县张洪镇新昌村人，一家七口，患有贫血经常出现间歇性头昏。老伴儿72岁，一生劳累过度，腰部疾病严重，近几年已经无法直立，走路时两手压腿弯腰挪行，今年冰雹灾害严重，入不敷出。儿子在外打工，儿媳照顾三个孩子，年过古稀却风雨无阻在果园劳作。
            </div>
            <div class="flowimg"><img src="/static/images/campaign/bg2.jpg" alt=""></div>
            <div class="serves">
              陕西省咸阳市旬邑县张洪镇新昌村人，一人劳作养活家里六口，儿子和儿媳在外打工，两个孙子由张寿平两口抚养。体谅儿子在外不易，自己做一年的苦力活供两个孙子上学，文化水平有限，对孩子的教育也无能为力，希望自己再多干些活，让孩子不受委屈。
            </div>
          </div>
          <div class="flow">
            <!--<div class="title"><span class="yellowbar"><img src="/static/images/icon/yellowbar.png" alt=""></span><span style="margin-left: 0.26rem">有机认养证书</span></div>
            <div class="flowimg"><img src="/static/images/campaign/bg2.jpg" alt=""></div>-->
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
    export default {
      name: "base-attestation",
      data (){
        return {
          isLoading: true,
        }
      },
      created (){},
      mounted (){
        this.$nextTick(()=>{
          this.isLoading = false;
        })
      },
    }
</script>

<style scoped lang="scss">
    .flow{
        background: #fff;
        width: 100%;
        padding: 0.24rem 0.3rem 0.2rem;
        box-sizing: border-box;
        position: relative;
        .title{font-size:0.3rem;
            color: #4B4F63;
            text-align: left;
            .yellowbar{
                width: .38rem;
                height: .7rem;
                position: absolute;
                left: 0.18rem;
                top: 0.1rem;
                img{width: 100%;height: 100%;}
            }
        }
        .flowimg{
            width: 6.9rem;
            height: 3.96rem;
            margin: 0.2rem auto 0;
            img{width: 100%;height: 100%;}
        }
        .serves{
            width: 6.9rem;
            box-sizing: border-box;
            margin: 0 auto 0.2rem;
            padding: 0.2rem 0.1rem 0.1rem;
            font-size: 0.28rem;
            color: #666A7F;
            line-height: 0.46rem;
            box-shadow: 0 0.02rem 0.04rem 0 rgba(0,0,0,0.10);
        }
    }

</style>
