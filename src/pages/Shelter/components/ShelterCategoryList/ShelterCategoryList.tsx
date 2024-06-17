import { useContext, useMemo } from 'react';
import clsx from 'clsx';

import { SupplyMeasureMap, cn, getSupplyPriorityProps } from '@/lib/utils';
import { ShelterCategoryListProps } from './types';
import { CircleStatus } from '@/components';
import { SupplyPriority } from '@/service/supply/types';
import { DonationCartContext } from '@/contexts';
import { IDonationCartItem } from '@/contexts/DonationCartContext/types';

const ShelterCategoryList = (props: ShelterCategoryListProps) => {
  const { items, name, onDonate, shelterId } = props;
  const { carts } = useContext(DonationCartContext);
  const cart: IDonationCartItem[] = useMemo(
    () => carts[shelterId] ?? [],
    [carts, shelterId],
  );

  return (
    <div className="flex w-full flex-col gap-4">
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
                className="flex items-center justify-between gap-2 p-1 hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <CircleStatus className={cn('rounded-full', className)} />
                  <span className="font-semibold">{item.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  {item.quantity && (
                    <span className="font-semibold text-muted-foreground">{`${
                      item.quantity
                    } ${SupplyMeasureMap[item.measure]}`}</span>
                  )}
                  <button
                    type="button"
                    onClick={() => onDonate(item)}
                    disabled={cart.some((c) => c.id === item.id)}
                    className={clsx(
                      'rounded-md px-4 py-1 font-semibold text-red-600 hover:bg-red-50 active:bg-red-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-300 disabled:hover:bg-gray-50 disabled:active:bg-gray-100',
                      {
                        invisible: item.priority === SupplyPriority.Remaining,
                      },
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
