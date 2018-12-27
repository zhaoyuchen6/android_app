import LmhtsService from "@/common/api/lmhts-service";
import { LoginCsd } from '../js/resource';
export default {
  /**
   * @Description: 登录
   * @Param: submitdata: AFA请求报文体
   * */
  Login(submitdata, obj, func, errfunc) {
    return LmhtsService.lmhtsService(LoginCsd, submitdata, obj, func, errfunc);
  },
  /**
   * @description: 用户登录验证
   * @author: 孟庆云
   * */
  VerifyUsername(submitdata, obj, func) {
    return LmhtsService.lmhtsService('ib.sys.lin001', submitdata, obj, func);
  },
  /**
   * @description: 验证选择的机构
   * @author: 孟庆云
   * */
  VerifyBranch(submitdata, obj, func) {
    return LmhtsService.lmhtsService('ib.sys.lin002', submitdata, obj, func);
  },
  /**
   * @description: 用户登录认证
   * @author: 孟庆云
   */
  UserLoginVerify(submitdata, obj, func) {
    return LmhtsService.lmhtsService('ib.sys.lin003', submitdata, obj, func);
  },
  /**
   * @description: 校验设备
   * @author: 孟庆云
   */
  verifyDevice(submitdata, obj, func, errfunc) {
    return LmhtsService.lmhtsService('ib.sys.lin006', submitdata, obj, func, errfunc);
  },
  /**
   * @description: 激活设备
   * @author: 孟庆云
   */
  activeDevice(submitdata, obj, func, errorfunc) {
    return LmhtsService.lmhtsService('ib.sys.lin007', submitdata, obj, func, errorfunc);
  },
  /**
   * @description: 修改用户密码
   * @author: 孟庆云
   */
  modifyPassword(submitdata, obj, func) {
    return LmhtsService.lmhtsService('ib.sys.userinfo.u004', submitdata, obj, func);
  },
  /**
   * @description: 用户登录验证
   * @author: 孟庆云
   * */
  VerifyUsername(submitdata, obj, func, errfunc) {
    return LmhtsService.lmhtsService('ib.sys.lin001', submitdata, obj, func, errfunc);
  },
  /**
   * @description: 验证选择的机构
   * @author: 孟庆云
   * */
  VerifyBranch(submitdata, obj, func, errfunc) {
    return LmhtsService.lmhtsService('ib.sys.lin002', submitdata, obj, func, errfunc);
  },
  /**
   * @description: 用户登录认证
   * @author: 孟庆云
   */
  UserLoginVerify(submitdata, obj, func, errfunc) {
    return LmhtsService.lmhtsService('ib.sys.lin003', submitdata, obj, func, errfunc);
  },
}
