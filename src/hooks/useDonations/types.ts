export interface IUseDonationsData {
  page: number;
  perPage: number;
  count: number;
  results: IDonationsData[];
}

export interface IDonationsData {
  id: string;
  userId: string;
  status: string;
  shelter: {
    id: string;
    name: string;
  };
  donationOrderSupplies: {
    quantity: number;
    supply: {
      measure: string;
      name: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}
