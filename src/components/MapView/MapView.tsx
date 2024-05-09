import { useCallback, useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import { IMapViewProps } from './types';

export const defaultCoords: [number, number] = [
  -51.218126505963774, -30.040560515575834,
];

const MapView = (props: IMapViewProps) => {
  const { className = '', coords } = props;
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    window.navigator.geolocation.getCurrentPosition(
      (pos) => {
        const bounds = new window.google.maps.LatLngBounds({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        map.fitBounds(bounds);
      },
      (err) => {
        console.log('Erro ao utilizar geolocalização: ', err);
        const bounds = new window.google.maps.LatLngBounds({
          lat: defaultCoords[0],
          lng: defaultCoords[1],
        });
        map.fitBounds(bounds);
      }
    );

    setMap(map);
  }, []);

  useEffect(() => {
    if (map && isLoaded) {
      console.log('atualizou o centro para', {
        lat: coords[1],
        lon: coords[0],
      });
      const bounds = new window.google.maps.LatLngBounds({
        lat: coords[1],
        lng: coords[0],
      });
      map.fitBounds(bounds);
      map.setOptions({
        zoom: 12,
        maxZoom: 30,
        isFractionalZoomEnabled: true,
        zoomControl: true,
      });
    }
  }, [coords, isLoaded, map]);

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName={className}
      center={{ lat: coords[1], lng: coords[0] }}
      onLoad={onLoad}
      onUnmount={() => setMap(null)}
      options={{
        zoom: 12,
        maxZoom: 30,
        isFractionalZoomEnabled: true,
        zoomControl: true,
      }}
    >
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};

export { MapView };
