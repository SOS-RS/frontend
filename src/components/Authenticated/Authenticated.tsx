<<<<<<< HEAD
import { Fragment } from 'react';

import { IAuthenticatedProps } from './types';
import { useAuthRoles } from '@/hooks';

const Authenticated = ({ children, role = 'User' }: IAuthenticatedProps) => {
  const isAuthenticated = useAuthRoles(role);

  if (!isAuthenticated) return <Fragment />;
=======
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
>>>>>>> 3d3f437 (merge: develop -> master (#91))

  return <div className="contents">{children}</div>;
};

export { Authenticated };
