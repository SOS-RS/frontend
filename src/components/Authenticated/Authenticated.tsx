import { Fragment, useContext } from 'react';

import { SessionContext } from '@/contexts';
import { IAuthenticatedProps } from './types';
import { AccessLevel } from '@/service/sessions/types';

const MappedRoles: Record<AccessLevel, AccessLevel[]> = {
  Admin: ['Admin'],
  DistributionCenter: ['Admin', 'DistributionCenter'],
  Staff: ['Admin', 'Staff'],
  User: ['Admin', 'Staff', 'DistributionCenter', 'User'],
};

const Authenticated = ({ children, role = 'User' }: IAuthenticatedProps) => {
  const { session } = useContext(SessionContext);

  if (!session || !MappedRoles[role].includes(session.accessLevel))
    return <Fragment />;

  return <div className="contents">{children}</div>;
};

export { Authenticated };
