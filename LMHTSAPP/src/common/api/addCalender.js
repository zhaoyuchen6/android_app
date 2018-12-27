import LmhtsService from "@/common/api/lmhts-service";
import { LoginCsd } from '../js/resource';

export default{
  /**
   * @description: 新增预约信息
   * @author: 王哲
   * */
  addCalendar(submitdata, obj, func) {
    return LmhtsService.lmhtsService('lmhts.cst.c003.01', submitdata, obj, func);
  },
  /**
   * @description:查询  预约信息
   * @author: 王哲
   * */
  queryCalendar(submitdata, obj, func) {
    return LmhtsService.lmhtsService('lmhts.cst.c002.01', submitdata, obj, func);
  },
  /**
   * @description:删除  预约信息
   * @author: 王哲
   * */
  delCalendar(submitdata, obj, func) {
    return LmhtsService.lmhtsService('lmhts.cst.c004.01', submitdata, obj, func);
  },
}
