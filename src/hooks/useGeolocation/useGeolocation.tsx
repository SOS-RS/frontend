import { useState, useCallback } from 'react';

import { GeolocationError, IGeolocation } from './types';

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
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError(GeolocationError.PERMISSION_DENIED);
        break;
      case error.POSITION_UNAVAILABLE:
        setError(GeolocationError.PERMISSION_DENIED);
        break;
      case error.TIMEOUT:
        setError(GeolocationError.TIMEOUT);
        break;

      default:
        setError(GeolocationError.DEFAULT);
        break;
    }
    setIsLoading(false);
  };

  const clearData = () => {
    setGeolocation({ latitude: 0, longitude: 0 });
  };

  const getLocation = useCallback(() => {
    if (geolocation.latitude && geolocation.longitude) return;

    setIsLoading(true);
    if (!window.navigator.geolocation) return;

    window.navigator.geolocation.getCurrentPosition(
      (position) => showPosition(position),
      (error) => showError(error),
      { enableHighAccuracy: true }
    );
  }, [geolocation.latitude, geolocation.longitude]);

  return { isLoading, getLocation, clearData, geolocation, error };
};
