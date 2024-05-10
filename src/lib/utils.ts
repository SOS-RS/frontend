import { IUseSheltersDataSupplyData } from '@/hooks/useShelters/types';
import {
  ShelterTagInfo,
  ShelterTagType,
} from '@/pages/Home/components/ShelterListItem/types';
import { SupplyPriority } from '@/service/supply/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * deprecated
 */
function variantStatusPriority(priority: SupplyPriority) {
  if (priority === SupplyPriority.Needing) return 'danger';
  if (priority === SupplyPriority.Urgent) return 'warn';
  if (priority === SupplyPriority.NotNeeded) return 'alert';
  if (priority === SupplyPriority.Remaining) return 'success';
}

/**
 * deprecated
 */
const colorStatusPriority = (priority: SupplyPriority) => {
  if (priority === SupplyPriority.Needing) return 'bg-[#f69f9d]';
  if (priority === SupplyPriority.Urgent) return 'bg-[#f8b993]';
  if (priority === SupplyPriority.NotNeeded) return 'bg-[#f9cf8d]';
  if (priority === SupplyPriority.Remaining) return 'bg-[#63bc43]';
};

/**
 * deprecated
 */
function nameStatusPriority(priority: SupplyPriority) {
  if (priority === SupplyPriority.Needing) return 'Precisa urgentimente';
  if (priority === SupplyPriority.Urgent) return 'Precisa';
  if (priority === SupplyPriority.NotNeeded) return 'Não preciso';
  if (priority === SupplyPriority.Remaining) return 'Disponível para doação';
}

function getAvailabilityProps(
  capacity?: number | null,
  shelteredPeople?: number | null
) {
  if (capacity && (shelteredPeople || shelteredPeople === 0)) {
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
  [SupplyPriority.Urgent]: 'Necessita urgente',
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
        className: 'bg-gray-200',
      };
    case SupplyPriority.Remaining:
      return {
        label,
        className: 'bg-light-green',
      };
    case SupplyPriority.Needing:
      return {
        label,
        className: 'bg-light-orange',
      };
    case SupplyPriority.Urgent:
      return {
        label,
        className: 'bg-light-red',
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
      [category]: values.sort((a, b) => b.priority - a.priority),
    };
  }, initialGroup);
}

export {
  cn,
  getAvailabilityProps,
  group,
  getSupplyPriorityProps,
  variantStatusPriority,
  colorStatusPriority,
  nameStatusPriority,
  priorityOptions,
  groupShelterSuppliesByTag,
};
