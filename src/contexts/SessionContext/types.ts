export interface ISession {
  id: string;
  userId: string;
  ip: string;
  userAgent: string;
  active: string;
  createdAt: string;
  updatedAt: string;
}

export enum LoginType {
  User = "user",
}

export interface ISessionContext {
  session: ISession | null;
  loading: boolean;
  refreshSession: () => void;
}
