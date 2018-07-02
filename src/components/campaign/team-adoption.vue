<template>
    <div style="background: #F7F9FA;width: 100%;height: 100%;">
        <div class="bg-line"></div>
        <div class="team-zi">您好，欢迎认养旬邑健康有机种植的苹果树！由于团体认养每一环节非常关键，我们会有专项客服对接整个流程，请拨打认养热线：400-xxx-xxxx。您可在首页【认养地图】中查看已入驻的团体哦~</div>
        <div class="bg-line"></div>
        <div class="flow">
            <div class="title"><span class="yellowbar"><img src="/static/images/icon/yellowbar.png" alt=""></span><span style="margin-left: 0.26rem">团体认养流程</span></div>
            <div class="flowimg"><img src="/static/images/campaign/flowimg.png" alt=""></div>
        </div>
        <div class="bg-line"></div>
        <div class="flow">
            <div class="title"><span class="yellowbar"><img src="/static/images/icon/yellowbar.png" alt=""></span><span style="margin-left: 0.26rem">团体认养服务</span></div>
            <div class="serves">1. 团体一次认养至少10棵苹果树，每棵树提供100斤有机种植的富士苹果，其中75-80mm占比27%、80-85mm占比42%，85-90mm占比31%；</div>
            <div class="serves">2.免费为团体立牌；</div>
            <div class="serves">3. 12月31日前颁发团体认养证书；</div>
            <div class="serves">4.赠送定制台历（每棵树送1本）；</div>
            <div class="serves">5.更加优惠的价格。</div>
        </div>
        <div class="btn" @click="callPhone('400-666-7308')"><img src="/static/images/campaign/btnhotline.png" alt=""></div>
    </div>
</template>

<script>
    export default {
        name: "team-adoption",
        data(){
            return{
                is_share:false,
            }
        },
        created(){
            this.is_share = /is_share=yes/ig.test(window.location.href)
        },
        methods:{
            callPhone(num){
                var member_mobile=num
                if (!!member_mobile) {
                    if (this.is_share) {
                        window.location.href = 'tel:' + member_mobile
                    } else {
                        this.appjs.syJsbCallPhone(member_mobile)
                    }
                } else {
                    this.appjs.syJsbAlert('暂无联系方式')
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    .bg-line{
        width: 100%;
        height: 0.2rem;
        background: #F7F9FA;
    }
    .team-zi{
        background: #fff;
        padding: 0.2rem 0.3rem;
        font-size: 0.3rem;
        color: #8F99A9;
        line-height: 0.48rem;
        text-align: left;
    }
    .flow{
        background: #fff;
        width: 100%;
        padding: 0.24rem 0.3rem 0.2rem;
        box-sizing: border-box;
        position: relative;
        .title{font-size:0.3rem;
            color: #4B4F63;
            text-align: left;
            margin-bottom: 0.16rem;
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
            width: 100%;
            height: 1.13rem;
            img{width: 100%;height: 100%;}
        }
        .serves{
            font-size: 0.3rem;
            color: #666A7F;
            line-height: 0.48rem;
            font-weight: 300;
        }
    }
    .btn{
        width: 6.9rem;height: 0.88rem;
        margin: 0.93rem 0.3rem 0.5rem;
        img{width: 100%;height: 100%}
    }
</style>