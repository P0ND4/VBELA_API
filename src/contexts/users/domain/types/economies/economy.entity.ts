type DetailsType = {
  id: string;
  name: string;
};

export interface Economy {
  id: string;
  supplier: DetailsType | null;
  type: string;
  category: DetailsType;
  subcategory: DetailsType | null;
  value: number;
  quantity: number;
  unit: string;
  description: string;
  date: number;
  reference: string;
  brand: string;
  operative: boolean;
  creationDate: number;
  modificationDate: number;
}
