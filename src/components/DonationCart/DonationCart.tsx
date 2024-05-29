import { useContext, useEffect, useMemo } from 'react';
import { Trash2 } from 'lucide-react';

import { IDonationCart } from './types';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import { DonationCartContext } from '@/contexts';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { SupplyMeasureMap, cn, getSupplyPriorityProps } from '@/lib/utils';
import { CircleStatus } from '../CircleStatus';
import { Separator } from '../ui/separator';

const DonationCart = (props: IDonationCart) => {
  const { onClose, opened, shelterId } = props;
  const { carts, removeItem, clearCart } = useContext(DonationCartContext);

  const cart = useMemo(() => carts[shelterId] ?? [], [carts, shelterId]);

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
      <SheetContent side="right" className="z-[120] flex flex-col pb-0 px-0">
        <SheetHeader className="px-4">
          <SheetTitle>Revise sua doação</SheetTitle>
          <SheetDescription>
            Ajuste a quantidade que gostaria de doar em cada item
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 flex flex-col gap-2 mt-4 flex-1">
          <div className="flex justify-between">
            <small className="font-semibold">Item</small>
            <small className="font-semibold">Quantidade</small>
          </div>
          {cart.map((item) => {
            const { className } = getSupplyPriorityProps(item.priority);
            return (
              <div
                key={item.id}
                className="flex justify-between gap-2 flex-nowrap"
              >
                <div className="flex flex-1 gap-1 items-center">
                  <CircleStatus
                    className={cn(className, 'rounded-full w-3 h-3')}
                  />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <div className="flex flex-1 gap-2 items-center justify-end">
                  <div className="relative w-3/5">
                    <Input defaultValue={item.quantity} />
                    <span className="absolute top-[50%] -translate-y-1/2 right-2 text-muted-foreground text-xs">
                      {SupplyMeasureMap[item.measure]}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-auto"
                    onClick={() => removeItem(shelterId, item.id)}
                  >
                    <Trash2 className="w-5 h-5 stroke-red-600" />
                  </Button>
                </div>
              </div>
            );
          })}
          <Separator className="mt-4" />
        </div>
        <SheetFooter className="border-t-[1px] border-border">
          <div className="w-full flex justify-between p-4">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => clearCart(shelterId)}
            >
              Cancelar
            </Button>
            <Button
              disabled={cart.length === 0}
              size="sm"
              variant="destructive"
            >
              Atender doação
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export { DonationCart };
