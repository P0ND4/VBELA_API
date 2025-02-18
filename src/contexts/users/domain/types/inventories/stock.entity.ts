export type Movement = {
  id: string;
  inventoryID: string;
  stockID: string;
  supplierID?: string;
  type: string;
  quantity: number;
  currentValue: number;
  date: number;
  paymentMethod?: string;
  creationDate: number;
  modificationDate: number;
};

export interface Stock {
  id: string;
  inventoryID: string;
  name: string;
  unit: string;
  visible: boolean;
  reorder: number;
  reference: string;
  brand: string;
  currentValue: number;
  movements: Movement[];
  creationDate: number;
  modificationDate: number;
}
