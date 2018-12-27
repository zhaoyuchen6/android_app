<template>
  <div  class="smart-form" >
    <masker :value="maskerFlag" class="masker_class" color="#f5f5f5" :opacity="1" >
      <div slot="default" style="height:100%;">
        <x-header  :left-options="{showBack:false}" :showBack=false>
          <span  class="span">智能填单</span>
        </x-header>
        <div class="backTo">
          <img @click="backToIndexPage()" src="static/image/icon-fanhui黑-2.svg"  v-if="!this.$store.state.showMenu">
        </div>
      <div style="text-align:center;height: 100%;width: 100%">
        <div  class="smart-form-content">
          <div v-for="(item,index) in businessList" class="list_box">
            <div class="smart_box" @click="changeFlag(item.view)" :style="{backgroundColor:item.color}">
              <img src="static/image/qidai.png" v-if="!item.isOpen" class="qidai">
              <img :src="'static/image/'+item.icon" class="smart_img"><br>
              <span>{{item.text}}</span>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div slot="content" class="content_div" v-if="maskerFlag">
        <component v-bind:is="which_to_show"  @hideMasker="hideMasker"   ref="selectfood" ></component>
      </div>
    </masker>
  </div>
</template>

<script type="text/ecmascript-6">
  import { TradeFlowManager } from "ab-manager-trade-flow"; //流程管理
  import { PageManager } from "ab-manager-page"; //页面管理
  import TradeActivityManager from "@/common/activity-manager/trade-activity-manager"; // 相对路径
  import BasicActivity from "@/mixins/basic-activity";
  import EventNames from "@/common/activity-manager/activity-event-names";

  import Masker from '@/components/masker'
  import transferRemittance from "./transferRemittance.vue"
  export default {
    name: 'smart-form',
    mixins: [BasicActivity],
    components: {
      Masker,
      transferRemittance
    },
    data(){
      return{
        maskerFlag:false,
        which_to_show : '',
        businessList:[
          {text:"转账汇款",icon:"转账汇款.svg",color:"#5FCBFF",view:"transferRemittance",isOpen:true},
          {text:"柜面通存款",icon:"存款.svg",color:"#E1C287",view:"",isOpen:false},
          {text:"柜面通取款",icon:"我要取款.svg",color:"#74D5AC",view:"",isOpen:false},
          {text:"本票开立",icon:"本票开立-2.svg",color:"#EF775F",view:"",isOpen:false},
          {text:"个人开户",icon:"个人开户.svg",color:"#EF775F",view:"",isOpen:false},
          {text:"一卡通缴费",icon:"缴费.svg",color:"#5FCBFF",view:"",isOpen:false},
          {text:"驾校考试业务",icon:"驾校考试业务.svg",color:"#E1C287",view:"",isOpen:false},
          {text:"单位活期存款",icon:"活期存款.svg",color:"#74D5AC",view:"",isOpen:false},
          {text:"对公开户",icon:"对公开户.svg",color:"#5FCBFF",view:"",isOpen:false},
          {text:"对公现金支取",icon:"对公现金支取.svg",color:"#E1C287",view:"",isOpen:false}
        ]
      }
    },
    mounted() {
      this.which_to_show = PageManager.getPage("transferRemittance");
    },
    methods:{
      //返回游客主页
      backToIndexPage(){
        this.$activityManager.requestUpdateView(EventNames.INDEXPAGE); //去游客的菜单页
      },

      changeFlag(parm){
        if(parm===''){
          return
        }else{
          window.tradeListeners("true", parm, this.$data.businessList);
          TradeFlowManager.run(parm, this);
          let whichSshow = parm;
          this.which_to_show = parm;
          this.maskerFlag = true;
        }

        //        调用子组件的方法并传参
//        this.$refs.selectfood.queryCustInfo(custid);
      },
      //获取传递的动态组件
      openPage(options) {
        this.which_to_show = options.page;
      },
      hideMasker(){
        window.tradeListeners("false", "", "");
        this.maskerFlag=false;
      },
    },
    activated(){
      this.maskerFlag = false;
    },
    detailHide(){
      this.maskerFlag=false;
    },
  }
</script>
<style lang="less" scoped>
  .smart-form{
    width: 100%;
    height:100%;
    margin: 0 auto;
    font-family:SimHei;
    font-size:17.92px;
  }
  .list_row{
    height:214px;
    width: 90%;
    margin: 0 5%;
  }
  .list_box{
    width:168px;
    height:168px;
    float: left;
    margin:26px 34px;
    &:nth-child(7){
      .smart_img{
        height:64px;
      }
    }
  }
  .smart_box{
    color: #fff;
    text-align: center;
    padding:25px 0;
    height:100%;
    width:100%;
    box-sizing: border-box;
    border-radius: 2%;
    position: relative;
  }
  .qidai{
    position: absolute;
    width: 40%;
    top: 0;
    right: 0;
  }
  .masker_class{
    border-radius: 2px;
    height:100%;
  }
  .header_img_class{
    width: 30px;
    margin-left: 30px;
    margin-top: -5px;
    .span{
      font-size:24px;
    }
  }
  .content_div{
     height: 100%;
     width: 100%;
  }
  .smart-form-content{
    margin:0 auto;
    height:calc(~"100% - "42px);
    width:944px;
    box-sizing: border-box;
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

