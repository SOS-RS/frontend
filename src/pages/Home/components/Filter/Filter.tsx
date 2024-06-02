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
  ShelterAvailabilityStatus,
} from './types';
import { priorityOptions } from '@/lib/utils';
import CitiesFilter from './CitiesFilter';
import { IUseSuppliesData } from '@/hooks/useSupplies/types';
import { SupplyPriority } from '@/service/supply/types';
import TitleSection from './TitleSection';
import Section from './Section';
import CheckBoxFilter from './CheckBoxFilter';

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

const ensureTrueAsString = (data: string): string =>
  data === "true" ? data : "";

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
      {} as Record<string, IUseSuppliesData>
    );
  }, [supplies]);

  const { handleSubmit, values, setFieldValue } = useFormik<IFilterFormikProps>(
    {
      initialValues: {
        cities: data.cities ?? [],
        priorities: data.priorities.map((p: string) => ({
          label: priorityOpts[Number(p) as SupplyPriority],
          value: p,
        })),
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
        pix: ensureTrueAsString(data.pix),
        contact: ensureTrueAsString(data.contact),
      },
      enableReinitialize: true,
      validateOnChange: false,
      validateOnBlur: false,
      validateOnMount: false,
      validationSchema: Yup.object().shape({
        search: Yup.string(),
      }),
      onSubmit: (values) => {
        const {
          priorities,
          search,
          shelterStatus,
          supplies,
          supplyCategories,
          cities,
          pix,
          contact,
        } = values;
        onSubmit({
          priorities: priorities.map((p) => p.value),
          search,
          shelterStatus: shelterStatus.map((s) => s.value),
          supplyCategoryIds: supplyCategories.map((s) => s.value),
          supplyIds: supplies.map((s) => s.value),
          cities,
          pix,
          contact,
        });
      },
    }
  );

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

  const handleToggleTo = useCallback(
    (data: string, checked: boolean, ) => {
      setFieldValue(data, checked ? String(checked) : undefined);
    },
    [setFieldValue]
  );

  const onShelterStatusCheckChangeTo = (status: ShelterAvailabilityStatus) => (ev: React.ChangeEvent<HTMLInputElement>) => {
    handleToggleShelterStatus(ev.target.checked, status)
  };

  const defaultCheckedTo = (status: ShelterAvailabilityStatus): boolean => 
    values.shelterStatus.some((s) => s.value === status);

  if (loadingSupplies || loadingSupplyCategories) return <LoadingScreen />;

  function helpFromDistanceSection(): import("react").ReactNode {
    return (
      <Section>
        <TitleSection title="Ajuda a distância" />
        <CheckBoxFilter
          label="Possui chave pix"
          onChangeCheck={(ev) => handleToggleTo('pix', ev.target.checked)}
          defaultChecked={values.pix === "true" ? true : false}
        />
        <CheckBoxFilter
          label="Possui contato telefônico"
          onChangeCheck={(ev) => handleToggleTo('contact', ev.target.checked)}
          defaultChecked={values.contact === "true" ? true : false}
        />
      </Section>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-md overflow-y-scroll max-h-[85vh] mt-8">
        <DialogHeader>
          <DialogTitle className="text-base font-medium">
            Faça sua busca:
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="pl-4 pr-4 pb-4 flex flex-col max-w-5xl w-full items-start">
            <Section>
              <SearchInput
                value={values.search}
                onChange={(v) => setFieldValue('search', v)}
              />
            </Section>
            <Separator className="mt-2" />
            <CitiesFilter
              cities={values.cities}
              setCities={(cities: string[]) => {
                setFieldValue('cities', cities);
              }}
            />
            <Separator className="mt-2" />
            <Section>
              <p className="text-sm md:text-lg font-medium">Busca avançada</p>
              <p className="text-muted-foreground text-sm md:text-lg font-medium">
                Você pode buscar pelo item que os abrigos precisam com urgência
                de doação ou por itens que os abrigos tem disponibilidade para
                doar.
              </p>
              <div className="flex flex-col gap-1 w-full">
                <label className="text-muted-foreground text-sm md:text-lg font-medium">
                  Status do item no abrigo
                </label>
                <Select
                  placeholder="Selecione"
                  value={values.priorities}
                  isMulti
                  options={Object.entries(priorityOpts).map(
                    ([priority, label]) => ({
                      label,
                      value: priority,
                    })
                  )}
                  onChange={(v) => setFieldValue('priorities', v)}
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
            </Section>
            <Separator className="mt-2" />
            <Section>
              <TitleSection title="Status do abrigo" />
              <CheckBoxFilter
                label="Abrigo Disponivel"
                onChangeCheck={onShelterStatusCheckChangeTo('available')}
                defaultChecked={defaultCheckedTo('available')}
              />
              <CheckBoxFilter
                label="Abrigo Indisponivel"
                onChangeCheck={onShelterStatusCheckChangeTo('unavailable')}
                defaultChecked={defaultCheckedTo('unavailable')}
              />
              <CheckBoxFilter
                label="Sem informação de disponibilidade"
                onChangeCheck={onShelterStatusCheckChangeTo('waiting')}
                defaultChecked={defaultCheckedTo('waiting')}
              />
            </Section>
            <Separator className="mt-2" />
            {helpFromDistanceSection()}
          </div>
          <DialogFooter className="sticky bg-white -bottom-6">
            <div className="flex flex-1 flex-col justify-end md:justify-start w-full py-6">
              <Button
                type="submit"
                className="flex gap-2 text-white font-medium text-lg bg-blue-500 hover:bg-blue-600 w-full"
              >
                Filtrar resultados
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { Filter };
