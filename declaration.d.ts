// // declaration.d.ts
// import axios from 'axios';
// // 为uctoo-request重新配置了axios的类型
// declare module 'axios' {
//   export interface AxiosInstance {
//     <T = any>(config: AxiosRequestConfig): Promise<T>;
//     request<T = any>(config: AxiosRequestConfig): Promise<T>;
//     get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
//     delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
//     head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
//     post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
//     put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
//     patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
//   }
// }

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
interface Window {
  currentCates: null | Array<string>;
  opera: string; // note (@livs-ops): fix property 'opera' does not exist on type 'Window & typeof globalThis'
}
