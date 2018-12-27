<template>
  <div class="setting-main">
    <x-header :left-options="{showBack:false}">
      <span>设置</span>
    </x-header>

    <div class="set-content">
      <aui-tab :active-color="selectedColor" v-model="intRatIndex" class="tab_box">
        <aui-tab-item @on-item-click="clickTabItem" class="tab_border">超时预警参数配置</aui-tab-item>
        <aui-tab-item @on-item-click="clickTabItem" class="tab_border">人数预警参数配置</aui-tab-item>
        <aui-tab-item @on-item-click="clickTabItem" class="tab_border">修改密码</aui-tab-item>
      </aui-tab>
      <aui-toast v-model="showMesAddSuccess" type="text" >修改成功！</aui-toast>
      <aui-toast v-model="showMesAddErr" type="text" >未修改成功！</aui-toast>
      <aui-toast v-model="pwdErr" type="text" >原始密码错误！</aui-toast>
      <aui-swiper v-model="intRatIndex" class="set-swiper"  :show-dots="false" >
          <!-- 超时预警参数配置 -->
          <aui-swiper-item>
            <div class="item_box" v-show="timeShow == true" >
              <div v-for="(item,index) in timeList">
                <p class="set_row">
                  <span>{{item.custtype | statusFn}}</span>
                  <span>已设置参数&nbsp;{{item.paramout}}&nbsp;min</span>
                </p>
              </div>
              <aui-button class="btn_style" @click.native="(timeShow = false)">修改</aui-button>
            </div>
            <div class="item_box" v-show="timeShow == false">
              <p class="set_row">
                <span>对公客户</span>
                <span><x-number v-model="timeNum1"  fillable class="x_number" ></x-number>min</span>
              </p>
              <p class="set_row">
                <span>个人客户</span>
               <span><x-number v-model="timeNum2"  title=""  fillable class="x_number" ></x-number>min</span>
              </p>
              <p class="set_row">
                <span>SVIP客户</span>
                <span><x-number v-model="timeNum3"  title=""  fillable class="x_number" ></x-number>min</span>
              </p>
              <p class="set_row">
                <span>VIP</span>
                <span><x-number v-model="timeNum4"  title=""  fillable class="x_number" ></x-number>min</span>
              </p>
              <aui-button class="btn_style btn_close" mini @click.native="(timeShow = true)">取消</aui-button>
              <aui-button class="btn_style btn_ok" mini @click.native="timeOk">确定</aui-button>
            </div>
          </aui-swiper-item>
          <!-- 人数预警参数配置-->
          <aui-swiper-item>
            <div class="item_box" v-show="peopleShow == true">
              <div v-for="(item,index) in peopleList">
                <p class="set_row">
                  <span>{{item.custtype | statusFn}}</span>
                  <span>已设置参数&nbsp;{{item.paramout}}&nbsp;人</span>
                </p>
              </div>
              <aui-button class="btn_style" @click.native="(peopleShow = false)">修改</aui-button>
            </div>
            <div class="item_box" v-show="peopleShow == false">
              <p class="set_row">
                <span>对公客户</span>
                <span><x-number v-model="manNum1" title=""  fillable class="x_number" ></x-number>人</span>
              </p>
              <p class="set_row">
                <span>个人客户</span>
                <span><x-number v-model="manNum2" title=""  fillable class="x_number" ></x-number>人</span>
              </p>
              <p class="set_row">
                <span>SVIP客户</span>
                <span><x-number v-model="manNum3" title=""  fillable class="x_number" ></x-number>人</span>
              </p>
              <p class="set_row">
                <span>VIP</span>
                <span><x-number v-model="manNum4" title=""  fillable class="x_number" ></x-number>人</span>
              </p>
              <aui-button class="btn_style btn_close" mini @click.native="(peopleShow = true)">取消</aui-button>
              <aui-button class="btn_style btn_ok" mini @click.native="personOk()">确定</aui-button>
            </div>
          </aui-swiper-item>

          <!-- 修改密码 -->
          <aui-swiper-item>
            <div class="item_box">
              <p class="edit_title">修改密码</p>
              <p class="edit_item">
                <span class="text_span">原密码：</span>
                <input type="text" class="text_style" v-model="passWord">
              </p>
              <p class="edit_item">
                <span class="text_span">新密码：</span>
                <input type="text" class="text_style" v-model="newPwd1" >
              </p>
              <p class="edit_item">
                <span class="text_span">确认新密码：</span>
                <input type="text" class="text_style" v-model="newPwd2">
              </p>
              <p class="edit_warning" v-if="newPwd1 != newPwd2">{{edit_warning}}</p>
              <div style="text-align: center;">
                <aui-button class="btn_style btn_ok" mini @click.native="editPwd()">确定</aui-button>
              </div>

            </div>
          </aui-swiper-item>
        </aui-swiper>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import XNumber from '@/components/x-number'  //引入x-number组件
  import setApi from  '../../common/api/setting.js'
  export default {
      name: 'setting-main',
      components:{ XNumber },
      data(){
          return{
            timeShow:true,
            peopleShow:true,
            intRatIndex: 0,
//            time修改
            timeNum1:10,
            timeNum2:10,
            timeNum3:10,
            timeNum4:10,
//            man
            manNum1:10,
            manNum2:10,
            manNum3:10,
            manNum4:10,
            timeList:'',
            peopleList:'',
            numberShow:false,
            spanShow:true,
            showMesAddSuccess:false,
            showMesAddErr:false,
            selectedColor:'#20C5FE',
            edit_warning : '两次密码输入不符',
            passWord : '',
            newPwd1 : '',
            newPwd2 : '',
            pwdErr : false
        }
      },
      mounted () {
          this.timeData();
          this.personData();
      },
//      自定义过滤器
      filters: {
        statusFn: function (value) {
          let statusname='';
          if(value==1){
            statusname="对公客户";
          }else if(value==2){
            statusname="个人客户";
          }else if(value==3){
            statusname="SVIP客户";
          }else if(value==4){
            statusname="VIP客户";
          }
          return statusname;
        },
      },
      deactivated(){
          this.timeShow = true;
          this.peopleShow = true;
          this.numberShow = false;
          this.spanShow = true
      },
      methods:{

        // 查询time数据
        timeData (){
          let vm = this,submitData = {},body={};
          body.paramtype = '1';  // 消息类型为  1-客户来访通知
          let lojinObject = JSON.parse(sessionStorage.getItem("loginObj"));
          body.unitid = lojinObject.UnitID;
          submitData.body=JSON.stringify(body);
          setApi.querySetQuery(submitData,vm,function (rsp) {
            let reutrnData = rsp;
            if(reutrnData.paramtype === '1'){
                vm.timeList = reutrnData.ParamInfo;
            }
            for(var i=1;i<5;i++){
              vm['timeNum'+i]=vm.timeList[i-1].paramout;
            }
          });
        },
        // 查询person数据
        personData (){
          let vm = this,submitData = {},body={};
          body.paramtype = '2';  // 消息类型为  1-客户来访通知
          let lojinObject = JSON.parse(sessionStorage.getItem("loginObj"));
          body.unitid = lojinObject.UnitID;
          submitData.body=JSON.stringify(body);
          setApi.querySetQuery(submitData,vm,function (rsp) {
            let reutrnData = rsp;
            if(reutrnData.paramtype === '2'){
              vm.peopleList = reutrnData.ParamInfo;
            }
            for(var i=1;i<5;i++){
              vm['manNum'+i]=vm.peopleList[i-1].paramout;
            }
          });
        },
        clickTabItem (index) {
          this.intRatIndex = index;
        },
        timeOk(){
          let vm = this,submitData = {},body={};
          body.ParamInfo = [];
          let submitNum={};
          submitNum[0] = vm.timeNum1;
          submitNum[1] = vm.timeNum2;
          submitNum[2] = vm.timeNum3;
          submitNum[3] = vm.timeNum4;
          for( var i=0;i < vm.timeList.length;i++){
           body.ParamInfo[i] = {paramid:vm.timeList[i].paramid,paramout:submitNum[i] };
          }
          submitData.body=JSON.stringify(body);
          setApi.updateSetQuery(submitData,vm,function (rsp) {
            let reutrnData = rsp;

            if(reutrnData.ReturnMessage === '成功'){
              vm.showMesAddSuccess = true;
            }else{
              vm.showMesAddErr = true;
            }
            vm.timeData();
            vm.timeShow = true;
          });
        },
        personOk(){
          let vm = this,submitData = {},body={};
          body.ParamInfo = [];
          let submitNum={};
          submitNum[0] = vm.manNum1;
          submitNum[1] = vm.manNum2;
          submitNum[2] = vm.manNum3;
          submitNum[3] = vm.manNum4;
          for( var i=0;i < vm.peopleList.length;i++){
            body.ParamInfo[i] = {paramid:vm.peopleList[i].paramid,paramout:submitNum[i] };
          }
          submitData.body=JSON.stringify(body);
          setApi.updateSetQuery(submitData,vm,function (rsp) {
            let reutrnData = rsp;
            if(reutrnData.ReturnMessage === '成功'){
              vm.showMesAddSuccess = true;
            }else{
              vm.showMesAddErr = true;
            }
            vm.personData();
            vm.peopleShow = true;
          });
        },
//        修改密码
        editPwd(){
          let vm = this,submitData = {},body={};
          let lojinObject = JSON.parse(sessionStorage.getItem("loginObj"));
          body.usercode = lojinObject.userCode;
          body.password = vm.passWord;
          body.newpassword = vm.newPwd1;
          submitData.body=JSON.stringify(body);
          setApi.editQuery(submitData,vm,function (rsp) {
            let reutrnData = rsp.data.resultMap.data.SYS_HEAD;
            if(rsp.data.code === '000000'){
              vm.showMesAddSuccess = true;
            }else {
              vm.pwdErr = true;
            }
          });
        }
      }
    }
</script>
<style scoped lang="less">
  @import "../../../static/public-style/theme-blue";
  .setting-main{
    font-size:18px;
    font-family:SimHei;
    color:#4c4c4c;
    height:100%;
    .set-content{
      height:calc(~"100% - "42px);
      overflow: hidden;
      .set-swiper{
        height:calc(~"100% - "46px);
        /deep/.aui-swiper{
          height:100%!important;
        }
      }
    }
  }
  .tab_box{
    background-color: #ffffff;
    height:44px;
    line-height:44px;
    padding-top:0;
  }
  .tab_border{
    font-size:18px;
    background-color: #E3E3E3;
    height: 46px;
    line-height:45px;
    border-right:1px solid #C5C3C5!important;
  }
  .item_box{
    width: 40%;
    height: 50%;
    margin: 128px auto;
  }
  .item_box .set_row{
    height:46px;
    line-height:46px;
    /*text-align: center;*/
  }
  .set_row span:nth-child(1){
    width: 40%;
    display: inline-block;
    text-align: center;
  }
  .set_row span:nth-child(2){
    width: 55%;
    display: inline-block;
    text-align: center;
  }
  .btn_style{
    width:25%;
    height:30px;
    line-height:30px;
    background:@theme-color;
    color:#fff;
    font-size: 18px;
    margin-top:60px;
  }
  .x_number{
    display: inline-block;
    vertical-align: middle;
    padding:10px 15px;
    /deep/.aui-cell__ft.aui-cell-primary{
      .aui-number-selector-sub {
        padding: 4px 8px 2px 8px;
        border-radius: 2px 0 0 2px;
      }
      .aui-number-selector {
        height: 20px;
        font-size: 25px;
        line-height: 18px;
        svg{
          width:18px;
          height:18px;
        }
      }
      .aui-number-input {
        height: 20px;
        font-size: 20px;
        padding: 3px 0;
      }
      .aui-number-selector-plus {
        margin-right: 5px;
        padding: 3px 8px;
        border-radius: 0 2px 2px 0;
      }
    }
  }
  .btn_close{
    margin-left: 20%;
  }
  .btn_ok{
    margin-left: 15%;
  }

  .text_span {
    display: inline-block;
    width: 35%;
    font-size: 18px;
    text-align: right;
  }
  .text_style{
    width: 40%;
    height:44px;
    border: 1px solid #DBDADB;
    border-radius: 10px;
    background: #f5f4f1;
    padding-left: 10px;
    font-size:18px;
    display: inline-block;
    line-height: 34px;
  }
  .edit_title{
    text-align: center;
    width: 100%;
    height:38px;
    line-height:38px;
    font-size:18px;
  }

  .edit_item{
    margin: 15px 0;
  }
  .edit_warning{
    font-size:16px;
    color: red;
    text-align: center;
  }
</style>
