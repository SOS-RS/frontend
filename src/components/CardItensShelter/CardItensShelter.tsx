import { ChevronDown } from "lucide-react";

import { Badge } from "../ui/badge";

const CardItensShelter = () => {
  return (
    <div className="flex pb-8 flex-col gap-2  border-b-2 border-b-slate-100 ">
      <div className="flex gap-2 items-center">
        <div className="w-4 h-4 bg-orange-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold"></span>
        </div>
        <div>
          <h1 className="font-medium">Necessita Urgentemente</h1>
        </div>
      </div>
      <div className="flex gap-2">
        <Badge
          variant="destructive"
          className=" bg-red-300 text-[#2f2f2f] font-semibold text-sm"
        >
          Comida
        </Badge>
        <Badge
          variant="destructive"
          className=" bg-red-300 text-[#2f2f2f] font-semibold text-sm"
        >
          Comida
        </Badge>
        <Badge
          variant="destructive"
          className=" bg-red-300 text-[#2f2f2f] font-semibold text-sm"
        >
          Comida
        </Badge>
      </div>
      <div className="text-[#1D61C8] flex gap-2 cursor-pointer">
        <h1 className=" font-medium">Ver todos</h1>
        <ChevronDown />
      </div>
    </div>
  );
};

export { CardItensShelter };
