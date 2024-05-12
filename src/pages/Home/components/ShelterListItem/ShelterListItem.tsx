import { useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
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
  const { data, onClick } = props;
  const { capacity, shelteredPeople } = data;
  const navigate = useNavigate();
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
      priority: s.priority,
    };
  }, []);

  return (
    <div className="relative flex flex-col w-full gap-1 p-4 border-2 rounded-md border-border">
      <Button size="sm" variant="ghost" className="absolute top-4 right-4">
        <ChevronRight
          className="w-5 h-5"
          onClick={() => navigate(`/abrigo/${data.id}`)}
        />
      </Button>
      <div
        className="flex items-center gap-1"
        onClick={() => navigate(`/abrigo/${data.id}`)}
      >
        <h3
          className="text-lg font-semibold hover:cursor-pointer hover:text-slate-500"
          onClick={onClick}
        >
          {data.name}
        </h3>
        {data.verified && <VerifiedBadge />}
      </div>
      <h6 className={cn('font-semibold text-md', availabilityClassName)}>
        {availability}
      </h6>
      <h6 className="text-sm font-medium text-muted-foreground md:text-lg">
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
        <small className="mt-2 text-sm font-light md:text-md text-muted-foreground">
          Atualizado em {format(data.updatedAt, 'dd/MM/yyyy HH:mm')}
        </small>
      )}
    </div>
  );
};

export { ShelterListItem };
