import { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useGeolocation } from '@/hooks';
import { ILocationFilter } from './types';

const MAX_PROXIMITY_IN_METERS = 50_000;
const PROXIMITY_INTERVAL_IN_METERS = 500;

const LocationFilter = ({
  geolocationFormValues,
  geolocationValues,
  setFieldValue,
  error,
}: ILocationFilter) => {
  const {
    isLoading,
    geolocation,
    getLocation,
    error: errorGeolocation,
  } = useGeolocation();
  const [isProximityChecked, setIsProximityChecked] = useState<boolean>(
    (Boolean(geolocationValues?.latitude) &&
      Boolean(geolocationValues?.longitude)) ||
      (Boolean(geolocationFormValues?.latitude) &&
        Boolean(geolocationFormValues?.longitude))
  );
  const normalizedRadiusMeters =
    geolocationFormValues?.radiusInMeters ??
    geolocationValues?.radiusInMeters ??
    0;

  useEffect(() => {
    if (!isProximityChecked) return;
    if (!geolocation.latitude) return;
    if (!geolocation.latitude) return;

    setFieldValue(
      'geolocation.radiusInMeters',
      geolocationValues?.radiusInMeters ?? 0
    );
    setFieldValue('geolocation.latitude', geolocation.latitude);
    setFieldValue('geolocation.longitude', geolocation.longitude);
  }, [
    geolocation.latitude,
    geolocation.longitude,
    geolocationValues?.radiusInMeters,
    isProximityChecked,
    setFieldValue,
  ]);

  const showFilter = isProximityChecked && !errorGeolocation && !isLoading;

  return (
    <div className="flex flex-col gap-2 w-full my-4">
      <div>
        <div className="flex flex-col gap-2 w-full">
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={(event) => {
                const { checked } = event.target;
                setIsProximityChecked(checked);
                if (checked) {
                  getLocation();
                  return;
                }

                setFieldValue('geolocation.radiusInMeters', undefined);
                setFieldValue('geolocation.latitude', undefined);
                setFieldValue('geolocation.longitude', undefined);
              }}
              defaultChecked={isProximityChecked}
            />
            Filtro por proximidade
          </label>

          {Boolean(isLoading) && (
            <Loader className="animate-spin h-15 w-15 stroke-black" />
          )}
        </div>
        {Boolean(errorGeolocation) && (
          <>
            {errorGeolocation && (
              <p className={'text-red-600 text-sm'}>{errorGeolocation}</p>
            )}
          </>
        )}
        {showFilter && (
          <>
            <div className="flex flex-col gap-2 w-full my-2 items-center">
              <p className="text-sm md:text-md font-medium mb-5">
                Selecione o raio máximo de abrigos na região(KM's ao redor)
              </p>
              {Boolean(error) && (
                <div className="pb-2">
                  {error && <p className={'text-red-600 text-sm'}>{error}</p>}
                </div>
              )}
              <div className="flex flex-row gap-2 w-full my-2 items-center justify-center">
                <Button
                  onClick={(event) => {
                    event.preventDefault();
                    const newValue = Math.max(
                      +normalizedRadiusMeters - PROXIMITY_INTERVAL_IN_METERS,
                      0
                    );
                    setFieldValue('geolocation.radiusInMeters', newValue);
                  }}
                  className="flex gap-2 text-white font-medium text-lg bg-blue-500 hover:bg-blue-600"
                >
                  -
                </Button>
                <span className="w-2/6 justify-center flex">
                  {normalizedRadiusMeters / 1000} km
                </span>
                <Button
                  onClick={(event) => {
                    event.preventDefault();
                    const newValue = Math.min(
                      +normalizedRadiusMeters + PROXIMITY_INTERVAL_IN_METERS,
                      MAX_PROXIMITY_IN_METERS
                    );
                    setFieldValue('geolocation.radiusInMeters', newValue);
                  }}
                  className="flex gap-2 text-white font-medium text-lg bg-blue-500 hover:bg-blue-600"
                >
                  +
                </Button>
              </div>
              <Slider
                max={MAX_PROXIMITY_IN_METERS}
                step={PROXIMITY_INTERVAL_IN_METERS}
                value={[
                  geolocationFormValues?.radiusInMeters ??
                    geolocationValues?.radiusInMeters ??
                    0,
                ]}
                onValueChange={(value) => {
                  setFieldValue('geolocation.radiusInMeters', value[0]);
                }}
                name="geolocation.radiusInMeters"
                className=""
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LocationFilter;