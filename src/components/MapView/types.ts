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
  container: React.RefObject<HTMLDivElement>;
  coords: [number, number];
}
