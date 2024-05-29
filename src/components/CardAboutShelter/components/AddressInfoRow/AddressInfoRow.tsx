import React from 'react';
import { Home, Map } from 'lucide-react';
import { cn } from '@/lib/utils';

import { ICardAboutShelter } from '../../types';
import { checkAndFormatAddress, getGoogleMapsUrlTo } from '../../utils';

const AddressInfoRow = ({ shelter } : ICardAboutShelter) => {
  
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
  
export { AddressInfoRow };
