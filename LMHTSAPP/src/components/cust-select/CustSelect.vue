<template>
  <div class="agree-studio-container">
  <div v-transfer-dom>
    <!--:show-mask="false"-->
        <aui-popup :value="value" :hide-on-blur="hideOnBlur"  style="width:100%;height:100%;background:#fff;"  @on-show="onShowFuncForWindow()" >
          <div slot="default" style="width:100%;margin: 0 auto;overflow: hidden;">

            <aui-header :showBack="false" style="width:100%;height:3.9vw;background-color: #FFF;">
              <div slot="default" style="color: #333;">客户选择</div>
              <a slot="left" style="font-size: 1.4vw;color:#999;" @click="onHideFuncForWindow()">取消</a>
              <a slot="right" style="padding-right:0.8vw;font-size: 1.4vw;color:#999;" @click="selectedForWindow()">确定<span v-if="isChecker">{{checkboxCountForWindow==0?'':'('+checkboxCountForWindow+')'}}</span></a>
            </aui-header>
            <div class="inputBottomLine"></div>
            <div style="width:100%;margin: 0 auto;overflow: hidden;">


                <div class="search">
                  <aui-search :autoFixed="false" v-model="searchInputForWindow" placeholder="搜索" cancel-text="取消" @on-submit="changeCustDataForWindow"></aui-search>
                </div>

              <div style="height: 3.4vw;">
                <div class="inputBottomItemLine"></div>
                <aui-flexbox style="padding-top:0.6vw;">
                  <aui-flexbox-item :span="1/3">
                    <aui-popup-radio title="我的群组" placeholder="请选择" :options="selectGroupListForWindow" v-model="selectGroupValueForWindow" @on-change="selectGroupChangeForWindow"
                              style="border-right: solid 1px #d9d9d9;height:0.4vw;font-size: 1.3vw;" :show-dialog="true" :show-title="false" :hide-on-blur="true" @on-show="hideELement"></aui-popup-radio>
                  </aui-flexbox-item>
                  <aui-flexbox-item :span="1/3">
                    <aui-popup-radio title="客户类别" placeholder="请选择" :options="selectTypeListForWindow" v-model="selectTypeValueForWindow" @on-change="selectTypeChangeForWindow"
                              style="border-right: solid 1px #d9d9d9;height: 0.4vw;font-size: 1.3vw;"  :show-dialog="true" :show-title="false" :hide-on-blur="true" @on-show="hideELement"></aui-popup-radio>
                  </aui-flexbox-item>
                </aui-flexbox>
              </div>
              <div class="inputBottomItemLine"></div>
              <div class="page-loadmore-wrapper" ref="wrapperWindow" :style="{height:custListHeightForWindow}">
                <mt-loadmore :bottom-method="loadBottomForWindow" :bottom-all-loaded="allLoadedForWindow" @bottom-status-change="handleBottomChangeForWindow"
                             @top-status-change="handleTopChangeForWindow" :top-method="loadTopForWindow" ref="loadmoreForWindow">
                  <aui-group gutter="0">
                    <aui-checker v-model="checkboxValueForWindow" :type="isChecker?'checkbox':'radio'" selected-item-class="Row_active" @on-change="checkerOnChangeForWindow">
                      <div v-for="(tmpObj,index) in customGroupListForWindow" :key="'checker'+index">
                        <aui-checker-item :value="index" style="width:100%;border-bottom: solid 1px #d9d9d9;" :key="'checker-item'+index">
                          <aui-cell :title="tmpObj.cust_name" title-style="font-weight: bold;" default-sort-style="width:65%;"
                                :id="'select'+tmpObj.cust_no" :key="'selfcell'+index" main-sort-style="line-height:2.8vw;"
                                inline-desc-style="padding-right:2.3vw;" :inline-desc-el="getGroupNameTextForWindow(tmpObj.group_name_text)">

                            <div slot="icon">
                              <input v-if="isChecker" :checked="tmpObj.selected" style="width: 2vw;height: 2vw;margin:1.2vw 1.6vw 0 0.8vw;float: left;" :id="index" name="deleteCustomCheckboxWindow" type="checkbox" :value="tmpObj.cust_no"/>
                              <div style="float: right;" class="plan_name" :class="getPlanColorArrayForWindow(index)" >{{getCustNameShortForWindow(tmpObj.cust_name)}}</div>
                            </div>

                            <div slot="default">
                              <aui-flexbox>
                                <aui-flexbox-item :span="1/4">
                                  <div class="play_phone" style="border-left: 1px solid #e5e5e5;">
                                    <span style="font-weight: bold;">性别：</span>
                                    <span>男</span>
                                  </div>
                                </aui-flexbox-item>
                                <aui-flexbox-item :span="1/4">
                                  <div class="play_phone">
                                    <span style="font-weight: bold;">生日：</span>
                                    <span>{{tmpObj.birthday_gc}}</span>
                                  </div>
                                </aui-flexbox-item>
                                <aui-flexbox-item :span="1/4">
                                  <div class="play_phone">
                                    <span style="font-weight: bold;">手机：</span>
                                    <span>{{tmpObj.contact_tele}}</span>
                                  </div>
                                </aui-flexbox-item>
                              </aui-flexbox>
                            </div>
                          </aui-cell>
                        </aui-checker-item>
                      </div>
                    </aui-checker>
                  </aui-group>
                  <!--加载显示设置-->
                  <div slot="top" class="mint-loadmore-top">
                    <div v-show="topStatusForWindow !== 'loading'" :class="{ 'is-rotate': topStatusForWindow === 'drop' }">
                      <span>↓</span>
                    </div>
                    <div v-show="topStatusForWindow === 'pull'">
                      <span>下拉刷新</span>
                    </div>
                    <div v-show="topStatusForWindow === 'drop'">
                      <span>释放更新</span>
                    </div>
                    <div v-show="topStatusForWindow === 'loading'">
                      <mt-spinner type="snake"></mt-spinner>
                    </div>
                  </div>
                  <div slot="bottom" class="mint-loadmore-bottom">
                    <div v-show="bottomStatusForWindow !== 'loading'" :class="{ 'is-rotate': bottomStatusForWindow === 'drop' }">
                      <span>↑</span>
                    </div>
                    <div v-show="bottomStatusForWindow === 'pull'">
                      <span>上拉加载更多</span>
                    </div>
                    <div v-show="bottomStatusForWindow === 'drop'">
                      <span>释放加载更多</span>
                    </div>
                    <div v-show="bottomStatusForWindow === 'loading'">
                      <mt-spinner type="snake"></mt-spinner>
                    </div>
                  </div>
                  <div style="text-align: center;padding-top:0.8vw" v-if="allLoadedForWindow===true">加载完毕</div>
                </mt-loadmore>
              </div>

              <div v-if="isChecker" style="background-color: #FFF;border-top: 1px solid #E5E5E5;width:70.3vw;height: 5.5vw;line-height: 5.5vw;overflow-x: auto;overflow-y: hidden;">
                <div v-if="selectArrayWindowList.length == 0" style="font-size: 1.6vw;color: red;padding-left: 1.6vw;">没有选择记录...</div>
                <div v-else style="padding:0.4vw 1.2vw;" :style="{width:selectArrayWindowWidth + 'px'}">
                  <a v-for="(selectArrayWindowItem,index) in selectArrayWindowList" href="javascript:void(0)" @click="goSelectPosition(selectArrayWindowItem.cust_no)">
                    <div class="plan_name" :class="getPlanColorArrayForWindow(index)" style="font-weight:bold;">{{getCustNameShortForWindow(selectArrayWindowItem.cust_name)}}</div>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </aui-popup>
  </div>
  </div>
</template>
<script>
  import customApi from '@/common/js/customGroup'
  import api from '@/common/js/common'
  import ajaxApi from '@/common/api/custom'
  import MtLoadmore from '@/components/loadmore'
  import MtSpinner from '@/components/spinner'

  export default {
    name: 'cust-select',
    components: {
      customApi,
      api,
      ajaxApi,
      MtLoadmore,
      MtSpinner
    },
    props: {
      isTransparent: {
        type: Boolean,
        default: false
      },
      value: {
        type: Boolean,
        default: false
      },
      isChecker: {
        type: Boolean,
        default: false
      },
      dialogStyle: Object,
      hideOnBlur: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      /*待删除元素*/
      hideELe(){
        return document.querySelector('.aui-cells__radio');
      },
      selectGroupListForWindow(){
        return customApi.getSelectGroupList(this.$store.state.ownerCustomGroupList);
      },
      defaultDivStyle(){
        if(this.isTransparent){
          return "width:70%;margin: 0 auto;overflow: hidden;";
        }else{
          return "width:100%;margin: 0 auto;overflow: hidden;";
        }
      },
      defaultDivStyle2(){
        if(this.isTransparent) {
          return "background-color: #FFFFFF;width:100%;margin: 0 auto;";
        }else{
          return "background-color: #FFFFFF;width:80%;margin: 0 auto;";
        }
      },
      popupHeight(){
        if(this.isTransparent) {
          return "100%";
        }else{
          return "100%";
        }
      },
      custListHeightForWindow(){
        if(this.isTransparent) {
          return "100%";
        }else{
          return "100%";
        }
      },
      popupStyle(){
        if(this.isTransparent) {
          return "position: fixed;";
        }else{
          return "";
        }
      }
    },
    data () {
      return {
        searchInputForWindow:"",
        customGroupListForWindow : [],
        PageInfoForWindow:{},
        checkboxValueForWindow:null,
        selectGroupValueForWindow:"",
        selectTypeListForWindow:[{"key":"105","value":"我的主管客户"},{"key":"106","value":"我的辅管客户"},{"key":"104","value":"我的全部客户"},{"key":"102","value":"本机构主管客户"},{"key":"103","value":"本机构辅管客户"},{"key":"101","value":"本机构全部客户"}],
        selectTypeValueForWindow:"",
        checkboxCountForWindow:0,
        planColorArrayForWindow:['plan_red', 'plan_org', 'plan_blue', 'plan_purple', 'plan_scs'],
        allLoadedForWindow: false,  // 数据加载状态   true时表示数据没有加载完毕
        bottomStatusForWindow: '',  //上拉刷新状态
        topStatusForWindow: '',    // 下拉刷新状态
        selectArrayWindowList:[],
        selectArrayWindowWidth:0,
      }
    },
    created(){
      var _this = this;
      var submitdata = {};
      var PageCtrl = {};
      PageCtrl.currpage = 0;
      PageCtrl.pageflag = 4;
      PageCtrl.pagenum = 0;
      var body = {};
      body.PageCtrl = PageCtrl;
      submitdata.body = JSON.stringify(body);

      ajaxApi.groupQuery(submitdata,function(response){
        var result = response;
        _this.$store.commit('update_ownerCustomGroupList', result.Group);
      });
    },
    methods: {
      /*隐藏底部弹出的多余元素*/
      hideELement(){
        let child=document.querySelector('.aui-popup-bottom.aui-popup-show>.aui-cells_radio');
        if(child){
          child.parentNode.removeChild(child);
        }
      },
      goSelectPosition(position){
        var positionItem = this.$el.querySelector("#select"+position);
        this.$refs.wrapperWindow.scrollTop = positionItem.offsetTop;
      },
      reSetFunction(){
        this.selectArrayWindowList = [];
        this.customGroupListForWindow = [];
        this.checkboxCountForWindow = 0;
        this.checkboxValueForWindow = null;
        this.allLoadedForWindow = false;
      },
      queryCustomFunctionForWindow(submitdata, direction) {
        var displayFlag = false;

        if(this.searchInputForWindow != null && this.searchInputForWindow != ''){
          submitdata.body.cust_name = this.searchInputForWindow;
        }
        if(this.selectTypeValueForWindow != ""){
          displayFlag = false;
          submitdata.body.cust_range = "800013000"+(this.selectTypeValueForWindow-100);
        }else if(this.selectGroupValueForWindow != ""){
          displayFlag = true;
          submitdata.body.group_id = this.selectGroupValueForWindow;
        }else{
          return;
        }

        submitdata.body = encodeURI(JSON.stringify(submitdata.body));
        var _this = this;
        ajaxApi.customQuery(submitdata, displayFlag,function(response){
          var result = response;
          _this.PageInfoForWindow = result.PageInfo;
          _this.customGroupListForWindow = _this.customGroupListForWindow.concat(result.PersonInfo);
          if (direction == 'top') {
            _this.$refs.loadmoreForWindow.onTopLoaded();
          } else {
            _this.$refs.loadmoreForWindow.onBottomLoaded({top:0});
          }
          if (_this.PageInfoForWindow.nowpagenum == _this.PageInfoForWindow.totalpagenum) {
            _this.allLoadedForWindow = true;
          }
//          _this.$aui.loading.hide();
        });
      },
      changeCustDataForWindow(){
//        this.$aui.loading.show({
//          text: '加载中。。。'
//        });
        this.reSetFunction();
        var submitdata = {};
        var body = {};
        var PageCtrl = {};
        PageCtrl.currpage = 0;
        PageCtrl.pageflag = 3;
        PageCtrl.pagenum = 10;
        body.PageCtrl = PageCtrl;
        submitdata.body = body;
        this.queryCustomFunctionForWindow(submitdata, 'top');
      },
      onHideFuncForWindow(){
        this.reSetFunction();
        this.searchInputForWindow = "";
        this.selectTypeValueForWindow = "";
        this.$emit("on-hide");
      },
      onShowFuncForWindow(){
//        this.$aui.loading.show({
//          text: '加载中。。。'
//        });
        var _this = this;
        setTimeout(function(){
          _this.selectTypeValueForWindow = "104";
        },500);
      },
      getCustNameShortForWindow(cust_name){
        if(cust_name == undefined){
          return "无";
        }else{
          return api.getShortName(cust_name);
        }
      },
      getGroupNameTextForWindow(group_name){
        return "白金会员";
      },
      selectGroupChangeForWindow(value){
        if(this.selectGroupValueForWindow != ""){
          this.selectTypeValueForWindow = "";
          this.changeCustDataForWindow();
        }
      },
      selectTypeChangeForWindow(value){
        if(this.selectTypeValueForWindow != "") {
          this.selectGroupValueForWindow = "";
          this.changeCustDataForWindow();
        }
      },
      checkerOnChangeForWindow(value){
        for(let j=0; j<this.customGroupListForWindow.length; j++){
          this.customGroupListForWindow[j]["selected"] = false;
        }
        if(value == null){
          return;
        }
        if(this.isChecker){
          this.selectArrayWindowList = [];
          for(let i=0; i<this.checkboxValueForWindow.length; i++){
            this.customGroupListForWindow[this.checkboxValueForWindow[i]]["selected"] = true;
            this.selectArrayWindowList.push(this.customGroupListForWindow[this.checkboxValueForWindow[i]]);
          }
          if(this.checkboxValueForWindow != null && this.checkboxValueForWindow != []) {
            this.checkboxCountForWindow = this.checkboxValueForWindow.length;
          }
          this.selectArrayWindowWidth = 70 * this.checkboxCountForWindow;
        }
      },
      selectedForWindow(){
        var returnValue = [];
        if(this.checkboxValueForWindow == 0){
          returnValue.push(this.customGroupListForWindow[0]);
        }else if(this.checkboxValueForWindow != null && this.checkboxValueForWindow != []) {
          if(!this.isChecker){
            returnValue.push(this.customGroupListForWindow[this.checkboxValueForWindow]);
          }else{
            for (var i = 0; i < this.checkboxValueForWindow.length; i++) {
              returnValue.push(this.customGroupListForWindow[this.checkboxValueForWindow[i]]);
            }
          }
        }
        this.onHideFuncForWindow();
        this.$emit("selected", returnValue);
      },
      getPlanColorArrayForWindow(index){
        return this.planColorArrayForWindow[index%5];
      },
      // 下拉加载数据相关方法
      handleBottomChangeForWindow (status) {
        this.bottomStatusForWindow = status;
      },
      handleTopChangeForWindow (status) {
        this.topStatusForWindow = status;
      },
      loadBottomForWindow () {
//        this.$aui.loading.show({
//          text: '加载中。。。'
//        });

        var submitdata = {};
        var PageCtrl = {};
        PageCtrl.currpage = this.PageInfoForWindow.nowpagenum;
        PageCtrl.pageflag = 3;
        PageCtrl.pagenum = 10;
        var body = {};
        body.PageCtrl = PageCtrl;
        submitdata.body = body;
        this.queryCustomFunctionForWindow(submitdata);
      },
      loadTopForWindow () {
//        this.$aui.loading.show({
//          text: '加载中。。。'
//        });
        this.allLoadedForWindow = false;
        this.changeCustDataForWindow();
      }
    }
  };
</script>
<style scoped lang="less">
.inputBottomLine{
  border-bottom: solid 1px rgba(120, 90, 77, 0.58);
}

.inputBottomItemLine{
  border-bottom: solid 1px #d9d9d9;
}

.search {
  height: 40px;
  padding: 10px 0;
  width: 99%;
  margin:0 auto;
}

.Row_active{
  background: #d4f2fa;
  border-left: 4px solid #FF5C5C;
  color: #FF5C5C;
}

.plan_name{
  width: 55px;
  height: 55px;
  line-height: 55px;
  text-align: center;
  /*background-image: linear-gradient(0deg, #01ABDE 0%, #0BEBE4 100%);*/
  border-radius: 50%;
  color: #fff;
  float: left;
  margin-right: 15px;
  font-size: 23px;
}
.play_phone{
  text-align:center;
  font-size: 12px;
  border-right: 1px solid #e5e5e5;
}
.plan_red{background-image: linear-gradient(-54deg, #FF5451 1%, #FA7B7B 100%);}
.plan_org{background-image: linear-gradient(-51deg, #FF9500 0%, #FFC83D 100%);}
.plan_blue{background-image: linear-gradient(-52deg, #267AEC 0%, #07A3FD 100%);}
.plan_purple{background-image: linear-gradient(-229deg, #EC51B5 0%, #C44DF8 99%);}
.plan_scs{background-image: linear-gradient(0deg, #01ABDE 0%, #0BEBE4 100%);}

/*loadmore组件相关自定义样式*/
.page-loadmore-wrapper {
  overflow: scroll;
}

.mint-loadmore-bottom {}

.mint-loadmore-bottom div {
  display: inline-block;
  transition: .2s linear;
  vertical-align: middle;
}

.mint-loadmore-bottom div > span {
  display: inline-block;
  position: relative;
  margin-left: 10px;
}

.mint-loadmore-top {}

.mint-loadmore-top div {
  display: inline-block;
  transition: .2s linear;
  vertical-align: middle;
}

.mint-loadmore-top div > span {
  display: inline-block;
  position: relative;
  margin-left: 10px;
}

.is-rotate {
  transform: rotate(180deg);
}
</style>
