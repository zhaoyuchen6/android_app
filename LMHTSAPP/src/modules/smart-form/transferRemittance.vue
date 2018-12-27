<template>
  <div class="transfer-vwittance">
    <x-header  :left-options="{preventGoBack:true}" class="blue-header" @on-click-back="hideMasker()">
      <span>转账汇款</span>
    </x-header>
    <div class="counter-main">
      <div class="step1" v-if="step1 == 0">
        <aui-flexbox :gutter="0">
          <aui-flexbox-item>
            <div class="smart_title">
              <div class="set-icon">
                <span class="icon-photo">
                  <span class="path1"></span><span class="path2"></span>
                </span>
              </div>
              <span>付款人</span>
            </div>
            <aui-flexbox class="account_p" :gutter="0">
              <aui-flexbox-item :span="3" class="item_lable">名称 <span class="require">*</span></aui-flexbox-item>
              <aui-flexbox-item :span="8">
                <input class="accountInput" placeholder="请输入付款户名" >
              </aui-flexbox-item>
            </aui-flexbox>
            <aui-flexbox class="account_p" :gutter="0">
              <aui-flexbox-item :span="3" class="item_lable">账号 <span class="require">*</span></aui-flexbox-item>
              <aui-flexbox-item :span="8" >
                <input class="accountInput" placeholder="请输入付款账户"  type="number">
              </aui-flexbox-item>
            </aui-flexbox>
            <aui-flexbox class="account_p" :gutter="0">
              <aui-flexbox-item :span="3" class="item_lable">开户行 <span class="require">*</span></aui-flexbox-item>
              <aui-flexbox-item :span="8">
                <select class="accountInput" style="width: 96%;">
                  <option>请选择收款银行</option>
                  <option  v-for="(item,index) in receiptBank" :key="'table'+index" v-model="item.value">{{item.name}}</option>
                </select>
              </aui-flexbox-item>
            </aui-flexbox>
            <aui-flexbox class="account_p" :gutter="0">
              <aui-flexbox-item :span="3" class="item_lable">联系方式 <span class="require">*</span></aui-flexbox-item>
              <aui-flexbox-item :span="8">
                <input class="accountInput" placeholder="请选择联系方式" type="number">
              </aui-flexbox-item>
            </aui-flexbox>
            <aui-flexbox class="account_p" :gutter="0">
              <aui-flexbox-item :span="3" class="item_lable">金额(元) <span class="require">*</span></aui-flexbox-item>
              <aui-flexbox-item :span="8">
                <input class="accountInput" placeholder="请输入付款金额" v-model="payNum" type="number">
              </aui-flexbox-item>
            </aui-flexbox>
            <aui-flexbox class="account_p" :gutter="0">
              <aui-flexbox-item :span="3" class="item_lable">大写</aui-flexbox-item>
              <aui-flexbox-item :span="8">
                <span class="accountSpan" placeholder="请输入付款金额">{{payNum | convertCurrency}}</span>
              </aui-flexbox-item>
            </aui-flexbox>
            <aui-flexbox class="account_p" :gutter="0">
              <aui-flexbox-item :span="3" class="item_lable">转账类型 <span class="require">*</span></aui-flexbox-item>
              <aui-flexbox-item :span="8">
                <select class="accountInput" style="width: 96%;">
                  <option>请选择转账类型</option>
                  <option  v-for="(item,index) in receiptType" :key="'table'+index" v-model="item.value">{{item.name}}</option>
                </select>
              </aui-flexbox-item><!--  -->
            </aui-flexbox>
          </aui-flexbox-item>
          <aui-flexbox-item>
            <div class="smart_title">
              <div class="set-icon">
                <span class="icon-photo">
                  <span class="path1"></span><span class="path2"></span>
                </span>
              </div>
              <span>收款人</span>
            </div>
            <aui-flexbox class="account_p" :gutter="0">
              <aui-flexbox-item :span="3" class="item_lable">名称 <span class="require">*</span></aui-flexbox-item>
              <aui-flexbox-item :span="8">
                <input class="accountInput" placeholder="请输入收款户名" >
              </aui-flexbox-item>
            </aui-flexbox>
            <aui-flexbox class="account_p" :gutter="0">
              <aui-flexbox-item :span="3" class="item_lable">账号 <span class="require">*</span></aui-flexbox-item>
              <aui-flexbox-item :span="8" >
                <input class="accountInput" placeholder="请输入收款账户" >
              </aui-flexbox-item>
            </aui-flexbox>
            <aui-flexbox class="account_p" :gutter="0">
              <aui-flexbox-item :span="3" class="item_lable">开户行 <span class="require">*</span></aui-flexbox-item>
              <aui-flexbox-item :span="8">
                <select class="accountInput" style="width: 96%;">
                  <option>请选择收款银行</option>
                  <option  v-for="(item,index) in receiptBank" :key="'table'+index" v-model="item.value">{{item.name}}</option>
                </select>
              </aui-flexbox-item>
            </aui-flexbox>
            <aui-flexbox class="account_p" :gutter="0">
              <aui-flexbox-item :span="3" class="item_lable"> </aui-flexbox-item>
              <aui-flexbox-item :span="8"></aui-flexbox-item>
            </aui-flexbox>
            <aui-flexbox class="account_p" :gutter="0">
              <aui-flexbox-item :span="3" class="item_lable">用途 </aui-flexbox-item>
              <aui-flexbox-item :span="8">
                <input class="accountInput" placeholder="请输入用途" >
              </aui-flexbox-item>
            </aui-flexbox>
            <aui-flexbox class="account_p" :gutter="0">
              <aui-flexbox-item :span="3" class="item_lable"></aui-flexbox-item>
              <aui-flexbox-item :span="8"></aui-flexbox-item>
            </aui-flexbox>
            <aui-flexbox class="account_p" :gutter="0">
              <aui-flexbox-item :span="3" class="item_lable">预约日期 <span class="require">*</span></aui-flexbox-item>
              <aui-flexbox-item :span="8">
                <aui-datetime v-model="orderTime"  class="time_btn" ></aui-datetime>
              </aui-flexbox-item>
            </aui-flexbox>
          </aui-flexbox-item>
        </aui-flexbox>
        <aui-flexbox :gutter="0" style="margin-top: 2.5vw">
          <aui-flexbox-item :span="6">
            <aui-button class="btm_btn" @click.native="hideMasker()">取消</aui-button>
          </aui-flexbox-item>
          <aui-flexbox-item :span="3">
            <aui-button class="btm_btn" @click.native="nextStep">提交</aui-button>
          </aui-flexbox-item>
        </aui-flexbox>
      </div>
      <div class="step2" v-if="step1 == 1">
        <div class="smaer_p">
          <p>您的排队号为</p>
          <p class="p_num">Y2342</p>
          <p>校验码为</p>
          <p class="p_num">496</p>
          <p>请确认您的手机号，我们将发送排队号到您的手机</p>
          <p><input type="text" class="phone-input" placeholder="请输入用途" value="13833454432"></p>
        </div>
        <aui-flexbox :gutter="0">
          <aui-flexbox-item :span="6">
            <aui-button class="btm_btn" @click.native="hideMasker()">取消</aui-button>
          </aui-flexbox-item>
          <aui-flexbox-item :span="3">
            <aui-button class="btm_btn" @click.native="nextStep">发送</aui-button>
          </aui-flexbox-item>
        </aui-flexbox>
      </div>
      <div class="step2" v-if="step1 == 2">
        <p class="question">
          是否有其他业务需要办理
        </p>
        <div class="sure-btn">
          <div class="btn_box"  @click="hideMasker()" style="margin-left: 25%;">
            <img src="static/image/redCircle.jpg" alt="" style="width: 100%;">
          </div>
          <div class="btn_box" @click="hideMasker()">
            <img src="static/image/blueCircle.jpg" alt="" style="width: 100%;">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import step from '@/components/step/step.vue'
  import StepItem from '@/components/step/step-item.vue'
  export default {
    name: 'transfer-vwittance',
    props: ['custid'],
    data(){
      return {
        custInfo:'',
        notSignedInfo:'',
        productInfo:'',
        hideMasker(){
          this.$emit('hideMasker');
          this.step1=0;
        },
//        HeightStyle: 'height: ' + (window.screen.availHeight - 145) + 'px; overflow-y: auto; overflow-x: hidden;margin-top:.8vw;background-color:#fff;',
        demo01: 0,
        value1: '2015-11-12',
        step1: 0,
        payAccount : '',
        payName : '',
        payNum : '',
        receiptAccount : '',
        receiptName : '',
        receiptBank : [
          {name:'招商银行',value:1},
          {name:'浦发银行',value:2},
          {name:'北京银行',value:3},
          {name:'工商银行',value:4},
        ],
        paySay : '',
        orderTime : '',
        receiptType : [
          {name:'实时',value:1},
          {name:'普通',value:2},
          {name:'预约日期',value:3},
        ],

      }
    },
    created(){
      this.showMenu=false;
    },
    beforeDestroy(){
   if(this.$store.state.loginRole!='visitor'){
       this.showMenu=true
   }
    },
    computed:{
      showMenu:{
        get(){
          return this.$store.state.showMenu;
        },
        set(val){
          this.$store.commit('setShowMenu',val);
        }
      },
    },
    methods: {
      queryCustInfo(custid){
        let vm = this;
        let  submitData = {};
        submitData.custid=custid;
        monitoringjs.queryCustInfo(submitData,function (rsp) {
          let returnData=rsp.data.resultMap.data.Body;
          vm.custInfo=returnData.customerList[0];
          vm.notSignedInfo=returnData.notSignedList;
          vm.productInfo=returnData.productList;
        });
      },
      onEvent (event) {
        console.log('on', event)
      },
      change (value) {
        console.log('change', value)
      },
      nextStep () {
        this.step1 ++
      },
    },
    filters: {
      sexFn: function (value) {
        let MakSta='';
        if(value=='0'){
          return '男'
        }else if(value=='1'){
          return '女'
        }else{
          return '未知'
        }
        return MakSta;
      },
      levelFn: function (value) {
        let MakSta='';
        if(value=='1'){
          return '普通'
        }else if(value=='2'){
          return '金卡'
        }else if(value=='3'){
          return 'VIP'
        }
      },
      convertCurrency : function (money) {
        //汉字的数字
        var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
        //基本单位
        var cnIntRadice = new Array('', '拾', '佰', '仟');
        //对应整数部分扩展单位
        var cnIntUnits = new Array('', '万', '亿', '兆');
        //对应小数部分单位
        var cnDecUnits = new Array('角', '分', '毫', '厘');
        //整数金额时后面跟的字符
        var cnInteger = '整';
        //整型完以后的单位
        var cnIntLast = '元';
        //最大处理的数字
        var maxNum = 999999999999999.9999;
        //金额整数部分
        var integerNum;
        //金额小数部分
        var decimalNum;
        //输出的中文金额字符串
        var chineseStr = '';
        //分离金额后用的数组，预定义
        var parts;
        if (money == '') { return ''; }
        money = parseFloat(money);
        if (money >= maxNum) {
          //超出最大处理数字
          return '';
        }
        if (money == 0) {
          chineseStr = cnNums[0] + cnIntLast + cnInteger;
          return chineseStr;
        }
        //转换为字符串
        money = money.toString();
        if (money.indexOf('.') == -1) {
          integerNum = money;
          decimalNum = '';
        } else {
          parts = money.split('.');
          integerNum = parts[0];
          decimalNum = parts[1].substr(0, 4);
        }
        //获取整型部分转换
        if (parseInt(integerNum, 10) > 0) {
          var zeroCount = 0;
          var IntLen = integerNum.length;
          for (var i = 0; i < IntLen; i++) {
            var n = integerNum.substr(i, 1);
            var p = IntLen - i - 1;
            var q = p / 4;
            var m = p % 4;
            if (n == '0') {
              zeroCount++;
            } else {
              if (zeroCount > 0) {
                chineseStr += cnNums[0];
              }
              //归零
              zeroCount = 0;
              chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
            }
            if (m == 0 && zeroCount < 4) {
              chineseStr += cnIntUnits[q];
            }
          }
          chineseStr += cnIntLast;
        }
        //小数部分
        if (decimalNum != '') {
          var decLen = decimalNum.length;
          for (var i = 0; i < decLen; i++) {
            var n = decimalNum.substr(i, 1);
            if (n != '0') {
              chineseStr += cnNums[Number(n)] + cnDecUnits[i];
            }
          }
        }
        if (chineseStr == '') {
          chineseStr += cnNums[0] + cnIntLast + cnInteger;
        } else if (decimalNum == '') {
          chineseStr += cnInteger;
        }
        return chineseStr;
      }
    }
  }
</script>
<style scoped lang="less">
@import '../../../static/public-style/theme-blue.less';
  .transfer-vwittance{
    height:100%;
  }
  .account_p{
    height: 50px;
    width: 95%;
    margin: 13px 7.68px;
    .item_lable{
      height: 34px;
      display: inline-block;
      vertical-align: middle;
      line-height: 34px;
      font-size: 16px;
      text-align: right;
      letter-spacing:2px;
      padding-right:10px;
    }
    .accountInput{
      width: 90%;
      height: 34px;
      display: inline-block;
      border: 1px solid  @theme-color;
      border-radius: 10px;
      padding: 0 3%;
      outline:none;
    }
  }
  .time_btn{
    border: 1px solid @theme-color;
    border-radius: 6.4px;
    text-align: center;
  }
  .table_title{
    height: 38.4px;
    line-height: 38.4px;
    text-align: center;
  }
  .title_box{
    border: 1px solid #f5f4f1;
  }
  .vux-button-group > a.vux-button-group-current {
     color: #FFF;
     background: #E1C287;
   }
  .data_btn{
    background-color: #FEF8EA;
    border: 1px solid #E1C287;
    color: #E1C287;
  }
  .vux-button-group > a.vux-button-tab-item-middle:after{
    border-top: none;
    border-right: none;
    border-bottom: none;
  }
  .vux-button-group > a.vux-button-tab-item-first:after{
    border: none;
  }
  .vux-button-group > a.vux-button-tab-item-last:after{
    border-top: none;
    border-right: none;
    border-bottom: none;
  }
  .search_btn{
    background-color: #FEF8EA;
    border: 1px solid #E1C287;
    color: #E1C287;
    width: 112.8px;
    float: left;
    height: 29.44px;
  }
  .table_body{
    height: 38.4px;
    line-height: 38.4px;
    text-align: center;
  }
  .pp_alert{
    text-align: right;
    width: 100%;
  }
  .pp_alert img{
    width: 25%;
  }
  .pp_alert span{
    font-size: 16px;
    margin-bottom: 6.4px;
    font-weight: 600;
  }
  .pp_warning{
    width: 100%;
    padding-right: 20%;
  }
  .alert_p{
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    border-bottom: 1px solid black;
    width: 80%;
    margin: 17.92px auto;
  }
  .btm_btn{
    background-color: @theme-color-bg;
    color: @title-color-font;
    width: 114px;
    float: left;
    height: 38px;
    margin-left: 43%;
    line-height: 38px;
    vertical-align: middle;
    font-size: 18px;
  }
  .btn_wrap {
    padding: 0 12.8px;
    margin-top: 25.6px;
  }
  .weui-icon-success-no-circle{
    font-size: 23.04px;
    color: red;
  }
  .vux-step-item-head-process .vux-step-item-head-inner {
    border: 1px solid red;
    color: #FFF;
    background: red none repeat scroll 0 0;
  }
  .step2_box{
    border: 1px solid #e5e5e5;
    width: 90%;
    margin: 0 auto;
    height: 384.0px;
  }
  .step_header{
    height: 64.0px;
    text-align: center;
    width: 100%;
    border-bottom: 1px solid #e5e5e5;
  }
  .step_header img{
    width: 18%;
    margin-top:6.4px;
  }
  .step_data{
    width: 95%;
    height: 38.4px;
    border-bottom: 1px solid #e5e5e5;
    padding-left: 5%;
  }
  .step_data p{
    height: 20px;
    line-height: 20px;
  }
  .step_main{
    width: 100%;
    height: 102.4px;
    border-bottom: 1px solid #e5e5e5;
  }
  .step_main .main_box{
    width: 49.9%;
    height: 102.4px;
    display: inline-block;
    float: left;
    border-right: 1px solid #e5e5e5;
  }
  .main_left{
    width: 20%;
    border-right: 1px solid #e5e5e5;
    height: 100%;
    float: left;
  }
  .main_center{
    float: left;
    width: 29.5%;
    height: 100%;
    border-right: 1px solid #e5e5e5;
    text-align: center;
  }
  .main_center p{
    width: 100%;
    height: 33.28px;
    line-height: 33.28px;
    border-bottom: 1px solid #e5e5e5;
  }
  .main_center p:nth-child(3){
    border-bottom: none;
  }
  .main_three{
    float: left;
    width: 50%;
    height: 100%;
    text-align: center;
  }
  .main_three p{
    width: 100%;
    height: 33.28px;
    line-height: 33.28px;
    border-bottom: 1px solid #e5e5e5;
  }
  .main_three p:nth-child(3){
    border-bottom: none;
  }
  .main_left p{
    line-height: 33.28px;
    text-align: center;
  }
  .step_row{
    width: 100%;
    border-bottom: 1px solid #e5e5e5;
    height: 25.6px;
    line-height: 25.6px;
    text-align: center;
  }
  .row_title{
    width: 9.9%;
    float: left;
    height: 25.6px;
    line-height: 25.6px;
    border-right: 1px solid #e5e5e5;
  }
  .row_main{
    width: 39.9%;
    float: left;
    height: 25.6px;
    line-height: 25.6px;
    border-right: 1px solid #e5e5e5;
  }
  .step_row .row_main:nth-child(4){
    width: 39.5%;
    border-right: none;
  }
  .im_alert p{
    line-height:20px;
    height:20px;
  }
  .smart_title{
    height:52px;
    line-height: 52px;
    padding-left: 8%;
    letter-spacing:5px;
  }
  .smart_title img{
    width: 38.4px;
    vertical-align: middle;
    margin-right: 2%;
  }
 /* .smart_title span{
    font-size: 17.92px;
    vertical-align: middle;
  }*/
  .require{
    color: #C91F17;
    font-size: 17.92px;
  }
  .time_btn{
    height: 12.8px;
  }
  .smaer_p{
    width: 100%;
    height:400px;
    padding-top:60px;
    box-sizing: border-box;
  }
  .smaer_p p{
    height:40px;
    width: 100%;
    line-height:40px;
    text-align: center;
    font-size: 18px;
  }
  .p_num{
    color:#CA261E;
    font-weight: 600;
  }
  .counter-main{
    height: calc(~"100% - "42px);
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #fff;
    padding:42px 0;
    box-sizing: border-box;
  }
  .set-icon{
    font-size:28px;
    display: inline-block;
    vertical-align: middle;
    letter-spacing: 0;
    .path1:before{
      color:@theme-color-font;
    }
  }
  .step2{
    height:100%;
  }
  .phone-input{
    width: 30%;
    height:46px;
    display: inline-block;
    border: 1px solid #4C4C4C;
    border-radius:10px;
    padding: 0 3%;
    font-size:14px;
    margin-top:14px;
    outline:none;
  }
  .question{
    text-align: center;
    font-size: 20px;
  }
  .sure-btn{
    margin-top:100px;
    .btn_box{
      width: 220px;
      height: 220px;
      background-size: contain;
      background-repeat: no-repeat;
      display: inline-block;
      margin: 64px;
    }
  }
</style>
