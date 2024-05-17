import { SupplyPriority } from '@/service/supply/types';
import { SupplyRowInfo } from '../SupplyRowInfo';
import { ISupplyRowProps } from './types';

const SupplyRow = (props: ISupplyRowProps) => {
  const { items, onClick } = props;

  return (
    <div className="gap-4 flex flex-col pb-6">
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
