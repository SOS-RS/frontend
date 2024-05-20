import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IUseSuppliesData } from '@/hooks/useSupplies/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Search } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';

interface ISupplySearchProps {
  supplyItems: IUseSuppliesData[];
  limit?: number;
  onSearch: (value: string) => void;
  onSelectItem: (item: IUseSuppliesData) => void;
}

export const SupplySearch = ({
  supplyItems,
  limit = 10,
  onSearch,
  onSelectItem,
}: ISupplySearchProps) => {
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
          onChange={(ev) => onSearch(ev.target.value)}
        />
      </div>

      {supplyItems.length > 0 ? (
        <div className="flex-col items-center rounded-md border border-input p-3 bg-slate-50">
          {supplyItems.slice(0, limit).map((item) => (
            <div
              key={item.id}
              className="h-10 flex items-center rounded-md p-2 hover:bg-slate-100 hover:cursor-pointer"
              onClick={() => onSelectItem(item)}
            >
              <span className="text-sm">{item.name}</span>
            </div>
          ))}
          <div className="h-10 flex items-center rounded-md p-2 hover:bg-slate-100 hover:cursor-pointer">
            <span className="text-sm text-sky-600">Cadastrar novo item</span>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};
