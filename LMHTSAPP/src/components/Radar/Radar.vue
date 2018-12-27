<!--雷达特效组件-->
<template>
  <div class="radar">
    <div class="left-radar left">
      <!--雷达title-->
      <div class="radar-title">
        <p>{{options.radarTitle}}</p>
      </div>
      <!--雷达图标-->
      <div class="radar-title-img">
        <div class="img-box">
          <img src="static/image/map-point/radar.svg" alt="">
        </div>
      </div>
      <!--雷达-->
      <div class="radar-content">
        <div class="my-radar" v-bind:style="[{width:options.radarWidth},{height:options.radarWidth}]">
          <!--雷达中心-->
          <div class="center-bank" v-bind:style="[{width:options.bankItemRaderWidth},{height:options.bankItemRaderWidth},{top:centerBankPosition},{left:centerBankPosition}]">
            <!--雷达小圆圈-->
            <div class="bank-item-box" v-for="(bankItem,index) in options.bankList" v-on:click="lookBank(index)" v-bind:class="[{'less-number-box':bankItem.waitingNumber<=options.lineNumber}]" v-bind:style="[{width:options.bankItemRaderWidth},{height:options.bankItemRaderWidth},{left:bankItem.left},{top:bankItem.top}]">
              <div class="bank-item-content bank-item-content-title">{{bankItem.institutionName}}</div>
              <div class="bank-item-content">
                <span class="bank-item-content-img">
                  <img v-if="bankItem.waitingNumber<=options.lineNumber"  src="static/image/map-point/walkBlack.svg" alt="">
                  <img v-if="bankItem.waitingNumber>options.lineNumber" src="static/image/map-point/walk.svg" alt="">
                </span>
                {{bankItem.distance}}千米
              </div>
            </div>
            <div class="center-content center-content-title">当前银行</div>
            <div class="center-content">{{options.thisBank}}</div>
            <div class="center-content center-content-img">
              <img src="static/image/map-point/location.svg" alt="">
            </div>
          </div>

          <!--轮廓数组-->
          <div class="distance-box" v-for="(lineItem,index) in lineList" v-bind:class="[{'blue-bacground-color':index==lineList.length-1}]" v-bind:style="[{width:lineItem.width},{height:lineItem.width},{top:lineItem.top},{left:lineItem.left}]">
            <span class="distance-box-discript"><span v-if="index!=0">{{lineItem.distance.toFixed(1)}}千米</span></span>
          </div>
        </div>
      </div>
      <!--颜色提示-->
      <div class="color-discript">
        <p class="color-discript-box">
          <span class="color-discript-info-box color-discript-img-box left"></span>
          <span class="color-discript-info-box left">蓝色标记银行排队等待顾客较少</span>
        </p>
      </div>
      <!--时间提示-->
      <div class="time-discript">
        <span class="time-discript-info-box time-discript-img-box left">
          <img src="static/image/map-point/walk.svg" alt="">
        </span>
        <span class="time-discript-info-box left">步行时间</span>
      </div>
    </div>
    <transition name="slide-fade">
      <div v-if="showBankSwitch==true" class="right-details right">
      <!--支行头部title-->
      <div class="details-title details-info-box">
        <span class="left">
          {{showBankInfo.institutionName}}
        </span>
        <span class="right close-info" v-on:click="closeBankInfo">
          ×
        </span>
      </div>
      <!--机构号-->
      <div class="details-institutionNumber details-info-box">
        机构号: {{showBankInfo.institutionNumber}}
      </div>
      <!--机构名称-->
      <div class="details-institutionName details-info-box">
        机构名称: {{showBankInfo.institutionName}}
      </div>
      <!--电话-->
      <div class="details-institutionPhone details-info-box">
        电话: {{showBankInfo.institutionPhone}}
      </div>
      <!--负责人-->
      <div class="details-institutionLeading details-info-box">
        负责人: {{showBankInfo.institutionLeading}}
      </div>
      <!--负责人电话-->
      <div class="details-institutionLeadingPhone details-info-box">
        负责人电话: {{showBankInfo.institutionLeadingPhone}}
      </div>
      <!--地址:-->
      <div class="details-institutionAddress details-info-box">
        地址: {{showBankInfo.institutionAddress}}
      </div>
      <!--步行耗时-->
      <div class="details-timeConsuming details-info-box">
        步行耗时: {{showBankInfo.timeConsuming}}分钟
      </div>
      <!--附近车站-->
      <div class="details-nearbyStation details-info-box">
        附近车站: {{showBankInfo.nearbyStation}}
      </div>
      <!--开柜数量和汇总-->
      <div class="details-collect">
        <aui-table full-bordered style="background-color:#fff;color:#000;">
          <thead>
          <tr>
            <th>开柜数量</th>
            <th>排队等待人数</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{{showBankInfo.NumberOfOpenCabinet}}</td>
            <td>{{showBankInfo.waitingNumber}}</td>
          </tr>
          </tbody>
        </aui-table>
      </div>
      <!--等待数量详情-->
      <div class="details-customer">
        <aui-table full-bordered style="background-color:#fff;color:#000;">
          <thead>
          <tr>
            <th>队列名称</th>
            <th>等待人数</th>
            <th>平均等待时间</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(queueItem,index) in showBankInfo.queueList">
            <td>{{queueItem.name}}</td>
            <td>{{queueItem.number}}</td>
            <td>{{queueItem.aveWait}}</td>
          </tr>
          </tbody>
        </aui-table>
      </div>
    </div>
    </transition>
    <div class="clear"></div>
  </div>
</template>

<script>
  export default {
    name: "radar",
    data(){
      return {
        showBankInfo:this.options.bankList[0],//右侧显示的支行信息
        showBankSwitch:false,
        bigDistance:0,//最大距离
        lineList:[],//轮廓数组
        centerBankPosition:'',//中心坐标偏移位置
      }
    },
    props: {
      options: {  //雷达配置

      },
    },
    computed:{

    },
    created(){
      //定义中心位置
      this.centerBankPosition = (parseInt(this.options.radarWidth)-parseInt(this.options.bankItemRaderWidth))/2-1+'px';
      //修改排序,以便于顺时针增加弧度
      this.options.bankList.sort(this.compare('distance'));
      this.bigDistance = this.options.bankList[this.options.bankList.length-1].distance;
      for (var i = this.options.bankList.length - 1; i >= 0; i--) {
        this.options.bankList[i].angle = -200*i;
        let j = -1;
        if(this.options.bankList[i].angle>90&&this.options.bankList[i].angle<270){
          j=1;
        }
        let k = 1;
        if(this.options.bankList[i].angle>0&&this.options.bankList[i].angle<180){
          k=-1;
        }
        this.options.bankList[i].left = this.options.bankList[i].distance/this.bigDistance*parseInt(this.options.radarWidth)/2/1.3*(j)*Math.cos(90*i)+'px';//左侧偏移
        this.options.bankList[i].top = this.options.bankList[i].distance/this.bigDistance*parseInt(this.options.radarWidth)/2/1.3*(k)*Math.sin(90*i)+'px';//上方偏移
      }
      //定义轮廓数组
      if(this.options.lineAccuracy < 0){
        this.options.lineAccuracy = 0;
      }
      if(this.options.lineAccuracy > 10){
        this.options.lineAccuracy = 10;
      }
      for(var i= 0;i<this.options.lineAccuracy;i++){
        let thisWidth = (2*(i+1)/(2*this.options.lineAccuracy)).toFixed(2)*100;
        this.lineList[i]={
          width:thisWidth+'%',
          left:(100-thisWidth)/2+'%',
          top:(100-thisWidth)/2+'%',
          zIndex:550-i,
          distance:(Number(this.bigDistance)/Number(this.options.lineAccuracy-1))*i*1.2
        }
      }
    },
    mounted(){
      this.showBankSwitch = true;
    },
    methods: {
      compare(property){
        return function(a,b){
          var value1 = a[property];
          var value2 = b[property];
          return value1 - value2;
        }
      },
      lookBank(index){
        this.showBankSwitch = true;
        this.showBankInfo = this.options.bankList[index];
      },
      closeBankInfo(){
        this.showBankSwitch = false;
      }
    }
  }
</script>

<style lang="less" scoped>
  /*公共样式*/
  .left{
    float: left;
  }
  .right{
    float: right;
  }
  .clear{
    clear: both;
  }
  .text-center{
    text-align: center;
  }
  /*盒模型*/
  .radar{
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    .left-radar{
      width: 64%;
      height: 100%;
      overflow: hidden;
      box-sizing: border-box;
      .radar-title{
        padding-left: 15px;
        box-sizing: border-box;
        margin-top: 15px;
        margin-bottom: 15px;
      }
      .radar-title-img{
        .img-box{
          width:40px;
          height: 40px;
          margin-left: 35px;
          img{
            width: 100%;
          }
        }
      }
      .radar-content{
        .my-radar{
          box-sizing: border-box;
          margin: 0 auto;
          margin-top: 20px;
          margin-bottom: 15px;
          position: relative;
          .center-bank{
            position: absolute;
            box-sizing: border-box;
            .bank-item-box{
              position: absolute;
              box-sizing: border-box;
              .bank-item-content{
                width: 80%;
                margin: 0 auto;
                height: 30%;
                .bank-item-content-img{
                  float: left;
                  width: 15px;
                  height: 15px;
                  img{
                    width:100%;
                  }
                }
              }
              .bank-item-content-title{
                width: 80%;
                margin: 0 auto;
                margin-top: 20%;
                margin-bottom: 3%;
              }
            }
            .center-content-title{
              margin-top: 8%;
            }
            .center-content{
              width: 100%;
              height: 30%;
              text-align: center;
              color: #5BC7F1;
              font-size: 13px;
              font-family: "楷体";
            }
            .center-content-img{
              width: 20px;
              height: 20px;
              margin: 0 auto;
              img{
                width: 100%;
              }
            }
          }

          .distance-box{
            position: absolute;
            box-sizing: border-box;
            .distance-box-discript{
              position: absolute;
              box-sizing: border-box;
              width: 100%;
              bottom: 0px;
            }
          }
        }
      }
      .color-discript{
        margin-top: 60px;
        margin-bottom: 20px;
        .color-discript-box{
          height: 30px;
          line-height: 30px;
          padding-left: 30px;
          box-sizing: border-box;
          .color-discript-info-box{
            height: 30px;
            line-height: 30px;
            margin-left: 10px;
          }
          .color-discript-img-box{
            width: 20px;
            height: 20px;
            margin-top: 5px;
          }
        }
      }
      .time-discript{
        height: 30px;
        line-height: 30px;
        padding-left: 28px;
        box-sizing: border-box;
        .time-discript-info-box{
          height: 30px;
          line-height: 30px;
          margin-left: 10px;
        }
        .time-discript-img-box{
          width: 20px;
          height: 20px;
          margin-top: 5px;
          img{
            width: 100%;
          }
        }
      }
    }
    .right-details{
      width: 36%;
      height: 100%;
      overflow-y: scroll;
      box-sizing: border-box;
      .details-info-box{
        width:100%;
        height: 35px;
        line-height: 35px;
        padding-left: 20px;
        padding-right: 10px;
        box-sizing: border-box;
      }
      .details-title{
        height: 40px;
        line-height: 40px;
        margin-bottom: 10px;
        .close-info{
          width: 25px;
          height: 25px;
          margin-top: 8px;
          line-height: 20px;
          box-sizing: border-box;
        }
      }
      .details-institutionNumber{

      }
      .details-institutionName{

      }
      .details-institutionPhone{

      }
      .details-institutionLeading{

      }
      .details-institutionLeadingPhone{

      }
      .details-institutionAddress{

      }
      .details-timeConsuming{

      }
      .details-nearbyStation{

      }
      .details-collect{
        margin: 10px auto;
        padding: 0 20px 0 20px;
        box-sizing: border-box;
      }
      .details-customer{
        margin: 10px auto;
        padding: 0 20px 0 20px;
        box-sizing: border-box;
      }
    }
  }
  /*基础样式*/
  .radar{
    background-color:#F7F7F7;
  }
  .right-details{
    border: 1px solid #D5D5D5;
    border-right: none;
    border-radius: 15px 0px 0px 15px;
  }
  .radar-title{
    color: #50C4F0;
    font-size: 18px;
    letter-spacing:2px;
    font-weight: bold;
  }
  .my-radar{
    border-radius: 50%;
    background-color: #3CBFEF;
    border: 1px solid #ddd;
  }
  .color-discript-info-box, .time-discript-info-box{
    color:#000;
    font-size: 18px;
    letter-spacing: 1px;
    font-family: '楷体';
  }
  .color-discript-img-box{
    border-radius: 50%;
    background-color: #009EDB;
  }
  .details-info-box{
    color: #000;
    font-size: 18px;
  }
  .details-title{
    border-bottom: 1px solid #C5D3D8;
    color: #FFFFFF;
    background-color: #3CBFEF;
  }
  .close-info{
    text-align: center;
    border-radius: 50%;
    border: 1px solid #fff;
    font-size: 22px;
  }
  .distance-box{
    border-radius: 50%;
    border: 2px solid #fff;
    z-index: 500;
  }
  .distance-box-discript{
    text-align: center;
    color:#fff;
    font-size: 13px;
  }
  .bank-item-box{
    border-radius: 50%;
    border: 1px solid #00B7EE;
    background-color: #fff;
  }
   .center-bank{
    border-radius: 50%;
    border: 1px solid #6BCDF1;
    background-color: #fff;
   }
  .blue-bacground-color{
    border-color: #6BCDF1;
  }
  .bank-item-content{
    font-size: 12px;
    color: #000;
    font-family: "楷体";
    overflow: hidden;
    text-align: center;
    z-index: 800;
  }
  .bank-item-content-title{
    border-bottom: 1px solid #000;
  }
  .center-bank{
    z-index: 800;
  }
  .less-number-box{
    background: linear-gradient(#98E2F8,#00AFEB);
  }
  /*交互*/
  .slide-right-enter {
    transform: translateX(250px);
    opacity: 0;
  }
  .slide-right-enter-active {
    transition: all 0.8s ease;
  }
  .slide-right-leave-active {
    transition: all 0s;
  }
  .slide-right-leave-to {
    opacity: 0;
  }
</style>
