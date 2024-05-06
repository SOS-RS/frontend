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

export { cn, tokenName, getAvailabilityProps };
