<template>
  <div class="father-container">
    <transition name="component-fade" mode="out-in">
      <component :is="tradeCode" @showMore="showMore" @goHome="goHome"></component>
    </transition>
  </div>
</template>

<script>
  import EventNames from "@/common/activity-manager/activity-event-names"; //路由事件名称
  import { PageManager } from "ab-manager-page"; //页面管理
  import { TradeFlowManager } from "ab-manager-trade-flow"; //流程管理
  import "echarts/lib/component/tooltip"  //引入提示工具
  import "echarts/lib/component/legend"  //引入图例
  import "echarts/lib/component/title"  //引入标题

  export default {
    name:"home",
    data() {
      return {
        tradeCode : '',
      }
    },
    created() {
      // TradeFlowManager.run("homePage", this);
      this.goHome();
    },
    methods: {
      openPage(option) {
        this.tradeCode = option.page;
      },
      showMore(actionInfo){
        TradeFlowManager.run(actionInfo.nextPage, this);
      },
    //返回homePage
      goHome(){
        TradeFlowManager.run("homePage", this);
      }
    }
  };
</script>
<style lang="less" scoped>
  .father-container{
    width: 100%;
    margin: 0 auto;
    height: 100%;
    overflow-y: scroll;
  }
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  .component-fade-enter, .component-fade-leave-to {
    opacity: 0;
  }
</style>

