import { createContext, useCallback, useEffect, useState } from "react";

import { ISession, ISessionContext } from "./types";
import { SessionServices } from "@/services";
import { tokenName } from "@/lib/utils";

const SessionContext = createContext({} as ISessionContext);

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(
    !!window.localStorage.getItem(tokenName())
  );
  const [session, setSession] = useState<ISession | null>(null);

  const refreshSession = useCallback(() => {
    const tk = window.localStorage.getItem(tokenName());
    if (tk) {
      setLoading(true);
      SessionServices.show()
        .then((data) => setSession(data))
        .catch(() => {
          window.localStorage.removeItem(tokenName());
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
