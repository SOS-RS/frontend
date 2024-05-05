export interface IUser {
  email: string;
  name: string;
  password?: string;
  cpf?: string;
  phone?: string;
  photo?: string;
}

export interface IUpdateUser {
  photo: string;
  phone?: string;
}
