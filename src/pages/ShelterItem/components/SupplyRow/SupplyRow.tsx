import { SupplyRowInfo } from '../SupplyRowInfo';
import { ISupplyRowProps } from './types';

const SupplyRow = (props: ISupplyRowProps) => {
  const { name, items } = props;

  return (
    <div className="gap-4 flex flex-col pb-6">
      <h3 className="font-semibold text-lg">{name}</h3>
      <div className="flex flex-col">
        {items.map((v, idy) => (
          <SupplyRowInfo key={idy} name={v.name} priority={v.priority} />
        ))}
      </div>
    </div>
  );
};

export { SupplyRow };
