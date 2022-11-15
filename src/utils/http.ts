import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs'

import { showMessage } from "./status";
import { message, Spin } from 'antd';
import { log } from 'console';

export interface IResponse {
    code: number | string;
    data: any;
    msg: string;
}

// 用于存储pending的请求（处理多条相同请求）
const pendingRequest = new Map()

// 生成request的唯一key
const generateRequestKey = (config: AxiosRequestConfig<any>) => {
    // 通过url，method，params，data生成唯一key，用于判断是否重复请求
    // params为get请求参数，data为post请求参数
    const { url, method, params, data } = config
    return [url, method, qs.stringify(params), qs.stringify(data)].join('&')
}

// 将重复请求添加到pendingRequest中
const addPendingRequest = (config: AxiosRequestConfig<any>) => {
    const key = generateRequestKey(config)
    if (!pendingRequest.has(key)) {
        config.cancelToken = new axios.CancelToken(cancel => {
            pendingRequest.set(key, cancel)
        })
    }
}

// 取消重复请求
const removePendingRequest = (config: AxiosRequestConfig<any>) => {
    const key = generateRequestKey(config)
    if (pendingRequest.has(key)) {
        const cancelToken = pendingRequest.get(key)
        cancelToken(key) // 取消之前发送的请求
        pendingRequest.delete(key)// 请求对象中删除requestKey
    }
}

const csrf = document.cookie;

let csrftoken = csrf.slice(10)
console.log(csrftoken);


let http: AxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/wsxy/',
    // baseURL: 'http://127.0.0.1:4523/mock/826687',
    timeout: 5000,
    headers: {
        'X-CSRFtoken': csrftoken
    }
});

// axios实例拦截请求
http.interceptors.request.use(
    (config: AxiosRequestConfig<any>) => {
        // 处理重复请求
        removePendingRequest(config)
        addPendingRequest(config)
        //写入token
        const token = localStorage.getItem('app_token');
        if (token) {
            config.headers!.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
)

// axios实例拦截响应
http.interceptors.response.use(
    (response: AxiosResponse) => {
        //移除重复请求
        removePendingRequest(response.config)

        if (response.headers.authorization) {
            localStorage.setItem('app_token', response.headers.authorization);
        } else {
            if (response.data && response.data.token) {
                localStorage.setItem('app_token', response.data.token);
            }
        }

        if (response.status === 200) {
            return response;
        } else {
            showMessage(response.status);
            return response;
        }
    },
    // 请求失败
    (error: any) => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围
            showMessage(response.status);
            return Promise.reject(response.data);
        } else {
            message.error('网络连接异常,请稍后再试!');
        }
    }
);


export default http
