import Select from 'react-select';

import { useShelterCities } from '@/hooks';
import { ISelectField } from './types';
import { useTheme } from '@/components/Theme/provider';

interface CitiesFilterInterface<S> {
  cities: S;
  setCities: (cities: S) => void;
}

export const CitiesFilter = ({
  cities = [],
  setCities,
}: CitiesFilterInterface<string[]>) => {
  const { data, loading } = useShelterCities();
  const { theme } = useTheme();

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
    <div className="flex flex-col w-full gap-2">
      <div className="flex flex-col gap-2 w-full my-4">
        <p className="text-sm md:text-lg font-medium">Cidades</p>
        <p className="text-muted-foreground text-sm md:text-md font-medium">
          Selecione uma ou mais cidades para pesquisar.
        </p>

        <Select
          value={values}
          placeholder="Selecione"
          isMulti
          options={options}
          onChange={(v) => setCities(v.map((item) => item.value))}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: theme === "dark" ? "#1C1C1C" : "#FFFFFF",
            }),
            menu: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: theme === "dark" ? "#1C1C1C" : "#FFFFFF",
            }),
            option: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: theme === "dark" ? "#5B6367" : "#E1EAFF",
              color: "#000000",
            }),
          }}
        />
      </div>
    </div>
  );
};

export default CitiesFilter;
