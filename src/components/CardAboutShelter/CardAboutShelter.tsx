import {
  Home,
  UsersRound,
  HandHeart,
  PawPrint,
  Landmark,
  Smartphone,
  Building,
} from 'lucide-react';

import { Card } from '../ui/card';
import { ICardAboutShelter } from './types';
import { InfoRow } from './components';

const formatShelterAddressFields = (shelter: ICardAboutShelter['shelter']) => {
  const fields = [];
  if (shelter.street) fields.push(shelter.street);
  if (shelter.streetNumber) fields.push(shelter.streetNumber);
  if (shelter.neighbourhood) fields.push(shelter.neighbourhood);
  if (shelter.zipCode) fields.push(shelter.zipCode);

  return fields.join(', ');
};

const CardAboutShelter = (props: ICardAboutShelter) => {
  const { shelter } = props;

  const check = (v?: string | number | boolean | null) => {
    return v !== undefined && v !== null;
  };
  const formatAddress =
    shelter.address ??
    `${formatShelterAddressFields(shelter)} - ${shelter.city}`;

  return (
    <Card className="flex flex-col gap-2 p-4 bg-[#E8F0F8] text-sm">
      <div className="text-[#646870] font-medium">Sobre o abrigo</div>
      <div className="flex flex-col flex-wrap gap-3">
        <InfoRow icon={<Home />} label={formatAddress} />
        {Boolean(shelter.city) && (
          <InfoRow icon={<Building />} label={shelter.city} />
        )}
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
        />
        <InfoRow
          icon={<Landmark />}
          label="Chave Pix:"
          value={check(shelter.pix) ? `${shelter.pix}` : 'Não informado'}
        />
      </div>
    </Card>
  );
};

export { CardAboutShelter };
