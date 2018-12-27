<template>
  <transition name="fade">
    <!-- <select-role v-show="stepName==='selectRole'" @doSelect="doSelect"></select-role> -->
    <!-- <login v-show="stepName==='login'" @login="loginSuccess" @goBack="doSelect"></login> -->
    <div class="index-view">
      <floating-ball :theme-color="themeColor" :init-position="initPosition"
                     :popover-events="popoverEvents" v-if="$store.state.floatBallIsShow"></floating-ball>
      <!-- 主页 -->
      <transition name="slide-left">
        <div class="aside_main" v-show="showMenu">
          <div class="aside_head">
            <div class="aside_img">
              <img src="static/image/login/agree_white.png" style="height: 100%">
            </div>
            <div class="head_name">
              <span v-if="this.loginRole == 'manager'">"王婷婷-大堂经理"</span>
              <span v-if="this.loginRole == 'visitor'">"游客您好"</span>
            </div>
          </div>
          <div class="aside_body">
            <div v-for="(item,index) in menuList" class="aside_box" :key="index" @click="toJump(item,index)"
                 :class="{'ss_active':activeNum===index}">
             <span :class="'icon-'+item.icon" class="icon-style"></span>
                <!--<img v-show="activeNum!==index" :src="'static/image/icon/'+item.icon+'.svg'" alt="">
                <img v-show="activeNum===index" :src="'static/image/icon/'+item.icon+'-active.svg'" alt="">-->
              <span class="aside_title">{{item.text}}</span>
              <!--查询   右侧选项列表-->
              <div v-if="item.list!=null && activeNum===index">
                <div class="aside_body_list" v-if="showList">
                  <div class="aside_box" v-for="(item,index) in item.list" :class="{'aa_active':activeBodyNum ===index}" :key="index"
                       @click="toJumpBody(item,index)">
                    <div class="set-icon">
                      <span :class="'icon-'+item.icon"></span>
                    </div>
                    <span class="asideBody_title">{{item.text}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="aside_bott">
            <div class="bottom-icon">
              <span class="icon-calculator" @click="calculator"></span>
            </div>
            <div class="bottom-icon">
              <span class="icon-config" @click="goOut"></span>
              <div class="go-out" v-show="showgoOut">
                <div class="set-set" @click="config">设置</div>
                <div class="set-out" @click="outPutConfirmFlag=true">退出</div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div class="view_body" :class="{'full-screen':showMenu===false}">
        <keep-alive>
          <transition name="slide-right">
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </transition>
        </keep-alive>
        <transition name="slide-right">
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>
      </div>
      <float-calculator v-show="showCalculator" @close="closeCalc" ref="calc"></float-calculator>
      <div aui-transfer-dom>
        <aui-confirm v-model="outPutConfirmFlag" title="确认退出？" confirm-text="确定" cancel-text="取消" @confirm="outPut">
        </aui-confirm>
      </div>
    </div>
  </transition>
</template>

<script>
  import {RootActivityManager} from "ab-manager-activity";
  import TradeActivityManager from "@/common/activity-manager/trade-activity-manager";
  import EventNames from "@/common/activity-manager/activity-event-names"; //路由事件名称
  import loginJs from '@/common/api/login.js'
  // import ajax from '@/common/js/baseAjax'
  import FloatCalculator from "@/components/float-calculator/floatCalculator";
  //   import Login from "@/components/Login";  //登录
  //   import SelectRole from "@/components/SelectRole";  //角色选择
  import queryDictData from '@/common/api/monitoring';
  import  MENULIST from '@/activity/menu-list.js';

  export default {
    name: "indexApp",
    components: {
      FloatCalculator,
    },
    data() {
      return {
        showList: false,
        showMode: this.$i18n.locale(),
        showBack: false,
        title: this.$route.name,
        drawerVisibility: false,
        activeNum: 0,
        activeBodyNum: 11,
        showCalculator: false,
        showgoOut: false,
        outPutConfirmFlag: false,
        //悬浮球
        themeColor: "#F8A716",
        initPosition: "right middal",
        managerList: MENULIST.managerList,//管理员身份
        visitorList: MENULIST.visitorList,//游客身份
        menuList: '',//菜单列表
        popoverEvents: [
          {
            iconName: "recent-visit",
            iconSrc: "static/image/icon/recent-visit.svg",
            badge: "custvisitinfoNum",
            chName:'来访'
          },
          {
            iconName: "login-timeout",
            iconSrc: "static/image/icon/login-timeout.svg",
            badge: "personWarnNum",
            chName:'人数'
          },
          {
            iconName: "queue-timeout",
            iconSrc: "static/image/icon/queue-timeout.svg",
            badge: "timeWarnNum",
            chName:'超时'
          },
          {
            iconName: "call-help",
            iconSrc: "static/image/icon/call-help.svg",
            badge: "callHelpNum",
            chName:'呼叫'
          },
          {
            iconName: "queue-timeout",
            iconSrc: "static/image/icon/queue-timeout.svg",
            badge: "authorNum",
            chName:'授权'
          },
        ]
      };
    },
    created() {
      if (sessionStorage.getItem("loginObj") != undefined && sessionStorage.getItem("loginObj") != "") { // 登录角色ID == 'manager'){//管理员身份
        this.menuList = this.managerList;
        this.showMenu = true;
      } else {
        this.menuList = this.visitorList;
        this.showMenu= false;
      /*  this.$activityManager.requestUpdateView(EventNames.SHOPSHOW);*/
      }
    },
    mounted(){
     /* this.showMenu=true;*/
    },
    computed: {
      showMenu:{
        get(){
          return this.$store.state.showMenu;
        },
        set(val){
          this.$store.commit('setShowMenu',val);
        }
      },
      path() {
        return this.$route.path;
      },
      locale() {
        return this.$i18n.locale()
      },
      headerTitle() {
        return "header." + this.title;
      },
      options() {
        return [{
          value: this.$t("app.zhCN"),
          key: "zh-CN"
        },
          {
            value: this.$t("app.zhTw"),
            key: "zh-tw"
          },
          {
            value: this.$t("app.English"),
            key: "en"
          }
        ];
      },
      /*ball num*/
      ballClickNum: {
        set(val) {
          this.$store.commit("setBallNum", val);
        },
        get() {
          return this.$store.state.ballClickNum;
        }
      },
      loginRole: {
        get() {
          return this.$store.state.loginRole;
        },
        set(val) {
          this.$store.commit("setLoginRole", val);
        },
      },
      warnQueryNum: {
        get() {
          return this.$store.state.warnQueryNum;
        },
        set(val) {
          this.$store.commit("setWarnQueryNume", val);
        }
      }
    },
    watch: {
      path(newVal) {
        if (newVal !== "/login") {
          this.showBack = true;
        }
        this.title = this.$route.name;
      },
      locale(val) {
        this.showMode = val
      },
      ballClickNum(value) {
        if (value == 0) {
          this.ShowDataIonic();
        } else if (value == 1) {
          this.ShowDataHeart();
        } else if (value == 2) {
          this.ShowDataHappy();
        } else if (value == 3) {
          this.ShowDataEarth();
        } else if (value == 4) {
          this.ShowAuthor();
        }
      },
      showCalculator(val){
        if (val === false) {
          this.$refs.calc.close();
        }
      }
    },
    methods: {
        //返回游客主页
      backToIndexPage(){
        this.$activityManager.requestUpdateView(EventNames.INDEXPAGE); //去游客的菜单页
      },
      //悬浮球
      ShowDataIonic() {
        this.warnQueryNum = 1;//客户来访通知
        this.$activityManager.requestUpdateView(EventNames.SEARCH);
      },
      ShowDataHeart() {
        this.warnQueryNum = 2;//排队人数预警
        this.$activityManager.requestUpdateView(EventNames.SEARCH);
      },
      ShowDataHappy() {
        this.warnQueryNum = 3;//排队超时预警
        this.$activityManager.requestUpdateView(EventNames.SEARCH);
      },
      ShowDataEarth() {
        this.warnQueryNum = 5;//呼叫帮助
        this.$activityManager.requestUpdateView(EventNames.SEARCH);
      },
      ShowAuthor() {
        this.warnQueryNum = 8;//授权
        this.$activityManager.requestUpdateView(EventNames.SEARCH);
      },

      changeDrawer() {
        this.drawerVisibility = !this.drawerVisibility;
      },
      onShowModeChange(val) {
        this.$i18n.set(val);
        this.drawerVisibility = false;
      },
      toJumpBody(item, index){
        this.activeBodyNum = index
        this.$activityManager.requestUpdateView(EventNames[item.name]);
      },
      //点击左侧菜单进行跳转
      toJump(item, index){
        if (item.name == 'LIST') {
          if (this.showList) {
            this.showList = false;
          } else {
            this.showList = true;
          }
          this.activeNum = index;
        } else {
          this.activeNum = index;
          this.showList = false;
          this.activeBodyNum = 11
          this.$activityManager.requestUpdateView(EventNames[item.name]);
        }
      },
      //计算器功能
      calculator(){
        this.showCalculator = !this.showCalculator;
      },
      //关闭计算器
      closeCalc(){
        this.showCalculator = false;
      },
      text(){
        this.$store.state.authorNum += 1;
      },
      // 查询数据字典

      goOut(){
        this.showgoOut = !this.showgoOut;
      },
      outPut(){
        this.showgoOut = false;
        this.$store.commit('setLoginRole', '');
        this.$activityManager.requestUpdateView(EventNames.SELECTROLE);
        sessionStorage.setItem('xToken', '');
        sessionStorage.setItem('loginObj', '');  // 登录角色ID
        this.outPutConfirmFlag = false;
        this.$store.state.floatBallIsShow = false;
      },
      //系统设置
      config(){
        this.$activityManager.requestUpdateView(EventNames.SETTING);
        this.showgoOut = false;
      },
    }
  };

</script>

<style scoped lang="less">
  @import '../../static/public-style/theme-blue.less';


  /*动画*/
  /*新组件进入:初始位置,偏移1000px,隐藏*/
  .slide-right-enter {
    transform: translateX(100%);
    opacity: 0;
  }
  /*新组件进入进入:动画回到原始正常位置的持续时长*/
  .slide-right-enter-active {
    transition: all 0.4s ease;
  }
  /*旧组件离开:离开时长,从当前正常位置到最终位置的时间*/
  .slide-right-leave-active {
    /*transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
    transition: all 0s;
  }
  /*旧组件离开:最终消失时的位置,偏移1000px,隐藏*/
  .slide-right-leave-to {
    opacity: 0;
  }

  .slide-left-enter {
    transform: translateX(-100%);
    opacity: 0;
  }
  /*新组件进入进入:动画回到原始正常位置的持续时长*/
  .slide-left-enter-active {
    transition: all 0.4s ease;
  }
  /*旧组件离开:离开时长,从当前正常位置到最终位置的时间*/
  .slide-left-leave-active {
    transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    /*transition: all 0s;*/
  }
  /*旧组件离开:最终消失时的位置,偏移1000px,隐藏*/
  .slide-left-leave-to {
    opacity: 0;
    transform: translateX(-100%);
  }
  .index-view {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .view_body {
    float: right;
    width: 89%;
    height: 100%;
    overflow: hidden;
    font-size: 16px;
    background-color: #fff;
  }
  .full-screen{
    width:100%;
  }
  .aside_main {
    padding-top: 24px;//状态栏高度24
    height: 99.9%;
    width: 11%;
    text-align: center;
    float: left;
    border-bottom: 1px solid @slide-bg-border;
    background-color: @slide-bg-color;
  }

  .aside_body {
    width: 100%;
    font-size: 16px;
    overflow-y: auto;
    height: 580px;
    border-bottom: 1px solid @slide-bg-border;
  }

  .aside_body span {
  }

  .aside_img {
    height: 60px;
    width:82px;
    margin:0 auto;
    padding:10px;
    box-sizing: border-box;
    img{
      width:100%;
      height:100%;
    }
  }

  .aside_box {
    width: 100%;
    text-align: left;
    height: 60px;
    color: @slide-color;
    box-sizing: border-box;
    padding-left: 15px;
    padding-top: 15px;
  }

  .aside_head {
    height: 100px;
    border-bottom: 1px solid @slide-bg-border;
  }

  .aside_bott {
    padding-top: 20px;
    height: 80px;
    box-sizing: border-box;
    .bottom-icon{
      color:@slide-color;
      display: inline-block;
      width: 30px;
      height: 30px;
      position: relative;
      span{
        font-size:26px;
        margin-left:0;
      }
      &:nth-child(1) {
        margin-right: 20px;

      }

    }
  }

  .fa {
    font-size: 22px;
    color: #fff3f8;
    margin-top: 33px;
    margin-left: 28px;
  }

  span {
    font-size: 14px;
    margin-left: 10px;
  }

  .head_name {
    font-size: 14px;
    color:@slide-color;
    font-weight: 500;

  }

  .ss_active {
    background-color: @slide-bg-active;
    .aside_title {
      color: @slide-color-active;
    }
    .icon-style{
      color:@slide-color-active;
    }
  }
  .aa_active {
    background-color: @slide-bg-active;
  }

  .aa_active .asideBody_title {
    color: @theme-color;
  }

  .set-icon {
    width: 26px;
    height: 26px;
    display: inline-block;
    span{
      font-size:22px;
      vertical-align: middle;
    }
  }
  .icon-style{
    color:@slide-color;
    font-size:22px;
    vertical-align: middle;
  }
  .go-out {
    border-radius: 7px;
    width: 112px;
    background-color:@slide-bg-color;
    position: absolute;
    left: 52px;
    top: -45px;
    z-index: 150;
    height: 91px;
  }

  .go-out div {
    height: 46px;
    color: #fff;
    font-size: 16px;
    text-align: center;
    line-height: 46px;
    border-bottom: 1px solid #e6e6e6;
  }

  .aside_body_list {
    width: 130px;
    margin-left: 120px;
    background-color:@slide-bg-color;
    overflow-y: auto;
    position: absolute;
    z-index: 900;
    margin-top: -40px;
    font-size: 16px;
  }
</style>
