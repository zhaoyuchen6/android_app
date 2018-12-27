<template>
  <div class="client-order">
    <div class="all_div">
      <x-header class="page-header" :left-options="{showBack:false}" :showBack=false>
        <span class="header-span">客户预约</span>
      </x-header>
      <div class="backTo">
        <img @click="backToIndexPage()" src="static/image/icon-fanhui黑-2.svg" v-if="!this.$store.state.showMenu">
      </div>
      <full-calendar class="test-fc" @moreClick="moreClick" :events="fcEvents" first-day='1' locale="zh_CN" :weekEnd="weekEnd"
        v-if="showMore">
        <!-- <img src="static/img/备注.svg" alt="" slot="fc-header-right" style="float: right;width: 40px;height:20px;background:red;" @click="addSlide()"> -->
        <!-- <span slot="fc-header-right" style="float: right;width: 40px;height:20px;background:red;" @click="addSlideShow()"></span> -->
      </full-calendar>
    </div>
    <!--  新增弹窗插件-->
    <div v-transfer-dom>
      <aui-popup v-model="addSlide" style="height: 100%;width:100%;" position="right" class="add-slide">
        <x-header  :left-options="{preventGoBack:true}" class="blue-header" @on-click-back="closePop">
          <span>{{thisData}}</span>
        </x-header>
        <div class="slide-box">
          <!-- 新增view -->
          <div class="add-box">
            <div class="rol_box  box-title" @click="addShowFn()">
              <span class="span_box theme-color">
                <span class="fa fa-plus"></span>
                <span>新建待办事项</span>
              </span>
            </div>
            <transition name="staggered-fade" v-bind:css="false" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave">
                <div v-show="addShow" class="add-box-row">
                  <aui-cell class="add-row">
                    <span slot="title">姓名 <i class="require-style">*</i></span>
                    <aui-input placeholder="请输入客户姓名" v-model="addData.cusName"></aui-input>
                  </aui-cell>
                  <aui-cell class="add-row">
                    <span slot="title">证件号码 <i class="require-style">*</i></span>
                    <aui-input placeholder="请输入证件号码" v-model="addData.cusNum"></aui-input>
                  </aui-cell>
                  <aui-cell class="add-row row-data">
                    <span slot="title">预约时间 <i class="require-style">*</i></span>
                    <aui-datetime v-model="addData.start"  format="YYYY-MM-DD HH:mm"  :minute-list="['00', '15', '30', '45']" ></aui-datetime>
                  </aui-cell>
                  <aui-cell class="add-row">
                    <span slot="title">选择预约业务 <i class="require-style">*</i></span>
                    <aui-selector placeholder="请选择" v-model="addData.cusType" :options="typeList"></aui-selector>
                  </aui-cell>
                  <aui-cell class="add-row">
                    <aui-selector placeholder="请选择" v-model="addData.cusTypeInfo" :options="typeInfoList"></aui-selector>
                  </aui-cell>
                  <aui-cell class="add-row">
                    <span slot="title">手机号码 <i class="require-style">*</i></span>
                    <aui-input placeholder="请输入手机号码" v-model="addData.telNum"></aui-input>
                  </aui-cell>
                  <aui-cell class="add-row text-box">
                    <span slot="title">备注 <i class="require-style">*</i></span>
                    <aui-textarea :max="30" placeholder="请输入备注" :cols="50" :rows="3" v-model="addData.title"  class="add-textarea"></aui-textarea>
                  </aui-cell>
                  <div class="btn_box">
                    <aui-button class="dialog_button theme-background-color" mini :disabled="addBtnAble"  @click.native="addSubmit()">保存</aui-button>
                    <aui-button class="dialog_button btn-close" mini  @click.native="addClose()">取消</aui-button>
                  </div>
                </div>
            </transition>
          </div>
          <!-- 查看view -->
          <div class="cus-data">
            <div v-for="(item,index) in listMsg" :key="index">
              <div class="look-title-box" @click="clickRow(index)">
                <!-- <span class="fa theme-color fa-circle-o"></span> -->
                <span :class="[rowShow == index ? 'fa fa-circle theme-color' : 'fa fa-circle-o theme-color']"></span>
                <span class="span_box">{{item.cusName}} &nbsp;&nbsp; {{item.cusType  | custType}} &nbsp;&nbsp; {{item.cusTypeInfo | custInfoType}}</span>
                <span class="fa fa-trash del-btn theme-color" @click.stop="delDataBtn(index,item)"></span>
              </div>
              <!--<transition name="slide-fade">-->
              <transition name="staggered-fade" v-bind:css="false" v-on:before-enter="beforeEnter" v-on:enter="infoEnter" v-on:leave="leave">
                <div v-show="rowShow == index" class="slide_box" style="position: relative;">
                  <p class="info-p">
                    <img class="info-icon" src="static/image/comprehensiveContract/icon-card.svg" alt="">
                    <span>证件号码：{{item.cusNum}}</span>
                  </p>
                  <p class="info-p">
                    <img class="info-icon" src="static/image/comprehensiveContract/icon-phone.svg" alt="">
                    <span>手机号码：{{item.telNum}}</span>
                  </p>
                  <p class="info-p">
                    <img class="info-icon" src="static/image/comprehensiveContract/icon-custom.svg" alt="">
                    <span>预约业务：{{item.cusType | custType}} {{item.cusTypeInfo | custInfoType}}</span>
                  </p>
                  <p class="info-p">
                    <img class="info-icon" src="static/image/comprehensiveContract/icon-time.svg" alt="">
                    <span>预约时间：{{item.start}}</span>
                  </p>
                  <p class="info-p">
                    <img class="info-icon" src="static/image/comprehensiveContract/icon-text.svg" alt="">
                    <span>预约备注：{{item.title}}</span>
                  </p>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </aui-popup>
    </div>
     <div aui-transfer-dom>
        <aui-confirm v-model="isDel" title="确认删除？" confirm-text="确定" cancel-text="取消" @confirm="delRowData()">
        </aui-confirm>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
  import EventNames from "@/common/activity-manager/activity-event-names"; //路由事件名称
  import {
    PageManager
  } from "ab-manager-page"; //页面管理
  import {
    TradeFlowManager
  } from "ab-manager-trade-flow"; //流程管理
  import MyDialog from "@/components/my-dialog";
  import fullCalendar from "@/common/api/addCalender";
  import full from "@/components/vue-fullcalendar/src/fullCalendar.vue";
  import animate from './velocity.min.js';
  import dictFn from "@/common/js/dictTran";
  export default {
    name: "client-order",
    components: {
      "full-calendar": full,
      MyDialog
    },
    data() {
      return {
        isDel : false,
        fcEvents: [],
        weekEnd: [5, 6],
        HeightStyle: "",
        showAdd: false,
        //toast
        toasttype: "warn",
        errmsg: "",
        showMore: true,
        addSlide: false,//控制新增弹窗
        rowShow: -1,
        addShow : false,
        typeList : '',//客户字典
        typeInfoList : [{key:0,value:"开户"}] ,//业务字典
        thisData : "",//当前日期
        addData : {
          'start' : '',//开始时间
          'end' : '',//截止时间
          'title' : '',//主要内容
          'cusName' : '',//客户姓名
          'cusNum' : '',//证件号
          'cusType' : '',//预约类型--对公对私
          'cusTypeInfo' : '',//预约类型--现金业务、非现金业务。。
          'telNum' : '',//电话号码
          'cusId' : '',//电话号码
        },
        listMsg: [],
        delData : {
          index : 0,
          item : {}
        },
      };
    },
    created() {
      this.typeList = dictFn.getDictJson("IDFS000315");//客户字典
      console.log("typeList" + this.typeList);
      this.queryCalendar();
      this.showMore = true;
    },
    activated() {
      this.showAdd = false;
      this.showMore = true;
    },
    detailHide() {
      this.showAdd = false;
      this.showMore = false;
    },
    deactivated() {
      this.showAdd = false;
      this.showMore = false;
      this.rowShow = -1;
    },
    computed :{
      addBtnAble (){
        if(this.addData.start == "" ||
        this.addData.title == ""   ||
        this.addData.cusName == ""   ||
        this.addData.cusNum == ""  ||
        this.addData.cusType == ""   ||
        this.addData.telNum == ""
        ){
        return true;
        } else {
          return false;
        }
      }
    },
    filters :{
      custType: function (value) {
        let MakSta='';
        if(value=='1'){
          return '对公客户'
        }else if(value=='2'){
          return '个人客户'
        }else if(value=='3'){
          return 'VIP客户'
        }else if(value=='4'){
          return 'VIP客户'
        }
        return MakSta;
      },
      custInfoType: function (value) {
        let MakSta='';
        if(value=='1'){
          return '对公业务'
        }else if(value=='2'){
          return '个人业务'
        }else if(value=='3'){
          return '贷款业务'
        }else if(value=='4'){
          return '理财'
        }
        return MakSta;
      }
    },
    methods: {
      delDataBtn(index,item){
        this.delData.index = index;
        this.delData.item = item;
        this.isDel = true;
      },
      //返回游客主页
      backToIndexPage(){
        this.$activityManager.requestUpdateView(EventNames.INDEXPAGE); //去游客的菜单页
      },

      updataVal(option){
        let newArr = new Array();
        let thisData = JSON.parse(option)
        for(let i=0;i<thisData.length;i++){
          let arrItem = {
            key : "",
            value : "",
          };
          let item = thisData[i];
          arrItem.key = parseInt(item.dictvalue);
          arrItem.value = item.dictname;
          newArr.push(arrItem);
        }
        return newArr;
      },
      // 右边新增窗口
      addSlideShow() {
        this.addSlide = true;
      },
      closePop() {
        this.addSlide = false;
        this.clearAddData();//表单数据清空
      },

      clickRow(index) {
        if (index == this.rowShow) {
          this.rowShow = -1;
        } else {
          this.rowShow = index;
        }
      },
      beforeEnter: function (el) {
        el.style.opacity = 0;
        el.style.height = 0
      },
      infoEnter: function (el, done) {
        var delay = el.dataset.index * 150;
        let chileNum = el.children.length;
        //        console.log(el);
        setTimeout(function () {
          Velocity(
            el, {
              opacity: 1,
              height: 3 * chileNum + 'vw'
            }, {
              complete: done
            }
          )
        }, delay)
      },
      enter: function (el, done) {
        var delay = el.dataset.index * 150;
        let chileNum = el.children.length;
        //        console.log(el);
        setTimeout(function () {
          Velocity(
            el, {
              opacity: 1,
              height: 4.5 * chileNum + 'vw'
            }, {
              complete: done
            }
          )
        }, delay)
      },
      leave: function (el, done) {
        var delay = el.dataset.index * 150;
        setTimeout(function () {
          Velocity(
            el, {
              opacity: 0,
              height: 0
            }, {
              complete: done
            }
          )
        }, delay)
      },
      // 新增
      addShowFn(){
        this.addShow = !this.addShow;
        this.rowShow = -1;
      },
      // 关闭新增
      addClose(){
        this.addShow = false;
      },
      // 提交新增
      addSubmit(){
        this.addkCalendar();//将数据添加到数据库
      },
      // 将数据清除
      clearAddData (){
        this.addData = {
          // 'start' : '',//开始时间
          'end' : '',//截止时间
          'title' : '',//主要内容
          'cusName' : '',//客户姓名
          'cusNum' : '',//证件号
          'cusType' : '',//预约类型--对公对私
          'cusTypeInfo' : '',//预约类型--现金业务、非现金业务。。
          'telNum' : '',//电话号码
          'cusId' : '',//电话号码
        }
      },
      moreClick(date, events) {
        this.thisData = date._d.Format("yyyy-MM-dd");
        let data = this.thisData + ' 08:00';
        this.addData.start= String(data);
        if(events.length != 0){
          this.listMsg = events;
        }else{
          this.listMsg = [];
        }
        this.addSlide = true;
      },
      // 处理日期

      //添加预约信息
      addkCalendar() {

        let submintData = {},
          vm = this,
          body = {};
        body.starttime = this.addData.start;
        body.endtime = this.addData.start;
        body.title = this.addData.title;
        body.custname = this.addData.cusName;
        body.idcard = this.addData.cusNum;
        body.custtype = this.addData.cusType;
        body.businesstype = this.addData.cusTypeInfo;
        body.telenum = this.addData.telNum;
        submintData.body = JSON.stringify(body);
        /*添加预约信息*/
        fullCalendar.addCalendar(
          submintData,
          vm,
          rsp => {
            if (rsp.ReturnCode == "000000") {
              AgreeSDK.ui.toast("预约信息添加成功");
              this.listMsg.push(this.addData);//将新数据push到数组中
              this.clearAddData();//清除数据
              this.addClose();// 关闭新增
              vm.queryCalendar();
            }else{
              AgreeSDK.ui.toast("预约信息添加失败");
            }
          },
          err => {
            console.log(err);
          }
        );
      },
      //查询预约信息
      queryCalendar() {
        let submintData = {},
          vm = this,
          body = {};
        let bookList = [];
        submintData.body = JSON.stringify(body);
        fullCalendar.queryCalendar(
          submintData,
          vm,
          rsp => {
            let result = rsp.bookingList;
            for (let i = 0; i < result.length; i++) {
              let listModel = {
                'start' : '',//开始时间
                'end' : '',//截止时间
                'title' : '',//主要内容
                'cusName' : '',//客户姓名
                'cusNum' : '',//证件号
                'cusType' : '',//预约类型--对公对私
                'cusTypeInfo' : '',//预约类型--现金业务、非现金业务。。
                'telNum' : '',//电话号码
                'cusId' : "",//id
              };
              let item = result[i];
              listModel.title = item.title + " " +item.starttime;
              listModel.start = item.starttime.slice(0,10);
              listModel.end = item.endtime.slice(0,10);
              listModel.cusName = item.custname;
              listModel.cusNum = item.idcard;
              listModel.cusType = item.custtype;
              listModel.cusTypeInfo = item.businesstype;
              listModel.telNum = item.telenum;
              listModel.cusId = item.id;

              bookList.push(listModel);
            }
            vm.fcEvents = bookList;
          },
          err => {
            console.log(err);
          }
        );
      },
      // 删除数据
      delRowData(){
        let submintData = {},
          vm = this,
          body = {};
          body.id = vm.delData.item.cusId;
        submintData.body = JSON.stringify(body);
        fullCalendar.delCalendar(
          submintData,
          vm,
          rsp => {
            if(rsp.ReturnCode == "000000"){
              AgreeSDK.ui.toast("删除成功");
              this.listMsg.splice(vm.delData.index,1);
              this.isDel = false;
              this.queryCalendar();
            }
          },
          err => {
            console.log(err);
          }
        );
      },
    },
  };

</script>
<style scoped lang="less">
  .client-order {
    font-family: SimHei;
    height: 100%;
    font-size: 16px;
  }
  .all_div {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    .page-header {
      font-weight: 600;
      .header-span {
        font-size: 18px;
      }
    }
  }

  .test-fc {
    height: calc(~"100% - "46px);
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #fff;
    padding-top: 10px;
    box-sizing: border-box;
    font-size: 16.64px;
    /* line-height:26px;*/
  }

  .list_row {
    height: 27vh;
    width: 90%;
    margin: 0 5%;
  }

  .box_p {
    text-align: left;
    font-size: 20.74px;
    font-weight: 600;
    padding-left: 5%;
  }

  .bg-success {
    background-color: #5fcbff;
  }

  .bg-info {
    background-color: #e1c287;
  }

  .bg-green {
    background-color: #74d5ac;
  }

  .bg-red {
    background-color: #ef775f;
  }

  .rol_box {
    width: 100%;
    height: 64.0px;
    line-height: 64.0px;
    text-align: left;
    font-size: 17.54px;
    border-bottom: 1px solid #e5e5e5;
    color: #505050;
  }
  /*新增dialog*/
  .input_text_width {
    width: 58%;
  }

  .text_content {
    width: 512.0px;
    height: 264.0px;
    border: 1px solid #dbdadb;
    border-radius: 10.24px;
    background: #f5f4f1;
    padding: 10.24px;
    font-size: 17.92px;
  }

  .btn_sure {
    margin-bottom: 0;
    width: 18%;
    height: 38.4px;
    line-height: 38.4px;
    background: #b89e6c;
    color: #fff;
    font-size: 17.92px;
    position: absolute;
    bottom: 38.4px;
    left: 45%;
  }
  .time_btn {
    height: 17.92px;
    padding: 10px 15px;
  }

  .textArea {
    width: 54%;
    display: inline-block;
    border: 1px solid #e5e5e5;
    vertical-align: text-top;
    font-size: 17.54px;
    margin-top: 0;
  }

  @media screen and (max-width: 860px) {

  }

  .add-slide {
    width: 100%;
    height: 100%;
    background: #F1F1F1;
    overflow: hidden;
    .slide-header {
      width: 94%;
      height: 40px;
      line-height: 40px;
      padding: 0 3%;
      display: inline-block;
      text-align: center;
      font-size: 18px;
      .header-left {
        font-size: 20px;
        margin-top: 10px;
        float: left;
      }
      .header-title {}
      .header-right {
        font-size: 20px;
        margin-top: 10px;
        float: right;
      }
    }
    .slide-box {
      width: 80%;
      height: calc(~"100% - "50px);
      background: #ffffff;
      margin: 0 auto;
      overflow-x: hidden;
      overflow-y: scroll;
    }
    .add-box{
      border-bottom: 1px solid #dddddd;
      .box-title{
        text-align: left;
        margin-left: 3%;
      }
      .add-box-row{
        width: 80%;
        margin: 0 auto;
        background: #ffffff;
        /deep/.add-row{
          height: 25px;
          font-size: 16px;
          .require-style{
            color: red;
            font-size: 16px;
          }
          .aui-cell__ft .agree-aui-input{
            .aui-cell__bd{
              input{
                width: 470px;
              }
            }
            .aui-cell__ft{
              width: 50px;
              display: inline-flex;
            }
          }
        }
        .row-data{
          /deep/.aui-cell {
          .aui-cell__ft{
            width: 98%;
            text-align: left;
          }
        }
        }
        .text-box{
          height: 110px;
          padding: 20px 15px;
          .add-textarea{
            border: 1px solid #ddd;
            height: 90px;
            width: 90%;
          }
        }

        .btn_box{
          text-align: right;
          .dialog_button{
            color: #fff;
            display: inline-block;
            font-size: 16px;
            height: 35px;
            line-height: 35px;
            &:disabled{
              background-color:#E1E1E1;
              &:before{
                color:#ADADAD;
              }
            }
          }
          .btn-close{
            color: black;
            background: #ffffff;
            border: 1px solid #ddd;
            margin: 0 20px;
          }
        }
        /deep/.aui-cell {
          .aui-cell-bd{
            width: 40%;
          }
          .aui-cell-primary{
            flex: none;
          }
          .aui-cell__ft{
            width: 98%;
            text-align: center;
          }
        }
      }
    }
  }

  .span_box {
    display: inline-block;
    width: 24%;
    text-align: center;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
  }
  .look-title-box{
    width: 91%;
    padding-left: 9%;
    height: 64.0px;
    line-height: 64.0px;
    text-align: left;
    font-size: 17.54px;
    border-bottom: 1px solid #e5e5e5;
    color: #505050;
    .del-btn{
      display: inline-block;
      height: 65px;
      width: 5%;
      line-height: 65px;
      text-align: center;
      font-size: 25px;
    }
    .span_box {
      display: inline-block;
      width: 90%;
      text-align: left;
      height: 30px;
      font-size: 16px;
      line-height: 30px;
      vertical-align: middle;
    }
  }
  .slide_box {
    width: 100%;
    height: 65px;
    font-size: 14px;
    border-bottom: 1px solid #e5e5e5;
    background-color: #ffffff;
    .info-p{
      height: 38px;
      text-align: left;
      width: 85%;
      margin-left: 10%;
      line-height: 38px;
      color: #AEACAC;
      .info-icon{
        height: 60%;
        width: 5%;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }

  .slide_row {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    padding-left: 10%;
  }

  .slide_row span {
    display: inline-block;
    width: 25%;
  }

  .slide_row span:nth-child(3) {
    margin-left: 5%;
  }

  .slide {
    padding: 0 20px;
    overflow: hidden;
    max-height: 0;
    transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
  }

  .animate {
    max-height: 9999px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
  }

  /* 可以设置不同的进入和离开动画 */

  /* 设置持续时间和动画函数 */

  .slide-fade-enter-active {
    transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-leave-active {
    transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter,
  .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */

    {
    transform: translateX(50px);
    opacity: 0;
  }
  .backTo{
    display: inline-block;
    float: left;
    margin-top: -38px;
    width: 34px;
    height:34px;
    box-sizing: border-box;
    padding:5px;
    margin-left: 30px;
    img{
      width:100%;
      height:100%;
    }
  }
</style>

