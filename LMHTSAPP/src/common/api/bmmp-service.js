/**
 * Created by dong on 2018/1/12.
 */
import { ServicesManager } from "ab-manager-services";
import {LoginCsd} from '../js/resource';
import {LoginUrl} from '../js/resource';
import {AfaTradeUrl} from '../js/resource-bmmp';

class BmmpService {
  bmmpService(AfaTranCode, TranData, func) {
    console.log(func);
    let xToken = sessionStorage.getItem('xToken');
    let data={};
    let url="";
    if(AfaTranCode == LoginCsd){
      data = TranData;
      url = LoginUrl;
    }else{
      data.AfaTranCode = AfaTranCode;
      data.TranData = decodeURI(TranData.body);
      if(TranData.XToken == undefined || TranData.XToken == ""){
        data.XToken = xToken;
      }else{
        data.XToken = TranData.XToken;
      }
      url = AfaTradeUrl;
    }

    if(func == null || func == undefined){
      return ServicesManager.getService(url,data);
    }else{
      ServicesManager.bmmpPost(url,data).then(
        function (response) {
          // console.log(response);
          if(AfaTranCode == LoginCsd) {
            let OutArgs = response.data.OutArgs;
            if(OutArgs.errorcode == 0){
              let result = {};
              result = response.data.result["LoginReturn.xm"];
              func(result);
            }else{
              // console.log(OutArgs.msg);
            }
          }else{
            response = response.data;
            if(typeof(response) != "object"){
              response = eval('('+response+')');
            }
            let OutArgs = response.OutArgs;
            if(response.OutArgs.errorcode == 0){
              let result = {};
              result = eval('(' + response.result["AfaTradeOutput.xm"].AfaTranRslt + ')');
              return func(eval('(' + response.result["AfaTradeOutput.xm"].AfaTranRslt + ')'));
            }else{
              // console.log(OutArgs.msg);
            }
          }
        }
      );
    }
  }
}

// 实例化后导出，全局单例
export default new BmmpService()
