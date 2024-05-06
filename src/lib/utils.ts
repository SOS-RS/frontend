import { SupplyPriority } from '@/services/supply/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function tokenName() {
  const loc = localStorage.getItem('loc') ?? 'br';
  const key = `${loc}:token`;
  return key;
}

function getAvailabilityProps(
  capacity?: number | null,
  shelteredPeople?: number | null
) {
  if (capacity && shelteredPeople) {
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
        className: 'bg-light-green',
      };
    case SupplyPriority.Needing:
      return {
        label: 'Urgente',
        className: 'bg-light-orange',
      };
    case SupplyPriority.Urgent:
      return {
        label: 'Necessita Urgentemente',
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

export { cn, tokenName, getAvailabilityProps, group, getSupplyPriorityProps };
