import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { RotateCw, Search, Loader, Heart, LogOutIcon } from 'lucide-react';

import { Header, MapView, NoFoundSearch, ShelterListItem } from '@/components';
import { Input } from '@/components/ui/input';
import { useShelters, useThrottle } from '@/hooks';
import { Button } from '@/components/ui/button';
import { IMapViewMarker } from '@/components/MapView/types';
import { defaultCoords } from '@/hooks/useMap/useMap';
import { IUseShelterData } from '@/hooks/useShelter/types';
import { SessionContext } from '@/contexts';

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
    <div className="flex flex-col h-screen items-center relative">
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
      <MapView markers={markers} coords={coords} />
      <div className="flex h-full flex-col-reverse justify-between pt-4 md:flex-row gap-4 md:p-4 w-full">
        <div className="flex-1 flex flex-col max-h-[40vh] md:max-h-[93vh] min-w-96 w-full md:max-w-md rounded-lg p-4 gap-4 z-10 bg-card shadow-md">
          <h1 className="text-[#2f2f2f] font-semibold text-lg md:text-2xl">
            Abrigos disponíveis ({shelters.count})
          </h1>
          <main className="flex w-full overflow-y-auto flex-col gap-4">
            {loading ? (
              <Loader className="justify-self-center self-center w-5 h-5 animate-spin" />
            ) : shelters.results.length === 0 ? (
              <NoFoundSearch />
            ) : (
              <Fragment>
                {shelters.results.map((s, idx) => (
                  <ShelterListItem
                    key={idx}
                    data={s}
                    onClick={() => handleShelterItemClick(s)}
                  />
                ))}
                {hasMore ? (
                  <Button
                    className="bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700 py-2"
                    size="sm"
                    loading={loading}
                    onClick={handleFetchMore}
                  >
                    Carregar mais
                  </Button>
                ) : (
                  <p className="text-muted-foreground font-semibold">
                    Não há mais registros
                  </p>
                )}
              </Fragment>
            )}
          </main>
        </div>
        <div className="w-full px-4 md:max-w-4xl shadow-sm mx-auto">
          <div className="relative">
            <Input
              placeholder="Buscar por abrigo ou endereço"
              className="h-12 text-md font-medium text-zinc-600 pl-10 pr-4"
              onChange={(ev) => {
                setSearchValue(ev.target.value);
                setSearch(ev.target.value);
              }}
              value={searchValue}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search name="search" size="20" className="stroke-zinc-300" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex-col md:flex-row py-8 md:py-4 px-2 md-p4 flex gap-3 justify-center flex-wrap items-center bg-red-600">
        <p className="text-white">
          Para cadastrar novos abrigos clique{' '}
          <a
            href="https://forms.gle/2S7L2gR529Dc8P3T9"
            className="underline hover:text-gray-300"
            target="_blank"
          >
            aqui
          </a>
        </p>
        <span className="text-white hidden md:block">•</span>
        <span className="text-white flex flex-nowrap gap-2 items-center">
          Projeto Open Source disponível em{' '}
          <a
            className="underline hover:text-gray-300 flex"
            href="https://github.com/SOS-RS"
            target="_blank"
          >
            Github
          </a>
          <Heart className="h-3 w-3 stroke-white fill-white" />
        </span>
      </div>
    </div>
  );
};

export { Home };
