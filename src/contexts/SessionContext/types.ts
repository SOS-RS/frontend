import { ISession } from '@/service/sessions/types';

export interface ISessionContext {
  session: ISession | null;
  loading: boolean;
  refreshSession: () => void;
}
