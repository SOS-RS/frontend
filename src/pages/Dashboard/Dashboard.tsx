import { BurgerMenu, Footer, Header } from '@/components';
import { Button } from '@/components/ui/button';

import { NeedsSuppliesCard, ShelterOverview } from './components';
import { RotateCw } from 'lucide-react';
import { useDashboard } from '@/hooks/useDashboard/useDashboard';



const Dashboard = () => {
  const { data, loading, refresh } = useDashboard({ cache: false });

  if (loading) return null;
  return (
    <div className="flex flex-col h-screen items-center">
      <Header
        title="SOS Rio Grande do Sul"
        startAdornment={<BurgerMenu />}
        endAdornment={
          <div className="flex gap-2 items-center">
            <Button
              loading={loading}
              variant="ghost"
              size="sm"
              onClick={() => refresh()}
              className="disabled:bg-red-500 hover:bg-red-400"
            >
              <RotateCw size={20} className="stroke-white" />
            </Button>
          </div>
        }
      />
      <div className="flex flex-col">
        <h1 className="font-bold text-2xl justify-self-start mb-8 mt-4">
          Visão Geral
        </h1>
        <ShelterOverview
          allPeopleShelters={data.allPeopleSheltered}
          totalShelters={data.allShelters}
        />
      </div>
      <div className="flex flex-col">
        <h1 className="font-bold text-2xl justify-self-start mt-8 mb-4">
          Visão geral das necessidades
        </h1>
        <NeedsSuppliesCard catergories={data.categoriesWithPriorities} />
      </div>
      <Footer />
    </div>
  );
};

export { Dashboard };
