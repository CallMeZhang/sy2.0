<template>
    <section v-title="title" id="a">
            <div class='main'>
                <img src="../../../static/images/bizbuy/upgrade.png" class='logo' alt="">
                <p class='text'>我们正在进行系统维护,暂不支持访问</br>相关功能,敬请期待全新版本。</p>
            </div>
    </section>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return {
                title:"系统维护"
            }
        },
        methods:{},
        watch:{},
        computed:{},
        filters:{},
        created(){

        },
        mounted(){
//            setTimeout(()=>{
//                this.$loading.show = false
//                this.$header.show = false//用于2.0 升级页面显示影藏导航 3.0升级页面显示导航再显示出来
//                this.$header.setTitle("系统维护")
//            },0)
        }
    }
</script>

<style scoped lang="scss">
#a{
    height:100%;
    overflow:hidden;
}
.main{
    width:100%;
    text-align:center;
    background:#fff;
    .logo{
        width:3.1rem;
        height:3.1rem;
        margin-top:3.29rem;
    }
    .text{
        height:0.96rem;
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        color:rgba(75,75,75,1);
        line-height:0.48rem;
        margin-top:0.3rem;
    }
    .bj{
        width:6.14rem;
        height:4.46rem;
        margin-top:1rem;
    }
    .download{
        height: 1rem;
    }
    .download:empty{
        display:none;
    }
}
</style>
