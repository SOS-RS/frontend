import { useMemo } from 'react';
import { ChevronLeft, Pencil } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  CardAboutShelter,
  CardItensShelter,
  Header,
  LoadingScreen,
} from '@/components';
import { useShelter } from '@/hooks';
import { IShelterAvailabilityProps } from '@/components/ShelterListItem/types';
import { cn, getAvailabilityProps } from '@/lib/utils';
import { SupplyPriority } from '@/services/supply/types';
import { Button } from '@/components/ui/button';

const Shelter = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const { data: shelter, loading } = useShelter(id ?? '-1');

  const { availability, className: availabilityClassName } =
    useMemo<IShelterAvailabilityProps>(
      () => getAvailabilityProps(shelter?.capacity, shelter?.shelteredPeople),
      [shelter?.capacity, shelter?.shelteredPeople]
    );

  if (loading) return <LoadingScreen />;

  return (
    <div className="flex flex-col h-screen items-center">
      <Header
        title={shelter.name}
        startAdornment={
          <Button
            size="sm"
            variant="ghost"
            className="[&_svg]:stroke-white disabled:bg-red-500 hover:bg-red-400"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={20} />
          </Button>
        }
      />
      <div className="p-4 flex flex-col max-w-5xl w-full">
        <h1 className="text-[#2f2f2f] font-semibold text-2xl">
          {shelter.name}
        </h1>
        <h1 className={cn(availabilityClassName, 'font-semibold')}>
          {availability}
        </h1>
        <div className="p-4">
          <CardAboutShelter shelter={shelter} />
        </div>
        <div className="flex justify-between p-4 items-center">
          <h1 className="font-semibold text-[18px]">Itens do abrigo</h1>
          <div className="flex gap-2 items-center ">
            <h1 className="font-medium text-[16px] text-[#1D61C8]">
              Editar itens
            </h1>
            <Pencil size={17} />
          </div>
        </div>
        <div className="flex flex-col gap-8 p-4 ">
          <CardItensShelter
            priority={SupplyPriority.Needing}
            shelter={shelter}
          />
          <CardItensShelter
            priority={SupplyPriority.Urgent}
            shelter={shelter}
          />
          <CardItensShelter
            priority={SupplyPriority.UnderControl}
            shelter={shelter}
          />
          <CardItensShelter
            priority={SupplyPriority.Remaining}
            shelter={shelter}
          />
        </div>
      </div>
    </div>
  );
};

export { Shelter };
