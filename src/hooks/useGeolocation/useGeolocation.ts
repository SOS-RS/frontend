import { useState, useEffect } from 'react';

function useGeolocation() {
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [location, setLocation] = useState<Partial<GeolocationCoordinates>>({});

  function success(pos: GeolocationPosition) {
    const { coords } = pos;
    const { latitude, longitude, accuracy } = coords;
    setLocation({ latitude, longitude, accuracy });
    setLoading(false);
    setIsSuccess(true);
  }

  function error(err: GeolocationPositionError) {
    setLoading(false);
    setIsSuccess(false);
    if (err.code === 1) {
      alert('Por favor permita o acesso a sua geolocalização');
    } else {
      alert('Erro ao obter a geolocalização');
    }
  }

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(success, error);
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return { location, loading, success: isSuccess };
}

export { useGeolocation };
