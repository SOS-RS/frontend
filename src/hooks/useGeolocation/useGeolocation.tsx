import { useState, useCallback } from 'react';

import { IGeolocation } from './types';

export const useGeolocation = (isForceReresh = false) => {
  const [geolocation, setGeolocation] = useState<IGeolocation>({
    latitude: 0,
    longitude: 0,
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const showPosition = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    setGeolocation({ latitude, longitude });
    setIsLoading(false);
    setError('');
  };

  const showError = (error: GeolocationPositionError) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError('É preciso liberar a permissão de geolocalização.');
        break;
      case error.POSITION_UNAVAILABLE:
        setError(
          'Infelizmente não foi possível obter sua posição, talvez seu dispositivo esteja desatualizado.'
        );
        break;
      case error.TIMEOUT:
        setError('A requisição expirou, por favor tente novamente.');
        break;

      default:
        setError(
          'Infelizmente não foi possível obter seu endereço neste dispositivo.'
        );
        break;
    }
    setIsLoading(false);
  };
  const getLocation = useCallback(() => {
    if (isForceReresh || (geolocation.latitude && geolocation.longitude))
      return;

    setIsLoading(true);
    if (!window.navigator.geolocation) return;

    window.navigator.geolocation.getCurrentPosition(
      (position) => showPosition(position),
      (error) => showError(error),
      { enableHighAccuracy: true }
    );
  }, [geolocation.latitude, geolocation.longitude, isForceReresh]);

  return { isLoading, getLocation, geolocation, error };
};
