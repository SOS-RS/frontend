import React, { Fragment, createRef, useMemo, useState } from 'react';
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
import { useReactToPrint } from 'react-to-print';

import { IDonationHistoryListItem } from './types';
import { SupplyMeasureMap, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DonateOrderStatus } from '@/service/donationOrder/types';
import { DonationHistoryStatus } from '../DonationHistoryStatus';
import { DonationVoucher } from '@/components';

const DonationHistoryListItem = React.forwardRef<
  HTMLDivElement,
  IDonationHistoryListItem
>((props, ref) => {
  const {
    data: donation,
    onCancel,
    onConfirm,
    loading,
    className = '',
    ...rest
  } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const divRef = createRef<HTMLDivElement>();
  const handlePrint = useReactToPrint({
    removeAfterPrint: true,
  });
  const accordeonLabel = useMemo(
    () => (visible ? 'Ocultar itens doados' : 'Mostrar itens doados'),
    [visible],
  );
  const AccordeonIcon = useMemo(
    () => (visible ? ChevronUp : ChevronDown),
    [visible],
  );

  if (!donation) return <Fragment />;

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-start gap-2 rounded-md bg-slate-100 p-4',
        className,
      )}
      {...rest}
    >
      <DonationVoucher
        ref={divRef}
        data={donation}
        className="hidden print:flex"
      />
      <div className="relative flex w-full flex-col gap-1">
        <DonationHistoryStatus
          status={donation.status}
          className="absolute right-0 top-0 flex items-center justify-center gap-2"
        >
          <Printer
            onClick={() => handlePrint(null, () => divRef.current)}
            className="h-5 w-5 cursor-pointer stroke-gray-900 hover:stroke-gray-700 active:stroke-gray-800"
          />
        </DonationHistoryStatus>
        <small className="font-medium !text-muted-foreground">Doação de</small>
        <h3 className="font-semibold !text-black">
          {donation.user.name} {donation.user.lastName} / {donation.user.phone}
        </h3>
        <small className="font-medium !text-muted-foreground">para</small>
        <h3 className="font-semibold !text-black">
          {donation.shelter.name} em {donation.shelter.address}
        </h3>
        <small className="text-semibold text-xs">
          às {format(new Date(donation.createdAt), "HH'h'mm 'de' dd/MM/yy")}
        </small>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="mt-2 flex gap-2 rounded-md px-0 py-0 font-medium !text-red-500 hover:bg-transparent hover:!text-red-400 active:bg-transparent [&_svg]:hover:stroke-red-400"
        onClick={() => setVisible((prev) => !prev)}
      >
        {accordeonLabel}
        <AccordeonIcon className="stroke-red-500" />
      </Button>
      <ul className={clsx({ hidden: !visible })}>
        {donation.donationOrderSupplies.map((s, idx) => (
          <li
            key={idx}
            className="flex items-center gap-2 pl-2 text-sm font-medium"
          >
            <Circle className="h-1 w-1 fill-muted-foreground" />
            {s.quantity}
            {SupplyMeasureMap[s.supply.measure]} de {s.supply.name}
          </li>
        ))}
      </ul>
      <div className="flex w-full flex-wrap justify-between gap-2 md:justify-end">
        <Button
          variant="ghost"
          size="sm"
          className={clsx(
            'mt-2 flex gap-2 rounded-md px-4 py-1 font-medium !text-red-500 hover:bg-red-50 hover:!text-red-400 active:bg-red-100 [&_svg]:hover:stroke-red-400',
            {
              hidden: donation.status !== DonateOrderStatus.Pending,
            },
          )}
          onClick={onCancel}
          disabled={loading}
        >
          <CircleX className="h-4 w-4 stroke-red-500 md:h-5 md:w-5" />
          Cancelar doação
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={clsx(
            'mt-2 flex gap-2 rounded-md px-4 py-1 font-medium !text-green-600 hover:bg-green-100 hover:!text-green-500 active:bg-green-200 [&_svg]:hover:stroke-green-500',
            {
              hidden: donation.status !== DonateOrderStatus.Pending,
            },
          )}
          onClick={onConfirm}
          disabled={loading}
        >
          <PackageCheck className="h-4 w-4 stroke-green-600 md:h-5 md:w-5" />
          Confirmar entrega
        </Button>
      </div>
    </div>
  );
});

export { DonationHistoryListItem };
