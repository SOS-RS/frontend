import { LatLngExpression } from 'leaflet';

export interface MarkerData {
  position: LatLngExpression;
  label: string | null;
  accuracy?: number;
}
