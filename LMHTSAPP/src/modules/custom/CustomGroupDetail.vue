<template>
  <div class="inputDivClass2">
    <div style="background-color: #fff;height: auto;">
      <aui-input title="群组名称" placeholder="请输入群组名称" placeholder-align="right" v-model="nowGroupInfo.group_name" class="lineHeightClass"
               label-width="4em" type="text" text-align="right" :max="20" :show-clear="false" :disabled="true"></aui-input>
      <aui-input title="群组类型" placeholder="请输入群组名称" placeholder-align="right" v-model="nowGroupInfo.group_type" class="lineHeightClass"
               type="text" text-align="right" :max="20" :show-clear="false" :disabled="true"></aui-input>
      <aui-input title="创建人" placeholder="请输入群组名称" placeholder-align="right" v-model="nowGroupInfo.create_emp" class="lineHeightClass"
               type="text" text-align="right" :max="20" :show-clear="false" :disabled="true"></aui-input>
      <aui-input title="创建日期" placeholder="请输入群组名称" placeholder-align="right" v-model="nowGroupInfo.create_date" class="lineHeightClass"
               type="text" text-align="right" :max="20" :show-clear="false" :disabled="true"></aui-input>
      <aui-input title="群组人数"  placeholder="请输入群组名称" placeholder-align="right" v-model="nowGroupInfo.cust_num2" class="lineHeightClass"
               type="text" text-align="right" :max="20" :show-clear="false" :disabled="true"></aui-input>
      <aui-switch title="是否启用" style="height: 40px;" :disabled="true" :value="nowGroupInfo.group_status=='9000120001'"></aui-switch>
      <aui-group gutter="0">
        <aui-textarea :max="500" placeholder="描述一下群组" :show-counter="true" :height="150" :rows="6" :cols="200" :readonly="true">
          <div slot="label">
            <span style='padding-right: 20px;'>群组描述</span>
          </div>
        </aui-textarea>
      </aui-group>
      <div class="flexboxItemButtomDivClass">
        <aui-button type="default" style="width: 100%;" @click.native="submitDeleteGroup()">删除群组</aui-button>
      </div>
    </div>
  </div>
</template>
<script>
  import { RootActivityManager } from "ab-manager-activity";
  import TradeActivityManager from "@/common/activity-manager/trade-activity-manager"; // 相对路径
  import BasicActivity from "@/mixins/basic-activity"; //当前路由事件集合
  import EventNames from "@/common/activity-manager/activity-event-names"; //路由事件名称
  import { PageManager } from "ab-manager-page"; //页面管理
  import { TradeFlowManager } from "ab-manager-trade-flow"; //流程管理
  import ajaxApi from '@/common/api/custom'
  import api from '@/common/js/customGroup'

  export default {
    mixins: [BasicActivity],
    components: {
      ajaxApi,
      api
    },
    data () {
      return {
        nowGroupInfo: {},
        currentIndex: null,
      }
    },
    computed: {
      groupList(){
        return this.$store.state.ownerCustomGroupList;
      }
    },
    activated(){
      if (this.$route.params.index != 'null' && this.$route.params.index != '') {
        this.currentIndex = this.$route.params.index;
        this.nowGroupInfo = api.getCustomGroupNode(this.groupList, this.currentIndex);
      }
    },
    methods: {
      submitDeleteGroup() {
        this.$store.commit('update_customComeBackFlag', false);
        this.$store.commit('update_customMainRefreshFlag', true);
        this.$store.commit('update_clickGroupRefreshFlag', false);
      /*  this.$router.push('/custom/customList/0');*/
        this.$activityManager.requestUpdateView(EventNames.CUSTOMLIST,0)
      }
    }
  }
</script>
<style scoped>
  .inputDivClass2{
    margin: 0 auto;
    width :100%;
    font-size: 16px;
    background-color: #f5f5f5;
    overflow: hidden;
  }

  .flexboxItemButtomDivClass{
    padding: 20px 60px;
  }

  .lineHeightClass {
    height: 30px;
  }
</style>
