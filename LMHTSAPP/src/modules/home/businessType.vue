<template>
 <div class="business-type">
   <x-header :left-options="{preventGoBack:true}" class="blue-header" @on-click-back="goBack">
     业务类型数据展示
   </x-header>
   <aui-flexbox class="content" :gutter="0" align="stretch">
     <aui-flexbox-item class="border-right">
       <!--饼图-->
       <div ref="businessPie" class="set-chart"></div>
     </aui-flexbox-item>
     <aui-flexbox-item>
       <!--柱状图-->
       <div ref="businessBar" class="set-chart"></div>
     </aui-flexbox-item>
   </aui-flexbox>
 </div>
</template>

<script>
  import {pie,bar} from "./home-data"  //引入图表数据
    export default {
        name: "business-type",
        data(){
         return {
           pie:pie('#fff'),
           bar:bar()
         }
        },
        methods:{
         // 绘制饼图
         drawPie(){
           let element=this.$refs.businessPie;
           let myChart=this.$echarts.init(element);
           let option=this.pie;
           myChart.setOption(option);
         },
         //绘制柱状图
         drawBar(){
           let element=this.$refs.businessBar;
           let myChart=this.$echarts.init(element);
           let option=this.bar;
           myChart.setOption(option);
         },
         goBack(){
            this.$emit('goHome');
         }
        },
        mounted(){
          this.drawPie();
          this.drawBar();
        }
    }
</script>

<style scoped lang="less">
  @border-color:#EAEAEA;
  .business-type{
    height:100%;
    background-color: #ffffff;
    overflow: hidden;
  }
  .content{
    height:calc(~"100% - "42px);
  }
  .set-chart{
    margin:60px auto 10px;
    width:550px;
    height:600px;
    box-sizing: border-box;
  }
  .border-right{
    border-right:1px solid @border-color!important;
  }
</style>
