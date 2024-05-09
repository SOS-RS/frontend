import { useState } from 'react';

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

const DialogSelector = (props: IDialogSelectorProps) => {
  const {
    open,
    onClose,
    title,
    description,
    options,
    value,
    onSave,
    isSubmitting,
  } = props;
  const [selectedItem, setSelectedItem] = useState<string>(value);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-md">
        <DialogHeader>
          <DialogTitle className="text-base font-medium">{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="px-2 py-4 max-h-[50vh] overflow-y-auto">
          <RadioGroup
            value={selectedItem}
            onValueChange={(v) => setSelectedItem(v)}
          >
            {options.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-2 py-2">
                <RadioGroupItem value={option.value} id="r1" />
                <Label htmlFor="r1">{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button
            className="w-full bg-blue-700 text-white hover:bg-blue-600 active:bg-blue-500"
            size="sm"
            onClick={() => (onSave ? onSave(selectedItem) : undefined)}
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
