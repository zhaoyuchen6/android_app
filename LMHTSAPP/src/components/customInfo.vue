<template>
  <div class="custom-info">
    <x-header :left-options="{preventGoBack:true}" class="blue-header" @on-click-back="hideMasker">
      <span>客户信息</span>
    </x-header>
    <div class="box_left">
      <div class="left_row" style="height: 30%">
        <div class="bb_left">
          <span class="icon-people set-icon"></span>
        </div>
        <div class="bb_right" >
          <p class="set-font">客户基本信息</p>
          <p>
            <span>客户号：{{custInfo.custno}}</span>
            <span style="margin-left: 10%;">姓名：{{custInfo.custname}}</span>
            <span style="margin-left: 15%;">性别：{{custInfo.sex |sexFn}}</span>
          </p>
          <p>
            <span>客户级别：{{custInfo.custlevel | levelFn}}</span>
            <span style="margin-left: 15%;">卡号：{{custInfo.cardno}}</span>
          </p>
          <p class="btn-group">
            <span class="zz_btn">热销产品</span>
            <span class="zz_btn">推荐产品</span>
          </p>
        </div>
      </div>
      <div class="left_row">
        <div class="bb_left">
          <span class="icon-asset set-icon"></span>
        </div>
        <div class="bb_right right_num">
          <p class="set-font">客户资产信息</p>
          <p>
            <span class="text_span">总资产：{{custInfo.totalasset}}</span>
            <span >基金总资产：{{custInfo.totalfund}}</span>
          </p>
          <p>
            <span class="text_span">保险总资产：{{custInfo.totalinsurance}}</span>
            <span >债券总资产：{{custInfo.totalbond}}</span>
          </p>
          <p>
            <span class="text_span">理财总资产：{{custInfo.totalfinancial}}</span>
            <span >其他总资产：{{custInfo.totalother}}</span>
          </p>
          <p>
            <span class="text_span">存款总额：{{custInfo.totaldeposit}}</span>
            <span >贷款总额：{{custInfo.totalloan}}</span>
          </p>
          <p>
            <span>信用卡余额：{{custInfo.totalcredit}}</span>
          </p>
        </div>
      </div>
      <div class="left_row" style="border-bottom: none;">
        <div class="bb_left"></div>
        <div class="bb_right">
          <p style="width: 25%;float: left">客户资产占比</p>
          <div ref="customerAssets" class="set-chart"></div>
        </div>
      </div>
    </div>
    <div class="box_right">
      <div class="left_row">
        <div class="bb_left">
          <span class="icon-trend set-icon"></span>
        </div>
        <div class="bb_right" style="height: 30%">
          <p class="set-font">拥有我行产品</p>
          <p style="color: #C9C6C9">客户已签约</p>
          <span class="box_card" v-for="(item,index) in productInfo" v-if="item.producttype==1">理&nbsp;&nbsp;&nbsp;&nbsp;财</span>
          <span class="box_card" v-for="(item,index) in productInfo" v-if="item.producttype==2">基&nbsp;&nbsp;&nbsp;&nbsp;金</span>
          <span class="box_card" v-for="(item,index) in productInfo" v-if="item.producttype==3">保险产品</span>
          <span class="box_card" v-for="(item,index) in productInfo" v-if="item.producttype==4">贵金属</span>
          <span class="box_card" v-for="(item,index) in productInfo" v-if="item.producttype==5">银行卡产品</span>
          <span class="box_card" v-for="(item,index) in productInfo" v-if="item.producttype==6">贷&nbsp;&nbsp;&nbsp;&nbsp;款</span>

        </div>
      </div>
      <div class="left_row" style="height: 24%">
        <div class="bb_left"></div>
        <div class="bb_right">
          <p class="title">客户未签约</p>
          <span class="box_card" v-for="(item,index) in notSignedInfo" v-if="item.notsigned==1">理&nbsp;&nbsp;&nbsp;&nbsp;财</span>
          <span class="box_card" v-for="(item,index) in notSignedInfo" v-if="item.notsigned==2">基&nbsp;&nbsp;&nbsp;&nbsp;金</span>
          <span class="box_card" v-for="(item,index) in notSignedInfo" v-if="item.notsigned==3">保险产品</span>
          <span class="box_card" v-for="(item,index) in notSignedInfo" v-if="item.notsigned==4">贵金属</span>
          <span class="box_card" v-for="(item,index) in notSignedInfo" v-if="item.notsigned==5">银行卡产品</span>
          <span class="box_card" v-for="(item,index) in notSignedInfo" v-if="item.notsigned==6">贷&nbsp;&nbsp;&nbsp;&nbsp;款</span>
        </div>
      </div>
      <div class="right_row">
        <p style="padding-left: 8%">#签约账户#</p>
        <p>
          <span class="text_span" v-for="(item,index) in productInfo" v-if="item.producttype==1">理财产品：{{item.productvalue1}}</span>
          <span class="text_span" v-for="(item,index) in productInfo" v-if="item.producttype==2">基金：{{item.productvalue2}}</span>
          <span class="text_span" v-for="(item,index) in productInfo" v-if="item.producttype==3">保险：{{item.productvalue3}}</span>
          <span class="text_span" v-for="(item,index) in productInfo" v-if="item.producttype==4">贵金属：{{item.productvalue4}}</span>
          <span class="text_span" v-for="(item,index) in productInfo" v-if="item.producttype==5">银行卡：{{item.productvalue5}}</span>
          <span class="text_span" v-for="(item,index) in productInfo" v-if="item.producttype==5">贷款：{{item.productvalue6}}</span>
        </p>
      </div>
      <div class="right_row" style="border-bottom: none;">
        <p>#签约账户#</p>
        <p>
          <span>最近6个月账户发生额</span>
          <span style="margin-left: 15%;">入账</span>
          <span style="margin-left: 15%;">{{custInfo.income}}</span>
        </p>
        <p>
          <span>最近6个月账户发生额</span>
          <span style="margin-left: 15%;">出账</span>
          <span style="margin-left: 15%;">{{custInfo.expenditure}}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import monitoringjs from '@/common/api/monitoring'
import XHeader from '@/components/x-header'
import {customerAssets} from '@/modules/queue-monitoring/queue-monitoring-data'  //引入配置和数据

export default {
  name: 'custom-info',
  components: { XHeader },
  props: ['custid'],
  data(){
    return {
      custInfo:'',
      notSignedInfo:'',
      productInfo:'',
      customerAssetsOption:customerAssets,
    }
  },
  mounted(){
    this.drawPie();
  },
  methods: {
      //查询客户信息
      queryCustInfo(custid){
        let vm = this;
        let submitData = {},body={};
        body.custid=custid;
        submitData.body=JSON.stringify(body);
        monitoringjs.queryCustInfo(submitData,vm,function (rsp) {
          let returnData=rsp;
          vm.custInfo=returnData.customerList[0];
          vm.notSignedInfo=returnData.notSignedList;
          vm.productInfo=returnData.productList;
        });
      },
      //绘制客户资产占比图
      drawPie(){
        let element=this.$refs.customerAssets;
        let myChart=this.$echarts.init(element);
        let option=this.customerAssetsOption;
        myChart.setOption(option);
      },
      //关闭页面
      hideMasker(){
        this.$emit('hideMasker');
      },
  },
  filters: {
    //判断性别
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
    //判断客户等级
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
  }
}
</script>
<style scoped lang="less">
  @import '../../static/public-style/theme-blue.less';
  .custom-info{
    width: 100%;
    height:100%;
    overflow: auto;
    font-family:SimHei;
  }
  .box_left{
    width: 49.5%;
    height: calc(~"100% - "66px);
    background-color: #ffffff;
    float: left;
  }
  .box_right{
    width: 49.5%;
    height: calc(~"100% - "66px);
    margin-left: 1%;
    background-color: #ffffff;
    float: left;
  }
  .left_row{
    width: 100%;
    height: 33.1%;
    border-bottom: 3px dotted #D7D7D7;
  }
  .left_row .bb_left{
    width: 15%;
    float: left;
    height: 100%;
  }
  .left_row .bb_right{
    width: 80%;
    float: left;
    height: 100%;
    padding: 0 2.5%;
    font-size:16px;
  }
  .bb_left .set-icon{
    float: right;
    margin: 12px 12px 0 0;
    font-size:30px;
    color:@theme-color-font;
    width: 32px;
    height:32px;
    img{
     width:100%;
     height:100%;
    }
  }
  .bb_right p{
    height: 30px;
    line-height:30px;
    font-size:16px;
  }
  .right_num p{
    height: 34px;
    line-height:34px;
  }
  .right_num p span:nth-child(2){
    margin-left: 15%;
  }
  .box_card{
    width: 36%;
    margin-right: 5%;
    height:38px;
    background-color: #F5F4F1;
    line-height:38px;
    text-align: center;
    border-radius:12px;
    float: left;
    margin-top:8px;
  }
  .right_row{
    width: 100%;
    height: 20%;
    border-bottom: 3px dotted #D7D7D7;
  }
  .right_row p{
    height:40px;
    line-height: 64px;
    font-size:18px;
    padding-left: 11%;
  }
  /*闪烁动画*/
  @-webkit-keyframes magentaPulse {
    from { background-color: #F5F4F1; -webkit-box-shadow: 0 0 12px #333; }
    50% { background-color: #a9014b; -webkit-box-shadow: 0 0 18px #a9014b; }
    to { background-color: #F5F4F1; -webkit-box-shadow: 0 0 12px #333; }
  }
  span.bling{-webkit-animation-iteration-count: infinite;}
  .magentaPulse.bling{-webkit-animation-name:magentaPulse;-webkit-animation-duration:3s;}
  /*tab*/
  .tab_active{
    background-color: #b89e6c;
    color: #ffffff;
  }
  .btn-group{
    margin-top:10px;
  }
  .zz_btn{
    display: inline-block;
    width: 25%;
    font-size:16px;
    height: 40px;
    line-height:40px;
    color: #ffffff;
    background-image:-webkit-linear-gradient(to left,#FFB82A,#FF9B06 );
    background-image:linear-gradient(to left,#FFB82A,#FF9B06);
    text-align: center;
    border-radius: 12px;
    &:nth-child(1){
      margin-right:50px;
    }
  }
  .custlevel-class{
    width: 100%;
    height: 100%;
  }
  .custlevel-class>div{
    width: 100%;
    height: 100%;
  }

  .text_span {
    display: inline-block;
    width: 35%;
    /*font-size: 18px;*/
    /*text-align: right;*/
  }
  .text_style{
    width: 40%;
    /*height: 34px;*/

  }
  .set-font{
    font-size:20px;
  }
  .set-chart{
    float: left;
    width:380px;
    height:238px;
  }
</style>
