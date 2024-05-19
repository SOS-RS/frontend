import { useCallback, useMemo, useState } from 'react';
import { ChevronLeft, Pencil } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';

import {
  Authenticated,
  CardAboutShelter,
  Header,
  LoadingScreen,
} from '@/components';
import { useShelter } from '@/hooks';
import { IShelterAvailabilityProps } from '@/pages/Home/components/ShelterListItem/types';
import { cn, getAvailabilityProps, group } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ShelterCategoryItems } from './components';
import {
  IShelterCategoryItemsProps,
  ITagItem,
} from './components/ShelterCategoryItems/types';
import { SupplyPriority } from '@/service/supply/types';
import { VerifiedBadge } from '@/components/VerifiedBadge/VerifiedBadge.tsx';
import { ShelterSupplyServices } from '@/service';
import { useToast } from '@/components/ui/use-toast';
import { clearCache } from '@/api/cache';
import { ShelterCategory } from '@/hooks/useShelter/types';

const Shelter = () => {
  const params = useParams();
  const { shelterId = '-1' } = params;
  const navigate = useNavigate();
  const { data: shelter, loading, refresh } = useShelter(shelterId);
  const [selectedTags, setSelectedTags] = useState<ITagItem[]>([]);
  const shelterCategories: IShelterCategoryItemsProps[] = useMemo(() => {
    const grouped = group(shelter?.shelterSupplies ?? [], 'priority');
    delete grouped[SupplyPriority.NotNeeded];

    return Object.entries(grouped)
      .sort(([a], [b]) => (+a > +b ? -1 : 1))
      .map(([key, values]) => ({
        priority: +key,
        tags: values.map((v) => ({
          label: v.supply.name,
          value: v.supply.id,
          quantity: v.quantity,
        })),
      }));
  }, [shelter?.shelterSupplies]);
  const { availability, className: availabilityClassName } =
    useMemo<IShelterAvailabilityProps>(
      () =>
        getAvailabilityProps({
          capacity: shelter?.capacity,
          shelteredPeople: shelter?.shelteredPeople,
          category: shelter?.category,
        }),
      [shelter?.capacity, shelter?.shelteredPeople, shelter?.category]
    );
  const [loadingUpdateMany, setLoadingUpdateMany] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSelectTag = useCallback((v: ITagItem) => {
    setSelectedTags((prev) =>
      prev.includes(v) ? prev.filter((p) => p.value !== v.value) : [...prev, v]
    );
  }, []);

  const handleUpdateMany = useCallback(() => {
    setLoadingUpdateMany(true);
    ShelterSupplyServices.updateMany(
      shelterId,
      selectedTags.map((s) => s.value)
    )
      .then(() => {
        toast({
          title: 'Atualizado com sucesso',
        });
        clearCache(false);
        refresh();
        setSelectedTags([]);
      })
      .catch((err) => {
        toast({
          title: 'Erro ao atualizar',
          description: `${err?.response?.data?.message ?? err?.message ?? err}`,
        });
      })
      .finally(() => {
        setLoadingUpdateMany(false);
      });
  }, [refresh, selectedTags, shelterId, toast]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="flex h-screen flex-col items-center">
      <Header
        title={shelter.name}
        startAdornment={
          <Button
            size="sm"
            variant="ghost"
            className="hover:bg-red-400 disabled:bg-red-500 [&_svg]:stroke-white"
            onClick={() => navigate('/')}
          >
            <ChevronLeft size={20} />
          </Button>
        }
      />
      <div className="flex size-full max-w-5xl flex-col p-4 ">
        <div className="flex items-center gap-1">
          <h1 className="text-2xl font-semibold text-[#2f2f2f]">
            {shelter.name}
          </h1>
          {shelter.verified && <VerifiedBadge />}
        </div>
        <div className="flex items-center justify-between pr-4">
          <h1 className={cn(availabilityClassName, 'font-semibold')}>
            {availability}
          </h1>
          <Authenticated
            role="DistributionCenter"
            bypass={shelter.category === ShelterCategory.Shelter}
          >
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-[16px] font-medium text-blue-600 hover:text-blue-500 active:text-blue-700"
              onClick={() => navigate(`/abrigo/${shelterId}/atualizar`)}
            >
              Editar
              <Pencil size={17} className="stroke-blue-600" />
            </Button>
          </Authenticated>
        </div>
        <div className="p-4">
          <CardAboutShelter shelter={shelter} />
        </div>
        <div className="flex items-center justify-between p-4">
          <h1 className="text-[18px] font-semibold">Itens do abrigo</h1>
          <div className="flex items-center gap-2 ">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-[16px] font-medium text-blue-600 hover:text-blue-500 active:text-blue-700"
              onClick={() => navigate(`/abrigo/${shelterId}/items`)}
            >
              Editar itens
              <Pencil size={17} className="stroke-blue-600" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-8 p-4 ">
          {shelterCategories.map((categoryProps, idx) => (
            <ShelterCategoryItems
              onSelectTag={handleSelectTag}
              selectedTags={selectedTags}
              key={idx}
              {...categoryProps}
            />
          ))}
        </div>
        {shelter.updatedAt && (
          <div className="flex items-center justify-between p-4">
            <small className="md:text-md mt-2 text-sm font-light text-muted-foreground">
              Atualizado em {format(shelter.updatedAt, 'dd/MM/yyyy HH:mm')}
            </small>
          </div>
        )}
        <Authenticated role="DistributionCenter">
          <div className="flex w-full p-4">
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-900"
              size="sm"
              disabled={loadingUpdateMany || selectedTags.length === 0}
              loading={loadingUpdateMany}
              onClick={handleUpdateMany}
            >
              Atender pedido
            </Button>
          </div>
        </Authenticated>
      </div>
    </div>
  );
};

export { Shelter };
