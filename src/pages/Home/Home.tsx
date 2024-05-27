import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RotateCw, Search } from 'lucide-react';
import qs from 'qs';

import { BurgerMenu, Footer, Header } from '@/components';
import { useShelters, useThrottle } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Filter, ShelterListView } from './components';
import { IFilterFormProps } from './components/Filter/types';

const initialFilterData: IFilterFormProps = {
  search: '',
  priority: null,
  supplyCategoryIds: [],
  supplyIds: [],
  shelterStatus: [],
  cities: [],
};

const loadFilterData = (): IFilterFormProps => {
  const storedFilterData = JSON.parse(localStorage.getItem('filterData') || '{}');
  return { ...initialFilterData, ...storedFilterData, ...qs.parse(new URLSearchParams(window.location.search).toString()) };
};

const saveFilterData = (filterData: IFilterFormProps) => {
  localStorage.setItem('filterData', JSON.stringify(filterData));
};


const Home = () => {
  const { data: shelters, loading, refresh } = useShelters({ cache: true });
  const [isModalOpen, setOpenModal] = useState<boolean>(false);
  const [, setSearchParams] = useSearchParams();
  const [filterData, setFilterData] = useState<IFilterFormProps>(loadFilterData());

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
    localStorage.removeItem('filterData');
    setSearchParams('');
    refresh();
  }, [refresh, setSearch, setSearchParams]);

  const hasMore = useMemo(
    () => shelters.page * shelters.perPage < shelters.count,
    [shelters.page, shelters.perPage, shelters.count]
  );

  const onSubmitFilterForm = useCallback(
    (values: IFilterFormProps) => {
      setOpenModal(false);
      setFilterData(values);
      const searchQuery = qs.stringify(values, { skipNulls: true });
      setSearchParams(searchQuery);
      saveFilterData(values);
      refresh({ params: { search: searchQuery } });
    },
    [refresh, setSearchParams]
  );

  const handleFetchMore = useCallback(() => {
    const params = {
      ...shelters.filters,
      page: shelters.page + 1,
      perPage: shelters.perPage,
      search: qs.stringify(filterData),
    };
    refresh({ params }, true);
  }, [refresh, filterData, shelters.filters, shelters.page, shelters.perPage]);

  useEffect(() => {
    if (filterData.search || filterData.cities.length > 0 || filterData.priority || filterData.shelterStatus.length > 0 || filterData.supplyCategoryIds.length > 0 || filterData.supplyIds.length > 0){
      setSearchParams(qs.stringify(filterData));
      refresh({ params: { search: qs.stringify(filterData) } });
    }
    saveFilterData(filterData);
  }, [filterData, refresh, setSearchParams]);

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
        startAdornment={<BurgerMenu />}
        endAdornment={
          <div className="flex gap-2 items-center">
            <Button
              loading={loading}
              variant="ghost"
              size="sm"
              onClick={() => refresh()}
              className="disabled:bg-red-500 hover:bg-red-400"
            >
              <RotateCw size={20} className="stroke-white" />
            </Button>
          </div>
        }
      />
      <ShelterListView
        loading={loading}
        count={shelters.count}
        data={shelters.results}
        filterData={filterData}
        onFetchMoreData={handleFetchMore}
        searchValue={filterData.search}
        onSearchValueChange={(v) => {
          setFilterData((prev) => ({ ...prev, search: v }));
          setSearch(v);
        }}
        onCitiesChange={(v) => {
          setFilterData((prev) => ({ ...prev, cities: v }));
          const searchQuery = qs.stringify(
            { ...filterData, cities: v },
            {
              skipNulls: true,
            }
          );
          setSearchParams(searchQuery);
          refresh({
            params: {
              search: searchQuery,
            },
          });
        }}
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
