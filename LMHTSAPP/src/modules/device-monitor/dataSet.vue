<template>
  <div class="device-monitor">
    <p class="head">
      <img src="static/image/deviceMonitor/dataset.svg" class="icon">数据统计
    </p>
    <div class="content">
      <aui-flexbox :gutter="0">
        <aui-flexbox-item>
          <p class="title">渠道交易统计</p>
          <div class="vtm-box">
            <p class="vtm-title">编号001<span class="state-tip-online"></span></p>
            <p class="vtm-icon">
              <img src="static/image/deviceMonitor/vtm.png" alt="">
            </p>
            <p class="vtm-foot">
              查看详情
            </p>
            <img src="static/image/deviceMonitor/triangle.png" class="checked-icon">
          </div>
        </aui-flexbox-item>
        <aui-flexbox-item>
          <p class="title">按时间段统计</p>
          <div class="vtm-box">
            <p class="vtm-title">编号002<span class="state-tip"></span></p>
            <p class="vtm-icon">
              <img src="static/image/deviceMonitor/vtm.png" alt="">
            </p>
            <p class="vtm-foot">
              查看详情
            </p>
          </div>
        </aui-flexbox-item>
      </aui-flexbox>
      <div class="card-box">
        <i class="fa fa-chevron-left set-icon"></i>
        <i class="fa fa-chevron-right set-icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "device-monitor"
    }
</script>

<style scoped lang="less">
  .device-monitor{
    height:calc(~"100% - 20px");
    .head{
      height:40px;
      line-height:40px;
      border-bottom:1px solid #F5F4F1;
      box-sizing: border-box;
      font-size:16px;
      .icon{
        width:26px;
        height:26px;
        vertical-align: middle;
        margin:0 10px;
      }
    }
    .content{
      height:calc(~"100% - 40px");
      overflow-y: auto;
      .title{
        font-size:20px;
        padding:10px 30px 0px 30px;
        border-bottom: solid 1px #666666;
      }
      .vtm-box{
        width:250px;
        height:296px;
        border-radius: 10px 10px 0 0;
        border: 1px solid #E1C287;
        background-color:#E1C287;
        color:#fff;
        position: relative;
        .vtm-title{
          height:50px;
          line-height:50px;
          font-size:18px;
          text-align: center;
          border-radius: 10px 10px 0 0;
          .state-tip{
            display:inline-block;
            width:26px;
            height:26px;
            border-radius:50%;
            background-color: #D4CFC1;
            position: absolute;
            top:12px;
            right:24px;
          }
          .state-tip-online{
            .state-tip;
            background-color: #09F175;
          }
        }
        .vtm-icon{
          height:164px;
          box-sizing: border-box;
          padding:29px 72px;
          background-color:#fff;
          img{
            width:106px;
            height:106px;
          }
        }
        .vtm-foot{
          font-size:20px;
          text-align: center;
          vertical-align: middle;
          height:80px;
          line-height:80px;
        }
        .checked-icon{
          width:30px;
          height:24px;
          position:absolute;
          bottom:-24px;
          left:110px;
        }
      }
      .card-box{
        margin-top:24px;
        height:260px;
        background-color:#F1E3C9;
        position:relative;
        .set-icon{
         font-size:24px;
         color:#969084;
         top:50%;
         position: absolute;
         transform: translateY(-50%);
        }
        .set-icon-left{
          .set-icon;
          left:20px;
        }
        .set-icon-right{
          .set-icon;
          right:20px;
        }
      }
    }
  }
</style>
