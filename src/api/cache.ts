import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import qs from 'qs';

const defaultTtl: number = 1000 * 60 * 5;

function log(...args: any[]) {
  if (import.meta.env.DEV) {
    console.log(`${new Date().toISOString()}`, ...args);
  }
}

function checkCacheHasExpired(
  timestamp: number,
  ttl: number = defaultTtl
): boolean {
  return new Date().getTime() - timestamp >= ttl;
}

function clearCache(onlyExpired: boolean = true) {
  log(
    onlyExpired
      ? 'cache - checando caches expirados...'
      : 'cache - limpando cache...'
  );
  Object.keys(localStorage)
    .filter((key: string) => key.startsWith('cache:'))
    .forEach((key) => {
      const data = localStorage.getItem(key);
      if (data) {
        const { timestamp } = JSON.parse(data);
        if (!onlyExpired || checkCacheHasExpired(timestamp)) {
          localStorage.removeItem(key);
        }
      }
    });
}

function getCacheRequestData(config: InternalAxiosRequestConfig<any>) {
  if (
    config.method === 'get' &&
    config.url &&
    config.headers['x-app-cache'] === 'true'
  ) {
    const url = 'cache:' + config.url + '?' + qs.stringify(config.params);
    const cache = localStorage.getItem(url);
    if (cache) {
      const { data, timestamp } = JSON.parse(cache);
      if (checkCacheHasExpired(timestamp)) {
        log(`cache - expirado - ${url}`);
        localStorage.removeItem(url);
      } else {
        log(`cache - ok - ${url}`);
        return data;
      }
    }
  }
  return null;
}

function handleCacheResponse(resp: AxiosResponse<any, any>) {
  const url =
    'cache:' + resp.config.url + '?' + qs.stringify(resp.config.params);
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

clearCache();

export { handleCacheResponse, getCacheRequestData, clearCache };
