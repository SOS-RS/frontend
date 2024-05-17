import {
  Home,
  UsersRound,
  HandHeart,
  PawPrint,
  Landmark,
  Smartphone,
  Building,
  MapPinned,
  ExternalLink
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Card } from '../ui/card';
import { ICardAboutShelter } from './types';
import { InfoRow } from './components';
import { checkAndFormatAddress } from './utils';

const CardAboutShelter = (props: ICardAboutShelter) => {
  const { shelter } = props;

  const check = (v?: string | number | boolean | null) => {
    return v !== undefined && v !== null;
  };
  const formatAddress = checkAndFormatAddress(shelter, false);

  const openGoogleMaps = () => {
    if (formatAddress) {
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formatAddress)}`;
      window.open(googleMapsUrl, '_blank');
    }
  };

  return (
    <Card className="flex flex-col gap-2 p-4 bg-[#E8F0F8] text-sm">
      <div className="text-[#646870] font-medium">Sobre o abrigo</div>
      <div className="flex flex-col flex-wrap gap-3">
        <InfoRow icon={<Home />} label={formatAddress} onClick={openGoogleMaps} iconTwo={<ExternalLink />} className={cn('cursor-pointer')}/>
        {Boolean(shelter.city) && (
          <InfoRow icon={<Building />} label="Cidade:" value={shelter.city} iconTwo={<></>} />
        )}
        {Boolean(shelter.zipCode) && (
          <InfoRow icon={<MapPinned />} label="CEP:" value={shelter.zipCode} iconTwo={<></>}/>
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
          iconTwo={<></>}
        />
        <InfoRow
          icon={<HandHeart />}
          label="Pessoas abrigadas:"
          value={
            check(shelter.shelteredPeople)
              ? `${shelter.shelteredPeople} pessoas`
              : 'Não informado'
          }
          iconTwo={<></>}
        />
        <InfoRow
          icon={<UsersRound />}
          label="Capacidade do abrigo:"
          value={
            check(shelter.capacity)
              ? `${shelter.capacity} pessoas`
              : 'Não informado'
          }
          iconTwo={<></>}
        />
        <InfoRow
          icon={<Smartphone />}
          label="Contato:"
          value={
            check(shelter.contact) ? `${shelter.contact}` : 'Não informado'
          }
          clipboardButton={check(shelter.contact)}
          iconTwo={<></>}
        />
        <InfoRow
          icon={<Landmark />}
          label="Chave Pix:"
          value={check(shelter.pix) ? `${shelter.pix}` : 'Não informado'}
          clipboardButton={check(shelter.pix)}
          iconTwo={<></>}
        />
      </div>
    </Card>
  );
};

export { CardAboutShelter };
