import { AccessLevel } from '@/service/sessions/types';

export interface IAuthenticatedProps {
  role?: AccessLevel;
  children?: React.ReactNode;
}
