import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Trash2 } from 'lucide-react';

import { IDonateItem, IDonationCart } from './types';
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
import { IDonationCartItem } from '@/contexts/DonationCartContext/types';
import { ShelterSupplyServices } from '@/service';

const DonationCart = (props: IDonationCart) => {
  const { onClose, opened, shelterId } = props;
  const { carts, removeItem, clearCart, updateItem } =
    useContext(DonationCartContext);
  const [loading, setLoading] = useState<boolean>(false);
  const cart = useMemo(() => carts[shelterId] ?? [], [carts, shelterId]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [values, setValues] = useState<Record<string, number>>({});

  const handleCancelCart = useCallback(() => {
    clearCart(shelterId);
    onClose();
  }, [clearCart, onClose, shelterId]);

  const handleChangeQuantity = useCallback(
    (item: IDonationCartItem, quantity: number) => {
      setValues((prev) => ({
        ...prev,
        [item.id]: quantity,
      }));
      updateItem(shelterId, item.id, { quantity });
    },
    [shelterId, updateItem]
  );

  const verifyCartItems = useCallback(
    async (
      shelterId: string,
      items: IDonateItem[]
    ): Promise<Record<string, string>> => {
      const { data } = await ShelterSupplyServices.getAll(shelterId);
      const newErrors = items.reduce((prev, current) => {
        const finded = data.find((d) => d.supply.id === current.supplyId);
        const ok = current.quantity <= (finded?.quantity ?? 0);
        if (ok || !finded) return prev;
        else {
          const measure = SupplyMeasureMap[finded.supply.measure];
          return {
            ...prev,
            [current.supplyId]: `A doação de ${finded.supply.name} não pode ser maior que a quantidade máxima de ${finded.quantity}${measure} `,
          };
        }
      }, {});
      console.log({ items, newErrors });
      return newErrors;
    },
    []
  );

  const handleDonate = useCallback(
    async (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();

      setLoading(true);
      try {
        const form = new FormData(ev.currentTarget);
        const items = Object.entries(Object.fromEntries(form)).reduce(
          (prev, [key, value]) => [
            ...prev,
            { supplyId: key, quantity: +value },
          ],
          [] as IDonateItem[]
        );
        const errorsData = await verifyCartItems(shelterId, items);
        setErrors(errorsData);
        if (Object.keys(errorsData).length > 0) {
          console.log('Doação não está ok');
        } else {
          console.log('Doação ok');
        }
      } catch (err) {
        console.log('Ocorreu um erro ao realizar a doação');
      } finally {
        setLoading(false);
      }
    },
    [shelterId, verifyCartItems]
  );

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
    if (!opened) {
      setErrors({});
      setValues({});
    }
  }, [opened]);

  return (
    <Sheet open={opened} onOpenChange={onClose}>
      <SheetContent side="right" className="z-[120] flex flex-col pb-0 px-0">
        <form className="contents" onSubmit={handleDonate}>
          <SheetHeader className="px-4">
            <SheetTitle>Revise sua doação</SheetTitle>
            <SheetDescription>
              Ajuste a quantidade que gostaria de doar em cada item
            </SheetDescription>
          </SheetHeader>
          <div className="px-4 flex flex-col gap-3 mt-4 flex-1">
            <div className="flex justify-between">
              <small className="font-semibold">Item</small>
              <small className="font-semibold">Quantidade</small>
            </div>
            {cart.map((item) => {
              const { className } = getSupplyPriorityProps(item.priority);
              return (
                <div key={item.id} className="flex flex-col gap-2">
                  <div className="flex justify-between gap-2 flex-nowrap">
                    <div className="flex flex-1 gap-1 items-center">
                      <CircleStatus
                        className={cn(className, 'rounded-full w-3 h-3')}
                      />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <div className="flex flex-1 gap-2 items-center justify-end">
                      <div className="relative w-3/5">
                        <Input
                          min={1}
                          name={item.id}
                          type="number"
                          value={values[item.id] ?? item.quantity}
                          onChange={(ev) =>
                            handleChangeQuantity(item, +ev.target.value)
                          }
                        />
                        <span className="absolute top-[50%] -translate-y-1/2 right-2 text-muted-foreground text-xs -z-10">
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
                  {errors[item.id] && (
                    <span className="border border-red-200 bg-red-100 text-red-500 p-2 rounded-md">
                      <p className="text-xs font-light">{errors[item.id]}</p>
                    </span>
                  )}
                </div>
              );
            })}
            <Separator className="mt-4" />
          </div>
          <SheetFooter className="border-t-[1px] border-border">
            <div className="w-full flex justify-between p-4">
              <Button size="sm" variant="ghost" onClick={handleCancelCart}>
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={cart.length === 0}
                size="sm"
                variant="destructive"
                loading={loading}
              >
                Atender doação
              </Button>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export { DonationCart };
