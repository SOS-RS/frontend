export interface IServerResponse<T> {
  data: T;
  statusCode: number;
  message: string;
}
