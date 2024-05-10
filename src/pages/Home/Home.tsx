import { useCallback, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RotateCw, LogOutIcon } from 'lucide-react';

import { Footer, Header } from '@/components';
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
        onOpenModal={() => setOpenModal(true)}
        onClearSearch={clearSearch}
        className="flex-1 p-4 max-w-4xl"
      />
      <Footer />
    </div>
  );
};

export { Home };
