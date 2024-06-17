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
        className={cn('m-0 flex h-screen flex-col gap-4 p-8', className)}
        {...rest}
      >
        <div className="flex items-center gap-4">
          <img src="/logo-sos.png" className="h-12 w-auto" />
          <h1 className="text-2xl font-bold">Doação feita em sos-rs.com</h1>
        </div>
        <div className="flex flex-col">
          <h4 className="text-lg font-medium">De:</h4>
          <div className="flex flex-col rounded-lg border-2 border-black p-2">
            <h3 className="text-2xl font-bold">
              {data.user.name} {data.user.lastName}
            </h3>
            <h4 className="text-lg font-medium">{data.user.phone}</h4>
          </div>
        </div>
        <div className="flex flex-col">
          <h4 className="text-lg font-medium">Para:</h4>
          <div className="flex flex-col rounded-lg border-2 border-black p-2">
            <h3 className="text-2xl font-bold">{data.shelter.name}</h3>
            <h4 className="text-lg font-medium">{data.shelter.address}</h4>
          </div>
        </div>
        <p>
          Status da doação: <b>{DonationStatusMap[data.status]}</b>
        </p>
        <h3 className="text-2xl font-bold">Itens da doação</h3>
        <ul>
          {data.donationOrderSupplies.map((s, idx) => (
            <li
              key={idx}
              className="text-md flex items-center gap-2 pl-2 font-medium"
            >
              <Circle className="h-1 w-1 fill-muted-foreground" />
              {s.quantity}
              {SupplyMeasureMap[s.supply.measure]} de {s.supply.name}
            </li>
          ))}
        </ul>
        <div className="flex flex-1 items-end justify-center">
          <p className="text-lg">
            Criada às{' '}
            {format(new Date(data.createdAt), "HH'h'mm 'de' dd/MM/yy")} pela
            plataforma sos-rs.com
          </p>
        </div>
      </div>
    );
  },
);

export { DonationVoucher };
