import { useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

import {
  IShelterListItemProps,
  IShelterAvailabilityProps,
  ShelterTagInfo,
} from './types';
import {
  cn,
  getAvailabilityProps,
  getSupplyPriorityProps,
  groupShelterSuppliesByTag,
} from '@/lib/utils';
import { Button } from '../../../../components/ui/button';
import { VerifiedBadge } from '@/components/VerifiedBadge/VerifiedBadge.tsx';
import { IUseSheltersDataSupplyData } from '@/hooks/useShelters/types';
import { ShelterSupplyCategoryRow } from '../ShelterSupplyCategoryRow';

const ShelterListItem = (props: IShelterListItemProps) => {
  const { data } = props;
  const { capacity, shelteredPeople } = data;
  const { availability, className: availabilityClassName } =
    useMemo<IShelterAvailabilityProps>(
      () => getAvailabilityProps(capacity, shelteredPeople),
      [capacity, shelteredPeople]
    );

  const tags: ShelterTagInfo<IUseSheltersDataSupplyData[]> = useMemo(() => {
    return groupShelterSuppliesByTag(data.shelterSupplies);
  }, [data.shelterSupplies]);

  const getChipProps = useCallback((s: IUseSheltersDataSupplyData) => {
    const { className } = getSupplyPriorityProps(s.priority);
    return {
      label: s.supply.name,
      className,
    };
  }, []);

  return (
    <Link to={`/abrigo/${data.id}`} target="_blank">
      <div className="flex flex-col p-4 w-full border-2 border-border rounded-md gap-1 relative hover:bg-accent">
        <div className="inline-flex justify-between">
          <div className="flex flex-row items-center gap-1">
            <h3 className="font-semibold text-lg h-full hover:cursor-pointer hover:text-slate-500">
              {data.name}
            </h3>
            {data.verified && (
              <div className="h-full pt-1">
                <VerifiedBadge />
              </div>
            )}
          </div>
          <Button size="sm" variant="ghost">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        <h6 className={cn('font-semibold text-md', availabilityClassName)}>
          {availability}
        </h6>
        <h6 className="text-muted-foreground text-sm md:text-lg font-medium">
          {data.address}
        </h6>
        {data.shelterSupplies.length > 0 && (
          <>
            <ShelterSupplyCategoryRow
              title="Necessita voluntários:"
              tags={tags.NeedVolunteers.map(getChipProps)}
            />
            <ShelterSupplyCategoryRow
              title="Necessita urgente doações de:"
              tags={tags.NeedDonations.map(getChipProps)}
            />
            <ShelterSupplyCategoryRow
              title="Sobrando para doações:"
              tags={tags.RemainingSupplies.map(getChipProps)}
            />
          </>
        )}
        {data.updatedAt && (
          <small className="text-sm md:text-md font-light text-muted-foreground mt-2">
            Atualizado em {format(data.updatedAt, 'dd/MM/yyyy HH:mm')}
          </small>
        )}
      </div>
    </Link>
  );
};

export { ShelterListItem };
