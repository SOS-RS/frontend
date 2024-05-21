import { useContext } from 'react';
import { SessionContext } from '@/contexts/SessionContext';
import MappedRoles from '@/hooks/useAuthRoles/MappedRoles';
import { AccessLevel } from '@/service/sessions/types';

const useAuthRoles = (...roles: AccessLevel[]): boolean => {
  const { session } = useContext(SessionContext);

  if (!session) {
    return false;
  }

  return roles.some((role) => MappedRoles[role].includes(session.accessLevel));
};

export { useAuthRoles };
