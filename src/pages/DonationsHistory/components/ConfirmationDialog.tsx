import * as React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';

interface ConfirmationDialogProps {
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  triggerLabel: React.ReactNode;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,

  triggerLabel,
  Icon,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="disabled:bg-red-500 hover:bg-red-400 relative"
          onClick={() => setIsOpen(true)}
        >
          <Icon className="w-6 h-6 stroke-red-500" />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/10" />
        <DialogContent className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 bg-white p-6 shadow-lg rounded-lg">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
          </div>
          <DialogDescription className="text-left text-sm text-gray-500 mb-4">
            {description}
          </DialogDescription>
          <DialogFooter className="flex justify-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => {
                onConfirm();
                setIsOpen(false);
              }}
              className="bg-red-500 text-white px-6 py-2 rounded-md"
            >
              {confirmLabel}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setIsOpen(false);
              }}
              className="bg-gray-200 text-black px-6 py-2 rounded-md"
            >
              {cancelLabel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export { ConfirmationDialog };
