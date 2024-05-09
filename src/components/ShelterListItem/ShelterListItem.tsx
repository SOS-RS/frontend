import { useMemo } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

import { IShelterListItemProps, IShelterAvailabilityProps } from './types';
import { cn, getAvailabilityProps, getSupplyPriorityProps } from '@/lib/utils';
import { Separator } from '../ui/separator';
import { Chip } from '../Chip';
import { Button } from '../ui/button';
import { SupplyPriority } from '@/service/supply/types';
import { VerifiedBadge } from '@/components/VerifiedBadge/VerifiedBadge.tsx';

const ShelterListItem = (props: IShelterListItemProps) => {
  const { data } = props;
  const { capacity, shelteredPeople } = data;
  const navigate = useNavigate();
  const { availability, className: availabilityClassName } =
    useMemo<IShelterAvailabilityProps>(
      () => getAvailabilityProps(capacity, shelteredPeople),
      [capacity, shelteredPeople]
    );

  const tags = useMemo(
    () =>
      data.shelterSupplies
        .filter((s) => s.priority >= SupplyPriority.Needing)
        .sort((a, b) => b.priority - a.priority),
    [data.shelterSupplies]
  );

  return (
    <div
      className="flex flex-col p-4 w-full border-2 border-border rounded-md gap-1 relative"
      onClick={() => navigate(`/abrigo/${data.id}`)}
    >
      <Button size="sm" variant="ghost" className="absolute top-4 right-4">
        <ChevronRight className="h-5 w-5" />
      </Button>
      <div className="flex items-center gap-1">
        <h3 className="font-semibold text-lg  hover:cursor-pointer hover:text-slate-500">
          {data.name}
        </h3>
        {data.verified && <VerifiedBadge />}
      </div>
      <h6 className={cn('font-semibold text-md', availabilityClassName)}>
        {availability}
      </h6>
      <h6 className="text-muted-foreground text-sm md:text-lg font-medium">
        {data.address}
      </h6>
      {data.shelterSupplies.length > 0 && (
        <div className="flex flex-col gap-3">
          <Separator className="mt-2" />
          <p className="text-muted-foreground text-sm md:text-lg font-medium">
            Precisa urgente de doações de:
          </p>
          <div className="flex gap-2 flex-wrap">
            {tags.map((s, idx) => (
              <Chip
                className={getSupplyPriorityProps(s.priority).className}
                key={idx}
                label={s.supply.name}
              />
            ))}
          </div>
        </div>
      )}
      {data.updatedAt && (
        <small className="text-sm md:text-md font-light text-muted-foreground mt-2">
          Atualizado em {format(data.updatedAt, 'dd/MM/yyyy HH:mm')}
        </small>
      )}
    </div>
  );
};

export { ShelterListItem };
