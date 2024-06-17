import Select from 'react-select';

import { useShelterCities } from '@/hooks';
import { ISelectField } from './types';

interface CitiesFilterInterface<S> {
  cities: S;
  setCities: (cities: S) => void;
}

export const CitiesFilter = ({
  cities = [],
  setCities,
}: CitiesFilterInterface<string[]>) => {
  const { data, loading } = useShelterCities();

  if (loading) return null;

  const values: ISelectField<string>[] = cities.map((item) => ({
    label: item,
    value: item,
  }));
  const options: ISelectField<string>[] = data.map((item) => ({
    label: `(${item.sheltersCount}) ${item.city}`,
    value: item.city,
  }));

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="my-4 flex w-full flex-col gap-2">
        <p className="text-sm font-medium md:text-lg">Cidades</p>
        <p className="md:text-md text-sm font-medium text-muted-foreground">
          Selecione uma ou mais cidades para pesquisar.
        </p>

        <Select
          value={values}
          placeholder="Selecione"
          isMulti
          options={options}
          onChange={(v) => setCities(v.map((item) => item.value))}
        />
      </div>
    </div>
  );
};

export default CitiesFilter;
