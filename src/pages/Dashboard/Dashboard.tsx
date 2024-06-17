import { BurgerMenu, Footer, Header } from '@/components';
import { Button } from '@/components/ui/button';

import { NeedsSuppliesCard, ShelterOverview } from './components';
import { RotateCw } from 'lucide-react';
import { useDashboard } from '@/hooks/useDashboard/useDashboard';

const Dashboard = () => {
  const { data, loading, refresh } = useDashboard({ cache: false });

  if (loading) return null;
  return (
    <div className="flex h-screen flex-col items-center">
      <Header
        title="SOS Rio Grande do Sul"
        startAdornment={<BurgerMenu />}
        endAdornment={
          <div className="flex items-center gap-2">
            <Button
              loading={loading}
              variant="ghost"
              size="sm"
              onClick={() => refresh()}
              className="hover:bg-red-400 disabled:bg-red-500"
            >
              <RotateCw size={20} className="stroke-white" />
            </Button>
          </div>
        }
      />
      <div className="flex flex-col">
        <h1 className="mb-8 mt-4 justify-self-start text-2xl font-bold">
          Visão Geral
        </h1>
        <ShelterOverview
          allPeopleShelters={data.allPeopleSheltered}
          totalShelters={data.allShelters}
        />
      </div>
      <div className="flex flex-col">
        <h1 className="mb-4 mt-8 justify-self-start text-2xl font-bold">
          Visão geral das necessidades
        </h1>
        <NeedsSuppliesCard catergories={data.categoriesWithPriorities} />
      </div>
      <Footer />
    </div>
  );
};

export { Dashboard };
