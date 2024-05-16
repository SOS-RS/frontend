import { useState, useRef } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { IDialogSelectorProps } from './types';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const DialogSelector = (props: IDialogSelectorProps) => {
  const {
    open,
    onClose,
    title,
    description,
    options,
    value,
    quantity: quantityProp,
    onSave,
    isSubmitting,
  } = props;
  const [selectedItem, setSelectedItem] = useState<string>(value);
  const selectedItemRef = useRef<string>(value); // to prevent dated prop values bug on the previous line
  const [quantity, setQuantity] = useState<number>(quantityProp);
  const quantityRef = useRef<number>(quantityProp);

  if (quantityRef.current !== quantityProp) {
    setQuantity(quantityProp);
    quantityRef.current = quantityProp;
  }
  if (selectedItemRef.current !== value) {
    setSelectedItem(value);
    selectedItemRef.current = value;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-md">
        <DialogHeader>
          <DialogTitle className="text-base font-medium">{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="flex flex-col">
          <label htmlFor="quantity" className="text-muted-foreground">
            Quantidade
          </label>
          <div className="flex gap-2 items-center justify-center py-2">
            <Input
              type="number"
              name="quantity"
              value={quantity}
              onChange={(event) => setQuantity(+event.target.value)}
              placeholder="Quantidade"
              min={0}
            />
          </div>
        </div>
        <div className="px-2 max-h-[50vh] overflow-y-auto">
          <RadioGroup
            value={selectedItem}
            onValueChange={(v) => setSelectedItem(v)}
          >
            {options.map((option, idx) => (
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
            onClick={() =>
              onSave ? onSave(selectedItem, quantity) : undefined
            }
            loading={isSubmitting}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { DialogSelector };
