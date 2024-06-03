import * as React from 'react';
import { useState, useEffect } from 'react';
import { X, Printer, PackageCheck, CircleX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { IDonationProps, ViewOptions } from '../types';
import { Chip } from '@/components';
import { DonationOrderServices } from '@/service/donationOrder/donationOrder.service';
import { DonateOrderStatus } from '@/service/donationOrder/types';
import { ConfirmationDialog } from './ConfirmationDialog';

const Donation = ({ viewOption, donation }: IDonationProps) => {
  const [opened, setOpened] = useState<boolean>(false);
  const [status, setStatus] = useState<DonateOrderStatus>(donation.status);
  const [error, setError] = useState<string | null>(null);

  const getDisplayDate = (status: string): DonateOrderStatus => {
    if (status === DonateOrderStatus.Complete) {
      return `Entregue no dia ${donation.createdAt.split('T')[0]} às
      ${donation.createdAt.split('T')[1].slice(0, -5)}`;
    } else if (status === DonateOrderStatus.Pending) {
      return `Criado no dia ${donation.createdAt.split('T')[0]} às
      ${donation.createdAt.split('T')[1].slice(0, -5)}`;
    } else if (status === DonateOrderStatus.Canceled) {
      return `Cancelado no dia ${donation.createdAt.split('T')[0]} às
      ${donation.createdAt.split('T')[1].slice(0, -5)}`;
    }
  };

  const [displayDate, setDisplayDate] = useState(getDisplayDate(status));

  useEffect(() => {
    const displayDate = getDisplayDate(status);
    setDisplayDate(displayDate);
  }, [status]);

  const Icon = !opened ? ChevronUp : ChevronDown;
  const btnLabel = !opened ? 'Ocultar itens doados' : 'Mostrar itens doados';

  //Creates list of all items to be displayed
  const listOfItems = donation.items.map((item: string, index) => {
    return (
      <li key={`$${index}`} className="px-3">
        {`${item.quantity} ${
          item.supply.measure == 'Unit' ? 'unidade(s)' : item.supply.measure
        } ${item.supply.name}`}
      </li>
    );
  });

  const getStatusVariant = (status: string) => {
    if (status === DonateOrderStatus.Complete) {
      return { label: 'Entregue', color: '#A9CB9D' };
    } else if (status === DonateOrderStatus.Pending) {
      return { label: 'Pendente', color: '#F69F9D' };
    } else {
      return { label: 'Cancelado', color: '#D3D3D3' };
    }
  };

  const statusVariant = getStatusVariant(status);

  const handleConfirm = async () => {
    try {
      await DonationOrderServices.update(donation.donationId, {
        status: DonateOrderStatus.Complete,
      });
      setStatus(DonateOrderStatus.Complete);
    } catch (err) {
      setError('Failed to confirm the delivery. Please try again.');
    }
  };

  const handleCancel = async () => {
    try {
      await DonationOrderServices.update(donation.donationId, {
        status: DonateOrderStatus.Canceled,
      });
      setStatus(DonateOrderStatus.Canceled);
    } catch (err) {
      setError('Failed to cancel the delivery. Please try again.');
    }
  };
  return (
    <Card className="flex flex-col gap-2 p-4 bg-[#E8F0F8] text-sm my-2 w-full">
      <div className="flex items-center justify-between text-[#646870] font-small">
        {viewOption == ViewOptions.Received ? 'Doação para' : 'Doação de'}
        <Chip
          label={statusVariant.label}
          style={{ backgroundColor: statusVariant.color }}
        />
      </div>
      <div className="text-[#2f2f2f] font-semibold text-xl">
        {viewOption == ViewOptions.Received
          ? donation.donatorName
          : donation.shelterName}
      </div>
      <div className="text-[#646870] font-medium">{displayDate}</div>
      <div>
        <Button
          variant="ghost"
          size="sm"
          className="flex gap-2 items-center"
          onClick={() => setOpened((v) => !v)}
        >
          <span className="text-lg font-normal text-red-500">{btnLabel}</span>
          <Icon className="h-5 w-5 stroke-red-500" />
        </Button>
      </div>
      {opened && <ul>{listOfItems}</ul>}
      <div className="flex flex-wrap gap-2">
        <Button variant="ghost" size="sm" className="flex gap-1 items-center">
          <Printer className="h-5 w-5 stroke-red-500" />
          <span className="text-lg font-normal text-red-500">
            Imprimir doação
          </span>
        </Button>
        {status !== DonateOrderStatus.Complete &&
          status !== DonateOrderStatus.Canceled && (
            <>
              <ConfirmationDialog
                title="Você realmente deseja cancelar esta doação?"
                description="Esta ação não pode ser desfeita."
                confirmLabel="Sim"
                cancelLabel="Não"
                onConfirm={handleCancel}
                onCancel={() => {}}
                triggerLabel={
                  <span className="text-lg font-normal text-red-500">
                    Cancelar entrega
                  </span>
                }
                Icon={CircleX}
              />
              <ConfirmationDialog
                title="Você realmente deseja confirmar a entrega desta doação?"
                description="Esta ação não pode ser desfeita."
                confirmLabel="Confirmar"
                cancelLabel="Não"
                onConfirm={handleConfirm}
                onCancel={() => {}}
                triggerLabel={
                  <span className="text-lg font-normal text-red-500">
                    Confirmar entrega
                  </span>
                }
                Icon={PackageCheck}
              />
            </>
          )}
      </div>
    </Card>
  );
};

export { Donation };
