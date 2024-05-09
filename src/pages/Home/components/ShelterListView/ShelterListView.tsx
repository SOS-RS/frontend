import React, { Fragment } from 'react';
import { CircleAlert, ListFilter, Loader, Search } from 'lucide-react';

import { Alert, NoFoundSearch, ShelterListItem } from '@/components';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { IShelterListViewProps } from './types';

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
      ...rest
    } = props;

    return (
      <div>
        <h1 className="text-[#2f2f2f] font-semibold text-2xl">
          Abrigos disponíveis ({count})
        </h1>
        <Alert
          description="Você pode consultar a lista de abrigos disponíveis. Ver e editar os itens que necessitam de doações."
          startAdornment={
            <CircleAlert size={20} className="stroke-light-yellow" />
          }
        />
        <div className="relative">
          <Input
            placeholder="Buscar por abrigo ou endereço"
            className="h-12 text-md font-medium text-zinc-600 pl-10 pr-4"
            onChange={(ev) =>
              onSearchValueChange
                ? onSearchValueChange(ev.target.value)
                : undefined
            }
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
        <main
          ref={ref}
          className={cn(className, 'flex flex-col gap-4')}
          {...rest}
        >
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
