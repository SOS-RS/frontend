import { IUseShelterData } from '@/hooks/useShelter/types';

const formatShelterAddressFields = (
  payload: Partial<
    Pick<IUseShelterData, 'street' | 'streetNumber' | 'neighbourhood'>
  >
): string => {
  const { street, streetNumber, neighbourhood} = payload;
  return [street, streetNumber].filter(Boolean).join(', ').concat(' - ',[neighbourhood].filter(Boolean).join('-'));
};

const checkAndFormatAddress = (
  payload: Partial<
    Pick<
      IUseShelterData,
      'address' | 'city' | 'street' | 'streetNumber' | 'neighbourhood' | 'zipCode'
    >
  >,
  showCity = true
): string => {
  const { city, zipCode, ...rest } = payload;
  return (
    `${formatShelterAddressFields(rest)}${showCity ? `, ${city} - RS` : ''}${zipCode ? `, ${zipCode}`: ''}`
  );
};

export { checkAndFormatAddress };
