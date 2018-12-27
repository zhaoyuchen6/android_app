/**
 * Created by dong on 2018/3/24.
 */

import { ServicesManager } from "ab-manager-services";
import {LoginCsd} from '../js/resource';
import {LoginUrl} from '../js/resource';
import {AfaTradeUrl} from '../js/resource';
// import { DEVICE_NUM, DEVICE_MODEL, APPLICATION_ID,DVC_NUM,AfaTradeUrl} from "../js/resource";
class LmhtsService {
    lmhtsService(AfaTranCode,TranData,obj,func) {
      let xToken = sessionStorage.getItem('xToken');
      let data={};
      let url="";
      if(AfaTranCode == LoginCsd){
        data = TranData;
        url = LoginUrl;
      }else{
        data.AfaTranCode = AfaTranCode;
        // data.TranData = decodeURI(TranData.body);
        data.TranData = decodeURI(TranData.body);
        if(TranData.XToken == undefined || TranData.XToken == ""){
          data.XToken = xToken;
        }else{
          data.XToken = TranData.XToken;
        }
        url = AfaTradeUrl;
      }

      if(func == null || func == undefined){
        return ServicesManager.post(url,data);
      }else{
        ServicesManager.post(url,data).then(
          function (response) {
            // console.log(response);
            if(AfaTranCode == LoginCsd) {
              let OutArgs = response.data.OutArgs;
              if(OutArgs.errorcode == 0){
                let result = {};
                result = response.data.result["LmhtsLoginReturn.xm"];
                // let loginObj = {}; // 用户登录信息
                // loginObj.roleCode = result.RoleId.trim(); // 登录角色code
                // loginObj.roleName = result.RoleName.trim(); // 登录角色名称
                // loginObj.name = result.UserName.trim(); // 登录用户名
                // loginObj.code = result.UserCode.trim(); // 登录用户编码
                // loginObj.branchNo = result.UnitID.trim(); // 登录机构编码
                // loginObj.branchName = result.UnitName.trim(); // 登录机构名称
                // loginObj.branchFullName = result.UnitName.trim() + result.DeptName.trim(); // 登录机构全称
                // loginObj.sex = result.Sex.trim(); //性别
                // loginObj.userName = result.UserName.trim(); //登录名
                // loginObj.userPassword = result.UserPassword.trim(); //登录密码
                // loginObj.orgType = result.DeptId.trim(); // 机构类型
                // sessionStorage.setItem("xToken", result.XToken.trim());
                // sessionStorage.setItem("loginObj", JSON.stringify(loginObj)); // 登录角色ID
                func(result);
              }else{
                console.log(OutArgs.msg);
              }
            }else{
              response = response.data;
              if(typeof(response) != "object"){
                response = eval('('+response+')');
              }
              let OutArgs = response.OutArgs;
              if(OutArgs.errorcode == 0){
                let result = {};
                result = eval('(' + response.result["Lmhts_AfaTradeOutput.xm"].AfaTranRslt + ')');
                func(result);
              }else{
                console.log(OutArgs.msg);
              }
            }
          }
        );
      }
    }
}

// 实例化后导出，全局单例
export default new LmhtsService();
