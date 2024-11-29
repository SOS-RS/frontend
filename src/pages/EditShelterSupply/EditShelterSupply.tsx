import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Fragment, useCallback, useMemo, useState } from 'react';
import { DialogSelector, Header, LoadingScreen } from '@/components';
import { Button } from '@/components/ui/button';
import { useShelter, useSupplies, useThrottle } from '@/hooks';
import { group, normalizedCompare } from '@/lib/utils';
import { SupplyRow, SupplySearch } from './components';
import { IDialogSelectorProps } from '@/components/DialogSelector/types';
import { ISupplyRowItemProps } from './components/SupplyRow/types';
import { ShelterSupplyServices } from '@/service';
import { useToast } from '@/components/ui/use-toast';
import { SupplyPriority } from '@/service/supply/types';
import { IUseShelterDataSupply } from '@/hooks/useShelter/types';
import { clearCache } from '@/api/cache';
import { IUseSuppliesData } from '@/hooks/useSupplies/types';
import { Accordion } from '@/components/ui/accordion';

const EditShelterSupply = () => {
  const navigate = useNavigate();
  const { shelterId = '-1' } = useParams();
  const { toast } = useToast();
  const { data: shelter, loading, refresh } = useShelter(shelterId);
  const { data: supplies } = useSupplies();
  const [searchValue, setSearchValue] = useState<string>('');

  const shelterSupplyData = useMemo(() => {
    return (shelter?.shelterSupplies ?? []).reduce(
      (prev, current) => ({ ...prev, [current.supply.id]: current }),
      {} as Record<string, IUseShelterDataSupply>
    );
  }, [shelter?.shelterSupplies]);

  const [search, setSearch] = useThrottle<string>(
    {
      throttle: 400,
      callback: (value) => {
        setSearchValue(value);
      },
    },
    [supplies, shelterSupplyData]
  );

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [modalData, setModalData] = useState<Pick<
    IDialogSelectorProps,
    'value' | 'onSave' | 'quantity'
  > | null>();

  const [openedGroups, setOpenedGroups] = useState<string[]>([]);

  const { supplyGroups, searchResult } = useMemo(() => {
    let result = supplies.filter((s) => !!shelterSupplyData[s.id]);
    let searchResult: IUseSuppliesData[] = [];

    if (search && searchValue) {
      const filtered = supplies.filter((s) =>
        normalizedCompare(s.name, searchValue)
      );

      setOpenedGroups(
        filtered
          .filter((c) => !!c.supplyCategory)
          .map((f: IUseSuppliesData) => f.supplyCategory!.name)
      );

      result = filtered;

      /* seta o filtro do Search Comp*/
      searchResult = supplies.filter((s) =>
        normalizedCompare(s.name, searchValue)
      );
    }

    const grouped = group<IUseSuppliesData>(result, 'supplyCategory.name');
    const sorted = Object.fromEntries(Object.entries(grouped).sort());

    return { supplyGroups: sorted, searchResult };
  }, [searchValue, supplies, search, shelterSupplyData]);

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
            setSearch('');
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
    [refresh, shelterId, toast, setSearch]
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
              label: 'Precisa com urgência',
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
            Antes de adicionar um novo item, confira na busca abaixo se ele já
            não foi cadastrado.
          </p>
          <div className="w-full my-2">
            <SupplySearch
              supplyItems={searchResult}
              limit={5}
              onSearch={(value) => {
                if (!value) {
                  setOpenedGroups([]);
                }

                setSearch(value);
              }}
              onSelectItem={(item) => {
                setSearch(item.name);
              }}
              onAddNewItem={() =>
                navigate(`/abrigo/${shelterId}/item/cadastrar`)
              }
            />
          </div>

          <p className="mt-3 text-muted-foreground">
            Para cada item da lista abaixo, informe a disponibilidade no abrigo
            selecionado.
          </p>
          <Accordion
            type="multiple"
            className="flex flex-col w-full gap-2 my-4"
            value={openedGroups}
            onValueChange={setOpenedGroups}
          >
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
                .sort((a, b) => {
                  const [first, second] = [a.priority || 0, b.priority || 0];
                  const priorityDiff = second - first;

                  return priorityDiff || a.name.localeCompare(b.name);
                });

              return (
                <SupplyRow
                  key={idx}
                  name={key}
                  items={items}
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
