import MENULIST from '@/activity/menu-list.js';
import EventNames from "@/common/activity-manager/activity-event-names";
export default {
  install(Vue, pluginOption = {}){
    window.bFlag = false;
    window.Data = {};
    window.Data['deviceInfo'] = {};
    window.Data['userData'] = {};
    window.Data['userData']['userInfo'] = {};
    window.Data['userData']['tradeInfoList'] = [];
    window.coordinates = {};
    window.mousedownTime = 0;
    //获取设备信息
    getDeviceInfo();
    //获取App应用信息
    getAppInfo();
    //获取设备当前位置信息
    getCurrentPosition();
    
    //交易菜单监听
    window.tradeViewListeners  = function(eventName){
      getTradeMenuInfo(eventName);
    }
    
    //获取交易信息
    window.tradeListeners = function(maskerFlag, view, businessList){
      try {
        if(maskerFlag === "true"){
          getUserInfo();
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
          window.FileWrite();
        }          
      } catch (error) {
        console.log("获取交易信息失败。。。");     
      }
    }

    //埋点数据写入文件
    window.FileWrite = function(){
      AgreeSDK.test.asyncFileWrite({
        success: result => {
          alert(result);
        },
        fail: e => {
          alert("错误");
        }
      }, "Test", "asyncFileWrite", [window.Data]);
    }

    window.findData = function(){
      console.log("Data:",window.Data);
    }
  },

  mounted(){
  if(window.bFlag === true && this.$vnode && (this.$vnode.isRootInsert === true || (this.$vnode.data && (this.$vnode.data.tag === "component" || this.$vnode.data.routerView === true)))){
      if(this.$options._componentTag === "transition" || this.$options._componentTag === "App"){ return; }
      if(this.constructor && this.constructor.extendOptions){
        window.tradePageInfo = {};
        window.tradePageInfo['pageNum'] = "";
        window.tradePageInfo['uid'] = this._uid;
        window.tradePageInfo['pageName'] = this.constructor.extendOptions.name;
        window.tradePageInfo['pageStartTime'] = new Date();
        window.tradePageInfo['pageEndTime'] = "";
        window.tradePageInfo['pageDuration'] = "";
        window.tradePageInfo['pageControlList'] = [];
        window.tradeInfo['tradePageList'].push(window.tradePageInfo);
        // console.log("name:", this.constructor.extendOptions.name);
        // console.log("isRootInsert:", this.$vnode.isRootInsert);
        // console.log("vue:", this);
      }
    }          
  },
  destroyed(){
    if(window.bFlag === true && window.tradeInfo['tradePageList']){
      for (var i = window.tradeInfo['tradePageList'].length - 1; i >= 0; i--){
        if (this._uid === window.tradeInfo['tradePageList'][i]['uid']){
          var pageEndTime = new Date();
          var pageStartTime = window.tradeInfo['tradePageList'][i]['pageStartTime'];
          if (window.tradeInfo['tradePageList'][i]['pageEndTime'] === ""){
            window.tradeInfo['tradePageList'][i]['pageDuration'] = (pageEndTime - pageStartTime) / 1000;
            window.tradeInfo['tradePageList'][i]['pageStartTime'] = format(pageStartTime.getHours(), pageStartTime.getMinutes(), pageStartTime.getSeconds());
            window.tradeInfo['tradePageList'][i]['pageEndTime'] = format(pageEndTime.getHours(), pageEndTime.getMinutes(), pageEndTime.getSeconds());
            break;
          }
        }
      }
    }  
  }
}

//获取设备信息
function getDeviceInfo(){
  try {
    let deviceInfo = AgreeSDK.device.getInfo();
    window.Data['deviceInfo'].platform = deviceInfo.platform;              //系统平台
    window.Data['deviceInfo'].versionCode = deviceInfo.versionCode;        //系统版本信息
    window.Data['deviceInfo'].versionName = deviceInfo.versionName;        //系统版本信息
    window.Data['deviceInfo'].isTablet = deviceInfo.isTablet;              //判断是否是平板
    window.Data['deviceInfo'].isPhone = deviceInfo.isPhone;                //判断设备是否是手机
    window.Data['deviceInfo'].imei = deviceInfo.imei;                      //设备的国际移动设备身份码
    window.Data['deviceInfo'].imsi = deviceInfo.imsi;                      //设备的国际移动用户识别码
    window.Data['deviceInfo'].serial = deviceInfo.serial;                  //设备序列号
    window.Data['deviceInfo'].uuid = deviceInfo.uuid;                      //获取设备的通用唯一标识符
    window.Data['deviceInfo'].model = deviceInfo.model;                    //设备的型号
    window.Data['deviceInfo'].manufacturer = deviceInfo.manufacturer;      //设备的生产厂商
    window.Data['deviceInfo'].macAddress = deviceInfo.macAddress;          //MAC地址
    window.Data['deviceInfo'].phoneType = deviceInfo.phoneType;            //获取移动终端类型. 0 手机制式未知; 1 手机制式为 GSM，移动和联通; 2 手机制式为 CDMA，电信
    window.Data['deviceInfo'].isSIMCardReady = deviceInfo.isSIMCardReady;  //判断 SIM 卡是否装载
    window.Data['deviceInfo'].SIMOperator = deviceInfo.SIMOperator;        //获取 SIM 卡运营商名称   
  } catch (error) {
    console.log("获取交易信息失败。。。");
  }
}
//获取App应用信息
function getAppInfo(){
  try {
    console.log("app",AgreeSDK.app.appId);
  } catch (error) {
    console.log("获取应用信息失败");
  }
}
//获取身边设备当前位置信息
function getCurrentPosition(){
  // AgreeSDK.map.getCurrentPosition({
  //   provider: 'baidu',
  //   success: position => {
  //       alert(position);
  //   },
  //   error: error => {
  //       alert(error);
  //   }
  // });
}
//获取用户信息
function getUserInfo(){
  try {
    let xToken = sessionStorage.getItem("xToken");
    if(xToken === "Notoken"){
      console.log("游客登录。。。");
    }else{
      console.log("管理员登录。。。");
      let obj = JSON.parse(sessionStorage.getItem("loginObj"));
      window.Data['userData']['userInfo'].DeptName = obj.DeptName;   //用户所属网点名称
      window.Data['userData']['userInfo'].MailBox = obj.MailBox;     //用户邮箱
      window.Data['userData']['userInfo'].RoleId = obj.RoleId;       //角色编号
      window.Data['userData']['userInfo'].RoleName = obj.RoleName;   //角色名称
      window.Data['userData']['userInfo'].Sex = obj.Sex;             //用户性别
      window.Data['userData']['userInfo'].TelePhone = obj.TelePhone; //用户联系方式
      window.Data['userData']['userInfo'].UnitID = obj.UnitID;       //登录机构编码
      window.Data['userData']['userInfo'].UnitName = obj.UnitName;   //登录机构名称
      window.Data['userData']['userInfo'].userName = obj.userName;   //用户名称
      window.Data['userData']['userInfo'].userCode = obj.userCode;   //用户编号
      console.log("获取管理员用户信息成功！！！");
    }     
  } catch (error) {
    console.log("获取用户信息失败。。。");
  }
}
//获取当前点击的菜单信息
function getTradeMenuInfo(eventName){
  try {
    if(eventName === "home" || eventName === "shopShow" || eventName === "monitorInfo" || 
    eventName === "amebientPoint" || eventName === "smartForm" || eventName === "CustCenter" || 
    eventName === "comprehensiveContract" || eventName === "search" || eventName === "knowledge" || 
    eventName === "negative"){
      window.menuCode = eventName;
      let itemList = MENULIST.managerList;
      for(var i = 0; i < itemList.length; i++){
        if(itemList[i].name === "List"){
          let list = itemList[i].list;
          for(var j = 0; j < list.length; j++){
            if(window.menuCode === EventNames[list[j].name]){
              window.menuName = list[j].text;
            }
          }
        }else{
          if(window.menuCode === EventNames[itemList[i].name]){
            window.menuName = itemList[i].text;
          }
        }
      }
      window.bFlag = false;
    }else{
      window.bFlag = false;
    }
  } catch (error) {
    console.log("获取点击的交易菜单信息失败。。。");
  }
}

//时间格式转换
function format(hours, minutes, seconds) {
  hours =  hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return hours + "" + minutes + "" + seconds;
}