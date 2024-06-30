import { useCallback, useState } from 'react';
import { GeoLocation } from './types';
import { toast } from '@/components/ui/use-toast';

const mockedUserLocation = {
  latitude: '-30.019337370877093',
  longitude: '-51.20618075217121',
};

const requestLocation = async (): Promise<GeoLocation> => {
  const geolocation = navigator.geolocation;
  if (!geolocation) return undefined;
  return new Promise((resolve, reject) => {
    geolocation.getCurrentPosition(
      // successfully retrieved user location
      (geo) => {
        const { latitude, longitude } = geo.coords;
        resolve({
          latitude: latitude?.toString(),
          longitude: longitude.toString(),
        });
      },
      // user not allowed or not able to share location
      (e) => {
        toast({
          title: 'Erro ao obter localização',
          variant: 'destructive',
        });
        reject(e);
      },
      {
        // try to use the best possible position from the device
        enableHighAccuracy: true,
        timeout: 50000,
        maximumAge: 0,
      },
    );
  });
};

export const useUserGeolocation = () => {
  const [location, setLocation] = useState<GeoLocation>(undefined);

  const refresh = useCallback(requestLocation, [window.navigator]);

  const request = () => refresh().then(setLocation);

  return { userLocation: location ?? mockedUserLocation, request };
};
