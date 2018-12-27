//应用启动时获取网点机构信息、设备信息、应用信息
export default {
    install(Vue, pluginOption = {}){
        //定义数据格式  
        window.Data = {};
        window.Data['bankoutlets'] = {};
        window.Data['deviceInfo'] = {};
        window.Data['appInfo'] = {};

        //获取网点机构信息
        getBankoutletsInfo();
        //获取设备信息
        getDeviceInfo();
        //获取App应用信息
        getAppInfo();

        //埋点数据以特定格式写入文件
        window.WriteFile = function() {
            writeFile();
        };
    }
}

//获取网点机构信息
function getBankoutletsInfo(){
    window.Data['bankoutlets']['DeptID'] = "";    //网点编码
    window.Data['bankoutlets']['DeptName'] = "";  //网点名称
    window.Data['bankoutlets']['UnitID'] = "";    //机构编码
    window.Data['bankoutlets']['UnitName'] = "";  //机构名称
    window.Data['bankoutlets']['TellerNo'] = "";  //柜员号
    window.Data['bankoutlets']['TellerName'] = "";//柜员名称
}

//获取设备信息
function getDeviceInfo() {
    window.Data['deviceInfo']['DeviceType'] = "";  //设备类型
    window.Data['deviceInfo']['DeviceNum'] = "";    //设备编码
    window.Data['deviceInfo']['deviceFreeTime'] = "";    //设备空闲时间
    window.Data['deviceInfo']['deviceCPURatio'] = "";    //设备CPU使用率
    window.Data['deviceInfo']['deviceMemoryRatio'] = ""; //设备内存使用率
}

//获取App应用信息
function getAppInfo() {
    window.Data['appInfo']['appName'] = "";       //应用名称
    window.Data['appInfo']['appVersion'] = "";    //应用当前版本
    window.Data['appInfo']['appStartTime'] = "";  //应用启动时间
    window.Data['appInfo']['appEndTime'] = "";    //应用关闭时间
}

function writeFile(){
    AgreeSDK.test.asyncFileWrite({
        success: result => {
          alert(result);
        },
        fail: e => {
          alert("错误");
        }
      }, "Test", "asyncFileWrite", [window.Data]);
}