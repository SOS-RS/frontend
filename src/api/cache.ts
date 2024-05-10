import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import qs from 'qs';

function getCacheRequestData(config: InternalAxiosRequestConfig<any>) {
  if (
    config.method === 'get' &&
    config.url &&
    config.headers['x-app-cache'] === 'true'
  ) {
    const url = config.url + '?' + qs.stringify(config.params);
    const cache = localStorage.getItem(url);
    if (cache) {
      const { data, timestamp } = JSON.parse(cache);
      const ttl = 1000 * 60 * 5; // 5 minutes
      if (new Date().getTime() - timestamp >= ttl) {
        console.log(`cache - expirado - ${url}`);
        localStorage.removeItem(url);
      } else {
        console.log(`cache - ok - ${url}`);
        return data;
      }
    }
  }
  return null;
}

function handleCacheResponse(resp: AxiosResponse<any, any>) {
  const url = resp.config.url + '?' + qs.stringify(resp.config.params);
  if (
    resp.config.method === 'get' &&
    resp.config.url &&
    resp.config.headers['x-app-cache'] === 'true' &&
    resp.status >= 200 &&
    resp.status < 300
  ) {
    const { data, headers, status, statusText } = resp;
    localStorage.setItem(
      url,
      JSON.stringify({
        data: { data, headers, status, statusText },
        timestamp: new Date().getTime(),
      })
    );
  }
}

export { handleCacheResponse, getCacheRequestData };
