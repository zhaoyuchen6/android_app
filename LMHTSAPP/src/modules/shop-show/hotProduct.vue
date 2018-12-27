<template>
  <div class="hot-product">
    <x-header  :left-options="{preventGoBack:true}" class="blue-header" @on-click-back="detailHide">
      <span>热销展示</span>
    </x-header>
    <component :is="currentComponent"></component>
  </div>
</template>

<script>
  import EventNames from "@/common/activity-manager/activity-event-names"; //路由事件名称
  import { PageManager } from "ab-manager-page"; //页面管理
  import { TradeFlowManager } from "ab-manager-trade-flow"; //流程管理
  import TradeActivityManager from "@/common/activity-manager/trade-activity-manager"; // 相对路径
  import BasicActivity from "@/mixins/basic-activity";
  import Masker from '@/components/masker'
  import ProductProfit from './productProfit'  //产品-慧盈
  import ProductWechatBank from './productWechatBank'  //产品微信银行

  export default {
    mixins: [BasicActivity],
    name: 'hot-product',
    components: {
      ProductProfit,
      ProductWechatBank
    },
    props: {
      productid:{
        type:[String,Number]
      }
    },
    data() {
      return {
        currentComponent:'ProductWechatBank'
      }
    },
    created(){
      this.showMenu=false;
    },
    beforeDestroy(){
      this.$store.state.loginRole==='visitor'?this.showMenu=false:this.showMenu=true;
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
    mounted(){
      let index=this.productid;
      if(index===0){
        this.currentComponent='ProductWechatBank';
      }else if(index===1){
        this.currentComponent='ProductProfit';
      }
    },
    activated(){

    },
    methods: {
      detailHide(){
        // this.$activityManager.requestUpdateView(EventNames.SHOPSHOW);
        this.$emit('detailHide');
      }
    },

  }
</script>
<style scoped lang="less">
  @import '../../../static/public-style/theme-blue.less';
  .hot-product{
    height:100%;
    width:100%;
    overflow-y: auto;
    background-color: white;
  }
</style>

