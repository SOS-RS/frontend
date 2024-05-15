import { IUseShelterData } from '@/hooks/useShelter/types';

const formatShelterAddressFields = (
  payload: Partial<
    Pick<IUseShelterData, 'street' | 'streetNumber' | 'neighbourhood'>
  >
): string => {
  const { street, streetNumber, neighbourhood } = payload;
  return [street, streetNumber, neighbourhood].filter(Boolean).join(', ');
};

const checkAndFormatAddress = (
  payload: Partial<
    Pick<
      IUseShelterData,
      'address' | 'city' | 'street' | 'streetNumber' | 'neighbourhood'
    >
  >,
  showCity = true
): string => {
  const { address, city, ...rest } = payload;
  return (
    address ??
    `${formatShelterAddressFields(rest)}${showCity ? ` - ${city}` : ''}`
  );
};

export { checkAndFormatAddress };
