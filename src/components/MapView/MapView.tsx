import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

import { useMap } from '@/hooks';
import { IMapViewProps } from './types';
import { cn } from '@/lib/utils';

const MapView = (props: IMapViewProps) => {
  const { markers, className = '', coords, ...rest } = props;
  const ref = useRef<HTMLDivElement>(null);
  const { map } = useMap({ container: ref, coords });

  useEffect(() => {
    const markersData: mapboxgl.Marker[] = [];
    if (map) {
      markersData.push(
        ...markers.map(({ latitude, longitude }) => {
          console.log('marker adicionado em', latitude, longitude);
          const marker = new mapboxgl.Marker({
            color: '#ff0000',
          })
            .setLngLat({ lat: latitude, lon: longitude })
            .addTo(map);

          const popupElement = document.createElement('h3');
          const h3 = `<h3>${latitude}</h3>`;
          popupElement.innerHTML = h3;
          const popup = new mapboxgl.Popup({ offset: 25 }).setDOMContent(
            popupElement
          );
          marker.setPopup(popup);
          return marker;
        })
      );
    }

    return () => {
      markersData.forEach((marker) => {
        console.log('marker removido');
        marker.remove();
      });
    };
  }, [markers, map]);

  return (
    <div
      ref={ref}
      className={cn(
        'w-full h-full absolute top-0 bottom-0 right-0 left-0',
        className
      )}
      {...rest}
    />
  );
};

export { MapView };
