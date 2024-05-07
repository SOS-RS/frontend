import { useMemo } from 'react';
import { ChevronLeft, Pencil } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { CardAboutShelter, Header, LoadingScreen } from '@/components';
import { useShelter } from '@/hooks';
import { IShelterAvailabilityProps } from '@/components/ShelterListItem/types';
import { cn, getAvailabilityProps, group } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ShelterCategoryItems } from './components';
import { IShelterCategoryItemsProps } from './components/ShelterCategoryItems/types';
import { SupplyPriority } from '@/service/supply/types';

const Shelter = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const { data: shelter, loading } = useShelter(id ?? '-1');

  const shelterCategories: IShelterCategoryItemsProps[] = useMemo(() => {
    const grouped = group(shelter?.supplies ?? [], 'priority');
    delete grouped[SupplyPriority.UnderControl];
    return Object.entries(grouped)
      .sort(([a], [b]) => (+a > +b ? -1 : 1))
      .map(([key, values]) => ({
        priority: +key,
        tags: values.map((v) => v.name),
      }));
  }, [shelter.supplies]);

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
            onClick={() => navigate('/')}
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
          <div className="flex gap-2 items-center [&_svg]:stroke-blue-600">
            <Button
              variant="ghost"
              className="font-medium text-[16px] text-blue-600 flex gap-2 items-center hover:text-blue-500 active:text-blue-700"
              onClick={() => navigate(`/abrigo/${id}/items`)}
            >
              Editar itens
              <Pencil size={17} />
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-8 p-4 ">
          {shelterCategories.map((categoryProps, idx) => (
            <ShelterCategoryItems key={idx} {...categoryProps} />
          ))}
        </div>
      </div>
    </div>
  );
};

export { Shelter };
