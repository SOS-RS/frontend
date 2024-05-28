import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Fragment, useMemo } from 'react';
import { Header, LoadingScreen } from '@/components';
import { Button } from '@/components/ui/button';
import { useShelter } from '@/hooks';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';

const ShelterSupplyTable = () => {
  const navigate = useNavigate();
  const { shelterId = '-1' } = useParams();
  const { data: shelter, loading } = useShelter(shelterId);

  const shelterSupplyData = useMemo(() => {
    return shelter?.shelterSupplies ?? [];
  }, [shelter?.shelterSupplies]);
  
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
          <div className="flex flex-col gap-2 w-full my-4">
            <>
              {shelterSupplyData &&
                <DataTable data={shelterSupplyData} columns={columns} />
              }
            </>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export { ShelterSupplyTable };
