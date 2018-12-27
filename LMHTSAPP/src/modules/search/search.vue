<template>
  <div class="search-container">
    <div class="search-left">
      <div class="left-header">信息列表</div>
      <div class="search-box" @click="openQuerySlide()">
        <span class="search-text">{{searchData.searchType | warnType}}&nbsp;&nbsp;{{searchData.calenderVal}}</span>
        <img src="static/image/search/icon-search.svg" alt="" class="icon-search">
      </div>
      <div class="data-box">
        <mt-loadmore :bottom-method="loadBottom" :auto-fill="false" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" @top-status-change="handleTopChange"
        :top-method="loadTop" ref="loadmore">
          <!--<div :style="{ height: wrapperHeight + 'px' }">-->
          <div :class="[{ 'row-active': activeNum===index},'data-row' ]" v-for="(item,index) in dataInfoList" :key="index" @click="lookRow(index,item);sildeShow =!sildeShow;">
            <div class="row-left">
              <p class="one-row">
                <span class="set-img">
                  <img src="static/image/search/no-letter.svg" v-if="item.status == 1" alt="">
                  <img src="static/image/search/true-letter.svg" v-else alt="">
                </span>

                <span>{{item.messagecontent}}</span>
              </p>
              <p class="two-row"> {{item.messagedate}}  {{item.messagetime}} </p>
            </div>
            <div class="row-right">
              <span class="fa fa-angle-right"></span>
            </div>
          </div>
          <!--加载显示设置-->
          <div slot="top" class="mint-loadmore-top">
            <div v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">
              <span>↓</span>
            </div>
            <div v-show="topStatus === 'pull'">
              <span>下拉刷新</span>
            </div>
            <div v-show="topStatus === 'drop'">
              <span>释放更新</span>
            </div>
            <div v-show="topStatus === 'loading'">
              <mt-spinner type="snake"></mt-spinner>
            </div>
          </div>
          <div slot="bottom" class="mint-loadmore-bottom">
            <div v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">
              <span>↑</span>
            </div>
            <div v-show="bottomStatus === 'pull'">
              <span>上拉加载更多</span>
            </div>
            <div v-show="bottomStatus === 'drop'">
              <span>释放加载更多</span>
            </div>
            <div v-show="bottomStatus === 'loading'">
              <mt-spinner type="snake"></mt-spinner>
            </div>
          </div>
          <div style="text-align: center;padding-top:0.78vw; color: #999; font-size: 1.4vw" v-if="allLoaded===true">加载完毕</div>
        </mt-loadmore>

      </div>
    </div>
    <div class="search-right" v-if="!showAuthor">
      <div class="letter-box" >
        <div class="right-img">
          <img src="static/image/search/book-bg.png">
        </div>


        <div class="letter-main">
          <p class="letter-title">{{rightInfo.messagetype | warnType}}</p>
          <transition v-on:before-enter="beforeEnter"
                      v-on:enter="enter"
                      v-bind:css="false">
            <div v-if="sildeShow">
          <p class="main-row">
            <span class="main-label">消息内容:</span>
            <span class="main-text">{{rightInfo.messagecontent}}</span>
          </p>
          <p class="main-row">
            <span class="main-label">时间:</span>
            <span class="main-text">{{rightInfo.messagedate}}&nbsp;&nbsp;{{rightInfo.messagetime}}</span>
          </p>
          <p class="main-row">
            <span class="main-label">处理状态:</span>
            <span class="main-text">{{rightInfo.status | statusFn}}</span>
          </p>
            </div>
          </transition>
          <transition v-on:before-enter="beforeEnter"
                      v-on:enter="enter"
                      v-bind:css="false">
            <div v-if="!sildeShow">
              <p class="main-row">
                <span class="main-label">消息内容:</span>
                <span class="main-text">{{rightInfo.messagecontent}}</span>
              </p>
              <p class="main-row">
                <span class="main-label">时间:</span>
                <span class="main-text">{{rightInfo.messagedate}}&nbsp;&nbsp;{{rightInfo.messagetime}}</span>
              </p>
              <p class="main-row">
                <span class="main-label">处理状态:</span>
                <span class="main-text">{{rightInfo.status | statusFn}}</span>
              </p>
            </div>
          </transition>



          <div class="all-btn-box">
            <aui-button class="theme-background-color sure-btn-style" v-if="rightInfo.messagetype == '1' && rightInfo.status != '4'"  @click.native="showPlugin()">转发</aui-button>
            <aui-button class="theme-background-color sure-btn-style" v-if="rightInfo.messagetype == '1' && rightInfo.status == '3'">撤回</aui-button>
            <aui-button class="theme-background-color sure-btn-style" v-if="rightInfo.messagetype == '8'" @click.native="showAut()">详情</aui-button>
          </div>
        </div>
      </div>
    </div>


    <div class="author-right" v-if="showAuthor">
      <div class="letter-box">
        <div class="letter-main">
          <p class="letter-title">{{rightInfo.messagetype | warnType}}</p>
          <aui-flexbox orient="vertical" :gutter="2">
            <aui-flexbox-item>
              <aui-flexbox :gutter="0">
                <aui-flexbox-item :span="4/9">
                  <div class="phoTo"><img :src="authorList.frontPhoto" class="phoTosty"></div>
                </aui-flexbox-item>
                <aui-flexbox-item>
                  <div class="phoTo"><img :src="authorList.backPhoto" class="phoTosty"></div>
                </aui-flexbox-item>
              </aui-flexbox>
            </aui-flexbox-item>
            <aui-flexbox-item>
              <aui-flexbox>
                <aui-flexbox-item :span="4/9">
                  <div class="phoSpan">身份证·正面</div>
                </aui-flexbox-item>
                <aui-flexbox-item>
                  <div class="phoSpan">身份证·反面</div>
                </aui-flexbox-item>
              </aui-flexbox>
            </aui-flexbox-item>
            <aui-flexbox-item style="border-top: 2px solid #ddd;">
              <aui-flexbox>
                <aui-flexbox-item :span="3/11">
                  <div class="phoTot"><img :src="authorList.spotPhoto" class="phoTostyt"></div>
                </aui-flexbox-item>
                <aui-flexbox-item :span="3/11">
                  <div class="phoTot"><img :src="authorList.checkPhoto" class="phoTostyt"></div>
                </aui-flexbox-item>
                <aui-flexbox-item>
                  <div class="phoTo" style="margin-left: 0px"><img :src="authorList.signPhoto" class="phoTosty"></div>
                </aui-flexbox-item>
              </aui-flexbox>
            </aui-flexbox-item>
            <aui-flexbox-item>
              <aui-flexbox>
                <aui-flexbox-item :span="3/11">
                  <div class="phoSpant">现场照片</div>
                </aui-flexbox-item>
                <aui-flexbox-item :span="3/11">
                  <div class="phoSpant">联网核查照片</div>
                </aui-flexbox-item>
                <aui-flexbox-item :span="4/11">
                  <div class="phoSpant">签名照片</div>
                </aui-flexbox-item>
              </aui-flexbox>
            </aui-flexbox-item>
            <aui-flexbox-item style="border-top: 2px solid #ddd;">
                  <div class="autDiv">
                    <aui-flexbox orient="vertical" :gutter="2">
                      <aui-flexbox-item>
                        <aui-flexbox>
                          <aui-flexbox-item :span="1/2">
                            <p class="main-row">
                              <span class="main-label">消息内容:</span>
                              <span class="main-text" >{{rightInfo.messagecontent}}</span>
                            </p>
                          </aui-flexbox-item>
                          <aui-flexbox-item>
                            <p class="main-row">
                              <span class="main-label" >在办业务:</span>
                              <span class="main-text" >{{authorList.busiType}}</span>
                            </p>
                          </aui-flexbox-item>
                        </aui-flexbox>
                      </aui-flexbox-item>
                      <aui-flexbox-item>
                        <aui-flexbox>
                          <aui-flexbox-item :span="1/2">
                            <p class="main-row">
                              <span class="main-label" >客户位置:</span>
                              <span class="main-text" >{{authorList.area}}</span>
                            </p>
                          </aui-flexbox-item>
                          <aui-flexbox-item>
                            <p class="main-row">
                              <span class="main-label">联网核查:</span>
                              <span class="main-text" >通过</span>
                            </p>
                          </aui-flexbox-item>
                        </aui-flexbox>
                      </aui-flexbox-item>
                      <aui-flexbox-item>
                        <aui-flexbox>
                          <aui-flexbox-item :span="1/2">
                            <p class="main-row">
                              <span class="main-label" >通知时间:</span>
                              <span class="main-text" >{{rightInfo.messagedate}}&nbsp;&nbsp;{{rightInfo.messagetime}}</span>
                            </p>
                          </aui-flexbox-item>
                          <aui-flexbox-item>

                          </aui-flexbox-item>
                        </aui-flexbox>
                      </aui-flexbox-item>
                    </aui-flexbox>
                  </div>
            </aui-flexbox-item>
            <AccessAnimate :show-animate="isAuth" :is-access="true" class="accessAnimate"></AccessAnimate>
            <aui-flexbox-item style="border-top: 2px solid #ddd;">
              <div class="all-btn-box">
                <aui-button class="theme-background-color sure-btn-style" v-if="rightInfo.messagetype == '8'" @click.native="showAuthor=false">关闭</aui-button>
                <aui-button class="theme-background-color sure-btn-style" v-if="rightInfo.messagetype == '8'" @click.native="isAuth=true">授权</aui-button>
              </div>
            </aui-flexbox-item>
          </aui-flexbox>
        </div>

      </div>
    </div>



    <!-- search 弹框 -->
    <div v-transfer-dom>
      <aui-popup v-model="searchPop" style="height: 65%;width:60%;top:15%;left:20%;background:#fff;" position="bottom" class="add-slide">
        <div class="add-slide-header theme-background-color">
          <span class="header-title">查询条件</span>
          <span class="fa fa-close header-left" @click="closePop"></span>
        </div>
        <p class="slide-row clide-data" @click="calanderShowFn()">
          <span class="row-label"  >选择日期:</span>
          <span class="row-text">{{searchData.calenderVal}}</span>
        </p>
        <div class="calander-data">
          <aui-inline-calendar v-model="searchData.calenderVal" v-show="calenderShow" ref="calendar" style="border: 1px solid #ddd;" @change="closeDate" > </aui-inline-calendar>
        </div>
        <p class="slide-row" style="border-bottom: 1px solid #ddd;">
          <span class="row-label">消息类型:</span>
          <aui-selector placeholder="请选择" class="row-text"  v-model="searchData.searchType" :options="queryTypeList"></aui-selector>
        </p>
        <div class="btn-box">
          <aui-button class="theme-background-color btn-style" @click.native="searchBtn(1)">查询</aui-button>
          <aui-button class="theme-background-color btn-style" @click.native="resetBtn()">重置</aui-button>
        </div>
      </aui-popup>
    </div>
        <!-- 转发 弹框 -->
    <div v-transfer-dom>
      <aui-popup v-model="forwardPop" style="height: 65%;width:60%;top:15%;left:20%;background:#fff;" position="bottom" class="forward-box">
        <div class="forward-main">
          <div class="dialog_xtable">
            <div class="table-header">
              <span class="header-span">客户经理</span>
              <span class="header-span">工号</span>
              <span class="header-span">转发</span>
            </div>
            <div class="table-tbody">
              <div  v-for="(item,index)  in custmgrlist" :key="'table3'+index"  @click="change(index)" class="body-row">
                <span class="body-span">
                  <span class="radio_btn3">
                      <input  type="radio"  :value="item.fmid" v-model="picked" />
                      <span class="bg_checked4"></span>
                  </span>
                </span>
                <span class="body-span">{{item.fmname}}</span>
                <span class="body-span">{{item.fmworkno}}</span>
              </div>
            </div>
          </div>
          <div class="btn-box">
            <aui-button class="for-btn" @click.native="closeForwad()">取消</aui-button>
            <aui-button class="for-btn theme-background-color" :disabled="picked == ''" @click.native="forward()">转发</aui-button>
          </div>
          </div>
      </aui-popup>
    </div>
  </div>
</template>

<script>
  import EventNames from "@/common/activity-manager/activity-event-names"; //路由事件名称
  import {
    PageManager
  } from "ab-manager-page"; //页面管理
  import {
    TradeFlowManager
  } from "ab-manager-trade-flow"; //流程管理
  import warnQuery from '@/common/api/warn-query.js'
  import MtLoadmore from '@/components/loadmore/index'
  import MtSpinner from '@/components/spinner/index'
  import '@/common/js/jquery'
  import BasicActivity from "@/mixins/basic-activity";
  import AccessAnimate from "@/components/AccessAnimate"

  export default {
    components: {
      MtLoadmore,
      MtSpinner,
      AccessAnimate
    },
    mixins: [BasicActivity],
    data() {
      return {
        // searchHeader: "历史消息",
        activeNum: 0,
        searchPop: false, //搜索弹窗
        forwardPop: false, //转发弹窗
        calenderShow: false,
        searchData: {
          calenderVal: '',//查询时间
          searchType: -1,//查询类型
        },
        showAuthor:false,//授权展示
        sildeShow:false,//文字动画
        isAuth:false,//是否授权
        picked : "",
        custmgrlist : [
          {
            fmname : "xx",
            fmworkno : "xx",
            fmid : "xx",
          },
          {
            fmname : "xx",
            fmworkno : "xx",
            fmid : "xx",
          },
          {
            fmname : "xx",
            fmworkno : "xx",
            fmid : "xx",
          },
        ],//客户经理列表
        rightInfo: {
          counterid: "",
          custid: "",
          custname: "",
          messagecontent: "",
          messagedate: "",
          messageid: "",
          messagetime: "",
          messagetype: "",
          queueid: "",
          status: "",
          unitid: "",
        },

        //授权详细信息
        authorList:'',
        dataInfoList: [],
        // load-more --data
        pageCtrl: {
          currpage: 1, // 当前页码
          pagenum: 9, // 显示条数
          pageflag: 4 // 4-分页状态
        },
        list: "",
        allLoaded: false, // 数据加载状态   true时表示数据没有加载完毕
        bottomStatus: '', //上拉刷新状态
        topStatus: '', // 下拉刷新状态
        taskStatus: "",
        // 查询窗口
        queryTypeList : [{key:1,value:"客户来访"},{key:2,value:"排队人数预警"},{key:3,value:"排队超时预警"},{key:5,value:"呼叫帮助"},{key:8,value:"授权"}],
      };
    },
    created() {
      // let searchIndex = this.$route.params.index;
      this.queryData('top');//查询数据
    },
    // 初始化数据
    mounted() {
      //      console.log(this.wrapperHeight + ":========")
      this.searchData.searchType = this.warnQueryNum;
    },
    destroyed: function () {
      this.$store.state.warnQueryNum='-1'
    },
    computed: {
      /*ball num*/
      warnQueryNum: {
        get() {
          return this.$store.state.warnQueryNum;
        },
        set(val) {
          this.$store.commit("setWarnQueryNume", val);
        },

      },
    },
    watch: {
      warnQueryNum(value) {
        // 查询数据
        this.searchData.searchType = value;
        if(!this.searchPop){
          this.searchData.searchType = this.$store.state.warnQueryNum;
          this.pageCtrl.currpage = 1;
          this.allLoaded = false;
          this.queryData('top');
        }

      }
    },
    filters :{
      warnType: function (value) {
        let MakSta='';
        if(value=='1'){
          return '客户来访'
        }else if(value=='2'){
          return '排队人数预警'
        }else if(value=='3'){
          return '排队超时预警'
        }else if(value=='4'){
          return '差评'
        }else if(value=='5'){
          return '呼叫帮助'
        }else if(value=='6'){
          return '转发消息'
        }else if(value=='7'){
          return '客户预约'
        }else if(value=='8'){
          return '授权'
        }
        return MakSta;
      },
      statusFn: function (value) {
        let statusname = '';
        if (value == 1) {
          statusname = "未处理";
        } else if (value == 2) {
          statusname = "已处理";
        } else if (value == 3) {
          statusname = "已转发";
        } else if (value == 4) {
          statusname = "已撤销";
        } else if (value == 5) {
          statusname = "已删除";
        }
        return statusname;
      },
    },
    methods: {
     //打开转发弹窗
        showPlugin () {
            this.forwardPop = true;
//          查询客户经理信息
            let vm = this,submitData = {},body = {};
            let lojinObject = JSON.parse(sessionStorage.getItem("loginObj"));
            body.unitid = lojinObject.UnitID;
              submitData.body = JSON.stringify(body);
            warnQuery.custmgrQueryMsg(submitData,vm,rsp => {
              vm.custmgrlist = rsp.basic;
            });
        },
        //选择转发单选按钮
        change(index){
          let checkBox = document.getElementsByClassName("bg_checked4");
          for(let i = 0;i<checkBox.length;i++){
            checkBox[i].style.background = "#fff";
          }
          checkBox[index].style.background = "#3CBFEF";
          this.picked = this.custmgrlist[index];
        },
        // 关闭转发
        closeForwad(){
          this.forwardPop = false;
          this.picked = '';
        },
        //转发
        forward () {
          //查询客户经理信息
          let vm = this,submitData = {},body = {};
          let lojinObject = JSON.parse(sessionStorage.getItem("loginObj"));
          body.dealuser = lojinObject.UnitID;
          body.messageid = vm.rightInfo.messageid;
          body.fmid = vm.picked;
          submitData.body = JSON.stringify(body);
          warnQuery.forwardMsg(submitData,vm,rsp => {
            if(rsp.ReturnCode == '000000'){
              vm.forwardPop = false;
              vm.showMesAddSuccess = true;
              vm.queryData('top');
            }

          });

        },
      //查询授权详情
      queryAuth(){
        //查询授权信息
        let vm = this,submitData = {},body = {};
        let lojinObject = JSON.parse(sessionStorage.getItem("loginObj"));
        body.messageId = vm.rightInfo.messageid;
        submitData.body = JSON.stringify(body);
        warnQuery.forautMsg(submitData,vm,rsp => {
            vm.authorList=rsp.AuthInfo[0]
        });


      },



      //展示授权
      showAut(){
            if(this.showAuthor){
                this.showAuthor=false
            }else{
              this.showAuthor=true
              if(1==1){
                this.isAuth=false
              }
              //查询数据
              this.queryAuth();



            }

      },
      // 打开第一行数据
      fristLookRow(){
        this.rightInfo.messagetype = this.dataInfoList[0].messagetype;//业务类型
        this.rightInfo.messagecontent = this.dataInfoList[0].messagecontent;//业务内容
        this.rightInfo.messagedate = this.dataInfoList[0].messagedate;//业务日期
        this.rightInfo.messagetime = this.dataInfoList[0].messagetime;//业务时间
        this.rightInfo.status = this.dataInfoList[0].status;//业务状态
        this.rightInfo.messageid = this.dataInfoList[0].messageid;//业务状态
        this.rightInfo.counterid = this.dataInfoList[0].counterid;
        this.rightInfo.custid = this.dataInfoList[0].custid;
        this.rightInfo.custname = this.dataInfoList[0].custname;
        this.rightInfo.status = this.dataInfoList[0].status;
        this.rightInfo.unitid = this.dataInfoList[0].unitid;

        this.showAuthor=false

        this.sildeShow=true
      },
      // 查看数据详情
      lookRow(index, item) {
        let vm = this;
        if(item.status=='1') {
          let submitData = {},body = {};
          body.messageid = item.messageid;
          submitData.body = JSON.stringify(body);
          warnQuery.updataStatus(submitData,vm,rsp => {
            if (rsp.ReturnCode == '000000') {
              vm.dataInfoList[index].status = 2;
              vm.rightInfo.status = 2;//业务状态
              // vm.pageCtrl.currpage = -1;
              // vm.queryData('top');
              vm.setbadge(item.messagetype)
            }else{
              vm.rightInfo.status = item.status;//业务状态
            }
          })
        }
        vm.activeNum = index;
        vm.rightInfo.messagetype = item.messagetype;//业务类型
        vm.rightInfo.messagecontent = item.messagecontent;//业务内容
        vm.rightInfo.messagedate = item.messagedate;//业务日期
        vm.rightInfo.messagetime = item.messagetime;//业务时间
        vm.rightInfo.counterid = item.counterid;//业务状态
        vm.rightInfo.custid = item.custid;
        vm.rightInfo.messageid = item.messageid;
        vm.rightInfo.custname = item.custname;
        vm.rightInfo.queueid = item.queueid;
        vm.rightInfo.unitid = item.unitid;
        vm.showAuthor=false
      },
      closeDate (val) {
        this.calenderShow = false;
      },
      calanderShowFn(){
        this.calenderShow = !this.calenderShow;
        // this.$refs.calendar.switchViewToToday();
      },
      openQuerySlide(){
        this.searchPop=true;
      },
      closePop(){
        this.searchPop=false;
        this.searchData.calenderVal = "" ;
        this.searchData.searchType = -1;//查询类型
      },
      // 查询数据按钮
      searchBtn(index){
        if(index==1){
          this.searchPop = false;
          this.$store.state.warnQueryNum=this.searchData.searchType
        }
        this.pageCtrl.currpage = 1;
        this.allLoaded = false;
        this.queryData('top');
      },
      resetBtn(){
        this.searchPop = false;
        this.searchData.calenderVal = '';//查询时间
        this.searchData.searchType = -1;//查询类型
      },

      //设置通知数字
      setbadge(index){
        if(index==8 && this.$store.state.authorNum>0){
          this.$store.state.authorNum -= 1;
        }else  if(index==1 && this.$store.state.custvisitinfoNum>0){
          this.$store.state.custvisitinfoNum -= 1;
        }else  if(index==5 && this.$store.state.callHelpNum>0){
          this.$store.state.callHelpNum -= 1;
        }
      },
      queryData(direction) {
        let vm = this, submitData = {},body = {};
        if(vm.searchData.searchType == -1){
          body.messagetype = ""
        }else{
          body.messagetype = vm.searchData.searchType; // 消息类型
        }
        body.messagedate = vm.searchData.calenderVal; // 查询时间
        let lojinObject = JSON.parse(sessionStorage.getItem("loginObj"));
        body.unitid = lojinObject.UnitID;

        let PageCtrl={}
        PageCtrl.currpage=vm.pageCtrl.currpage
        PageCtrl.pagenum=vm.pageCtrl.pagenum
        PageCtrl.pageflag=vm.pageCtrl.pageflag

        body.PageCtrl=PageCtrl

   /*     body.PageCtrl = {
          currpage: 1,
          pagenum: 9,
          pageflag: 4
        };*/



        submitData.body = JSON.stringify(body);
        /*添加预约信息*/
        warnQuery.queryWarnMsg(
          submitData,
          vm,
          rsp => {

            if (vm.pageCtrl.currpage === 1) {
              vm.dataInfoList = rsp.MsgInfo;
            } else {
                if(direction!='top'){
                  vm.dataInfoList = vm.dataInfoList.concat(rsp.MsgInfo);
                }
              /*vm.dataInfoList = vm.dataInfoList.concat(rsp.MsgInfo);*/
            }
            vm.fristLookRow();//初始化右侧数据
            // 判断滚动方向
            if (direction == 'top') {
              vm.$refs.loadmore.onTopLoaded();
            } else {
              vm.$refs.loadmore.onBottomLoaded({
                top: 0
              });
            }
            // 如果是最后一页，将完全加载状态置为true；如果不是则页码+1
            if (vm.pageCtrl.currpage == rsp.PageInfo.totalpagenum || rsp.PageInfo.totalpagenum === 0) {
              vm.allLoaded = true; // 数据已经加载完毕
              vm.showLoading = false; // 不展示loading
            } else {
              vm.pageCtrl.currpage++;
            }
          },
          err => {
            console.log(err);
          }
        );
      },
      // 下拉加载数据相关方法
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      handleTopChange(status) {
        this.moveTranslate = 0;
        this.topStatus = status;
      },
      loadBottom() {
        this.queryData('bottom');
      },
      loadTop() {
        this.pageCtrl.currpage = 1;
        this.allLoaded = false;
        this.queryData('top');
      },

      //文字动画
      beforeEnter: function (el) {
        el.style.opacity = 1
        el.style.transformOrigin = 'left'
      },
      enter: function (el, done) {
        Velocity(el, { opacity: 1, fontSize: '1.4vw' }, { duration: 600 })
      },

    }
  };

</script>
<style lang="less" scoped>
  @import '../../../static/public-style/theme-blue.less';
  * {
    box-sizing: border-box;
  }

  .search-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-size: 16px;
    .search-left {
      width: 30%;
      height: 100%;
      float: left;
      overflow-y: hidden;
      .left-header {
        width: 100%;
        height: 40px;
        border-bottom: 2px solid #fafafa;
        line-height: 40px;
        text-align: center;
        font-size: 18px;
      }
      .search-box {
        width: 96%;
        height: 40px;
        background: #f0f0f0;
        border-radius: 10px;
        margin: 5px auto;
        .search-text{
          height: 40px;
          line-height: 40px;
          font-size: 16px;
          width: 80%;
          float: left;
          padding-left: 3%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .icon-search {
          width: 10%;
          height: 60%;
          margin-top: 10px;
          margin-right: 7%;
          float: right;
        }
      }
      .data-box {
        width: 100%;
        height: calc(~"100%-" 95px);
        overflow-y: scroll;
        border-bottom: 3px solid #f7f7f7;
        .row-active {
          border-left: 5px solid #3cbfef;
          background-color: #F0F0F0;
        }
        .data-row {
          width: 100%;
          height: 65px; // background: #ffffff;
          text-align: left;
          border-bottom: 1px solid #f0f0f0;
          padding-left: 10%;

          .row-left {
            width: 90%;
            height: 65px;
            float: left;
            .one-row {
              width: 100%;
              height: 40px;
              line-height: 50px;
              .set-img{
                width: 25px;
                height: 25px;
                vertical-align: middle;
                display: inline-block;
                img{
                  width:100%;
                  height:100%;
                }
              }
            }
            .two-row {
              width: 100%;
              height: 25px;
              line-height: 15px;
              padding-left: 30px;
            }
          }
          .row-right {
            width: 10%;
            height: 65px;
            float: left;
            line-height: 65px;
            vertical-align: center;
            font-size: 25px;
          }
        }
      }
    }
    .search-right {
      width: 70%;
      height: 100%;
      float: left;
      overflow-y: scroll;
      background: #fafafa;
      .letter-box {
        width: 100%;
        height: 100%;
        margin: auto;
        position: relative;
        .right-img{
          width: 80%;
          margin-top: 60px;
          margin-left: 10%;
          img{
            width:100%;
            height:100%;
          }
        }
        .letter-main {
          font-family: "楷体", "楷体_GB2312";
          width: 100%;
          font-size: 16px;
          position: absolute;
          top: 222px;
          .letter-title {
            width: 100%;
            text-align: center;
            margin-bottom: 30px;
            font-size: 18px;
          }
          .main-row {
            width: 100%;
            height: 32px;
            line-height: 32px;
            vertical-align: middle;
            .main-label {
              width: 30%;
              text-align: right;
              display: inline-block;
            }
            .main-text {
              width: 68%;
              text-align: left;
              display: inline-block;
            }
          }

          .all-btn-box {
            width: 100%;
            text-align: center;
            .sure-btn-style {
              width: 80px;
              height: 35px;
              font-size: 16px;
              display: inline-block;
              border-radius: 5px;
            }
            .sure-btn-style:nth-child(2) {
              margin-left: 20px;
            }
          }
        }
      }
    }
  }
  .add-slide {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .add-slide-header{
      width: 100%;
      height: 40px;
      line-height: 40px;
      padding: 0 3%;
      display: inline-block;
      text-align: center;
      font-size: 18px;
      .header-left {
        font-size: 18px;
        margin-top: 12px;
        float: left;
      }
      .header-title {}
      .header-right {
        font-size: 18px;
        margin-top: 12px;
        float: right;
      }
    }
    .calander-data{
      width: 50%;
      margin: 0 auto;
      position: absolute;
      background: #ffffff;
      z-index: 500;
      left: 25%;
    }
    .slide-row{
      width: 95%;
      margin: 10px auto;
      border-top: 1px solid #ddd;
      height: 40px;
      line-height: 40px;
      font-size: 18px;
      margin-top: 80px;
      .row-label{
        width: 23%;
        display: inline-block;
        text-align: right;
      }
      .row-text{
        width: 68%;
        display: inline-block;
        text-align: left;
        margin-left: 3%;
      }
    }
    .clide-data{
      position: relative;
      border-bottom: 1px solid #ddd;
    }
    .slide-row:nth-child(2){
      margin-top: 80px;
    }
    .btn-box{
      width: 100%;
      text-align: center;
      margin-top: 15%;
      .btn-style {
        width: 100px;
        height: 40px;
        font-size: 18px;
        display: inline-block;
        border-radius: 5px;
      }
      .btn-style:nth-child(2){
        margin-left: 30px;
      }
    }
  }
  .forward-box{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .forward-main{
      width: 100%;
      height: 100%;
      overflow: hidden;
      .dialog_xtable{
        height: 90%;
        .table-header{
          height: 40px;
          background:#ededed;
          font-size:18px;
          .header-span{
            width: 33.33%;
            float: left;
            border: 1px solid #dddddd;
            text-align: center;
            height: 40px;
            line-height: 40px;
          }
        }
        .table-tbody{
          font-size: 16px;
          height: calc(~"100%-"40px);
          overflow-y: scroll;
          .body-row{
            height: 40px;
            width: 100%;
            text-align: center;
            border-top: 1px solid #dddddd;
            border-bottom: 1px solid #dddddd;
            .body-span{
              width: 33.33%;
              height: 40px;
              line-height: 40px;
              float: left;
              border-left: 1px solid #dddddd;
              border-right: 1px solid #dddddd;
            }
          }
        }

      }

      .btn-box{
        height: 10%;
        text-align: center;
        .for-btn{
          display: inline-block;
          vertical-align: middle;
          height:40px;
          width: 20%;
        }
        .for-btn:nth-child(2){
          margin-top: 0;
          margin-left: 20px;
        }
      }
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
      width: 20px;
      height: 20px;
      border-radius: 20px;
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
      line-height: 20px;
      color: #ccc;
    }
  }
  /*loadmore组件相关自定义样式*/

  .page-loadmore-wrapper {
    overflow: scroll;
    height: calc(~"100% -"106px);
  }

  .mint-loadmore-bottom {
    font-size: 20px;
  }

  .mint-loadmore-bottom div {
    display: inline-block;
    transition: .2s linear;
    vertical-align: middle;
  }

  .mint-loadmore-bottom div>span {
    display: inline-block;
    position: relative;
    margin-left: 20px;
  }

  .mint-loadmore-top {
    font-size: 20px;
  }

  .mint-loadmore-top div {
    display: inline-block;
    transition: .2s linear;
    vertical-align: middle;
  }

  .mint-loadmore-top div>span {
    display: inline-block;
    position: relative;
    margin-left: 12px;
  }

  .author-right {
    width: 70%;
    height: 100%;
    overflow-y: scroll;
    background: #fafafa;
    float: left;
    .letter-box {
      width: 100%;
      height: 100%;
      margin: auto;
      position: relative;
      .letter-main {
        width: 100%;
        font-size: 16px;
        position: absolute;
        .letter-title {
          width: 100%;
          text-align: center;
          margin-bottom: 10px;
          font-size: 18px;
          margin-left: -20px;
        }
        .phoTo {
          width: 270px;
          height: 180px;
          margin-left: 60px;
          margin-top: 20px;
          .phoTosty{
            width: 100%;
            height: 100%;
            border-radius:15px;
          }
        }
        .phoSpan {
          font-size: 16px;
          margin-left: 140px;
          margin-top: 10px;
        }


        .phoTot {
          width: 135px;
          height: 180px;
          margin-left: 40px;
          margin-top: 20px;
          .phoTostyt{
            width: 100%;
            height: 100%;
            border-radius:15px;
          }
        }
        .phoSpant {
          font-size: 16px;
          margin-top: 10px;
          text-align: center;
        }


        .main-row {
          width: 100%;
          height: 32px;
          line-height: 32px;
          vertical-align: middle;
          .main-label {
            width: 30%;
            text-align: right;
            display: inline-block;
          }
          .main-text {
            width: 68%;
            text-align: left;
            display: inline-block;
          }
        }

        .all-btn-box {
          width: 100%;
          margin-top: 20px;
          text-align: center;
          .sure-btn-style {
            width: 100px;
            height: 35px;
            font-size: 18px;
            display: inline-block;
            border-radius: 5px;
          }
          .sure-btn-style:nth-child(2) {
            margin-left: 320px;
          }
        }
      }
    }
  }
  .autDiv{
    margin-top: 20px;
    font-size: 16px;
    .main-row {
      height: 32px;
      line-height: 32px;
      .main-label {
        text-align: right;
      }
      .main-text {
        text-align: left;
      }
    }
  }
.accessAnimate{
  position: fixed;
  right: 50px;
  bottom: 100px;
}

</style>
