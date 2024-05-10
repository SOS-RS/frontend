import { Fragment, useCallback, useContext, useMemo, useState } from 'react';
import {
  RotateCw,
  CircleAlert,
  Search,
  Loader,
  ListFilter,
  LogOutIcon,
  Heart,
} from 'lucide-react';

import { Alert, Header, NoFoundSearch, ShelterListItem } from '@/components';
import { Input } from '@/components/ui/input';
import { useShelters, useThrottle } from '@/hooks';
import { Button } from '@/components/ui/button';
import { SessionContext } from '@/contexts';
import { Filter } from './components/Filter';
import { IUseShelterSearchParams } from '@/hooks/useShelters/types';

const alertDescription =
  'Você pode consultar a lista de abrigos disponíveis. Ver e editar os itens que necessitam de doações.';

const Home = () => {
  const { data: shelters, loading, search, resetSearch } = useShelters();
  const {
    loading: loadingSession,
    refreshSession,
    session,
  } = useContext(SessionContext);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isModalOpen, setOpenModal] = useState<boolean>(false);
  const [, setSearch] = useThrottle<string>(
    {
      throttle: 400,
      callback: (v) => {
        const params = {
          ...shelters.filters,
          search: v ? v : '',
          page: shelters.page,
          perPage: shelters.perPage,
        };

        search({
          params: params,
        });
      },
    },
    [],
  );

  const clearSearch = () => {
    setSearchValue('');
    resetSearch();
  };

  const hasMore = useMemo(
    () => shelters.page * shelters.perPage < shelters.count,
    [shelters.page, shelters.perPage, shelters.count],
  );

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleSearch = (values: IUseShelterSearchParams) => {
    setOpenModal(false);
    setSearchValue(values.search ?? '');
    search({
      params: {
        ...values,
      },
    });
  };

  const handleFetchMore = useCallback(() => {
    const params = {
      ...shelters.filters,
      page: shelters.page + 1,
      perPage: shelters.perPage,
      search: searchValue ? searchValue : '',
    };

    search(
      {
        params: params,
      },
      true,
    );
  }, [search, searchValue, shelters.filters, shelters.page, shelters.perPage]);

  return (
    <div className="flex flex-col h-screen items-center">
      {isModalOpen && (
        <Filter
          handleSearch={handleSearch}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          filters={shelters.filters}
        />
      )}
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
              onClick={() => clearSearch()}
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
        <div className="flex flex-row">
          <Button
            variant="ghost"
            size="sm"
            className="flex gap-2 items-center [&_svg]:stroke-blue-500"
            onClick={() => setOpenModal(true)}
          >
            <ListFilter className="h-5 w-5" />
            <h1 className="font-semibold text-[16px] text-blue-500">Filtros</h1>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex gap-2 items-center [&_svg]:stroke-blue-500"
            onClick={() => clearSearch()}
          >
            <CircleAlert className="h-5 w-5" />
            <h1 className="font-semibold text-[16px] text-blue-500">
              Limpar Filtros
            </h1>
          </Button>
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
