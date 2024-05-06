import { Fragment, useMemo } from 'react';
import { format } from 'date-fns';

import { IShelterListItemProps, IShelterAvailabilityProps } from './types';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';
import { Chip } from '../Chip';

const ShelterListItem = (props: IShelterListItemProps) => {
  const { data } = props;
  const { capacity, shelteredPeople } = data;

  const { availability, className: availabilityClassName } =
    useMemo<IShelterAvailabilityProps>(() => {
      if (capacity && shelteredPeople) {
        if (shelteredPeople < capacity)
          return {
            availability: 'Abrigo disponível',
            className: 'text-green-400',
          };
        else
          return {
            availability: 'Abrigo indisponível',
            className: 'text-red-400',
          };
      } else
        return {
          availability: 'Consultar disponibilidade',
          className: 'text-blue-400',
        };
    }, [capacity, shelteredPeople]);

  return (
    <div className="flex flex-col p-4 w-full border-2 border-border rounded-md gap-1">
      <h3 className="font-semibold text-lg">{data.name}</h3>
      <h6 className={cn('font-semibold text-md', availabilityClassName)}>
        {availability}
      </h6>
      <h6 className="text-muted-foreground text-sm md:text-lg font-medium">
        {data.address}
      </h6>
      {data.supplies.length > 0 && (
        <div className="flex flex-col gap-3">
          <Separator className="mt-2" />
          <p className="text-muted-foreground text-sm md:text-lg font-medium">
            Necessita urgente de doações de
          </p>
          <div className="flex gap-2 flex-wrap">
            {data.supplies.map((s, idx) => (
              <Chip variant="danger" key={idx} label={s.name} />
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
