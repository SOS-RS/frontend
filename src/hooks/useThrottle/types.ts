export interface ThrottleOptions<T> {
  callback: (value: T) => void;
  throttle?: number;
}
