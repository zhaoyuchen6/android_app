import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/activity/Login'
import IndexApp from '@/activity/IndexApp'
import SelectRole from '@/activity/SelectRole'
import Home from '@/activity/Home'
import I18n from '@/activity/I18n'
import First from '@/modules/first/first'
import AmebientPoint from '@/modules/amebient-point/amebientPoint' //周边网点
import CounterMonitoring from '@/modules/counter-monitoring/counterMonitoring.vue' //柜面监控
import QueueMonitoring from '@/modules/queue-monitoring/queueMonitoring.vue' //排队监控
import ShopShow from '@/modules/shop-show/shopShow.vue' //产品展示
import SmartForm from '@/modules/smart-form/smartForm.vue' //智能填单
import CustCenter from '@/modules/custom/CustCenter.vue' //客户信息
import CustomRouter from '@/modules/custom/CustomRouter.vue' //客户管理
import CustomList from '@/modules/custom/CustomList.vue' //客户列表
import CustomGroupDetail from '@/modules/custom/CustomGroupDetail.vue' //创建群组
import CustomInfo from '@/modules/custom/CustomInfo.vue' //客户详细信息
import CustomInfoInfo from '@/modules/custom/CustomInfoInfo.vue' //客户详细信息列表
import ComprehensiveContract from '@/modules/comprehensive-contract/comprehensiveContract.vue' //综合签约
import search from '@/modules/search/search.vue' //search
import setting from '@/modules/setting-up/settingMain' //设置
import negative from '@/modules/negative/negative' //差评
import Knowledge from '@/modules/knowledge-base/knowledgeBase' //热销大图
import IndexPage from '@/activity/IndexPage' //新首页
import DeviceMonitor from '@/modules/device-monitor/deviceMonitor' //设备监控
import monitorInfo  from '@/modules/monitor-info/monitorInfo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/indexPage',
      name:"indexPage",
      component:IndexPage

    },
    {
      path: '/',
      name: "SelectRole",
      component: SelectRole
    },
    {
      path: '/login',
      name: "login",
      component: Login
    },
    {
      path: '/i18n',
      name: "i18n",
      component: I18n
    },
    {
      path: '/first',
      name: "first",
      component: First
    },
    {
      path: '/IndexApp',
      name: "IndexApp",
      component: IndexApp,
      children: [{
          path: 'home',
          name: "home",
          component: Home,
          children: [{
            path: 'first',
            name: "first",
            component: First
          }]
        },
        {
          path: 'amebientPoint',
          name: "amebientPoint",
          component: AmebientPoint,
          meta: {
            keepAlive: true // 需要被缓存
          }
        },
        {       //监控信息
          "path": "monitorInfo",
          "name": "monitorInfo",
          component: monitorInfo
        },
        {
          path: 'counterMonitoring',
          name: "counterMonitoring",
          component: CounterMonitoring
        },
        {
          path: 'queueMonitoring',
          name: "queueMonitoring",
          component: QueueMonitoring
        },
        {
          path: 'shopShow',
          name: "shopShow",
          component: ShopShow
        },
        {
          path: 'smartForm/:index',
          name: "smartForm",
          component: SmartForm
        },
        {
          path: 'CustCenter',
          name: "CustCenter",
          component: CustCenter
        },
        {
          path: 'custom',
          component: CustomRouter,
          children: [{
              path: 'customList/:index',
              component: CustomList,
            },
            {
              path: 'customGroupDetail/:index',
              component: CustomGroupDetail,
            },
            {
              path: 'customInfo/:cust_no',
              component: CustomInfo,
            },
            {
              path: 'customInfoInfo/:cust_no',
              component: CustomInfoInfo,
            },
          ]
        },
        {
          path: 'comprehensiveContract',
          name: "comprehensiveContract",
          component: ComprehensiveContract
        },
        {
          path: 'search',
          name: "search",
          component: search,
        },
        {
          path: 'knowledge',
          name: "knowledge",
          component: Knowledge,
        },
        {
          path: 'setting',
          name: "setting",
          component: setting
        },
        {
          path: 'negative',
          name: "negative",
          component: negative
        },
        {
          path: 'deviceMonitor',
          name: "deviceMonitor",
          component: DeviceMonitor
        }
      ]
    },

  ]
})
