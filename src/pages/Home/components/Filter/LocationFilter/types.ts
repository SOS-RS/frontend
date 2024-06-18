import { IGeolocation } from '@/hooks/useGeolocation/types';

export interface ILocationFilter {
  geolocationValues?: IGeolocation;
  setFieldValue: any;
  error?: string;
}
