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
<<<<<<< HEAD
  DialogFooter,
=======
>>>>>>> 3d3f437 (merge: develop -> master (#91))
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  IFilterFormikProps,
  IFilterProps,
<<<<<<< HEAD
  ISelectField,
  ShelterAvailabilityStatus,
} from './types';
import { priorityOptions } from '@/lib/utils';
import CitiesFilter from './CitiesFilter';
import { IUseSuppliesData } from '@/hooks/useSupplies/types';
import { SupplyPriority } from '@/service/supply/types';
=======
  ShelterAvailabilityStatus,
} from './types';
import { priorityOptions } from '@/lib/utils';
import { ISupply, SupplyPriority } from '@/service/supply/types';
>>>>>>> 3d3f437 (merge: develop -> master (#91))

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
  const { data, onClose, onSubmit, open } = props;
  const { data: supplies, loading: loadingSupplies } = useSupplies();
  const { data: supplyCategories, loading: loadingSupplyCategories } =
    useSupplyCategories();
  const mappedSupplyCategories = useMemo(() => {
    return supplyCategories.reduce(
      (prev, current) => ({ ...prev, [current.id]: current }),
      {} as Record<string, ISupplyCategory>
    );
  }, [supplyCategories]);
  const mappedSupplies = useMemo(() => {
    return supplies.reduce(
      (prev, current) => ({ ...prev, [current.id]: current }),
<<<<<<< HEAD
      {} as Record<string, IUseSuppliesData>
    );
  }, [supplies]);

  const { handleSubmit, values, setFieldValue } = useFormik<IFilterFormikProps>(
    {
      initialValues: {
        cities: data.cities ?? [],
        priority: data.priority
          ? {
              label: priorityOpts[data.priority],
              value: data.priority,
            }
          : null,
=======
      {} as Record<string, ISupply>
    );
  }, [supplies]);
  const { handleSubmit, values, setFieldValue } = useFormik<IFilterFormikProps>(
    {
      initialValues: {
        priority: {
          value: data.priority ?? SupplyPriority.Urgent,
          label: priorityOpts[data.priority ?? SupplyPriority.Urgent],
        },
>>>>>>> 3d3f437 (merge: develop -> master (#91))
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
      },
      enableReinitialize: true,
      validateOnChange: false,
      validateOnBlur: false,
      validateOnMount: false,
      validationSchema: Yup.object().shape({
        search: Yup.string(),
      }),
      onSubmit: (values) => {
<<<<<<< HEAD
        const {
          priority,
          search,
          shelterStatus,
          supplies,
          supplyCategories,
          cities,
        } = values;
=======
        const { priority, search, shelterStatus, supplies, supplyCategories } =
          values;
>>>>>>> 3d3f437 (merge: develop -> master (#91))
        onSubmit({
          priority: priority?.value ? +priority.value : null,
          search,
          shelterStatus: shelterStatus.map((s) => s.value),
          supplyCategoryIds: supplyCategories.map((s) => s.value),
          supplyIds: supplies.map((s) => s.value),
<<<<<<< HEAD
          cities,
=======
>>>>>>> 3d3f437 (merge: develop -> master (#91))
        });
      },
    }
  );

<<<<<<< HEAD
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

=======
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

>>>>>>> 3d3f437 (merge: develop -> master (#91))
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
<<<<<<< HEAD
            <CitiesFilter
              cities={values.cities}
              setCities={(cities: string[]) => {
                setFieldValue('cities', cities);
              }}
            />
            <Separator className="mt-2" />
            <div className="flex flex-col gap-2 w-full my-4">
              <p className="text-sm md:text-lg font-medium">Busca avançada</p>
=======
            <div className="flex flex-col gap-2 w-full my-4">
              <p className="text-muted-foreground text-sm md:text-lg font-medium">
                Busca avançada
              </p>
>>>>>>> 3d3f437 (merge: develop -> master (#91))
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
<<<<<<< HEAD
                  value={values.priority}
                  options={Object.entries(priorityOpts).map(
                    ([priority, label]) =>
                      ({
                        label,
                        value: +priority,
                      } as ISelectField<SupplyPriority>)
=======
                  value={{
                    label:
                      priorityOpts[
                        values.priority?.value ?? SupplyPriority.Urgent
                      ],
                    value: values.priority?.value ?? SupplyPriority.Needing,
                  }}
                  options={Object.entries(priorityOpts).map(
                    ([priority, label]) => ({ label, value: +priority } as any)
>>>>>>> 3d3f437 (merge: develop -> master (#91))
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
<<<<<<< HEAD
                  options={supplyCategories
                    .map((el: ISupplyCategory) => ({
                      label: el.name,
                      value: el.id,
                    }))
                    .sort((a, b) => a.label.localeCompare(b.label))}
=======
                  options={supplyCategories.map((el: ISupplyCategory) => ({
                    label: el.name,
                    value: el.id,
                  }))}
>>>>>>> 3d3f437 (merge: develop -> master (#91))
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
<<<<<<< HEAD
                  options={supplyOptions}
=======
                  options={supplies.map((el: ISupply) => ({
                    label: el.name,
                    value: el.id,
                  }))}
>>>>>>> 3d3f437 (merge: develop -> master (#91))
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
                    defaultChecked={values.shelterStatus.some(
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
                    defaultChecked={values.shelterStatus.some(
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
                    defaultChecked={values.shelterStatus.some(
                      (s) => s.value === 'waiting'
                    )}
                  />
                  Sem informação de disponibilidade
                </label>
              </div>
            </div>
<<<<<<< HEAD
          </div>
          <DialogFooter className="sticky bg-white -bottom-6">
=======

>>>>>>> 3d3f437 (merge: develop -> master (#91))
            <div className="flex flex-1 flex-col justify-end md:justify-start w-full py-6">
              <Button
                type="submit"
                className="flex gap-2 text-white font-medium text-lg bg-blue-500 hover:bg-blue-600 w-full"
              >
                Filtrar resultados
              </Button>
            </div>
<<<<<<< HEAD
          </DialogFooter>
=======
          </div>
>>>>>>> 3d3f437 (merge: develop -> master (#91))
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { Filter };
