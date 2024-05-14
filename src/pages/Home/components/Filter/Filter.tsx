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
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  IFilterFormikProps,
  IFilterProps,
  ShelterAvailabilityStatus,
} from './types';
import { priorityOptions } from '@/lib/utils';
import { ISupply, SupplyPriority } from '@/service/supply/types';

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
        const { priority, search, shelterStatus, supplies, supplyCategories } =
          values;
        onSubmit({
          priority: priority?.value ? +priority.value : null,
          search,
          shelterStatus: shelterStatus.map((s) => s.value),
          supplyCategoryIds: supplyCategories.map((s) => s.value),
          supplyIds: supplies.map((s) => s.value),
        });
      },
    }
  );

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

  if (loadingSupplies || loadingSupplyCategories) return <LoadingScreen />;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-md overflow-y-scroll max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl text-left mb-0 leading-none">
            Faça sua busca
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="pl-4 pr-4 pb-4 flex flex-col max-w-5xl w-full items-start h-full">
            <div className="flex flex-col gap-2 w-full mt-4 mb-8">
              <SearchInput
                value={values.search}
                onChange={(ev) =>
                  setFieldValue('search', ev.target.value ?? '')
                }
              />
            </div>
            <Separator className="mb-4" />
            <div className="flex flex-col gap-2 w-full my-4">
              <h2 className="text-muted-foreground text-md md:text-lg font-semibold">
                Busca avançada
              </h2>
              <p className="text-muted-foreground text-sm md:text-md mb-6">
                Você pode buscar pelo{' '}
                <span className="underline">
                  item que os abrigos precisam urgentemente de doação
                </span>{' '}
                ou por{' '}
                <span className="underline">
                  itens que os abrigos têm disponibilidade para doar
                </span>
                .
              </p>
              <div className="flex flex-col gap-1 w-full mb-4">
                <label className="text-muted-foreground text-sm md:text-md font-bold mb-2">
                  Status do item no abrigo
                </label>
                <Select
                  placeholder="Selecione"
                  value={{
                    label:
                      priorityOpts[
                        values.priority?.value ?? SupplyPriority.Urgent
                      ],
                    value: values.priority?.value ?? SupplyPriority.Needing,
                  }}
                  options={Object.entries(priorityOpts).map(
                    ([priority, label]) => ({ label, value: +priority } as any)
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
              <div className="flex flex-col gap-1 w-full mb-4">
                <label className="text-muted-foreground text-sm md:text-md font-bold mb-2">
                  Categoria
                </label>
                <Select
                  value={values.supplyCategories}
                  placeholder="Selecione"
                  isMulti
                  options={supplyCategories.map((el: ISupplyCategory) => ({
                    label: el.name,
                    value: el.id,
                  }))}
                  onChange={(v) => setFieldValue('supplyCategories', v)}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-muted-foreground text-sm md:text-md font-bold mb-2">
                  Itens
                </label>
                <Select
                  placeholder="Selecione"
                  isMulti
                  value={values.supplies}
                  options={supplies.map((el: ISupply) => ({
                    label: el.name,
                    value: el.id,
                  }))}
                  onChange={(v) => setFieldValue('supplies', v)}
                />
              </div>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col gap-2 w-full">
              <p className="text-muted-foreground text-md md:text-lg font-semibold mb-3">
                Status do abrigo
              </p>
              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(ev) =>
                      handleToggleShelterStatus(ev.target.checked, 'available')
                    }
                    defaultChecked={values.shelterStatus.some(
                      (s) => s.value === 'available'
                    )}
                  />
                  <span className="font-normal ml-3 text-sm">
                    Abrigo Disponivel
                  </span>
                </label>
              </div>
              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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

                  <span className="font-normal ml-3 text-sm">
                    Abrigo Indisponível
                  </span>
                </label>
              </div>
              <div>
                <label className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(ev) =>
                      handleToggleShelterStatus(ev.target.checked, 'waiting')
                    }
                    defaultChecked={values.shelterStatus.some(
                      (s) => s.value === 'waiting'
                    )}
                  />
                  <span className="font-normal ml-3 text-sm">
                    Sem informação de disponibilidade
                  </span>
                </label>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-end md:justify-start w-full py-6">
              <Button
                type="submit"
                className="flex gap-2 text-white font-bold text-lg bg-blue-500 hover:bg-blue-600 w-full"
              >
                Procurar
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { Filter };
