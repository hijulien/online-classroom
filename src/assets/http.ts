import axios from 'axios'

// 配置项接口
interface AxiosOption {
    baseURL: string;
    timeout: number;
}

// 配置项
const axiosOption: AxiosOption = {
    baseURL: 'http://127.0.0.1:4523/mock/826687',
    timeout: 5000
}

// 创建一个单例
const http = axios.create(axiosOption);

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  let token = localStorage.getItem("x-auth-token");
  if (token) {
    config.headers = {
      "x-auth-token": token
    }
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, (error) => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  console.dir(error)
  if (error.response.status === 401) {
    // 跳回到登录 reactRouter默认状态下 并不支持在组件之外完成路由跳转
    // 需要自己来实现
    console.log('我应该去登录页面')
    // history.push('/login')
  }
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default http;