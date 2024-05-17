import { useCallback, useMemo } from 'react';
import Select from 'react-select';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { LoadingScreen, SearchInput } from '@/components';
import { Separator } from '@/components/ui/separator';
import { useSupplyCategories } from '@/hooks';
import { ISupplyCategory } from '@/hooks/useSupplyCategories/types';
import { useSupplies } from '@/hooks/useSupplies';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  IFilterFormikProps,
  IFilterProps,
  ISelectField,
  ShelterAvailabilityStatus,
} from './types';
import { priorityOptions } from '@/lib/utils';
import { SupplyPriority } from '@/service/supply/types';
import { useSearchParams } from 'react-router-dom';
import { initialFilterData } from '../../Home';
import CitiesFilter from './CitiesFilter';
import { IUseSuppliesData } from '@/hooks/useSupplies/types';

const ShelterAvailabilityStatusMapped: Record<
  ShelterAvailabilityStatus,
  string
> = {
  available: 'Abrigo Disponivel',
  unavailable: 'Abrigo Indisponivel',
  waiting: 'Sem informação de disponibilidade',
};

const priorityOpts = Object.entries(priorityOptions).reduce(
  (prev, [priority, label]) =>
    priority === `${SupplyPriority.NotNeeded}`
      ? prev
      : { ...prev, [priority]: label },
  {} as Record<SupplyPriority, string>
);

const Filter = (props: IFilterProps) => {
  const { data, onClose, onSubmit, open, setSearch, refreshFn, setFilterData } =
    props;
  const { data: supplies, loading: loadingSupplies } = useSupplies();
  const { data: supplyCategories, loading: loadingSupplyCategories } =
    useSupplyCategories();
  const [, setSearchParams] = useSearchParams();

  const mappedSupplyCategories = useMemo(() => {
    return supplyCategories.reduce(
      (prev, current) => ({ ...prev, [current.id]: current }),
      {} as Record<string, ISupplyCategory>
    );
  }, [supplyCategories]);

  const mappedSupplies = useMemo(() => {
    return supplies.reduce(
      (prev, current) => ({ ...prev, [current.id]: current }),
      {} as Record<string, IUseSuppliesData>
    );
  }, [supplies]);

  const initialFormValues = {
    cities: data.cities ?? [],
    priority: data.priority
      ? {
          label: priorityOpts[data.priority],
          value: data.priority,
        }
      : null,
    search: data.search,
    shelterStatus: data.shelterStatus.map((s) => ({
      label: ShelterAvailabilityStatusMapped[s],
      value: s,
    })),
    supplyCategories: data.supplyCategoryIds.map((id) => ({
      label: mappedSupplyCategories[id]?.name,
      value: id,
    })),
    supplies: data.supplyIds.map((id) => ({
      value: id,
      label: mappedSupplies[id]?.name,
    })),
  };

  const { handleSubmit, values, setFieldValue, resetForm } =
    useFormik<IFilterFormikProps>({
      initialValues: initialFormValues,
      enableReinitialize: true,
      validateOnChange: false,
      validateOnBlur: false,
      validateOnMount: false,
      validationSchema: Yup.object().shape({
        search: Yup.string(),
      }),
      onSubmit: (values) => {
        const {
          priority,
          search,
          shelterStatus,
          supplies,
          supplyCategories,
          cities,
        } = values;
        onSubmit({
          priority: priority?.value ? +priority.value : null,
          search,
          shelterStatus: shelterStatus.map((s) => s.value),
          supplyCategoryIds: supplyCategories.map((s) => s.value),
          supplyIds: supplies.map((s) => s.value),
          cities,
        });
      },
    });

  const supplyOptions = useMemo(() => {
    return supplies
      .filter((v) => {
        return values.supplyCategories.length > 0
          ? values.supplyCategories.some(
              (categoryItem) => categoryItem.value === v.supplyCategory.id
            )
          : true;
      })
      .map((el: IUseSuppliesData) => ({
        label: el.name,
        value: el.id,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [supplies, values.supplyCategories]);

  const handleToggleShelterStatus = useCallback(
    (checked: boolean, status: ShelterAvailabilityStatus) => {
      setFieldValue(
        'shelterStatus',
        checked
          ? [
              ...values.shelterStatus,
              { label: ShelterAvailabilityStatusMapped[status], value: status },
            ]
          : values.shelterStatus.filter((s) => s.value !== status)
      );
    },
    [setFieldValue, values.shelterStatus]
  );

  const clearFilters = () => {
    setSearch('');
    setFilterData(initialFilterData);
    resetForm({
      values: initialFormValues,
    });
    setSearchParams('');
    refreshFn();
  };

  if (loadingSupplies || loadingSupplyCategories) return <LoadingScreen />;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-md overflow-y-scroll max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-base font-medium">
            Faça sua busca:
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="pl-4 pr-4 pb-4 flex flex-col max-w-5xl w-full items-start h-full">
            <div className="flex flex-col gap-2 w-full my-4">
              <SearchInput
                value={values.search}
                onChange={(ev) =>
                  setFieldValue('search', ev.target.value ?? '')
                }
              />
            </div>
            <Separator className="mt-2" />
            <CitiesFilter
              cities={values.cities}
              setCities={(cities: string[]) => {
                setFieldValue('cities', cities);
              }}
            />
            <Separator className="mt-2" />
            <div className="flex flex-col gap-2 w-full my-4">
              <p className="text-sm md:text-lg font-medium">Busca avançada</p>
              <p className="text-muted-foreground text-sm md:text-lg font-medium">
                Você pode buscar pelo item que os abrigos precisam urgentemente
                de doação ou por itens que os abrigos tem disponibilidade para
                doar.
              </p>
              <div className="flex flex-col gap-1 w-full">
                <label className="text-muted-foreground text-sm md:text-lg font-medium">
                  Status do item no abrigo
                </label>
                <Select
                  placeholder="Selecione"
                  value={values.priority}
                  options={Object.entries(priorityOpts).map(
                    ([priority, label]) =>
                      ({
                        label,
                        value: +priority,
                      } as ISelectField<SupplyPriority>)
                  )}
                  onChange={(v) => {
                    const newValue = {
                      ...v,
                      value: v ? +v.value : SupplyPriority.Urgent,
                    };
                    setFieldValue('priority', newValue);
                  }}
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label className="text-muted-foreground text-sm md:text-lg font-medium">
                  Categoria
                </label>
                <Select
                  value={values.supplyCategories}
                  placeholder="Selecione"
                  isMulti
                  options={supplyCategories
                    .map((el: ISupplyCategory) => ({
                      label: el.name,
                      value: el.id,
                    }))
                    .sort((a, b) => a.label.localeCompare(b.label))}
                  onChange={(v) => setFieldValue('supplyCategories', v)}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-muted-foreground text-sm md:text-lg font-medium">
                  Itens
                </label>
                <Select
                  placeholder="Selecione"
                  isMulti
                  value={values.supplies}
                  options={supplyOptions}
                  onChange={(v) => setFieldValue('supplies', v)}
                />
              </div>
            </div>
            <Separator className="mt-2" />
            <div className="flex flex-col gap-2 w-full my-4">
              <p className="text-muted-foreground text-sm md:text-lg font-medium">
                Status do abrigo
              </p>
              <div>
                <label className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(ev) =>
                      handleToggleShelterStatus(ev.target.checked, 'available')
                    }
                    checked={values.shelterStatus.some(
                      (s) => s.value === 'available'
                    )}
                  />
                  Abrigo Disponivel
                </label>
              </div>
              <div>
                <label className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(ev) =>
                      handleToggleShelterStatus(
                        ev.target.checked,
                        'unavailable'
                      )
                    }
                    checked={values.shelterStatus.some(
                      (s) => s.value === 'unavailable'
                    )}
                  />
                  Abrigo Indisponível
                </label>
              </div>
              <div>
                <label className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(ev) =>
                      handleToggleShelterStatus(ev.target.checked, 'waiting')
                    }
                    checked={values.shelterStatus.some(
                      (s) => s.value === 'waiting'
                    )}
                  />
                  Sem informação de disponibilidade
                </label>
              </div>
            </div>
          </div>
          <DialogFooter className="sticky bg-white -bottom-6">
            <div className="flex flex-1 flex-col justify-end md:justify-start w-full py-6 gap-4">
              <Button
                type="submit"
                className="flex gap-2 text-white font-medium text-lg bg-blue-500 hover:bg-blue-600 w-full"
              >
                Filtrar resultados
              </Button>
              <Button
                type="button"
                className="flex gap-2 text-blue-500 font-medium text-lg bg-transparent hover:bg-blue-500 hover:text-white w-full"
                onClick={(e) => {
                  e.preventDefault();
                  clearFilters();
                }}
              >
                Limpar filtros
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { Filter };
