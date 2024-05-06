import { ChevronLeft, PlusCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';

import { CircleStatus, Header, LoadingScreen } from '@/components';
import { Button } from '@/components/ui/button';
import { useShelter } from '@/hooks';
import { group } from '@/lib/utils';
import { IUseShelterDataSupply } from '@/hooks/useShelter/types';
import { SupplyRow, SupplyRowInfo } from './components';

const ShelterItem = () => {
  const navigate = useNavigate();
  const { shelterId = '-1' } = useParams();
  const { data: shelter, loading, refresh } = useShelter(shelterId);

  const supplyGroups = useMemo(
    () =>
      group<IUseShelterDataSupply>(
        shelter?.supplies ?? [],
        'supplyCategory.name'
      ),
    [shelter.supplies]
  );

  if (loading) return <LoadingScreen />;

  return (
    <div className="flex flex-col h-screen items-center">
      <Header
        title="Editar Itens"
        className="bg-white [&_*]:text-zinc-800 border-b-[1px] border-b-border"
        startAdornment={
          <Button
            variant="ghost"
            className="[&_svg]:stroke-blue-500"
            onClick={() => navigate(-1)}
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
        >
          <PlusCircle />
          Cadastrar novo item
        </Button>
        <div className="flex flex-col gap-2 w-full my-4">
          {Object.entries(supplyGroups).map(([key, values], idx) => (
            <SupplyRow
              key={idx}
              name={key}
              items={values.map((v) => ({
                name: v.name,
                priority: v.priority,
              }))}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { ShelterItem };
