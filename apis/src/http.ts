/* eslint-disable no-console */
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { RequestConfig, RequestInterceptors } from './type';

class Request {
  // axios实例
  instance: AxiosInstance;

  // 拦截器
  interceptors?: RequestInterceptors;

  // 默认配置
  defaultConfig: RequestConfig = {
    timeout: 120000, // 配置超时时间 2min
    baseURL: '/', // 配置axios的默认URL
    withCredentials: false, // 配置允许跨域携带cookie
    showToast: true, // 接口请求失败的消息提示
    errMeaasgeToast: (msg) => {
      console.log(msg);
    },
  };

  constructor(config: RequestConfig) {
    // 创建axios实例
    this.instance = axios.create({
      ...this.defaultConfig,
      ...config,
    });
    // 保存实例拦截器
    this.interceptors = config.interceptors;

    // 添加请求拦截器 先添加的后执行，后添加的先执行 请求拦截器顺序无所谓 本质都是修改请求配置
    // 实例请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor as any,
      this.interceptors?.requestInterceptorCatch
    );
    // 类请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (err) => {
        return err;
      }
    );

    // 添加响应拦截器 先添加的先执行 后添加的后执行 确保类响应拦截器最后执行 翻遍return data
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.requestInterceptorCatch
    );

    this.instance.interceptors.response.use(
      (res) => {
        console.log(res, 'res111111');
        // oyj TODO: ts报错会导致打包失败，后续处理, 先 @ts-ignore忽略
        const { code, errMsg } = res.data;

        console.log(config.showToast, this.defaultConfig.showToast, code);

        if ((config.showToast || this.defaultConfig.showToast) && code && code !== 0)
          config.errMeaasgeToast!(errMsg || '接口请求失败，请重试。');

        return res.data;
      },
      // 走到这边就说明状态码不是200，所以肯定是有问题的
      // 如果不在我们特殊的状态码里面（跟这个没关系，这些只是我们做了一些处理，比如弹窗，比如跳转），都返回一个promise.reject(err)

      (err) => {
        // 网络请求错误码判断
        const { status } = err.response;
        switch (status) {
          // 没有该请求
          case 404:
            config.errMeaasgeToast!('接口404');
            break;
          // 服务器内部错误
          case 500:
            config.errMeaasgeToast!('接口500');
            break;
          // 没有权限
          case 488:
            config.errMeaasgeToast!('你没有权限访问/操作此功能。');
            break;
          // 未登陆
          case 484:
            const loginUrl: string = err.response.data.LOGIN_URL;
            try {
              parent.location.href = `${loginUrl}?backUrl=${encodeURIComponent(window.location.href)}`;
            } catch (e) {
              window.location.href = `${loginUrl}?backUrl=${encodeURIComponent(window.location.href)}`;
            }
            break;
          default:
            break;
        }
        return Promise.reject(err);
      }
    );
  }

  request<T = any>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 接口单独的请求拦截器 这里只处理成功拦截器 失败拦截器没太大必要
      if (config.interceptors?.requestInterceptor) config = config.interceptors.requestInterceptor(config);

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 接口单独的响应拦截器 这里只处理成功拦截器 失败拦截器没太大必要
          if (config.interceptors?.responseInterceptor) res = config.interceptors.responseInterceptor(res);
          console.log('request成功');
          resolve(res);
        })
        .catch((err) => {
          console.log('request失败');

          reject(err);
        });
    });
  }

  get<T = any>(url: string, params: any, config: RequestConfig = {}): Promise<T> {
    config.params = params;
    return this.request<T>({ url, ...config, method: 'GET' });
  }

  post<T = any>(url: string, data:any, config: RequestConfig = {}): Promise<T> {
    config.data = data;
    return this.request<T>({ url, ...config, method: 'POST' });
  }

  delete<T = any>(config: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }

  patch<T = any>(config: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' });
  }
}

export default Request;
