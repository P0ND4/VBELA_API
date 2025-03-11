type SupplierType = {
  id: string;
  name: string;
};

export interface Economy {
  id: string;
  supplier: SupplierType;
  type: string;
  name: string;
  value: number;
  quantity: number;
  unit: string;
  description: string;
  date: number;
  reference: string;
  brand: string;
  creationDate: number;
  modificationDate: number;
}
