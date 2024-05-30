import { Fragment, useCallback, useContext, useMemo, useState } from 'react';
import { ChevronLeft, Pencil } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Authenticated,
  CardAboutShelter,
  Chip,
  DonationCart,
  DonationCartIcon,
  Header,
  LoadingScreen,
  SearchInput,
} from '@/components';
import { useShelter } from '@/hooks';
import {
  cn,
  getAvailabilityProps,
  getSupplyPriorityProps,
  group,
  normalizedCompare,
} from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { VerifiedBadge } from '@/components/VerifiedBadge/VerifiedBadge.tsx';
import {
  IUseShelterDataSupply,
  ShelterCategory,
} from '@/hooks/useShelter/types';
import { IShelterAvailabilityProps } from '../Home/components/ShelterListItem/types';
import { SupplyPriority } from '@/service/supply/types';
import { ShelterCategoryList } from './components';
import { Separator } from '@/components/ui/separator';
import { DonationCartContext } from '@/contexts';
import { ShelterCategoryListItemProps } from './components/ShelterCategoryList/types';

const defaultPriorities: SupplyPriority[] = [
  SupplyPriority.Urgent,
  SupplyPriority.Needing,
  SupplyPriority.Remaining,
];

const Shelter = () => {
  const params = useParams();
  const { shelterId = '-1' } = params;
  const navigate = useNavigate();
  const { toggleOpened, addItem, opened, carts } =
    useContext(DonationCartContext);
  const { data: shelter, loading } = useShelter(shelterId);
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
  const [priorities, setPriorities] =
    useState<SupplyPriority[]>(defaultPriorities);
  const [search, setSearch] = useState<string>('');

  const supplyGroups = useMemo(() => {
    if (!shelter?.shelterSupplies) return {};
    const groups = group(shelter.shelterSupplies, 'supply.supplyCategory.name');
    return Object.entries(groups).reduce((prev, [name, list]) => {
      const filtered = list.filter(
        (l) =>
          priorities.includes(l.priority) &&
          (!search || normalizedCompare(l.supply.name, search))
      );
      if (filtered.length > 0) return { [name]: filtered, ...prev };
      else return prev;
    }, {} as Record<string, IUseShelterDataSupply[]>);
  }, [shelter, priorities, search]);

  const handleSelectPriority = (priority: SupplyPriority) => {
    setPriorities((prev) =>
      prev.includes(priority)
        ? prev.filter((p) => p !== priority)
        : [...prev, priority]
    );
  };

  const handleDonate = useCallback(
    (item: ShelterCategoryListItemProps) => {
      if (!opened) {
        const hasViewedCart =
          localStorage.getItem('has-viewed-cart') === 'true';
        if (!hasViewedCart) {
          localStorage.setItem('has-viewed-cart', 'true');
          toggleOpened();
        }
      }
      addItem(shelterId, {
        ...item,
        quantity: item.quantity || 1,
      });
    },
    [addItem, opened, shelterId, toggleOpened]
  );

  if (loading) return <LoadingScreen />;

  return (
    <Fragment>
      <DonationCart
        shelterId={shelterId}
        opened={opened}
        onClose={toggleOpened}
      />
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
          endAdornment={
            <DonationCartIcon quantity={carts[shelterId]?.length} />
          }
        />
        <div className="p-4 flex flex-col max-w-5xl w-full h-full gap-2">
          <div className="flex items-center gap-1">
            <h1 className="text-[#2f2f2f] font-semibold text-2xl">
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
                className="font-medium text-[16px] text-blue-600 flex gap-2 items-center hover:text-blue-500 active:text-blue-700"
                onClick={() => navigate(`/abrigo/${shelterId}/atualizar`)}
              >
                Editar
                <Pencil size={17} className="stroke-blue-600" />
              </Button>
            </Authenticated>
          </div>
          <div>
            <CardAboutShelter shelter={shelter} />
          </div>
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-[18px]">Itens do abrigo</h1>
            <div className="flex gap-2 items-center ">
              <Button
                variant="ghost"
                className="font-medium text-[16px] text-blue-600 flex gap-2 items-center hover:text-blue-500 active:text-blue-700"
                onClick={() => navigate(`/abrigo/${shelterId}/items`)}
              >
                Editar itens
                <Pencil size={17} className="stroke-blue-600" />
              </Button>
            </div>
          </div>
          <div>
            <SearchInput
              value={search}
              onChange={(value) => setSearch(value)}
              inputProps={{
                placeholder: 'Digite o item a doar',
              }}
            />
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {defaultPriorities.map((priority, idx) => {
              const { label, className } = getSupplyPriorityProps(priority);
              return (
                <Chip
                  key={idx}
                  label={label}
                  className={cn(
                    'bg-transparent border-[1px] border-border cursor-pointer',
                    priorities.includes(priority)
                      ? className
                      : 'hover:bg-gray-100'
                  )}
                  onClick={() => handleSelectPriority(priority)}
                />
              );
            })}
          </div>
          <div className="flex flex-col gap-4 mt-4">
            {Object.entries(supplyGroups)
              .sort((a, b) => (a[0] > b[0] ? 1 : -1))
              .map(([name, list], idx, arr) => {
                const isLastElement = idx === arr.length - 1;
                return (
                  <Fragment key={idx}>
                    <ShelterCategoryList
                      name={name}
                      items={list.map((l) => ({
                        id: l.supply.id,
                        measure: l.supply.measure,
                        name: l.supply.name,
                        priority: l.priority,
                        quantity: l.quantity,
                      }))}
                      onDonate={handleDonate}
                    />
                    {!isLastElement && <Separator />}
                  </Fragment>
                );
              })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export { Shelter };
