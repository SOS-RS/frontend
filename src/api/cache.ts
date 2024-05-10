import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

function getCacheRequestData(config: InternalAxiosRequestConfig<any>) {
  if (
    config.method === 'get' &&
    config.url &&
    config.headers['x-app-cache'] === 'true'
  ) {
    const cache = localStorage.getItem(config.url);
    if (cache) {
      const { data, timestamp } = JSON.parse(cache);
      const ttl = 1000 * 60 * 5; // 5 minutes
      if (new Date().getTime() - timestamp >= ttl) {
        console.log(`cache - expirado - ${config.url}`);
        localStorage.removeItem(config.url);
      } else {
        console.log(`cache - ok - ${config.url}`);
        return data;
      }
    }
  }
  return null;
}

function handleCacheResponse(resp: AxiosResponse<any, any>) {
  if (
    resp.config.method === 'get' &&
    resp.config.url &&
    resp.config.headers['x-app-cache'] === 'true' &&
    resp.status >= 200 &&
    resp.status < 300
  ) {
    const { data, headers, status, statusText } = resp;
    localStorage.setItem(
      resp.config.url,
      JSON.stringify({
        data: { data, headers, status, statusText },
        timestamp: new Date().getTime(),
      })
    );
  }
}

export { handleCacheResponse, getCacheRequestData };
