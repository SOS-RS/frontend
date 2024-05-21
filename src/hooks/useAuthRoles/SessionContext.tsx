import { createContext } from 'react';
import { ISession } from '@/service/sessions/types';

type SessionContextType = {
  session: ISession | null;
};

const SessionContext = createContext<SessionContextType>({ session: null });

export { SessionContext };  export type { SessionContextType };

