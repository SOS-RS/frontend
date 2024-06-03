/*
 * - [ ] Needs to adapt field "Doação para" to include "Doação de" when "Recebido" is selected;
 * - [ ] Needs refactoring when oficial data structure comes is;
 *
 */

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { IDonationProps, ViewOptions } from '../types';
import { Printer, PackageCheck, CircleX } from 'lucide-react';

import { Chip } from '@/components';
import { DonationOrderServices } from '@/service/donationOrder/donationOrder.service';
import { DonateOrderStatus } from '@/service/donationOrder/types';

const Donation = ({ viewOption, donation }: IDonationProps) => {
  const [opened, setOpened] = useState<boolean>(false);
  const [status, setStatus] = useState<DonateOrderStatus>(donation.status);
  const Icon = !opened ? ChevronUp : ChevronDown;
  const btnLabel = !opened ? 'Ocultar itens doados' : 'Mostrar itens doados';
  console.log(`donationdonation `, donation);

  //Cretes list of all items to be displayed
  const listOfItems = donation.items.map((item: string, index) => {
    return (
      <li key={`$${index}`} className="px-3">
        {`${item.quantity} ${
          item.supply.measure == 'Unit' ? 'unidade(s)' : item.supply.measure
        } ${item.supply.name}`}
      </li>
    );
  });

  const getStatusVariant = (
    status: string
  ): 'success' | 'danger' | 'moreInfo' => {
    if (status === 'Entregue') {
      return 'success';
    } else if (status === 'Pendente') {
      return 'danger';
    } else {
      return 'moreInfo';
    }
  };
  // Obtém o status da doação
  // let status = donation.status;
  const variant = getStatusVariant(status);
  const handleConfirm = async () => {
    let statusUpdate = await DonationOrderServices.update(donation.donationId, {
      status: DonateOrderStatus.Complete,
    });
    setStatus(DonateOrderStatus.Complete);
  };
  const handleCancel = async () => {
    let statusUpdate = await DonationOrderServices.update(donation.donationId, {
      status: DonateOrderStatus.Canceled,
    });
    setStatus(DonateOrderStatus.Canceled);
    console.log(`Canceled donation ${donation.id}`);
  };

  return (
    <Card className="flex flex-col gap-2 p-4 bg-[#E8F0F8] text-sm my-2 w-full">
      <div className="flex items-center justify-between text-[#646870] font-small">
        {viewOption == ViewOptions.Received ? 'Doação para' : 'Doação de'}
        <Chip label={status ?? 'Pendente'} variant={variant} />
      </div>
      <div className="text-[#2f2f2f] font-semibold text-xl">
        {viewOption == ViewOptions.Received
          ? donation.donatorName
          : donation.shelterName}
      </div>
      <div className="text-[#646870] font-medium">
        Criada às {donation.createdAt.split('T')[0]}
      </div>
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
        <Button
          variant="ghost"
          size="sm"
          className="flex gap-1 items-center"
          onClick={handleCancel}
        >
          <CircleX className="h-5 w-5 stroke-red-500" />
          <span className="text-lg font-normal text-red-500">
            Cancelar entrega
          </span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex gap-1 items-center"
          onClick={handleConfirm}
        >
          <PackageCheck className="h-5 w-5 stroke-red-500" />
          <span className="text-lg font-normal text-red-500">
            Confirmar entrega
          </span>
        </Button>
      </div>
    </Card>
  );
};

export { Donation };
