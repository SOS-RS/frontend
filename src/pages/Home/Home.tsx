import { Loader } from 'lucide-react';

import { ShelterListItem } from '@/components';
import { Input } from '@/components/ui/input';
import { useShelters } from '@/hooks';

const Home = () => {
  const { data: shelters, loading } = useShelters();

  return (
    <div className="flex flex-col min-h-screen gap-5">
      <div className=" bg-red-600 flex h-[45px] justify-start items-center text-white p-4">
        <h3> SOS Rio Grande do Sul</h3>
      </div>
      <div className="flex flex-col max-w-5xl self-center w-full gap-2">
        <div className="flex-1 flex">
          <h1 className="">Abrigos disponíveis</h1>
        </div>
        <div className="flex-1 flex">
          <Input className="" />
        </div>
        <main className="flex flex-col gap-4 overflow-y-auto">
          {loading ? (
            <Loader className="justify-self-center self-center w-5 h-5 animate-spin" />
          ) : (
            shelters.results.map((s, idx) => (
              <ShelterListItem key={idx} data={s} />
            ))
          )}
        </main>
      </div>
    </div>
  );
};

export { Home };
