import { Fragment, useCallback, useContext, useMemo, useState } from 'react';
import {
  RotateCw,
  CircleAlert,
  Search,
  Loader,
  LogOutIcon,
} from 'lucide-react';

import { Alert, Header, NoFoundSearch, ShelterListItem } from '@/components';
import { Input } from '@/components/ui/input';
import { useShelters, useThrottle } from '@/hooks';
import { Button } from '@/components/ui/button';
import { SessionContext } from '@/contexts';

const alertDescription =
  'Você pode consultar a lista de abrigos disponíveis. Ver e editar os itens que necessitam de doações.';

const Home = () => {
  const { data: shelters, loading, refresh } = useShelters();
  const {
    loading: loadingSession,
    refreshSession,
    session,
  } = useContext(SessionContext);
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

  return (
    <div className="flex flex-col h-screen items-center">
      <Header
        title="SOS Rio Grande do Sul"
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
      <div className="p-5 gap-3 flex flex-col w-full max-w-5xl">
        <h1 className="text-[#2f2f2f] font-semibold text-2xl">
          Abrigos disponíveis ({shelters.count})
        </h1>
        <Alert
          description={alertDescription}
          startAdornment={
            <CircleAlert size={20} className="stroke-light-yellow" />
          }
        />
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
        <main className="flex flex-col gap-4">
          {loading ? (
            <Loader className="justify-self-center self-center w-5 h-5 animate-spin" />
          ) : shelters.results.length === 0 ? (
            <NoFoundSearch />
          ) : (
            <Fragment>
              {shelters.results.map((s, idx) => (
                <ShelterListItem key={idx} data={s} />
              ))}
              {hasMore ? (
                <Button
                  className="bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700"
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
    </div>
  );
};

export { Home };
