export interface IDonateItem {
  supplyId: string;
  quantity: number;
}

export interface IDonationCart {
  shelterId: string;
  opened: boolean;
  onClose: () => void;
}
