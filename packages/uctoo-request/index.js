"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var env_1 = require("./env");
// 防止重复提交，利用axios的cancelToken
var pending = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
var CancelToken = axios_1.default.CancelToken;
var removePending = function (config, c) {
    // 获取请求的url
    var flagUrl = config.url;
    // 判断该请求是否需要返回最初请求
    if (config.pending && Object.keys(config.pending).indexOf(flagUrl) !== -1) {
        config.pending[flagUrl] = c;
    }
    // 判断该请求是否在请求队列中
    if (pending.indexOf(flagUrl) !== -1) {
        // 如果在请求中，并存在c,c即axios提供的取消函数
        if (config.pending && config.pending[flagUrl] !== 'undefined') {
            config.pending && config.pending[flagUrl]('pending取消重复请求');
        }
        // 如果在请求中，并存在c,c即axios提供的取消函数
        if (c) {
            c('取消重复请求'); // 执行取消操作
        }
        else {
            pending.splice(pending.indexOf(flagUrl), 1); // 把这条记录从数组中移除
        }
    }
    else {
        // 如果不存在在请求队列中，加入队列
        if (c) {
            pending.push(flagUrl);
        }
    }
    if (pending.length) {
        config.showLoading && config.showLoading();
    }
    else {
        config.hideLoading && config.hideLoading();
    }
};
var request;
var api = {
    create: function (config) {
        if (config === void 0) { config = env_1.apiConfig; }
        // 创建axios实例
        request = axios_1.default.create(config);
        // request拦截器
        request.interceptors.request.use(function (_config) {
            if (config.isPending) {
                // 如果config.pending内有当前url则取消之前的请求，返回最后的请求(例如搜索)
                // 如果config.pending内没有当前url则取消之后的请求，返回最开始的请求(例如绝大部分请求)
                // 生成cancelToken
                _config.cancelToken = new CancelToken(function (c) {
                    var apiConfig = config;
                    apiConfig.url = _config.url;
                    removePending(apiConfig, c);
                });
            }
            // 设置统一的请求头
            if (config.headers) {
                _config.headers = Object.assign(config.headers, _config.headers);
            }
            // 设置get请求参数
            if (_config.method === 'get' && _config.data && Object.entries(_config.data).length) {
                if (_config.params && Object.entries(_config.params).length) {
                    _config.params = Object.assign(_config.data, _config.params);
                }
                else {
                    _config.params = _config.data;
                }
            }
            return _config;
        }, function (error) {
            Promise.reject(error);
        });
        // respone拦截器
        request.interceptors.response.use(function (response) {
            // 移除队列中的该请求，注意这时候没有传第二个参数f
            if (config.isPending) {
                removePending(response.config);
            }
            // 获取返回数据，并处理。按自己业务需求修改。下面只是个demo
            if (response.status >= 200 && response.status < 400) {
                return response.data;
            }
            else {
                return Promise.reject('状态码异常');
            }
        }, function (error) {
            // 异常处理
            // console.log(error);
            pending = [];
            if (error.message === '取消重复请求') {
                return Promise.reject(error);
            }
            return Promise.reject(error);
        });
        return request;
    },
};
exports.default = api;
