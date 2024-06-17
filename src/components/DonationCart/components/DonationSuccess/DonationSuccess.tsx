import React, { createRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Circle, HeartHandshake, Loader, Printer } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import { format } from 'date-fns';

import {
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { IDonationSuccessProps } from './types';
import { SupplyMeasureMap, cn } from '@/lib/utils';
import { useDonationOrder } from '@/hooks';
import { Button } from '@/components/ui/button';
import { DonationVoucher } from '@/components';

const DonationSuccess = React.forwardRef<HTMLDivElement, IDonationSuccessProps>(
  (props, ref) => {
    const { donationOrderId, className = '', ...rest } = props;
    const { data: donation, loading } = useDonationOrder(donationOrderId);
    const navigate = useNavigate();
    const divRef = createRef<HTMLDivElement>();
    const handlePrint = useReactToPrint({
      removeAfterPrint: true,
    });

    if (loading)
      return <Loader className="h-6 w-6 animate-spin stroke-gray-500" />;

    return (
      <div ref={ref} className={cn('contents', className)} {...rest}>
        <DonationVoucher
          ref={divRef}
          data={donation}
          className="hidden print:flex"
        />
        <SheetHeader className="px-4">
          <SheetTitle>O RS agradece sua doação</SheetTitle>
          <SheetDescription className="flex items-center justify-center">
            <HeartHandshake className="h-24 w-24" strokeWidth={0.5} />
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 flex flex-1 flex-col gap-2 px-4">
          <div className="text-md flex flex-col font-medium">
            <small className="text-muted-foreground">
              Cada doação importa.
            </small>
            <small className="text-muted-foreground">
              Juntos somos mais fortes!
            </small>
          </div>
          <div className="flex flex-col items-start rounded-md bg-slate-100 p-4">
            <div className="flex flex-col gap-1">
              <small className="font-medium text-muted-foreground">
                Doação para
              </small>
              <h3 className="font-semibold">{donation.shelter.name}</h3>
              <small className="text-semibold text-xs">
                às{' '}
                {format(new Date(donation.createdAt), "HH'h'mm 'de' dd/MM/yy")}
              </small>
            </div>
            <ul className="mt-3">
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
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 flex gap-2 rounded-md px-4 py-1 font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 active:bg-red-100 [&>svg]:hover:stroke-red-700"
              onClick={() => handlePrint(null, () => divRef.current)}
            >
              <Printer className="stroke-red-600" />
              Imprimir doação
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center border-t-[1px] border-border px-4 py-6">
          <Button
            className="w-full"
            variant="destructive"
            onClick={() => navigate('/doacoes')}
          >
            Verificar histórico de doações
          </Button>
        </div>
      </div>
    );
  },
);

export { DonationSuccess };
