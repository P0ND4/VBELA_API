type DetailsType = {
  id: string;
  name: string;
};

export type Movement = {
  id: string;
  inventory: DetailsType;
  stock: DetailsType & { unit?: string; currentValue: number };
  supplier: DetailsType | null;
  supplierValue: number;
  type: string;
  quantity: number;
  currentValue: number;
  date: number;
  paymentMethod?: string;
  creationDate: number;
  modificationDate: number;
};
