import { AxiosRequestConfig, AxiosInstance, Method } from 'axios';

export interface RequestConfig extends AxiosRequestConfig {
  method?: Method;
  baseURL?: string;
  headers?: any;
  pending?: {
    [x: string]: any;
  };
  showLoading?: () => void;
  hideLoading?: () => void;
}

export interface AxiosStatic extends AxiosInstance {
  create(config: RequestConfig): AxiosInstance;
}
declare const axios: AxiosStatic;

export default axios;
