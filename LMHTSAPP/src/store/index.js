import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        currentLang: 0, //当前选择的语音
        loginRole: "",
        isShowAsideMenu: false,
        loadingShow: false,
        deleteCustomFlag: false, //是否删除群组客户--客户管理界面使用
        displayFlag: false, //是否显示群组相关模块--客户管理界面使用
        customComeBackFlag: false,
        ownerCustomGroupList: [],
        customMainRefreshFlag: false,
        clickGroupRefreshFlag: true,
        percent: 10, // 全局进度条
        menuActive: false,
        mainIndex: 0,
        floatBallIsShow: false,
        ballClickNum: 0, //悬浮球点击事件
        custvisitinfoNum: 0, //客户帮助
        personWarnNum: 0, //人数预警
        timeWarnNum: 0, //超时预警
        callHelpNum: 0, //呼叫帮助
        authorNum: 0, //授权
        isManager: false, //是否是大堂经理
        queueList: [], //排队监控队列
        showTable: false, //理财计算器--是否显示表格
        warnQueryNum: -1, //预警查询数字
        touchTable: false, //滑动理财计算器表格
        showMenu: false //是否显示左侧菜单
    },
    getters: {
        isShowAsideMenu: state => state.isShowAsideMenu,
        loadingShow: state => state.loadingShow,
        deleteCustomFlag: state => state.deleteCustomFlag,
        displayFlag: state => state.displayFlag,
        customComeBackFlag: state => state.customComeBackFlag,
        ownerCustomGroupList: state => state.ownerCustomGroupList,
        customMainRefreshFlag: state => state.customMainRefreshFlag,
        clickGroupRefreshFlag: state => state.clickGroupRefreshFlag,
        percent: state => state.percent,
        menuActive: state => state.menuActive,
        mainIndex: state => state.mainIndex,
        ballClickNum: state => state.ballClickNum,
        callHelpNum: state => state.callHelpNum,
        custvisitinfoNum: state => state.custvisitinfoNum,
        personWarnNum: state => state.personWarnNum,
        timeWarnNum: state => state.timeWarnNum,
        authorNum: state => state.authorNum,
        isManager: state => state.isManager,
        queueList: state => state.queueList,
        loginRole: state => state.loginRole,
        showTable: state => state.showTable,
        warnQueryNum: state => state.warnQueryNum,
        touchTable: state => state.touchTable,
        showMenu: state => state.showMenu,
        floatBallIsShow: state => state.floatBallIsShow,
        currentLang: state => state.currentLang
    },
    mutations: {
        update_currentLang(state, flag) {
            state.currentLang = flag;
        },
        showAsideMenu(state, flag) {
            state.isShowAsideMenu = flag;
        },
        update_loading(state, data) {
            state.loadingShow = data;
        },
        update_deleteCustomFlag(state, flag) {
            state.deleteCustomFlag = flag;
        },
        update_displayFlag(state, flag) {
            state.displayFlag = flag;
        },
        update_displaySaveFlag(state, flag) {
            state.displaySaveFlag = flag;
        },
        update_customComeBackFlag(state, flag) {
            state.customComeBackFlag = flag;
        },
        update_ownerCustomGroupList(state, data) {
            state.ownerCustomGroupList = data;
        },
        update_customMainRefreshFlag(state, flag) {
            state.customMainRefreshFlag = flag;
        },
        updateLoadingStatus(state, payload) {
            state.loadingShow = payload.isLoading;
        },
        update_clickGroupRefreshFlag(state, flag) {
            state.clickGroupRefreshFlag = flag;
        },
        update_percent(state, flag) {
            state.percent = flag;
        },
        update_menuActive(state, flag) {
            state.menuActive = flag;
        },
        setBallNum(state, flag) {
            state.ballClickNum = flag;
        },

        setManager(state, flag) {
            state.isManager = flag;
        },
        setQueueList(state, flag) {
            state.queueList = flag;
        },
        setLoginRole(state, flag) {
            state.loginRole = flag;
        },
        setShowTable(state, flag) {
            state.showTable = flag;
        },
        setWarnQueryNume(state, flag) {
            state.warnQueryNum = flag;
        },

        setAuthorNum(state, flag) {
            state.authorNum = flag;
        },

        setTouchTable(state, flag) {
            state.touchTable = flag;
        },
        setShowMenu(state, flag) {
            state.showMenu = flag;
        }
    }
});
export default store;