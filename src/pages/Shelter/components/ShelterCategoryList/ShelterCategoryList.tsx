import clsx from 'clsx';

import { SupplyMeasureMap, cn, getSupplyPriorityProps } from '@/lib/utils';
import { ShelterCategoryListProps } from './types';
import { CircleStatus } from '@/components';
import { SupplyPriority } from '@/service/supply/types';

const ShelterCategoryList = (props: ShelterCategoryListProps) => {
  const { items, name, onDonate } = props;

  return (
    <div className="flex flex-col gap-4 w-full">
      <h6 className="font-medium">
        {name} ({items.length} items)
      </h6>
      <div className="flex flex-col">
        {items
          .sort((a, b) => b.priority - a.priority)
          .map((item) => {
            const { className } = getSupplyPriorityProps(item.priority);
            return (
              <div
                key={item.id}
                className="flex gap-2 items-center justify-between p-1 hover:bg-gray-50"
              >
                <div className="flex gap-2 items-center">
                  <CircleStatus className={cn('rounded-full', className)} />
                  <span className="font-semibold">{item.name}</span>
                </div>
                <div className="flex gap-4 items-center">
                  {item.quantity && (
                    <span className="font-semibold text-muted-foreground">{`${
                      item.quantity
                    } ${SupplyMeasureMap[item.measure]}`}</span>
                  )}
                  <button
                    type="button"
                    onClick={() => onDonate(item)}
                    className={clsx(
                      'text-red-600 font-semibold hover:bg-red-50 active:bg-red-100 px-4 py-1 rounded-md',
                      {
                        invisible: item.priority === SupplyPriority.Remaining,
                      }
                    )}
                  >
                    doar
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export { ShelterCategoryList };
