import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RotateCw } from 'lucide-react';
import qs from 'qs';

import { BurgerMenu, Footer, Header } from '@/components';
import { useShelters, useThrottle } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Filter, ShelterListView } from './components';
import { IFilterFormProps } from './components/Filter/types';

const initialFilterData: IFilterFormProps = {
	search: '',
	priorities: [],
	supplyCategoryIds: [],
	supplyIds: [],
	shelterStatus: [],
  cities: [],
};

const loadFilterData = (): IFilterFormProps => {
  const storedFilterData = JSON.parse(
    localStorage.getItem('filter-data') || '{}'
  );
  return {
    ...initialFilterData,
    ...storedFilterData,
    ...qs.parse(new URLSearchParams(window.location.search).toString()),
  };
};

const saveFilterData = (filterData: IFilterFormProps) => {
  localStorage.setItem('filter-data', JSON.stringify(filterData));
};

const Home = () => {
  const { data: shelters, loading, refresh } = useShelters({ cache: true });
  const [isModalOpen, setOpenModal] = useState<boolean>(false);
  const [, setSearchParams] = useSearchParams();
  const [filterData, setFilterData] = useState<IFilterFormProps>(
    loadFilterData()
  );

  const [, setSearch] = useThrottle<string>(
    {
      throttle: 400,
      callback: () => {
        const params = new URLSearchParams(qs.stringify(filterData));
        setSearchParams(params);
        refresh({ params });
      },
    },
    [filterData]
  );

  const clearSearch = useCallback(() => {
    setSearch('');
    setFilterData(initialFilterData);
    setSearchParams('');
    refresh();
  }, [refresh, setSearch, setSearchParams]);

	const hasMore = useMemo(
		() => shelters.page * shelters.perPage < shelters.count,
		[shelters.page, shelters.perPage, shelters.count]
	);

  const factorySearchArgs = useCallback((values: IFilterFormProps) => {
    const searchQueryArgs = {
      search: values.search,
      priorities: values.priorities,
      supplyCategoryIds: values.supplyCategoryIds,
      supplyIds: values.supplyIds,
      shelterStatus: values.shelterStatus,
      cities: values.cities,
    };
    return searchQueryArgs;
  }, []);

  const onSubmitFilterForm = useCallback(
    (values: IFilterFormProps) => {
      setOpenModal(false);
      setFilterData(values);
      const searchQuery = qs.stringify(values, { skipNulls: true });
      setSearchParams(searchQuery);
      saveFilterData(values);
      refresh({ params: { search: searchQuery } });
    },
    [refresh, setSearchParams, factorySearchArgs]
  );

  const handleFetchMore = useCallback(() => {
    const params = {
      ...shelters.filters,
      page: shelters.page + 1,
      perPage: shelters.perPage,
      search: qs.stringify(factorySearchArgs(filterData)),
    };

    refresh(
      {
        params: params,
      },
      true
    );
  }, [refresh, filterData, shelters.filters, shelters.page, shelters.perPage]);

  return (
    <div className='flex flex-col h-screen items-center'>
      {isModalOpen && (
        <Filter
          open={isModalOpen}
          data={filterData}
          onClose={() => setOpenModal(false)}
          onSubmit={onSubmitFilterForm}
        />
      )}
      <Header
        title='SOS Rio Grande do Sul'
        startAdornment={<BurgerMenu session={session} />}
        endAdornment={
          <div className='flex gap-2 items-center'>
            {session && (
              <h3 className='text-white font-thin'>
                Bem vindo, {session.name}
              </h3>
            )}
            <Button
              loading={loading}
              variant='ghost'
              size='sm'
              onClick={() => refresh()}
              className='disabled:bg-red-500 hover:bg-red-400'
            >
              <RotateCw size={20} className='stroke-white' />
            </Button>
            {session && (
              <Button
                loading={loadingSession}
                variant='ghost'
                size='sm'
                onClick={() => {
                  localStorage.removeItem('token');
                  refreshSession();
                }}
                className='disabled:bg-red-500 hover:bg-red-400'
              >
                <LogOutIcon size={20} className='stroke-white' />
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
        searchValue={filterData.search}
        onSearchValueChange={(v) => {
          setFilterData((prev) => ({ ...prev, search: v }));
          setSearch(v);
        }}
        hasMoreItems={hasMore}
        onOpenModal={() => setOpenModal(true)}
        onClearSearch={clearSearch}
        className='flex-1 p-4 max-w-4xl'
      />
      <Footer />
    </div>
  );
};

export { Home };
