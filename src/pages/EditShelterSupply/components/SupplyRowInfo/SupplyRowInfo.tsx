import { useMemo } from 'react';

import { CircleStatus } from '@/components';
import { ISupplyRowInfoProps } from './types';
import { getSupplyPriorityProps } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const SupplyRowInfo = (props: ISupplyRowInfoProps) => {
  const { name, priority, quantity, onClick } = props;

  const { className, label } = useMemo(
    () => getSupplyPriorityProps(priority),
    [priority]
  );

  return (
    <div
      onClick={onClick}
      className="flex w-full justify-between content-end border-b-[1px] border-b-border py-4 hover:cursor-pointer hover:bg-slate-50 px-1 rounded-sm"
    >
      <h2 className="font-medium">{name}</h2>
      <div className="flex justify-end items-center gap-2">
        <CircleStatus className={className} />
        <p className="text-muted-foreground text-nowrap pl-1">{label}</p>
        {Boolean(quantity) && <Badge className="bg-gray-700">{quantity}</Badge>}
      </div>
    </div>
  );
};

export { SupplyRowInfo };
