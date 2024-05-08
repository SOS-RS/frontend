import { useEffect, useState } from 'react';
import { Map } from 'mapbox-gl';
import { IUseMapProps } from '@/components/MapView/types';

export const defaultCoords: [number, number] = [
  -51.218126505963774, -30.040560515575834,
];

export const initMap = (
  container: HTMLDivElement,
  coords: [number, number]
) => {
  return new Map({
    container,
    style: 'mapbox://styles/mapbox/outdoors-v12',
    pitchWithRotate: false,
    center: coords,
    zoom: 12,
    accessToken: import.meta.env.VITE_MAPBOX_PUBLIC_KEY as string,
    doubleClickZoom: false,
  });
};

export const useMap = (props: IUseMapProps) => {
  const { container, coords } = props;
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (container.current) {
          console.log('1');
          setMap(
            initMap(container.current, [
              pos.coords.longitude,
              pos.coords.latitude,
            ])
          );
        }
      },
      (err) => {
        console.log('Erro ao utilizar geolocalização: ', err);
        if (container.current) {
          console.log('2');
          setMap(initMap(container.current, defaultCoords));
        }
      }
    );
  }, [container]);

  useEffect(() => {
    if (map && map.loaded()) {
      console.log('atualizou o centro para', {
        lat: coords[0],
        lon: coords[1],
      });
      map.setCenter({ lat: coords[0], lon: coords[1] });
    }
  }, [coords, map]);

  return { map };
};
