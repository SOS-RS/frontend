import {
  Home,
  UsersRound,
  HandHeart,
  PawPrint,
  Landmark,
  Smartphone,
} from 'lucide-react';

import { Card } from '../ui/card';
import { ICardAboutShelter } from './types';
import { InfoRow } from './components';

const CardAboutShelter = (props: ICardAboutShelter) => {
  const { shelter } = props;

  const check = (v?: string | number | boolean | null) => {
    return v !== undefined && v !== null;
  };

  return (
    <Card className="flex flex-col gap-2 p-4 bg-[#E8F0F8] text-sm">
      <div className="text-[#646870] font-medium">Sobre o abrigo</div>
      <div className="flex flex-col flex-wrap gap-3">
        <InfoRow icon={<Home />} label={shelter.address} />
        <InfoRow
          icon={<PawPrint />}
          label={
            check(shelter.petFriendly) ? (
              shelter.petFriendly ? (
                <p>
                  O abrigo <b>aceita</b> animais
                </p>
              ) : (
                <p>
                  O abrigo <b>não</b> aceita animais
                </p>
              )
            ) : (
              <b>Não informado se aceita animais</b>
            )
          }
        />
        <InfoRow
          icon={<HandHeart />}
          label="Pessoas abrigadas:"
          value={
            check(shelter.shelteredPeople)
              ? `${shelter.shelteredPeople} pessoas`
              : 'Não informado'
          }
        />
        <InfoRow
          icon={<UsersRound />}
          label="Capacidade do abrigo:"
          value={
            check(shelter.capacity)
              ? `${shelter.capacity} pessoas`
              : 'Não informado'
          }
        />
        <InfoRow
          icon={<Smartphone />}
          label="Contato:"
          value={
            check(shelter.contact) ? `${shelter.contact}` : 'Não informado'
          }
          clipboardButton={check(shelter.contact)}
        />
        <InfoRow
          icon={<Landmark />}
          label="Chave Pix:"
          value={check(shelter.pix) ? `${shelter.pix}` : 'Não informado'}
          clipboardButton={check(shelter.pix)}
        />
      </div>
    </Card>
  );
};

export { CardAboutShelter };
