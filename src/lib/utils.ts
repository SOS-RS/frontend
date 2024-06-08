import { ShelterCategory, SupplyMeasure } from '@/hooks/useShelter/types';
import { IUseSheltersDataSupplyData } from '@/hooks/useShelters/types';
import { ShelterAvailabilityStatus } from '@/pages/Home/components/Filter/types';
import {
  ShelterTagInfo,
  ShelterTagType,
} from '@/pages/Home/components/ShelterListItem/types';
import { DonateOrderStatus } from '@/service/donationOrder/types';
import { SupplyPriority } from '@/service/supply/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getAvailabilityProps(props: {
  capacity?: number | null;
  shelteredPeople?: number | null;
  category: ShelterCategory;
}) {
  const { category, capacity, shelteredPeople } = props;
  if (category === ShelterCategory.DistributionCenter) {
    return {
      availability: 'Centro de Distribuição',
      className: 'text-green-600',
    };
  } else if (capacity && (shelteredPeople || shelteredPeople === 0)) {
    if (shelteredPeople < capacity)
      return {
        availability: 'Abrigo disponível',
        className: 'text-green-600',
      };
    else
      return {
        availability: 'Abrigo lotado',
        className: 'text-red-400',
      };
  } else
    return {
      availability: 'Consultar disponibilidade',
      className: 'text-blue-400',
    };
}

const priorityOptions: Record<SupplyPriority, string> = {
  [SupplyPriority.Urgent]: 'Precisa com urgência',
  [SupplyPriority.Needing]: 'Precisa',
  [SupplyPriority.Remaining]: 'Disponível para doação',
  [SupplyPriority.NotNeeded]: 'Não preciso',
};

function getSupplyPriorityProps(priority: SupplyPriority) {
  const label = priorityOptions[priority];
  switch (priority) {
    case SupplyPriority.NotNeeded:
      return {
        label,
        className: 'bg-gray-200 text-gray-800',
      };
    case SupplyPriority.Remaining:
      return {
        label,
        className: 'bg-light-green text-green-800',
      };
    case SupplyPriority.Needing:
      return {
        label,
        className: 'bg-light-orange text-orange-800',
      };
    case SupplyPriority.Urgent:
      return {
        label,
        className: 'bg-light-red text-red-800',
      };
  }
}

function getObjectValue<T>(obj: T, path: string, sep = '.'): any {
  return path
    .split(sep)
    .reduce(
      (acc, key) => (acc && acc[key] !== 'undefined' ? acc[key] : undefined),
      obj as Record<string, any>
    );
}

function group<T extends Record<string, any>>(
  arr: Array<T>,
  groupBy: string,
  sep = '.'
): { [key: string]: Array<T> } {
  const data = arr.reduce((prev, current) => {
    const key: string = getObjectValue(current, groupBy, sep);
    if (prev[key]) return { ...prev, [key]: [...prev[key], current] };
    return { ...prev, [key]: [current] };
  }, {} as { [key: string]: Array<T> });

  return data;
}

function groupShelterSuppliesByTag(data: IUseSheltersDataSupplyData[]) {
  const initialGroup: ShelterTagInfo<IUseSheltersDataSupplyData[]> = {
    NeedDonations: [],
    NeedVolunteers: [],
    RemainingSupplies: [],
  };
  const grouped: ShelterTagInfo<IUseSheltersDataSupplyData[]> = initialGroup;

  data.forEach((shelterSupply) => {
    Object.keys(grouped).forEach((key: string) => {
      if (shelterSupply.tags.includes(key as ShelterTagType)) {
        grouped[key as ShelterTagType].push(shelterSupply);
      }
    });
  });

  return Object.entries(grouped).reduce((prev, [category, values]) => {
    return {
      ...prev,
      [category]: values.sort(
        (a, b) =>
          b.priority - a.priority || a.supply.name.localeCompare(b.supply.name)
      ),
    };
  }, initialGroup);
}

function removeDuplicatesByField(
  key: string,
  ...lists: Record<string, any>[]
): any[] {
  return lists
    .flatMap((list) => list)
    .reduce((prev: Record<string, any>[], current) => {
      if (prev.some((p) => p[key] === current[key])) return prev;
      else return [...prev, current];
    }, []);
}

function normalizedCompare(a: string, b: string): boolean {
  return a
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .includes(
      b
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
    );
}

function checkIsNull(v?: any | null) {
  return v !== null && v !== undefined;
}

const SupplyMeasureMap: Record<SupplyMeasure, string> = {
  Box: 'caixa(s)',
  Kg: 'kg',
  Litters: 'litro(s)',
  Piece: 'peça(s)',
  Unit: 'un',
};

const ShelterAvailabilityStatusMap: Record<ShelterAvailabilityStatus, string> =
  {
    available: 'Abrigo Disponivel',
    unavailable: 'Abrigo Indisponivel',
    waiting: 'Sem informação de disponibilidade',
  };

const DonationStatusMap: Record<DonateOrderStatus, string> = {
  [DonateOrderStatus.Canceled]: 'Cancelado',
  [DonateOrderStatus.Pending]: 'Pendente',
  [DonateOrderStatus.Complete]: 'Entregue',
};

export {
  cn,
  getAvailabilityProps,
  group,
  getSupplyPriorityProps,
  priorityOptions,
  groupShelterSuppliesByTag,
  removeDuplicatesByField,
  normalizedCompare,
  checkIsNull,
  SupplyMeasureMap,
  ShelterAvailabilityStatusMap,
  DonationStatusMap,
};
