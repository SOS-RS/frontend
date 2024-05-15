export interface IGeolocation {
  latitude: number;
  longitude: number;
  radiusInMeters?: number;
}

export const GeolocationError = {
  PERMISSION_DENIED: 'É preciso liberar a permissão de geolocalização.',
  POSITION_UNAVAILABLE:
    'Infelizmente não foi possível obter sua posição, talvez seu dispositivo esteja desatualizado.',
  TIMEOUT: 'A requisição expirou, por favor tente novamente.',
  DEFAULT:
    'Infelizmente não foi possível obter seu endereço neste dispositivo.',
};
