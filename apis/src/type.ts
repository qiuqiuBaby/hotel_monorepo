import type { AxiosRequestConfig } from 'axios';

export interface RequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  // 响应拦截原本应该是 AxiosResponse 类型 ，但添加多响应拦截return后类型会变动 可用泛型一层一层传递 这里图方便直接使用any
  responseInterceptor?: (res: any) => any;
  responseInterceptorCatch?: (error: any) => any;
}

export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptors;
  showLoading?: boolean;
  showToast?: boolean;
  errMeaasgeToast?: (msg: string) => void;
}
