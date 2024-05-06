import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { ICardItensShelter } from './types';
import { Chip } from '../Chip';
import { ChipVariant } from '../Chip/types';
import { nameStatusPriority, variantStatusPriority } from '@/lib/utils';

const CardItensShelter = (props: ICardItensShelter) => {
  const { shelter, priority } = props;
  const [filterSupplies] = useState(
    shelter.supplies.filter((supply) => supply.priority === priority)
  );
  console.log(shelter);

  return (
    <div className="flex pb-8 flex-col gap-2  border-b-2 border-b-slate-100 ">
      <div className="flex gap-2 items-center">
        <div
          className={`w-4 h-4 bg-red-400 rounded-lg flex items-center justify-center`}
        />

        <div>
          <h1 className="font-medium">{nameStatusPriority(priority)}</h1>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {filterSupplies.map((supply, idx) => (
          <Chip
            variant={variantStatusPriority(priority) as ChipVariant}
            key={idx}
            label={supply.name}
          />
        ))}
      </div>
      <div className="text-[#1D61C8] flex gap-2 cursor-pointer">
        <h1 className=" font-medium">Ver todos</h1>
        <ChevronDown />
      </div>
    </div>
  );
};

export { CardItensShelter };
