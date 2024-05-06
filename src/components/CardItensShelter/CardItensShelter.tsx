import { useState } from 'react';

import { ICardItensShelter } from './types';
import { Chip } from '../Chip';
import { ChipVariant } from '../Chip/types';
import {
  nameStatusPriority,
  variantStatusPriority,
  colorStatusPriority,
} from '@/lib/utils';
import { CircleStatus } from '../CircleStatus';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const CardItensShelter = (props: ICardItensShelter) => {
  const { shelter, priority } = props;
  const [filterSupplies] = useState(
    shelter.supplies.filter((supply) => supply.priority === priority)
  );
  const [showTopDiv, setShowTopDiv] = useState(true);

  const toggleTopDivVisibility = () => {
    setShowTopDiv(!showTopDiv);
  };

  const cor = colorStatusPriority(priority);
  return (
    <div className="flex pb-8 flex-col gap-2   ">
      <div className="flex gap-2 items-center">
        <CircleStatus className={`bg-[${cor}]`} size={4} />

        <div>
          <h1 className="font-medium">{nameStatusPriority(priority)}</h1>
        </div>
      </div>

      {showTopDiv && (
        <div className="flex gap-2 flex-wrap">
          {filterSupplies.slice(0, 5).map((supply, idx) => (
            <Chip
              variant={variantStatusPriority(priority) as ChipVariant}
              key={idx}
              label={supply.name}
            />
          ))}
        </div>
      )}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger
            onClick={toggleTopDivVisibility}
            className="text-blue-600 font-medium"
          >
            Ver todos
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              {filterSupplies.map((supply, idx) => (
                <Chip
                  variant={variantStatusPriority(priority) as ChipVariant}
                  key={idx}
                  label={supply.name}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export { CardItensShelter };
