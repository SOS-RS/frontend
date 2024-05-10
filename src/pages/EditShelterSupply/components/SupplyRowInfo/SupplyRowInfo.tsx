import { useMemo } from 'react';

import { CircleStatus } from '@/components';
import { ISupplyRowInfoProps } from './types';
import { getSupplyPriorityProps } from '@/lib/utils';

const SupplyRowInfo = (props: ISupplyRowInfoProps) => {
  const { name, priority, onClick } = props;

  const { className, label } = useMemo(
    () => getSupplyPriorityProps(priority),
    [priority]
  );

  return (
    <div
      onClick={onClick}
      className="flex w-full justify-between content-end border-b-[1px] border-b-border [&:last-of-type]:border-none py-4 hover:cursor-pointer hover:bg-slate-50 px-1 rounded-sm"
    >
      <h2 className="font-medium">{name}</h2>
      <div className="flex items-center justify-end gap-2">
        <CircleStatus className={className} />
        <p className="pl-1 text-muted-foreground text-nowrap">{label}</p>
      </div>
    </div>
  );
};

export { SupplyRowInfo };
