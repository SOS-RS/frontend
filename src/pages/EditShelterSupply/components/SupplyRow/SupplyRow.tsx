import { SupplyPriority } from '@/service/supply/types';
import { SupplyRowInfo } from '../SupplyRowInfo';
import { ISupplyRowProps } from './types';

const SupplyRow = (props: ISupplyRowProps) => {
  const { name, items, onClick } = props;

  return (
    <div className="flex flex-col gap-4 pb-6">
      <h3 className="text-lg font-semibold">{name}</h3>
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
