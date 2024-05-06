import { CircleStatus } from '@/components';
import { ISupplyRowInfoProps } from './types';
import { useMemo } from 'react';
import { getSupplyPriorityProps } from '@/lib/utils';

const SupplyRowInfo = (props: ISupplyRowInfoProps) => {
  const { name, priority } = props;

  const { className, label } = useMemo(
    () => getSupplyPriorityProps(priority),
    [priority]
  );

  return (
    <div className="flex w-full justify-between content-end border-b-[1px] border-b-border py-4">
      <h2 className="font-medium">{name}</h2>
      <div className="flex justify-end items-center gap-2">
        <CircleStatus className={className} />
        <p className="text-muted-foreground text-nowrap pl-1">{label}</p>
      </div>
    </div>
  );
};

export { SupplyRowInfo };
