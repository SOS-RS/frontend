import { SupplyPriority } from '@/service/supply/types';
import { SupplyRowInfo } from '../SupplyRowInfo';
import { ISupplyRowProps } from './types';
import { Archive } from 'lucide-react';

const SupplyRow = (props: ISupplyRowProps) => {
  const { name, items, onClick } = props;

  return (
    <div className={`${name !== '' ? 'flex flex-col gap-4 pb-6' : 'hidden'}`}>
      <div className="flex w-full">
        <h3 className="flex items-center rounded border p-2 text-lg font-semibold">
          <Archive className="mr-2 size-5" />
          {name.toUpperCase()}
        </h3>
      </div>
      <div className="flex flex-col">
        {items.map((item, idy) => (
          <SupplyRowInfo
            key={idy}
            name={item.name}
            quantity={item.quantity}
            priority={item.priority ?? SupplyPriority.NotNeeded}
            onClick={() => (onClick ? onClick(item) : undefined)}
          />
        ))}
      </div>
    </div>
  );
};

export { SupplyRow };
