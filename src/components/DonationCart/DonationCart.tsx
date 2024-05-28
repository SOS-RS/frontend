import { useEffect } from 'react';

import { IDonationCart } from './types';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';

const DonationCart = (props: IDonationCart) => {
  const { onClose, opened } = props;

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

  return (
    <Sheet open={opened} onOpenChange={onClose}>
      <SheetContent side="right" className="z-[120]">
        <SheetHeader>
          <SheetTitle>Revise sua doação</SheetTitle>
          <SheetDescription>
            Ajuste a quantidade que gostaria de doar em cada item
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-2"></div>
      </SheetContent>
    </Sheet>
  );
};

export { DonationCart };
