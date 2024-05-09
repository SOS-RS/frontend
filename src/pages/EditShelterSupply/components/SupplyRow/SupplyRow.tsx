import { SupplyPriority } from '@/service/supply/types';
import { SupplyRowInfo } from '../SupplyRowInfo';
import { ISupplyRowProps } from './types';

const SupplyRow = (props: ISupplyRowProps) => {
  const { name, items, onClick } = props;

  return (
    <div className="gap-4 flex flex-col pb-6">
      <h3 className="font-semibold text-lg">{name}</h3>
      <div className="flex flex-col">
        {items.map((item, idy) => (
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
