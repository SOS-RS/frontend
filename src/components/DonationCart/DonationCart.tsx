import { useEffect, useState } from 'react';

import { IDonationCart } from './types';
import { Sheet, SheetContent } from '../ui/sheet';
import { DonationCartForm, DonationSuccess } from './components';

const DonationCart = (props: IDonationCart) => {
  const { onClose, opened, shelterId } = props;
  const [donationOrderId, setDonationOrderId] = useState<string | null>(null);

  useEffect(() => {
    const el = document.querySelector('header');
    if (el) {
      if (opened) {
        el?.classList.remove('z-[100]');
        el?.classList.add('z-0');
      } else {
        el?.classList.remove('z-0');
        el?.classList.add('z-[100]');
      }
    }
  }, [opened]);

  useEffect(() => {
    if (!opened) setDonationOrderId(null);
  }, [opened]);

  return (
    <Sheet open={opened} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="z-[120] flex flex-col pb-0 px-0 overflow-y-auto"
      >
        {donationOrderId ? (
          <DonationSuccess donationOrderId={donationOrderId} />
        ) : (
          <DonationCartForm
            onCancel={onClose}
            shelterId={shelterId}
            onSuccess={(orderId) => setDonationOrderId(orderId)}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export { DonationCart };
