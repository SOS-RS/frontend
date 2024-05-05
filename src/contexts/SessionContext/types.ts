export interface ISession {
  userId: string;
  sessionId: string;
  loginType: LoginType;
}

export enum LoginType {
  User = "user",
  Slot = "slot",
}

export interface ISessionContext {
  session: ISession | null;
  loading: boolean;
  refreshSession: () => void;
}
