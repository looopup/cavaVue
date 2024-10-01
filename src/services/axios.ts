// src/services/axios.ts
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.example.com', // 替换为你的 API 基础 URL
    timeout: 10000, // 请求超时时间
});

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 在请求前做一些处理
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        return response.data; // 返回数据部分
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
