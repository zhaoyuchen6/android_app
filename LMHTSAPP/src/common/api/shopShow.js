/**
 * Created by dong on 2018/5/21.
 */
import LmhtsService from "@/common/api/lmhts-service";
import { LoginCsd } from '../js/resource';

export default {
  // 查询  产品
  queryShopQuery(submitdata, obj, func){
    let tradeCode = 'lmhts.prd.p001.01';
    return LmhtsService.lmhtsService(tradeCode, submitdata, obj, func);
  },
  // 查询  产品详情
  shopDetileQuery(submitdata, obj, func){
    let tradeCode = 'lmhts.prd.p001.01';
    return LmhtsService.lmhtsService(tradeCode, submitdata, obj, func);
  },

}
