import { useContext } from 'react';

import { SessionContext } from '@/contexts';
import { AccessLevel } from '@/service/sessions/types';

const MappedRoles: Record<AccessLevel, AccessLevel[]> = {
  Admin: ['Admin'],
  DistributionCenter: ['Admin', 'DistributionCenter'],
  Staff: ['Admin', 'Staff'],
  User: ['Admin', 'Staff', 'DistributionCenter', 'User'],
};

const useAuthRoles = (...roles: AccessLevel[]) => {
  const { session } = useContext(SessionContext);

  if (
    !session ||
    !roles.some((role) => MappedRoles[role].includes(session.accessLevel))
  )
    return false;

  return true;
};

export { useAuthRoles };
