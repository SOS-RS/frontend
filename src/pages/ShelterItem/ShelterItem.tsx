import { ChevronLeft, PlusCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';

import { DialogSelector, Header, LoadingScreen, TextField } from '@/components';
import { Button } from '@/components/ui/button';
import { useShelter, useSupplies, useThrottle } from '@/hooks';
import { group } from '@/lib/utils';
import { SupplyRow } from './components';
import { IDialogSelectorProps } from '@/components/DialogSelector/types';
import { ISupplyRowItemProps } from './components/SupplyRow/types';
import { ShelterSupplyServices } from '@/service';
import { useToast } from '@/components/ui/use-toast';
import { ISupply, SupplyPriority } from '@/service/supply/types';

const ShelterItem = () => {
  const navigate = useNavigate();
  const { shelterId = '-1' } = useParams();
  const { data: shelter, loading, refresh } = useShelter(shelterId);
  const { data: supplies } = useSupplies();
  const [filteredSupplies, setFilteredSupplies] = useState<ISupply[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [, setSearch] = useThrottle<string>(
    {
      throttle: 400,
      callback: (v) => {
        if (v) {
          setFilteredSupplies(
            supplies.filter((s) =>
              s.name.toLowerCase().includes(v.toLowerCase())
            )
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
    'value' | 'onSave'
  > | null>();
  const { toast } = useToast();

  const supplyGroups = useMemo(
    () => group<ISupply>(filteredSupplies ?? [], 'supplyCategory.name'),
    [filteredSupplies]
  );

  const handleClickSupplyRow = useCallback(
    (item: ISupplyRowItemProps) => {
      setModalOpened(true);
      setModalData({
        value: `${item.priority}`,
        onSave: (v) => {
          setLoadingSave(true);
          ShelterSupplyServices.update(shelterId, item.id, { priority: +v })
            .then(() => {
              setModalOpened(false);
              setModalData(null);
              refresh();
            })
            .catch((err) => {
              toast({
                variant: 'destructive',
                title: 'Ocorreu um erro ao atualizar a categoria do suprimento',
                description: `${err}`,
              });
            })
            .finally(() => {
              setLoadingSave(false);
            });
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
              label: 'Necessita urgente',
              value: `${SupplyPriority.Urgent}`,
            },
            {
              label: 'Urgente',
              value: `${SupplyPriority.Needing}`,
            },
            {
              label: 'Sob controle',
              value: `${SupplyPriority.UnderControl}`,
            },
            {
              label: 'Disponível para doação',
              value: `${SupplyPriority.Remaining}`,
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
              value={searchValue}
              onChange={(ev) => {
                setSearchValue(ev.target.value);
                setSearch(ev.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2 w-full my-4">
            {Object.entries(supplyGroups).map(([key, values], idx) => (
              <SupplyRow
                key={idx}
                name={key}
                items={values.map((v) => ({
                  id: v.id,
                  name: v.name,
                  priority: 0, //v.priority,
                }))}
                onClick={handleClickSupplyRow}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export { ShelterItem };
