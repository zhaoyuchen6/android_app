<template>
  <div class="monitoring">
    <masker :value="maskerFlag" style="border-radius: 2px;height:100%" color="#f5f5f5" :opacity="1" >
      <div style="height:100%">
        <!--客户类型-->
        <div class="wd_tab">
          <div class="tab_item" :class="{tab_active:tab_num===index}"  @click="changeIndex(index)" v-for="(typeitem,index) in custtypelist" :key="'table'+index">
            <span class="item_span">{{typeitem.dictname}}</span>
            <aui-badge v-show="typeitem.isShow"  class="set-badge" ></aui-badge>
            <div class="zz_sanjiao"></div>
          </div>
        </div>
        <!--各类型客户-->
        <swiper v-model="tab_num" class="set-swiper" :show-dots="false" :disabled="swipeDisabled" >
          <swiper-item class="set-swiper-item" v-for="(item,index) in queueList" :key="'table'+index">
            <div class="div_main">
              <div class="total">
                <span class="icon-queue-num total-icon"></span>
                <span class="total-text">排队人数共：{{item.queuenum}}人</span>
              </div>
              <div class="drag-panel" v-if="item.queuenum!==0">
                <drag-grid :draggable="canDrag" :sortable="true" :items="item.data" :cellWidth="272" :cellHeight="306"  :boxWidth="1140" :class="'grid'+index" @dragend="dragEnd">
                  <template slot="cell" slot-scope="props">
                    <monitor-box v-finger:long-tap="longTap" :item="props.item"  @showInfo="changeFlag" :class="{'is-drag':canDrag===true}"></monitor-box>
                  </template>
                </drag-grid>
              </div>
              <div v-if="item.queuenum===0" class="nobody-box">
                <div class="nobody-img" >
                  <img src="static/image/queue-monitoring/nobody.png" alt="">
                </div>
                <p class="nobody-title">暂无排队人数</p>
              </div>
            </div>
          </swiper-item>
        </swiper>
      </div>
      <!--客户信息弹窗-->
      <div v-transfer-dom>
        <aui-popup v-model="showCusInfo" position="right" width="100%">
          <custom-info @hideMasker="hideMasker()" :custid="custid"  ref="selectfood" ></custom-info>
        </aui-popup>
      </div>
    </masker>
    <aui-toast v-model="showErrMsg" :type="toasttype">{{errmsg}}</aui-toast>
  </div>
</template>


<script>
  import CustomInfo from "@/components/customInfo.vue"
  import MonitorBox from './monitor-box'
  import monitoringjs from '@/common/api/monitoring'
  import MyDialog from '@/components/my-dialog'
  import '@/common/js/jquery'
  import Masker from '@/components/masker'
  import {Swiper,SwiperItem} from '@/components/swiper'
  import DragGrid from '@/components/drag-grid'
  import XHeader from '@/components/x-header'
  const imgList = [
    '../../static/image/banner2.png',
    '../../static/image/banner1.png',
    '../../static/image/banner3.png'
  ];
  const demoList = imgList.map((one, index) => ({
    url: 'javascript:',
    img: one
  }));
  export default {
    name: 'monitoring',
    components: {
      CustomInfo,
      Masker,
      MyDialog,
      Swiper,
      SwiperItem,
      DragGrid,
      MonitorBox,
      XHeader
    },
    data () {
      return {
        list:[
          "a","b","c"
        ],
        showDemo:true,
        show:false, /*是否显示弹框*/
        selected : '',//指定选中按钮
        /*客户经理信息*/
        custmgrlist:'',
        custid:'',
        tab_num:0,
        maskerFlag:false,
        showCusInfo:false,
        custtypelist:'',
        custinfolist: [],
        blingNum2:true,
        monitoringInterval:"",
        classObject: {
          active: true,
          'text-danger': false
        },
        toasttype: 'warn',
        showErrMsg: false,
        errmsg: '',
        adjustoffset: 0 ,//调整值
        canDrag:false,  //是否可拖拽
      }
    },
    computed:{
      //是否禁用滑动组件
      swipeDisabled(){
        return this.canDrag;
      },
      //排队监控队列
      queueList:{
        get(){
          return this.$store.state.queueList;
        },
        set(val){
          return this.$store.commit('setQueueList',val);
        }
      }
    },
     watch:{ },
    deactivated(){
      //  销毁其他定时任务
//      console.log("销毁main定时器");
      clearInterval(this.setBadge);
      this.maskerFlag2 = false
    },
    filters: {
      custlevelFile: function (value) {
        let statusname='';
        if(value==1){
          statusname="普通客户";
        }else if(value==2){
          statusname="金卡客户";
        }else if(value==3){
          statusname="VIP客户";
        }
        return statusname;
      }
    },
    methods: {
      //查看客户信息
      changeFlag(custid){
        if(this.canDrag){
          return
        }
        this.showCusInfo = true;
        this.custid=custid;
        //        调用子组件的方法并传参
        this.$refs.selectfood.queryCustInfo(custid);
      },
      //隐藏客户信息弹窗
      hideMasker(){
        this.showCusInfo=false;
      },
      //点击改变swiper显示的内容
      changeIndex(index){
        if(this.swipeDisabled){
          return
        }
        this.tab_num=index;
      },
      //长按可拖拽
      longTap(){
        this.canDrag=true;
      },
      //拖拽结束
      dragEnd(event){
        this.canDrag=false;
      },
      // 从后台获取消息方法
      queryDatafromAFA(){
        let vm = this;
        let submintData = {},body={};
        let loginObject = JSON.parse(sessionStorage.getItem("loginObj"));
        // body.unitid = loginObject.branchNo;
        body.unitid = 4;
        body.dictitem = 'IDFS000315';
        submintData.body=JSON.stringify(body);
        /*查询所有客户类型*/
        monitoringjs.queryCustType(submintData,vm,function (rsp) {
          vm.custtypelist=rsp.DictInfo;
          /*查询所有排队信息*/
          monitoringjs.queryBranchQueue(submintData,vm,function (rsp) {
            vm.custinfolist=rsp.QueInfo;
            vm.remoldList(vm.custtypelist,rsp.QueInfo);  //队列重塑
            for(let j=0;j< vm.custtypelist.length;j++){
              vm.custtypelist[j].isShow=false;
              /*若排队人数为空或未定义时，显示为“0”*/
              if(vm.custtypelist[j].queuenum===""|| vm.custtypelist[j].queuenum === undefined) {
                vm.custtypelist[j].queuenum=0;
              }
              for(let i=0;i< vm.custinfolist.length;i++){
                let info=vm.custinfolist[i];
                /*若超时时间为空或未定义时，显示为“5”min*/
                if(info.timeout===undefined){
                  info.timeout=5;
                }
                let zDate=info.inqueuedate;
                let zTime=info.inqueuetime;
                let data=zDate+" "+zTime;
                let d1 = new Date();/*系统时间*/
                let d2 = new Date(Date.parse( data));/*客户入队时间*/
                let time= parseInt( (d1 - d2) / 60000 );/*等待时间*/
                info.time=time;
                info.latertime=time-parseInt(info.timeout);/*超时时间*/
                /*该客户类型下若有超时，则显示红点警告提醒*/
                if( vm.custtypelist[j].dictvalue=== info.custtype &&  info.latertime>0 ){
                  vm.custtypelist[j].isShow=true;
                }
              }
            }
          });
        });
      },
      //重塑排队队列
      remoldList(type,originlist){
        if(type.length===0||originlist.length===0){
          return
        }
        let newList=JSON.parse(JSON.stringify(type));
        for(var j=0,typeLen=type.length;j<typeLen;j++){
          newList[j].data=[];
          for(var i=0,len=originlist.length;i<len;i++){
            let item=originlist[i];
            if(item.custtype===type[j].dictvalue){
              newList[j].data.push(item);
            }
          }
        }
        this.queueList=newList;
      }
    },
    created(){
      this.queryDatafromAFA();
    },
    mounted(){
    },
    activated(){
      console.log("monitoring定时器");
      /*每分钟刷新一次*/
      this.monitoringInterval = setInterval(() => {
        this.queryDatafromAFA();
      }, 60000);
    },
    beforeDestroy(){
    },
    // keep-alive 停用时调用   关闭定时器
    deactivated(){
      //  销毁其他定时任务
      console.log("销毁monitoring定时器");
      clearInterval(this.monitoringInterval);
      this.show = false;
    }
  }
</script>
<style scoped lang="less">
  @import '../../../static/public-style/theme-blue.less';
  .monitoring{
    height: 700px;
  }
  .set-swiper{
    height:calc(~"100% - "111px);
    /deep/.vux-swiper{
      height:100% !important;
    }
    .set-swiper-item{
      height:100%;
      overflow-x: hidden;
      overflow-y: auto;
      z-index:100;
    }
  }
  .rightcontent{
    width: 93%;
    margin: 0 auto;
    padding-top:1.5%;
  }
  .lf{
    float: left;
  }
  .rt{
    float: right;
  }
  .wd_tab{
    width: 100%;
    height:40px;
    padding:5px 0;
    background-color: #E3E3E3;
    box-sizing: border-box;
    margin-bottom:16px;
  }
  .wd_tab .tab_item{
    width:185px;
    height:30px;
    line-height: 30px;
    text-align: center;
    float: left;
    border-right:1px solid #BDBBBD;
    position: relative;
  }
  .wd_tab .tab_item .item_span{
    width: 60%;
    float: left;
    margin-left: 20%;
    font-size:16px;
  }
  /*三角*/
  .zz_sanjiao{
    position: absolute;
    z-index: 0;
    bottom: -20px;
    left: 46%;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 16px solid #E3E3E3;
    display: none;
  }
  .tab_active .zz_sanjiao{
    display: block;
  }

  .right_row p{
    height: 40px;
    line-height: 64px;
    font-size: 18px;
    padding-left: 11%;
  }
  /*闪烁动画*/
  @-webkit-keyframes magentaPulse {
    from { background-color: #F5F4F1; -webkit-box-shadow: 0 0 9px #333; }
    50% { background-color: #a9014b; -webkit-box-shadow: 0 0 18px #a9014b; }
    to { background-color: #F5F4F1; -webkit-box-shadow: 0 0 9px #333; }
  }
  span.bling{-webkit-animation-iteration-count: infinite;}
  .magentaPulse.bling{-webkit-animation-name:magentaPulse;-webkit-animation-duration:3s;}
  /*tab*/
  .tab_active .item_span{
    color:@theme-color;
  }

  a {
    text-decoration: none;
    color:#4c4c4c;
  }
  .div_main{
    color:#4c4c4c;
    font-size:20px;
    font-family:SimHei;
    height:100%;
  }
  .main_border:before,.main_border:after{
    border: none !important;
  }
  .weui-grid{
    padding: 7px 20px !important;
  }
  .cust_num{
    background:#E1C287;
    height:50px;
    padding-top: 6px;
    text-align:center;
    font-size:26px;
    border-radius: 16px 16px 0 0;
    color: #fff;
  }
  .cust_level{
    text-align:left;
    height:80px;
    line-height: 80px;
    font-size:21px;
  }
  .button_cust{
    float:right;
    background:#FF991A;
    height:32px;
    width:864px;
    border-radius:5px;
  }
  /*10.9 wangzhe*/
  .circle{
    width:112px;
    height:112px;
    background-color: #F0F2F5;
    border-radius: 64px;
    position: absolute;
    top: 38px;
    left: 32%;
    color: #fff;
  }
  .circle p{
    text-align: center;
    font-size: 12px;
    color: red;
  }
  .circle p:nth-child(1){
    margin-top: 20px;
    color: #3cbfef;
  }
  .circle p:nth-child(2){
    color: #3cbfef;
    border-bottom: 1px solid #e2e3e3;
  }
  .circle p:nth-child(3) ,.circle p:nth-child(4){
    color: #acb7c7;
  }
  .cust_bottom{
    height: 48px;
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
  .cust_box{
    position: relative;border: 1px solid #F5F4F1;background-color: #fff;
  }
  .mon_body .mon_box:nth-child(1) .cust_num{
    background-color: #C3C3BA;
  }
  .mon_body .mon_box:nth-child(1) .cust_bottom{
    background-color: #C3C3BA;
  }
  .dialog_xtable th{
    padding:12px;
  }
  .bdcolor{
    background:#F5F4F1;
  }
  .vux-table td:after, .vux-table th:after{
    border-color: #B89E6C !important;
  }
  /*勾选按钮*/
  .radio_btn3{
    border: 1px solid #999;
    display: inline-block;
    width: 26px;
    height: 26px;
    border-radius: 26px;
    position: relative;
    vertical-align: middle;
  }
  .radio_btn3 input{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    opacity: 0;
  }
  .radio_btn3 span {
    width: 100%;
    height: 100%;
    display: inline-block;
    position: absolute;
    z-index: 1;
    top: 0px;
    left: 0px;
    border-radius: 50%;
    text-align: center;
    line-height: 26px;
    color: #ccc;
  }
  .weui-grids {
    position: relative;
    overflow: hidden;
    min-height: 656px;
  }
  .mon_box{
    width: 25%;
    display: inline-block;
    margin: 0 4% 32px 4%;
  }
  .mon_body{
    min-height: 656px;
  }
  .set-switch{
    float:right;
    /deep/.aui-switch:checked{
      border-color:#B89E6C;
      background-color:#B89E6C;
    }
  }
  .mon-body{
    width:100%;
    height:100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .set-grid{
    width:100%;
    height:100%!important;
    /deep/.v-grid-item-wrapper{
      height:270px!important;
      width:270px!important;
      padding:20px;
    }
  }
  .is-drag{
    transform-origin:50% 50%;
    animation-name: shake;
    animation-duration: 0.14s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  .mon-box{
    float:left;
    margin:20px;
  }
  .flip-list-move {
    transition: all 2s;
  }
  .set-font-size{
    font-size:20px;
  }
  .set-badge{
   vertical-align: top;
  }
  .total{
   padding:0 0 10px 20px;
   height:42px;
   box-sizing: border-box;
   color:@theme-color-font;
    .total-icon{
     vertical-align:middle;
     font-size:20px;
    }
    .total-text{
      font-size:16px;
    }
  }
  .drag-panel{
    padding:0 24px;
  }
  .nobody-box{
    padding-top:120px;
    .nobody-img{
      width:276px;
      height:200px;
      margin:0 auto;
      img{
        width:100%;
        height:100%;
      }
    }
    .nobody-title{
      color:#BBBBBB;
      text-align: center;
      padding-top:30px;
    }
  }

</style>
