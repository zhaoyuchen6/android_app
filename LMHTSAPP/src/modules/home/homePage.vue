<template>
  <div class="home slide-right">
    <aui-flexbox :gutter="0" class="content-top set-bg-color" align="stretch">
      <aui-flexbox-item :span="7/10" class="border-right set-height">
        <!--当天业务流量曲线图-->
        <!--<chart class="set-chart" :options="line"></chart>-->
        <div ref="trafficFlow" class="set-chart"></div>
      </aui-flexbox-item>
      <aui-flexbox-item :span="3/10">
        <aui-tab class="visit-title" :active-color="selectedColor" v-model="visitIndex">
          <aui-tab-item class="border-right set-bg" @item-click="tabVisit">重要客户来访</aui-tab-item>
          <aui-tab-item class="set-bg" @item-click="tabVisit">预约到访</aui-tab-item>
        </aui-tab>
        <aui-swiper :show-dots="false" v-model="visitIndex" class="set-swiper">
          <aui-swiper-item>
            <visit-info :info="item" v-for="(item,index) in importantList" :key="index" @showDetail="changeFlag" v-if="index<5"></visit-info>
          </aui-swiper-item>
          <aui-swiper-item>
            <visit-info :info="item" v-for="(item,index) in timeList" :key="index" @showDetail="changeFlag" v-if="index<5"></visit-info>
          </aui-swiper-item>
        </aui-swiper>
      </aui-flexbox-item>
    </aui-flexbox>
    <aui-flexbox class="content-middle" align="stretch" :gutter="10">
      <aui-flexbox-item :span="13/20" class="box set-bg-color">
        <div class="title">
          <span>提醒事项</span>
          <aui-badge :value="remindList.length" class="set-badge"></aui-badge>
          <div class="more" @click="goCalendar">更多 ></div>
        </div>
        <div>
          <p v-for="(item,index) in remindList">{{index+1+"、"+item}}</p>
        </div>
      </aui-flexbox-item>
      <aui-flexbox-item :span="7/20" class="box set-bg-color">
        <p class="title">设备状态</p>
        <aui-flexbox>
          <aui-flexbox-item>
            <div class="set-device">
              <span class="icon-self-help icon-class"></span>
            </div>
            <p class="device-info">自助机：3/5</p>
          </aui-flexbox-item>
           <aui-flexbox-item>
             <div class="set-device">
               <span class="icon-ipad icon-class"></span>
             </div>
             <p class="device-info">手持：2/3</p>
           </aui-flexbox-item>
        </aui-flexbox>
      </aui-flexbox-item>
    </aui-flexbox>
    <aui-flexbox class="content-bottom set-bg-color" align="stretch" :gutter="0">
      <aui-flexbox-item :span="3/10" class="border-right box set-height">
        <!--业务类型数据展示-->
        <div class="title">
          业务类型数据展示
          <span class="icon-zoom-in set-zoom-in" @click="showMore"></span>
        </div>
        <div ref="busiType" class="set-chart"></div>
      </aui-flexbox-item>
      <aui-flexbox-item :span="7/20" class="border-right box">
        <p class="title">客户满意度信息展示（当日）</p>
        <aui-flexbox class="satisfied-box" :gutter="0">
          <aui-flexbox-item v-for="(item,index) in satisfiedList" :key="index" @click.native="satisfy(index)">
            <div class="set-icon">
              <span :class="'icon-'+item.icon"></span>
            </div>
            <p class="text">{{item.text}}</p>
            <p class="data">{{item.data}}</p>
          </aui-flexbox-item>
        </aui-flexbox>
      </aui-flexbox-item>
      <aui-flexbox-item :span="7/20" class="box">
        <p class="title">通知（公告）</p>
        <div class="notice">
          <p v-for="(item,index) in notice" class="notice-item">
            <span class="point-class"></span>{{item}}
          </p>
        </div>
        <p class="more">更多</p>
      </aui-flexbox-item>
    </aui-flexbox>
    <!--弹窗部分-->
    <!--业务类型图表-->
    <div aui-transfer-dom>
      <aui-popup v-model="showCharts" position="right" style="width:100%;height:100%;">
       <business-type @goHome="close"></business-type>
      </aui-popup>
    </div>
    <!--满意度-->
    <div aui-transfer-dom>
      <aui-popup v-model="satisfied" position="right" style="width:50%;height:100%;">
        <satisfied-detail @close="closeDetail"></satisfied-detail>
      </aui-popup>
    </div>
    <!--客户信息弹窗-->
    <div v-transfer-dom>
      <aui-popup v-model="showCusInfo" position="right" width="100%">
        <custom-info @hideMasker="hideMasker" :custid="custid"  ref="selectfood" ></custom-info>
      </aui-popup>
    </div>
  </div>
</template>

<script>
  import EventNames from "@/common/activity-manager/activity-event-names"; //路由事件名称
  import { PageManager } from "ab-manager-page"; //页面管理
  import { TradeFlowManager } from "ab-manager-trade-flow"; //流程管理
  import {line,pie} from "./home-data"  //引入图表数据
  import themeColor from "@/../static/public-style/themeColor";  //引入主题颜色js文件
  import visitInfo from "@/components/visitInfo"  //引入预约信息展示组件
  import satisfiedDetail from "./satisfiedDetail"  //引入满意度详情页面
  import businessType from "./businessType"  //引入业务类型图表
  import fullCalendar from "@/common/api/addCalender";  //引入预约查询api
  import monitoringjs from '@/common/api/monitoring' //引入排队查询api
  import CustomInfo from "@/components/customInfo" //引入客户详细信息组件
  import BasicActivity from "@/mixins/basic-activity";
  export default {
    name:"home-page",
    components:{
      visitInfo,
      satisfiedDetail,
      businessType,
      CustomInfo,
    },
    mixins: [BasicActivity],
    data() {
      return {
        line:line,
        pie:pie(themeColor.homeBgColor),
        visitIndex:0,
        selectedColor:themeColor.themeColorFont,
        showCharts:false,  //查看更详细的图表
        showCusInfo:false,//查看客户信息
        custid:'',      //客户id
        custtypelist:[],
        //预约客户列表（按时间排序）
        customerList:[
          {level:0,name:'张嘉佳',time:"12:30"},
          {level:4,name:'王总',time:"15:30"},
          {level:1,name:'孙俪',time:"15:30"},
          {level:3,name:'黄总',time:"16:05"},
          {level:2,name:'赵四',time:"16:30"}
        ],
        //来访客户列表
        queueList:[],
        remindList:[],
        //客户满意度
        satisfiedList:[
          {text:"满意",icon:"satisfied",data:"99%"},
          {text:"一般",icon:"commonly",data:"0%"},
          {text:"不满意",icon:"dissatisfied",data:"1%"}
        ],
        satisfied:false,
        //通知
        notice:[
          "关于4月25日凌晨我行信用卡系统升级维护的公告",
          "关于客户系统群升级的公告",
          "关于2018年底前人民银行支付清算系统停运的公告",
          "关于4月25日凌晨我行信用卡系统升级维护的公告",
          "关于客户系统群升级的公告",
          "关于2018年底前人民银行支付清算系统停运的公告"
        ],
      }
    },
    computed:{
      //预约客户按等级排序
      importantList:function(){
        let val=this.queueList;
        let list=[];
        for(var i=0,len=val.length;i<len;i++){
          if(val[i].custlevel>1){
            list.push(val[i]);
          }
        }
        list.sort(this.sortLevel);
        return list;
      },
      //来访客户按时间排序
      timeList:function(){
        let val=this.queueList;
        let list=[];
        for(var i=0,len=val.length;i<len;i++){
            list.push(val[i]);
        }
        list.sort(this.sortTime);
        return list;
      }
    },
    methods:{
      //绘制曲线图
      drawLine(){
        let element=this.$refs.trafficFlow;
        let myChart=this.$echarts.init(element);
        let option=this.line;
        myChart.setOption(option);
      },
      //绘制饼图
      drawPie(){
        let element=this.$refs.busiType;
        let myChart=this.$echarts.init(element);
        let option=this.pie;
        myChart.setOption(option);
      },
      //点击切换来访分类
      tabVisit(index){
        this.visitIndex=index;
      },
      //按等级排序
      sortLevel(itemA,itemB){
        if(itemA.custlevel===itemB.custlevel){
          return  itemA.inqueuetime<itemB.inqueuetime?-1:1;
        }else{
          return itemB.custlevel-itemA.custlevel;
        }
      },
      sortTime(itemA,itemB){
       return  itemA.inqueuetime<itemB.inqueuetime?-1:1;
      },
      //跳到客户预约
      goCalendar(){
        let item={name:'COMPREHENSIVECONTRACT'};
        this.$parent.$parent.toJump(item,7);
      },
      //获取预约信息
      queryCalendar() {
        let submintData = {},
            vm = this,
            body = {};
        let list = [];
        submintData.body = JSON.stringify(body);
        fullCalendar.queryCalendar(
          submintData,
          vm,
          rsp => {
            let result = rsp.bookingList;
            let list=[];
            let msg="";
            for (let i = 0,len=result.length; i < len; i++) {
              let time=result[i].endtime.split(" ")[0];
              if(time==="2018-05-24"){
                msg=vm.dateFormat(time)+"，"+result[i].custname+"客户"+result[i].title;
                list.push(msg);
              }
            }
            vm.remindList=list;
          },
          err => {
            console.log(err);
          }
        );
      },
      //日期格式转换
      dateFormat(date){
        let time=date.split("-");
        let mon=this.format(time[1])+"月";
        let day=this.format(time[2])+"日";
        return mon+day;
      },
      format(str){
        let newStr=str.split("");
        let result="";
        result=newStr[0]==="0"?newStr[1]:str;
        return result;
      },
      //查看更多图表
      showMore(){
         this.showCharts=true;
      },
      //关闭业务类型数据图表
      close(){
        this.showCharts=false;
      },
      //客户满意度表格
      satisfy(index){
        this.satisfied=true;
      },
      //关闭客户满意度表格
      closeDetail(){
        this.satisfied=false;
      },
      //获取排队信息
      queryDatafromAFA(){
        let vm = this;
        let submintData = {},body={};
        let result=[];
        let loginObject = JSON.parse(sessionStorage.getItem("loginObj"));
        // body.unitid = loginObject.branchNo;
        body.unitid = 4;
        body.dictitem = 'IDFS000315';
        submintData.body=JSON.stringify(body);
        /*查询所有排队信息*/
        monitoringjs.queryBranchQueue(submintData,vm,function (rsp) {
          let list=rsp.QueInfo;
          for(var i=0,len=list.length;i<len;i++){
            if(list[i].custtype==="3"){
              result.push(list[i]);
            }
          }
          vm.queueList=result;
        });
      },
      //查看客户信息
      changeFlag(custid){
        this.showCusInfo = true;
        this.custid=custid;
        //        调用子组件的方法并传参
        this.$refs.selectfood.queryCustInfo(custid);
      },
      //隐藏客户信息弹窗
      hideMasker(){
        this.showCusInfo=false;
      },
    },
    mounted(){
      this.drawLine();//初始化业务流量曲线图
      this.drawPie(); //初始化业务类型数据展示
      this.queryCalendar(); //获取预约信息
      this.queryDatafromAFA();//获取排队信息
    }
  };
</script>
<style scoped lang="less">
  @import '../../../static/public-style/theme-blue.less';
  .slide-right{
    animation:slideInRight 0.5s ease 0s  1 normal;
  }
  @keyframes slideInRight {
    from {
      transform: translate3d(100%, 0, 0);
      visibility: visible;
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  .home{
    padding:10px;
    padding-top:24px;
    width:100%;
    height:100%;
    box-sizing: border-box;
    font-size:16px;
    font-family:simHei;
    .set-bg-color{
      background-color:@home-bg-color;
    }
    &>div{
      margin-bottom:10px;
      .border-right{
        border-right:1px solid @home-color-border!important;
      }
    }
  }
  .box{
    width:100%;
    padding:10px 20px;
    box-sizing: border-box;
  }
  .set-height{
    height:100%;
    box-sizing: border-box;
  }
  .title{
    height:40px;
    line-height:40px;
    box-sizing: border-box;
  }
  .more{
    float:right;
    width:60px;
    text-align: center;
  }
  .point-class{
    display:inline-block;
    width:12px;
    height:12px;
    border-radius:100%;
    background: radial-gradient(circle farthest-side at 0px 0px,@point-color-inside,@point-color-outside);
    margin-right:10px;
  }
  .content-top{
    height:300px;
    .visit-title{
      .title;
      border-bottom:1px solid #EAEAEA;
    }
  }
  .content-middle{
    height:130px;
    width:calc(~"100% - "10px);
    .set-device{
      height:56px;
      text-align: center;
      margin-top:-5px;
      .icon-class{
       font-size:50px;
        color:@home-color-device;
      }
    }
    .device-info{
      text-align: center;
    }
  }
  .content-bottom{
    height:270px;
  }
  .set-chart{
    width:100%;
    height:calc(~"100% - "40px);
  }
  .set-bg{
    background-color: @home-bg-color;
  }
  .set-swiper{
    height:255px;
    /deep/.aui-swiper{
      height:100%!important;
      overflow-y: auto;
    }
  }
  .set-badge{
    background-color: #154399;
    position: relative;
    bottom:5px;
  }
  /*.set-calendar{
    float:right;
    width:26px;
    height:26px;
    position: relative;
    top:4px;
    right:5px;
    img{
      width:100%;
      height:100%;
    }
  }*/
  .notice{
    height:180px;
    overflow: hidden;
  }
  .notice-item{
    width:100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding:2px;
    vertical-align: middle;
  }
  .satisfied-box{
    padding-top:40px;
    text-align: center;
    .set-icon{
      height:46px;
      line-height:46px;
      font-size:46px;
      text-align: center;
      color: @home-color-satisfied;
    }
    .text{
      padding:10px 0;
    }
    .data{
      color:#16A481;
    }
  }
  .set-zoom-in{
    font-size:20px;
    color:@theme-color-font;
    float:right;
    margin-top:10px;
  }
</style>
