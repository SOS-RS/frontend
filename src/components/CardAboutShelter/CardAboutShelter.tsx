import {
  Home,
  UsersRound,
  HandHeart,
  PawPrint,
  Phone,
  Landmark,
} from 'lucide-react';

import { Card } from '../ui/card';
import { ICardAboutShelter } from './types';

const CardAboutShelter = (props: ICardAboutShelter) => {
  const { shelter } = props;
  return (
    <Card className="gap-2 p-4 flex flex-col bg-[#E8F0F8] text-sm">
      <div className="text-[#646870] font-medium ">Sobre o abrigo</div>
      <div className="flex gap-2 font-medium ">
        <Home />
        <h1> {shelter.address} </h1>
      </div>
      <div className="flex gap-2 font-medium ">
        <UsersRound />
        <h1>Capacidade do abrigo:</h1>
        <h1 className="font-bold">
          {typeof shelter.capacity !== 'number'
            ? 'Não informado'
            : `${shelter.capacity} pessoas`}
        </h1>
      </div>
      <div className="flex gap-2 font-medium ">
        <HandHeart />
        <h1>Pessoas abrigadas:</h1>
        <h1 className="font-bold">
          {typeof shelter.capacity !== 'number'
            ? 'Não informado'
            : `${shelter.capacity} pessoas`}{' '}
        </h1>
      </div>
      <div className="flex gap-2 font-medium ">
        <PawPrint />
        <h1>
          {shelter.petFriendly
            ? 'O abrigo aceita animais'
            : 'O abrigo não aceita animais'}
        </h1>
      </div>
      <div className="flex gap-2 font-medium ">
        <Phone />
        <h1>Contato:</h1>
        <h1 className="font-medium">
          {typeof shelter.contact !== 'string'
            ? 'Não informado'
            : shelter.contact}
        </h1>
      </div>
      <div className="flex flex-col font-medium ">
        <div className="flex gap-2 ">
          <Landmark />
          <h1>Chaves Pix:</h1>
        </div>
        <div className="pl-8">
          <h1 className="font-medium">
            {typeof shelter.pix !== 'string' ? 'Não informado' : shelter.pix}
          </h1>
        </div>
      </div>
    </Card>
  );
};

export { CardAboutShelter };
