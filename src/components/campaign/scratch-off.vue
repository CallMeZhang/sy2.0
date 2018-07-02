<template>
    <div>
        <button id="freshBtn">刷新彩票</button><label>已刮开 <span id="drawPercent">0%</span> 区域。</label>
        <div id="lotteryContainer"></div>
    </div>
</template>

<script>
    import lottery from '@/modules/_scratch/scratch-off.js';
    export default {
        name: "scratch-off",
        data(){},
        created(){},
        mounted(){},
        methods:{
            windowonload  () {
                var lottery = new Lottery('lotteryContainer', '#CCC', 'color', 300, 100, drawPercent);
                lottery.init('http://www.baidu.com/img/bdlogo.gif', 'image');
                document.getElementById('freshBtn').onclick = function() {
                    drawPercentNode.innerHTML = '0%';
                    lottery.init(getRandomStr(10), 'text');
                }
                var drawPercentNode = document.getElementById('drawPercent');
                function drawPercent(percent) {
                    drawPercentNode.innerHTML = percent + '%';
                }
            },
            getRandomStr(len) {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for( var i=0; i < len; i++ )
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                return text;
            }
        }
    }
</script>

<style scoped>
    #lotteryContainer {
        position:relative;
        width: 300px;
        height:100px;
    }
    #drawPercent {
        color:#F60;
    }
</style>