import { MapContainer, TileLayer } from 'react-leaflet';
import { MapProps } from './types';

const Map = ({ children, ...mapProps }: MapProps) => {
  return (
    <MapContainer
      {...mapProps}
      className="h-96 w-full z-0"
      center={[-30.033081, -51.256996]}
      zoom={9}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
};

export { Map };
