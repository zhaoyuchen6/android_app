//获取交易信息
export default {
    install(Vue, pluginOption = {}) {
        window.Data['userData'] = {};
        window.Data['userData']['userInfo'] = {};
        window.Data['userData']['userTradeList'] = [];
        window.bFlag = false;

        //交易监听
        window.tradeListeners = function(maskerFlag, view, businessList) {
            getTradeInfo(maskerFlag, view, businessList);
        }
    }

}

function getTradeInfo(maskerFlag, view, businessList){
    try {
        if(maskerFlag === "true"){
          getBankoutletsInfo();
          window.bFlag = true;    
          window.tradeInfo = {};
          window.tradeInfo['tradeNum'] = window.Data['userData']['tradeInfoList'].length + 1;
          window.tradeInfo['tradeName'] = "";
          for (var i = 0; i < businessList.length; i++){
            if(businessList[i].view === view){
              window.tradeInfo['tradeName'] = businessList[i].text;
              break;
            }
          } 
          window.tradeInfo['tradeCode'] = view;
          window.tradeInfo['menuName'] = window.menuName || "";
          window.tradeInfo['tradeStartTime'] = new Date();
          window.tradeInfo['tradeEndTime'] = "";
          window.tradeInfo['tradeDuration'] = "";
          window.tradeInfo['tradePageList'] = [];
          window.Data['userData']['tradeInfoList'].push(window.tradeInfo);
        }else{
          window.bFlag = false;   
          var tradeEndTime = new Date();
          var tradeStartTime = window.tradeInfo['tradeStartTime'];
          window.tradeInfo['tradeDuration'] = (tradeEndTime - tradeStartTime) / 1000;
          window.tradeInfo['tradeStartTime'] = format(tradeStartTime.getHours(), tradeStartTime.getMinutes(), tradeStartTime.getSeconds());
          window.tradeInfo['tradeEndTime'] = format(tradeEndTime.getHours(), tradeEndTime.getMinutes(), tradeEndTime.getSeconds());
          window.writeFile();
        }          
      } catch (error) {
        console.log("获取交易信息失败。。。");     
      }
}

function getBankoutletsInfo(){
    try {
        let xToken = sessionStorage.getItem("xToken");
        if(xToken === "Notoken"){
          console.log("游客登录。。。");
        }else{
            console.log("管理员登录。。。");
            let obj = JSON.parse(sessionStorage.getItem("loginObj"));
            window.Data['bankoutlets']['DeptID'] = "";
            window.Data['bankoutlets']['DeptName'] = obj.DeptName;
            window.Data['bankoutlets']['UnitID'] = obj.UnitID;
            window.Data['bankoutlets']['UnitName'] = obj.UnitName;
            window.Data['bankoutlets']['TellerNo'] = "";
            window.Data['bankoutlets']['TellerName'] = "";


            window.Data['userData']['userInfo']['userType'] = "1";
            window.Data['userData']['userInfo']['userNo'] = obj.userCode;
            window.Data['userData']['userInfo']['userName'] = obj.userName;
            window.Data['userData']['userInfo']['userLevel'] = "";
            window.Data['userData']['userInfo']['userSex'] = obj.Sex;
            window.Data['userData']['userInfo']['userAge'] = "";
            window.Data['userData']['userInfo']['userVolk'] = "";
            window.Data['userData']['userInfo']['IDType'] = "";
            window.Data['userData']['userInfo']['IDNo'] = "";
            window.Data['userData']['userInfo']['CardType'] = "";
            window.Data['userData']['userInfo']['CardNo'] = "";
            console.log("获取管理员用户信息成功！！！");
        }     
      } catch (error) {
        console.log("获取用户信息失败。。。");
      }
}