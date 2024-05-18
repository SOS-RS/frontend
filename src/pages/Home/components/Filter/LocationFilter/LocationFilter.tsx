import { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useGeolocation } from '@/hooks';
import { ILocationFilter } from './types';
import { getOS } from './utils';
import { Link } from 'react-router-dom';

const MAX_PROXIMITY_IN_METERS = 50_000;
const PROXIMITY_INTERVAL_IN_METERS = 500;

const LocationAdvice = () => {
  const currentOs = getOS();

  const devicesLinks: Record<string, string> = {
    ['Android']:
      'https://support.google.com/accounts/answer/3467281?hl=pt-BR#turn_on_off',
    ['iOS']: 'https://support.apple.com/pt-br/102647',
  };
  const currentLink =
    devicesLinks[currentOs] ||
    'https://support.google.com/chrome/answer/142065?hl=pt-BR&co=GENIE.Platform%3DDesktop&sjid=11531706076940529676-SA';

  return (
    <Link to={currentLink} target="_blank" className="text-blue-600">
      Veja mais informações sobre a opção de geolocalização
    </Link>
  );
};

const LocationFilter = ({
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
    Boolean(geolocationValues?.latitude) &&
      Boolean(geolocationValues?.longitude)
  );
  const normalizedRadiusMeters = geolocationValues?.radiusInMeters ?? 0;

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
        <div className="flex flex-row gap-2 w-full">
          <Switch
            id="proximityCheck"
            defaultChecked={isProximityChecked}
            onCheckedChange={(checked) => {
              // const { checked } = event.target;
              setIsProximityChecked(checked);
              if (checked) {
                getLocation();
                return;
              }

              setFieldValue('geolocation.radiusInMeters', undefined);
              setFieldValue('geolocation.latitude', undefined);
              setFieldValue('geolocation.longitude', undefined);
            }}
          ></Switch>
          <label htmlFor="proximityCheck">Filtrar por proximidade</label>
          {isLoading && (
            <Loader className="animate-spin h-15 w-15 stroke-black" />
          )}
        </div>
        <div className="flex flex-col gap-2 w-full"></div>
        {Boolean(errorGeolocation) && (
          <>
            <LocationAdvice />
            <p className={'text-red-600 text-sm'}>{errorGeolocation}</p>
          </>
        )}
        {showFilter && (
          <div className="flex flex-col gap-2 w-full my-2 items-center">
            <div className="flex flex-row justify-start items-start w-full">
              <div>Proximidade do abrigo</div>
              <div className="ml-auto font-bold">
                {normalizedRadiusMeters / 1000} km
              </div>
            </div>
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
                className="flex bg-white text-black hover:bg-white rounded-full border-blue-600 border-2 p-0 m-0 hover:opacity-80 transition-colors duration-800 self-auto h-6 aspect-square"
              >
                -
              </Button>
              <Slider
                max={MAX_PROXIMITY_IN_METERS}
                step={PROXIMITY_INTERVAL_IN_METERS}
                value={[geolocationValues?.radiusInMeters ?? 0]}
                onValueChange={(value) => {
                  setFieldValue('geolocation.radiusInMeters', value[0]);
                }}
                name="geolocation.radiusInMeters"
                className=""
              />
              <Button
                onClick={(event) => {
                  event.preventDefault();
                  const newValue = Math.min(
                    +normalizedRadiusMeters + PROXIMITY_INTERVAL_IN_METERS,
                    MAX_PROXIMITY_IN_METERS
                  );
                  setFieldValue('geolocation.radiusInMeters', newValue);
                }}
                className="flex bg-white text-black hover:bg-white rounded-full border-blue-600 border-2 p-0 m-0 hover:opacity-80 transition-colors duration-800 self-auto h-6 aspect-square"
              >
                +
              </Button>
            </div>
            {Boolean(error) && (
              <div className="pb-2">
                <p className={'text-red-600 text-sm'}>{error}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationFilter;
