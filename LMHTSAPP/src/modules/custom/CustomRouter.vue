<template>
  <!--style="overflow: hidden;"-->
  <div class="container">
    <aui-flexbox align="stretch" style="height:100%">
      <aui-flexbox-item :span="1/4" class="vux-1px-r" style="height:100%;border-right: 1px solid  #DCDFE1;margin-left: 0;background: #F5F5F5;">
        <x-header :left-options="{showBack:false}" class="set-header">
          <a slot="left" @click="goCustomMain()" class="left-title">
            <i class="fa fa-id-card-o"></i>
            <span>客户中心</span>
          </a>
          <a slot="right" @click="addGroup" class="header-jiahao">
            <img src="static/image/custom/jiahao_hui.svg">
          </a>
        </x-header>
        <div class="lf-body">
          <!--<div class="row"></div>-->
          <div style="background-color: #FFF;">
            <aui-cell titleClass="cell_title" title="我的群组" is-link :border-intent="false" :arrow-direction="showCollapse ? 'up' : 'down'"
              @click.native="showCollapse = !showCollapse">
              <div slot="default">
                <aui-badge :value="groupList.length"></aui-badge>
              </div>
            </aui-cell>

            <template v-if="showCollapse" v-for="(item,index) in groupList">
              <aui-cell :title="item.group_name" :class="currentIndex==index?'Row_active':''" style="padding-left:30px;" is-link @click.native="clickGroup(item,index)"
                main-sort-style="line-height:3.8vw;" titleClass="cell_title">
                <div slot="default">
                  <aui-badge :value="item.cust_num2"></aui-badge>
                </div>
                <div slot="icon">
                  <img style="height: 1.9vw;width: 1.9vw;vertical-align:middle;padding: 0 0.4vw;" src="static/image/custom/icon_qunzu.svg"
                    alt="">
                </div>
              </aui-cell>
            </template>
          </div>
          <div class="row"></div>
          <div style="background-color: #FFF;">
            <aui-cell v-for="item in myCustomGroupList" :title="item.titleName" :class="currentIndex==item.index?'Row_active':''" is-link
              @click.native="clickGroup(item)" :key="item.index" titleClass="cell_title"></aui-cell>
          </div>
          <div class="row"></div>
          <div style="background-color: #FFF;">
            <nobr>
              <aui-cell v-for="item in orgCustomGroupList" :title="item.titleName" :class="currentIndex==item.index?'Row_active':''"
                is-link @click.native="clickGroup(item)" :key="item.index" titleClass="cell_title"></aui-cell>
            </nobr>
          </div>
        </div>
      </aui-flexbox-item>
      <aui-flexbox-item :span="3/4" style="margin-left:0;height:100%">
        <x-header class="set-header" :left-options="{showBack:false}" >
          <div slot="default" style="color: #333;">{{titleName}}</div>
          <a slot="overwrite-left" @click="comeBackClickFun" v-if="customComeBackFlag" class="title-font">
            <span class="fa fa-reply" style="padding-left:1vw;"></span>
          </a>
          <a slot="right" @click="manageCustom" v-if="displayFlag&&!customComeBackFlag" class="title-font">{{deleteCustomFlag?'取消':'管理'}}</a>
        </x-header>
        <div class="rt-body">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </aui-flexbox-item>
    </aui-flexbox>
    <aui-toast v-model="showMesAddSuccess" type="text">保存成功！</aui-toast>
    <!--添加客户群组弹窗-->
    <div v-transfer-dom>
      <aui-popup v-model="addGroupModalFlag" height="80%" :hide-on-blur="false" :show-mask="true" :is-transparent="true" style="position: fixed;top:20%;">
        <div slot="default" style="width:60%;margin: 0 auto;overflow: hidden;">
          <aui-header class="set-header" :showBack="false">
            <div slot="default" style="color: #333;">添加客户群组</div>
            <a slot="left" class="title-font" @click="addGroupOnHideFunc()">取消</a>
            <a slot="right" sclass="title-font" @click="submitAddGroup()">确定</a>
          </aui-header>
          <div style="border-bottom: solid 1px rgba(120, 90, 77, 0.58);"></div>
          <div class="inputDivClass">
            <div style="background-color: #fff;height: auto;">
              <aui-input title="群组名称" placeholder="请输入群组名称" placeholder-align="right" v-model="newGroup.group_name" class="lineHeightClass"
                type="text" text-align="right" :max="20" :show-clear="false"></aui-input>
              <aui-input title="群组类型" placeholder="请输入群组类型" placeholder-align="right" v-model="newGroup.group_type" class="lineHeightClass"
                type="text" text-align="right" :max="20" :show-clear="false"></aui-input>
              <aui-switch title="是否启用" class="set-switch"></aui-switch>
              <aui-group gutter="0">
                <aui-textarea class="set-textarea" title="群组描述" :max="500" placeholder="描述一下群组" :show-counter="true" :height="190" :rows="6"
                  :cols="60"></aui-textarea>
              </aui-group>
            </div>
          </div>
        </div>
      </aui-popup>
    </div>
  </div>
</template>
<script>
  import {
    RootActivityManager
  } from "ab-manager-activity";
  import TradeActivityManager from "@/common/activity-manager/trade-activity-manager"; // 相对路径
  import BasicActivity from "@/mixins/basic-activity"; //当前路由事件集合
  import EventNames from "@/common/activity-manager/activity-event-names"; //路由事件名称
  import {
    PageManager
  } from "ab-manager-page"; //页面管理
  import {
    TradeFlowManager
  } from "ab-manager-trade-flow"; //流程管理
  import api from '@/common/js/customGroup'
  import ajaxApi from '@/common/api/custom'



  export default {
    mixins: [BasicActivity],
    components: {
      api,
      ajaxApi,
    },
    data() {
      return {
        showMesAddSuccess: false,
        currentIndex: "",
        titleName: null,
        showCollapse: false,
        addGroupModalFlag: false,
        newGroup: {},
        direction: "forward",
        myCustomGroupList: [{
          'titleName': '我的主管客户',
          'index': '105'
        }, {
          'titleName': '我的辅管客户',
          'index': '106'
        }, {
          'titleName': '我的全部客户',
          'index': '104'
        }],
        orgCustomGroupList: [{
          'titleName': '本机构主管客户',
          'index': '202'
        }, {
          'titleName': '本机构辅管客户',
          'index': '203'
        }, {
          'titleName': '本机构全部客户',
          'index': '201'
        }],
      }
    },
    computed: {
      deleteCustomFlag() {
        return this.$store.state.deleteCustomFlag;
      },
      displayFlag() {
        return this.$store.state.displayFlag;
      },
      customComeBackFlag() {
        return this.$store.state.customComeBackFlag;
      },
      customMainRefreshFlag() {
        return this.$store.state.customMainRefreshFlag;
      },
      clickGroupRefreshFlag() {
        return this.$store.state.clickGroupRefreshFlag;
      },
      groupList() {
        return this.$store.state.ownerCustomGroupList;
      }
    },
    mounted() {
      this.$store.commit('update_customMainRefreshFlag', true);
      this.refresh();
    },
    methods: {
      addGroup() {
        this.addGroupModalFlag = true;
      },
      manageCustom() {
        this.$store.commit('update_deleteCustomFlag', !this.deleteCustomFlag);
      },
      clickGroup(queryData, index) {
        this.$aui.loading.show({
          text: '加载中。。。'
        });
        this.$store.commit('update_deleteCustomFlag', false);
        if (queryData.index > 100) {
          this.currentIndex = queryData.index;
          this.titleName = queryData.titleName;
        } else {
          this.currentIndex = index;
          this.titleName = queryData.group_name;
        }
        /*this.$router.push('/custom/customList/' + this.currentIndex);*/
        this.$activityManager.requestUpdateView(EventNames.CUSTOMLIST, this.currentIndex)

        this.$aui.loading.hide();
      },
      addGroupOnHideFunc() {
        this.addGroupModalFlag = false;
      },
      submitAddGroup() {
        this.addGroupModalFlag = false;
        this.showMesAddSuccess = true;
      },
      comeBackClickFun() {
        this.$store.commit('update_customComeBackFlag', false);
        this.$store.commit('update_clickGroupRefreshFlag', false);
        this.$router.back();
      },
      // 显示侧边栏
      showAsideMenu(flag) {
        this.$store.commit('showAsideMenu', flag);
      },
      refresh() {
        if (this.customMainRefreshFlag) {
          if (this.$route.params.index != 'null' && this.$route.params.index != '') {
            this.currentIndex = this.$route.params.index;
            if (this.currentIndex < 100) {
              this.titleName = api.getCustomGroupNode(this.groupList, this.currentIndex).group_name;
              this.showCollapse = true;
            } else {
              this.titleName = api.getCustomGroupNode(this.myCustomGroupList, this.currentIndex).titleName;
            }
          } else {
            this.currentIndex = "104";
            this.titleName = "我的主管客户";
          }

          this.$store.commit('update_customMainRefreshFlag', false);
          this.$store.commit('update_clickGroupRefreshFlag', false);
          /*  this.$router.push('/custom/customList/'+ this.currentIndex);*/
          this.$activityManager.requestUpdateView(EventNames.CUSTOMLIST, this.currentIndex)
        }
      },
      goCustomMain() {
        /*   this.$router.push('/custcenter');*/
        this.$activityManager.requestUpdateView(EventNames.CUSTCENTER)
      }
    },
    // 监听路由变化 调用查询方法
    watch: {
      "$route": "refresh"
    }
  }

</script>
<style scoped lang="less">
  @height: 66px;  //header高度
  .container{
    font-size: 16px;
    height:100%;
  }
  /deep/.set-header {
    width: 100%;
    background-color: #fff;
    height: 66px;
    padding: 3px 0;
    padding-top:20px;
    .left-title {
      // fill: #fff;
      position: relative;
      font-size: 16px;
      font-weight: 500;
      margin-left: 10px;
      color: #e74644 !important;
    }
    .header-jiahao {
      width: 20px;
      height: 20px;
      margin-left: -10px;
      display: inline-block;
      padding-right: 10px;
      color: #999;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .aui-header-left {
      left: 18px;
      top: 14px;
      font-size: 14px;
      line-height: 21px;
      .left-arrow:before {
        width: 12px;
        height: 12px;
        top: 8px;
        left: 7px;
      }
    }
    .aui-header-title {
      margin: 0 88px;
      height: 40px;
      line-height: 46px;
      font-size: 18px;
    }
    .aui-header-right {
      right: 15px;
      top: 14px;
      font-size: 14px;
      line-height: 21px;
    }
  }

  .lf-body {
    height: calc(~"100% - @{height}");
    overflow-y: auto;
    overflow-x: hidden;
  }

  .rt-body {
    background-color: #FFF;
    height:calc(~"100% - @{height}");
  }

  .inputDivClass {
    margin: 0 auto;
    width: 100%;
    background-color: #f5f5f5;
    font-size: 17px;
  }

  .lineHeightClass {
    height: 30px;
  }

  .whiteBackGround {
    background-color: #FFFFFF;
  }

  .blackBackGround {
    background-color: #000000;
  }

  .inputBottomLine {
    border-bottom: solid 1px #F5F5F5;
  }

  .pro_row span:nth-child(2) {
    font-size: 12px;
    color: #00AAFF;
  }

  .pro_row img {
    margin-top: 15px;
    margin-left: 15px;
  }

  .cell_title {
    padding-left: 20px;
    color: #333333;
    line-height: 44px;
    font-size: 16px;
  }


  .Row_active {
    /*background: #45c6fa;*/
    background: #FAFAFA;
    border-left: 4px solid #FF5C5C;
    color: #FF5C5C;
  }

  .row {
    width: 100%;
    height: 15px;
    background-color: #f5f5f5;
  }

  .comeback-arrow:before {
    content: "";
    position: absolute;
    width: 12px;
    height: 12px;
    border: 1px solid #ccc;
    border-width: 1px 0 0 1px;
    /*-webkit-transform: rotate(315deg);*/
    transform: rotate(315deg);
    top: 2px;
    left: 0;
  }

  /deep/.set-switch {
    padding: 6px 0;
    padding-left: 15px;
    box-sizing: border-box;
    .aui-cell__ft {
      height: 52px;
      box-sizing: border-box;
      line-height: 52px;
      padding: 12px;
      .aui-switch {
        width: 50px;
        height: 30px;
        margin-right: 20px;
        box-sizing: content-box;
        &:before {
          width: 50px;
          height: 30px;
          border-radius: 15px;
          content: ""  !important;
        }
        &:after {
          width: 30px;
          height: 30px;
          border-radius: 15px;
          content: ""  !important;
        }
        &:checked:after {
          transform: translateX(20px) !important;
        }
      }
    }
  }

  /deep/.set-textarea {
    font-size: 17px;
    font-family: simHei;
  }
  .title-font{
    font-size: 16px;
    padding-right:20px;
    color:#999;
  }

</style>
