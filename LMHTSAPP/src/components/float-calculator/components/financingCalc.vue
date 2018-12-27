<!--理财计算器-->
<template>
  <div class="financingc-cal">
    <aui-group class="content">
      <aui-input title="投资金额" placeholder="借款金额" text-align="right" v-model="amount" :is-type="amountReg" ref="amountInput"><span slot="right">元</span></aui-input>
      <aui-input title="年化收益" placeholder="年化利率" text-align="right" v-model="rate" :is-type="rateReg" ref="rateInput"><span slot="right">%</span></aui-input>
      <aui-cell title="借款期限"  class="set-term" >
        <aui-input placeholder="0" v-model="termNum" :is-type="termReg" text-align="right" class="term-input" ref="termInput">
        </aui-input>
        <aui-button-tab slot="child" v-model="termType" class="term-type">
          <aui-button-tab-item>月</aui-button-tab-item>
          <aui-button-tab-item>天</aui-button-tab-item>
        </aui-button-tab>
      </aui-cell>
      <aui-selector title="还款方式" :options="repaymentList" v-model="repayment" direction="rtl"></aui-selector>
      <aui-cell title="投资金额">
        <span class="set-result">{{amountResult}}</span>元
      </aui-cell>
      <aui-cell title="投资期限">
        <span class="set-result">{{termResult}}</span>个月
      </aui-cell>
      <aui-cell title="利息收益">
        <span class="set-result">{{interest}}</span>元
      </aui-cell>
      <aui-cell title="本息合计">
        <span class="set-result">{{total}}</span>元
      </aui-cell>
    </aui-group>
    <div class="set-table"  v-show="showTable" @mousedown="enterTable" @touchstart="enterTable"
         @mousemove="enterTable" @touchmove="enterTable"
         @mouseup="leaveTable" @touchend="leaveTable" >
      <p class="table-head">
        <span v-for="(item,index) in headList">{{item}}</span>
      </p>
      <ul class="table-body">
        <li v-for="(result,index) in resultList">
          <span v-for="(item,index) in result">{{item}}</span>
        </li>
      </ul>
    </div>
    <div class="button-group">
      <aui-button @click="toCalc" :disabled="forbidCalc" class="calc-button btn-orange">计算</aui-button>
      <aui-button @click="reset" class="calc-button btn-gray">重置数据</aui-button>
    </div>
  </div>
</template>

<script>
   // import "./js/"
    export default {
        name: "financing-calc",
        data(){
          return {
            headList:["期数","每月还款本息","应还本金","应还利息","剩余回款本息"], //
            amount:"",   //金额
            amountResult:"",//金额-结果显示
            rate:"",     //利率
            repayment:1,   //还款方式
            repaymentList:[
              {key:1,value:"按月付息，到期还本"},
              {key:2,value:"等额本息"},
              {key:3,value:"一次性还本付息"},
              ],
            termNum:"",    //期限值
            termResult:"",  //期限-结果显示
            termType:0,  //期限类型
            interest:"",  //利息收益
            total:"",    //本息合计
            resultList:[],  //结果列表
          }
        },
       beforeDestroy(){
          this.reset();
        },
        watch:{
          termType(val){
            if(val===0){
              this.repayment=1;
              this.repaymentList=[
                {key:1,value:"按月付息，到期还本"},
                {key:2,value:"等额本息"},
                {key:3,value:"一次性还本付息"},
              ]
            }else if(val===1){
              this.repayment=3;
              this.repaymentList=[{key:3,value:"一次性还本付息"}];
            }
          }
        },
        computed:{
          //控制结果显示表格的显隐
          showTable:{
            get(){
              return this.$store.state.showTable;
            },
            set(val){
              this.$store.commit('setShowTable',val);
            }
          },
          //必填项是否全部填写
          forbidCalc(){
            return this.amount===""||this.rate===""||this.termNum===""||!this.validResult;
          },
          //表单验证结果
          validResult(){
            return this.$refs.amountInput.valid && this.$refs.rateInput.valid && this.$refs.termInput.valid;
          },
          //结果是否为空
          emptyResult(){
            return this.amountResult===''&&this.termResult===''&&this.interest===''&&this.total===''&&this.resultList.length===0;
          }
        },
        methods:{
          //金额规则
          amountReg:function(value){
            let val=parseFloat(value);
            return {
              valid:val>=100 && val<=2000000,
              msg:"资金额输入应在100~2,000,000之间！"
            }
          },
          //年化利率规则
          rateReg:function(value){
            let val=parseFloat(value);
            return{
              valid:val>0 && val<=50,
              msg:"年利率应在0~50%之间！"
            }
          },
          //期限规则
          termReg:function(value){
            let type=this.termType;
            let valFloat=parseFloat(value);
            let valInt=parseInt(value);
            let result={};
            if(valFloat<0){
              result={
                valid:false,
                msg:"投资期限不能小于0！"
              }
            }
            else if(valFloat!==valInt){
              result={
                valid:false,
                msg:"投资期限不能为小数！"
              }
            }
            else if(type===0 && valFloat>48){
              result={
                valid:false,
                msg:"期限不能超过48个月！"
              }
            }
            else if(type===1 && valFloat>1049){
              result={
                valid:false,
                msg:"借款期限不能超过1095天！"
              }
            }else{
              result={
                valid:true
              }
            }
            return result;
          },
          //计算
          toCalc(){
            if(!this.emptyResult){
              this.resetResult();
            }
            let type=parseInt(this.repayment);  //还款方式
            let termType=this.termType;   //期限类型
            let term=parseInt(this.termNum);   //期限值
            let amount=parseFloat(this.amount);  //借款金额
            let rate=parseFloat(this.rate);      //年化利率
            if(termType===1){
              term=(term/30).toFixed(1);   //期限类型为天，转化为月
            }
            //按月付息 到期还本
            if(type===1){
              let sum= amount * rate / 100* (term / 12);
              let sumfinal = sum.toFixed(2);
              let sumfinalEve = (sumfinal /term).toFixed(2);
              this.termResult=term;  //投资期限
              this.amountResult=amount.toFixed(2);  //投资金额
              this.interest=sumfinal;   //利息收益
              this.total=(amount*1 + sumfinal*1).toFixed(2);   //本息合计
              //结果显示列表赋值
              let dataList=[];
              for(let i=1;i<term;i++){
                let item=[i,sumfinalEve+"元",'0元',sumfinalEve+"元",(parseFloat(amount) * 1 + sumfinal * 1 - sumfinalEve
                  * i).toFixed(2)+"元"];
                dataList.push(item);
              }
              let item=[term,(parseFloat(amount) * 1 + sumfinalEve * 1).toFixed(2)+"元",parseFloat(amount).toFixed(2)+"元",sumfinalEve+"元","0元"];
              dataList.push(item);
              this.resultList=dataList;
            }else if(type===2){  //等额本息
               this.investCalc(amount,rate,term,type);
            }else if(type===3){  //一次性连本付息
              let sum = amount * rate / 100 * (term / 12);
              let sumfinal = sum.toFixed(2);
              this.amountResult=amount;  //投资金额
              this.termResult=term;  //投资期限
              this.total=(amount*1 + sumfinal*1).toFixed(2);   //本息合计
              this.interest=sumfinal;   //利息收益
            }
            if(type!==3){
              this.showTable=true;
            }
          },
          //重置结果
          resetResult(){
            this.amountResult=""; //金额-结果显示
            this.termResult="";  //期限-结果显示
            this.interest="";  //利息收益
            this.total="";   //本息合计
            this.resultList=[];  //结果显示列表
            this.showTable=false;
          },
          //重置界面
          reset(){
            this.amount="";   //金额
            this.rate="";     //利率
            this.repayment=1;   //还款方式
            this.termNum="";    //期限值
            this.repaymentList=[
              {key:1,value:"按月付息，到期还本"},
              {key:2,value:"等额本息"},
              {key:3,value:"一次性还本付息"},
            ];
            this.termType=0;  //期限类型
            this.resetResult();
          },
          //等额本息 结果赋值
          investCalc(amount,rate,term,type){
            let jkje =  amount;  //借款金额
            let datalist = new Array(term);
            if(amount){
              if(term){
                if(rate){
                  datalist = this.calculate(amount,rate,term);
                  this.amountResult=amount.toFixed(2); //投资金额
                  this.termResult=term;  //投资期限
                  this.resultList=datalist;
                }
              }
            }
          },
          //等额本息  计算结果显示列表
          calculate(amount,rate,term){
            let Deadline =term;  //借款期限
            let Amount = amount;  //借款金额
            let Rate = rate/ 1200;   //  年化利率/100/12
            let datalist = new Array(Deadline);
            let a; // 偿还本息
            let b; // 偿还利息
            let c; // 偿还本金
            let TotalRate = (Amount * Deadline * Rate * Math.pow((1 + Rate),Deadline))/ (Math.pow((1 + Rate), Deadline) - 1) - Amount;   //总利息
            let TotalRepay = TotalRate + Amount;//本金+利息
            let d = Amount + TotalRate; // 剩余本金
            TotalRate = Math.round(TotalRate * 100) / 100;// 支付总利息
            TotalRepay = Math.round(TotalRepay * 100) / 100;
            a = TotalRepay / Deadline;
            a = Math.round(a * 100) / 100;// 支付总还款额
            for (let i = 1; i <= Deadline; i++) {
              b = (Amount * Rate * (Math.pow((1 + Rate), Deadline) - Math.pow((1 + Rate), (i - 1))))/ (Math.pow((1 + Rate), Deadline) - 1);
              b = Math.round(b * 100) / 100;
              c = a - b;
              c = Math.round(c * 100) / 100;
              d = d - a;
              d = Math.round(d * 100) / 100;
              if (i === Deadline) {
                 c = c + d;
                 b = b - d;
                 c = Math.round(c * 100) / 100;
                 b = Math.round(b * 100) / 100;
                 d = 0;
              }
              let tempList = new Array([ 5 ]);
              tempList[0] = i;// 期数
              tempList[1] = a.toFixed(2);// 偿还本息
              tempList[2] = b.toFixed(2);// 偿还利息
              tempList[3] = c.toFixed(2);// 偿还本金
              tempList[4] = d.toFixed(2);// 剩余本金
              datalist[i - 1] = tempList;
            }
            let lab_totalmomey = (Math.round((Amount + TotalRate) * 100) / 100).toFixed(2);
            this.interest=TotalRate;  //利息收益
            this.total=lab_totalmomey;  //本息合计
            return datalist;
          },
          //滑动表格
          enterTable(){
            this.$store.commit('setTouchTable',true);
          },
          leaveTable(){
            this.$store.commit('setTouchTable',false);
          }
        }
    }
</script>

<style scoped lang="less">
  .cal-tabs {
    border-bottom: 1px solid #dfdfdf;
    position: absolute;
    right: 0;
    top: -4px;
  }
  .calc-title {
    font-size: 20px;
    line-height: 28px;
  }
  .calc-tab.active {
    border-bottom: 2px solid #fc6700;
    color: #fc6700;
    line-height: 40px;
  }
  .calc-tab {
    cursor: pointer;
    display: inline-block;
    font-size: 16px;
    height: 42px;
    line-height: 42px;
    text-align: center;
  }
  .p-0 {
    padding: 0 !important;
  }
  .mt-15 {
    margin-top: 15px !important;
  }
  .mt-10 {
    margin-top: 10px !important;
  }
  .rel {
    position: relative;
  }
  .form-control {
    box-shadow: none;
  }.calc-addon {
     background: rgba(0, 0, 0, 0) none repeat scroll 0 center;
   }
  .carl-record {
    font-size: 14px;
  }
  .carl-record {
    font-size: 14px;
  }
  .calc-label {
    font-size: 14px;
    line-height: 34px;
    text-align: right;
  }

  .spanfont {
    color: #666666;
    font-family: "微软雅黑";
    font-size: 14px;
  }

  .spanje {
    color: #ff6b00;
    font-size: 24px;
  }
  .reset{
    background: #666 none repeat scroll 0 0;
    border: 0 none;
    border-radius: 3px;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-family: "微软雅黑";
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    margin-top: 30px;
    outline: 0 none;
    text-align: center;
    width: 90px;
  }
  .sub{
    background: #53a0e3 none repeat scroll 0 0;
    border: 0 none;
    border-radius: 3px;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-family: "微软雅黑";
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    margin-top: 30px;
    outline: 0 none;
    text-align: center;
    width: 90px;
  }
  /*理财计算器整体样式*/
  .financingc-cal{
    height:450px;
    width:458px;
    box-sizing: border-box;
  }
  .content{
    /deep/.aui-cells{
      background-color: #e6e6e6
    };
  }
  /*借款期限设置*/
  .set-term{
    .term-input{
      padding:0;
    }
    /deep/.aui-label{
      width:70px;
    }
  }
  /*仿表格 td样式*/
  .set-td{
    display: inline-block;
    white-space: nowrap;
    &:nth-child(1){
      width:10%;
    }
    &:nth-child(2){
      width:25%;
    }
    &:nth-child(3){
      width:20%;
    }
    &:nth-child(4){
      width:20%;
    }
    &:nth-child(5){
      width:25%;
    }
  }
  /*结果展示---表格样式*/
  .set-table{
    position: absolute;
    height:503px;
    width:458px;
    left:458px;
    font-size:16px;
    top:0;
    background-color:#fff;
    box-sizing: border-box;
    .table-head{
      background-color: #F7F7F7;
      height:44px;
      line-height: 44px;
      text-align: center;
      span{
        .set-td;
      }
    }
    .table-body{
      list-style: none;
      height:458px;
      overflow-y: auto;
      li{
        height:40px;
        line-height:40px;
        text-align: center;
        &:nth-child(2n){
          background-color: #F5F5F5;
        }
        span{
          .set-td;
        }
      }
    }
  }
  /*期限类型选择*/
  .term-type{
    width:100px;
  }
  /*按钮样式*/
  .button-group{
    display: flex;
    align-items: center;
    height:78px;
    background-color: #e6e6e6;
  }
  .calc-button{
    height:42px;
    width:40%;
    &:nth-child(2){
      margin-top: 0;
    }
  }
  /*计算结果--数据*/
  .set-result{
    color:#fc6700;
    font-size:20px;
    font-weight: bold;
  }

</style>
