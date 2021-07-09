import { AxiosRequestConfig, Method } from 'axios';
export interface RequestConfig extends AxiosRequestConfig {
  url?: string;
  method?: Method;
  baseURL?: string;
  headers?: any;
  pending?: {
    [x: string]: any;
  };
  showLoading?: () => void;
  hideLoading?: () => void;
}

export const apiConfig: RequestConfig = {
  baseURL: '', // 请求的本域名
  method: 'GET',
  url: '',
  // 配置请求头信息
  headers: {
    'content-type': 'application/json;charset=UTF-8',
  },
  pending: {},
  showLoading: () => {},
  hideLoading: () => {},
};
