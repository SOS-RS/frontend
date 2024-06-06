import React, { useCallback, useContext, useMemo, useState } from 'react';
import { Trash2 } from 'lucide-react';

import {
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '../../../ui/sheet';
import { DonationCartContext, SessionContext } from '@/contexts';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';
import { SupplyMeasureMap, cn, getSupplyPriorityProps } from '@/lib/utils';
import { CircleStatus } from '../../../CircleStatus';
import { Separator } from '../../../ui/separator';
import { IDonationCartItem } from '@/contexts/DonationCartContext/types';
import {
  DonationOrderServices,
  SessionServices,
  // ShelterSupplyServices,
  UserServices,
} from '@/service';
import { IDonateItem } from '@/service/donationOrder/types';
import { TextField } from '../../../TextField';
import { ICreateUser } from '@/service/users/types';
import { IDonationCartForm } from './types';

const DonationCartForm = React.forwardRef<HTMLFormElement, IDonationCartForm>(
  (props, ref) => {
    const { shelterId, onCancel, onSuccess, className = '', ...rest } = props;
    const { refreshSession, session } = useContext(SessionContext);
    const { carts, removeItem, clearCart, updateItem } =
      useContext(DonationCartContext);
    const [loading, setLoading] = useState<boolean>(false);
    const cart = useMemo(() => carts[shelterId] ?? [], [carts, shelterId]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [values, setValues] = useState<Record<string, number>>({});

    const handleCancelCart = useCallback(() => {
      clearCart(shelterId);
      if (onCancel) onCancel();
    }, [clearCart, onCancel, shelterId]);

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

    // const verifyCartItems = useCallback(
    //   async (
    //     shelterId: string,
    //     items: IDonateItem[]
    //   ): Promise<Record<string, string>> => {
    //     const { data } = await ShelterSupplyServices.getAll(shelterId);
    //     const newErrors = items.reduce((prev, current) => {
    //       const finded = data.find((d) => d.supply.id === current.id);
    //       const ok = current.quantity <= (finded?.quantity ?? 0);
    //       if (ok || !finded) return prev;
    //       else {
    //         const measure = SupplyMeasureMap[finded.supply.measure];
    //         return {
    //           ...prev,
    //           [current.id]: `A doação de ${finded.supply.name} não pode ser maior que a quantidade máxima de ${finded.quantity}${measure} `,
    //         };
    //       }
    //     }, {});
    //     return newErrors;
    //   },
    //   []
    // );

    const verifyAccountExists = useCallback(async (phone: string) => {
      const { data } = await UserServices.find('phone', phone);
      if (data.exists) {
        setErrors({
          phone:
            'Já existe um usuário com este telefone. Faça login ou tente outro telefone',
        });
        return false;
      }
      return true;
    }, []);

    const handleCreateAccount = useCallback(
      async (payload: Record<keyof ICreateUser, FormDataEntryValue>) => {
        const { lastName, name, phone } = payload;
        if (name && lastName && phone) {
          const ok = await verifyAccountExists(phone.toString());
          if (!ok) return false;

          await UserServices.create({
            phone: phone.toString(),
            name: name.toString(),
            lastName: lastName.toString(),
          });
          const parsedPhone = phone.toString().replace(/[^0-9]/g, '');
          const resp = await SessionServices.auth({
            login: parsedPhone,
            password: parsedPhone,
          });
          localStorage.setItem('token', resp.token);
          refreshSession();
        }

        return true;
      },
      [refreshSession, verifyAccountExists]
    );

    const handleDonate = useCallback(
      async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        setLoading(true);
        try {
          const form = new FormData(ev.currentTarget);
          const formData = Object.fromEntries(form);
          const { name, lastName, phone, ...rest } = formData;
          const ok = await handleCreateAccount({ name, lastName, phone });
          if (ok) {
            const items = Object.entries(rest).reduce(
              (prev, [key, value]) => [...prev, { id: key, quantity: +value }],
              [] as IDonateItem[]
            );
            //TODO: discutir produto se vai e como será verificado os "erros" do carrinho
            // const errorsData = await verifyCartItems(shelterId, items);
            // setErrors(errorsData);
            // if (Object.keys(errorsData).length === 0) {
            const resp = await DonationOrderServices.store({
              shelterId,
              supplies: items,
            });
            if (onSuccess) onSuccess(resp.data.id);
            clearCart(shelterId);
            // }
          }
        } catch (err) {
          console.log('Ocorreu um erro ao realizar a doação');
        } finally {
          setLoading(false);
        }
      },
      [clearCart, handleCreateAccount, onSuccess, shelterId]
    );

    return (
      <form
        className={cn('contents', className)}
        onSubmit={handleDonate}
        ref={ref}
        {...rest}
      >
        <SheetHeader className="px-4">
          <SheetTitle>
            {[session?.name, 'Revise sua doação'].filter((p) => !!p).join(', ')}
          </SheetTitle>
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
          <Separator className="my-4" />
          {!session && (
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-lg">Comunique sua doação</h3>
              <p className="text-sm font-medium text-muted-foreground">
                Utilizaremos seus dados apenas para comunicar ao abrigo que sua
                doação esta a caminho.
              </p>
              <div className="flex flex-col gap-4 mt-4">
                <TextField
                  label="Nome"
                  placeholder="Insira seu nome"
                  name="name"
                  defaultValue=""
                  required
                />
                <TextField
                  label="Último nome"
                  placeholder="Insira seu último nome"
                  name="lastName"
                  defaultValue=""
                  required
                />
                <TextField
                  label="Whatsapp"
                  placeholder="Insira seu whatsapp"
                  name="phone"
                  defaultValue=""
                  required
                  error={!!errors.phone}
                  helperText={errors.phone}
                />
              </div>
            </div>
          )}
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
    );
  }
);

export { DonationCartForm };
