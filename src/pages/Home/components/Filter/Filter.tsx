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
  IFilterFormProps,
  IFilterProps,
  ShelterAvailabilityStatus,
} from './types';
import { priorityOptions } from '@/lib/utils';
import { ISupply } from '@/service/supply/types';
import { useCallback } from 'react';

const Filter = (props: IFilterProps) => {
  const { data, onClose, onSubmit, open } = props;
  const { data: supplies, loading: loadingSupplies } = useSupplies();
  const { data: supplyCategories, loading: loadingSupplyCategories } =
    useSupplyCategories();
  const { handleSubmit, values, setFieldValue } = useFormik<IFilterFormProps>({
    initialValues: data,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    validationSchema: Yup.object().shape({
      search: Yup.string(),
    }),
    onSubmit,
  });

  const handleToggleShelterStatus = useCallback(
    (checked: boolean, value: ShelterAvailabilityStatus) => {
      setFieldValue(
        'shelterStatus',
        checked
          ? [...values.shelterStatus, value]
          : values.shelterStatus.filter((s) => s !== value)
      );
    },
    [setFieldValue, values.shelterStatus]
  );

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
            <div className="flex flex-col gap-2 w-full my-4">
              <p className="text-muted-foreground text-sm md:text-lg font-medium">
                Busca avançada
              </p>
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
                  defaultValue={values.priority}
                  options={Object.entries(priorityOptions).map(
                    ([priority, label]) => ({ label, value: priority } as any)
                  )}
                  onChange={(v) => setFieldValue('priority', v)}
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label className="text-muted-foreground text-sm md:text-lg font-medium">
                  Categoria
                </label>
                <Select
                  placeholder="Selecione"
                  isMulti
                  options={supplyCategories.map((el: ISupplyCategory) => ({
                    label: el.name,
                    value: el.id,
                  }))}
                  onChange={(v) => setFieldValue('supplyCategoryIds', v)}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-muted-foreground text-sm md:text-lg font-medium">
                  Itens
                </label>
                <Select
                  placeholder="Selecione"
                  defaultValue={null}
                  isMulti
                  options={supplies.map((el: ISupply) => ({
                    label: el.name,
                    value: el.id,
                  }))}
                  onChange={(v) => setFieldValue('supplyIds', v)}
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
                    defaultChecked={values.shelterStatus.includes('available')}
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
                    defaultChecked={values.shelterStatus.includes(
                      'unavailable'
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
                    defaultChecked={values.shelterStatus.includes('waiting')}
                  />
                  Aguardando disponibilidade
                </label>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-end md:justify-start w-full py-6">
              <Button
                type="submit"
                className="flex gap-2 text-white font-medium text-lg bg-blue-500 hover:bg-blue-600 w-full"
              >
                Filtrar resultados
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { Filter };
