<template>
  <div>
      <aui-button :gradients="['#FF2719', '#FF61AD']" @click="getCount">获取vuex值</aui-button>
      <aui-button :gradients="['#6F1BFE', '#9479DF']" @click="setCount(1)">设置vuex值为1</aui-button>
      <aui-button :gradients="['#FF5E3A', '#FF9500']" @click="setCount(10)">设置vuex值为10</aui-button>
      <aui-button :gradients="['green', 'blue']" @click="clearVuex()">初始化vuex</aui-button>
      <aui-cell title='Vuex 值' :value="count"></aui-cell>
    <br>
    <br>

    <aui-button @click.native="backAction">上一步</aui-button>
    <aui-button @click.native="nextAction">退出</aui-button>

    
  </div>
</template>

<script>
import { StoreManager } from "ab-manager-store";
export default {
  name: "step2",
  data(){
      return {
          count:""
      }
  },
  methods: {
    backAction() {
      let actionInfo = {
        nextPage: "step1",
        action: "next"
      };
      this.$emit("nextAction", actionInfo);
    },
    nextAction() {
      this.$emit("exitAction");
    },
    getCount() {
      this.count = StoreManager.dynamicDispatch("first", "getters", "getCount");
    },
    setCount(val) {
      StoreManager.dynamicDispatch("first", "mutations", "setCount", val);
      this.getCount();
    },
    clearVuex() {
      //重置Vuex值
      StoreManager.clear("first");
      this.getCount();
    }
  }
};
</script>

<style scoped>
.text-scroll {
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
}
.text-scroll p {
  font-size: 12px;
  text-align: center;
  line-height: 13px;
}
</style>
