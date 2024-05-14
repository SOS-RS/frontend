import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SupplyPriority } from '@/service/supply/types';
import { SupplyRowInfo } from '../SupplyRowInfo';
import { ISupplyRowProps } from './types';

const SupplyRow = (props: ISupplyRowProps) => {
  const { name, items, filtered, onClick } = props;
  const [opened, setOpened] = useState<boolean>(false);
  const maxVisibleTags: number = 0;
  const visibleSupplies = useMemo(
    () => (opened || filtered ? items : items.slice(0, maxVisibleTags)),
    [opened, items]
  );

  const Icon = opened || filtered ? ChevronUp : ChevronDown;

  return (
    <div className="gap-4 flex flex-col pb-6">
      <div onClick={() => setOpened((v) => !v)}
      className="flex w-full justify-between content-end border-b-[1px] border-b-border py-4 hover:cursor-pointer hover:bg-slate-50 px-1 rounded-sm"
    >
      <h3 className="font-semibold text-lg">{name}</h3>
      <div className="flex justify-end items-center gap-2">
        <Icon className="h-5 w-5 stroke-blue-500" />
      </div>
    </div>
      <div className="flex flex-col">
        { visibleSupplies.map((item, idy) => (
          <SupplyRowInfo
            key={idy}
            name={item.name}
            priority={item.priority ?? SupplyPriority.NotNeeded}
            onClick={() => (onClick ? onClick(item) : undefined)}
          />
        ))}
      </div>
    </div>
  );
};

export { SupplyRow };
