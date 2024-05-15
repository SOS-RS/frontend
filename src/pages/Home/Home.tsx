import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RotateCw } from 'lucide-react';
import qs from 'qs';

import { Footer, Header } from '@/components';
import { useShelters, useThrottle } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Filter } from './components/Filter';
import { ShelterListView } from './components/ShelterListView';
import { IFilterFormProps } from './components/Filter/types';
import { BurgerMenu } from '@/components/BurgerMenu';

const initialFilterData: IFilterFormProps = {
  search: '',
  priority: null,
  supplyCategoryIds: [],
  supplyIds: [],
  shelterStatus: [],
};

const Home = () => {
  const { data: shelters, loading, refresh } = useShelters({ cache: true });
  const [isModalOpen, setOpenModal] = useState<boolean>(false);
  const [, setSearchParams] = useSearchParams();
  const [filterData, setFilterData] = useState<IFilterFormProps>({
    ...initialFilterData,
    ...qs.parse(new URLSearchParams(window.location.search).toString()),
  });

  const [, setSearch] = useThrottle<string>(
    {
      throttle: 400,
      callback: (v) => {
        const params: Record<string, string> = {
          search: v ? qs.stringify(filterData) : '',
        };
        setSearchParams(params.search);
        refresh({
          params: params,
        });
      },
    },
    []
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

  const onSubmitFilterForm = useCallback(
    (values: IFilterFormProps) => {
      setOpenModal(false);
      setFilterData(values);
      const searchQuery = qs.stringify(values, {
        skipNulls: true,
      });
      setSearchParams(searchQuery);
      refresh({
        params: {
          search: searchQuery,
        },
      });
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

    refresh(
      {
        params: params,
      },
      true
    );
  }, [refresh, filterData, shelters.filters, shelters.page, shelters.perPage]);

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
        onFetchMoreData={handleFetchMore}
        searchValue={filterData.search}
        onSearchValueChange={(v) => {
          setFilterData((prev) => ({ ...prev, search: v }));
          setSearch(v);
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
