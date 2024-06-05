import React from 'react';
import { Circle, HeartHandshake, Loader, Printer } from 'lucide-react';

import {
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { IDonationSuccessProps } from './types';
import { SupplyMeasureMap, cn } from '@/lib/utils';
import { useDonationOrder } from '@/hooks';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const DonationSuccess = React.forwardRef<HTMLDivElement, IDonationSuccessProps>(
  (props, ref) => {
    const { donationOrderId, className = '', ...rest } = props;
    const { data: donation, loading } = useDonationOrder(donationOrderId);
    const navigate = useNavigate();

    if (loading)
      return <Loader className="stroke-gray-500 w-6 h-6 animate-spin" />;

    const handleRedirect = () => {
      navigate(`/abrigo/${donation.shelter.id}/doacoes`);
    };

    return (
      <div ref={ref} className={cn('contents', className)} {...rest}>
        <SheetHeader className="px-4">
          <SheetTitle>O RS agradece sua doação</SheetTitle>
          <SheetDescription className="flex justify-center items-center">
            <HeartHandshake className="h-24 w-24" strokeWidth={0.5} />
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 flex flex-col gap-2 mt-4 flex-1">
          <div className="flex flex-col text-md font-medium">
            <small className="text-muted-foreground">
              Cada doação importa.
            </small>
            <small className="text-muted-foreground">
              Juntos somos mais fortes!
            </small>
          </div>
          <div className="flex flex-col items-start bg-slate-100 rounded-md p-4">
            <div className="flex flex-col gap-1">
              <small className="text-muted-foreground font-medium">
                Doação para
              </small>
              <h3 className="font-semibold">{donation.shelter.name}</h3>
              <small className="text-xs text-semibold">
                às{' '}
                {format(new Date(donation.createdAt), "HH'h'mm 'de' dd/MM/yy")}
              </small>
            </div>
            <ul className="mt-3">
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
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 font-semibold hover:bg-red-50 active:bg-red-100 px-4 py-1 rounded-md flex gap-2 mt-2 hover:text-red-700 [&>svg]:hover:stroke-red-700"
            >
              <Printer className="stroke-red-600" />
              Imprimir doação
            </Button>
          </div>
        </div>
        <div className="px-4 py-6 flex justify-center items-center border-t-[1px] border-border">
          <Button
            className="w-full"
            variant="destructive"
            onClick={handleRedirect}
          >
            Verificar histórico de doações
          </Button>
        </div>
      </div>
    );
  }
);

export { DonationSuccess };
