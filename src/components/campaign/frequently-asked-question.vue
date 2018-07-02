<template id="fAQ">
    <div class="faq">
      <sy-loading :show="isLoading"></sy-loading>
      <transition name="fade">
        <div v-show="!isLoading">
          <div class="top-line"></div>
          <div class="faq-content">
            <div  v-for="item in fAQList">
              <h3 class="title">{{item.title}}</h3>
              <div v-for="one in item.list">
                <div class="faq-q"><span>Q：</span>{{one.q}}</div>
                <div class="faq-a"><span>A：</span>{{one.a}}</div>
              </div>
            </div>
          </div>
        </div>
      </transition>

    </div>
</template>
<script>
    export default{
        name: 'frequentlyAskedQuestion',
        data (){
            return {
              isLoading: true,
                fAQList:[
                    {
                        title:"项目相关",
                        list:[{
                            q:'“我的苹果树”是什么？',
                            a:'“我的苹果树” 是平台认养模式新尝试，由「一起善源」平台发起的「我的苹果树」扶贫认养项目，也是中国银行精准扶贫工作落地的重点项目之一。'
                        },{
                            q:'“我的苹果树” 核心意义是什么？',
                            a:'通过新兴认养模式，令简单泛味的农事作业华丽转身，给贫困地区带来客流、信息流、资金流；彻底解决一家一户分散经营难以增收的核心问题，更重要的是认养农业模式推动了一、二、三产业的深度融合，带动全村果农勤劳致富。'
                        },{
                            q:'“认养助力”是什么？',
                            a:'苹果树认养是创新扶贫模式，无论认养树还是定制苹果，均为自愿行为，如果您暂时还未决定认养，可以点击“助力”并转发分享，每300人助力我们会为当地留守儿童送去一袋大米，让更多人加入我们的队伍中吧。'
                        }
                        ]
                    },
                    {
                        title:"规则相关",
                        list:[{
                            q:'如何参与苹果树认养活动？',
                            a:'认养分为认养果树、定制苹果两种方式，认养苹果树将获得每棵树100斤左右原生态种植的富士苹果 + 100%优质服务+公益认养证书+定制工作台历+精美削皮器，您还可以亲临基地游玩，与您的果树来个跨越屏幕的深情拥抱！'
                        },{
                            q:'认养的数量有限制吗？',
                            a:'公益认养无上限，多多益善。此次项目共有两种形式：认养和定制。认养果树根据认养数量将价格分为三档：1-4棵、5-9棵、10棵及以上；定制苹果不仅仅收获苹果，还可以获得定制证书，整个认养项目各项服务均可优先参与、优惠享受。',
                        },{
                            q:'认养苹果树后，是如何帮扶贫困户的？',
                            a:'农户收到您支付的养护费用，开始为您精心呵护您的果树。您的养护费将乘以10倍算作您的公益积分，10%的钱也将以您的名义捐助当地贫困户。',
                        },{
                            q:'我想以团体名义认养树，该如何操作？',
                            a:'您可在首页点击【我要认养】，选择认养数量及区域，为给您提供更优质便捷的服务，如有任何问题，请直接联系我们签署合同、支付款项以及开具发票等，联系电话400-666-7308。',
                        },{
                            q:'认养成功后，我的苹果树多久可以挂牌？',
                            a:'认养后一周内。我们会对照后台编号，写上您果树的名字，果农为您挂牌，并为您的挂牌拍照。',
                        },{
                            q:'认养到收获过程有七个月以上，过程中有什么活动和服务吗？',
                            a:'认养一棵树需要6-7个月，成熟后用户可线上自主下单，并可以把这份爱心认养的故事分享给更多人。在这过程中会有很多活动专题、专项服务带给大家，更有福利抽奖活动，动动手指可能赢取大奖哦！而且认养用户能通过我们的报道看到果树从开花到结果的生长动态，了解贫困户生活情况，以及更多增值服务项目和互动福利，保证公益看得见，认养不乏味。',
                        }
                        ]
                    },
                    {
                        title:'赔付相关',
                        list:[{
                            q:'如何保障认养风险？',
                            a:'在协议方面，项目中会签署三方协议，正式认养购买时，请您详细阅读认养协议内容进行勾选，其次您可以在「基地认证」中看到养护人信息，责任监管到人，您可安心。如因物流引起的果实损坏情况，请速速联系我们~'
                        },{
                            q:'如何申请退款？',
                            a:'公益认养旨在扶贫，如订单生成后款项即给到农户开始为您悉心养护，我们支持支付后7日内可无条件退款，7日之后我们将挂牌养护，不予退款，详见协议内容。如遇到旱涝虫灾等自然灾害，款将不予退回。如有其他款项问题可联系客服400-666-7308。'
                        }]
                    },
                    {
                        title:'邮寄问题',
                        list:[{
                            q:'如何收到我的果子？',
                            a:'果子十月成熟，农户月底完成采摘入库，当然您可以预约现场采摘哦，也可以在我们的活动页面的邮寄入口，输入订单号，方便您可以随时下单邮寄。'
                        }]
                    }
                ],
            }
        },
      created (){
            let params = this.$route.params.num
        },
      beforeMount (){
        /*let title = document.title;
        if(title !== '常见问题'){
          document.title = '常见问题'
        }*/
      },
      mounted (){
        this.$nextTick(()=>{
          this.isLoading = false;
        })
      },
      methods: {

      }
    }
</script>
<style lang="scss" scoped>
    .faq{
        width: 100%;
        height: 100%;
        .top-line{width: 100%;height: 0.2rem;background: #F7F9FA}
        .faq-content{
            width: 100%;
            padding: 0 0.3rem 0.21rem;
            box-sizing: border-box;
            .title{
                font-size: 0.36rem;
                color: #4B4F63;
                line-height: 0.54rem;
                text-align: center;
                margin-bottom: 0.32rem;
                padding-top: 0.21rem;
            }
            .faq-q{
                font-size: 0.28rem;
                color: #666A7F;
                line-height: 0.4rem;
                font-weight: 300;
                margin-bottom: 0.15rem;
            }
            .faq-a{
                font-size: 0.26rem;
                color: #666A7F;
                font-weight: 300;
                line-height: 0.37rem;
                margin-bottom: 0.16rem;
            }
        }
    }
</style>
