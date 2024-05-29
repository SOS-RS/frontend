import {
  Home,
  UsersRound,
  PawPrint,
  DollarSign,
  Phone,
} from 'lucide-react';

import { Card } from '../ui/card';
import { ICardAboutShelter } from './types';
import { InfoRow } from './components';
import { checkAndFormatAddress } from './utils';
import { ShelterCategory } from '@/hooks/useShelter/types';
import { Fragment } from 'react/jsx-runtime';

const CardAboutShelter = (props: ICardAboutShelter) => {
  const { shelter } = props;

  const check = (v?: string | number | boolean | null) => {
    return v !== undefined && v !== null;
  };

  const formatAddress = checkAndFormatAddress(shelter, true);

  return (
    <Card className="flex flex-col gap-2 p-4 bg-gray-50 border-none text-sm">
      <div className="text-[#646870] font-medium">Sobre</div>
      <div className="flex flex-col flex-wrap gap-3">
        <InfoRow icon={<Home />} label={formatAddress} />
        <InfoRow
          icon={<Phone />}
          label="Contato:"
          value={
            check(shelter.contact) ? `${shelter.contact}` : 'Não informado'
          }
          clipboardButton={check(shelter.contact)}
        />
        {shelter.category === ShelterCategory.Shelter && (
          <Fragment>
            <InfoRow
              icon={<UsersRound />}
              label={`Acolhendo`}
              value={
                check(shelter.capacity)
                  ? `${shelter.shelteredPeople} de ${shelter.capacity} vagas`
                  : 'Não informado'
              }
            />
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
          </Fragment>
        )}
        <InfoRow
          icon={<DollarSign />}
          label="Pix:"
          value={check(shelter.pix) ? `${shelter.pix}` : 'Não informado'}
          clipboardButton={check(shelter.pix)}
        />
      </div>
    </Card>
  );
};

export { CardAboutShelter };
