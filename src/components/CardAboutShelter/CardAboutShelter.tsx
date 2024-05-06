import {
  Home,
  UsersRound,
  HandHeart,
  PawPrint,
  Phone,
  Landmark,
} from "lucide-react";

import { Card } from "../ui/card";

const CardAboutShelter = () => {
  return (
    <Card className="gap-2 p-4 flex flex-col bg-[#E8F0F8] text-sm">
      <div className="text-[#646870] font-medium ">Sobre o abrigo</div>
      <div className="flex gap-2 font-medium ">
        <Home />
        <h1> Rua A, N° 126 * Bairro Laranjeiras Canoas - RS </h1>
      </div>
      <div className="flex gap-2 font-medium ">
        <UsersRound />
        <h1>Capacidade de abrigo:</h1>
        <h1 className="font-bold"> 1500 pessoas</h1>
      </div>
      <div className="flex gap-2 font-medium ">
        <HandHeart />
        <h1>Pessoas abrigadas:</h1>
        <h1 className="font-bold"> 500 pessoas</h1>
      </div>
      <div className="flex gap-2 font-medium ">
        <PawPrint />
        <h1>O abrigo aceita animais</h1>
      </div>
      <div className="flex gap-2 font-medium ">
        <Phone />
        <h1>Contato:</h1>
        <h1 className="font-medium">(51) 3210-8971</h1>
      </div>
      <div className="flex flex-col font-medium ">
        <div className="flex gap-2 ">
          <Landmark />
          <h1>Chaves Pix:</h1>
        </div>
        <div className="pl-8">
          <h1 className="font-medium"> escolarodrigo@gmail.com</h1>
          <h1 className="font-medium"> escolarodrigo2@outlok.com</h1>
          <h1 className="font-medium"> (51) 3210-8971</h1>
        </div>
      </div>
    </Card>
  );
};

export { CardAboutShelter };
