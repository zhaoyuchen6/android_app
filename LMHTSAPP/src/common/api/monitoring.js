import LmhtsService from "@/common/api/lmhts-service";
import { LoginCsd } from '../js/resource';

export default {
    //查询 数据字典
    queryDictData(submitdata, obj, func) {
        let tradeCode = 'lmhts.sys.s001.01';
        return LmhtsService.lmhtsService(tradeCode, submitdata, obj, func);
    },    
    // 查询  网点客户类型
    queryCustType(submitdata, obj, func) {
        let tradeCode = 'lmhts.sys.s002.01';
        return LmhtsService.lmhtsService(tradeCode, submitdata, obj, func);

    },
    // 查询  网点客户排队信息
    queryBranchQueue(submitdata, obj, func) {
        let tradeCode = 'lmhts.que.q002.01';
        return LmhtsService.lmhtsService(tradeCode, submitdata, obj, func);
    },
    // 查询  周边网点信息
    queryBranchAround(submitdata, obj, func) {
        let tradeCode = 'lmhts.que.q003.01';
        return LmhtsService.lmhtsService(tradeCode, submitdata, obj, func);
    },
    // 查询  查询客户基本信息
    queryCustInfo(submitdata, obj, func) {
        let tradeCode = 'lmhts.cst.c001.01';
        return LmhtsService.lmhtsService(tradeCode, submitdata, obj, func);
    },
    // 查询：当前网点的空闲柜台
    queryCounter(submitdata, obj, func) {
        let tradeCode = 'lmhts.que.q009.01';
        return LmhtsService.lmhtsService(tradeCode, submitdata, obj, func);
    },
    //指定
    assignCounter(submitdata, obj, func) {
        let tradeCode = 'lmhts.que.q010.01';
        return LmhtsService.lmhtsService(tradeCode, submitdata, obj, func);
    },
    //队列恢复
    queueRecovery(submitdata, obj, func) {
        let tradeCode = 'lmhts.que.q011.01';
        return LmhtsService.lmhtsService(tradeCode, submitdata, obj, func);
    },
    //排队优先
    queueUpgrade(submitdata, obj, func) {
        let tradeCode = 'lmhts.que.q008.01';
        return LmhtsService.lmhtsService(tradeCode, submitdata, obj, func);
    },
    //柜台查询
    counterQuery(submitdata, obj, func) {
        let tradeCode = 'lmhts.que.q012.01';
        return LmhtsService.lmhtsService(tradeCode, submitdata, obj, func);
    },
    //指定叫号
    orderQuery(submitdata, obj, func) {
        let tradeCode = 'lmhts.que.q010.01';
        return LmhtsService.lmhtsService(tradeCode, submitdata, obj, func);
    }
}