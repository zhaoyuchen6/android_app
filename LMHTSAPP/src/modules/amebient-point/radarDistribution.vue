<template>
  <div class="radar-distribution">
    <!--标题栏-->
    <x-header   height="8%" class="page-header" :left-options="{showBack:!this.$store.state.showMenu}"	 >
    <!-- <x-header  :left-options="{preventGoBack:true}"	 @on-click-back="goBack"> -->
      <!-- <img slot="left" src="static/image/icon-fanhui-2.svg" alt="" class="img_back"> -->
      <span class="header-title">周边网点信息</span>
      <span class="icon-change header-img" slot="right"  @click="nextAction"></span>
      <!-- <span slot="right" class="right-font theme-color" v-on:click="nextAction()">地图模式</span> -->
    </x-header>
    <!--主体框-->
    <div class="counterMain">
      <radar :options="options" style="width:100%;height:100%"></radar>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import radarMap from "./map-data.js" //引入图表数据
import Radar from "@/components/Radar/Radar";

export default {
  name: "radar-distribution",
  components:{
      Radar
  },
  data() {
    return {
      options:{//雷达属性参数
          lineAccuracy:4,//定义划分区域数量 最小为0.最大为10,例如:为3时有两条白色环形线,划成3个区域
          radarWidth:'420px',//定义内部雷达直径
          bankItemRaderWidth:'70px',//定义雷达内部小圆圈的宽度和高度
          lineNumber:'10',//排队人数限制,小于它时表示排队等待顾客较少
          radarTitle:'周边网点排队现状雷达分布图',//雷达名称
          thisBank:'赞同银行',//当前银行(中心名称)
          bankList:[//支行数据
            {
              institutionNumber:'01',//机构号
              institutionName:'合肥支行',//机构名称
              institutionPhone:'40088-96588',//电话
              institutionLeading:'刘晓斌',//负责人
              institutionLeadingPhone:'15797670370',//负责人电话
              institutionAddress:'长江中路145号',//地址
              distance:'1.5',//距离(单位:千米)
              timeConsuming:'10',//步行耗时(单位:分钟)
              nearbyStation:'322/98/15',//附近车站
              NumberOfOpenCabinet:'2',//开柜数量
              waitingNumber:'12',//等待人数
              queueList:[//排队队列详情
                {
                  name:'对公客户',//队列名称
                  number:'1',//等待人数
                  aveWait:'8',//平均等待时间(min)
                },
                {
                  name:'对私客户',//队列名称
                  number:'4',//等待人数
                  aveWait:'15',//平均等待时间(min)
                },
                {
                  name:'VIP客户',//队列名称
                  number:'1',//等待人数
                  aveWait:'10',//平均等待时间(min)
                },
                {
                  name:'理财金客户',//队列名称
                  number:'1',//等待人数
                  aveWait:'15',//平均等待时间(min)
                },
                {
                  name:'准星级客户',//队列名称
                  number:'1',//等待人数
                  aveWait:'12',//平均等待时间(min)
                },
                {
                  name:'普通客户',//队列名称
                  number:'4',//等待人数
                  aveWait:'15',//平均等待时间(min)
                },
              ]
            },
            {
              institutionNumber:'02',//机构号
              institutionName:'黄寺支行',//机构名称
              institutionPhone:'40088-96588',//电话
              institutionLeading:'刘德',//负责人
              institutionLeadingPhone:'13545678789',//负责人电话
              institutionAddress:'长江路14225号',//地址
              distance:'2',//距离(单位:千米)
              timeConsuming:'20',//步行耗时(单位:分钟)
              nearbyStation:'2/198/125',//附近车站
              NumberOfOpenCabinet:'3',//开柜数量
              waitingNumber:'10',//等待人数
              queueList:[//排队队列详情
                {
                  name:'对公客户',//队列名称
                  number:'2',//等待人数
                  aveWait:'3',//平均等待时间(min)
                },
                {
                  name:'对私客户',//队列名称
                  number:'4',//等待人数
                  aveWait:'1',//平均等待时间(min)
                },
                {
                  name:'VIP客户',//队列名称
                  number:'5',//等待人数
                  aveWait:'10',//平均等待时间(min)
                },
                {
                  name:'理财金客户',//队列名称
                  number:'2',//等待人数
                  aveWait:'15',//平均等待时间(min)
                },
                {
                  name:'准星级客户',//队列名称
                  number:'1',//等待人数
                  aveWait:'12',//平均等待时间(min)
                },
                {
                  name:'普通客户',//队列名称
                  number:'4',//等待人数
                  aveWait:'15',//平均等待时间(min)
                },
              ]
            },
            {
              institutionNumber:'03',//机构号
              institutionName:'大黄寺支行',//机构名称
              institutionPhone:'40088-96588',//电话
              institutionLeading:'张柏',//负责人
              institutionLeadingPhone:'15676789898',//负责人电话
              institutionAddress:'周家嘴路145号',//地址
              distance:'3',//距离(单位:千米)
              timeConsuming:'30',//步行耗时(单位:分钟)
              nearbyStation:'1/928/125',//附近车站
              NumberOfOpenCabinet:'2',//开柜数量
              waitingNumber:'12',//等待人数
              queueList:[//排队队列详情
                {
                  name:'对公客户',//队列名称
                  number:'5',//等待人数
                  aveWait:'8',//平均等待时间(min)
                },
                {
                  name:'对私客户',//队列名称
                  number:'2',//等待人数
                  aveWait:'15',//平均等待时间(min)
                },
                {
                  name:'VIP客户',//队列名称
                  number:'1',//等待人数
                  aveWait:'10',//平均等待时间(min)
                },
                {
                  name:'理财金客户',//队列名称
                  number:'1',//等待人数
                  aveWait:'15',//平均等待时间(min)
                },
                {
                  name:'准星级客户',//队列名称
                  number:'1',//等待人数
                  aveWait:'12',//平均等待时间(min)
                },
                {
                  name:'普通客户',//队列名称
                  number:'4',//等待人数
                  aveWait:'15',//平均等待时间(min)
                },
              ]
            },
          ],
        },
    };
  },
  methods: {
    nextAction() {
      let actionInfo = {
        nextPage: "mapPoint",
        action: "next"
      };
      this.$emit("nextAction", actionInfo);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../static/public-style/theme-blue.less";
.radar-distribution {
  height: 100%;
  .page-header {
    .header-img{
      color:@theme-color-font;
    }
    .right-font {
      text-align: right;
      font-size: 16px;
      font-weight: 600;
      vertical-align: middle;
    }
    .img_back {
      display: none;
      width: 36px;
      margin-left: 36px;
      margin-top: -6.4px;
    }
  }
  .counterMain {
    height: calc(~"100%-"70px);
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: #fff;
    width: 98%;
    margin-left: 1%;
    .content {
      height: 99%;
      padding-right: 22px;
      width: 100%;
      background: #F7F7F7;
      .flex_item_1 {
        height: 98%;
        padding-top: 16px;
        padding-left: 24px;
        background-color: #F7F7F7;
        .left-p{
          width: 100%;
          text-align: left;
          font-size: 20px;
        }
        .radar-logo{
          width: 100%;
          text-align: left;
          font-size:26px;
          color:@theme-color-font;
        }
        .radar-box{
          width: 100%;
          border: 1px solid #dddddd;
          margin-bottom:20px;
          height: 500px;
        }
        .img_walk {
          color: #000;
          width: 25.6px;
          vertical-align: bottom;
        }
        .remark {
          font-size: 16px;;
        }

        .circle {
          width: 20px;
          height: 20px;
          display:inline-block;
          background-color:@theme-color-font;
          border-radius: 50%;
          -moz-border-radius: 50%;
          -webkit-border-radius: 50%;
          margin-left: 3.84px;
        }

        .circle_lable {
          margin-top: -29px;
          margin-left: 32px;
        }
        .set-walk{
          font-size:26px;
          color:@theme-color-font;
          position: relative;
          top:4px;
        }
      }

      .flex_item_2 {
        background: #F5F5F5;
        height: 100%;
        border: 1px solid #dddddd;
        border-top-left-radius: 8.96px;
        border-top-right-radius: 8.96px;
        .img_close {
          float: right;
          width: 22px;
          height: 22px;
          margin-top: 5px;
        }
        .flex_title {
          background-color: @theme-color-bg;
          height: 32.0px;
          line-height: 32.0px;
          padding: 0 12.8px;
          border-top-left-radius: 8.96px;
          border-top-right-radius: 8.96px;
          .title-span{
            font-size:20px;
            color:@theme-color-font;
            text-align: left;
          }
        }
        .map-right-span{
          padding: 16px;
          font-size: 17px;
          .span-address{
            padding-left: 32px;
          }
        }
        table {
          width: 100%;
          border-collapse: collapse;
          text-align: center;
          border: #dddddd;
          .small-tab{
            td{
              padding: 10px 0;
            }
          }


        }
        .big-table{
          margin-top: 30px;
          font-size: 16px;
          .big-table-title{
            td{
                padding: 7px 0;
            }
          }
          td{
            padding: 3px 0;
          }
        }
      }
    }
  }
}
</style>

