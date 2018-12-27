<template>
  <div class="container">
    <div v-if="displayFlag" class="head-top">
      <aui-cell :inline-desc-el="groupInlineDesc" is-link @click.native="getGroupDetail(currentIndex)" main-sort-style="line-height:3.1vw;"
        class="main_border2">
        <div slot="title" class="header-title">
          <img src="static/image/custom/icon_qunzu.svg">
          <span>{{titleName}}</span>
        </div>
      </aui-cell>
      <div class="row"></div>
      <div class="pro_row">
        <span class="am-fl" style="padding-left: 1.2vw;">群组成员({{cust_num}}人)</span>
        <span class="am-fr" style="padding-right: 1.2vw;" @click="addCustom" v-if="!deleteCustomFlag">
          <img src="static/image/custom/jiahao_lan.svg" style="width: 1.2vw;">
          <span style="font-size: 16px;">添加客户</span>
        </span>
      </div>
    </div>
    <!--搜索框-->
    <div class="search">
      <aui-search :autoFixed="false" v-model="searchInput" placeholder="搜索" cancel-text="取消" @on-submit="changeCustData"></aui-search>
      <p v-if="!displayFlag" class="search-bottom"></p>
    </div>

    <div v-if="!displayFlag" class="head-bottom">
      <aui-flexbox style="padding-top: 0.6vw;">
        <aui-flexbox-item :span="1/3">
          <aui-popup-radio title="我的群组" placeholder="请选择" placeholder-align="left" :options="custGradeOptions" :show-dialog="true"
            :show-title="false" :hide-on-blur="true" v-model="custGrade" @on-change="selectCustGradeOptions" @on-show="hideELement"
            style="border-right: solid 1px #e5e5e5;height: 5px;font-size: 18px;"></aui-popup-radio>
        </aui-flexbox-item>
      </aui-flexbox>
    </div>

    <!--id="wrapper_id"-->
    <div class="page-loadmore-wrapper" ref="wrapper" :class="classHeight">
      <!--<div class="page-loadmore-wrapper" ref="wrapper" :style="{height:custListHeight/12.8+'vw'}">-->
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" @top-status-change="handleTopChange"
        :top-method="loadTop" ref="loadmore">
        <aui-group gutter="0px">
          <!--<nobr ref="wrapper2">-->
          <aui-cell v-for="(tmpObj,index) in customGroupList" default-sort-style="width:50%;" is-link :id="'list'+tmpObj.cust_no" @click.native="clickCellIitem(index)"
            :key="index">
            <div slot="title" style="font-size:18px;color:#4C4C4C;font-family: 黑体;height:40px;line-height:40px;">
              <span>{{tmpObj.cust_name}}</span>
            </div>

            <div slot="inline-desc" style='font-size:14px;color: #999;height:2vw;line-height: 18px;'>
              <span>{{tmpObj.group_name_text}}</span>
            </div>

            <div slot="icon">
              <input v-if="deleteCustomFlag" :checked="tmpObj.selected" style="width: 2vw;height: 2vw;margin-right: 1.6vw;" :id="index"
                name="deleteCustomCheckbox" type="checkbox" :value="tmpObj.cust_no" />
              <span v-else class="plan_name" :class="getPlanColorArray(index)" style="font-weight:bold;">{{tmpObj.cust_name_short}}</span>
            </div>

            <div slot="default" v-if="!deleteCustomFlag">
              <aui-flexbox>
                <aui-flexbox-item :span="1/4" >
                  <div class="play_phone" style="border-left: 1px solid #e5e5e5;">
                    <img style="height: 1.9vw;width: 1.9vw;vertical-align:middle;" src="static/image/custom/icon_dianhua.svg" alt="">
                    <span>电话</span>
                  </div>
                </aui-flexbox-item>
                <aui-flexbox-item :span="1/4" >
                  <div class="play_phone">
                    <img style="height: 1.9vw;width: 1.9vw;vertical-align:middle;" src="static/image/custom/icon_duanxin.svg" alt="">
                    <span>短信</span>
                  </div>
                </aui-flexbox-item>
                <aui-flexbox-item :span="1/4" >
                  <div class="play_phone">
                    <img style="height: 1.9vw;width: 1.9vw;vertical-align:middle;" src="static/image/custom/icon_youjian.svg" alt="">
                    <span>邮件</span>
                  </div>
                </aui-flexbox-item>
              </aui-flexbox>
            </div>
          </aui-cell>
          <!--</nobr>-->
        </aui-group>
        <!--</group>-->
        <!--加载显示设置-->
        <div slot="top" class="mint-loadmore-top">
          <div v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">
            <span>↓</span>
          </div>
          <div v-show="topStatus === 'pull'">
            <span>下拉刷新</span>
          </div>
          <div v-show="topStatus === 'drop'">
            <span>释放更新</span>
          </div>
          <div v-show="topStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </div>
        </div>
        <div slot="bottom" class="mint-loadmore-bottom">
          <div v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">
            <span>↑</span>
          </div>
          <div v-show="bottomStatus === 'pull'">
            <span>上拉加载更多</span>
          </div>
          <div v-show="bottomStatus === 'drop'">
            <span>释放加载更多</span>
          </div>
          <div v-show="bottomStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </div>
        </div>
        <div style="text-align: center;padding-top:0.8vw" v-if="allLoaded===true">加载完毕</div>
      </mt-loadmore>
    </div>

    <div v-if="deleteCustomFlag" style="background-color: #FFF;border-top: 1px solid #E5E5E5;">
      <aui-flexbox class="del-box">
        <aui-flexbox-item :span="7/10" style="overflow-x: auto;overflow-y: hidden;">
          <div v-if="selectArrayList.length == 0" style="font-size: 18px;color: red;padding-left: 18px;">没有选择记录...</div>
          <div v-else style="padding:0.4vw 1.2vw;" :style="{width:selectArrayWidth + 'px'}">
            <a v-for="(selectArrayItem,index) in selectArrayList" href="javascript:void(0)" @click="goPosition(selectArrayItem.cust_no)">
              <div class="plan_name" :class="getPlanColorArray(index)" style="font-weight:bold;">{{selectArrayItem.cust_name_short}}</div>
            </a>
          </div>
        </aui-flexbox-item>
        <aui-flexbox-item :span="3/10" style="margin: 0 auto;">
          <div class="del-left">
            <span>已选择了{{deleteCustomSelNum}}人！</span>
          </div>
          <div class="del-right">
            <aui-button class="set-btn" type="warn" @click.native="deleteCustomSubmitConfirmFlag=true">删除</aui-button>
          </div>
        </aui-flexbox-item>
      </aui-flexbox>
    </div>

    <!--删除确认弹框-->
    <div v-transfer-dom>
      <aui-confirm v-model="deleteCustomSubmitConfirmFlag" title="确认删除？" confirm-text="确定" cancel-text="取消" @on-confirm="deleteCustomSubmit()">
      </aui-confirm>
    </div>

    <!--客户选择插件*****群组里添加客户时候用-->
    <cust-select  v-model="addCustomModalFlag" :hide-on-blur="false" :isChecker="true" :is-transparent="true" @on-hide="addCustomOnHideFunc"
      @selected="addCustomSelectedFunc">
    </cust-select>

    <!--删除客户群组弹窗-->
    <div v-transfer-dom>
      <aui-popup v-model="deleteGroupModalFlag" height="80%" :hide-on-blur="false" :show-mask="true" :is-transparent="true" style="position: fixed;top:4.7vw;">
        <div slot="default" style="width:60%;height:100%;margin: 0 auto;overflow: hidden;">
          <aui-header class="set-header" :showBack="false" style="width:100%;height: 3.9vw;background-color: #fff">
            <div slot="default" style="color: #333;">客户群组详情</div>
            <a slot="overwrite-left" @click="deleteGroupOnHideFunc" style="font-size: 16px;color:#999;">
              <div class="comeback-arrow"></div>
              <span style="padding-left: 1vw;">返回</span>
            </a>
          </aui-header>
          <div style="border-bottom: solid 1px rgba(120, 90, 77, 0.58);"></div>
          <div class="del-group-box" style="background-color: #fff;font-size: 16px;">
            <aui-input title="群组名称" placeholder="请输入群组名称" placeholder-align="right" v-model="nowGroupInfo.group_name" class="lineHeightClass"
              label-width="4em" type="text" text-align="right" :max="20" :show-clear="false" :disabled="true"></aui-input>
            <aui-input title="群组类型" placeholder="请输入群组名称" placeholder-align="right" v-model="nowGroupInfo.group_type" class="lineHeightClass"
              type="text" text-align="right" :max="20" :show-clear="false" :disabled="true"></aui-input>
            <aui-input title="创建人" placeholder="请输入群组名称" placeholder-align="right" v-model="nowGroupInfo.create_emp" class="lineHeightClass"
              type="text" text-align="right" :max="20" :show-clear="false" :disabled="true"></aui-input>
            <aui-input title="创建日期" placeholder="请输入群组名称" placeholder-align="right" v-model="nowGroupInfo.create_date" class="lineHeightClass"
              type="text" text-align="right" :max="20" :show-clear="false" :disabled="true"></aui-input>
            <aui-input title="群组人数" placeholder="请输入群组名称" placeholder-align="right" v-model="nowGroupInfo.cust_num2" class="lineHeightClass"
              type="text" text-align="right" :max="20" :show-clear="false" :disabled="true"></aui-input>
            <aui-switch title="是否启用" class="set-switch" :disabled="true" :value="nowGroupInfo.group_status=='9000120001'"></aui-switch>
            <aui-group gutter="0">
              <aui-textarea :max="500" placeholder="描述一下群组" class="set-textarea" :show-counter="true" :height="150" :rows="4" :cols="70"
                :readonly="true">
                <div slot="label">
                  <span class="set-label">群组描述</span>
                </div>
              </aui-textarea>
            </aui-group>
            <div style="padding: 1.6vw;">
              <aui-button type="warn" class="set-btn" style="width: 80%;" @click.native="submitDeleteGroupConfirmFlag=true">删除群组</aui-button>
            </div>
          </div>
        </div>
      </aui-popup>
    </div>
    <!--删除确认弹框-->
    <div v-transfer-dom>
      <aui-confirm v-model="submitDeleteGroupConfirmFlag" title="确认删除？" confirm-text="确定" cancel-text="取消" @on-confirm="submitDeleteGroup()">
      </aui-confirm>
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
  import CustSelect from '@/components/cust-select/CustSelect.vue'
  import MtLoadmore from '@/components/loadmore'
  import MtSpinner from '@/components/spinner'


  export default {
    mixins: [BasicActivity],
    components: {
      api,
      ajaxApi,
      CustSelect,
      MtLoadmore,
      MtSpinner,
      //      GLApi
    },
    data() {
      return {
        submitDeleteGroupConfirmFlag: false,
        deleteCustomSubmitConfirmFlag: false,
        nowGroupInfo: {},
        deleteGroupModalFlag: false,
        cellFlag: "main",
        titleName: "我的主管客户",
        scrollPosition: 0,
        containerHeight: 0,
        custListHeight: 0,
        classHeight: "",
        customGroupList: [],
        PageCtrl: {
          currpage: 0, // 当前页码
          pageflag: 4, // 4-分页状态
          pagenum: 10 // 显示条数
        },
        currentIndex: "104",
        body_tmp: {
          cust_range: "8000130004"
        },
        searchInput: "",
        submitDeleteGroupConfirmFlag: false,
        addCustomModalFlag: false,
        deleteCustomSelNum: 0,
        selectArrayList: [],
        selectArrayWidth: 0,
        cust_num: 0,
        groupInlineDesc: "",
        queryData: {},
        planColorArray: ['plan_red', 'plan_org', 'plan_blue', 'plan_purple', 'plan_scs'],
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
        custGradeOptions: [{
          "key": "105",
          "value": "我的主管客户"
        }, {
          "key": "106",
          "value": "我的辅管客户"
        }, {
          "key": "104",
          "value": "我的全部客户"
        }, {
          "key": "102",
          "value": "本机构主管客户"
        }, {
          "key": "103",
          "value": "本机构辅管客户"
        }, {
          "key": "101",
          "value": "本机构全部客户"
        }],
        custGrade: "",
        allLoaded: false, // 数据加载状态   true时表示数据没有加载完毕
        bottomStatus: '', //上拉刷新状态
        topStatus: '', // 下拉刷新状态
        initFlag: true
      }
    },
    created () {
    },
    mounted() {
      this.classHeight = "height1";
    },
    computed: {
      deleteCustomFlag() {
        console.log("contianerHeight：" + this.containerHeight);
        let boxHeight = this.containerHeight - 188;
        let boxHeight2 = this.containerHeight - 114;
        console.log("boxHeight：" + boxHeight);
        console.log("boxHeight2：" + boxHeight2);
        if (this.$store.state.deleteCustomFlag) {
          if (this.displayFlag) {
            this.classHeight = "height2";
          } else {
            this.classHeight = "height4";
          }
        } else {
          if (this.displayFlag) {
            this.classHeight = "height1";
          } else {
            this.classHeight = "height3";
          }
          this.resetSelectCheckbox();
          this.selectArrayList = [];
        }
        return this.$store.state.deleteCustomFlag;
      },
      displayFlag() {
        return this.$store.state.displayFlag;
      },
      groupList() {
        return this.$store.state.ownerCustomGroupList;
      },
      clickGroupRefreshFlag() {
        return this.$store.state.clickGroupRefreshFlag;
      }
    },
    methods: {
      /*隐藏底部弹出的多余元素*/
      hideELement() {
        let child = document.querySelector(".aui-popup-dialog.aui-popup-show");
        if (child) {
          child.parentNode.removeChild(child);
        }
      },
      goPosition(position) {
        var positionItem = this.$el.querySelector("#list" + position);
        this.$refs.wrapper.scrollTop = positionItem.offsetTop;
      },
      queryCustomFunction(submitdata, displayFlag, direction) {
        var _this = this;
        ajaxApi.customQuery(submitdata, displayFlag, function (response) {
          var result = response;
          let customArrayTmp = api.getNewCustomArray2(result.PersonInfo, _this.groupList);
          _this.customGroupList = _this.customGroupList.concat(customArrayTmp);

          _this.$nextTick(function () {
            if (direction == 'top') {
              _this.$refs.loadmore.onTopLoaded();
            } else {
              _this.$refs.loadmore.onBottomLoaded({
                top: 0
              });
            }
            if (result.PageInfo.nowpagenum >= result.PageInfo.totalpagenum) {
              _this.allLoaded = true; // 数据已经加载完毕
            }

            this.$refs.loadmore.init();
            //            if (_this.searchInput != '' && _this.searchInput != undefined) {
            //              GLApi.GLFunc(document.getElementById('wrapper_id'), _this.searchInput, false);
            //            }
            //            _this.$aui.loading.hide();
          });
        });
      },
      clickGroup() {
        if (this.$route.params.index != 'null' && this.$route.params.index != '') {
          this.currentIndex = this.$route.params.index;
        } else {
          return;
        }
        if (!this.clickGroupRefreshFlag) {
          this.$store.commit('update_clickGroupRefreshFlag', true);
          return;
        }
        //        this.$aui.loading.show({
        //          text: '加载中。。。'
        //        });

        this.$store.commit('update_customComeBackFlag', false);
        this.$store.commit('update_deleteCustomFlag', false);
        this.cellFlag = 'main';

        var body = {};
        this.body_tmp = {};
        this.searchInput = "";

        if (this.currentIndex < 100) {
          this.queryData = api.getCustomGroupNode(this.groupList, this.currentIndex);
          if (this.queryData == {}) {
            return;
          }
          body.group_id = this.queryData.id;
          this.titleName = this.queryData.group_name;
          this.cust_num = this.queryData.cust_num2;
          this.groupInlineDesc = "<span style='font-size:16px;color:#999;'>" + this.queryData.group_type +
            "&emsp;&emsp;已启用&emsp;&emsp;创建人:" + this.queryData.create_emp + "&emsp;&emsp;创建时间：" + this.queryData.create_date +
            "</span>";
          this.$store.commit('update_displayFlag', true);
          // this.custListHeight =this.containerHeight-188;
          this.classHeight = "height1";
        } else {
          if (this.currentIndex < 200) {
            this.queryData = api.getCustomGroupNode(this.myCustomGroupList, this.currentIndex);
            let currentIndexTmp = this.currentIndex - 100;
            body.cust_range = "800013000" + currentIndexTmp;
          } else {
            this.queryData = api.getCustomGroupNode(this.orgCustomGroupList, this.currentIndex);
            let currentIndexTmp = this.currentIndex - 200;
            body.cust_range = "800013000" + currentIndexTmp;
          }
          this.titleName = this.queryData.titleName;
          this.$store.commit('update_displayFlag', false);
          // this.custListHeight =this.containerHeight-114;
          this.classHeight = "height3"
        }

        this.body_tmp = body;
        this.changeCustData();
      },
      changeCustData() {
        //        this.$aui.loading.show({
        //          text: '加载中。。。'
        //        });
        this.allLoaded = false;
        this.customGroupList = [];

        var submitdata = {};
        var body = this.body_tmp;
        body.cust_name = this.searchInput;
        this.PageCtrl.currpage = 1;
        this.PageCtrl.pageflag = 4;
        this.PageCtrl.pagenum = 10;
        body.PageCtrl = this.PageCtrl;
        submitdata.body = encodeURI(JSON.stringify(body));
        this.queryCustomFunction(submitdata, this.displayFlag, "top");
      },
      deleteGroupOnHideFunc() {
        this.deleteGroupModalFlag = false;
      },
      submitDeleteGroup() {
        this.deleteGroupModalFlag = false;
      },
      getGroupDetail() {
        if (this.deleteCustomFlag) {
          return;
        } else {
          this.deleteGroupModalFlag = true;
          this.nowGroupInfo = api.getCustomGroupNode(this.groupList, this.currentIndex);
        }
      },
      addCustom() {
        this.addCustomModalFlag = true;
      },
      addCustomOnHideFunc() {
        this.addCustomModalFlag = false;
      },
      addCustomSelectedFunc(selectVal) {
        console.log(selectVal);
      },
      clickCellIitem(index) {
        if (this.cellFlag == 'phone') {
          //          alert('phone');
        } else if (this.cellFlag == 'massage') {
          //          alert('massage');
        } else if (this.cellFlag == 'mail') {
          //          alert('mail');
        } else if (this.cellFlag == 'main') {
          if (this.deleteCustomFlag) {
            this.customGroupList[index]["selected"] = !this.customGroupList[index]["selected"];
            var selectCount = 0;
            this.selectArrayList = [];
            var items = document.getElementsByName("deleteCustomCheckbox");
            for (var j = 0; j < this.customGroupList.length; j++) {
              if (this.customGroupList[j].selected) {
                selectCount++;
                this.selectArrayList.push(this.customGroupList[j]);
              }
            }
            this.deleteCustomSelNum = selectCount;
            this.selectArrayWidth = 75 * this.selectArrayList.length;
          } else {
            var cust_no = this.customGroupList[index]["cust_no"];
            this.$store.commit('update_customComeBackFlag', true);
            this.$store.commit('update_clickGroupRefreshFlag', false);
            /* this.$router.push('/custom/customInfo/'+ cust_no) */
            //跳转到群组详情界面
            this.$activityManager.requestUpdateView(EventNames.CUSTOMINFO, cust_no)
          }
        }
        this.cellFlag = 'main';
      },
      deleteCustomSubmit() {
        var arr = new Array();
        var items = document.getElementsByName("deleteCustomCheckbox");
        for (var i = 0; i < items.length; i++) {
          if (items[i].checked) {
            arr.push(items[i].value);
          }
        }
        this.$store.commit('update_deleteCustomFlag', false);
        console.log(arr);
      },
      resetSelectCheckbox() {
        if (this.deleteCustomSelNum > 0) {
          this.deleteCustomSelNum = 0;
          this.changeCustData();
        }
      },
      getPlanColorArray(index) {
        return this.planColorArray[index % 5];
      },
      selectCustGradeOptions() {
        console.log(this.custGrade);
      },
      // 下拉加载数据相关方法
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      loadBottom() {
        if (this.initFlag) {
          this.$store.commit('update_clickGroupRefreshFlag', true);
          this.initFlag = false;
          this.clickGroup();
        } else {
          var submitdata = {};
          this.PageCtrl.currpage++;
          var body = this.body_tmp;
          body.PageCtrl = this.PageCtrl;
          submitdata.body = encodeURI(JSON.stringify(body));
          this.queryCustomFunction(submitdata, this.displayFlag, "more");
        }
      },
      loadTop() {
        this.allLoaded = false;
        this.changeCustData();
      },
      getGroupNameText(groupNameText) {
        return "<span style='font-size:16px;color: #999999;'>" + groupNameText + "</span>";
      }
    },
    // 监听路由变化 调用查询方法
    watch: {
      "$route": "clickGroup"
    }
  }

</script>
<style scoped lang="less">
  .container {
    background-color: #FFF;
    height: 100%;
    font-size: 16px;
  }

  .head-top {
    height: 120px;
    .header-title {
      font-size: 18px;
      color: #333;
      height: 35px;
      width: 100%;
      line-height: 35px;
      img {
        width:28px;
        height:28px;
        vertical-align: middle;
      }
      span{
        font-size: 22px;
      }
    }
    /deep/.main_border2 {
      height: 54px;
      padding: 5px 10px;
      .aui-label {
        width: 200px;
      }
    }
    .pro_row {
      width: 100%;
      height: 40px;
      border-bottom: 1px solid #e5e5e5;
      line-height: 40px;
      font-size: 18px;
      color: #4C4C4C;
      span:nth-child(2) {
        font-size: 12px;
        color: #00AAFF;
      }
      img {
        margin-top: 15px;
        margin-left: 15px;
      }
    }
    .row {
      width: 100%;
      height: 15px;
      background-color: #F5F5F5;
    }
  }

  .search {
    height: 68px;
    padding: 10px 0;
    box-sizing: border-box;
    width: 99%;
    margin: 0 auto;
    .search-bottom {
      border-bottom: 1px solid #e5e5e5;
    }
  }

  .head-bottom {
    height: 44px;
    border-top: solid 1px #e5e5e5;
    border-bottom: solid 1px #e5e5e5;
  }

  .main_border2:after,
  .aui-cells:after,
  .aui-cell_access:after,
  .aui-cell__ft:after {
    border-bottom: none !important;
  }

  /*有客户群组*/

  .height1 {
    //(120+68)/12.8=(188/12.8)=14.7
    height: calc(~"100% - "188px);
    /*height: 520px;*/
  }

  /*有客户群组-删除*/

  //(120+68+70)/12.8=(188+70)/12.8=20.2
  .height2 {
    height: calc(~"100% - "258px);
    /*height: 470px;*/
  }

  /*无客户群组*/

  .height3 {
    //(68+44+2)/12.8=(114/12.8)=8.9rem
    height: calc(~"100% - "114px);
    /*height: 600px;*/
  }

  /*无客户群组-删除*/

  .height4 {
    //(68+44+2+70)/12.8=(114+70)/12.8
    height: calc(~"100% - "184px);
    /*height: 530px;*/
  }

  .plan_name {
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    /*background-image: linear-gradient(0deg, #01ABDE 0%, #0BEBE4 100%);*/
    border-radius: 50%;
    color: #fff;
    float: left;
    margin-right: 15px;
    font-size: 18px;
    font-family: 宋体;
  }

  .play_phone {
    text-align: center;
    border-right: 1px solid #e5e5e5;
    span {
      font-size: 17px;
    }
  }

  .am-fr {
    float: right;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    vertical-align: middle;
    border: 0;
  }

  .am-fl {
    float: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    vertical-align: middle;
    border: 0;
  }


  .plan_red {
    background-image: linear-gradient(-54deg, #FF5451 1%, #FA7B7B 100%);
  }

  .plan_org {
    background-image: linear-gradient(-51deg, #FF9500 0%, #FFC83D 100%);
  }

  .plan_blue {
    background-image: linear-gradient(-52deg, #267AEC 0%, #07A3FD 100%);
  }

  .plan_purple {
    background-image: linear-gradient(-229deg, #EC51B5 0%, #C44DF8 99%);
  }

  .plan_scs {
    background-image: linear-gradient(0deg, #01ABDE 0%, #0BEBE4 100%);
  }

  .set-label {
    display: inline-block;
    width: 100px;
  }

  /*loadmore组件相关自定义样式*/

  /deep/.page-loadmore-wrapper {
    overflow: scroll;
    .aui-cell__ft {
      width: 320px;
    }
    .mint-loadmore-top {
      div {
        display: inline-block;
        transition: .2s linear;
        vertical-align: middle;
        &>span {
          display: inline-block;
          position: relative;
          margin-left: 10px;
        }
      }
    }
    .mint-loadmore-bottom {
      div {
        display: inline-block;
        transition: .2s linear;
        vertical-align: middle;
        &>span {
          display: inline-block;
          position: relative;
          margin-left: 10px;
        }
      }
    }
  }

  .is-rotate {
    transform: rotate(180deg);
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

  .set-btn {
    font-size: 18px;
  }

  .del-group-box {
    height: calc(~"100% - "50px);
    overflow-y: scroll;
  }
  .del-box{
    height: 65px;
    line-height: 65px;
    .del-left{
      font-size: 18px;
      text-align: left;
      display: inline-block;
      margin-left: 5px;
    }
    .del-right{
      display: inline-block;
      font-size: 16px;
      width: 30%;
    }
  }

  /*/deep/.set-header{
    width:100%;
    background-color:#fff;
    height:46px;
    padding:3px 0;
    .aui-header-left{
      left: 18px;
      top: 14px;
      font-size: 14px;
      line-height: 21px;
      .left-arrow:before{
        width: 12px;
        height: 12px;
        top: 8px;
        left: 7px;
      }
    }
    /*
    .aui-header-title {
      margin: 0 88px;
      height: 40px;
      line-height: 46px;
      font-size:18px;
    }
    .aui-header-right{
      right: 15px;
      top: 14px;
      font-size: 14px;
      line-height: 21px;
    }
  }*/

  /*/deep/.set-switch{
    padding:6px 0;
    padding-left: 15px;
    box-sizing: border-box;
    .aui-cell__ft{
      height:52px;
      box-sizing: border-box;
      line-height:52px;
      padding:12px;
      .aui-switch{
        width:50px;
        height:30px;
        margin-right:20px;
        box-sizing: content-box;
        &:before{
          width:50px;
          height:30px;
          border-radius:15px;
        }
        &:after{
          width:30px;
          height:30px;
          border-radius:15px;
        }
        &:checked:after{
          transform: translateX(20px);
        }
      }
    }
  }*/

  /*
  .set-textarea{
    font-size:17px;
    font-family:simHei;
  }*/

</style>
