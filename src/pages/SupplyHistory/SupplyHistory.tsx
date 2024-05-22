import {
  ChevronLeft,
  CircleAlert,
  Calendar,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { Alert, Chip, Header } from '@/components';
import { Button } from '@/components/ui/button';

const SupplyHistory = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { shelterId } = params;

  return (
    <div className="flex flex-col h-screen items-center">
      <Header
        title="Histórico de edições"
        startAdornment={
          <Button
            size="sm"
            variant="ghost"
            className="[&_svg]:stroke-white disabled:bg-red-500 hover:bg-red-400"
            onClick={() => navigate(`/abrigo/${shelterId}/items`)}
          >
            <ChevronLeft size={20} />
          </Button>
        }
      />
      <div className="p-4 flex flex-col max-w-5xl w-full h-full gap-4">
        <div>
          <h6 className="text-2xl font-semibold">Histórico de edições</h6>
          <h1 className="font-semibold text-slate-500">
            Escola Rodrigo de Castro Melo
          </h1>
        </div>
        <div>
          <Alert
            description="Confira a lista de itens que foram modificados neste abrigo."
            startAdornment={
              <CircleAlert size={20} className="stroke-light-yellow" />
            }
          />
        </div>
        <div>
          <h1 className="font-semibold text-slate-500">Modificações</h1>
        </div>
        {Array.from({ length: 5 }, (_, idx) => (
          <div
            key={idx}
            className="flex flex-col p-4 max-w-sm gap-4 border-2 border-border rounded-md relative hover:bg-accent"
          >
            <div className="justify-between flex flex-1">
              <div className="flex gap-1 items-center">
                <Calendar size="18" /> <h1 className="font-medium">16/05/24</h1>
              </div>
              <div className="flex gap-1 items-center">
                <Clock size="18" />
                <h1 className="font-medium">22:22</h1>
              </div>
            </div>
            <div className="flex flex-1 justify-between">
              <Chip label="Água mineral" variant="danger" />
              <ArrowRight />
              <Chip label="Água mineral" variant="success" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { SupplyHistory };
