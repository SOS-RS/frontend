export interface IUser {
  id: string;
  name: string;
  lastName: string;
  login: string;
  password: string;
  phone: string;
  accessLevel: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUpdateUser {
  id: string;
  accessLevel: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateUser {
  name: string;
  lastName: string;
  phone: string;
}
