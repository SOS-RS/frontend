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
import {
  cn, getAvailabilityProps,
  group
} from '@/lib/utils';
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
import { ShelterCategory, ShelterCategoryName } from '@/hooks/useShelter/types';
import { DataTable } from '../../components/ShelterSupplyEditableDataTable/components/data-table';
import { columns } from '../../components/ShelterSupplyEditableDataTable/components/columns';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

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

  const [showEditableTableData, setShowEditableTableData] = useState<boolean>(false)
  const shelterSupplyData = useMemo(() => {
    return shelter?.shelterSupplies ?? [];
  }, [shelter?.shelterSupplies]);

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
      <div className="p-4 flex flex-col max-w-5xl w-full h-full gap-y-4">
        <div className="flex flex-col gap-1">
          <div className="flex gap-1 items-center">
            {ShelterCategoryName[shelter.category]}
            {shelter.verified && <VerifiedBadge />}
          </div>
          <h1 className={cn(availabilityClassName, 'font-semibold')}>
            {availability}
          </h1>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-[#2f2f2f] font-semibold text-2xl">
            {shelter.name}
          </h1>
          <Authenticated
            role="DistributionCenter"
            bypass={shelter.category === ShelterCategory.Shelter}
          >
            <Button
              variant="ghost"
              className="font-medium text-sm text-red-600 flex gap-2 items-center hover:text-red-500 active:text-red-700 hover:bg-transparent"
              onClick={() => navigate(`/abrigo/${shelterId}/atualizar`)}
            >
              Editar
              <Pencil size={17} className="stroke-red-600" />
            </Button>
          </Authenticated>
        </div>
        <div className="">
          <CardAboutShelter shelter={shelter} />
        </div>
        {shelter.updatedAt && (
          <div className="flex justify-between items-center pb-4">
            <small className="text-sm md:text-md font-light text-muted-foreground mt-2">
              Atualizado em {format(shelter.updatedAt, 'dd/MM/yyyy HH:mm')}
            </small>
          </div>
        )}
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-[18px]">Itens do abrigo</h1>
          <div className="flex gap-2 items-center group">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor=""
                  className={cn(showEditableTableData && 'text-red-500')}
                >
                  Editar itens
                </Label>
                <Switch
                  id="editSupplies"
                  className='data-[state=checked]:bg-red-500'
                  checked={showEditableTableData}
                  onCheckedChange={(checked: boolean) => {
                    setShowEditableTableData(checked)
                  }}
                />
              </div>
            </div>
            {/* <Button
                variant="ghost"
              className="font-medium text-[16px] text-gray-400 flex gap-2 items-center group-hover:text-red-500 group-active:text-red-700"
              // onClick={() => navigate(`/abrigo/${shelterId}/items`)}
              onClick={() => setShowEditableTableData(!showEditableTableData)}
            >
              Editar itens
              <Pencil size={17} className="stroke-gray-400 group-hover:stroke-red-500" />
            </Button> */}
          </div>
        </div>
        <div className="flex flex-col gap-8 w-full">
          {!showEditableTableData && shelterCategories.map((categoryProps, idx) => (
            <ShelterCategoryItems
              onSelectTag={handleSelectTag}
              selectedTags={selectedTags}
              key={idx}
              {...categoryProps}
            />
          ))}
          {shelterSupplyData && showEditableTableData &&
            <DataTable data={shelterSupplyData} columns={columns} />
          }
        </div>

       
        <Authenticated role="DistributionCenter">
          <div className="flex w-full p-4">
            <Button
              className="w-full bg-blue-500 active:bg-blue-700 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-900"
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
