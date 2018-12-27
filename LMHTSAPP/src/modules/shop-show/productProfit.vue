<template>
  <div class="product-profit">
    <div class="title">
      <img src="static/image/shopShow/banner2.png">
    </div>
    <div class="content">
      <p class="banner-title">计在于春  一定“慧盈”</p>
      <div class="tip-box">
        <img src="static/image/shopShow/tip1.png" alt="">
        <div class="tip-content">
          <p class="tip-title">简单方便&nbsp;&nbsp;轻松投资</p>
          <p class="tip-info">起投门槛低，1万即可起投</p>
        </div>
      </div>
      <div class="tip-box">
        <img src="static/image/shopShow/tip2.png" alt="">
        <div class="tip-content">
          <p class="tip-title">计算利息快</p>
          <p class="tip-info">当天24点前购买<br/>成交次日即可起息</p>
        </div>
      </div>
      <div class="tip-box">
        <img src="static/image/shopShow/tip3.png" alt="">
        <div class="tip-content">
          <p class="tip-title">资金周转灵活</p>
          <p class="tip-info">60天债券可发起转让<br/>成功后资金快速到账</p>
        </div>
      </div>
      <aui-button class="btn-yellow">立即投资</aui-button>
      <p class="explain">
        <span class="explain-badge">说明</span>
        <span>“慧盈安e+”仅为债券出让方和受让方提供中介服务，并不承诺为每一个债权人成功完成转让</span>
      </p>
      <div class="disclaimer">
        <p class="disclaimer-title">平台免责说明</p>
        <div class="disclaimer-content">
          作为交易服务平台进行信息发布，不对任何投资人及/或任何交易提供任何担保，<br/>无论明示、默认或法定的。陆金服平台提供的各种信息及资料仅供参考，投资人应依其独立判断作出决策。<br/>投资人据此进行投资交易的，产生的投资风险由投资人自行承担，陆金服不承担任何责任。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "product-profit",
        data(){
          return {
          }
        },
        methods:{
        }
    }
</script>

<style scoped lang="less">
  .product-profit{
    font-size: 0;
  }
  .title{
    width:100%;
    img{
      width:100%;
      height:auto;
    }
  }
  .content{
    background:linear-gradient(to right,#123972,#1b1e3f);
    font-size: 16px;
    padding:20px;
    .banner-title{
      font-size:28px;
      color:#4375C3;
      text-align: center;
      padding:20px;
    }
    .tip-box{
      width:826px;
      height:248px;
      margin:5px auto;
      position: relative;
      img{
        width:100%;
        height:100%;
      }
      .tip-content{
        position: absolute;
        color:#fff;
        width:350px;
        text-align: center;
        top:60px;
        left:360px;
        .tip-title{
          font-size:30px;
          font-weight: bold;
          padding:10px;
          border-bottom:2px solid #fff;
        }
        .tip-info{
          font-size:24px;
          text-align: center;
        }
      }
    }
  }
  .btn-yellow{
    background-color:#FFE351;
    color:#846A04;
    width:296px;
    height:62px;
    border-radius:31px;
    font-size:26px;
    box-shadow:0 5px 0 #B09524;
    margin:15px auto;
  }
  .explain{
    color:#607D98;
    text-align: center;
  }
  .explain-badge{
    display: inline-block;
    width:60px;
    height:32px;
    line-height:32px;
    border-radius:16px;
    color: #68B1EE;
    background-color: #4086DA;
    text-align: center;
  }
  .disclaimer{
    width:846px;
    height:134px;
    margin:50px auto 20px;
    border:1px dashed #607D98;
    border-radius:10px;
    color:#607D98;
    text-align: center;
    .disclaimer-title{
      color:#93DDFD;
      font-size:30px;
      font-weight: bold;
      text-align: center;
      position: relative;
      top:-24px;
    }
    .disclaimer-content{
      position: relative;
      top:-16px;
    }
  }
</style>
