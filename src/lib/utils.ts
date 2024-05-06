import { SupplyPriority } from '@/Services/supply/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function variantStatusPriority(priority: SupplyPriority) {
  if (priority === SupplyPriority.Needing) return 'danger';
  if (priority === SupplyPriority.Urgent) return 'warn';
  if (priority === SupplyPriority.UnderControl) return 'alert';
  if (priority === SupplyPriority.Remaining) return 'success';
}

const colorStatusPriority = (priority: SupplyPriority) => {
  if (priority === SupplyPriority.Needing) return '#f69f9d';
  if (priority === SupplyPriority.Urgent) return '#f8b993';
  if (priority === SupplyPriority.UnderControl) return '#f9cf8d';
  if (priority === SupplyPriority.Remaining) return '#63bc43';
};

function nameStatusPriority(priority: SupplyPriority) {
  if (priority === SupplyPriority.Needing) return 'Necessita urgentimente';
  if (priority === SupplyPriority.Urgent) return 'Urgente';
  if (priority === SupplyPriority.UnderControl) return 'Sob-controle';
  if (priority === SupplyPriority.Remaining) return 'Disponível para doação';
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

export {
  cn,
  tokenName,
  getAvailabilityProps,
  colorStatusPriority,
  variantStatusPriority,
  nameStatusPriority,
};
