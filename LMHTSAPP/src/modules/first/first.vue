<template>
    <div style="width: 95%;margin: 0 auto;">
      <aui-step v-model="stepCode" background-color='#fbf9fe'>
        <aui-step-item title="步骤一" description="step 1"></aui-step-item>
        <aui-step-item title="步骤二" description="step 2"></aui-step-item>
      </aui-step>
      <br>
      <br>
      <component :is="tradeCode" v-on:nextAction="next" @exitAction="exitTrade"></component>
    </div>  
</template>

<script>
import { TradeFlowManager } from "ab-manager-trade-flow";
import EventNames from "@/common/activity-manager/activity-event-names";

export default {
  data() {
    return {
      tradeCode: "step1",
      stepCode:0,
    };
  },
  created() {
      TradeFlowManager.run("step1", this);
  },
  methods: {
    openPage(option) {
      this.tradeCode = option.page;
    },
    next(actionInfo) {
      TradeFlowManager.run(actionInfo.nextPage, this);
      if(actionInfo.nextPage === "step1"){
        this.stepCode = 0;
      }else if(actionInfo.nextPage === "step2"){
        this.stepCode = 1;
      }
    },
    exitTrade() {
      this.$activityManager.requestUpdateView(EventNames.TRADEEXIT);
    }
  }
};
</script>

<style>

</style>
