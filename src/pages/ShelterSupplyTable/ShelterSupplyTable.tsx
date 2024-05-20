import { ChevronLeft, PlusCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Fragment, useMemo, useState } from 'react';

import { Header, LoadingScreen, TextField } from '@/components';
import { Button } from '@/components/ui/button';
import { useShelter, useSupplies, useThrottle } from '@/hooks';
import { group, normalizedCompare } from '@/lib/utils';
// import { ShelterSupplyServices } from '@/service';
import { useToast } from '@/components/ui/use-toast';
// import { SupplyPriority } from '@/service/supply/types';
import { IUseShelterDataSupply } from '@/hooks/useShelter/types';
// import { clearCache } from '@/api/cache';
import { IUseSuppliesData } from '@/hooks/useSupplies/types';
import { ISupplyRowItemProps } from '../EditShelterSupply/components/SupplyRow/types';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';

const ShelterSupplyTable = () => {
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
  const shelterSupplyData = useMemo(() => {
    return (shelter?.shelterSupplies ?? []).reduce(
      (prev, current) => ({ ...prev, [current.supply.id]: current }),
      {} as Record<string, IUseShelterDataSupply>
    );
  }, [shelter?.shelterSupplies]);
  // const supplyGroups = useMemo(
  //   () =>
  //     group<IUseSuppliesData>(filteredSupplies ?? [], 'supplyCategory.name'),
  //   [filteredSupplies]
  // );

  console.log(shelter.shelterSupplies)

  if (loading) return <LoadingScreen />;

  return (
    <Fragment>
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
            <>
              {shelterSupplyData &&
                <DataTable data={shelter.shelterSupplies} columns={columns} />
              }
            </>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export { ShelterSupplyTable };
