import { Fragment } from 'react';

import { IAuthenticatedProps } from './types';
import { useAuthRoles } from '@/hooks';

const Authenticated = ({ children, role = 'User' }: IAuthenticatedProps) => {
  const isAuthenticated = useAuthRoles(role);

  if (!isAuthenticated) return <Fragment />;

  return <div className="contents">{children}</div>;
};

export { Authenticated };
