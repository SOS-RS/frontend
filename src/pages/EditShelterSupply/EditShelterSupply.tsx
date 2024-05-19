import { ChevronLeft, PlusCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';

import { DialogSelector, Header, LoadingScreen, TextField } from '@/components';
import { Button } from '@/components/ui/button';
import { useShelter, useSupplies, useThrottle } from '@/hooks';
import { group, normalizedCompare } from '@/lib/utils';
import { SupplyRow } from './components';
import { IDialogSelectorProps } from '@/components/DialogSelector/types';
import { ISupplyRowItemProps } from './components/SupplyRow/types';
import { ShelterSupplyServices } from '@/service';
import { useToast } from '@/components/ui/use-toast';
import { SupplyPriority } from '@/service/supply/types';
import { IUseShelterDataSupply } from '@/hooks/useShelter/types';
import { clearCache } from '@/api/cache';
import { IUseSuppliesData } from '@/hooks/useSupplies/types';

const EditShelterSupply = () => {
  const navigate = useNavigate();
  const { shelterId = '-1' } = useParams();
  const { toast } = useToast();
  const { data: shelter, loading, refresh } = useShelter(shelterId);
  const { data: supplies } = useSupplies();
  const [filteredSupplies, setFilteredSupplies] = useState<IUseSuppliesData[]>(
    []
  );
  const [searchValue, setSearchValue] = useState<string>('');
  const [, setSearch] = useThrottle<string>(
    {
      throttle: 400,
      callback: (v) => {
        if (v) {
          setFilteredSupplies(
            supplies.filter((s) => normalizedCompare(s.name, v))
          );
        } else setFilteredSupplies(supplies);
      },
    },
    [supplies]
  );
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [modalData, setModalData] = useState<Pick<
    IDialogSelectorProps,
    'value' | 'onSave' | 'quantity'
  > | null>();
  const shelterSupplyData = useMemo(() => {
    return (shelter?.shelterSupplies ?? []).reduce(
      (prev, current) => ({ ...prev, [current.supply.id]: current }),
      {} as Record<string, IUseShelterDataSupply>
    );
  }, [shelter?.shelterSupplies]);
  const supplyGroups = useMemo(
    () =>
      group<IUseSuppliesData>(filteredSupplies ?? [], 'supplyCategory.name'),
    [filteredSupplies]
  );

  const handleClickSupplyRow = useCallback(
    (item: ISupplyRowItemProps) => {
      setModalOpened(true);
      setModalData({
        value: `${item.priority ?? SupplyPriority.NotNeeded}`,
        quantity: item.quantity ?? 0,
        onSave: (v, quantity) => {
          const isNewSupply = item.priority === undefined;
          setLoadingSave(true);

          const successCallback = () => {
            setModalOpened(false);
            setModalData(null);
            clearCache(false);
            refresh();
          };

          const errorCallback = (err: any) => {
            toast({
              variant: 'destructive',
              title: 'Ocorreu um erro ao atualizar a categoria do suprimento',
              description: `${err}`,
            });
          };

          if (isNewSupply) {
            ShelterSupplyServices.create({
              shelterId,
              supplyId: item.id,
              priority: +v,
              quantity,
            })
              .then(successCallback)
              .catch(errorCallback)
              .finally(() => {
                setLoadingSave(false);
              });
          } else {
            ShelterSupplyServices.update(shelterId, item.id, {
              priority: +v,
              quantity,
            })
              .then(successCallback)
              .catch(errorCallback)
              .finally(() => {
                setLoadingSave(false);
              });
          }
        },
      });
    },
    [refresh, shelterId, toast]
  );

  useEffect(() => {
    setFilteredSupplies(supplies);
  }, [supplies]);

  if (loading) return <LoadingScreen />;

  return (
    <Fragment>
      {modalData && (
        <DialogSelector
          open={modalOpened}
          onClose={() => setModalOpened(false)}
          title="Escolha a prioridade do item"
          options={[
            {
              label: 'Precisa urgente',
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
            {
              label: 'Não preciso',
              value: `${SupplyPriority.NotNeeded}`,
            },
          ]}
          isSubmitting={loadingSave}
          {...modalData}
        />
      )}
      <div className="flex flex-col h-screen items-center">
        <Header
          title="Editar Itens"
          className="bg-white [&_*]:text-zinc-800 border-b-[1px] border-b-border"
          startAdornment={
            <Button
              variant="ghost"
              className="[&_svg]:stroke-blue-500"
              onClick={() => navigate(`/abrigo/${shelterId}`)}
            >
              <ChevronLeft size={20} />
            </Button>
          }
        />
        <div className="p-4 flex flex-col max-w-5xl w-full gap-3 items-start">
          <h6 className="text-2xl font-semibold">Editar itens do abrigo</h6>
          <p className="text-muted-foreground">
            Para cada item da lista abaixo, informe a disponibilidade no abrigo
            selecionado
          </p>
          <div className="w-full my-2">
            <TextField
              label="Buscar"
              value={searchValue}
              onChange={(ev) => {
                setSearchValue(ev.target.value);
                setSearch(ev.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2 w-full my-4">
            {Object.entries(supplyGroups).map(([key, values], idx) => {
              const items: ISupplyRowItemProps[] = values
                .map((v) => {
                  const supply = shelterSupplyData[v.id];
                  return {
                    id: v.id,
                    name: v.name,
                    quantity: supply?.quantity,
                    priority: supply?.priority,
                  };
                })
                .sort((a, b) => a.name.localeCompare(b.name));
              return (
                <SupplyRow
                  key={idx}
                  name={key}
                  items={items}
                  onClick={handleClickSupplyRow}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export { EditShelterSupply };
