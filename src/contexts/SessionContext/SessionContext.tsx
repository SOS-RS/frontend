import { createContext, useCallback, useEffect, useState } from 'react';

import { ISessionContext } from './types';
import { SessionServices } from '@/service';
import { ISession } from '@/service/sessions/types';

const SessionContext = createContext({} as ISessionContext);

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(
    !!window.localStorage.getItem('token')
  );
  const [session, setSession] = useState<ISession | null>(null);

  const refreshSession = useCallback(() => {
    const tk = window.localStorage.getItem('token');
    if (tk) {
      setLoading(true);
      SessionServices.show()
        .then((data) => setSession(data))
        .catch(() => {
          window.localStorage.removeItem('token');
          setSession(null);
        })
        .finally(() => setLoading(false));
    } else {
      setSession(null);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  return (
    <SessionContext.Provider value={{ session, loading, refreshSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
