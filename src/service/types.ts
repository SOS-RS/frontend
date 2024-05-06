export interface ServerResponse<T = any> {
  statusCode: number;
  message: string;
  data: T;
}
