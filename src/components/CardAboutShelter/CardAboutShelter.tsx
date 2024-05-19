import {
  Home,
  Map,
  UsersRound,
  HandHeart,
  PawPrint,
  Landmark,
  Smartphone,
  Building,
  MapPinned,
} from 'lucide-react';

import { Card } from '../ui/card';
import { ICardAboutShelter } from './types';
import { InfoRow } from './components';
import { checkAndFormatAddress, getGoogleMapsUrlTo } from './utils';
import { ShelterCategory } from '@/hooks/useShelter/types';
import { Fragment } from 'react/jsx-runtime';
import React from 'react';
import { cn } from '@/lib/utils';

const AddressInfoRow = (props: { shelter: ICardAboutShelter['shelter'] }) => {
  const { shelter } = props;

  const formatAddress = checkAndFormatAddress(shelter, false);
  const googleMapsUrl = getGoogleMapsUrlTo(formatAddress);

  return (
    <>
      <div className={cn(
        'flex items-start gap-2 font-medium w-full',
        'md:flex'
      )}>
          {React.cloneElement(<Home /> as any, {
            className: 'min-w-5 min-h-5 w-5 h-5 stroke-muted-foreground',
          })}
          <div className={cn('flex flex-col gap-2 items-start', 'sm:flex-row')}>
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
              <span className={'font-normal'}>
                {formatAddress}
              </span>
            </a>
          </div>
      </div>
      <div className={cn(
        'flex items-start gap-2 font-medium w-full',
        'md:flex'
      )}>
          {React.cloneElement(<Map /> as any, {
            className: 'min-w-5 min-h-5 w-5 h-5 stroke-muted-foreground',
          })}
          <div className={cn('flex flex-col gap-2 items-start', 'sm:flex-row')}>
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
              <span className={'font-normal'}>
                <u>Ver endereço no mapa</u>
              </span>
            </a>
          </div>
      </div>
    </>
  );
};

const CardAboutShelter = (props: ICardAboutShelter) => {
  const { shelter } = props;

  const check = (v?: string | number | boolean | null) => {
    return v !== undefined && v !== null;
  };

  return (
    <Card className="flex flex-col gap-2 p-4 bg-[#E8F0F8] text-sm">
      <div className="text-[#646870] font-medium">Sobre o abrigo</div>
      <div className="flex flex-col flex-wrap gap-3">
        <AddressInfoRow shelter={shelter} />
        {Boolean(shelter.city) && (
          <InfoRow icon={<Building />} label="Cidade:" value={shelter.city} />
        )}
        {Boolean(shelter.zipCode) && (
          <InfoRow icon={<MapPinned />} label="CEP:" value={shelter.zipCode} />
        )}
        {shelter.category === ShelterCategory.Shelter && (
          <Fragment>
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
          </Fragment>
        )}
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
