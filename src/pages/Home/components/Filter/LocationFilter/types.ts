import { IGeolocation } from '@/hooks/useGeolocation/types';

export interface ILocationFilter {
  geolocationFormValues?: IGeolocation;
  geolocationValues?: IGeolocation;
  setFieldValue: any;
  error?: string;
}
