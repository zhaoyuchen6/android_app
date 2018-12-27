<template>
    <div>
      <aui-button :gradients="['#A644FF', '#FC5BC4']" @click="post">获取后台信息</aui-button>
    <aui-group>
      <aui-input title="phone" v-model.number="phone" :is-type="isPhone" placeholder="请输入手机号"></aui-input>
    </aui-group>
        <aui-button @click.native="nextAction">下一步</aui-button>
    </div>
</template>

<script>
import { ServicesManager } from "ab-manager-services";
import ServicesNames from '@/common/services-manager/services-names.js'//
export default {
  name: "step1",
  data() {
    return {
      count: "",
      phone: "",
      isPhone: function(value) {
        let reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/g;
        return {
          valid: reg.test(value),
          msg: "请输入正确的手机号类型"
        };
      }
    };
  },
  methods: {
      post() {
      let data = {};
      ServicesManager.getService(ServicesNames.LOGINSERVICE, {name: 'Jack'}).then(res => {
          // 回调函数
      });
    },
    nextAction() {
      let actionInfo = {
        nextPage: "step2",
        action: "next"
      };
      this.$emit("nextAction", actionInfo);
    }
  }
};
</script>

<style>

</style>
