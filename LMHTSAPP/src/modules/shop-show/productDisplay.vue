<template>
  <div class="product-display">
    <x-header  :left-options="{preventGoBack:true}" class="blue-header" @on-click-back="displayHide">
      <span>新增营销记录</span>
    </x-header>
    <aui-toast v-model="showMes" type="text" >{{alMes}}</aui-toast>
    <div style="height:50.5vw; overflow-y: auto; overflow-x: hidden;width:100%;">
      <div class="left">
        <p class="title">扫码填写营销记录</p>
        <div class="left_scan" @click="saomiao();oneone()">
          扫码填写营销记录
        </div>
        <p style="font-size:1.09vw;color:#CA261E;">扫码可直接记录客户购买记录信息</p>
      </div>
      <div class="right">
        <p class="title">手工填写营销记录</p>
        <div class="box_main">
          <div class= "box_style"style="text-align: center">
            <!--<span>营销状态：</span>-->
            <!--<span style="font-family:Arial;">2017.7.1 13:00</span>-->
            <aui-checker
              v-model="MarketingStatus"
              default-item-class="MarketingStatus-item"
              selected-item-class="MarketingStatus-item-selected" style="text-align: center"
            >
              <aui-checker-item  :key="1" :value="1" class="checker">已购买</aui-checker-item>
              <aui-checker-item  :key="2" :value="2" class="checker">未购买</aui-checker-item>
              <aui-checker-item  :key="3" :value="3" class="checker">已介绍</aui-checker-item>
            </aui-checker>
          </div>
          <div v-show="MarketingStatus!=0">
          <div class="box_style">
            <span class="text_span">推荐产品类型：</span>
            <select class="text_style" v-model="makInfo.producttype" @click="queryPrdName()">
              <option v-for='(item,index) in  productTypeList'>{{item.value}}</option>
            </select>
          </div>
          <div class="box_style">
            <span class="text_span">推荐产品名称：</span>
            <select class="text_style" v-model="makInfo.productname" @click="queryPrdName()">
              <option v-for='(item,index) in  productNameList'>{{item.productname}}</option>
            </select>
          </div>
          <div class="box_style">
            <span class="text_span">客户姓名：</span>
            <input type="text" class="text_style input_text_width" v-model="makInfo.custname" >
          </div>
          <div v-if="MarketingStatus==1">
          <div class="box_style">
            <span class="text_span">凭单号：</span>
            <input type="text" class="text_style input_text_width" v-model="makInfo.voucherno" >
          </div>
          <div class="box_style">
            <span class="text_span">购买金额：</span>
            <input type="text" class="text_style input_text_width" v-model="makInfo.purchaseamount" >
          </div>
          </div>
          <div class="box_style">
            <span class="text_span">描述：</span>
            <aui-textarea  :max="80" placeholder="请输入描述" :show-counter="false" :height="60" :rows="5"  v-model="makInfo.buycontent"  class="textArea" style=" display: inline-block;"></aui-textarea>
          </div>
          </div>
        </div>

        <!--提交按钮-->
        <aui-button style="color:#fff;width: 18%;background:#E74240;margin-top:5%; font-size: 1.5vw" @click.native="addMsk()">提交</aui-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import mark from '@/common/api/mark'
  import shopShowApi from  '@/common/api/shopShow'
  export default {
    name:'product-display',
    data(){
      return{
//        HeightStyle: 'height: ' + (window.screen.availHeight - 155) + 'px; overflow-y: auto; overflow-x: hidden;width:100%;',
        makInfo:{},
        MarketingStatus:'0',
        productTypeList:[{key:'1',value:'理财产品'},{key:'2',value:'基金产品'},{key:'3',value:'保险产品'},{key:'4',value:'贵金属产品'},{key:'5',value:'银行卡产品'},{key:'6',value:'贷款'}],
        productNameList:[{}],
        /*list: [{key: 'gd', value: '广东'}, {key: 'gx', value: '广西'}],*/
        //分页信息
        pageCtrl: {
          currpage: '1',
          pagenum: '50',
          pageflag: '4'
        },
        showMes:false,
        alMes:'',

      }
    },
    methods:{
      displayHide(){
        this.makInfo = {};
        this.MarketingStatus='';
        this.productNameList=[{}];

          this.$emit('displayHide');
      },
      oneone(){
        this.MarketingStatus=1
      },
      //增加
      addMsk(){
          if(this.makInfo.productname===undefined || this.makInfo.producttype===undefined || this.MarketingStatus===undefined || this.makInfo.custname===undefined ){
            this.showMes=true;
              this.alMes='请填写完整信息';
             return
          }else{
              if(this.MarketingStatus===1){
                  if(this.makInfo.purchaseamount===undefined || this.makInfo.voucherno===undefined ) {
                    this.showMes = true;
                    this.alMes = '请填写完整信息';
                    return
                  }else{
                    let vm=this,submintData = {},body={};
                    let lojinObject = JSON.parse(sessionStorage.getItem("loginObj"));
                    body.userid = lojinObject.code;
                    body.productid = this.formatProduct(this.makInfo.productname);
                    body.producttype = this.formatType(this.makInfo.producttype);
                    body.marketingstatus = this.MarketingStatus;
                    body.custname = this.makInfo.custname;
                    body.buycontent = this.makInfo.buycontent;
                    if (body.marketingstatus == 1) {
                      body.purchaseamount = this.makInfo.purchaseamount;
                      body.voucherno = this.makInfo.voucherno;
                    }
                    submintData.body=JSON.stringify(body);
                    mark.addmarkType(submintData,vm,function (rsp) {

                    });
                    this.makInfo = {};
                    this.MarketingStatus = '';
                    this.productNameList = [{}];
                    this.showMes=true;
                    this.alMes="添加成功"
                    this.$emit('addMsk');
                  }
              }else {

                let vm=this,submintData = {},body={};
                let lojinObject = JSON.parse(sessionStorage.getItem("loginObj"));
                body.userid = lojinObject.code;
                body.productid = this.formatProduct(this.makInfo.productname);
                body.producttype = this.formatType(this.makInfo.producttype);
                body.marketingstatus = this.MarketingStatus;
                body.custname = this.makInfo.custname;
                body.buycontent = this.makInfo.buycontent;
                if (body.marketingstatus == 1) {
                  body.purchaseamount = this.makInfo.purchaseamount;
                  body.voucherno = this.makInfo.voucherno;
                }
                submintData.body=JSON.stringify(body);
                mark.addmarkType(submintData,vm,function (rsp) {
                });
                this.makInfo = {};
                this.MarketingStatus = '';
                this.productNameList = [{}];
                this.showMes=true;
                this.alMes="添加成功"
                this.$emit('addMsk');
              }
          }
      },
      //查询产品列表
      queryPrdName(){
        let vm=this;
        let submitData = {},body={};
        let PageCtrl=this.pageCtrl;
        PageCtrl.currpage='1';
        body.PageCtrl = PageCtrl;
        body.producttype=this.formatType(vm.makInfo.producttype);
        if(body.producttype!==undefined){
          submitData.body=JSON.stringify(body);
          shopShowApi.queryShopQuery(submitData,vm,function (rsp) {
            vm.productNameList=rsp.productList;
            console.log(vm.productNameList)
          });
        }
      },
      //二维码
      saomiao(){
//          let result = '{"qdNum":"03","sessionId":"adfasdfadsfasdfasdfasdf"}';
//          let QRCode = JSON.parse(result);
        let vm = this;

//          cordova.plugins.barcodeScanner.scan(
//            function (result) {
//              alert("We got a barcode\n" +
//                "Result: " + result.text + "\n" +
//                "Format: " + result.format + "\n" +
//                "Cancelled: " + result.cancelled);
//              let resultJSON = JSON.parse(result.text);
//              sessionStorage.setItem('QRCode', JSON.stringify(resultJSON));
//              vm.$router.push('/scanlogin');
//            },function (error) {
//                alert("Sconaning");
//            },{
//                orientation:"portrait"
//            }
//            );
        cordova.plugins.barcodeScanner.scan(
          function (result) {
           /* alert("We got a barcode\n" +
              "Result: " + result.text + "\n" +
              "Format: " + result.format + "\n" +
              "Cancelled: " + result.cancelled);*/
            let resultJSON = {"productname":"零活宝-A","producttype":"理财产品","marketingstatus":'1',"custname":"扫码test","buycontent":"已购买扫码","purchaseamount":"50000","voucherno":"135354"};
            vm.marketingstatus=resultJSON.marketingstatus;
            vm.makInfo.producttype=resultJSON.producttype;
            vm.queryPrdName();
            vm.makInfo.productname=resultJSON.productname;
            vm.makInfo.custname=resultJSON.custname;
            vm.makInfo.buycontent=resultJSON.buycontent;
            vm.makInfo.purchaseamount=resultJSON.purchaseamount;
            vm.makInfo.voucherno=resultJSON.voucherno;
           /* sessionStorage.setItem('QRCode', JSON.stringify(resultJSON));
            vm.$router.push('/scanlogin');*/
          },
          function (error) {
            /*alert("Scanning failed: " + error);*/
          },
          {
            preferFrontCamera : false, // 前置摄像头
            showFlipCameraButton : false, // 摄像头翻转按钮
            showTorchButton : false, // 点灯图标按钮
            torchOn: false, // Android, launch with the torch switched on (if available)
            prompt : "请将二维码至于扫描区域", //  提示信息
            resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
            orientation : "portrait", //  设置默认为后置摄像头    landspcape  风景横屏    portrait  人像竖屏
            disableAnimations : true, // iOS
            disableSuccessBeep: false // iOS
          }
        );
//            let params = {
//              text_title: "Scan QR Code", // Android only
//              text_instructions: "Please point your camera at the QR code.", // Android only
//              camera: "back", // defaults to back
//              flash: "auto", // defaults to "auto". See Quirks
//              drawSight:  false //defaults to true, create a red sight/line in the center of the scanner view.
//            }
//            cloudSky.zBar.scan(params,  function (s) {
//                alert(s)
//            } , function (e) {
//              alert(e)
//            })

      },

      //类型转换
      formatType(value){
        if(value=='理财产品'){
          return '1'
        }else if(value=='基金产品'){
          return '2'
        }else if(value=='保险产品'){
          return '3'
        }else if(value=='贵金属产品'){
          return '4'
        }else if(value=='银行卡产品'){
          return '5'
        }else if(value=='贷款'){
          return '6'
        }
      },
      //产品转换
      formatProduct(value){
        for(var i=0;this.productNameList.length;i++){
          if(value==this.productNameList[i].productname) {
            return this.productNameList[i].productid;
          }
        };
        for(var i=0;this.productNameList.length;i++){
          if(value==this.productNameList[i].productid) {
            return this.productNameList[i].productname;
          }
        }
      },

    },

  }
</script>
<style scoped lang="less">
  @r:163.84px;
  .product-display{
    font-size:1.40vw;
    font-family:SimHei;
    background-color: #ffffff;
    border: 1px solid #B89E6C;
  }
  .left{
    width:49%;
    height:100%;
    border-right:2px solid #F5F4F1;
    float:left;
    text-align:center;
  }
  .left .left_scan{
    width:21.87vw;
    height:19.53vw;
    margin:auto;
    background:#F5F4F1;
    line-height:19.53vw;
    margin-top:3.125vw;
    margin-bottom:3.125vw;
  }
  .right{
    width:49.8%;
    height:100%;
    float:left;
  }
  .title{
    font-size:1.76vw;
    height:5.47vw;
    line-height:5.47vw;
    border-bottom:2px solid #F5F4F1;
    text-align:center;
  }
  .text_style{
    width: 40%;
    height: 2.66vw;
    border: 1px solid #DBDADB;
    border-radius: 0.78vw;
    background: #f5f4f1;
    padding-left: 0.78vw;
    font-size:1.40vw;
  }
  .text_span{
    display: inline-block;
    width: 27%;
    font-size:1.40vw;
    text-align: right;
  }
  .input_text_width{
    width: 37.5%;
  }
  .box_style{
    padding-top:0.78vw;
    padding-bottom:0.78vw;
  }
  option{
    font-size:1.09vw;
  }
  .MarketingStatus-item {
    width: 7.81vw;
    height: 1.2vw;
    line-height: 1.2vw;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
    margin-right: 0.46vw;
  }
  .MarketingStatus-item-selected {
    background: #ffffff ;
    border-color: #ff4a00;
  }
  .textArea{
    width: 50%;
    display: inline-block;
    border: 1px solid #e5e5e5;
    vertical-align: text-top;
    padding:10px 15px;
    &:before{
      border:none;
    }
    /deep/.aui-textarea{
      width:100%!important;
    }
  }
  .text_span {
    display: inline-block;
    width: 35%;
    font-size: 1.40vw;
    text-align: right;
  }
  .checker{
    width: 20%;
    padding: 0.78vw 3%;
    font-size: 1.3vw;
    height:1.9vw;
    line-height: 1.9vw;
  }
  .box_main{
    width: 90%;
    /*margin: 2% 5%;*/
  }
  @media screen and (max-width: 860px) {
    .edit_title{
      font-size:1.25vw;
      color:#333;
      letter-spacing: 0.5vw;
      height: 3vw;
      float: right;
      margin-right: 16%;
      margin-top: -1vw;
    }
    .close_btn{
      width: 1.56vw;
      font-size:1.40vw;
      margin-left: 2.34vw;
      line-height: 1.56vw;
      float: right;
      margin-top: -1vw
    }
    .box_style {
      margin-top: -0.2vw;
    }
    .smallshow{
      margin-top: 2vw;
    }
    .bottom_btn{
      bottom: -0.5vw;
    }
  }
</style>

