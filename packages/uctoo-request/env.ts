import { AxiosRequestConfig, Method } from 'axios';

export interface RequestConfig extends AxiosRequestConfig {
  url?: string;
  method?: Method;
  baseURL?: string;
  headers?: any;
  isPending?: boolean;
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
    'Content-Type': 'application/json;charset=UTF-8',
  },
  isPending: false,
  pending: {},
  showLoading: () => {},
  hideLoading: () => {},
};
