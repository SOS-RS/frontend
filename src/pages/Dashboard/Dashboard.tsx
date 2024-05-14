import { useContext } from 'react';
import { Footer, Header } from '@/components';
import { Button } from '@/components/ui/button';
import { SessionContext } from '@/contexts';
import { useShelters } from '@/hooks';

import { LogOutIcon } from 'lucide-react';

const Dashboard = () => {
  const { data: shelters, loading } = useShelters({ cache: true });

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
      <h1 className='font-bold text-2xl'>Visão Geral</h1>
      <Footer />
    </div>
  );
};

export { Dashboard };
