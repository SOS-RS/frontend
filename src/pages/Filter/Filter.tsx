import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

import { LoadingScreen } from '@/components';
import { SupplyPriority } from '@/service/supply/types';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import Select from 'react-select';
import { useSupplyCategories } from '@/hooks';
import { ISupplyCategory } from '@/hooks/useSupplyCategories/types';
import { useSupplies } from '@/hooks/useSupplies';
import { group } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useFormik } from 'formik';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { IUseShelterSearchParams } from '@/hooks/useShelters/types';
import { IComplexSelectData, IComplexSelectGroupedData } from './types';

const Filter = (props: any) => {
  const priorityOptions = [
    {
      label: 'Necessita urgente',
      value: `${SupplyPriority.Urgent}`,
    },
    {
      label: 'Precisa',
      value: `${SupplyPriority.Needing}`,
    },
    {
      label: 'Disponível para doação',
      value: `${SupplyPriority.Remaining}`,
    },
  ];
  const [supplyOptions, setSupplyOptions] = useState<IComplexSelectGroupedData[]>([]);
  const { data: supplyCategories, loading } = useSupplyCategories();
  const result = useSupplies();
  const {
    handleSubmit,
    values,
    setFieldValue,
  } = useFormik<IUseShelterSearchParams>({
    initialValues: {
      search: props.filters.search,
      priority: props.filters.priority,
      supplyCategories: props.filters.supplyCategories,
      supplies: props.filters.supplies,
      filterAvailableShelter: props.filters.filterAvailableShelter,
      filterUnavailableShelter: props.filters.filterUnavailableShelter,
      waitingShelterAvailability: props.filters.waitingShelterAvailability
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const params = {
        search: values.search ,
        priority: values.priority,
        supplyCategories: values.supplyCategories,
        supplies: values.supplies,
        filterAvailableShelter: values.filterAvailableShelter,
        filterUnavailableShelter: values.filterUnavailableShelter,
        waitingShelterAvailability: values.waitingShelterAvailability,
      };

      props.handleSearch(params);
    }
  });
  
  const initSupplyOptions = useMemo(() => {
    const grouped = group(result.data ?? [], 'supplyCategory.name');
    /// set suply itens from backend data
    setSupplyOptions(Object.entries(grouped).map(([key, values]) => ({
            label: key,
            options: values.map((v) => {
              return {
                label: v.name,
                value: v.id
              }
            }),
          })));

    /// init default options array with the already selected supplies
    const defaultOptions = props?.filters?.supplies.length > 0 ? 
      Object.entries(grouped).reduce((filtered: IComplexSelectData[], option) => {
        const [, values] = option;
        for(const value of values) {
          for(const suply of props.filters.supplies) {
            if (value.id === suply) {
              filtered.push({
                label: value.name,
                value: value.id
              })
            }
          }
        }

      return filtered;
    }, []) : [];
    
    return defaultOptions;
  }, [result.data, props?.filters?.supplies]);

  const handleSupplyCategoriesSelected = (supplyCategoriesSelected: readonly IComplexSelectData[]) => {
    console.log('init')
    const grouped = group(result.data ?? [], 'supplyCategory.name');

    const supplyOptionsFiltered = Object.entries(grouped).reduce((filtered: IComplexSelectGroupedData[], option) => {
      const [key, values] = option;

      const found = supplyCategoriesSelected.some(element => {
        return element.label === key;
      });

      if (found) {
        filtered.push({
          label: key,
          options: values.map((v) => {
            return {
              label: v.name,
              value: v.id
            }
          }),
        })
      }

      return filtered;
    }, []);
    
    setFieldValue('supplyCategories', supplyCategoriesSelected.map(el => el.value));
    setSupplyOptions(supplyOptionsFiltered);
  }

  const handleSupplySelected = (supplySelected: readonly IComplexSelectData[]) => {
    setFieldValue('supplies', supplySelected.map(el => el.value));
  }

  const handlePriorityOptionSelected = (priorityOptionSelected: IComplexSelectData) => {
    setFieldValue('priority', parseInt(priorityOptionSelected.value));
  }

  if (loading || result.loading) return <LoadingScreen />;

  return (
    <Dialog open={props.isModalOpen} onOpenChange={props.closeModal}>
      <DialogContent className="rounded-md">
          <DialogHeader className='pad-10'>
            <DialogTitle className="text-base font-medium">Faça sua busca:</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="pl-4 pr-4 pb-4 flex flex-col max-w-5xl w-full items-start h-full">
              <div className="flex flex-col gap-2 w-full my-4">
                <div className="relative">
                  <Input
                    placeholder="Buscar por abrigo ou endereço"
                    className="h-12 text-md font-medium text-zinc-600 pl-10 pr-4"
                    onChange={(ev) => {
                      setFieldValue('search', ev.target.value);
                    }}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search name="search" size="20" className="stroke-zinc-300" />
                  </div>
                </div>
              </div>
              <Separator className="mt-2" />
              <div className="flex flex-col gap-2 w-full my-4">
                <p className="text-muted-foreground text-sm md:text-lg font-medium">
                  Busca avançada
                </p>
                <p className="text-muted-foreground text-sm md:text-lg font-medium">
                  Você pode buscar pelo item que os abrigos precisam urgentemente de doação ou por itens que os abrigos tem disponibilidade para doar.
                </p>
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-muted-foreground text-sm md:text-lg font-medium">Status do item no abrigo</label>
                  <Select
                    defaultValue={ props.filters.priority ? priorityOptions.filter(el => props.filters.priority === parseInt(el.value))
                      .map(element => {
                        return {
                          'label': element.label,
                          'value': element.value
                        }
                      }) : 
                      []}
                    name="colors"
                    placeholder={<div>Selecione</div>}
                    options={priorityOptions as any}
                    className="basic-select"
                    classNamePrefix="select"
                    onChange={(priorityOptionsSelected: any) => handlePriorityOptionSelected(priorityOptionsSelected)}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-muted-foreground text-sm md:text-lg font-medium">Categoria</label>
                  <Select
                    defaultValue={ props.filters.supplyCategories ? 
                                    supplyCategories.filter(el => props.filters.supplyCategories.some((suplyCategoryId: string) => suplyCategoryId === el.id)).map(element => {
                                    return {
                                      'label': element.name,
                                      'value': element.id
                                    }
                                    }) : 
                                    []}
                    isMulti
                    placeholder={<div>Selecione</div>}
                    name="colors"
                    options={supplyCategories.map((element: ISupplyCategory) => {
                      return {
                        'label': element.name,
                        'value': element.id
                      }
                    }) as any}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(supplyCategoriesSelected) => handleSupplyCategoriesSelected(supplyCategoriesSelected)}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="text-muted-foreground text-sm md:text-lg font-medium">Itens</label>
                  <Select
                    defaultValue={initSupplyOptions}
                    placeholder={<div>Selecione</div>}
                    isMulti
                    options={supplyOptions}
                    onChange={(suppliesSelected) => handleSupplySelected(suppliesSelected)}
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
                      name="filterAvailableShelter"
                      type="checkbox"
                      className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={() => setFieldValue('filterAvailableShelter', !values.filterAvailableShelter)}
                      defaultChecked={values.filterAvailableShelter}                      
                    />
                    Abrigo Disponivel
                  </label>
                </div>
                <div>
                  <label className="flex items-center mb-4">
                    <input
                      name="filterUnavailableShelter"
                      type="checkbox"
                      className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={() => setFieldValue('filterUnavailableShelter', !values.filterUnavailableShelter)}
                      defaultChecked={values.filterUnavailableShelter}                      
                    />
                    Abrigo Indisponível
                  </label>
                </div>
                <div>
                  <label className="flex items-center mb-4">
                    <input
                      name="waitingShelterAvailability"
                      type="checkbox"
                      className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={() => setFieldValue('waitingShelterAvailability', !values.waitingShelterAvailability)}
                      defaultChecked={values.waitingShelterAvailability}                      
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