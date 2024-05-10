import { useCallback, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RotateCw, LogOutIcon } from 'lucide-react';
import qs from 'query-string';

import { Footer, Header } from '@/components';
import { useShelters, useThrottle } from '@/hooks';
import { Button } from '@/components/ui/button';
import { SessionContext } from '@/contexts';
import { Filter } from './components/Filter';
import { ShelterListView } from './components/ShelterListView';
import { IFilterFormProps } from './components/Filter/types';

const initialFilterData: IFilterFormProps = {
  search: '',
  priority: null,
  supplyCategoryIds: [],
  supplyIds: [],
  shelterStatus: [],
};

const Home = () => {
  const { data: shelters, loading, refresh } = useShelters();
  const {
    loading: loadingSession,
    refreshSession,
    session,
  } = useContext(SessionContext);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isModalOpen, setOpenModal] = useState<boolean>(false);
  const [filterData, setFilterData] =
    useState<IFilterFormProps>(initialFilterData);
  const [, setSearch] = useThrottle<string>(
    {
      throttle: 400,
      callback: (v) => {
        const params = {
          search: v ? qs.stringify(filterData, { arrayFormat: 'bracket' }) : '',
        };

        refresh({
          params: params,
        });
      },
    },
    []
  );
  const navigate = useNavigate();

  const clearSearch = useCallback(() => {
    setSearchValue('');
    setSearch('');
    setFilterData(initialFilterData);
  }, [setSearch]);

  const hasMore = useMemo(
    () => shelters.page * shelters.perPage < shelters.count,
    [shelters.page, shelters.perPage, shelters.count]
  );

  const onSubmitFilterForm = useCallback((values: IFilterFormProps) => {
    setOpenModal(false);
    setFilterData(values);
    //TODO: logica de buscar no filtro
  }, []);

  const handleFetchMore = useCallback(() => {
    const params = {
      ...shelters.filters,
      page: shelters.page + 1,
      perPage: shelters.perPage,
      search: searchValue ? searchValue : '',
    };

    refresh(
      {
        params: params,
      },
      true
    );
  }, [refresh, searchValue, shelters.filters, shelters.page, shelters.perPage]);

  return (
    <div className="flex flex-col h-screen items-center">
      {isModalOpen && (
        <Filter
          open={isModalOpen}
          data={filterData}
          onClose={() => setOpenModal(false)}
          onSubmit={onSubmitFilterForm}
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
