import { Header } from "@/components";
import { Input } from "@/components/ui/input";
import { RotateCw } from "lucide-react";

const Home = () => {
  return (
    <div className="flex flex-col h-screen justify-center gap-5">
      <Header
        title="SOS Rio Grande do Sul"
        endAdornment={<RotateCw size={20} />}
      />
      <div className="gap-2 flex flex-col">
        <div className="flex-1 flex">
          <h1 className=""> Abrigos disponíveis</h1>
        </div>
        <div className="flex-1 flex">
          <Input className="" />
        </div>
      </div>
    </div>
  );
};

export { Home };
