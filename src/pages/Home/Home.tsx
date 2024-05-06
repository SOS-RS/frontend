import { Alert, Header } from "@/components";
import { RotateCw, CircleAlert } from "lucide-react";

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
      </div>
    </div>
  );
};

export { Home };
