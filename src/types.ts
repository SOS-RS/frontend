export interface IServerResponse<T = void> {
  data: T;
  statusCode: number;
  message: string;
}
