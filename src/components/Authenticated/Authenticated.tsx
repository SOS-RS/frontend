import { Fragment, useContext } from 'react';

import { SessionContext } from '@/contexts';

const Authenticated = ({ children }: { children?: React.ReactNode }) => {
  const { session } = useContext(SessionContext);

  if (!session) return <Fragment />;

  return <div className="contents">{children}</div>;
};

export { Authenticated };
