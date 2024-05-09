export interface IMapViewMarker {
  latitude: number;
  longitude: number;
  color?: string;
}

export interface IMapViewProps extends React.ComponentPropsWithoutRef<'div'> {
  markers: IMapViewMarker[];
  coords: [number, number];
}

export interface IUseMapProps {
  className?: string;
  coords: [number, number];
}
