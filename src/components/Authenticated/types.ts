import { AccessLevel } from '@/service/sessions/types';

export interface IAuthenticatedProps {
  role?: AccessLevel;
  bypass?: boolean;
  children?: React.ReactNode;
}
