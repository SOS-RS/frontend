export interface IAuthResponse {
  token: string;
}

export interface IAuthRequest {
  login: string;
  password: string;
}

export type AccessLevel = 'User' | 'Staff' | 'DistributionCenter' | 'Admin';

export interface ISession {
  id: string;
  name: string;
  login: string;
  phone: string;
  accessLevel: AccessLevel;
  createdAt: string;
}
