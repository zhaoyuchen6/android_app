import LmhtsService from "@/common/api/lmhts-service";
import { LoginCsd } from '../js/resource';

export default {
    // 查询  我创建的营销任务
    mainQueryMsg(submitdata, obj, func) {
        // 轮询查询消息
        let tradeCode = 'lmhts.que.q001.01';
        return LmhtsService.lmhtsService(tradeCode, submitdata, obj, func);

    },
    custmgrQueryMsg(submitdata, obj, func) {
        // 查询客户经理信息
        let tradeCode = 'lmhts.sys.s003.01';
        return LmhtsService.lmhtsService(tradeCode, submitdata, obj, func);
    },
    forwardQueryMsg(submitdata, obj, func) {
        // 转发
        let tradeCode = 'lmhts.que.q006.01';
        return LmhtsService.lmhtsService(tradeCode, submitdata, obj, func);
    },
    disposeMsg(submitdata, obj, func) {
        // 呼叫帮助处理
        let tradeCode = 'lmhts.que.q007.01';
        return LmhtsService.lmhtsService(tradeCode, submitdata, obj, func);
    },
    helpdQueryMsg(submitdata, obj, func) {
        // 客户来访处理
        let tradeCode = 'lmhts.que.q007.01';
        return LmhtsService.lmhtsService(tradeCode, submitdata, obj, func);
    },

}