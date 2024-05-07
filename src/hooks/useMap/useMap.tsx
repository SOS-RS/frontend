import { useEffect, useRef } from 'react';
import { Map } from 'mapbox-gl';

export const initMap = (
  container: HTMLDivElement,
  coords: [number, number]
) => {
  return new Map({
    container,
    style: 'mapbox://styles/mapbox/outdoors-v12',
    pitchWithRotate: false,
    center: coords,
    zoom: 15,
    accessToken: import.meta.env.VITE_MAPBOX_PUBLIC_KEY as string,
    doubleClickZoom: false,
  });
};

export const useMap = (container: React.RefObject<HTMLDivElement>) => {
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (container.current) {
      mapRef.current = initMap(
        container.current,
        [-100.31019063199852, 25.66901932031443]
      );
    }
  }, [container]);

  return mapRef;
};
