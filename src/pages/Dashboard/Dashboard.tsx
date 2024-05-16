import { useContext } from 'react';
import { Footer, Header } from '@/components';
import { Button } from '@/components/ui/button';
import { SessionContext } from '@/contexts';
import { useShelters } from '@/hooks';

import { LogOutIcon } from 'lucide-react';
import { NeedsSuppliesCard, ShelterOverview } from './components';

const Dashboard = () => {
  const { data: shelters, loading } = useShelters({ cache: false });

  const {
    loading: loadingSession,
    refreshSession,
    session,
  } = useContext(SessionContext);

  if (loading) return null;
  console.log(shelters);
  return (
    <div className="flex flex-col h-screen items-center">
      <Header
        title="SOS Rio Grande do Sul - Dashboard"
        endAdornment={
          <div className="flex gap-2 items-center">
            {session && (
              <h3 className="text-white font-thin">
                Bem vindo, {session.name}
              </h3>
            )}
            {session && (
              <Button
                loading={loadingSession}
                variant="ghost"
                size="sm"
                onClick={() => {
                  localStorage.removeItem('token');
                  refreshSession();
                }}
                className="disabled:bg-red-500 hover:bg-red-400"
              >
                <LogOutIcon size={20} className="stroke-white" />
              </Button>
            )}
          </div>
        }
      />
      <div className="flex flex-col">
        <h1 className="font-bold text-2xl justify-self-start mb-8 mt-4">
          Visão Geral
        </h1>
        <ShelterOverview
          shelters={shelters.results}
          totalShelters={shelters.count}
        />
      </div>
      <div className="flex flex-col">
        <h1 className="font-bold text-2xl justify-self-start mt-4 mb-8">
          Visão geral das necessidades
        </h1>
        <NeedsSuppliesCard supplies={{ name: 'Arroz' }} />
      </div>
      <Footer />
    </div>
  );
};

export { Dashboard };
