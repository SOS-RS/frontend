import { SupplyPriority } from '@/service/supply/types';
import { SupplyRowInfo } from '../SupplyRowInfo';
import { ISupplyRowProps } from './types';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const SupplyRow = (props: ISupplyRowProps) => {
  const { name, items, onClick } = props;

  return (
    <AccordionItem value={name}>
      <AccordionTrigger>
        <h3 className="text-lg font-semibold">{name}</h3>
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
