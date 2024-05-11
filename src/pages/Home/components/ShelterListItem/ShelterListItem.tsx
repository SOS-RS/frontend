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
    };
  }, []);

  return (
    <div className="flex flex-col p-4 w-full border-2 border-border rounded-md gap-1 relative">
      <Button size="sm" variant="ghost" className="absolute top-4 right-4">
        <ChevronRight
          className="h-5 w-5"
          onClick={() => navigate(`/abrigo/${data.id}`)}
        />
      </Button>
      <div
        className="flex items-center gap-1"
        onClick={() => navigate(`/abrigo/${data.id}`)}
      >
        <h3
          className="font-semibold text-lg  hover:cursor-pointer hover:text-slate-500"
          onClick={onClick}
        >
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
  );
};

export { ShelterListItem };
