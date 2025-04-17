type SubCategory = {
  category: string;
  subcategory: string;
};

export interface Stock {
  id: string;
  inventoryID: string;
  name: string;
  unit: string;
  categories: string[];
  subcategories: SubCategory[];
  visible: boolean;
  upperLimit: number;
  reorder: number;
  reference: string;
  brand: string;
  currentValue: number;
  creationDate: number;
  modificationDate: number;
}
