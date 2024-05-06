import { ChevronLeft, Pencil } from 'lucide-react';

import {
  CardAboutShelter,
  CardItensShelter,
  Header,
  LoadingScreen,
} from '@/components';
import { useParams } from 'react-router-dom';
import { useShelter } from '@/hooks';

const Shelter = () => {
  const params = useParams();
  const { id } = params;
  const { data: shelter, loading } = useShelter(id ?? '-1');

  if (loading) return <LoadingScreen />;

  return (
    <div className="flex flex-col h-screen">
      <Header title={shelter.name} startAdornment={<ChevronLeft size={20} />} />
      <div className="p-4 flex flex-col">
        <h1 className="text-[#2f2f2f] font-semibold text-2xl">
          {shelter.name}
        </h1>
        <h1 className="text-[#348717] font-semibold text-sm">
          Abrigo disponível
        </h1>
      </div>
      <div className="p-4">
        <CardAboutShelter />
      </div>
      <div className="flex justify-between p-4 items-center">
        <h1 className="font-semibold text-[18px]">Itens do abrigo</h1>
        <div className="flex gap-2 items-center text-[#1D61C8]">
          <h1 className="font-medium text-[16px] ">Editar itens</h1>
          <Pencil size={17} />
        </div>
      </div>
      <div className="flex justify-between p-4 ">
        <CardItensShelter />
      </div>
    </div>
  );
};

export { Shelter };
