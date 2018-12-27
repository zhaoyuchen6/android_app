'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hostIp = httpConfig.hostIp;

exports.default = {
    configOptions: {
        baseURL: 'http://' + hostIp,

        timeout: 15000,

        withCredentials: false,

        maxContentLength: 2000,

        validateStatus: function validateStatus(status) {
            return status >= 200 && status < 300;
        },

        maxRedirects: 5
    },

    serviceGroup: [],
    isExist: false,
    error: Function, install: function install(Vue, options) {
        if (options) {
            options.plugin && (this.serviceGroup = options.plugin);
            options.errorHandle && typeof options.errorHandle == 'function' ? this.error = options.errorHandle : console.error('[ServicesManager]: errorHandle类型应该是function，现在是' + _typeof(options.errorHandle));
        } else {
            console.error('[ServicesManager]: 初始化参数错误！');
            return;
        }
        this.isExist = false;
    },
    getService: function getService(serviceName, param) {
        for (var i = 0; i < this.serviceGroup.length; i++) {
            if (this.serviceGroup[i].name == serviceName) {
                this.isExist = true;

                this.serviceGroup[i].url ? typeof this.serviceGroup[i].url != 'string' && console.error('[ServicesManager]: url类型应该是string，现在是' + _typeof(this.serviceGroup[i].url)) : console.error('[ServicesManager]: url是必须的参数！');
                if (!this.serviceGroup[i].url || typeof this.serviceGroup[i].url != 'string') return;

                if (this.serviceGroup[i].type == 'get' || this.serviceGroup[i].type == 'post') {
                    return this.formatService(this.serviceGroup[i], param);
                } else {
                    console.error('[ServicesManager]: 请求类型错误！');
                    return;
                }
            }
        };

        this.isExist ? this.isExist = false : console.error('[ServicesManager]: 服务名" ' + serviceName + ' "不存在！');
    },
    formatService: function formatService(serviceInfo, param) {
        var customType = _typeof(serviceInfo.customParam);

        var paramStruct = {};

        switch (customType) {
            case 'function':
                paramStruct = serviceInfo.customParam(param);
                return this.sendRequest(serviceInfo, paramStruct);
                break;
            case 'undefined':
                return this.sendRequest(serviceInfo, param);
            default:
                console.error('[ServicesManager]: customType应该是function类型，现在是' + customType + '类型！');
        }
    },
    sendRequest: function sendRequest(serviceInfo, param) {
        var configOpts = '';
        var configUrl = '';
        if (serviceInfo.config) {
            configOpts = config;
            configUrl = config.baseURL;
        } else {
            configOpts = this.configOptions;
            configUrl = this.configOptions.baseURL + serviceInfo.url;
        }

        if (serviceInfo.type == 'get') {
            return _axios2.default.get(configUrl, param, configOpts);
        } else {
            return _axios2.default.post(configUrl, param, configOpts);
        }
    },
    get: function get(url, data) {
        return _axios2.default.get(this.configOptions.baseURL + url, data, this.configOptions);
      },
      post: function post(url, data) {
        return _axios2.default.post(this.configOptions.baseURL + url, {
          InArgs: {},
          XM: data
        },/*{headers:{
            "Content-Type":"application/json",
            "X-AmebaCloud-RandomNumber":"test",
            "X-AmebaCloud-VerifyTime":"1111",
            "X-AmebaCloud-Token":"testaaaaa"
        }},*/ this.configOptions)
          .catch(function (response) {
            AgreeSDK.ui.toast ('请求数据失败，请稍后重试。')
          });;
      },
      bmmpPost: function post(url, data) {
        let baseURL = "http://124.207.206.34:53001";
        return _axios2.default.post(baseURL + url, {
          InArgs: {},
          XM: data
        }, this.configOptions);
      },
};
