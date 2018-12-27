// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'

import App from './App'

import  './aui-m-config.js';
import  './ab-manager-config.js';

import router from './router' // 相对路径，路由文件
import store from './store'
import Pages from '@/pages.js' // 此位置为pages.js的相对路径
import { PageManager } from 'ab-manager-page'
import {RootActivityManager} from 'ab-manager-activity' // 路由管理
Vue.use(PageManager, { pages: Pages })

Vue.config.productionTip = false

//使用 agreeSDK
import AgreeSDK from "../static/AgreeSDK";
import   "../static/AgreeSDK.map.js";
import   "../agreesdk/AgreeSDK.test";
Vue.use(AgreeSDK,{
  debug: true
});

global.map =null;
/*引入aui组件*/
import AUI from '../aui-m/aui-m.js';
import AuiUtil from '../aui-m/utils.js';
import '../aui-m/theme-default/index.less';


Vue.use(AUI);
window.AuiUtil = AuiUtil;
//引入手势插件
import AlloyFinger from '../static/alloy-finger/alloy_finger' // 手势库
import AlloyFingerVue from '../static/alloy-finger/alloy_finger.vue'
Vue.use(AlloyFingerVue, {
  AlloyFinger
});
//引入悬浮球
import VueFloatingBall from '@/components/vue-floatball-master/index.js'
Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。
Vue.use(VueFloatingBall)
// 语言悬浮球
import VueFloatingBallLang from '@/components/vue-floatball-master-lang/index.js'
// Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。
Vue.use(VueFloatingBallLang)
/*use xheader*/
//引入echarts
import echarts from 'echarts';
Vue.prototype.$echarts=echarts;
import {TransferDomDirective} from '../aui-m/utils.js'
// 引入组件aui-transform
// Vue.directive('transfer-dom',TransferDomDirective)
// console.log(AuiUtil)
Vue.directive("transfer-dom",AuiUtil.directives.TransferDomDirective)

//引入日历
import '@/components/vue-event-calendar/dist/style.less'
import vueEventCalendar from 'vue-event-calendar'
Vue.use(vueEventCalendar, {locale: 'zh'}); //locale can be 'zh' or 'en'

import XHeader from "@/components/x-header"
Vue.component('XHeader', XHeader);
//引入全局样式表
import '../static/public-style/global.less';   //引入自定组件样式
//引入主题样式表
import '../static/public-style/theme-blue.less';   //引入自定组件样式
/* eslint-disable no-new */
RootActivityManager.router = router;
function  filtration(param) {
  let result = true;
  switch (param) {
    case '/main/shopShow/0':
      result = false;
      break;
    case '/main/ambientpoint/3':
      result = false;
      break;
    case '/main/smartForm/4':
      result = false;
      break;
    case '/main/handleService/5':
      result = false;
      break;
    default:
      result = true;
  }
  return result;
};
/*//router动画
import animateForRouter from '../static/js/animateForRouter'
import '../static/css/animateForRouter.css'
const options={
  duration: '0.4',              //转场动画时长，默认为0.3，单位秒
  firstEntryDisable: false,     //值为true时禁用首次进入应用时的渐现动画，默认为false
  firstEntryDuration: '0.4',     //首次进入应用时的渐现动画时长，默认为.6
  forwardAnim: 'slideInRight',   //前进动画，默认为fadeInRight
  backAnim: 'slideInRight',       //后退动画，默认为fadeInLeft
  sameDepthDisable: false,      //url深度相同时禁用动画，默认为false
  tabs: [

  ],                       //默认为[]，name对应路由的name,以实现类似app中点击tab页面水平转场效果，如tab[1]到tab[0]，会使用backAnim动画，tab[1]到tab[2]，会使用forwardAnim动画
  tabsDisable: false,           //值为true时，tabs间的转场没有动画，默认为false
  disable: false,               //禁用转场动画，默认为false，嵌套路由默认为true
};*/
// Vue.use(animateForRouter, router,options);
//路由加载前，loading
router.beforeEach(function (to, from, next) {
  // 判断 是否登录  未登录跳转登录页
  if (to.fullPath!='/' &&to.fullPath!='/login') {
  // if (to.fullPath!='/') {
    if (!sessionStorage.getItem('xToken') == 'Notoken'||sessionStorage.getItem('xToken')== null) {
      // next({
      //   path: '/',
      //   // query: { redirect: '/' }//把要跳转的地址作为参数传到下一步
      // })
      next({path:'/'}) //失败则跳转到登陆页面
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
});
import BaseData from '@/vuexBuryingPoint/base-data';
import VueEvent from '@/vuexBuryingPoint/vue-enevt';
import NativeEvent from '@/vuexBuryingPoint/native-event';
Vue.mixin(BaseData);
Vue.use(BaseData);
Vue.use(VueEvent, {
  type: '$emit'
});
Vue.mixin(VueEvent);
Vue.mixin(NativeEvent);


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
