import { Input } from '@/components/ui/input';
import { IUseSuppliesData } from '@/hooks/useSupplies/types';
import { Search, PlusCircle, X } from 'lucide-react';
import { useState } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { ISupplySearchProps } from './types';

export const SupplySearch = ({
  supplyItems,
  limit = 10,
  onSearch,
  onSelectItem,
  onAddNewItem,
}: ISupplySearchProps) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<IUseSuppliesData | null>(
    null,
  );

  function onChangeInputHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
    onSearch(event.target.value);
  }

  function onSelectItemHandler(item: IUseSuppliesData) {
    setSearchValue(item.name);
    setSelectedItem(item);
    onSelectItem(item);
  }

  function onAddNewItemHandler() {
    setSelectedItem(null);
    onAddNewItem();
  }

  function onClearClickHandler() {
    setSelectedItem(null);
    setSearchValue('');
    onSearch('');
  }

  return (
    <Fragment>
      <div
        className="flex h-10 items-center rounded-md border border-input px-3"
        cmdk-input-wrapper=""
      >
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <Input
          type="text"
          className="h-8 border-none outline-none focus-visible:ring-transparent"
          placeholder="Buscar itens..."
          value={searchValue}
          onChange={onChangeInputHandler}
        />
        <X
          className="ml-2 h-4 w-4 hover:cursor-pointer"
          onClick={onClearClickHandler}
        />
      </div>

      {!!searchValue && !selectedItem ? (
        <div className="mt-1 flex-col items-center rounded-md border border-input bg-slate-50 p-3">
          {supplyItems
            .sort((a, b) => a.name.length - b.name.length)
            .slice(0, limit)
            .map((item) => (
              <div
                key={item.id}
                className="flex h-10 items-center rounded-md p-2 hover:cursor-pointer hover:bg-slate-100"
                onClick={() => onSelectItemHandler(item)}
              >
                <span className="text-sm">{item.name}</span>
              </div>
            ))}
          <div
            className="flex h-10 items-center rounded-md p-2 hover:cursor-pointer hover:bg-slate-100"
            onClick={onAddNewItemHandler}
          >
            <div className="flex items-center gap-2">
              <PlusCircle size={16} color="#0284c7" />
              <span className="text-sm text-sky-600">Cadastrar novo item</span>
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};
