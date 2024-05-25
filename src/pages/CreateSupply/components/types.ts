import { IDialogSelectorItemProps } from '@/components/DialogSelector/types';

export interface IProps {
  open: boolean;
  onClose?: () => void;
  title: string;
  description?: string;
  options: IDialogSelectorItemProps[];
  supplies: [
    {
      supply: {
        id: string;
      };
      quantity: number;
      priority: string;
    }
  ];
  supplyId: string;
  shelterId: string;
}

export interface ISupplies {
  supply: {
    id: string;
  };
  quantity: number;
  priority: string;
}

export interface IMessage {
  error: boolean;
  message: string;
  register: boolean;
  successSub: boolean;
}
