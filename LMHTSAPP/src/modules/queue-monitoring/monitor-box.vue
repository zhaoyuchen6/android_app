<template>
  <div class="monitor-box">
      <!--@click.native="changeFlag(item.custid)" -->
     <div class="cust-num">{{item.queueno}}</div>
     <div class="cust-info">
       <div class="circle">
         <p>已等待时间</p>
         <p>{{item.time}}分钟</p>
         <p>取号时间</p>
         <p>{{item.inqueuetime}}</p>
       </div>
       <div class="cust-name">
         <div @click="showInfo(item)">{{item.custname}}
            <span class="set-icon"> <img src="static/image/queue-monitoring/look.svg"></span>
         </div>
         <span>客户等级：{{item.custlevel | custlevelFile}}</span>
       </div>
       <div class="cust_logo">
         <span class="logo_circle">网</span>
         <span class="logo_circle">话</span>
         <span class="logo_circle">自</span>
         <span class="logo_circle">微</span>
         <span class="logo_circle">移</span>
       </div>
     </div>

  </div>
</template>

<script>
    export default {
        name: "monitor-box",
        props:{
          item:{
            type:Object,
            required:true
          }
        },
        filters: {
          custlevelFile: function (value) {
            let statusname='';
            if(value==="1"){
              statusname="普通客户";
            }
            else if(value==="2"){
              statusname="黄金客户";
            }
            else if(value==="3"){
              statusname="白金客户";
            }
            else if(value==="4"){
              statusname="钻石客户";
            }
            return statusname;
          }
        },
        methods:{
          showInfo(item){
            this.$emit('showInfo',item.custid);
          }
        }
    }
</script>

<style scoped lang="less">
  @import '../../../static/public-style/theme-blue.less';
  .monitor-box{
    width:256px;
    height:282px;
    box-sizing: border-box;
    border-radius:16px 16px 0 0;
    display: block;
    position: relative;
    background-color: #fff;
    margin:12px 8px;
  }
  .cust-num{
    background: @theme-color-bg;
    height:50px;
    text-align:center;
    font-size:26px;
    border-radius:16px 16px 0 0;
    color:@title-color-font;
  }
  .cust-info{
    height:232px;
    box-sizing: border-box;
    border:2px solid @monitor-border-color;
    border-top:0;
  }
  .circle{
    width:100px;
    height:100px;
    background-color: #F0F2F5;
    border-radius:50%;
    position: absolute;
    top:38px;
    left:50%;
    transform: translateX(-50%);
    color: #fff;
  }
  .circle p{
    text-align: center;
    font-size: 12px;
    color: red;
  }
  .circle p:nth-child(1){
    margin-top: 20px;
    color:@theme-color-font;
  }
  .circle p:nth-child(2){
    color: @theme-color-font;
    border-bottom: 1px solid #e2e3e3;
  }
  .circle p:nth-child(3) ,.circle p:nth-child(4){
    color: #acb7c7;
  }
  .cust-name{
    height: 184px;
    padding-top:100px;
    box-sizing: border-box;
    border-bottom: 2px solid @monitor-border-color;
  }
  .cust-name div{
    height: 44px;
    line-height:44px;
    width: 80%;
    margin-left: 10%;
    background-color: #F0F2F5;
    color: #F69B26;
    text-align: center;
    font-size: 18px;
    .set-icon{
      display: inline-block;
      width:24px;
      height:24px;
      position: relative;
      top:5px;
      img{
        width:100%;
        height:100%;
      }
    }
  }
  .cust-name>span{
    height:44px;
    line-height:44px;
    display: inline-block;
    width: 80%;
    margin-left: 10%;
    text-align: center;
    font-size:16px;
    color: black;
  }
  .cust_logo{
    height:48px;
    line-height:48px;
    text-align: center;
  }
  .cust_logo .logo_circle{
    width:28px;
    height:28px;
    color: rgb(255, 255, 255);
    display: inline-block;
    text-align: center;
    line-height: 28px;
    border-radius:50%;
    font-size:16px;
    &:nth-child(1){
      background-color:#F9B2C7;
    }
    &:nth-child(2){
      background-color: #D9B716;
    }
    &:nth-child(3){
      background-color: #21EBB9;
    }
    &:nth-child(4){
      background-color: #F8A716;
    }
    &:nth-child(5){
      background-color: #35AD83;
    }
  }
  .cust_logo img{
    width:32px;
    vertical-align: middle;
    float: right;
    margin-right: 3%;
  }
  .cust_bottom{
    height:48px;
    line-height:48px;
    text-align: center;
    color: #fff;
    background-color:#E1C287;
    font-size: 20px;
  }
  .cust_bottom span{
    display: inline-block;
    width: 30%;
  }
  //加动效
  .v-grid-item-dragging .monitor-box{
    transform-origin:50% 50%;
    animation-name: shake;
    animation-duration: 0.14s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
</style>
