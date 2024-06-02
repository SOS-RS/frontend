import { useState, useEffect } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShelterSupplyServices } from '@/service';
import { Link } from 'react-router-dom';
import { IMessage, IProps, ISupplies } from './types';

const ModalCreateSupply = (props: IProps) => {
  const {
    open,
    onClose,
    title,
    description = '',
    options,
    supplies,
    supplyId,
    shelterId,
  } = props;
  const [data, setData] = useState({
    quantity: 0,
    priority: '10',
  });
  const [message, setMessage] = useState<IMessage>({
    error: false,
    register: false,
    successSub: false,
    message: '',
  });

  useEffect(() => {
    supplies.forEach((element: ISupplies) => {
      if (element.supply.id === supplyId) {
        setMessage((prev) => ({
          ...prev,
          register: true,
          message: 'Verificamos que você já tem esse item registrado.',
        }));
        setData({
          quantity: element.quantity,
          priority: element.priority.toString(),
        });
      }
    });
  }, [supplies, supplyId]);

  const onSave = () => {
    if (!message.register) {
      ShelterSupplyServices.create({
        shelterId,
        supplyId,
        priority: parseInt(data.priority),
        quantity: data.quantity,
      })
        .then(() => {
          setMessage((prev) => ({
            ...prev,
            successSub: true,
            message: 'Registro salvo com sucesso!',
          }));
        })
        .catch(() =>
          alert(
            'Ocorreu um erro. Por favor, tente novamente ou entre em contato com o suporte.'
          )
        );
    } else {
      ShelterSupplyServices.update(shelterId, supplyId, {
        priority: parseInt(data.priority),
        quantity: data.quantity,
      })
        .then(() => {
          setMessage((prev) => ({
            ...prev,
            successSub: true,
            message: 'Registro salvo com sucesso!',
          }));
        })
        .catch(() =>
          alert(
            'Ocorreu um erro. Por favor, tente novamente ou entre em contato com o suporte.'
          )
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-md">
        {message.successSub ? (
          <>
            <div className="border rounded bg-green-600 p-2 text-white mt-5">
              {message.message}
            </div>
            <DialogFooter>
              <Link to={`/abrigo/${shelterId}`}>
                <Button
                  className="w-full bg-blue-700 text-white hover:bg-blue-600 active:bg-blue-500"
                  size="sm"
                >
                  Continuar
                </Button>
              </Link>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-base font-medium">
                {title}
              </DialogTitle>
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>
            {message.message && (
              <div className="border rounded bg-green-600 p-2 text-white">
                {message.message}
              </div>
            )}
            <div className="flex flex-col">
              <label htmlFor="quantity" className="text-muted-foreground">
                Quantidade
              </label>
              <div className="flex gap-2 items-center justify-center py-2">
                <Input
                  type="number"
                  name="quantity"
                  value={data.quantity}
                  onChange={(event: any) =>
                    setData((prev) => ({
                      ...prev,
                      quantity: parseInt(event.target.value),
                    }))
                  }
                  placeholder="Quantidade"
                  min={0}
                />
              </div>
            </div>
            <div className="px-2 max-h-[50vh] overflow-y-auto">
              <RadioGroup
                value={data.priority}
                onValueChange={(v) =>
                  setData((prev: any) => ({
                    ...prev,
                    priority: v,
                  }))
                }
              >
                {options.map((option: any, idx: any) => (
                  <div key={idx} className="flex items-center space-x-2 py-2">
                    <RadioGroupItem
                      value={option.value}
                      id={option.value}
                      className="cursor-pointer"
                    />
                    <Label htmlFor={option.value} className="cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <DialogFooter>
              <Button
                className="w-full bg-blue-700 text-white hover:bg-blue-600 active:bg-blue-500"
                size="sm"
                onClick={() => onSave()}
              >
                Salvar
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export { ModalCreateSupply };
