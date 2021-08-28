"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiConfig = void 0;
exports.apiConfig = {
    baseURL: '',
    method: 'GET',
    url: '',
    // 配置请求头信息
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    },
    isPending: false,
    pending: {},
    showLoading: function () { },
    hideLoading: function () { },
};
