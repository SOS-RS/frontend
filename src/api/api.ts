import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';
import { clearCache, getCacheRequestData, handleCacheResponse } from './cache';
import { getHmacHeaders } from './hmac';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:4000/',
});

function handleRequestAuthToken(config: InternalAxiosRequestConfig<any>) {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
}

api.interceptors.request.use((config) => {
  if (!config.headers) config.headers = {} as AxiosRequestHeaders;
  handleRequestAuthToken(config);
  const response = getCacheRequestData(config);

  if (response) {
    config.adapter = () => {
      return new Promise((resolve) => {
        resolve({ ...response, config });
      });
    };
  } else {
    const hmacHeaders = getHmacHeaders({
      method: config.method?.toUpperCase(),
      url: [config.url, new URLSearchParams(config.params).toString()]
        .filter((p) => !!p)
        .join('?'),
      body: config.data,
    });
    Object.assign(config.headers, hmacHeaders);
  }
  return config;
});

api.interceptors.response.use(
  (config) => {
    handleCacheResponse(config);
    return config;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      clearCache(false);
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export { api };
