import LmhtsService from "@/common/api/lmhts-service";
import { LoginCsd } from '../js/resource';

export default{
  // 查询营销记录
  querymarkType(submitdata,obj,func){
    let tradeCode = 'lmhts.mak.m002.01';
    return LmhtsService.lmhtsService(tradeCode, submitdata,obj, func);
  },
  // 修改营销记录
  updatemarkType(submitdata,obj,func){
    let tradeCode = 'lmhts.mak.m003.01';
    return LmhtsService.lmhtsService(tradeCode, submitdata,obj, func);
  },
  // 删除营销记录
  delmarkType(submitdata,obj,func){
    let tradeCode = 'lmhts.mak.m004.01';
    return LmhtsService.lmhtsService(tradeCode, submitdata,obj, func);
  },
  // 增加营销记录
  addmarkType(submitdata,obj, func){
    let tradeCode = 'lmhts.mak.m001.01';
    return LmhtsService.lmhtsService(tradeCode, submitdata,obj, func);
  },

}
