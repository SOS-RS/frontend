import { ISession } from '@/service/sessions/types';

export interface IBurgerMenu {
  session: ISession | null;
}

export interface IPartnerLink {
  name: string;
  url: string;
}
