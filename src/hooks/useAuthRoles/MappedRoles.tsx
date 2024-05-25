import { AccessLevel } from '@/service/sessions/types';

const MappedRoles: Record<AccessLevel, AccessLevel[]> = {
  Admin: ['Admin'],
  DistributionCenter: ['Admin', 'DistributionCenter'],
  Staff: ['Admin', 'Staff'],
  User: ['Admin', 'Staff', 'DistributionCenter', 'User'],
};

export default MappedRoles;
