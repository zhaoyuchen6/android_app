import LmhtsService from "@/common/api/lmhts-service";
import { LoginCsd } from '../js/resource';
export default {
  /**
   * @description: map数据查询
   * @author: 王哲
   * */
  queryBranchAround(submitdata, obj, func) {
    return LmhtsService.lmhtsService('lmhts.que.q003.01', submitdata, obj, func);
  },
}
