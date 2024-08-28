import { useState, useCallback } from 'react';

import { IGeolocation } from './types';

export const useGeolocation = () => {
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
    const errorMessages: { [key: number]: string } = {
      [GeolocationPositionError.PERMISSION_DENIED]:
        'É preciso liberar a permissão de geolocalização.',
      [GeolocationPositionError.POSITION_UNAVAILABLE]:
        'Infelizmente não foi possível obter sua posição, talvez seu dispositivo esteja desatualizado.',
      [GeolocationPositionError.TIMEOUT]:
        'A requisição expirou, por favor tente novamente.',
    };
    const errorMessage =
      errorMessages[error.code] ||
      'Infelizmente não foi possível obter seu endereço neste dispositivo.';
    setError(errorMessage);
    setIsLoading(false);
  };

  const clearData = () => {
    setGeolocation({ latitude: 0, longitude: 0 });
  };

  const getLocation = useCallback(() => {
    if (geolocation.latitude && geolocation.longitude) return;

    if (!window.navigator.geolocation) return;
    setIsLoading(true);

    window.navigator.geolocation.getCurrentPosition(showPosition, showError, {
      enableHighAccuracy: true,
    });
  }, [geolocation.latitude, geolocation.longitude]);

  return { isLoading, getLocation, clearData, geolocation, error };
};
