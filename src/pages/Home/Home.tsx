import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { RotateCw, LogOutIcon } from 'lucide-react';

import { Footer, Header, MapView } from '@/components';

import { useShelters, useThrottle } from '@/hooks';
import { Button } from '@/components/ui/button';
import { IMapViewMarker } from '@/components/MapView/types';
import { IUseShelterData } from '@/hooks/useShelter/types';
import { SessionContext } from '@/contexts';
import { ShelterListView } from './components';
import { defaultCoords } from '@/components/MapView/MapView';

const Home = () => {
  const { data: shelters, loading, refresh } = useShelters();
  const {
    session,
    loading: loadingSession,
    refreshSession,
  } = useContext(SessionContext);
  const [coords, setCoords] = useState<[number, number]>(defaultCoords);
  const [searchValue, setSearchValue] = useState<string>('');
  const [, setSearch] = useThrottle<string>(
    {
      throttle: 400,
      callback: (v) => {
        const params = {
          search: `address:contains:${v},name:contains:${v}`,
          or: 'true',
        };
        refresh({
          params: v ? params : {},
        });
      },
    },
    []
  );
  const hasMore = useMemo(
    () => shelters.page * shelters.perPage < shelters.count,
    [shelters.page, shelters.perPage, shelters.count]
  );
  const [markers, setMarkers] = useState<IMapViewMarker[]>([]);

  const handleFetchMore = useCallback(() => {
    const params = {
      page: shelters.page + 1,
      perPage: shelters.perPage,
    };

    if (searchValue)
      Object.assign(params, {
        search: `address:contains:${searchValue},name:contains:${searchValue}`,
        or: 'true',
      });

    refresh(
      {
        params,
      },
      true
    );
  }, [refresh, searchValue, shelters.page, shelters.perPage]);

  const handleShelterItemClick = useCallback((item: IUseShelterData) => {
    if (item.latitude && item.longitude)
      setCoords([item.latitude, item.longitude]);
  }, []);

  useEffect(() => {
    const markersData: IMapViewMarker[] = shelters.results.reduce(
      (prev, { latitude, longitude }) =>
        latitude && longitude ? [...prev, { latitude, longitude }] : prev,
      [] as IMapViewMarker[]
    );

    setMarkers(markersData);
  }, [shelters]);

  return (
    <div className="flex flex-col max-h-screen h-screen items-center relative">
      <Header
        title="SOS Rio Grande do Sul"
        className="z-10"
        endAdornment={
          <div className="flex gap-2 items-center">
            {session && (
              <h3 className="text-gray-300 font-thin">
                Bem vindo, {session.name}
              </h3>
            )}
            <Button
              loading={loading}
              variant="ghost"
              size="sm"
              onClick={() => refresh()}
              className="disabled:bg-red-500 hover:bg-red-400"
            >
              <RotateCw size={20} className="stroke-white" />
            </Button>
            {session && (
              <Button
                loading={loadingSession}
                variant="ghost"
                size="sm"
                onClick={() => {
                  localStorage.removeItem('token');
                  refreshSession();
                }}
                className="disabled:bg-red-500 hover:bg-red-400"
              >
                <LogOutIcon size={20} className="stroke-white" />
              </Button>
            )}
          </div>
        }
      />
      <ShelterListView
        loading={loading}
        count={shelters.count}
        data={shelters.results}
        onFetchMoreData={handleFetchMore}
        searchValue={searchValue}
        onSearchValueChange={(v) => {
          setSearchValue(v);
          setSearch(v);
        }}
        onSelectShelter={handleShelterItemClick}
        hasMoreItems={hasMore}
        className="flex-1 p-0 md:p-4"
      />
      <Footer className="z-10" />
      <MapView
        markers={markers}
        coords={coords}
        className="absolute top-0 right-0 bottom-0 left-0"
      />
    </div>
  );
};

export { Home };
