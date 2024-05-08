import { Fragment } from 'react';
import { Loader, Search } from 'lucide-react';

import { NoFoundSearch, ShelterListItem } from '@/components';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IShelterListViewProps } from './types';
import React from 'react';
import { cn } from '@/lib/utils';

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
      className,
      ...rest
    } = props;

    return (
      <div
        ref={ref}
        className={cn('flex w-full flex-col-reverse md:flex-row', className)}
        {...rest}
      >
        <div className="flex-1 flex flex-col max-h-[40vh] md:max-h-[85vh] overflow-y-auto min-w-96 w-full md:max-w-md rounded-tr-3xl rounded-tl-3xl md:rounded-lg pb-2 pt-4 px-4 md:pt-4 md:pb-4 gap-4 z-10 bg-card shadow-md">
          <h1 className="text-[#2f2f2f] font-semibold text-lg md:text-2xl">
            Abrigos disponíveis ({count})
          </h1>
          <main className="flex w-full overflow-y-auto flex-col gap-4">
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
                    className="bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700 py-2"
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
        <div className="hidden w-full px-4 md:max-w-4xl shadow-sm mx-auto z-10">
          <div className="relative">
            <Input
              placeholder="Buscar por abrigo ou endereço"
              className="h-12 text-md font-medium text-zinc-600 pl-10 pr-4"
              onChange={(ev) =>
                onSearchValueChange
                  ? onSearchValueChange(ev.target.value ?? '')
                  : undefined
              }
              value={searchValue}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search name="search" size="20" className="stroke-zinc-300" />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export { ShelterListView };
