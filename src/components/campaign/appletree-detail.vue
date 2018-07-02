<template>
    <div class="wh">
        <sy-loading :show="isLoading"></sy-loading>
        <transition name="fade">
            <div class="h5-container" v-show="!isLoading">
                <div class="swiper-container wh">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide page1">
                            <div class="page1-title">
                                <p class="page1-title-l">{{numData.help_num}}</p>
                                <p class="page1-title-r"><img :src="siteInfo.cdn_host + '/static/images/campaign/v1/v1_page_t2.png'" alt=""></p>
                            </div>
                            <div class="box-con">
                                <div class="box" ref="box" >
                                    <div v-for="(item, index) in helperMemberImg" :index="index">
                                        <img :src="item" onerror="this.src='/static/images/campaign/head01.png'" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="page1-bottom"><img :src="siteInfo.cdn_host + '/static/images/campaign/v1/v1_page_t1.png'" alt=""></div>
                        </div>
                        <div class="swiper-slide slider2">
                            <div class="text-p">
                                <p>
                                    <img :class="{'fade':ishowPic}" :style='delayTime(0.1)' :src="siteInfo.cdn_host +'/static/images/campaign/v2/page2/01.png'" alt="">
                                    <img :class="{'fade':ishowPic}" :style='delayTime(0.4)' :src="siteInfo.cdn_host +'/static/images/campaign/v2/page2/02.png'" alt="">
                                    <img :class="{'fade':ishowPic}" :style='delayTime(0.7)' class='big-img' :src="siteInfo.cdn_host +'/static/images/campaign/v2/page2/03.png'" alt="">
                                    <img :class="{'fade':ishowPic}" :style='delayTime(1)' class='big-img' :src="siteInfo.cdn_host +'/static/images/campaign/v2/page2/04.png'" alt="">
                                    <img :class="{'fade':ishowPic}" :style='delayTime(1.3)' :src="siteInfo.cdn_host +'/static/images/campaign/v2/page2/05.png'" alt="">
                                    <img :class="{'fade':ishowPic}" :style='delayTime(1.6)' :src="siteInfo.cdn_host +'/static/images/campaign/v2/page2/06.png'" alt="">
                                    <img :class="{'fade':ishowPic}" :style='delayTime(1.9)' :src="siteInfo.cdn_host +'/static/images/campaign/v2/page2/07.png'" alt="">
                                </p>
                                <p class="p-img">
                                    <img :class="{'fade':ishowPic}" :style='delayTime(2.1)' :src="siteInfo.cdn_host +'/static/images/campaign/v2/page2/08.png'" alt="">
                                    <img :class="{'fade':ishowPic}" :style='delayTime(2.4)' :src="siteInfo.cdn_host +'/static/images/campaign/v2/page2/09.png'" alt="">
                                    <img :class="{'fade':ishowPic}" :style='delayTime(2.7)'class='big-img' :src="siteInfo.cdn_host +'/static/images/campaign/v2/page2/10.png'" alt="">
                                    <img :class="{'fade':ishowPic}" :style='delayTime(3)'class='big-img' :src="siteInfo.cdn_host +'/static/images/campaign/v2/page2/11.png'" alt="">
                                    <img :class="{'fade':ishowPic}" :style='delayTime(3.3)' :src="siteInfo.cdn_host +'/static/images/campaign/v2/page2/12.png'" alt="">
                                    <img :class="{'fade':ishowPic}" :style='delayTime(3.6)' :src="siteInfo.cdn_host +'/static/images/campaign/v2/page2/13.png'" alt="">
                                    <img :class="{'fade':ishowPic}" :style='delayTime(3.9)' :src="siteInfo.cdn_host +'/static/images/campaign/v2/page2/14.png'" alt="">
                                </p>
                            </div>
                            <img class='imgPic imgPic100 imgPic100_1' :class='{"image100":ishowPic}' :src="siteInfo.cdn_host +'/static/images/campaign/tree_o.png'" alt=""
                                 :style='delayTime(1)'>
                            <img :style='delayTime(1.5)' class='imgPic imgPic100 imgPic100_2' :class='{"image100":ishowPic}' :src="siteInfo.cdn_host +'/static/images/campaign/tree_o.png'" alt="">
                            <img :style='delayTime(1.7)' class='imgPic imgPic100 imgPic100_3' :class='{"image100":ishowPic}' :src="siteInfo.cdn_host +'/static/images/campaign/tree_o.png'" alt="">
                            <img :style='delayTime(1.9)' class='imgPic imgPic100 imgPic100_4' :class='{"image100":ishowPic}' :src="siteInfo.cdn_host +'/static/images/campaign/tree_o.png'" alt="">
                            <img :style='delayTime(3.3)' class='imgPic imgPic-s1' :class='{"image100":ishowPic}' :src="siteInfo.cdn_host +'/static/images/campaign/tree.png'" alt="">
                            <img :style='delayTime(3.1)' class='imgPic imgPic-s2' :class='{"image100":ishowPic}' :src="siteInfo.cdn_host +'/static/images/campaign/tree.png'" alt="">
                            <img :style='delayTime(2.7)' class='imgPic imgPic-s3' :class='{"image100":ishowPic}' :src="siteInfo.cdn_host +'/static/images/campaign/tree.png'" alt="">
                            <img :style='delayTime(2.9)' class='imgPic imgPic-s4' :class='{"image100":ishowPic}' :src="siteInfo.cdn_host +'/static/images/campaign/tree.png'" alt="">
                            <img :style='delayTime(2.6)' class='imgPic imgPic-s5' :class='{"image100":ishowPic}' :src="siteInfo.cdn_host +'/static/images/campaign/tree.png'" alt="">
                            <img :style='delayTime(2.4)' class='imgPic imgPic-s6' :class='{"image100":ishowPic}' :src="siteInfo.cdn_host +'/static/images/campaign/tree.png'" alt="">
                            <img :style='delayTime(2.8)' class='imgPic imgPic-s7' :class='{"image100":ishowPic}' :src="siteInfo.cdn_host +'/static/images/campaign/tree.png'" alt="">
                            <img :style='delayTime(2.5)' class='imgPic imgPic-s8' :class='{"image100":ishowPic}' :src="siteInfo.cdn_host +'/static/images/campaign/tree.png'" alt="">
                            <img :style='delayTime(2.1)' class='imgPic imgPic-s9' :class='{"image100":ishowPic}' :src="siteInfo.cdn_host +'/static/images/campaign/tree.png'" alt="">
                            <img :style='delayTime(2.3)' class='imgPic imgPic-s10' :class='{"image100":ishowPic}' :src="siteInfo.cdn_host +'/static/images/campaign/tree.png'" alt="">
                            <img :style='delayTime(2.2)' class='imgPic imgPic-s11' :class='{"image100":ishowPic}' :src="siteInfo.cdn_host +'/static/images/campaign/tree.png'" alt="">
                            <img :style='delayTime(2.2)' class='imgPic imgPic-s12' :class='{"image100":ishowPic}' :src="siteInfo.cdn_host +'/static/images/campaign/tree.png'" alt="">
                            <img :style='delayTime(2.3)' class='imgPic imgPic-s13' :class='{"image100":ishowPic}' :src="siteInfo.cdn_host +'/static/images/campaign/tree.png'" alt="">
                        </div>
                        <div class="swiper-slide slide3">
                            <div>
                                <p class="slide5-font-con" v-show="isShowPage3">
                                    <img class="font-img1" :class="{'page3title1':isShowPage3}"  :src="siteInfo.cdn_host + '/static/images/campaign/v2/page3/01.png'" alt="">
                                    <img class="font-img2" :class="{'page3title2':isShowPage3}" :src="siteInfo.cdn_host + '/static/images/campaign/v2/page3/02.png'" alt="">
                                </p>
                                <p class="slide5-font-two-con" v-show="isShowPage3Font2">
                                    <img class="font-two-img1" :class="{'fade':isShowPage3Font2}" :style='delayTime(3)' :src="siteInfo.cdn_host + '/static/images/campaign/v2/page3/03.png'" alt="">
                                    <img class="font-two-img2" :class="{'fade':isShowPage3Font2}" :style='delayTime(3.7)' :src="siteInfo.cdn_host + '/static/images/campaign/v2/page3/04.png'" alt="">
                                    <img class="font-two-img3" :class="{'fade':isShowPage3Font2}" :style='delayTime(4.4)' :src="siteInfo.cdn_host + '/static/images/campaign/v2/page3/05.png'" alt="">
                                </p>
                            </div>
                            <div class="slide5-head" v-show="isShowPage3Font2" style="z-index: 1"><img :class="{'headFade':isShowPage3Font2}" :style='delayTime(3.2)' :src="siteInfo.cdn_host + '/static/images/campaign/page5/r_smile.png'" alt=""></div>
                            <div class="slide5-head" ><img :src="siteInfo.cdn_host + '/static/images/campaign/page5/r_cry.png'" alt=""></div>
                            <div class="slide5-crate"><img class="crate1" :class="{'fadeOut':isShowPage3}" :style='delayTime(3.3)'  :src="siteInfo.cdn_host + '/static/images/campaign/page5/crate.png'" alt=""></div>
                            <div class="slide5-crate"><img class="crate2" :class="{'fadeOut':isShowPage3}" :style='delayTime(3.8)' :src="siteInfo.cdn_host + '/static/images/campaign/page5/crate.png'" alt=""></div>
                            <div class="slide5-crate"><img class="crate3" :src="siteInfo.cdn_host + '/static/images/campaign/page5/crate.png'" alt=""></div>
                            <div class="slide5-crate"><img class="crate4" :src="siteInfo.cdn_host + '/static/images/campaign/page5/crate.png'" alt=""></div>
                            <div class="slide5-crate"><img class="crate5" :class="{'fadeOut':isShowPage3}" :style='delayTime(3.5)' :src="siteInfo.cdn_host + '/static/images/campaign/page5/crate.png'" alt=""></div>
                            <div class="slide5-crate"><img class="crate6" :class="{'fadeOut':isShowPage3}" :style='delayTime(4)' :src="siteInfo.cdn_host + '/static/images/campaign/page5/crate.png'" alt=""></div>
                            <div class="slide5-crate"><img class="crate7" :class="{'fadeOut':isShowPage3}" :style='delayTime(4.5)' :src="siteInfo.cdn_host + '/static/images/campaign/page5/crate.png'" alt=""></div>
                            <div class="slide5-crate"><img class="crate8" :class="{'fadeOut':isShowPage3}" :style='delayTime(4.2)' :src="siteInfo.cdn_host + '/static/images/campaign/page5/crate.png'" alt=""></div>
                            <div class="slide5-crate"><img class="crate9" :class="{'fadeOut':isShowPage3}" :style='delayTime(3.8)' :src="siteInfo.cdn_host + '/static/images/campaign/page5/crate.png'" alt=""></div>
                            <div class="slide5-crate"  v-show="isShowPage3Font2" :class="{'fade':isShowPage3Font2}" :style='delayTime(4.6)'><img class="helping-people" :src="siteInfo.cdn_host + '/static/images/campaign/page5/bfr2.png'" alt=""></div>
                        </div>
                        <div class="swiper-slide page4">
                            <img :src="siteInfo.cdn_host + '/static/images/campaign/v2/page4_zi.png'" alt="">
                        </div>
                        <div class="swiper-slide page5">
                            <img style="margin-top: 1.22rem;" :src="siteInfo.cdn_host + '/static/images/campaign/page5/page5_02.png'" alt="">
                            <div style="width: 6rem;height: 0.02rem;border-top: 1px dashed #151515;border-width:thin;margin-left: 0.76rem"></div>
                            <img :src="siteInfo.cdn_host + '/static/images/campaign/page5/page5_03.png'" alt="">
                            <div style="width: 6rem;height: 0.02rem;border-top: 1px dashed #151515;border-width:thin;margin-left: 0.76rem"></div>
                            <div style="width: 7.5rem;height: 2.97rem;position: relative">
                                <img style="width: 100%;height: 100%" :src="siteInfo.cdn_host + '/static/images/campaign/page5/page5_04.png'" alt="">
                                <div style="width: 6rem;height: 0.02rem;border-top: 1px dashed #151515;border-width:thin;position: absolute;top:2.1rem;left: 0.76rem"></div>
                            </div>
                            <img :src="siteInfo.cdn_host + '/static/images/campaign/page5/page5_05.png'" alt="">
                        </div>
                        <div class="swiper-slide page6">
                            <div class="page6-zi">
                                <p>目前已有 <span>{{numData.order_num}}</span>人参与认养</p>
                                <p>目前已有 <span>{{numData.help_num}}</span> 人分享助力扶贫认养行动</p>
                                <p>距离活动结束还有：<span>{{days}} </span>天<span>{{hours}} </span>小时<span>{{minutes}} </span>分钟</p>
                            </div>
                            <div class="btn">
                                <img style="float: left" :src="siteInfo.cdn_host + '/static/images/campaign/v2/btn1.png'" alt="" @click="foster">
                                <img style="float: right" :src="siteInfo.cdn_host + '/static/images/campaign/v2/btn3.png'" alt="" @click="popupWindow">
                            </div>

                        </div>
                    </div>
                    <!-- Add Pagination -->
                    <div class="swiper-pagination"></div>
                    <!-- Add Arrows -->
                    <div class="swiper-button-next" v-show="noSix"></div>
                </div>
                <!--music-->
                <div class="music-btn" :class="musicState ? 'musicStart' : 'musicStop'"  @click="musicControl"></div>
                <audio ref="musicBtn"  src="/static/images/campaign/v2/page3/TownOfWindmill18s.mp3"  loop="true"></audio>

                <div class="tan-c" v-show="isTan" @click.self="isTan=false">
                    <div class="tan">
                        <div class="zi zi-t">你是第<span>{{list_id}}</span>个</div>
                        <div class="zi zi-b">扶贫助力者</div>
                        <div class="btn" @click="shareFn"></div>
                    </div>
                </div>
                <share_img v-show="isShareImg" @click.native="isShareImg = false"></share_img>
            </div>
        </transition>
    </div>


</template>

<script>
    import Swiper from '../../../static/js/plugins/swiper/swiper-3.4.2.min'
    import siteInfo from '@/global'
    import Request from '@/requests/base'
    import appjs from '@/modules/_appjs/index'
    import share_img from '@/components/common/share/share_mask_layer.vue'
    import * as extension from '@/packages/utils/extension'
    import { MessageBox } from 'mint-ui'

    //微信分享
    import wx from 'weixin-js-sdk'
    import _app from '@/modules/_appjs/index'
    import axios from 'axios'

    export default {
        name: "apple-share",
        data() {
            return {
                isLoading:true,
                deg: 0,
                index: 0,
                ishowPic: false,
                isShare: false,
                isShareImg: false,
                numData:{},
                helperMemberImg:[],
                AllTATA:[],
                helperMemberImgC:[],
                isLogin:false,
                isShowPage3: false,
                isShowPage3Font2: false,//page3文字2
                isShowPage3Hide:false,//page3 隐藏篮子
                openid:'',//openid
                token:'',
                list_id:'',//第几个助力的人
                days:'',
                hours:'',
                minutes:'',
                appleTreeHost:'https://applet.17shanyuan.com',
                isTan:false,
                noSix:true,
                musicState:false,
                isApp:false,
            }
        },
        beforeCreate(){
        },
        created() {
            this.platformCheck();
            this.getFirst(); //授权
//            this.getData();//获取数据
            this.musicAutoplayWx() //ios系统在微信中自动播放音频微信接口
            this.musicPlay()//自动播放music
        },
        mounted() {
            //倒计时
            setInterval(this.leftTimer(2018,5,15,23,59,59),60000);
            this.$nextTick(function () {
                //友盟统计
                this.webPvStatistics();
            })
        },
        methods: {
            boxRotate() {
                this.index++
                if (this.index > 5) {
                    this.index = 0
                }
                var obox = this.$refs.box
                this.deg += 60
                obox.style.transform = "rotateY(" + this.deg + "deg)"
                var dataArr = this.helperMemberImgC.pop()
                if(!dataArr){
                    this.helperMemberImgC = extension['deepCopy'](this.AllTATA)
                    dataArr = this.helperMemberImgC.pop()
                }
                this.helperMemberImg.splice(6-this.index-2,1,dataArr)
                setTimeout(this.boxRotate, 1500)

            },
            webPvStatistics(){
                // var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
                // var elemt = document.write(unescape("%3Cspan style='visibility:hidden;position:absolute;left:0;bottom:0;z-index:-1;' id='cnzz_stat_icon_1261993546'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s13.cnzz.com/z_stat.php%3Fid%3D1261993546%26show%3Dpic1' type='text/javascript'%3E%3C/script%3E"));

                var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
                var span = document.createElement('span')
                span.style.cssText = "visibility:hidden;position:absolute;left:0;bottom:0;z-index:-1;"
                span.setAttribute("id","cnzz_stat_icon_1261993546")
                var script = document.createElement('script')
                script.type = 'text/javascript'
                script.src = cnzz_protocol + 's13.cnzz.com/z_stat.php?id=1261993546&show=pic1'
                var elemt = document.getElementsByClassName('h5-container')[0]
                elemt.appendChild(span)
                elemt.appendChild(script)

                // document.write(unescape("%3Cspan style='visibility:hidden;position:absolute;left:0;bottom:0;z-index:-1;' id='cnzz_stat_icon_1261993546'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s13.cnzz.com/z_stat.php%3Fid%3D1261993546%26show%3Dpic1' type='text/javascript'%3E%3C/script%3E"));
            },
            musicAutoplayWx(){
                let elemt = document.getElementsByClassName('h5-container')[0]
                let script = document.createElement('script')
                script.type = 'text/javascript'
                script.src = 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js'
                elemt.appendChild(script)
            },
            getData(){
                let url;
                if(this.isShare){
                    url = this.appleTreeHost + '/api/get_help_number?openid=' + this.openid;
                }else {
                    url = this.appleTreeHost + '/api/get_help_number?token=' + this.token;
                }
                Request.$httpGet(url).then((res) =>{
                    this.isLoading = false
                    this.numData = res.data
                    this.helperMemberImg = extension['deepCopy'](res.data.helper_member_img).slice(0,6)
                    this.helperMemberImgC =extension['deepCopy'](res.data.helper_member_img)
                    this.AllTATA = extension['deepCopy'](res.data.helper_member_img)
                    this.list_id = res.data.list_id
                    //swiper
                    var that = this;
                    this.$nextTick(function () {
                        var mySwiper = new Swiper('.swiper-container', {
                            direction: 'vertical',
                            loop: false,
                            autoplayDisableOnInteraction: false,
                            navigation: {
                                nextEl: '.swiper-button-next'
                            },
                            onSlideChangeEnd: function (swiper) {
                                switch (swiper.activeIndex) {
                                    case 0:
                                        break;
                                    case 1:
                                        that.secondFn();
                                        break;
                                    case 2:
                                        that.threeFn();
                                        break;
                                    case 5:
                                        that.sixFn();
                                        break;
                                    default:
                                        break;
                                }
                            }
                        });
                    })
                    //旋转
                    this.boxRotate();
                }).then(res =>{
                    //微信中二次分享回调
                    this.wxShareConfig();
                })
            },
            secondFn() {
                this.ishowPic = true
            },
            threeFn() {
                this.isShowPage3 = true
                setTimeout(res =>{
                    this.isShowPage3Font2 = true
                },500)
            },
            sixFn(){
                this.noSix = false
            },
            delayTime(t){
                return "animation-delay:"+t+"s;"
            },
            foster(){
                //music
                if(this.musicState){
                    let music = this.$refs.musicBtn
                    music.pause()
                    this.musicState = false
                }

                if(this.isShare){
                    this.appjs.syJsbLaunchWebview(siteInfo.host+'/campaign?is_share=yes')
                    // this.$router.push({path:'/campaign',name:'campaign',query:{is_share:'yes'}})
                }else {
                    this.appjs.syJsbLaunchWebview(siteInfo.host+'/campaign?')
                    // this.$router.push('/campaign')
                }
            },
            //微信初始化函数
            wx_config(appId,timestamp,nonceStr,signature){
                wx.config({
                    debug: false, //调试阶段建议开启
                    appId: appId,
                    timestamp: timestamp,
                    nonceStr: nonceStr,
                    signature: signature,
                    jsApiList: [
                        "chooseImage",
                        "previewImage",
                        "uploadImage",
                        "downloadImage",
                        "onMenuShareTimeline",
                        "onMenuShareAppMessage",
                        "onMenuShareQQ",
                        "onMenuShareQZone"
                    ]
                });
    },
            // config信息验证后调分享接口
            share_config(apiAppleTree,title,desc,link,imgUrl,listId,wxs_openid,signPackage){
                //初始化配置信息
                this.wx_config(signPackage.appId, signPackage.timestamp, signPackage.nonceStr, signPackage.signature);
                // config信息验证后执行ready
                wx.ready(function(){
                    console.log('执行wxready');
                    wx.onMenuShareTimeline({//分享朋友圈
                        title: title, // 分享标题
                        link: link, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            /*let c_url = apiAppleTree + '/api/shared_help?openid=' + wxs_openid + '&type=weixin' + '&listId=' + listId
                            Request.$httpGet(c_url).then((res) =>{
                                console.log('分享朋友圈成功')
                            })*/
                        },
                        cancel: function (res) {
                            console.log("cancel 朋友圈")
                        }
                    });
                    wx.onMenuShareAppMessage({//分享朋友
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: link, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            /*let c_url = apiAppleTree + '/api/shared_help?openid=' + wxs_openid + '&type=weixin' + '&listId=' + listId
                            Request.$httpGet(c_url).then((res) =>{
                                console.log('分享朋友成功')

                            })*/
                        },
                        cancel: function (res) {
                            console.log("cancel 朋友")
                        }
                    });
                    wx.onMenuShareQQ({//分享到QQ
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: link, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            /*let c_url = apiAppleTree + '/api/shared_help?openid=' + wxs_openid + '&type=weixin' + '&listId=' + listId
                            Request.$httpGet(c_url).then((res) =>{
                                if(res.code == 200){
                                    console.log('分享到QQ')
                                }
                            })*/
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                            console.log('cancel QQ')
                        }
                    });
                    wx.onMenuShareQZone({//分享到QQ空间
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: link, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            /*let c_url = apiAppleTree + '/api/shared_help?openid=' + wxs_openid + '&type=weixin' + '&listId=' + listId
                            Request.$httpGet(c_url).then((res) =>{
                                if(res.code == 200){
                                    console.log('分享到qq空间')
                                }
                            })*/

                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                            console.log('cancel qq空间')
                        }
                    });

                });
                wx.error(function(res){
                    console.log(JSON.stringify(res))
                })
            },
            wx_share(apiAppleTree,title,desc,link,imgUrl,listId,wxs_openid){
                let qs = require('qs')
                axios.post(siteInfo.api_host_p + '/api/index.php?act=wx&op=ajaxGetSignPackage',
                    qs.stringify({request_url:encodeURIComponent(window.location.href)})
                ).then(res => {
                    console.log('post ok')
                    this.share_config(apiAppleTree,title,desc,link,imgUrl,listId,wxs_openid,res.data);
                }).catch(err => {
                    // alert('网络异常，请刷新')
                    console.log(err)
                })
            },
            wxShareConfig(){
                let listId = this.list_id;
                let link = this.siteInfo.host + '/appletreeDetail?is_share=yes';
                let title = '你是第' + listId + '个助力者！扶贫认养，看见你的力量';
                let desc = '别让自顾不暇的生活凉了你对他人的热情';
                let imgUrl = this.siteInfo.cdn_host + '/static/images/campaign/v2/shareLogo.jpg';
                let wxs_openid = this.openid
                let apiAppleTree = 'https://applet.17shanyuan.com'
                this.wx_share(apiAppleTree,title,desc,link,imgUrl,listId,wxs_openid)
            },
            shareFn(){
                let shareUrl = this.siteInfo.host + '/appletreeDetail?is_share=yes';
                let shareText = '别让自顾不暇的生活凉了你对他人的热情';
                let shareTitle = '你是第'+this.list_id+'个助力者！扶贫认养，看见你的力量';
                let shareLogo = this.siteInfo.cdn_host + '/static/images/campaign/v2/shareLogo.jpg';
                let params = {text: shareText, url: shareUrl, title: shareTitle, logo: shareLogo}

                if (this.isShare) {
                    //app外
                    this.isShareImg=true;
                } else {
                   //app内
                    /*var that=this;
                    if(extension.getCookie('token')){
                        this.token = extension.getCookie('token')
                        window.callbackShareResult = function (platform, status){
                            if(status == 'success'){
                                that.shareCallback(platform,status);
                            }
                        };
                        let jsonParam = JSON.stringify(params);
                        this.appjs.syJsbShare(jsonParam, shareText, shareUrl);
                    }else {
                        this.jumpToLogin();
                    }*/
                    let jsonParam = JSON.stringify(params);
                    this.appjs.syJsbShare(jsonParam, shareText, shareUrl);
                }
            },
            popupWindow(){
                //music
                /*if(this.musicState){
                    let music = this.$refs.musicBtn
                    music.pause()
                    this.musicState = false
                }*/

                let dataUrl
                if(this.isShare){
                    dataUrl = this.appleTreeHost + '/api/shared_help?openid=' + this.openid + '&listId=' + this.list_id
                    console.log('dataurl:',dataUrl)
                }else {
                    dataUrl = this.appleTreeHost + '/api/shared_help?token=' + this.token + '&listId=' + this.list_id
                }
                Request.$httpGet(dataUrl).then((res) =>{
                    console.log('code:',res.data.code)
                    if(res.data.code == 200){
                        this.isTan = true
                        console.log('app内分享统计成功')
                    }else if(res.data.code == 300){
                        MessageBox('提示', '浏览器中暂不支持活动助力，请在在APP、微信中进行。')
                    }else{
                        console.log('app内分享统计不成功')
                    }
                })
            },
            jumpToLogin (){
                let callbackUrl = encodeURIComponent(siteInfo.host + '/appletreeDetail?');
                window.location.href = siteInfo.host_old + '/api/index.php?act=login&callback=' + callbackUrl;
            },
            /*shareCallback(platform, status){
                let c_url = this.appleTreeHost + '/api/shared_help?token=' + this.token + '&listId=' + this.list_id
                Request.$httpGet(c_url).then((res) =>{
                    if(res.data.code == 200){
                        console.log('app内分享成功并统计成功')
                    }else{
                        console.log('app内分享成功但统计不成功')
                    }
                })
            },*/
            //授权
            getFirst(){
                this.$route.query.is_share == 'yes' ? this.isShare = true : this.isShare = false;
                if(this.isShare){
                    let openid = extension.getCookie('openid');
                    var shareUrl = window.location.href
                    var patt1 = new RegExp("openid=");
                    var b = patt1.test(shareUrl);
                     if(extension.checkPlatform().weixin&&b){
                        openid = this.$route.query.openid;
                        this.$route.query.openid ? this.openid = openid : this.openid = '';
                        this.setCookie('openid',this.openid,7)
                         return;
                        }else if(extension.checkPlatform().weixin&&!openid){
                        let auth_url = this.appleTreeHost + '/api/wechat/obtainAuth';
                        window.location.href = auth_url;
                    }else{
                        this.openid = openid
                    }
                  this.getData();
                }else {
                    let token = extension.getCookie('token');
                    if(!token){
                        this.jumpToLogin()
                    }else {
                        this.token = token;
                        this.getData();
                    }
                }
            },
            leftTimer(year,month,day,hour,minute,second){
                let leftTime = (new Date(year,month-1,day,hour,minute,second)) - (new Date()); //计算剩余的毫秒数
                this.days = parseInt(leftTime / 1000 / 60 / 60 / 24 , 10); //计算剩余的天数
                this.hours = parseInt(leftTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时
                this.minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
                // this.seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
            },
            setCookie(c_name,value,expiredays) {
                var exdate=new Date()
                exdate.setDate(exdate.getDate()+expiredays*86400)
                document.cookie=c_name+ "=" +escape(value)+
                    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
            },
            musicControl(){
                let music = this.$refs.musicBtn
                if(this.musicState){
                    this.musicState = false
                    music.pause()
                }else {
                    this.musicState = true
                    music.play()
                }
            },
            musicPlay(){
                let audio = this.$refs.musicBtn;
                let that = this
                if (appjs.isIos){
                    document.addEventListener('touchstart',()=>{
                        console.log('touchstart')
                        audio.play();
                        that.musicState = true
                    })
                }
                document.addEventListener('DOMContentLoaded', function () {
                    function audioAutoPlay() {
                        console.log('DOMContentLoaded')
                        audio.play();
                        that.musicState = true
                        document.addEventListener("WeixinJSBridgeReady", function () {
                            console.log('WeixinJSBridgeReady')
                            audio.play();
                            that.musicState = true;
                        }, false);
                    }
                    audioAutoPlay();
                })

            },
            platformCheck(){
                let that = this;
                this.appjs.syJsbGetAppInfo(function(appInfo){
                    if(appInfo){
                        that.isApp = true;
                    }
                });
            }
        },

        components: {
            share_img,
        }
    }
</script>

<style lang="scss" scoped>
    @import url('/static/css/plugins/swiper/swiper-3.4.2.min.css');
    .h5-container{width: 100%;height: 100%;}
    .wh{width: 100%;height: 100%;}
    .page1{
        width: 100%;
        height: 100%;
        background:url("/static/images/campaign/v1/v1_bg.jpg") no-repeat;
        background-size: 100% 100%;
        perspective:8.5rem;
        perspective-origin: 50% 65%;
        position: relative;
        .box-con{
            position: absolute;
            top: 54%;
            left: 39%;
        }
        .box{
            width: 1.6rem;
            height: 1.5rem;
            margin: 1.5rem auto;
            transform-style: preserve-3d;
            position: relative;
            transition:all 2s ;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .box div{
            position: absolute;
            width: 1.6rem;
            height: 1.5rem;
            border-radius: 0.08rem;
            box-shadow: 0px 10px 20px #aaa;
            -webkit-box-reflect: below 0 -webkit-linear-gradient(top,rgba(250,250,150,.0),rgba(250,250,250,.0) 30%,rgba(250,250,250,.3));
            box-reflect: below 0 -webkit-linear-gradient(top,rgba(250,250,150,.0),rgba(250,250,250,.0) 30%,rgba(250,250,250,.3));
            img{
                width: 100%;
                height: 100%;
            }
        }
        .box div:nth-child(1) {
            transform: rotateY(0deg) translateZ(2.3rem);
        }
        .box div:nth-child(2) {
            transform: rotateY(60deg) translateZ(2.3rem);
        }
        .box div:nth-child(3) {
            transform: rotateY(120deg) translateZ(2.3rem);
        }
        .box div:nth-child(4) {
            transform: rotateY(180deg) translateZ(2.3rem);
        }
        .box div:nth-child(5) {
            transform: rotateY(240deg) translateZ(2.3rem);
        }
        .box div:nth-child(6) {
            transform: rotateY(300deg) translateZ(2.3rem);
        }
        .page1-title{
            position: absolute;
            left: 50%;
            top: 54%;
            transform: translateX(-50%);
            height: 0.4rem;
            display: flex;
            .page1-title-l{
                padding-top:0.07rem;
                font-size:0.4rem;
                color: #44a132;
                height:0.4rem;
            }
            .page1-title-r{
                width: 4.49rem;
                height: 0.7rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .page1-bottom{
            position: absolute;
            top:89%;
            left: 50%;
        }
        .page1-bottom img{
            transform: translateX(-50%);
            margin-top: 3.9%;
            width: 4.03rem;

        }
    }

    .music-btn{
        position: absolute;
        top:0.3rem;
        right: 0.3rem;
        width: 0.5rem;
        height: 0.5rem;
        z-index: 1;
    }
    .musicStart{
        background: url("/static/images/campaign/music.png") left no-repeat;
        background-size: 1rem 0.5rem;
    }
    .musicStop{
        background: url("/static/images/campaign/music.png") right no-repeat;
        background-size: 1rem 0.5rem;
    }
    .swiper-button-next {
        position: absolute;
        top: 97%;
        left: 49%;
        height: 0.6rem;
        width: 0.6rem;
        background: url("../../../static/images/campaign/v2/up_arrow.png") no-repeat center center;
        background-size: 100%;
        animation: upDownani 2s ease-in-out infinite;
        z-index: 2;
    }
    @keyframes upDownani{
        from{transform:translateY(0)}
        to{transform:translateY(0.3rem)}
    }
    .slider2{
        position: relative;
        background: url("../../../static/images/campaign/bg2.jpg") no-repeat center center;
        background-size: 100% 100%;
    }
    .text-p{
        position: absolute;
        top:2.4rem;
        left: 0.8rem;
        img{
            width: .56rem;
            opacity: 0;
        }
        .big-img{
            width: .94rem;
        }
    }
    .p-img{
        padding:0.1rem 0 0 0.5rem;
    }
    .imgPic {
        opacity: 0;
        position: absolute;
    ;
    }
    .imgPic100{
        animation-delay:1s;
        left: .50rem;
        width: 1.3rem;
    }
    .imgPic100_1{
        left: 1%;
        top: 66%;
        width: 1rem;
    }
    .imgPic100_2{
        top: 66%;
        left: 14%;
    }
    .imgPic100_3{
        left:70%;
        top:66%;
        z-index: 999;
    }
    .imgPic100_4{
        top:66%;
        left: 84%;
        width: 1rem;
    }
    .image100 {
        opacity: 0;
        transform-origin:center bottom;
        animation: myfirst 5s forwards;
    }

    @keyframes myfirst {
        from {
            opacity: 0;
            transform: scale(0.3);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    .fade{
        opacity: 0;
        animation: imgFade 3s forwards;
    }
    @keyframes imgFade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    .headFade{
        opacity: 0;
        animation: headFadeIn 0.5s forwards;
    }
    @keyframes headFadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    .fadeOut{
        opacity: 1;
        animation: imgFadeOut 3s forwards;
    }
    @keyframes imgFadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    .imgPic-s1{
        top:54%;
        left: 86%;
        width: .90rem;
        z-index: 99;
    }
    .imgPic-s2{
        top: 56%;
        left: 75%;
        width: .9rem;
    }
    .imgPic-s3{
        top: 48%;
        left: 86%;
        width: .7rem;
    }
    .imgPic-s4{
        top: 47%;
        left: 77%;
        width: 0.7rem;

    }
    .imgPic-s5{
        top: 51%;
        left:68%;
        width: 0.7rem;
    }
    .imgPic-s6{
        top: 57%;
        left: 60%;
        width: 0.9rem;
    }
    .imgPic-s7{
        top: 49%;
        left: 56%;
        width: 0.7rem;

    }
    .imgPic-s8{
        top: 52%;
        left: 39%;
        width: .68rem;
        height: 0.93rem;
    }
    .imgPic-s9{
        top:57%;
        left: 25%;
        width: 1rem;
    }
    .imgPic-s10{
        top: 57%;
        left: 11%;
        width: .8rem;
        z-index: 3;
    }
    .imgPic-s11{
        top: 57%;
        left: 1.4%;
        width: .7rem;
    }
    .imgPic-s12{
        top: 53%;
        left:7%;
        width: .6rem;
    }
    .imgPic-s13{
        top: 55%;
        left: 20%;
        width: .6rem;
    }
    .slide3{
        position: relative;
        width: 100%;
        height: 100%;
        background: url("../../../static/images/campaign/page5/page_4bg.jpg") no-repeat center;
        background-size: 100% 100%;
        /*.slide5-font-con{
            position:relative;
        }*/
        .slide5-font-two-con{
            position:relative;
            margin-top:-0.8rem;
        }
        .slide5-font-con .font-img1{
            width: 2rem;
            position: absolute;
            left: 1.27rem;
            top: 0.9rem;
            /*transform: translate3d(1.27rem,0.9rem,0);*/
        }
        .slide5-font-con .font-img2{
            width: 3.9rem;
            position: absolute;
            left: 2.36rem;
            top: 1.5rem;
            /*transform: translate3d(2.36rem,1.5rem,0);*/
        }
        .page3title1{
            opacity: 0;
            position: absolute;
            left: 1.27rem;
            top: 0.9rem;
            animation: titleFade1 3s forwards;
        }
        @keyframes titleFade1 {
            0%{opacity: 0;}
            30%{opacity: 1;}
            90%{opacity: 1;}
            100%{opacity: 0}
        }
        .page3title2{
            opacity: 0;
            position: absolute;
            left: 2.36rem;
            top: 1.5rem;
            animation: titleFade2 3s forwards;
        }
        @keyframes titleFade2 {
            0%{opacity: 0;}
            30%{opacity: 0;}
            60%{opacity: 1;}
            90%{opacity: 1;}
            100%{opacity: 0}
        }
        .slide5-font-two-con .font-two-img1{
            position: absolute;
            transform: translate3d(0.3rem,0.9rem,0);
            width: 6.85rem;
        }
        .slide5-font-two-con .font-two-img2{
            position: absolute;
            transform: translate3d(1.66rem,3.4rem,0);
            width: 2.41rem;
        }
        .slide5-font-two-con .font-two-img3{
            position: absolute;
            transform: translate3d(2.4rem,4.14rem,0);
            height: 0.57rem;
        }
        .slide5-head{
            position: absolute;
            left:13%;
            top:67.8%;
            /*transform: translate3d(9%,35.15%,0);*/
            width: 1.31rem;
            img{
                width: 100%;
                height:100%;
            }
        }
        .slide5-crate img{
            position: absolute;
            width: 1.65rem;
        }
        .slide5-crate .crate1{
            left: 63.7%;
            top: 59.8%;
            transform: scale(0.78);
        }
        .slide5-crate .crate2{
            left: 58.4%;
            top: 64.3%;
            transform: scale(0.82);
        }
        .slide5-crate .crate3{
            left: 45%;
            top: 69.6%;
            transform: scale(0.88);
        }
        .slide5-crate .crate4{
            left: 51.08%;
            top: 74.3%;
            transform: scale(0.92);
        }
        .slide5-crate .crate5{
            left: 71.7%;
            top: 66.6%;
            transform: scale(0.82);
        }
        .slide5-crate .crate6{
            left: 70.4%;
            top: 71.8%;
            transform: scale(0.88);
        }
        .slide5-crate .crate7{
            left: 79.7%;
            top: 75.6%;
            transform: scale(0.92);
        }
        .slide5-crate .crate8{
            left: 55.7%;
            top: 82.3%;
        }
        .slide5-crate .crate9{
            left: 70.9%;
            top: 84.6%;
        }
        .slide5-crate .helping-people{
            position:absolute;
            width: 3.1rem;
            left: 58.7%;
            top: 62.2%;
        }
    }
    .page4{
        width: 100%;
        height: 100%;
        background: url("/static/images/campaign/v2/page4_bg_v2.jpg");
        background-size: 100% 100%;
        img{width: 100%}
    }
    .page5{
        width: 100%;
        height: 100%;
        background: url("/static/images/campaign/page5/page5_bg_v2.jpg");
        background-size: 100% 100%;
        img{width: 100%}
    }
    .page6{
        width: 100%;
        height: 100%;
        background: url("/static/images/campaign/v2/page6_bg_v2.jpg");
        background-size: 100% 100%;
        .page6-zi{
            font-size: 0.24rem;
            color: #fff;
            font-weight: bolder;
            line-height: 0.44rem;
            margin-top: 8.1rem;
            margin-left: 0.85rem;
            text-shadow: 0 0 0.4rem #000;
            letter-spacing:0.02rem;
            span{color: #00ffe4;font-size: 0.36rem;}
        }
        .btn{
            width: 6.3rem;
            height: 0.8rem;
            img{width:3rem;height: 0.9rem;}
            margin: 0.7rem auto 0;
        }
    }
    .tan-c{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .5);
        z-index: 3;
        .tan{
            width: 5.58rem;
            height: 7.14rem;
            box-sizing: border-box;
            margin: 0.8rem auto 0;
            padding-top: 2.8rem;
            background: url("/static/images/campaign/v2/tan_bg.jpg") no-repeat;
            background-size: 5.58rem 7.14rem;
            .zi{
                font-size: 0.6rem;
                font-weight:bold;
                line-height: 0.7rem;
                color: black;
                span{color: red}
            }
            .zi-t{margin-left: 0.66rem;}
            .zi-b{margin-left: 1.9rem;}
            .btn{
                width: 4.03rem;
                height: 0.72rem;
                margin: 1.7rem auto 0;
                background: url("/static/images/campaign/v2/btn4.png") no-repeat;
                background-size: 4.03rem 0.72rem;
            }
        }
    }
</style>
