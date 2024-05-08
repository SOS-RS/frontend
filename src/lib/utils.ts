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
  if (priority === SupplyPriority.UnderControl) return 'alert';
  if (priority === SupplyPriority.Remaining) return 'success';
}

/**
 * deprecated
 */
const colorStatusPriority = (priority: SupplyPriority) => {
  if (priority === SupplyPriority.Needing) return 'bg-[#f69f9d]';
  if (priority === SupplyPriority.Urgent) return 'bg-[#f8b993]';
  if (priority === SupplyPriority.UnderControl) return 'bg-[#f9cf8d]';
  if (priority === SupplyPriority.Remaining) return 'bg-[#63bc43]';
};

/**
 * deprecated
 */
function nameStatusPriority(priority: SupplyPriority) {
  if (priority === SupplyPriority.Needing) return 'Necessita urgentimente';
  if (priority === SupplyPriority.Urgent) return 'Urgente';
  if (priority === SupplyPriority.UnderControl) return 'Sob-controle';
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

function getSupplyPriorityProps(priority: SupplyPriority) {
  switch (priority) {
    case SupplyPriority.UnderControl:
      return {
        label: 'Sob controle',
        className: 'bg-light-yellow',
      };
    case SupplyPriority.Remaining:
      return {
        label: 'Disponível para doação',
        className: 'bg-light-green text-gray-100',
      };
    case SupplyPriority.Needing:
      return {
        label: 'Precisa',
        className: 'bg-light-orange',
      };
    case SupplyPriority.Urgent:
      return {
        label: 'Precisa Urgentemente',
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

export {
  cn,
  getAvailabilityProps,
  group,
  getSupplyPriorityProps,
  variantStatusPriority,
  colorStatusPriority,
  nameStatusPriority,
};
