import { CircleAlert, ListFilter, Search } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  Alert,
  LoadingIndicator,
  NoFoundSearch,
  ShelterListItem,
} from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useShelters, useThrottle } from '@/hooks';
import { IUseShelterSearchParams } from '@/hooks/useShelters/types';
import { Filter } from './components/Filter';

const alertDescription =
  'Você pode consultar a lista de abrigos disponíveis. Ver e editar os itens que necessitam de doações.';

const Home = () => {
  const { data: shelters, loading, search, resetSearch } = useShelters();

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

  const clearSearch = () => {
    setSearchValue('');
    resetSearch();
  };

  const hasMore = useMemo(
    () => shelters.page * shelters.perPage < shelters.count,
    [shelters.page, shelters.perPage, shelters.count]
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
      true
    );
  }, [search, searchValue, shelters.filters, shelters.page, shelters.perPage]);

  const observerTarget = useRef(null);

  useEffect(() => {
    const observerTargetCurrent = observerTarget.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          handleFetchMore();
        }
      },
      { threshold: 1 }
    );

    if (observerTargetCurrent) {
      observer.observe(observerTargetCurrent);
    }

    return () => {
      if (observerTargetCurrent) {
        observer.unobserve(observerTargetCurrent);
      }
    };
  }, [observerTarget, handleFetchMore, hasMore]);

  return (
    <div className="py-12">
      {isModalOpen && (
        <Filter
          handleSearch={handleSearch}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          filters={shelters.filters}
        />
      )}

      <h1 className="text-[#2f2f2f] font-semibold text-2xl mb-4">
        Abrigos disponíveis ({shelters.count})
      </h1>

      <div className="mb-8">
        <Alert
          description={alertDescription}
          startAdornment={
            <CircleAlert size={20} className="stroke-light-yellow" />
          }
        />
      </div>

      <div className="block md:flex mb-6 items-center gap-4">
        <div className="relative flex-1 mb-4 md:mb-0">
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

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex gap-2 items-center [&_svg]:stroke-blue-500 border h-12 flex-1"
            onClick={() => setOpenModal(true)}
          >
            <ListFilter className="h-5 w-5" />
            <h1 className="font-semibold text-[16px] text-blue-500">Filtros</h1>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex gap-2 items-center [&_svg]:stroke-blue-500 border h-12 flex-1"
            onClick={() => clearSearch()}
          >
            <CircleAlert className="h-5 w-5" />
            <h1 className="font-semibold text-[16px] text-blue-500">
              Limpar Filtros
            </h1>
          </Button>
        </div>
      </div>

      {!loading && shelters.results.length !== 0 && (
        <ul className="*:mb-2 *:last:mb-0 mb-6">
          {shelters.results.map((shelter, index) => (
            <li key={index}>
              <ShelterListItem data={shelter} />
            </li>
          ))}
        </ul>
      )}

      {!loading && !hasMore && (searchValue || shelters.filters) && (
        <NoFoundSearch />
      )}

      <div ref={observerTarget}></div>

      {hasMore && loading && (
        <div className="mx-auto w-fit">
          <LoadingIndicator />
        </div>
      )}

      {!loading && !hasMore && shelters.results.length !== 0 && (
        <p className="text-muted-foreground font-semibold text-center">
          Não há mais registros
        </p>
      )}
    </div>
  );
};

export { Home };
