<template>
  <div class="negative-comment">
    <div style="overflow-y: hidden">
      <!--标题栏-->
      <x-header :left-options="{showBack:false}">
        <div slot="default">
          <span>差评</span>
        </div>
      </x-header>
      <aui-group gutter ='0'>
        <aui-flexbox>
        <aui-flexbox-item :span="1/20" class="header_box">
          <!--title="我的群组"-->
          <div style="text-align: center;"></div>
        </aui-flexbox-item>
        <aui-flexbox-item :span="4/20" class="header_box">
          <!--title="我的群组"-->
          <div style="text-align: center;">柜面ID</div>
        </aui-flexbox-item>
        <aui-flexbox-item :span="5/20" class="header_box">
          <!--title="我的群组"-->
          <div style="text-align: center;">消息时间</div>
        </aui-flexbox-item>
        <aui-flexbox-item :span="4/20"   class="header_box" >
          <div style="text-align: center">消息内容</div>
        </aui-flexbox-item>
        <aui-flexbox-item :span="5/20"   class="header_box" >
          <aui-popup-radio  title="处理状态" placeholder="请选择" :options="taskStatusGrup"
                           :show-dialog="true" :show-title="false" :hide-on-blur="true"
                           v-model="taskStatus" @on-change="selectTaskStatusGroup" class="radio_box"></aui-popup-radio>
        </aui-flexbox-item>
        </aui-flexbox>
      </aui-group>
      <div class="row"></div>
    </div>
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange"
                   @top-status-change="handleTopChange" :top-method="loadTop" ref="loadmore">
        <div>
          <div   v-for="(item,index)  in list" :key="index"  >
            <div  class="rol_box" @click="clickRow(index)">
            <span class="span_box" >
                <span v-if="item.status == '1'" class="icon-xin noLook theme-color" ></span>
                <span v-else class="icon-openXin isLook "></span>
              <!-- {{item.counterid}} -->
            </span>
              <span class="span_box">{{item.messagedate}}  {{item.messagetime}}</span>
              <span class="span_box">{{item.messagecontent}}</span>
              <!--<span class="span_box">{{item.description==undefined?"&nbsp":item.description}}</span>-->
              <span class="span_box">{{item.status | statusFn}}</span>
            </div>
            <transition  name="staggered-fade"
                         v-bind:css="false"
                         v-on:before-enter="beforeEnter"
                         v-on:enter="enter"
                         v-on:leave="leave">
              <div  v-show="rowShow == index" class="slide_box" style="position: relative;" >
                <p class="slide_row">
                  <span>处理人：李某某</span>
                  <span style="margin-left: 10%">处理时间：2017-08-01  18:48:23</span>
                </p>
                <p class="slide_row">
                  <span style="width: 70%">处理记录：{{item.description}}</span>
                  <!--<x-button class="dialog_button btn_1" mini  @click.native="showPlugin(index)">处理</x-button>-->
                </p>
                <div class="btn_box" v-if="item.status == '1'">
                  <aui-button class="dialog_button1 theme-background-color" mini  @click.native="showPlugin(index)">处理</aui-button>
                </div>
              </div>
            </transition>
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
      </mt-loadmore>
    </div>
    <div v-transfer-dom>
      <aui-popup v-model="showPop" style="height: 65%;width:60%;top:15%;left:20%;background:#fff;" position="bottom" class="add-slide">
                <!--标题-->
      <div class="theme-background-color pop-header">
        <span>处理评价信息</span>
      </div>
      <div class="dialog_content">
          <p>
            <span class="text_span">消息内容：</span>
            <span class="text_style11">{{describeInfo.messagecontent}}</span>
            <!--<input v-model="makInfo.productname"/>-->
          </p>
          <p style="margin-top: 0.78vw">
            <span class="text_span">柜面信息：</span>
            <!--<span>{{makInfo.marketingstatus}}</span>-->
            <span class="text_style11">{{describeInfo.counterid}}号柜面</span>
          </p>
          <p style="margin-top: 0.78vw">
            <span class="text_span">描述信息：</span>
            <aui-textarea placeholder="描述信息" :max="100" :rows="5" :cols="50" v-model="describeInfo.description" class="textArea" style=" display: inline-block;"></aui-textarea>
          </p>
          <!--按钮-->
          <div style="margin-top: 8vw;">
            <aui-flexbox>
              <aui-flexbox-item align="right"><aui-button class="dialog_button theme-background-color" mini @click.native ="showPop = false">关闭</aui-button></aui-flexbox-item>
              <div style="width: 6.25vw;"></div>
              <aui-flexbox-item align="left"><aui-button class="dialog_button theme-background-color" mini @click.native = "handleMsg()">确定</aui-button></aui-flexbox-item>
            </aui-flexbox>
          </div>
      </div>
      </aui-popup>

    </div>
    <!-- <my-dialog :dialog-style="{'max-width':'39.06vw', width: '100%'}"
               mask-style="background: #fff;opacity: 0.5;position: fixed;top: 8.98vw;right: 3.125vw;left: 13%;bottom: 0;"
               v-model="show" >
      
    </my-dialog> -->
    <div style="text-align: center;padding-top:0.78vw; color: #999; font-size: 1.4vw" v-if="allLoaded===true">加载完毕</div>
  </div>
</template>

<script type="text/ecmascript-6">
//  import {TransferDomDirective as TransferDom} from 'aui'
  import MtLoadmore from '@/components/loadmore/index'
  import MtSpinner from '@/components/spinner/index'
  import historyMsgApi from  '@/common/api/warn-query.js'
  export default {
    components: {
      MtLoadmore,
      MtSpinner
    },
    data() {
      return{
        showMesAddSuccess:false,
        pageCtrl: {
          currpage: 1,   // 当前页码
          pagenum: 9,    // 显示条数
          pageflag: 4    // 4-分页状态
        },
        list:"",
        allLoaded: false,  // 数据加载状态   true时表示数据没有加载完毕
        bottomStatus: '',  //上拉刷新状态
        topStatus: '',    // 下拉刷新状态
        wrapperHeight: 0,  //初始化下拉框高度
        showPop:false,
        describeInfo:"",
        rowShow:-1,
        taskStatus:"",
        paramData:"",  //选择框数据
        taskStatusGrup:[{"key":"1","value":"未处理"},{"key":"2","value":"已处理"},{"key":"3","value":"已转发"},{"key":"4","value":"已撤销"},{"key":"5","value":"已删除"}],
      }
    },
    filters: {
      statusFn: function (value) {
        let statusname='';
        if(value==1){
          statusname="未处理";
        }else if(value==2){
          statusname="已处理";
        }else if(value==3){
          statusname="已转发";
        }else if(value==4){
          statusname="已撤销";
        }else if(value==5){
          statusname="已删除";
        }
        return statusname;
      }
    },
    activated: function (){
      this.loadTop ();
    },
    // 离开页面时 初始化设置
    deactivated(){
      this.allLoaded = false;
      this.showPop = false;
      this.rowShow = -1;
    },
    created(){
      this.loadTop();
    },
    methods: {
      // 弹出窗展示信息
      showPlugin (index) {
        this.showPop = true;
        let listData = this.list;
        let dataInfo = {};
        dataInfo.description =  listData[index].description;
        dataInfo.counterid =  listData[index].counterid;
        dataInfo.messagecontent =  listData[index].messagecontent;
        dataInfo.messageid =  listData[index].messageid;
        this.describeInfo = dataInfo;
      },

      // 处理信息
      handleMsg () {
        let vm = this,submitData = {},body={};
        body.messageid = vm.describeInfo.messageid;
        body.description = vm.describeInfo.description;
        let lojinObject = JSON.parse(sessionStorage.getItem("loginObj"));
        body.dealuser=lojinObject.code;
        submitData.body = JSON.stringify(body);
        historyMsgApi.updataStatus(submitData, vm, rsp => {
          if(rsp.ReturnCode == "000000"){
            AgreeSDK.ui.toast("预约信息添加成功");
            vm.showPop = false;  // 隐藏弹出框
            vm.describeInfo = "";  // 初始化弹出框内容
            vm.pageCtrl.currpage = 1;
            vm.queryData('top',vm.paramData);
          }
        });
      },
      // 查询数据
      queryData (direction,paramData){
        // 获取当天日期
        let date = new Date();
        let seperator1 = "-";
        let month = date.getMonth() + 1;
        if (month<10) {
          month = "0"+month;
        }
        let strDate = date.getDate();
        let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;

        let vm = this,submitData = {},body={};
        if(paramData.status !="" && paramData.status != undefined){
          body.status = paramData.status;
        }
        body.messagetype = '4';  // 消息类型为  4-差评
        let lojinObject = JSON.parse(sessionStorage.getItem("loginObj"));
        body.unitid = lojinObject.UnitID;
        //submitData.messagedate = currentdate;
        body.PageCtrl = vm.pageCtrl;
        submitData.body = JSON.stringify(body);
        historyMsgApi.queryWarnMsg(submitData, vm, rsp => {
          if (vm.pageCtrl.currpage === 1) {
            vm.list = rsp.MsgInfo;
          } else {
            vm.list = vm.list.concat(rsp.MsgInfo);
          }
          // 判断滚动方向
          if (direction == 'top') {
            vm.$refs.loadmore.onTopLoaded();
          } else {
            vm.$refs.loadmore.onBottomLoaded({top: 0});
//              console.log(vm.$refs.loadmore.scrollEventTarget.scrollTop+'=====');
//              vm.$refs.loadmore.scrollEventTarget.scrollTop = 0;
          }
          // 如果是最后一页，将完全加载状态置为true；如果不是则页码+1
          if (vm.pageCtrl.currpage == rsp.PageInfo.totalpagenum||rsp.PageInfo.totalpagenum===0) {
            vm.allLoaded = true; // 数据已经加载完毕
            vm.showLoading = false;  // 不展示loading
          } else {
            vm.pageCtrl.currpage++;
          }
        });
      },
      // 下拉加载数据相关方法
      handleBottomChange (status) {
        this.bottomStatus = status;
      },
      handleTopChange (status) {
        this.moveTranslate = 0;
        this.topStatus = status;
      },
      loadBottom () {
        this.queryData('bottom',this.paramData);
      },
      loadTop () {
        this.paramData = {};
        this.taskStatus = "";
        this.pageCtrl.currpage = 1;
        this.pageCtrl.currpage = 1;
        this.allLoaded = false;
        this.queryData('top',this.paramData);
      },
      //row--animate
      clickRow(index){
        AgreeSDK.ui.toast("预约信息添加成功");
        if(index == this.rowShow){
          this.rowShow = -1;
        }else{
          this.rowShow = index;
        }
      },
      beforeEnter: function (el) {
        el.style.opacity = 0;
        el.style.height = 0
      },
      enter: function (el, done) {
        var delay = el.dataset.index * 150;
        let chileNum = el.children.length;
//        console.log(el);
        setTimeout(function () {
          Velocity(
            el,
            { opacity: 1, height: 2.3*chileNum + 'em' },
            { complete: done }
          )
        }, delay)
      },
      leave: function (el, done) {
        var delay = el.dataset.index * 150;
        setTimeout(function () {
          Velocity(
            el,
            { opacity: 0, height: 0 },
            { complete: done }
          )
        }, delay)
      },
      //处理状态
      selectTaskStatusGroup(){
        this.paramData.status = this.taskStatus;
        this.pageCtrl.currpage = 1;
        this.queryData('top',this.paramData);
      },
    },
    // 初始化数据
    mounted () {
      this.wrapperHeight = document.documentElement.clientHeight - 140;
      console.log(this.wrapperHeight + ":========")
    },
  }
</script>

<style scoped lang="less">
  html,body{
    overflow: hidden;
    margin: 0;
  }
  .negative-comment{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    border: 1px solid #B89E6C;
    font-family:SimHei;
    font-size:18px;
    overflow: hidden;
  }
  /*按钮*/
  .hs_btn{
    width: 40%;
    height: 29.95px;
    text-align: center;
    line-height: 29.95px;
    background-color: #B89E6C;
    color: #ffffff;
    border: none;
    font-size: 16.0px;
  }
  th{
    padding:3.97px;
  }
  td{
    font-size:17.92px;
  }
  .vux-table td:after, .vux-table th:after{
    border-color: #B89E6C !important;
  }
  .row {
    width: 100%;
    height: 9.98px;
    background-color: #f5f4f1;
  }
  .header_box{
    height: 49.92px;
    line-height: 49.92px;
    text-align: center;
    font-size: 19.2px;
    /*border-left: 1px solid #e5e5e5;*/
  }
  .pop-header{
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 20px;
  }
  .negetive_row{
    border: 1px solid #e5e5e5;
  }
  /*loadmore组件相关自定义样式*/
  .page-loadmore-wrapper {
    overflow: scroll;
  }

  .mint-loadmore-bottom {
    font-size: 17.92px;
  }

  .mint-loadmore-bottom div {
    display: inline-block;
    transition: .2s linear;
    vertical-align: middle;
  }

  .mint-loadmore-bottom div > span {
    display: inline-block;
    position: relative;
    margin-left: 9.98px;
  }

  .mint-loadmore-top {
    font-size: 17.92px;
  }

  .mint-loadmore-top div {
    display: inline-block;
    transition: .2s linear;
    vertical-align: middle;
  }

  .mint-loadmore-top div > span {
    display: inline-block;
    position: relative;
    margin-left: 9.98px;
  }
  .dialog_button{
    right: 0;
    line-height: 30.72px;
    font-size: 17.92px;
    padding: 5px 30px;
  }
  .dialog_content {
    /* background: url("../../../static/image/ambientpoint/knowledge-tree.png"); */
    height: 300.03px;
    background-size:cover;
    padding: 19.97px 0;
    position:relative;
    text-align: left;
    padding-left: 10%;
    font-size: 16.64px;
  }

  .is-rotate {
    transform: rotate(180deg);
  }

  .row{
    width: 100%;
    height: 9.98px;
    background-color: #F5F4F1;
  }
  .rol_box{
    width: 100%;
    height: 46.08px;
    line-height: 46.08px;
    text-align: center;
    font-size: 14.08px;
    border-bottom: 1px solid #e5e5e5;
    color: #505050;
  }
  .slide_box{
    width: 100%;
    height: 38.4px;
    font-size: 16px;
    color: #505050;
    background-color: #f5f5f5;
  }
  .slide_row{
    height: 25.6px;
    line-height: 2.25.6px;
    font-size: 12.8px;
    padding-left: 10%;
  }
  .slide_row span{
    display: inline-block;
    width: 25%;
  }
  .slide_row span:nth-child(3){
    margin-left: 5%;
  }
  .span_box{
    float: left;
    width: 25%;
    text-align: center;
    height: 46.08px;
    line-height: 46.08px;
  }
  .container_box{
    text-align: center;
  }
  .noLook{
    margin: 0vw 0 0 65px;
    line-height: 51px;
    font-size: 25.6px;
  }
  .isLook{
    margin: 0vw 0 0 65px;
    line-height: 51px;
    color: #dddddd;
    font-size: 25.6px;
  }
  .btn_box{
    position: absolute;
    bottom: 10px;
    right: 30px;
  }
  .dialog_button1{
    right: 0;
    display: inline-block;
    font-size: 16px;
  }
  .radio_box{
    padding: 19.2px 25.6px;
    font-size: 19.2px;
    line-height: 1px;
    /deep/.aui-cell__ft{
      margin-top: 5px;
    }
  }
  .textArea{
    width: 65%;
    height: 168.0px;
    display: inline-block;
    border: 1px solid #e5e5e5;
    vertical-align: text-top;
  }
  .text_span {
    display: inline-block;
    width: 20%;
    font-size: 17.92px;
    text-align: right;
  }
  .text_style11{
    width: 40%;
    height: 33.97px;
    /*border: 1px solid #DBDADB;*/
    /*border-radius: 9.98px;*/
    /*background: #f5f4f1;*/
    /*padding-left: 9.98px;*/
    /*font-size:17.92px;*/
  }
</style>

