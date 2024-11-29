import { SupplyPriority } from '@/service/supply/types';
import { SupplyRowInfo } from '../SupplyRowInfo';
import { ISupplyRowProps } from './types';
import { Archive } from 'lucide-react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const SupplyRow = (props: ISupplyRowProps) => {
  const { name, items, onClick } = props;

  return (
    <AccordionItem
      value={name}
      className={`${name !== '' ? 'gap-4 flex flex-col' : 'hidden'}`}
    >
      <AccordionTrigger className="">
        <h3 className="flex items-center flex-1 gap-2 text-lg font-semibold">
          <Archive size={20} />
          <span className="flex-1 text-left">{name.toUpperCase()}</span>
        </h3>
      </AccordionTrigger>
      <AccordionContent className="flex flex-col">
        {items.map((item, idy) => (
          <SupplyRowInfo
            key={idy}
            name={item.name}
            quantity={item.quantity}
            priority={item.priority ?? SupplyPriority.NotNeeded}
            onClick={() => (onClick ? onClick(item) : undefined)}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export { SupplyRow };
