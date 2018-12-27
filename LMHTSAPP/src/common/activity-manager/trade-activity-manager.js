// 控制一级路由
import EventName from './activity-event-names';
import { RootActivityManager } from "ab-manager-activity";
import ModuleActivityManager from './module-activity-manager'
export default class TradeActivityManager {
    initialize() {
        // this.router.replace('/');
    }
    requestUpdateView(eventName, eventArgs) {
        window.tradeViewListeners(eventName);
        if (eventName == EventName.LOGIN) {
            this.router.replace("/login");
        }else if (eventName == EventName.INDEXAPP) {
          this.router.replace("/IndexApp");  //首页
        }else if (eventName == EventName.SELECTROLE) {
          this.router.replace("/");
        }else if (eventName == EventName.I18nTest) {
            this.router.replace("/i18n");
        }else if (eventName == EventName.HOME) {
          this.router.replace("/IndexApp/home");
        }else if (eventName == EventName.AMEBIENTPOINT) {
          this.router.push("/IndexApp/amebientPoint");//周边网点
        }else if (eventName == EventName.COUNTERMONITORING) {
          this.router.push("/IndexApp/counterMonitoring");//柜面监控
        }else if (eventName == EventName.QUEUEMONITORING) {
          this.router.push("/IndexApp/queueMonitoring");//排队监控
        }else if (eventName == EventName.DEVICEMONITOR) {
          this.router.replace("/IndexApp/deviceMonitor");//设备监控
        }else if (eventName == EventName.SHOPSHOW) {
          this.router.push("/IndexApp/shopShow");//产品展示
        }else if (eventName == EventName.SMARTFORM) {
          this.router.replace("/IndexApp/smartForm/"+eventArgs);//智能填单
        }else if (eventName == EventName.CUSTCENTER) {
          this.router.push("/IndexApp/CustCenter");//客户信息
        }else if (eventName == EventName.CUSTOMLIST) {
          this.router.push("/IndexApp/custom/customList/"+eventArgs);
        }else if (eventName == EventName.CUSTOMGROUPDETAIL) {
          this.router.push("/IndexApp/custom/customGroupDetail/"+eventArgs);
        }else if (eventName == EventName.CUSTOMINFO) {
          this.router.push("/IndexApp/custom/customInfo/"+eventArgs);
        }else if (eventName == EventName.CUSTOMINFOINFO) {
          this.router.push("/IndexApp/custom/customInfoInfo/"+eventArgs);
        }else if (eventName == EventName.COMPREHENSIVECONTRACT) {
          this.router.push("/IndexApp/comprehensiveContract");//综合签约
        }else if (eventName == EventName.SEARCH) {
          this.router.replace("/IndexApp/search");//综合签约
        }else if (eventName == EventName.SETTING) {
          this.router.replace("/IndexApp/setting");//综合签约
        }else if (eventName == EventName.KNOWLEDGE) {
          this.router.replace("/IndexApp/knowledge");//知识库
        }else if (eventName == EventName.NEGATIVE) {
          this.router.replace("/IndexApp/negative");//差评
        }else if (eventName == EventName.INDEXPAGE) {
          this.router.replace("/indexPage");//菜单选择
        }else if (eventName == EventName.MONITORINFO) {
          this.router.replace("/IndexApp/monitorInfo");//监控选择
        }
        else{
            RootActivityManager.changeActivityManager(new ModuleActivityManager());
        }
    }
}
