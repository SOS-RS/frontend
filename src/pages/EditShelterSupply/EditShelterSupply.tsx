import { ChevronLeft, PlusCircle } from 'lucide-react';
import { Fragment, useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DialogSelector, Header, LoadingScreen, TextField } from '@/components';
import { IDialogSelectorProps } from '@/components/DialogSelector/types';
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useShelter, useSupplies, useThrottle } from '@/hooks';
import { IUseShelterDataSupply } from '@/hooks/useShelter/types';
import { group } from '@/lib/utils';
import { ShelterSupplyServices } from '@/service';
import { ISupply, SupplyPriority } from '@/service/supply/types';
import { SupplyRow } from './components';
import { ISupplyRowItemProps } from './components/SupplyRow/types';

const EditShelterSupply = () => {
  const navigate = useNavigate();
  const { shelterId = '-1' } = useParams();
  const { toast } = useToast();
  const { data: shelter, loading, refresh } = useShelter(shelterId);
  const { data: supplies } = useSupplies();
  const [searchValue, setSearchValue] = useState<string>('');
  const [openedGroups, setOpenedGroups] = useState<string[]>([]);

  const handleOpen = (suppliesGroups: string[]) => {
    setOpenedGroups(suppliesGroups);
  };

  const [search, setSearch] = useThrottle<string>(
    {
      throttle: 400,
      callback: (v) => {
        setSearchValue(v);
      },
    },
    [supplies]
  );

  const supplyGroups = useMemo(() => {
    let result = supplies || [];
    if (search && searchValue) {
      const filtered = supplies?.filter((s) =>
        s.name.toLowerCase().includes(searchValue.toLowerCase())
      );

      handleOpen(filtered.map((f: any) => f.supplyCategory.name));

      result = filtered;
    }

    return group<ISupply>(result, 'supplyCategory.name');
  }, [searchValue, supplies, search]);

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [modalData, setModalData] = useState<Pick<
    IDialogSelectorProps,
    'value' | 'onSave'
  > | null>();
  const shelterSupplyData = useMemo(() => {
    return (shelter?.shelterSupplies ?? []).reduce(
      (prev, current) => ({ ...prev, [current.supply.id]: current }),
      {} as Record<string, IUseShelterDataSupply>
    );
  }, [shelter?.shelterSupplies]);

  const handleClickSupplyRow = useCallback(
    (item: ISupplyRowItemProps) => {
      setModalOpened(true);
      setModalData({
        value: `${item.priority ?? SupplyPriority.NotNeeded}`,
        onSave: (v) => {
          const isNewSupply = item.priority === undefined;
          setLoadingSave(true);

          const successCallback = () => {
            setModalOpened(false);
            setModalData(null);
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
            })
              .then(successCallback)
              .catch(errorCallback)
              .finally(() => {
                setLoadingSave(false);
              });
          } else {
            ShelterSupplyServices.update(shelterId, item.id, { priority: +v })
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
              label: 'Remover item',
              value: `${SupplyPriority.NotNeeded}`,
            },
          ]}
          isSubmitting={loadingSave}
          {...modalData}
        />
      )}
      <div className="flex flex-col items-center h-screen">
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
        <div className="flex flex-col items-start w-full max-w-5xl gap-3 p-4">
          <h6 className="text-2xl font-semibold">Editar itens do abrigo</h6>
          <p className="text-muted-foreground">
            Para cada item da lista abaixo, informe a disponibilidade no abrigo
            selecionado
          </p>
          <Button
            variant="ghost"
            className="flex gap-2 text-blue-500 [&_svg]:stroke-blue-500 font-medium text-lg hover:text-blue-600"
            onClick={() => navigate(`/abrigo/${shelterId}/item/cadastrar`)}
          >
            <PlusCircle />
            Cadastrar novo item
          </Button>
          <div className="w-full my-2">
            <TextField
              label="Buscar"
              value={search || ''}
              onChange={(ev) => {
                if (!ev.target.value) {
                  handleOpen([]);
                }
                setSearch(ev.target.value);
              }}
            />
          </div>

          <Accordion
            type="multiple"
            className="flex flex-col w-full gap-2 my-4"
            value={openedGroups}
            onValueChange={setOpenedGroups}
          >
            {Object.entries(supplyGroups).map(([key, values], idx) => {
              const items: ISupplyRowItemProps[] =
                values?.map((v) => {
                  const supply = shelterSupplyData[v.id];
                  return {
                    id: v.id,
                    name: v.name,
                    priority: supply?.priority,
                  };
                }) || [];

              const sortedItems: ISupplyRowItemProps[] = [...items].sort(
                (a, b) => {
                  const [first, second] = [a.priority || 0, b.priority || 0];

                  return second - first;
                }
              );

              return (
                <SupplyRow
                  key={idx}
                  name={key}
                  items={sortedItems}
                  onClick={handleClickSupplyRow}
                />
              );
            })}
          </Accordion>
        </div>
      </div>
    </Fragment>
  );
};

export { EditShelterSupply };
