export interface IAuthResponse {
  token: string;
}

export interface IAuthRequest {
  login: string;
  password: string;
  ip: string;
  userAgent: string;
}
