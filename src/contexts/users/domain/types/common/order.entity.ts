export type Selection = {
  id: string;
  name: string;
  unit?: string;
  registered: boolean;
  activeStock?: boolean;
  packageIDS?: string[];
  stockIDS?: string[];
  discount: number;
  total: number;
  quantity: number;
  value: number;
};

export type PaymentMethod = {
  amount: number;
  icon: string;
  method: string;
  id: string;
};

export interface Order {
  id: string;
  invoice: string;
  locationID: string;
  tableID?: string;
  order: string;
  status: string;
  selection: Selection[];
  discount: number;
  paid: number;
  total: number;
  change: number;
  paymentMethods: PaymentMethod[];
  observation: string;
  creationDate: number;
  modificationDate: number;
}