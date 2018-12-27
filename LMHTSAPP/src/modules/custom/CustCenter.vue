<template>
  <div class="cust-center">
    <x-header  class="page-header" :left-options="{showBack:false}">
        <span>客户中心</span>
    </x-header>
    <!-- 主界面部分 -->
    <aui-flexbox align="stretch" class="container" :gutter="0">
      <!--左侧3/4-->
      <aui-flexbox-item :span="3/4" class="content-left">
        <!--快捷入口-->
        <div class="cl-top">
          <p class="cl-title">快捷入口</p>
          <div  class="enter-box">
            <!--我的群组-->
            <div class="enter-div" @click="ItemClickFunc('0')">
              <div class="panelbox" style="background: #FF9501;">
                <aui-flexbox>
                  <aui-flexbox-item :span="2">
                    <img src='static/image/custcenter/wodequnzu.svg'>
                  </aui-flexbox-item>
                  <aui-flexbox-item>
                    <span style="padding-left:0.8vw;">我的群组</span>
                  </aui-flexbox-item>
                </aui-flexbox>
              </div>
            </div>
            <!--我的主管客户-->
            <div class="enter-div" @click="ItemClickFunc('105')">
              <div class="panelbox" style="background: #C54DF7;">
                <aui-flexbox>
                  <aui-flexbox-item :span="2">
                    <img src='static/image/custcenter/wodezhuguankehu.svg'>
                  </aui-flexbox-item>
                  <aui-flexbox-item>
                    <span style="padding-left:0.8vw;">我的主管客户</span>
                  </aui-flexbox-item>
                </aui-flexbox>
              </div>
            </div>
            <!--我的辅管客户-->
            <div class="enter-div" @click="ItemClickFunc('106')">
              <div class="panelbox" style="background: #02ABDE;">
                <aui-flexbox>
                  <aui-flexbox-item :span="2">
                    <img src='static/image/custcenter/wodezhuguankehu.svg'>
                  </aui-flexbox-item>
                  <aui-flexbox-item>
                    <span style="padding-left:0.8vw;">我的辅管客户</span>
                  </aui-flexbox-item>
                </aui-flexbox>
              </div>
            </div>
            <!--我的全部客户-->
            <div class="enter-div" @click="ItemClickFunc('104')">
              <div class="panelbox" style="background: #257BEC;">
                <aui-flexbox>
                  <aui-flexbox-item :span="2">
                    <img src='static/image/custcenter/wodezhuguankehu.svg'>
                  </aui-flexbox-item>
                  <aui-flexbox-item>
                    <span style="padding-left:0.8vw;">我的全部客户</span>
                  </aui-flexbox-item>
                </aui-flexbox>
              </div>
            </div>
          </div>
        </div>
        <!--分隔符-->
        <hr/>
        <!--各种图-->
        <aui-flexbox class="cl-normal">
          <!--活跃客户数 线图-->
          <aui-flexbox-item style="border-right:1px solid #E6E6E6;height:100%;">
            <p class="set-title">活跃客户数</p>
            <!--当天业务流量曲线图-->
            <div ref="cusActiveSet" class="set-chart"></div>
          </aui-flexbox-item>
          <!--客户变动 线图-->
          <aui-flexbox-item style="margin-left:0;height:100%">
            <p class="set-title">客户变动</p>
            <div ref="custChangeSet" class="set-chart"></div>
          </aui-flexbox-item>
        </aui-flexbox>
        <!--分隔符-->
        <hr/>
        <aui-flexbox class="cl-normal">
          <!--客户等级分布 饼图-->
          <aui-flexbox-item style="border-right:1px solid #E6E6E6;height: 100%">
            <p class="set-title">客户等级分布</p>
            <div ref="custLevelSet" class="set-chart"></div>
          </aui-flexbox-item>
          <!--客户资产 柱图-->
          <aui-flexbox-item style="margin-left:0;height:100%;">
            <p class="set-title">客户资产</p>
            <div ref="custAmountSet" class="set-chart"></div>
          </aui-flexbox-item>
        </aui-flexbox>
      </aui-flexbox-item>
      <!--右侧1/4-->
      <aui-flexbox-item :span="1/4" class="content-right">
        <aui-group-title class="text-title">客户大额变动</aui-group-title>
        <div class="text-body">
          <div v-for="(item,index) in rankingList" :key="index" class="text-style">
            <aui-flexbox :gutter="0">
              <!--客户名称-->
              <aui-flexbox-item class="text_name">
                {{item.name}}
              </aui-flexbox-item>
              <!--客户等级-->
              <aui-flexbox-item class="text_rank">
                <div style="float:right;"> {{item.rank}}</div>
              </aui-flexbox-item>
            </aui-flexbox>
            <aui-flexbox>
              <!--金额变动-->
              <aui-flexbox-item class="text_amount">
                <span>
                  <img src="static/image/custcenter/luseliubian.svg">
                </span>
                {{item.oprtype}}
                <span style="color: #FF8381;" v-if="item.oprtype==='存入'||item.oprtype==='转入'">
                  <span style="font-weight:700;font-family: Arial;">{{item.amount}} </span>
                </span>
                <span v-else style="color: #51C5FF;font-weight:700;font-family: Arial;">{{item.amount}}</span>
                万元
              </aui-flexbox-item>
              <!--操作时间-->
              <aui-flexbox-item class="text_time">
                <div style=" float:right;">{{item.time}}</div>
              </aui-flexbox-item>
            </aui-flexbox>
          </div>
        </div>
      </aui-flexbox-item>
    </aui-flexbox>
  </div>

</template>

<script type="text/ecmascript-6">
  import {
    RootActivityManager
  } from "ab-manager-activity";
  import TradeActivityManager from "@/common/activity-manager/trade-activity-manager"; // 相对路径
  import BasicActivity from "@/mixins/basic-activity"; //当前路由事件集合
  import EventNames from "@/common/activity-manager/activity-event-names"; //路由事件名称
  import {
    PageManager
  } from "ab-manager-page"; //页面管理
  import {
    TradeFlowManager
  } from "ab-manager-trade-flow"; //流程管理
  import ajaxApi from '@/common/api/custom'
  import {
    cusActive,custChange,custLevel,custAmount,
  } from "./cust-data" //引入图表数据
  // import ECharts from 'vue-echarts/components/ECharts.vue'
  // import 'echarts/lib/component/title'
  // import 'echarts/lib/component/legend'
  // import 'echarts/lib/component/tooltip'
  // import 'echarts/lib/chart/bar'
  // import 'echarts/lib/chart/line'
  // import 'echarts/lib/chart/pie'
  export default {
    mixins: [BasicActivity],
    name: "custom",
    components: {

    },
    data() {
      return {
        index: 0,
        showCalendar: false,
        cusActive: cusActive,
        custChange: custChange,
        custLevel: custLevel,
        custAmount: custAmount,
        titleMainStyle: "height:2.3vw;color: #4C4C4C;font-size:1.4vw;",
        demoEvents: [{
          date: '2017/06/15',
          title: '客户来访',
          desc: '马三炮要来望京支行来访，时间下午3点！'
        }, {
          date: '2017/06/12',
          title: '打电话给小马',
          desc: '今天要打电话给小马，电话13838383838'
        }],
        /*客户名单*/
        rankingList: [{
            name: '姜育恒',
            rank: '铂金客户',
            amount: '5,000.0',
            oprtype: '存入',
            time: '2017-06-20 14:32',
          },
          {
            name: '蒋雨航',
            rank: '铂金客户',
            amount: '4,000.0',
            oprtype: '转出',
            time: '2017-06-20 14:32',
          },
          {
            name: '姜宇航',
            rank: '铂金客户',
            amount: '3,000.0',
            oprtype: '取现',
            time: '2017-06-20 14:32',
          },
          {
            name: '蒋玉兰',
            rank: '铂金客户',
            amount: '2,800.0',
            oprtype: '存入',
            time: '2017-06-20 14:32',
          },
          {
            name: '张国滴',
            rank: '铂金客户',
            amount: '2,500.0',
            oprtype: '转入',
            time: '2017-06-20 14:32',
          },
          {
            name: '王铃铛',
            rank: '铂金客户',
            amount: '2,400.0',
            oprtype: '转出',
            time: '2017-06-20 14:32',
          },
          {
            name: '张绍堂',
            rank: '铂金客户',
            amount: '2,300.0',
            oprtype: '存入',
            time: '2017-06-20 14:32',
          },
          {
            name: '李平国',
            rank: '铂金客户',
            amount: '2,000.0',
            oprtype: '存入',
            time: '2017-06-20 14:32',
          },
          {
            name: '蒋玉兰',
            rank: '铂金客户',
            amount: '2,800.0',
            oprtype: '存入',
            time: '2017-06-20 14:32',
          },
          {
            name: '张国滴',
            rank: '铂金客户',
            amount: '2,500.0',
            oprtype: '转入',
            time: '2017-06-20 14:32',
          },
          {
            name: '王铃铛',
            rank: '铂金客户',
            amount: '2,400.0',
            oprtype: '转出',
            time: '2017-06-20 14:32',
          },
          {
            name: '张绍堂',
            rank: '铂金客户',
            amount: '2,300.0',
            oprtype: '存入',
            time: '2017-06-20 14:32',
          }
        ]
      }
    },
    computed: {
      leftOptions() {
        return {
          showBack: this.$route.path !== '/custcenter'
        }
      },
      rightOptions() {
        return {
          showMore: false
        }
      },
      title() {
        if (this.$route.path === '/') return 'login'
        return this.componentName ? `Demo/${this.componentName}` : '客户中心'
      }
    },
    methods: {
      ItemClickFunc(index) {
        if (index == 0) {
        }
        /*this.$router.push('/custom/customList/'+index);*/
        this.$activityManager.requestUpdateView(EventNames.CUSTOMLIST, index)
      },
      //绘制曲线图--cusActive
      drawActive() {
        let element = this.$refs.cusActiveSet;
        let myChart = this.$echarts.init(element);
        let option = this.cusActive;
        myChart.setOption(option);
      },
      //绘制曲线图--custChange
      drawChange() {
        let element = this.$refs.custChangeSet;
        let myChart = this.$echarts.init(element);
        let option = this.custChange;
        myChart.setOption(option);
      },
      //绘制曲线图--custLevel
      drawLevel() {
        let element = this.$refs.custLevelSet;
        let myChart = this.$echarts.init(element);
        let option = this.custLevel;
        myChart.setOption(option);
      },
      //绘制曲线图--custAmount
      drawAmount() {
        let element = this.$refs.custAmountSet;
        let myChart = this.$echarts.init(element);
        let option = this.custAmount;
        myChart.setOption(option);
      },
    },
    beforeMount() {
      this.$store.commit('showAsideMenu', false);
    },
    update() {

    },
    mounted() {
      this.drawActive(); //初始化活跃
      this.drawChange(); //初始化客户变动
      this.drawLevel(); //初始化等级分布
      this.drawAmount(); //初始化资产
      var _this = this;
      var submitdata = {};
      var PageCtrl = {};
      PageCtrl.currpage = 0;
      PageCtrl.pageflag = 4;
      PageCtrl.pagenum = 0;
      var body = {};
      body.PageCtrl = PageCtrl;
      submitdata.body = JSON.stringify(body);

      ajaxApi.groupQuery(submitdata,function(response){
        var result = response;
        _this.$store.commit('update_ownerCustomGroupList', result.Group);
      });
    },

  }

</script>

<style scoped lang="less">
  /*去掉边界线*/
  .cust-center{
    height:100%;
  }
  .container {
    overflow: hidden;
    height: calc(~"100% - "66px);
    font-size: 16px;
    .content-left {
      height: 100%;
      border-right: 1px solid #e5e5e5;
      .cl-top {
        padding: 0 10px;
        height: calc(~"100% - "550px);
        box-sizing: border-box;
        .cl-title{
          padding-top:23px;
          padding-left:8px;
          margin-bottom:-16px;
          font-size: 20px;
          color:#4C4C4C;
        }
      }
      .cl-normal {
        height: 260px;
        .set-chart{
          width:100%;
          height:200px;
        }
      }
      .set-title {
        border-bottom: 1px solid #f5f5f5;
        height: 46px;
        line-height: 25px;
        padding: 10px 15px;
        box-sizing: border-box;
      }
      .set-chart {
        width: 100%;
        height: 200px;
      }
    }
    .content-right {
      height: 100%;
      margin-left: -1px;
      .text-title {
        color: #4C4C4C;
        font-size: 18px;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #E6E6E6;
        margin: 0;
      }
      .text-body {
        height: calc(~'100% - '51px);
        width: 100%;
        overflow-y: scroll;
        .text-style{
          border-bottom:1px solid #E6E6E6;
          color: #666;
          font-size:14px;
        }
      }
    }
  }

  .main_border:before,
  .main_border:after,
  .aui-cells:before,
  .aui-cells:after {
    border: none !important;
    padding-top: 0;
    padding-bottom: 0;
  }

  hr {
    background: #F5F5F5;
    margin: 0;
    height: 15px;
  }

  .panelbox {
    border-radius: 2px;
    text-align: center;
    padding: 20px 15px;
    width: 160px;
    text-align: center;
  }

  .panelbox .panelbox_text {
    height: 40px;
    border: 1px solid red;
  }

  .panelbox img {
    width: 35px;
    height: 35px;
  }

  .panelbox span {
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #FFFFFF;
    line-height: 20px;
  }

  .flex-demo {
    height: 245px;
  }

  .text_name {
    padding: 11px 0 0 20px;
    margin: 0;
    font-size: 17px;
    color: #4C4C4C;
  }

  .text_rank {
    padding: 11px 20px 0 0;
  }

  .text_amount {
    padding: 0 0 11px 20px;
  }

  .text_time {
    padding: 0 10px 11px 0;
  }
  .enter-box{
    width: 100%;
    padding: 15px 0;
    .enter-div{
      width: 20%;
      display: inline-block;
      margin: 0 2%;
    }
  }
</style>
