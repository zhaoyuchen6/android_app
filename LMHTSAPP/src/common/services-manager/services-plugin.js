// 二者选一或者不选 分别是外设服务和常规服务端请求，在里面配置自定义参数
// import Device from "@/common/services-manager/config-device"; // 相对路径
// import Host from "@/common/services-manager/config-host"; // 相对路径
import {LoginUrl} from '../js/resource';
import {AfaTradeUrl} from '../js/resource';
let bmmpUrl = "http://124.207.206.34:53001/servlets/CloudService/bmmp/csd/AfaTrade.csd";
export default [
    {
        type: 'get', // string - 请求类型
        name: 'loginservice', // string - 服务名称（serviceName）
        url: LoginUrl, // string - 请求地址
        customParam: function(param) { // function - 自定义参数类型
            // todo
            return param;
        },
    },
    {
        type: 'post', // string - 请求类型
        name: 'lmhtservice', // string - 服务名称（serviceName）
        url: bmmpUrl, // string - 请求地址
        customParam: function(param) { // function - 自定义参数类型
            // todo
            return param;
        },
    }
    // ...
]
