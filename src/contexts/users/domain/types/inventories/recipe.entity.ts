type SubCategory = {
  category: string;
  subcategory: string;
};

export type Ingredients = {
  id: string;
  quantity: number;
};

export interface Recipe {
  id: string;
  inventoryID: string;
  value: number;
  categories: string[];
  subcategories: SubCategory[];
  ingredients: Ingredients[];
  name: string;
  description: string;
  visible: boolean;
  creationDate: number;
  modificationDate: number;
}
