export interface Discount {
  id: string;
  quantity: number;
}

type SubCategory = {
  category: string;
  subcategory: string;
};

export interface Element {
  id: string;
  locationID: string;
  name: string;
  price: number;
  cost: number;
  promotion: number;
  categories: string[];
  subcategories: SubCategory[];
  description: string;
  code: string;
  unit: string;
  highlight: boolean;
  activeStock: boolean;
  stock: number;
  minStock: number;
  stockIDS: string[];
  packageIDS?: string[];
  creationDate: number;
  modificationDate: number;
}
