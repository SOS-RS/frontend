import { useContext } from 'react';

import { SessionContext } from '@/contexts';
import MappedRoles from '@/hooks/useAuthRoles/MappedRoles';
import { AccessLevel } from '@/service/sessions/types';

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
