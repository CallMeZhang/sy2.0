<template>
    <div>
        <sy-loading :show="isLoading"></sy-loading>
        <transition name="fade">
            <div v-show="!isLoading">
                <div class="hotline-w">
                    <div class="hotline">认养连接你我，攻克扶贫一战</div>
                    <div class="hotline">认养热线：<span @click="callPhone('400-666-7308')">400-666-7308</span></div>
                </div>
                <div class="have-c" v-if="have" v-for="(item,index) in records">
                    <!--认养成功-->
                    <div class="records-c" v-if="item.orderState == 'PAYED'">
                        <div class="records-item-t">
                            <div class="NO">NO.{{item.orderSn}}</div>
                            <div class="state color-blue">认养成功</div>
                        </div>
                        <div class="records-item-m tree" v-if="item.type == '认养果树'">
                            <div class="item-m-l"><img :src="imgsrc.tree"></div>
                            <div class="item-m-r">
                                <div class="item-des" v-show="item.treeName!='null'">我的果树：{{item.treeName}}</div>
                                <div class="item-des">认养果树：{{item.num}}棵果树 <span class="area" @click="jumptoMap()">{{item.area}}</span></div>
                                <div class="item-des">认养时间：{{item.payAt}}</div>
                                <div class="item-des">认养证书：<span class="area" @click="jumptoProof(item.orderSn)">{{item.prove}}</span></div>
                                <div class="item-des">养殖费用：{{item.price}}元</div>
                            </div>
                        </div>
                        <div class="records-item-m apple" v-if="item.type == '定制苹果'">
                            <div class="item-m-l"><img :src="imgsrc.apple"></div>
                            <div class="item-m-r">
                                <div class="item-des">定制数量：{{item.num}}箱{{item.goodsName}} </div>
                                <div class="item-des">定制时间：{{item.payAt}}</div>
                                <div class="item-des">认养证书：<span class="area" @click="jumptoProof(item.orderSn)">{{item.prove}}</span></div>
                                <div class="item-des">养殖费用：{{item.price}}元</div>
                            </div>
                        </div>
                        <div class="records-item-b">
                            <div class="item-b-r" @click="jumptoReport()">进展播报</div>
                            <div class="item-b-l"  @click="regret(item.goodsId,item.orderId,item.payType,item.orderSn,item.tradeNo,item.orderAmount,item.payAmount,index)"  >
                                <span v-timer>{{item.countDown}}</span>
                            </div>
                        </div>
                        <div class="bg-line"></div>
                    </div>
                    <!--认养取消-->
                    <div class="records-c" v-if="item.orderState == 'CANCELED'">
                        <div class="records-item-t">
                            <div class="NO">NO.{{item.orderSn}}</div>
                            <div class="state color-gray">认养取消</div>
                        </div>
                        <div class="records-item-m tree" v-if="item.type == '认养果树'">
                            <div class="item-m-l"><img :src="imgsrc.tree"></div>
                            <div class="item-m-r">
                                <div class="item-des" v-show="item.treeName!='null'">我的果树：{{item.treeName}}</div>
                                <div class="item-des">认养果树：{{item.num}}棵果树 <span class="area" @click="jumptoMap()">{{item.area}}</span></div>
                                <div class="item-des">取消时间：{{item.refundAt}}</div>
                                <div class="item-des">养殖费用：{{item.price}}元 <span class="tui"  v-if="item.refundState == 1">已退款</span><span class="tui" v-if="item.refundState == 0">退款中</span></div>
                            </div>
                        </div>
                        <div class="records-item-m apple" v-if="item.type == '定制苹果'">
                            <div class="item-m-l"><img :src="imgsrc.apple"></div>
                            <div class="item-m-r">
                                <div class="item-des">定制数量：{{item.num}}箱{{item.goodsName}} </div>
                                <div class="item-des">取消时间：{{item.refundAt}}</div>
                                <div class="item-des">养殖费用：{{item.price}}元 <span class="tui" v-if="item.refundState == 1">已退款</span><span class="tui" v-if="item.refundState == 0">退款中</span></div>
                            </div>
                        </div>
                        <div class="records-item-b">
                            <div class="item-b-d" v-if="item.refundState != 0" @click="itemDel(item.orderId,index)">删除记录</div>
                            <div class="item-b-d" style="color: #cdcdcd; border: 0.01rem solid #cdcdcd;" v-if="item.refundState == 0">删除记录</div>
                        </div>
                        <div class="bg-line"></div>
                    </div>
                    <!--待支付-->
                    <div class="records-c" v-if="item.orderState == 'WAITFORPAY'">
                        <div class="records-item-t">
                            <div class="NO">NO.{{item.orderSn}}</div>
                            <div class="state color-red">待支付</div>
                        </div>
                        <div class="records-item-m tree" v-if="item.type == '认养果树'">
                            <div class="item-m-l"><img :src="imgsrc.tree"></div>
                            <div class="item-m-r">
                                <div class="item-des"v-show="item.treeName!='null'">我的果树：{{item.treeName}}</div>
                                <div class="item-des">预定果树：{{item.num}}棵果树 <span class="area" @click="jumptoMap()">{{item.area}}</span></div>
                                <div class="item-des">预定时间：{{item.createAt}}</div>
                                <div class="item-des">养殖费用：{{item.price}}元 <span class="tui">未支付</span></div>
                            </div>
                        </div>
                        <div class="records-item-m apple" v-if="item.type == '定制苹果'">
                            <div class="item-m-l"><img :src="imgsrc.apple"></div>
                            <div class="item-m-r">
                                <div class="item-des">预定数量：{{item.num}}箱{{item.goodsName}} </div>
                                <div class="item-des">预定时间：{{item.createAt}}</div>
                                <div class="item-des">养殖费用：{{item.price}}元 <span class="tui">未支付</span></div>
                            </div>
                        </div>
                        <div class="records-item-b">
                            <div class="item-b-red" @click="jumptoPay(item.orderSn)">立即支付</div>
                        </div>
                        <div class="bg-line"></div>
                    </div>
                    <!--预定失效-->
                    <div class="records-c" v-if="item.orderState == 'OUTDATED'">
                        <div class="records-item-t">
                            <div class="NO">NO.{{item.orderSn}}</div>
                            <div class="state color-gray">预定已失效</div>
                        </div>
                        <div class="records-item-m tree" v-if="item.type == '认养果树'">
                            <div class="item-m-l"><img :src="imgsrc.tree"></div>
                            <div class="item-m-r">
                                <div class="item-des" v-show="item.treeName!='null'">我的果树：{{item.treeName}}</div>
                                <div class="item-des">预定果树：{{item.num}}棵果树 <span class="area" @click="jumptoMap()">{{item.area}}</span></div>
                                <div class="item-des">预定时间：{{item.createAt}}</div>
                                <div class="item-des">养殖费用：{{item.price}}元 </div>
                            </div>

                        </div>
                        <div class="records-item-m apple" v-if="item.type == '定制苹果'">
                            <div class="item-m-l"><img :src="imgsrc.apple"></div>
                            <div class="item-m-r">
                                <div class="item-des">预定数量：{{item.num}}箱{{item.goodsName}} <span class="area" @click="jumptoMap()">{{item.area}}</span></div>
                                <div class="item-des">预定时间：{{item.createAt}}</div>
                                <div class="item-des">养殖费用：{{item.price}}元 </div>
                            </div>

                        </div>
                        <div class="records-item-b">
                            <div class="item-b-d" @click="itemDel(item.orderId,index)">删除记录</div>
                        </div>
                        <div class="bg-line"></div>
                    </div>
                </div>
                <div class="empty-c" v-if="empty">
                    <div class="emp-img">
                        <img :src="this.siteInfo.cdn_host + '/static/images/campaign/adoptionRecords/empty.png'" alt="">
                        <div class="zi" @click="jumptoCampaign">您的苹果树正在流浪，请速速找回</div>
                    </div>
                    <div class="bg-line"></div>
                    <div class="letter">
                        <div class="title">春天认养一棵树，秋天收获甜美可口的果实；</div>
                        <div class="let-item">•	有机种植富士苹果</div>
                        <div class="let-item">•	个大香脆汁多</div>
                        <div class="let-item">•	远离工业污染</div>
                        <div class="let-item">•	无毒检测保障</div>
                        <div class="let-item">•	产地包邮</div>
                        <div class="let-item">•	现采现发</div>
                    </div>
                    <div class="bg-line"></div>
                    <div class="letter">
                        <div class="title">如果你认养的是一整棵树，还会额外获得</div>
                        <div class="let-item">• 果树一年的挂牌命名权</div>
                        <div class="let-item">• 定制版2018年台历</div>
                        <div class="let-item">• 多次种植基地免费游览特权</div>
                    </div>
                </div>
            </div>
        </transition>
    </div>

</template>

<script>
    import Request from '@/requests/base.js'
    import { MessageBox } from 'mint-ui'
    import * as extension from '@/packages/utils/extension'
    export default {
        name: "adoption-records",
        data(){
            return{
                isLoading:true,
                imgsrc:{'apple':'/static/images/campaign/adoptionRecords/apple.jpg',
                    'tree':'/static/images/campaign/adoptionRecords/tree.jpg'
                },
                empty:false,
                have:false,
                records:[],
                day:'',
                hours:'',
                minutes:'',
                is_share:'',
            }
        },
        created(){
            this.is_share = /is_share=yes/ig.test(window.location.href)
        },
        mounted(){
          this.getData();
          let ulen = window.history.length;
          console.log(ulen);
        },
        directives: {
            timer: {
                // 指令的定义
                inserted: function (input) {
                    var tim=parseInt(input.innerHTML)
                    var leftTime = tim;
                    if(leftTime>0){
                        var day = parseInt(leftTime / 60 / 60 / 24 , 10); //计算剩余的天数
                        var hour = parseInt(leftTime / 60 / 60 % 24 , 10); //计算剩余的小时
                        hour < 10 ? hour='0'+hour : hour;
                        var minutes = parseInt(leftTime / 60 % 60, 10);//计算剩余的分钟
                        minutes <10 ? minutes = '0'+minutes : minutes;
                        leftTime = leftTime-60;
                        input.innerText='我反悔了（剩余'+day + '天' + hour + ':' + minutes + '）';
                        setInterval(() => {
                            var day = parseInt(leftTime / 60 / 60 / 24 , 10); //计算剩余的天数
                            var hour = parseInt(leftTime / 60 / 60 % 24 , 10); //计算剩余的小时
                            hour < 10 ? hour='0'+hour : hour;
                            var minutes = parseInt(leftTime / 60 % 60, 10);//计算剩余的分钟
                            minutes <10 ? minutes = '0'+minutes : minutes;
                            leftTime = leftTime-60;
                            input.innerText='我反悔了（剩余'+day + '天' + hour + ':' + minutes + '）';
                        }, 60000)
                    }else {
                        return ''
                    }

                }
            }
        },
        methods:{
            getData(){
                let DataUrl = this.siteInfo.api_host_j + '/rs-apple-tree/introduce/personRecord?';
                Request.$httpGetWithToken(DataUrl).then(res => {
                    this.isLoading = false
                    if(res.data.code == 200){
                        this.records = res.data.data.record
                        if(this.records.length == 0){
                            this.empty = true
                        }else {
                            this.have = true
                        }
                    }else {
                        console.log(res.data.message)
                    }

                })

            },
            jumpToLogin (){
                let callbackUrl = encodeURIComponent(this.siteInfo.host + '/adoptionRecords');
                window.location.href = this.siteInfo.host_old + '/api/index.php?act=login&callback=' + callbackUrl;
            },
            itemDel(orderId,index){
                MessageBox.confirm('您是否要删除此条认养记录?').then(action => {
                    if(action == 'confirm'){
                        var that = this
                        /*let delUrl = 'http://192.168.1.241:9087/introduce/deletePersonRecord?token=a2e25131af148bb3ee952ac1fc71943c&orderId=' + orderId
                         Request.$httpGet(delUrl).then(res => {*/
                        let delUrl = this.siteInfo.api_host_j + '/rs-apple-tree/introduce/deletePersonRecord?orderId=' + orderId
                        Request.$httpGetWithToken(delUrl).then(res => {
                             if(res.data.code == 200){
                                 that.records.splice(index,1)
                             } else {
                                 console.log(res.data.message)
                             }
                         })
                    }
                });
            },
            jumptoMap(){
                let url = this.siteInfo.host + '/adoptMap'
                this.appjs.syJsbLaunchWebview(url)
            },
            jumptoReport(){
                let url = this.siteInfo.host + '/report'
                this.appjs.syJsbLaunchWebview(url)
            },
            jumptoPay(orderSn){
                let url = this.siteInfo.host + '/appleTreePay?orderSn=' + orderSn
                this.appjs.syJsbLaunchWebview(url)
            },
            jumptoProof(orderSn){
                let url = this.siteInfo.host + '/adoption/proof?orderSn=' + orderSn
                this.appjs.syJsbLaunchWebview(url)
            },
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
            regret(goodsId,orderId,payType,orderSn,tradeNo,orderAmount,payAmount,e){
                MessageBox.confirm('您是否要退款？退款大概需要30分钟。').then(action => {
                    if(action == 'confirm'){
                        let regUrl = this.siteInfo.api_host_j + '/rs-apple-tree/refund/all-refund'
                        var data={
                            'goodsId':goodsId,
                            'payType':payType,
                            'orderSn':orderSn,
                            'tradeNo':tradeNo,
                            'orderAmount':orderAmount,
                            'refundAmount':payAmount
                        }
                        Request.$httpPostWithToken(regUrl,data).then(res => {
                            if(res.data.code == 200){
                                window.location.reload();
                                console.log('reload')
                            }else {
                                MessageBox('提示', res.data.message);
                            }
                        })
                    }
                })

            },
            jumptoCampaign(){
                let url
                if(this.is_share){
                    url = this.siteInfo.host + '/campaign?is_share=yes'
                }else {
                    url = this.siteInfo.host + '/campaign'
                }
                this.appjs.syJsbLaunchWebview(url)
            }
        }

    }
</script>

<style scoped lang="scss">
    .bg-line{
        width: 100%;
        height: 0.2rem;
        background: #F7F9FA;
    }
    .hotline-w{
        width: 100%;
        height: 1.2rem;
        background: #F7F9FA;
        font-size: 0.26rem;
        color: #818C9E;
        line-height: 0.38rem;
        font-weight: 300;
        box-sizing: border-box;
        padding-top: 0.22rem;
        .hotline{
            text-align: center;
            span{text-decoration:underline;}
        }
    }
    .records-c{
        background: #fff;
        .records-item-t{
            overflow: hidden;
            border-bottom: 0.02rem solid  #DADEE4;
            .NO{
                line-height: 0.7rem;
                font-size: 0.24rem;
                color: #666A7F;
                font-weight: 300;
                padding: 0 0.3rem;
                float: left;
            }
            .state{
                line-height: 0.7rem;
                font-size: 0.26rem;
                font-width: 300;
                float: right;
                padding: 0 0.3rem;
            }
            .color-blue{color:#4A90E2 }
            .color-gray{color:#666A7F }
            .color-red{color:#F36253}
        }
        .records-item-m{
            width: 100%;
            border-bottom: 0.02rem solid  #DADEE4;
            overflow: hidden;
            .item-m-l{
                width: 2rem;
                height: 2rem;
                margin: 0.2rem 0.2rem 0.2rem 0.3rem;
                float: left;
                img{width: 100%;height: 100%;}
            }
            .item-m-r{
                margin-top: 0.2rem;
                margin-right: 0.3rem;
                font-size: 0.26rem;
                color: #4B4F63;
                line-height: 0.4rem;
                .item-des{
                    width: 4.7rem;
                    text-align: left;
                    margin-bottom: 0.14rem;
                    margin-right: 0;
                    font-weight: 300;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    .area{
                        font-size: 0.24rem;
                        color: #5F78F4;
                        font-weight: 300;
                        margin-left: 0.2rem;
                        text-decoration:underline;
                    }
                    .tui{margin-left: 0.3rem}
                }
            }
        }
        .records-item-b{
            width: 100%;
            height: 0.75rem;
            line-height: 0.75rem;
            overflow: hidden;
            font-weight: 300;
            .item-b-l{
                font-size: 0.26rem;
                color: #666A7F;
                float: right;
                margin-right: 0.3rem;
                text-decoration:underline;
            }
            .item-b-r{
                font-size: 0.26rem;
                color: #6A81F5;
                float: right;
                margin-right: 0.3rem;
                text-decoration:underline;
            }
            .item-b-d{
                width: 1.24rem;
                height: 0.47rem;
                border: 0.01rem solid #777A8D;
                border-radius: 0.08rem;
                float: right;
                margin-right: 0.3rem;
                line-height: 0.49rem;
                text-align: center;
                margin-top: 0.14rem;
                box-sizing: border-box;
            }
            .item-b-red{
                width: 1.24rem;
                height: 0.47rem;
                border: 0.01rem solid #F25B4B;
                border-radius: 0.08rem;
                float: right;
                margin-right: 0.3rem;
                line-height: 0.49rem;
                text-align: center;
                margin-top: 0.14rem;
                box-sizing: border-box;
                color: #F25B4B;
            }
        }
    }
    .emp-img{
        width: 100%;
        height: 5.4rem;
        background: #fff;
        img{width: 1.34rem;height: 1.74rem;margin: 1.76rem 0 0.4rem 3.08rem;}
        .zi{
            width: 100%;
            height: 0.4rem;
            text-align: center;
            font-size: 0.28rem;
            color: #4A90E2;
            line-height: 0.4rem;
            text-decoration:underline;
        }
    }
    .letter{
        width: 100%;
        box-sizing: border-box;
        padding: 0.24rem 0.3rem 0.4rem;
        .title{
            font-size: 0.26rem;
            color: #818C9E;
            text-align: left;
        }
        .let-item{
            font-size: 0.26rem;
            color: #818C9E;
            line-height: 0.48rem;
            font-weight: 300;
        }
    }
</style>
