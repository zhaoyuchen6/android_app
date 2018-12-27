<template>
  <div id="app" ref="app" style="overflow:hidden">
    <router-view/>
  </div>
</template>

<script>
import { RootActivityManager } from "ab-manager-activity";
import TradeActivityManager from "@/common/activity-manager/trade-activity-manager";
import EventNames from "@/common/activity-manager/activity-event-names"; //路由事件名称
import loginJs from "./common/api/login.js";
// import ajax from '@/common/js/baseAjax'
import FloatCalculator from "@/components/float-calculator/floatCalculator";
// import Login from "@/components/Login";  //登录
// import SelectRole from "@/components/SelectRole";  //角色选择
import queryDictData from "@/common/api/monitoring";

export default {
  name: "app",
  components: {
    FloatCalculator
  },
  created() {
    this.queryDictDataFromAFA();
    RootActivityManager.changeActivityManager(new TradeActivityManager());
  },
  computed: {},

  methods: {
    // 查询数据字典
    queryDictDataFromAFA() {
      let vm = this;
      let DictData = {},
      DictDataTmp = {};
      DictData.XToken = "Notoken";
      DictData.body = JSON.stringify(DictDataTmp);
      queryDictData.queryDictData(DictData, vm, function(rsp) {
      vm.DictData = rsp.DictInfo;
      localStorage.setItem("DictData", JSON.stringify(vm.DictData));
      });
    }
  }
};
</script>

<style scoped lang="less">
@import "../static/public-style/theme-blue.less";
img{
  content:normal!important;
}
</style>
