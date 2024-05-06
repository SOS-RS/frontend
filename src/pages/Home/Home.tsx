import { Alert, Header } from "@/components";
import { Input } from "@/components/ui/input";
import { RotateCw, CircleAlert, Search, ListFilter } from "lucide-react";

const alertDescription =
  "Você pode consultar a lista de abrigos disponíveis e os itens que necessitam de doações.";

const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header
        title="SOS Rio Grande do Sul"
        endAdornment={<RotateCw size={20} />}
      />
      <div className="p-5 gap-3 flex flex-col">
        <h1 className="text-[#2f2f2f] font-semibold text-2xl">
          Abrigos disponíveis
        </h1>
        <Alert
          description={alertDescription}
          startAdornment={<CircleAlert size={20} />}
        />
        <div className="relative">
          <Input
            placeholder="Buscar por abrigo ou endereço"
            className="h-[48px] text-sm font-medium text-[#8C94A4] pl-10 pr-4"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search name="search" size="20" className="text-gray-400" />
          </div>
        </div>
        <div className="flex gap-2 text-blue-600 items-center p-1">
          <ListFilter />
          <h1 className="font-semibold text-[16px]"> Filtros </h1>
        </div>
      </div>
    </div>
  );
};

export { Home };
