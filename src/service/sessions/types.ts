export interface IAuthResponse {
  token: string;
}

export interface IAuthRequest {
  login: string;
  password: string;
}

export interface ISession {
  id: string;
  name: string;
  login: string;
  phone: string;
  accessLevel: string;
  createdAt: string;
}
