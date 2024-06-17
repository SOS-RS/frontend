import { useMemo } from 'react';

import { CircleStatus } from '@/components';
import { ISupplyRowInfoProps } from './types';
import { getSupplyPriorityProps } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const SupplyRowInfo = (props: ISupplyRowInfoProps) => {
  const { name, priority, quantity, onClick } = props;

  const { className, label } = useMemo(
    () => getSupplyPriorityProps(priority),
    [priority],
  );

  return (
    <div
      onClick={onClick}
      className="flex w-full content-end justify-between rounded-sm border-b-[1px] border-b-border px-1 py-4 hover:cursor-pointer hover:bg-slate-50"
    >
      <h2 className="font-medium">{name}</h2>
      <div className="flex items-center justify-end gap-2">
        <CircleStatus className={className} />
        <p className="text-nowrap pl-1 text-muted-foreground">{label}</p>
        {Boolean(quantity) && <Badge variant="secondary">{quantity}</Badge>}
      </div>
    </div>
  );
};

export { SupplyRowInfo };
