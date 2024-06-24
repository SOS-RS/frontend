import React, { Fragment, useState, useEffect } from 'react';
import { CircleAlert, ListFilter, X } from 'lucide-react';

import {
  Alert,
  NoFoundSearch,
  SearchInput,
  ShelterListItem,
} from '@/components';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IShelterListViewProps } from './types';
import { useSearchParams } from 'react-router-dom';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { Badge } from '@/components/ui/badge';
import { FilterKey } from './types';

const ShelterListView = React.forwardRef<HTMLDivElement, IShelterListViewProps>(
  (props, ref) => {
    const {
      count,
      data,
      loading = false,
      searchValue = '',
      hasMoreItems = false,
      onSearchValueChange,
      onCitiesChange,
      onFetchMoreData,
      className = '',
      onOpenModal,
      onClearSearch,
      filterData,
      ...rest
    } = props;

    const [searchParams] = useSearchParams();

    const [filteredData, setFilteredData] = useState(data);
    const [filters, setFilters] = useState({
      isPetFriendlyFiltered: false,
      isAvailableFiltered: false,
      isUnavailableFiltered: false,
      needVolunteers: false,
      isConfirmFiltered: false,
    });

    useEffect(() => {
      applyFilters();
    }, [data, filters]);

    const toggleFilter = (filterName: FilterKey) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterName]: !prevFilters[filterName],
      }));
    };

    const applyFilters = () => {
      let filtered = data;

      if (filters.isPetFriendlyFiltered) {
        filtered = filtered.filter(shelter => shelter.petFriendly === true);
      }

      if (filters.isAvailableFiltered) {
        filtered = filtered.filter(shelter => (shelter.shelteredPeople ?? 0) < (shelter.capacity ?? 0));
      }

      if (filters.needVolunteers) {
        filtered = filtered.filter(shelter => shelter.shelterSupplies.some(supply => supply.tags.includes('NeedVolunteers')));
      }
      
      setFilteredData(filtered);
    };

    return (
      <div className={cn(className, 'flex flex-col gap-2')}>
        <h1 className="text-[#2f2f2f] font-semibold text-2xl">
          {searchParams.toString()
            ? `Abrigos encontrados (${count})`
            : `Total de abrigos  (${count})`
          }
        </h1>
        <Alert
          description="Você pode consultar a lista de abrigos disponíveis. Ver e editar os itens que necessitam de doações."
          startAdornment={
            <CircleAlert size={20} className="stroke-light-yellow" />
          }
        />
        <SearchInput
          value={searchValue}
          onChange={(value) =>
            onSearchValueChange ? onSearchValueChange(value) : undefined
          }
        />
        <div className="flex flex-wrap gap-1 items-center">
          {filterData.cities?.map((item) => (
            <div
              className="flex items-center px-4 py-1 font-normal text-sm md:text-md rounded-3xl bg-gray-300 justify-center cursor-pointer hover:opacity-80 transition-all duration-200"
              key={item}
              onClick={() =>
                onCitiesChange?.(filterData.cities.filter((it) => it !== item))
              }
            >
              <span className="pr-1">{item}</span> <X className="h-4 w-4" />
            </div>
          ))}
        </div>
        <div className="*:h-9 *:py-0.5 flex flex-row cursor-pointer gap-1 *:whitespace-nowrap flex-wrap">
          <Button
            variant="ghost"
            size="sm"
            className="flex gap-2 items-center text-blue-500 hover:text-blue-600 active:text-blue-700"
            onClick={onOpenModal}
            >
            <ListFilter className="h-5 w-5 stroke-blue-500" />
            Filtros
          </Button>
          {searchParams.toString() && (
            <Button
              variant="ghost"
              size="sm"
              className="flex gap-2 items-center text-blue-500 hover:text-blue-600 active:text-blue-700"
              onClick={onClearSearch}
            >
              <CircleAlert className="h-5 w-5 stroke-blue-500" />
              Limpar Filtros
            </Button>
          )}
          <Badge onClick={() => toggleFilter('isPetFriendlyFiltered')} variant={filters.isPetFriendlyFiltered ? 'destructive' : 'outline'}>
            Aceita Pets
          </Badge>
          <Badge onClick={() => toggleFilter('needVolunteers')} variant={filters.needVolunteers ? 'destructive' : 'outline'}>
            Voluntários
          </Badge>
          <Badge onClick={() => toggleFilter('isAvailableFiltered')} variant={filters.isAvailableFiltered ? 'destructive' : 'outline'}>
            Disponível
          </Badge>
        </div>
        <main ref={ref} className="flex flex-col gap-4" {...rest}>
          {loading ? (
            <LoadingSkeleton amountItems={4} />
          ) : filteredData.length === 0 ? (
            <NoFoundSearch />
          ) : (
            <Fragment>
              {filteredData.map((s, idx) => (
                <ShelterListItem key={idx} data={s} />
              ))}
              {hasMoreItems ? (
                <Button
                  className="bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700"
                  size="sm"
                  loading={loading}
                  onClick={onFetchMoreData}
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
    );
  }
);

export { ShelterListView };
