import { IUseSheltersData } from '@/hooks/useShelters/types';
import { ICardAboutShelter } from './types';

const formatShelterAddressFields = (
  shelter: ICardAboutShelter['shelter'] | IUseSheltersData
) =>
  [shelter.street, shelter.streetNumber, shelter.neighbourhood]
    .filter(Boolean)
    .join(', ');

export const checkAndFormatAddress = (
  shelter: ICardAboutShelter['shelter'] | IUseSheltersData,
  showCity = true
) =>
  shelter.address ??
  `${formatShelterAddressFields(shelter)}${
    showCity ? ` - ${shelter.city}` : ''
  }`;
