<template>
  <div class="father-container">
      <transition name="component-fade" mode="out-in">
        <component :is="tradeCode" v-on:nextAction="next" @exitAction="exitTrade" transiton="fade" ></component>
      </transition>
    </div>
</template>

<script>
  import EventNames from "@/common/activity-manager/activity-event-names"; //路由事件名称
  import { PageManager } from "ab-manager-page"; //页面管理
  import { TradeFlowManager } from "ab-manager-trade-flow"; //流程管理
  export default {
    data() {
      return {
        tradeCode: "indexPage",
      }
    },
    created() {
      TradeFlowManager.run("mapPoint", this);
      // TradeFlowManager.run("radarMap", this);
    },
    methods: {
      openPage(option) {
        this.tradeCode = option.page;
      },
      next(actionInfo) {
        TradeFlowManager.run(actionInfo.nextPage, this);
      },
      exitTrade() {
        this.$activityManager.requestUpdateView(EventNames.TRADEEXIT);
      }
    }
  };
</script>
<style lang="less" scoped>
  .father-container{
    width: 100%;
    margin: 0 auto;
    height: 100%;
    overflow:hidden;
  }
  .component-fade-enter-active, .component-fade-leave-active {
      transition: opacity .3s ease;
      // transition:transform .3s ease-in .1s ,ease-out .3s;
    }
    .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active for below version 2.1.8 */ {
      opacity: 0;
    }
</style>
