import { ChevronLeft, Pencil } from "lucide-react";

import { CardAboutShelter, CardItensShelter, Header } from "@/components";

const Shelter = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header
        title="Escola Rodrigo de Castro"
        startAdornment={<ChevronLeft size={20} />}
      />
      <div className="p-4 flex flex-col">
        <h1 className="text-[#2f2f2f] font-semibold text-2xl">
          Escola Rodrigo de Castro
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
