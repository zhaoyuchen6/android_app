/**
 * Created by zhezhe on 2017/8/4.
 */
import LmhtsService from "@/common/api/lmhts-service";
import { LoginCsd } from '../js/resource';
export default{
  /**
   * @description: 查询  我创建的营销任务
   * @author: 王哲
   * */
  queryWarnMsg(submitdata, obj, func) {
    return LmhtsService.lmhtsService('lmhts.que.q005.01', submitdata, obj, func);
  },
  /**
   * @description: 轮询查询消息
   * @author: 王哲
   * */
  revokeWarnMsg(submitdata, obj, func) {
    return LmhtsService.lmhtsService('lmhts.sys.s004.01', submitdata, obj, func);
  },
  /**
   * @description: 改变处理状态
   * @author: 王哲
   * */
  updataStatus(submitdata, obj, func) {
    // 客户来访处理
    let tradeCode = 'lmhts.que.q007.01';
    return LmhtsService.lmhtsService(tradeCode, submitdata, obj, func);
  },
  /**
   * @description: 查询理财经理
   * @author: 王哲
   * */
  custmgrQueryMsg(submitdata, obj, func){
    // 查询客户经理信息
    let tradeCode = 'lmhts.sys.s003.01';
    return LmhtsService.lmhtsService(tradeCode, submitdata, obj, func);
  },
  /**
   * @description: 转发
   * @author: 王哲
   * */
  forwardMsg(submitdata, obj, func){
    // 转发
    let tradeCode = 'lmhts.que.q006.01';
    return LmhtsService.lmhtsService(tradeCode, submitdata, obj, func);
  },

  /**
   * @description: 授权详情查询
   * @author: 董
   * */
  forautMsg(submitdata, obj, func){
    // 转发
    let tradeCode = 'lmhts.que.q014.01';
    return LmhtsService.lmhtsService(tradeCode, submitdata, obj, func);
  },

}
