import Vue from 'vue';

//自动化测试
import ATBase from './at/base.js';
import RecAuiInfo from './at/rec-aui-info.js';
import RecNativeInfo from './at/rec-native-info.js';

Vue.use(ATBase);
Vue.use(RecAuiInfo, {
    type:'$emit',
    router:router
});
Vue.mixin(RecNativeInfo);

//数据埋点
import BaseData from './burying-point/base-data.js';
import TransData from './burying-point/trans-data.js';
import TransPageData from './burying-point/trans-page-data.js';
import TransPageNativeControl from './burying-point/trans-page-native-control.js';
import TransPageVueControl from './burying-point/trans-page-vue-control.js';

Vue.use(BaseData);
Vue.use(TransData);
Vue.mixin(TransPageData);
Vue.mixin(TransPageNativeControl);
Vue.use(TransPageVueControl, {type: '$emit'});
Vue.mixin(TransPageVueControl);