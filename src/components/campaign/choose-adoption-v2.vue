<template>
    <div class="adoption">
        <sy-loading :show="isLoading"></sy-loading>
        <transition name="fade">
            <div v-show="!isLoading">
                <div class="adoption-con">
                    <div class="title">认养苹果树</div>
                    <ul class="list-con" v-for="(item, index) in tree">
                        <li class="list" :class="{'list-selected': item.selected && isTreeSelect}" @click="selectProducts(item, index,'tpTree')">
                            <div class="list-top" v-if="item.selected && isTreeSelect">
                                <div class="span-left">{{item.rank_price}}元&ensp;/&ensp;{{item.unit_name}}</div>
                                <div class="span-right-selected">
                                    <span class="minus" @click="reduceTreeNum(item)">-</span>
                                    <input class="num" :value="item['quantity']" readonly>
                                    <span class="plus" @click="addTreeNum(item)">+</span>
                                </div>
                            </div>
                            <div class="list-top" v-else>
                                <div class="span-left">{{item.price}}元&ensp;/&ensp;{{item.unit_name}}</div>
                                <div class="span-right"></div>
                            </div>
                            <div class="list-bottom">{{item.goods_desc}}</div>
                        </li>
                    </ul>
                    <div class="title" >定制苹果</div>
                    <ul class="list-con" v-for="(item, index) in apple">
                        <li class="list" :class="{'list-selected': item.selected && !isTreeSelect}" @click="selectProducts(item, index,'tpApple')">
                            <div class="list-top" v-if="item.selected && !isTreeSelect">
                                <div class="span-left">{{item.price}}元&ensp;/&ensp;{{item.unit_name}} {{item.goods_name}}</div>
                                <div class="span-right-selected">
                                    <span class="minus" @click="reduceNum(item)">-</span>
                                    <input class="num" :value="item['quantity']" readonly>
                                    <span class="plus" @click="addNum(item)">+</span>
                                </div>
                            </div>
                            <div class="list-top" v-else>
                                <div class="span-left">{{item.price}}元&ensp;/&ensp;{{item.unit_name}} {{item.goods_name}}</div>
                                <div class="span-right"></div>
                            </div>
                            <div class="list-bottom">{{item.goods_desc}}</div>
                        </li>
                    </ul>
                    <div class="anonymity" @click="clickCryptonym()">
                        <p class="text">匿名认养<span>（您的姓名、头像将不公开）</span></p>
                        <i :class="{'choose':isCryptonym !== 0}"></i>
                    </div>
                </div>
                <div class="adoption-btn adoption-btn-selected iphonex-bottom-div" v-if="selectedBtn" @click="postData()">确定</div>
                <div class="adoption-btn iphonex-bottom-div" v-else>确定</div>
            </div>
        </transition>
    </div>
</template>
<script>
    import {myAppleTreeAdoptWay} from '@/requests/campaign'
    import {checkPlatform, checkBrowser, getCookie, setCookie} from '@/packages/utils/extension'
    import localS from '@/modules/_ls/index'
    import sS from '@/modules/_ss/index'
    export default {
        data (){
            return {
                isLoading: true,
                payOpenId:'',
                removeListBg: true,
                selectedBtn: false,
                isCryptonym: 0, //是否匿名
                appleTreeData: [],//苹果树
                appleData: [],//苹果
                quantity:"1",
                isWx:false, //微信平台
                isApp:false,
                jumpType:'',//跳转协议类型
                appleAndtreeData: [],
                apple:[],
                tree:[],
                postSelectedData:{
                    cryptonym: 0,
                    platform:''
                },
                isTreeSelect:false
            }
        },
        created (){
            console.log('created');
            this.whatPlatform();//判断app内外
            this.getAddoptionWayData();
        },
        mounted (){

        },
        methods: {
            getAddoptionWayData(){
                myAppleTreeAdoptWay().then((res) =>{
                    this.isLoading = false;
                    let con = res.data;
                    if(con.code !==200){
                        console.log(con.message);
                        return;
                    }
                    this.apple = con.data.list.apple;
                    this.tree = con.data.list.tree;

                    this.tree.forEach((list, index, arr) => {
                        list.quantity = 1; //list内 添加quantity 赋值1
                        list.rank_price = list.price
                    })
                    this.apple.forEach((list, index, arr) => {
                        list.quantity = 1; //list内 添加quantity 赋值1
                    })
                })
            },
            whatPlatform(){
                let that = this;
                this.appjs.syJsbGetAppInfo(function(appInfo){
                    if(appInfo){
                        that.isApp = true;
                    }
                });
            },
            selectProducts (item, index,type){
                if(type === 'tpTree'){
                    this.isTreeSelect = true
                    this.tree.forEach((list,index,arr) =>{
                        list.selected = false
                    });
                    this.tree[index].selected = true
                    this.selectedBtn =true;
                    this.$set(item,'platform','');
                    this.$set(item,'cryptonym',0);
                    this.$set(item,'area_Id',0);
                    this.postSelectedData = item;
                }else {
                    this.isTreeSelect = false
                    this.apple.forEach((list, index, arr) =>{
                        list.selected = false;
                    });
                    this.apple[index].selected = true;
                    this.selectedBtn = true;
                    this.$set(item,'platform','');
                    this.$set(item,'cryptonym',0);
                    this.$set(item,'area_Id',0);
                    this.postSelectedData = item;
                }
            },
            clickCryptonym (){//是否匿名
                this.isCryptonym === 0 ? this.isCryptonym =1 : this.isCryptonym =0;
                this.postSelectedData.cryptonym = this.isCryptonym;
            },
            reduceNum (item){
                if (parseInt(item['quantity']) < 2) {
                    return false
                }
                let num = parseInt(item['quantity']) - 1
                let productId = item['goods_id']
                item['quantity']--
            },
            addNum (item){
                let productId = item['goods_id'];
                item['quantity']++;
            },
            addTreeNum(item){
                ++item['quantity'];
                for(var i=0;i<item.price_ranks.length;i++){
                    if(item['quantity'] >= item.price_ranks[i].min_num && item['quantity'] <= item.price_ranks[i].max_num){
                        item.rank_price = item.price_ranks[i].rank_price
                    }else if(item['quantity'] < item.price_ranks[0].min_num){
                        item.rank_price = item.price
                    }
                }
            },
            reduceTreeNum(item){
                if (parseInt(item['quantity']) < 2) {
                    return false
                }
                --item['quantity'];

                for(var i=0;i<item.price_ranks.length;i++){
                    if(item['quantity'] >= item.price_ranks[i].min_num && item['quantity'] <= item.price_ranks[i].max_num){
                        item.rank_price = item.price_ranks[i].rank_price
                    }else if(item['quantity'] < item.price_ranks[0].min_num){
                        item.rank_price = item.price
                    }
                }

            },
            postData (){
                this.jumpType = this.postSelectedData.type;
                var platforms = new checkPlatform();
                if(this.isApp){
                    this.postSelectedData.platform = 'APP';
                }else{
                    if(platforms.weixin){
                        this.postSelectedData.platform = 'WEIXIN';
                    }else{
                        this.postSelectedData.platform = 'Other';
                    }
                }
                sS.setSsItem("selectedProducts", this.postSelectedData);
                let type = encodeURIComponent(this.jumpType);
//                let agreementUrl = this.siteInfo.host + '/adoption/agreement?type='+this.jumpType;
//                this.appjs.syJsbLaunchWebview(agreementUrl);

                if (this.jumpType == '苹果'){
                    type = 'apple'
                }else if(this.jumpType == '苹果树'){
                    type = 'tree'
                }
                 /*let url = this.siteInfo.host + '/adoption/agreement?type='+type
                 this.appjs.syJsbLaunchWebview(url)*/
                this.$router.push('/adoption/agreement?type='+type)
            },
            jumpToLogin (){
                let callbackUrl = encodeURIComponent(this.siteInfo.host + '/choose/adoption?');
                window.location.href = this.siteInfo.host_old + '/api/index.php?from=appleTree&act=login&callback=' + callbackUrl;
            },
        },

    }
</script>
<style lang="scss" scoped>
    $bg:#f7f9fa;
    $bg-white: #fff;
    input{margin:0;padding:0;}
    .adoption{
        width: 100%;
        background: $bg;
        .adoption-con{
            position: relative;
            width: 6.9rem;
            padding: 0 0.3rem;
            height: 100%;
            /*box-sizing: border-box;*/
            .title{
                padding-top: 0.3rem;
                font-size: 0.28rem;
                color: #666A7F;
            }
            .list-con{color: #CDCDCD;}
            .list{
                margin-top: 0.24rem;
                width: 6.3rem;
                min-height: 2.1rem;
                padding: 0 0.3rem 0.3rem;
                background: $bg-white;
                border-radius: 0.2rem;
                .list-top{
                    display: flex;
                    flex-flow: row nowrap;
                    width: 100%;
                    height: 1rem;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px dotted #DADEE4;
                    div{
                        display: inline-block;
                    }
                    .span-left{
                        font-size: 0.3rem;
                        line-height: 0.46rem;
                        /*color: #4B4F63;*/
                    }
                    .span-right{
                        width: 0.46rem;
                        height: 0.46rem;
                        background: url("/static/images/common/select_default.png")no-repeat;
                        background-size: 100% 100%;
                    }
                    .span-right-selected{
                        display: flex;
                        .minus,.plus{
                            display: inline-block;
                            width: 0.4rem;
                            height: 0.4rem;
                            line-height: 0.4rem;
                            text-align: center;
                            font-size: 0.4rem;
                            color: #B1B8C4;
                            border-radius: 50%;
                            background: #F5F5F5;
                        }
                        .num{
                            width: 0.8rem;
                            height: 0.4rem;
                            line-height: 0.4rem;
                            text-align: center;
                            font-size: 0.3rem;
                            color: #4B4F63;
                        }
                    }
                    .selected{
                        background: url("/static/images/common/select.png")no-repeat;
                        background-size: 100% 100%;
                    }
                }
                .list-bottom{
                    width: 6.3rem;
                    padding-top: 0.24rem;
                    font-size: 0.26rem;
                    line-height: 0.42rem;
                    /*color: #666A7F;*/
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
            }
            .list-selected{
                color: #666A7F;
                box-shadow: 0 0 0.12rem 0 rgba(0,0,0,0.10);
            }
            .list-box-shadow-none{
                box-shadow: none;
            }
            .anonymity{
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-end;
                align-items: center;
                height: 0.68rem;
                padding-bottom: 1rem;
                text-align: right;
                .text{
                    display: inline-block;
                    font-size: 0.26rem;
                    line-height: 0.37rem;
                    color: #4B4F63;
                    span{
                        font-size: 0.26rem;
                        line-height: 0.37rem;
                        color: #818C9E;
                    }
                }
                i{
                    display: inline-block;
                    width: 0.3rem;
                    height: 0.3rem;
                    font-style: normal;
                    border: 1px solid #B1B8C4;
                    border-radius: 50%;
                }
                .choose{
                    background: url("/static/images/common/selected_little.png")no-repeat;
                    background-size: 100%;
                }
            }
        }
        .adoption-btn{
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 1rem;
            line-height: 1rem;
            text-align: center;
            font-size: 0.32rem;
            color: #fff;
            background: #DEDEDE;
        }
        .adoption-btn-selected{
            background: #4A90E2;
        }
    }
</style>
