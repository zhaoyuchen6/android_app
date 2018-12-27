import LmhtsService from "@/common/api/lmhts-service";
import { LoginCsd } from '../js/resource';

export default{
  // 查询  网点客户类型
  querySetQuery(submitdata,obj,func){
    let tradeCode = 'lmhts.sys.s006.01';
    return  LmhtsService.lmhtsService(tradeCode, submitdata,obj,func);
  },
  // 修改  网点客户类型
  updateSetQuery(submitdata,obj,func){
    let tradeCode = 'lmhts.sys.s007.01';
    return LmhtsService.lmhtsService(tradeCode, submitdata,obj,func);
  },

  // 修改  密码
  editQuery(submitdata,obj,func){
    let tradeCode = 'lmhts.sys.s005.01';
    return LmhtsService.lmhtsService(tradeCode, submitdata,obj, func);
  },
}
