export const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
};

export interface UserLocationControlProps {
  position: keyof typeof POSITION_CLASSES;
  location: Partial<GeolocationCoordinates>;
  disabled?: boolean;
}
