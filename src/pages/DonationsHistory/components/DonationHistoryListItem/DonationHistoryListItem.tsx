import { useMemo, useState } from 'react';
import { format } from 'date-fns';
import {
  ChevronDown,
  ChevronUp,
  Circle,
  CircleX,
  PackageCheck,
  Printer,
} from 'lucide-react';
import clsx from 'clsx';

import { IDonationHistoryListItem } from './types';
import { SupplyMeasureMap } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DonateOrderStatus } from '@/service/donationOrder/types';
import { DonationHistoryStatus } from '../DonationHistoryStatus';

const DonationHistoryListItem = (props: IDonationHistoryListItem) => {
  const { data: donation, onCancel, onConfirm, loading } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const accordeonLabel = useMemo(
    () => (visible ? 'Ocultar itens doados' : 'Mostrar itens doados'),
    [visible]
  );
  const AccordeonIcon = useMemo(
    () => (visible ? ChevronUp : ChevronDown),
    [visible]
  );

  return (
    <div className="flex flex-col gap-2 items-start [&_*]:text-black bg-slate-100 rounded-md p-4 relative">
      <DonationHistoryStatus
        status={donation?.status}
        className="absolute top-4 right-4 flex items-center justify-center gap-2"
      >
        <Printer className="stroke-gray-900 hover:stroke-gray-700 active:stroke-gray-800 h-5 w-5 cursor-pointer" />
      </DonationHistoryStatus>
      <div className="flex flex-col gap-1">
        <small className="font-medium !text-muted-foreground">
          Doação para
        </small>
        <h3 className="font-semibold">{donation.shelter.name}</h3>
        <small className="text-xs text-semibold">
          às {format(new Date(donation.createdAt), "HH'h'mm 'de' dd/MM/yy")}
        </small>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="!text-red-500 font-medium hover:bg-transparent active:bg-transparent px-0 py-0 rounded-md flex gap-2 mt-2 hover:!text-red-400 [&_svg]:hover:stroke-red-400"
        onClick={() => setVisible((prev) => !prev)}
      >
        {accordeonLabel}
        <AccordeonIcon className="stroke-red-500" />
      </Button>
      <ul className={clsx({ hidden: !visible })}>
        {donation.donationOrderSupplies.map((s, idx) => (
          <li
            key={idx}
            className="pl-2 text-sm font-medium flex gap-2 items-center"
          >
            <Circle className="w-1 h-1 fill-muted-foreground" />
            {s.quantity}
            {SupplyMeasureMap[s.supply.measure]} de {s.supply.name}
          </li>
        ))}
      </ul>
      <div className="flex gap-2 justify-between w-full md:justify-end flex-wrap">
        <Button
          variant="ghost"
          size="sm"
          className={clsx(
            '!text-red-500 font-medium hover:bg-red-50 active:bg-red-100 px-4 py-1 rounded-md flex gap-2 mt-2 hover:!text-red-400 [&_svg]:hover:stroke-red-400',
            {
              hidden: donation.status !== DonateOrderStatus.Pending,
            }
          )}
          onClick={onCancel}
          disabled={loading}
        >
          <CircleX className="stroke-red-500 h-4 w-4 md:h-5 md:w-5" />
          Cancelar doação
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={clsx(
            '!text-green-600 font-medium hover:bg-green-100 active:bg-green-200 px-4 py-1 rounded-md flex gap-2 mt-2 hover:!text-green-500 [&_svg]:hover:stroke-green-500',
            {
              hidden: donation.status !== DonateOrderStatus.Pending,
            }
          )}
          onClick={onConfirm}
          disabled={loading}
        >
          <PackageCheck className="stroke-green-600 h-4 w-4 md:h-5 md:w-5" />
          Confirmar entrega
        </Button>
      </div>
    </div>
  );
};

export { DonationHistoryListItem };
