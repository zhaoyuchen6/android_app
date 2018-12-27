// 提供定制的AUI组件注册，和国际化文件的配置
import Vue from 'vue'
import vuexI18n from "vuex-i18n"
import {
  AuiButton,
  AuiDrawer,
  AuiGroup,
  AuiRadio,
  AuiHeader,
  AuiViewBox,
  AuiCell,
  AuiStep,
  AuiStepItem,
  AuiInput,
  AuiAlert
} from 'AUI/aui-m.js';


const AuiComponents = [
  AuiButton, AuiDrawer, AuiGroup, AuiRadio, AuiHeader, AuiViewBox, AuiCell, AuiStep, AuiStepItem, AuiInput, AuiAlert
]

for(let i = 0;i<AuiComponents.length;i++ ){
  Vue.use(AuiComponents[i])
} 

import 'AUI/theme-default/index.less';

//项目国际化文件
import AUIDefaultLang from '../static/locales/AUILang/zh-CN'
import AUIEnLang from '../static/locales/AUILang/en'
import AUIZhTwLang from '../static/locales/AUILang/zh-tw'
import AUIZhJpLang from '../static/locales/AUILang/zh-Jp'
import AUIZhKoLang from '../static/locales/AUILang/zh-Ko'

//项目国际化文件
import en from '../static/locales/en'
import zhCN from '../static/locales/zh-cn'
import zhTw from '../static/locales/zh-tw'
import zhJp from '../static/locales/zh-jp'
import zhKo from '../static/locales/zh-ko'

//合并文件
import objectAssign from 'object-assign'

const Locales = {
  'en': objectAssign(AUIEnLang, en),
  'zh-CN': objectAssign(AUIDefaultLang, zhCN),
  'zh-tw': objectAssign(AUIZhTwLang, zhTw),
  'zh-jp': objectAssign(AUIZhJpLang, zhJp),
  'zh-ko': objectAssign(AUIZhKoLang, zhKo),
}

for (let i in Locales) {
  Vue.i18n.add(i, Locales[i])
}

import config from '../static/config.js'
Vue.i18n.set(config.lang)

