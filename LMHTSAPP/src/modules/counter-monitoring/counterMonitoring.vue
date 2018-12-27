<template>
  <div class="counter-monitoring">
      <div slot="default">
        <div class="counterMain">

          <div   v-for="(item,index) in custinfolist"  :key="'table'+index"  class="mon_box" v-if="item.queuestatus=='4'">
              <aui-flexbox orient="vertical" :gutter="0"  class="cust_box" >
                <aui-flexbox-item  v-bind:class="[ 'cust_num',  { 'counterActive': item.servicestatus == 1 || item.servicestatus==2|| item.servicestatus==4} ]" >

                  <!--<div class="cus_state" v-show="item.servicestatus != 1">-->
                  <div class="cus_state">
                    <span>{{item.statusName}}</span>
              <i v-bind:class="[ 'state_circle',  { 'red': item.servicestatus == 1 || item.servicestatus == 3 },{'green':item.servicestatus == 4},{'yellow':item.servicestatus == 2} ]"></i>

                  </div>
                  <div class="cus_title">
                    <span class="icon-customer"></span>
                    <span>窗口1-{{index+1}}</span>
                  </div>
                </aui-flexbox-item>
                <aui-flexbox-item class="flex_item">
                  <div class="top_info">
                    <div class="circle_info">
                      <span>柜员：{{item.tellerid | tellerIdFilter(item.servicestatus)}}</span><br>
                      <span>姓名：{{item.tellername | tellerNameFilter(item.servicestatus)}}</span>
                    </div>
                    <div class="circle">
                      <img src="static/image/icon柜面人员剪影-2.svg" alt="" v-show="item.servicestatus == 3">
                      <img src="static/image/icon柜面人员-2.svg" alt="" v-show="item.servicestatus == 1|| item.servicestatus == 2|| item.servicestatus == 4">
                    </div>
                  </div>
                  <div class="cust_name">
                    <p class="cust_name_info ">当前客户：{{item.custno | custnoFile(item.servicestatus)}}</p>
                    <p class="cust_name_info">客户等级：{{item.custlevel | custlevelFile(item.servicestatus)}}</p>
                  </div>
                  <div class="cust_bottom">
                    <p class="cust_time">{{item.waitTime}}</p>
                    <aui-button v-bind:class="[{ 'activeBtn': item.servicestatus == 1 ||item.servicestatus == 4 },'cust_btn' ]" :disabled="item.servicestatus == 2 ||item.servicestatus == 3" @click="orderClick(item.counterid,item.servicestatus)">指定叫号</aui-button>
                  </div>
                </aui-flexbox-item>
              </aui-flexbox>

          </div>

        </div>

      </div>
     <div v-transfer-dom>
      <aui-popup v-model="popupFlag" class="set-popup" position="bottom" height="50%" >
         <p class="title">排队号</p>
         <aui-group  class="input-box">
           <aui-input  placeholder="输入排队号" :max=10 :show-clear=true ></aui-input>
         </aui-group>
        <div class="btn-group">
          <aui-button  @click="goback" class="btn-gray" text="返回" ></aui-button>
          <aui-button    @click="goback"  class="btn-orange" text="确认"></aui-button>
        </div>
      </aui-popup>
    </div>

    <aui-toast v-model="showErrMsg" :type="toasttype">{{errmsg}}</aui-toast>
  </div>


</template>

<script>

  import counterQuery from '@/common/api/monitoring'
  import getDictJson from '@/common/js/dictTran'
  import BasicActivity from "@/mixins/basic-activity";

  const imgList = [
    '/static/image/banner2.png',
    '/static/image/banner1.png',
    '/static/image/banner3.png'
  ];
  const demoList = imgList.map((one, index) => ({
    url: 'javascript:',
    img: one
  }));
  export default {
    name: 'counter-monitoring',
    components: {
    },
    mixins: [BasicActivity],
    data () {
      return {
        show:false, /*是否显示弹框*/
        picked : '',//指定选中按钮
        counterid : '',//柜台id
        /*客户经理信息*/
        custmgrlist:'',
        custid:'',
        tab_num:0,
        popupFlag:false,
        maskerFlag:false,
        /*柜台服务状态*/
        counterStatus:'',
        /*客户信息*/
        custinfolist:'',
//        custinfolist:
//          [{"servicestatus":"0","queueno":"2206","inqueuetime":"2017-08-04 13:34:20","timeout":"2","custlevel":"VIP","custname":"张三"},
//          {"servicestatus":"1","queueno":"2207","inqueuetime":"2017-08-04 14:09:20","timeout":"2","custlevel":"VVIP","custname":"小六"},
//          {"servicestatus":"0","queueno":"2208","inqueuetime":"2017-08-04 14:09:20","timeout":"2","custlevel":"五颗星","custname":"欧阳莉莉"},
//          {"servicestatus":"0","queueno":"2209","inqueuetime":"2017-08-04 14:09:20","timeout":"3","custlevel":"VIP","custname":"王源"},
//          {"servicestatus":"0","queueno":"2210","inqueuetime":"2017-08-04 14:09:20","timeout":"2","custlevel":"五颗星","custname":"闫童"},
//          {"servicestatus":"1","queueno":"2211","inqueuetime":"2017-08-04 14:09:20","timeout":"3","custlevel":"VIP","custname":"李苗"},
//          {"servicestatus":"0","queueno":"2212","inqueuetime":"2017-08-04 14:09:20","timeout":"2","custlevel":"VIP","custname":"许三多"},
//          {"servicestatus":"0","queueno":"2207","inqueuetime":"2017-08-04 14:09:20","timeout":"5","custlevel":"VVIP","custname":"郑茜"},
//        ],
        swiperHeight:(window.screen.availHeight  - 16.8 ) + 'px',
//        swiperHeightStyle: 'height: ' + (window.screen.availHeight - 16.8) + 'rem; overflow-y: auto; overflow-x: hidden;',
        blingNum2:true,
        monitoringInterval:"",
        classObject: {
          active: true,
          'text-danger': false
        },
        toasttype: 'warn',
        showErrMsg: false,
        errmsg: '',
      }
    },
    beforeDestroy(){

    },
    deactivated(){
      //  销毁其他定时任务
//      console.log("销毁main定时器");
      clearInterval(this.setBadge);
      this.maskerFlag2 = false
    },
    filters: {
      custlevelFile: function (value,val) {
        let statusname='';
        if(val=='1'||val=='2'){
          if(value==1){
            statusname="普通客户";
          }else if(value==2){
            statusname="金卡客户";
          }else if(value==3){
            statusname="VIP客户";
          }
      }else{
          statusname="暂无";
        }
        return statusname;
      },
      custnoFile : function (value,val) {
        let statusname='';
        if(val=='1'||val=='2'){

          if(value != undefined){
            statusname = value;
          }
          }else{
            statusname = "暂无";
        }

        return statusname;
      },

      tellerIdFilter : function(value,val){

        let tellerid = '';
        if(val!='3'){
          tellerid = value;
        }else{
          tellerid = '暂无';
        }
        return tellerid;
      },

      tellerNameFilter : function(value,val){
        let tellername = '';
        if(val!=='3'){
          tellername = value;
        }else{
          tellername = '暂无';
        }
        return tellername;
      }
    },
    methods: {

      goback(){
        this.popupFlag=false;
      },
      hideMasker(){
        this.maskerFlag=false;
      },
      // 从后台获取消息方法
      queryDatafromAFA(){
        this.counterStatus = getDictJson.getDictJson("IDFS000321");
        let vm = this;
        let submintData = {},tmp={};
        tmp.unit_id = '4';
        submintData.body=JSON.stringify(tmp);
          /*查询柜台服务状态*/
        counterQuery.counterQuery(submintData,vm,function (rsp) {
          // debugger
            vm.custinfolist=rsp.counterList;
            for(let i=0;i<vm.custinfolist.length;i++){
                let item = vm.custinfolist[i];
                for(let j=0;vm.counterStatus.length;j++){

                    let type = vm.counterStatus[j];
                    if(item.servicestatus == type.key){
                      item.statusName = type.value;
                      break;
                    }
                }
                //修改已办理业务时间
                if(item.servicestatus =='1' || item.servicestatus =='2'){
                  let myDate = new Date();
                  let zTime=item.inqueuetime;
                  let zData=myDate.toLocaleDateString();
                  let inqueueTime = zData + ' ' + zTime;
                  let d1 = parseInt(Date.parse( myDate));/*系统时间*/
                  let d2 = new Date(Date.parse( inqueueTime));/*客户入队时间*/
                  let waitTime= parseInt( (d1 - d2) / 60000 );/*等待时间*/
                  item.waitTime='业务已办理:'+waitTime+'分钟';
                }else{
                  item.waitTime='暂无此窗口详细数据';
                }


            }
          });
      },
      //打开转发弹窗
      orderClick (counterid, servicestatus) {
        let verifyFlag = true;
        this.popupFlag=true;
        if(servicestatus == 1){
          verifyFlag = false;
        }else{
          verifyFlag = true;
        }
        if (!verifyFlag) {
          this.show = true;
          this.counterid = counterid;
          //查询网点柜台信息
          let vm = this,submitData = {};
          let lojinObject = JSON.parse(sessionStorage.getItem("loginObj"));
//          submitData.unitid = lojinObject.deptId;
          submitData.unitid = '4';
          counterQuery.queryBranchQueue(submitData, function (rsp) {
            console.log(rsp);
            let reutrnData = rsp.data.resultMap.data.Body;
            vm.custmgrlist = reutrnData.QueInfo;
            $(".bg_checked3").css("background","#fff");
            vm.selected = '';
          });
        }
      },

    },
    created(){
      this.queryDatafromAFA();
    },
    activated(){
      console.log("monitoring定时器");
      /*每分钟刷新一次*/
      this.monitoringInterval = setInterval(() => {
        this.queryDatafromAFA();
      }, 60000);
    },
    // keep-alive 停用时调用   关闭定时器
    deactivated(){
      //  销毁其他定时任务
      console.log("销毁monitoring定时器");
      clearInterval(this.monitoringInterval);
    },
    activated(){
      this.show = false;
    },
    detailHide(){
      this.show=false;
    },
    deactivated(){
      this.show = false;
    },

  }
</script>
<style lang="less" scoped>
  @import '../../../static/public-style/theme-blue.less';
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
  .wd_row{
    width: 100%;
    height: 34.44px;
    background-color: #ffffff;
  }
  .wd_tab{
    width: 100%;
    height: 63.2px;
    background-color: #F5F4F1;
  }
  .wd_tab .tab_item{
    width: 16.59%;
    height: 37.92px;
    line-height: 37.92px;
    text-align: center;
    float: left;
    border-right:1px solid #BDBBBD;
    position: relative;
  }
  .wd_tab .tab_item .item_span{
    width: 60%;
    height: 37.92px;
    float: left;
    margin-left: 20%;
  }
  .item_span{
    width: 60%;
    height: 37.92px;
    float: left;
    margin-left: 20%;
  }
  .right_row p{
    height: 27.5px;
    line-height: 63.2px;
    font-size: 17.38px;
    padding-left: 11%;
  }
  /*闪烁动画*/
  @-webkit-keyframes magentaPulse {
    from { background-color: #F5F4F1; -webkit-box-shadow: 0 0 11.06px #333; }
    50% { background-color: #a9014b; -webkit-box-shadow: 0 0 22.12px #a9014b; }
    to { background-color: #F5F4F1; -webkit-box-shadow: 0 0 11.06px #333; }
  }
  span.bling{-webkit-animation-iteration-count: infinite;}
  .magentaPulse.bling{-webkit-animation-name:magentaPulse;-webkit-animation-duration:3s;}
  /*tab*/
  .tab_active .item_span{
    background-color: #E1C287;
    color: #ffffff;
  }

  a {
    text-decoration: none;
    color:#4c4c4c;
  }
  .div_main{
    color:#4c4c4c;
    font-size:16px;
    font-family:SimHei;
    /*padding-top:2%;*/
    background-color: #F5F4F1;
  }
  .main_border:before,.main_border:after{
    border: none !important;
  }
  .weui-grid{
    padding: 7px 24.64px !important;
  }
  .cust_num{
    background:#C3C3BA;
    height: 36.34px;
    padding-top: 5px;
    text-align:center;
    font-size:24.64px;
    border-radius: 10% 10% 0 0;
    color: #fff;
  }
  .cust_level{
    text-align:left;
    height:98.75px;
    line-height: 98.75px;
    font-size:21px;
  }
  .button_cust{
    float:right;
    background:#FF991A;
    height:31.6px;
    width:63.2px;
    border-radius:5px;
  }
  /*10.9 wangzhe*/
  .circle_info{
    width: 35%;
    float: left;
    height: 63.2px;
    margin-left:15px;
    line-height: 31.6px;
    padding-top: 6.8px;
    text-align: left;
    font-size: 15.8px;

  }
  .circle{
    width: 94.8px;
    height: 94.8px;
    background-color: #00b7ee;
    color: #fff;
    float: left;
    overflow: hidden;
    border-radius:70px;
  }
  .circle img{
    margin-top: 27%;
    margin-left: 8%;
    width: 85%;
  }



  .cust_logo img{
    width: 31.6px;
    vertical-align: middle;
    float: right;
    margin-right: 3%;
  }
  .cust_box{
    margin-left:9px;
    background-color: #fff;
  }

  .bdcolor{
    background:#F5F4F1;
  }
  .vux-table td:after, .vux-table th:after{
    border-color: #B89E6C !important;
  }
  /*勾选按钮*/
  /*.radio_btn3{*/
    /*border: 1px solid #999;*/
    /*display: inline-block;*/
    /*width: 1.594.8px;*/
    /*height: 1.594.8px;*/
    /*border-radius: 1.594.8px;*/
    /*position: relative;*/
    /*vertical-align: middle;*/
  /*}*/
  /*.radio_btn3 input{*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 0;*/
    /*z-index: 100;*/
    /*opacity: 0;*/
  /*}*/
  /*.radio_btn3 span {*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*display: inline-block;*/
    /*position: absolute;*/
    /*z-index: 1;*/
    /*top: 0px;*/
    /*left: 0px;*/
    /*border-radius: 50%;*/
    /*text-align: center;*/
    /*line-height: 1.594.8px;*/
    /*color: #ccc;*/
  /*}*/
  .cus_title{
    width: 45%;
    float: right;
    height: 36.34px;
    line-height: 30.8px;
    font-size: 17.5px;
  }
  .cus_title img{
    width: 13%;
    vertical-align: middle;
    display: inline-block;
  }
  .cus_title span{
    vertical-align: middle;
  }
  .cus_state{
    width: 32%;
    float: right;
    height: 36.34px;
    font-size: 17.5px;
    line-height: 28.44px;
    .red{
    background-color: red;
    }
    .green{
      background-color:greenyellow;
    }
    .yellow{
      background-color:yellow;
    }


  }
  .state_circle{
    width: 18.96px;
    height: 18.96px;
    text-align: center;
    display: inline-block;
    line-height: 18.96px;
    border-radius: 8px;
    vertical-align: middle;
    background-color: #DCDCDC;
  }

  .counter-monitoring{
    font-family:SimHei;
    font-size:22.12px;
    width: 100%;
    height: 531.6px;
    margin: 0 auto;
  }
  .counterMain{
    height: 774.2px;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #F5F4F1;
  }
  .counterActive{
    background-color: @theme-color-bg;
    color:@title-color-font;
  }
  .bdcolor{
    background:#F5F4F1;
  }
  .vux-table td:after, .vux-table th:after{
    border-color: #B89E6C !important;
  }

  .mon_box{
    display: inline-block;
    width: 26%;
    margin:29.8px 1.5% 0 35px;

    padding-right: 30px;

  }
  .flex_item{
    padding-top: 15.8px;
    border: 1px solid #C3C3BA;
    border-top: none;
    text-decoration: none;
    height:256px;

  }
  .top_info{
    height:40%;
  }
 .cust_name{
    height: 20%;

    border-top: 2px solid #F6F5F3;
    border-bottom: 2px solid #F6F5F3;
    line-height: 35.44px;
    font-size: 16.9px;
    .cust_name_info{
      margin-top:-6px;
       text-align: left;
       padding-left:25%;

    }
  }
  .cust_bottom{
    width: 100%;
    height: 40%;
    padding-top: 31.6px;
    font-size:16.8px;
  }
  .cust_bottom .cust_time{
    width: 80%;
    margin: 0 auto;
    margin-top:-25px;
    background-color: #f5f4f1;
    text-align: center;
    line-height: 31.6px;
  }
    .cust_btn{
    width: 70%;
    height: 37.92px;
    text-align: center;
    font-size: 20.54px;
    color: #C3C3BA;
    border: 1px solid #F5F4F1;
    border-radius: 11%;
    margin: 0 auto;
    line-height: 37.92px;
    margin-top: 9.8px;
  }
  .activeBtn{
    color: @theme-color;
    border: 1px solid @theme-color;
  }
  .set-popup{
    width:60%;
    left:20%;
    top:25%;
    text-align: center;
    overflow: hidden;
    .title{
      padding:20px 10px;
      font-size:18px;
    }
    .input-box{
      width:80%;
      margin:0 auto;
    }
    .btn-group{
      display: flex;
      justify-content: space-between;
      width:60%;
      margin:60px auto 0;
      button{
        width:230px;
        height:42px;
        &:nth-child(1){
          margin-right:40px;
        }
        &:nth-child(2){
          margin-top:0;
        }
      }
    }
  }
</style>
