import React, { Fragment } from 'react';
import { CircleAlert, ListFilter, Loader } from 'lucide-react';

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

const ShelterListView = React.forwardRef<HTMLDivElement, IShelterListViewProps>(
  (props, ref) => {
    const {
      count,
      data,
      loading = false,
      searchValue = '',
      hasMoreItems = false,
      onSearchValueChange,
      onFetchMoreData,
      onSelectShelter,
      className = '',
      onOpenModal,
      onClearSearch,
      ...rest
    } = props;

    const [searchParams] = useSearchParams();

    return (
      <div className={cn(className, 'flex flex-col gap-2 mt-20 mb-8')}>
        <h1 className="text-[#2f2f2f] font-semibold text-2xl pb-4">
          Abrigos disponíveis ({count})
        </h1>
        <Alert
          description="Você pode consultar a lista de abrigos disponíveis. Ver e editar os itens que necessitam de doações."
          startAdornment={
            <CircleAlert size={20} className="stroke-light-yellow" />
          }
        />
        <SearchInput
          value={searchValue}
          onChange={(ev) =>
            onSearchValueChange
              ? onSearchValueChange(ev.target.value ?? '')
              : undefined
          }
        />
        <div className="flex flex-row gap-2 py-3">
          <Button
            variant="ghost"
            size="sm"
            className="group flex gap-2 items-center bg-btn-base hover:btn-hover hover:text-black active:btn-hover border-[1px] border-input"
            onClick={onOpenModal}
          >
            <ListFilter className="h-5 w-5" />
            Filtros
          </Button>
          {searchParams.toString() && (
            <Button
              variant="ghost"
              size="sm"
              className="group flex gap-2 items-center bg-btn-base hover:btn-hover hover:text-black active:btn-hover border-[1px] border-input"
              onClick={onClearSearch}
            >
              <CircleAlert className="h-5 w-5" />
              Limpar Filtros
            </Button>
          )}
        </div>
        <main ref={ref} className="flex flex-col gap-4" {...rest}>
          {loading ? (
            <Loader className="justify-self-center self-center w-5 h-5 animate-spin" />
          ) : data.length === 0 ? (
            <NoFoundSearch />
          ) : (
            <Fragment>
              {data.map((s, idx) => (
                <ShelterListItem
                  key={idx}
                  data={s}
                  onClick={() =>
                    onSelectShelter ? onSelectShelter(s) : undefined
                  }
                />
              ))}
              {hasMoreItems ? (
                <Button
                  className="bg-primary-green hover:bg-light-green text-white font-medium text-xs md:text-base py-2 px-1 md:py-2 md:px-4 rounded-full gap-2"
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
