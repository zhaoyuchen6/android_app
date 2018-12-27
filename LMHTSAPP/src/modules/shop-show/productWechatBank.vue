<template>
  <div class="product-wechat-bank">
    <div class="title">
      <img src="static/image/shopShow/banner1-title.png">
    </div>
    <div class="title tip-box">
      <img src="static/image/shopShow/tip-box.png">
      <p class="tip-info"> 微信银行新增绑卡用户，可获得由蜜芽提供价值79元保温杯领取资格。客户登录蜜芽APP消费39元以上即可免费领取。</p>
    </div>
    <p class="text-big">请输入手机号码进行活动报名</p>
    <div class="input-box">
      <input type="text" placeholder="请输入手机号码" v-model="phoneNum" class="set-input">
    </div>
    <div class="btn-purple" @click="showPhone">
      <img src="static/image/shopShow/btn-purple.png">
      <p class="btn-text">报名参加</p>
    </div>
    <p class="detail">活动细则&nbsp;></p>
    <p class="tip">温馨提示：您提供的手机号可能用于权益通知、领取等与该活动相关的提醒，每个手机号仅需提交一次信息。</p>
  </div>
</template>

<script>
    export default {
        name: "product-wechat-bank",
        data(){
          return {
            phoneNum:""
          }
        },
        methods:{
          showPhone(){
            alert(this.phoneNum);
          }
        }
    }
</script>

<style scoped lang="less">
  @mainColor:#2727A1;
  .product-wechat-bank{
    font-size: 0;
    color:@mainColor;
    padding-bottom: 40px;
  }
  .title{
    width:100%;
    img{
      width:100%;
      height:auto;
    }
  }
  .tip-box{
    position: relative;
    .tip-info{
      font-size:28px;
      font-weight:bold;
      width:50%;
      color:#fff;
      position: absolute;
      top:30%;
      left:25%;
    }
  }
  .text-big{
    font-size:24px;
    text-align: center;
    padding:10px;
  }
  .input-box{
    border:1px solid @mainColor;
    width:758px;
    height:60px;
    border-radius:10px;
    margin:5px auto;
    padding:8px;
    box-sizing: border-box;
    .set-input{
      border:1px dashed #A6A6C1;
      line-height:50px;
      width:100%;
      height:100%;
      border-radius:10px;
      padding-left:10px;
      box-sizing: border-box;
      font-size: 18px;
      outline: none;
    }
  }
  .btn-purple{
    font-size:20px;
    width:838px;
    height:112px;
    margin:10px auto;
    position:relative;
    img{
      width:100%;
      height:100%;
    }
    .btn-text{
      position:absolute;
      color:#fff;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      font-size:34px;
      font-weight: bold;
      letter-spacing:5px;
    }
  }
  .detail{
    font-size:18px;
    text-align: center;
    padding:10px;
  }
  .tip{
    font-size:20px;
    width:60%;
    margin:10px auto;
  }
</style>
