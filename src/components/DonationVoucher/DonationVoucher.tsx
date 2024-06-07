import React from 'react';
import { Circle } from 'lucide-react';
import { format } from 'date-fns';

import { DonationStatusMap, SupplyMeasureMap, cn } from '@/lib/utils';
import { IDonationVoucher } from './types';

const DonationVoucher = React.forwardRef<HTMLDivElement, IDonationVoucher>(
  (props, ref) => {
    const { data, className = '', ...rest } = props;

    return (
      <div
        ref={ref}
        className={cn('h-screen p-8 m-0 flex flex-col gap-4', className)}
        {...rest}
      >
        <div className="flex items-center gap-4">
          <img src="/logo-sos.png" className="h-12 w-auto" />
          <h1 className="font-bold text-2xl">Doação feita em sos-rs.com</h1>
        </div>
        <div className="flex flex-col">
          <h4 className="font-medium text-lg">De:</h4>
          <div className="flex flex-col border-black border-2 rounded-lg p-2">
            <h3 className="font-bold text-2xl">
              {data.user.name} {data.user.lastName}
            </h3>
            <h4 className="font-medium text-lg">{data.user.phone}</h4>
          </div>
        </div>
        <div className="flex flex-col">
          <h4 className="font-medium text-lg">Para:</h4>
          <div className="flex flex-col border-black border-2 rounded-lg p-2">
            <h3 className="font-bold text-2xl">{data.shelter.name}</h3>
            <h4 className="font-medium text-lg">{data.shelter.address}</h4>
          </div>
        </div>
        <p>
          Status da doação: <b>{DonationStatusMap[data.status]}</b>
        </p>
        <h3 className="font-bold text-2xl">Itens da doação</h3>
        <ul>
          {data.donationOrderSupplies.map((s, idx) => (
            <li
              key={idx}
              className="pl-2 text-md font-medium flex gap-2 items-center"
            >
              <Circle className="w-1 h-1 fill-muted-foreground" />
              {s.quantity}
              {SupplyMeasureMap[s.supply.measure]} de {s.supply.name}
            </li>
          ))}
        </ul>
        <div className="flex-1 flex items-end justify-center">
          <p className="text-lg">
            Criada às{' '}
            {format(new Date(data.createdAt), "HH'h'mm 'de' dd/MM/yy")} pela
            plataforma sos-rs.com
          </p>
        </div>
      </div>
    );
  }
);

export { DonationVoucher };
