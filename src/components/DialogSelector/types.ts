export interface IDialogSelectorItemProps {
  label: string;
  value: string;
}

export interface IDialogSelectorProps {
  open: boolean;
  title: string;
  description?: string;
  options: IDialogSelectorItemProps[];
  value: string;
  isSubmitting?: boolean;
  onSave?: (value: string) => void;
  onClose?: () => void;
}
