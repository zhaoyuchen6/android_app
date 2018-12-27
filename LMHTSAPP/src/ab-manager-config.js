import Vue from 'vue'
import store from './store'
import router from './router' // 相对路径，路由文件
import {RootActivityManager} from 'ab-manager-activity' // 路由管理
import { PageManager } from 'ab-manager-page'
import { StoreManager }  from 'ab-manager-store'
import Pages from '@/pages.js' // 此位置为pages.js的相对路径

Vue.use(PageManager, { pages: Pages })

Vue.config.productionTip = false

//初始化 StoreManager 需要注入store
StoreManager.init(store) 
 
RootActivityManager.router = router;
RootActivityManager.Vue = Vue;
//服务
import { ServicesManager } from 'ab-manager-services'
// 此处services-plugin.js以及services-names.js文件需要手动创建
// 每条服务的配置
import ServicesPlugin from '@/common/services-manager/services-plugin.js' // 相对路径 
// 定义服务名的常量
import ServicesNames from '@/common/services-manager/services-names.js' // 相对路径
// 定义统一错误处理信息的函数
import ServicesError from './common/services-manager/services-error.js' // 相对路径
// 在初始化的时候将plugin传入ServicesManager
Vue.use(ServicesManager, {plugin: ServicesPlugin, errorHandle: ServicesError});