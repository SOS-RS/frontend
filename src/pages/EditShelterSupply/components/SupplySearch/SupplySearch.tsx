import { Input } from '@/components/ui/input';
import { IUseSuppliesData } from '@/hooks/useSupplies/types';
import { Search, PlusCircle, X } from 'lucide-react';
import { useState } from 'react';
import { Fragment } from 'react/jsx-runtime';
import {ISupplySearchProps} from './types';

export const SupplySearch = ({
  supplyItems,
  limit = 10,
  onSearch,
  onSelectItem,
  onAddNewItem
}: ISupplySearchProps) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<IUseSuppliesData | null>(null);

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
        className="flex items-center rounded-md border border-input px-3 h-10"
        cmdk-input-wrapper=""
      >
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <Input
          type="text"
          className="outline-none border-none focus-visible:ring-transparent h-8"
          placeholder="Buscar itens..."
          value={searchValue}
          onChange={onChangeInputHandler}
        />
        <X className="h-4 w-4 ml-2 hover:cursor-pointer" onClick={onClearClickHandler} />
      </div>

      {!!searchValue && !selectedItem ? (
        <div className="flex-col items-center rounded-md border border-input p-3 bg-slate-50 mt-1">
          {supplyItems.slice(0, limit).map((item) => (
            <div
              key={item.id}
              className="h-10 flex items-center rounded-md p-2 hover:bg-slate-100 hover:cursor-pointer"
              onClick={() => onSelectItemHandler(item)}
            >
              <span className="text-sm">{item.name}</span>
            </div>
          ))}
          <div 
            className="h-10 flex items-center rounded-md p-2 hover:bg-slate-100 hover:cursor-pointer"
            onClick={onAddNewItemHandler}
          >
            <div className="flex gap-2 items-center">
              <PlusCircle size={16} color="#0284c7" />
              <span className="text-sm text-sky-600">Cadastrar novo item</span>
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};
