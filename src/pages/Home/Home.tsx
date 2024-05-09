import { useCallback, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RotateCw, LogOutIcon, Heart } from 'lucide-react';

import { Header } from '@/components';
import { useShelters, useThrottle } from '@/hooks';
import { Button } from '@/components/ui/button';
import { SessionContext } from '@/contexts';
import { Filter } from './components/Filter';
import { IUseShelterSearchParams } from '@/hooks/useShelters/types';
import { ShelterListView } from './components/ShelterListView';

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
    []
  );
  const navigate = useNavigate();

  const clearSearch = useCallback(() => {
    setSearchValue('');
    resetSearch();
  }, [resetSearch]);

  const hasMore = useMemo(
    () => shelters.page * shelters.perPage < shelters.count,
    [shelters.page, shelters.perPage, shelters.count]
  );

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleSearch = useCallback(
    (values: IUseShelterSearchParams) => {
      setOpenModal(false);
      setSearchValue(values.search ?? '');
      search({
        params: {
          ...values,
        },
      });
    },
    [search]
  );

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
      true
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
              onClick={() => search()}
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
          onSelectShelter={(s) => navigate(`/abrigo/${s.id}`)}
          hasMoreItems={hasMore}
          className="flex-1 p-0 md:p-4"
        />
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
