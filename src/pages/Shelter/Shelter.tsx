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
      [shelter?.capacity, shelter?.shelteredPeople, shelter?.category],
    );
  const [priorities, setPriorities] =
    useState<SupplyPriority[]>(defaultPriorities);
  const [search, setSearch] = useState<string>('');

  const supplyGroups = useMemo(() => {
    if (!shelter?.shelterSupplies) return {};
    const groups = group(shelter.shelterSupplies, 'supply.supplyCategory.name');
    return Object.entries(groups).reduce(
      (prev, [name, list]) => {
        const filtered = list.filter(
          (l) =>
            priorities.includes(l.priority) &&
            (!search || normalizedCompare(l.supply.name, search)),
        );
        if (filtered.length > 0) return { [name]: filtered, ...prev };
        else return prev;
      },
      {} as Record<string, IUseShelterDataSupply[]>,
    );
  }, [shelter, priorities, search]);

  const handleSelectPriority = (priority: SupplyPriority) => {
    setPriorities((prev) =>
      prev.includes(priority)
        ? prev.filter((p) => p !== priority)
        : [...prev, priority],
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
    [addItem, opened, shelterId, toggleOpened],
  );

  if (loading) return <LoadingScreen />;

  return (
    <Fragment>
      <DonationCart
        shelterId={shelterId}
        opened={opened}
        onClose={toggleOpened}
      />
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
          endAdornment={
            <DonationCartIcon quantity={carts[shelterId]?.length} />
          }
        />
        <div className="flex h-full w-full max-w-5xl flex-col gap-2 p-4">
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
          <div>
            <CardAboutShelter shelter={shelter} />
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-[18px] font-semibold">Itens do abrigo</h1>
            <div className="flex items-center gap-2">
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
          <div>
            <SearchInput
              value={search}
              onChange={(value) => setSearch(value)}
              inputProps={{
                placeholder: 'Digite o item a doar',
              }}
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {defaultPriorities.map((priority, idx) => {
              const { label, className } = getSupplyPriorityProps(priority);
              return (
                <Chip
                  key={idx}
                  label={label}
                  className={cn(
                    'cursor-pointer border-[1px] border-border bg-transparent',
                    priorities.includes(priority)
                      ? className
                      : 'hover:bg-gray-100',
                  )}
                  onClick={() => handleSelectPriority(priority)}
                />
              );
            })}
          </div>
          <div className="mt-4 flex flex-col gap-4">
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
                      shelterId={shelterId}
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
