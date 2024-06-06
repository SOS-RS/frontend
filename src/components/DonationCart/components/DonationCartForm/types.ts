export interface IDonationCartForm extends React.ComponentPropsWithRef<'form'> {
  shelterId: string;
  onCancel?: () => void;
  onSuccess?: (donationOrderId: string) => void;
}
