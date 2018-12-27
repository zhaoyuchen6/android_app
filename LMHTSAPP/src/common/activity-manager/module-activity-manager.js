// 控制二级及以上路由
import EventNames from './activity-event-names';
import { RootActivityManager } from "ab-manager-activity";
import TradeActivityManager from './trade-activity-manager';
export default class ModuleActivityManager {
    initialize() {
        // this.router.replace('/');
    }
    requestUpdateView(eventName, eventArgs) {
        if (eventName == EventNames.FIRSTPAGE) {
            this.router.replace("/");
        }else{
            RootActivityManager.changeActivityManager(new TradeActivityManager());
        }
    }
}
